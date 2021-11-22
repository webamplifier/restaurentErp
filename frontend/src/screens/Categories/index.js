import { CBadge, CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import {toast,ToastContainer} from 'react-toastify'
import {userContext} from '../../context/UserContext'
import CustomModal from '../../components/CustomModal';

const getBadge = status => {
    switch (status) {
      case '1': return 'success'
      case '2': return 'secondary'
      // case 'Pending': return 'warning'
      // case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

export default function Index(){
  const {user,setLoad} = React.useContext(userContext);
    const fields = ['#','name','code','action'];
    const [categoryList, setCategoryList] = React.useState([]);
    const [modal,setModal] = React.useState(false);
    const [id,setId] = React.useState('')

    const deleteEntry = () => {
      setLoad(true)
      async function deleteData(){
        const response = await fetch(url + 'deletecategory/' + id,{
          method : 'GET',
          headers : {
            'Authorization' : user?.token
          }
        })

        const data = await response.json();

        if (data.status === 200){
          setModal(false);
          setId('');
          
          async function fetchData(){
            const response = await fetch(url + 'categorylist',{
              method : 'GET',
              headers : {
                'Authorization' : user?.token
              }
            })
    
            if (response.ok === true){
              const data = await response.json();
    
              if (data.status === 200){
                setLoad(false)
                setCategoryList(data.category_list);
              }else{
                setLoad(false)
                toast.error(data.message);
              }
            }
          }
    
          fetchData();
        }else{
          setLoad(false)
          toast.error(data.message)
        }
      }
      deleteData();
    }

    const showModal = value => {
      setId(value);
      setModal(true)
    }

    React.useEffect(()=>{
      setLoad(true)
      async function fetchData(){
        const response = await fetch(url + 'categorylist',{
          method : 'GET',
          headers : {
            'Authorization' : user?.token
          }
        })

        if (response.ok === true){
          const data = await response.json();

          if (data.status === 200){
            setLoad(false)
            setCategoryList(data.category_list);
          }else{
            setLoad(false)
            toast.error(data.message);
          }
        }
      }

      fetchData();
    },[])

    return(
        <section>
          <ToastContainer />
          <CustomModal modal={modal} setModal={setModal} deleteEntry={deleteEntry} />
            <Link to='/create/category'>Create Category</Link>
            <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
            <CDataTable
              items={categoryList}
              fields={fields}
              columnFilter
              tableFilter
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status_id)}>
                        {item.status_id === 1 ? 'Active' : 'Inactive'}
                      </CBadge>
                    </td>
                  ),
                'action': (item)=>(
                  <td>
                    <Link to={`/edit/category/${item.id}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                    <i style={{cursor:"pointer"}} onClick={()=>showModal(item.id)} class="fa fa-trash" aria-hidden="true"></i>
                  </td>
                ),

                '#' : (item,index) => (
                  <td>
                    {index + 1}
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