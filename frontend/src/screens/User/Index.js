import { CBadge, CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import CustomModal from 'src/components/CustomModal';
import InventoryAdjustModal from 'src/components/InventoryAdjustModal';

const getBadge = status => {
  switch (status) {
    case '1': return 'success'
    case '2': return 'secondary'
    // case 'Pending': return 'warning'
    // case 'Banned': return 'danger'
    default: return 'primary'
  }
}

export default function Index() {
  const [id, setId] = React.useState(null);
  const [password, setPassword] = React.useState('');
  const [modal, setModal] = React.useState(false)
  const { user,setLoad } = React.useContext(userContext);
  const fields = ['#', 'restaurant_name','name', 'email', 'role','action'];
  const [userList, setUserList] = React.useState([]);
  const [showEditModal, setShowEditModal] = React.useState(false);
  
  const showModalFunc = (id) => {
    setId(id);
    setShowEditModal(true);
  }

  const submitAdjust = () => {
    setLoad(true)
    const formData = new FormData();
    formData.append('password',password);
    async function editData(){
        const respone = await fetch(url + 'editPassword/' + id,{
            method : 'POST',
            headers : {
                'Authorization' : user.token,
            },
            body : formData
        })

        if (respone.ok === true){
            const data = await respone.json();
            setLoad(false)
            console.log(data);
            if (data.status === 200){
                setShowEditModal(false);
                setPassword('');   
            }
            else{
                toast.error(data.message)
            }
        }
    }
    editData();
}

  React.useEffect(() => {
    setLoad(true)
    async function fetchData() {
      const response = await fetch(url + 'userlist', {
        method: 'GET',
        headers: {
          'Authorization': user?.token
        }
      })

      if (response.ok === true) {
        const data = await response.json();
        setLoad(false)
        console.log(data);
        if (data.status === 200) {
          setUserList(data.users_list?.map((item, index) => {
            return {
              '#': index + 1,
              'restaurant_name': item.restaurant_name,
              'id': item.id,
              'name': item.name,
              'email': item.email,
              'role':item.role,
            }
          }))
        }else{
          toast.error(data.message)
        }
      }
    }
    fetchData();
  }, [])

  const deleteEntry = () => {
    setLoad(true)
    async function deleteData() {
      const response = await fetch(url + 'deleteuser/' + id, {
        method: 'GET',
        headers: {
          'Authorization': user?.token
        }
      })

      const data = await response.json();
      setLoad(false)
      if (data.status === 200) {

        setModal(false);
        setId('');
        async function fetchData() {
          const response = await fetch(url + 'userlist', {
            method: 'GET',
            headers: {
              'Authorization': user?.token
            }
          })
    
          if (response.ok === true) {
            const data = await response.json();
            setLoad(false)
            if (data.status === 200) {
              setUserList(data.users_list?.map((item, index) => {
                return {
                  '#': index + 1,
                  'id': item.id,
                  'restaurant_name': item.restaurant_name,
                  'name': item.name,
                  'email': item.email,
                  'role': item.role,
                }
              }))
            }
          }
        }
        fetchData();

      } else {
        toast.error(data.message)
      }
    }
    deleteData();
  }

  const showModal = value => {
    setId(value);
    setModal(true)
  }

  return (
    <section>
      <ToastContainer />
      <CustomModal modal={modal} setModal={setModal} deleteEntry={deleteEntry} />
      <InventoryAdjustModal header="Adjust Password" label="Enter new Password" showModal={showEditModal} setShowModal={setShowEditModal} adjustAmount={password} setAdjustAmount={setPassword} submitAdjust={submitAdjust} />
      <Link to='/create/user'>Create User</Link>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              items={userList}
              fields={fields}
              columnFilter
              tableFilter
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status_id)}>
                        {item.status_id === 1 ? 'Active' : 'Inactive'}
                      </CBadge>
                    </td>
                  ),
                'role':
                (item) =>
                  (<td>{(item.role === 2) ? "Restaurant_admin" : "Staff"}</td>
                  ),
                'action': (item) => (
                  <td>
                    <Link to={`/edit/user/${item.id}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                    <i style={{cursor:'pointer'}} onClick={()=>showModalFunc(item.id)} class="fa fa-user" aria-hidden="true"></i>
                    <i style={{cursor:"pointer"}} onClick={()=>showModal(item.id)} class="fa fa-trash" aria-hidden="true"></i>
                  </td>
                )

              }
              }
            />
          </CCardBody>
        </CCard>
      </CCol>
    </section>
  )
}