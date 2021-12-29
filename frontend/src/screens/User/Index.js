import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import CustomModal from 'src/components/CustomModal';
import InventoryAdjustModal from 'src/components/InventoryAdjustModal';

export default function Index() {
  const [id, setId] = React.useState(null);
  const [password, setPassword] = React.useState('');
  const [modal, setModal] = React.useState(false)
  const { user, setLoad } = React.useContext(userContext);
  const [total, setTotal] = React.useState(0);
  const [userList, setUserList] = React.useState([]);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const showModalFunc = (id) => {
    setId(id);
    setShowEditModal(true);
  }

  const submitAdjust = () => {
    setLoad(true)
    const formData = new FormData();
    formData.append('password', password);
    async function editData() {
      const respone = await fetch(url + 'editPassword/' + id, {
        method: 'POST',
        headers: {
          'Authorization': user.token,
        },
        body: formData
      })

      if (respone.ok === true) {
        const data = await respone.json();
        setLoad(false)
        console.log(data);
        if (data.status === 200) {
          setShowEditModal(false);
          setPassword('');
        }
        else {
          toast.error(data.message)
        }
      }
    }
    editData();
  }

  React.useEffect(() => {
    setLoad(true)
    async function fetchData() {
      const response = await fetch(url + 'fetchUserList', {
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
          setUserList(data.list);
          setTotal(parseInt(data.total_records));
        } else {
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
          const response = await fetch(url + 'fetchUserList', {
            method: 'GET',
            headers: {
              'Authorization': user?.token
            }
          })

          if (response.ok === true) {
            const data = await response.json();
            setLoad(false)
            if (data.status === 200) {
              setUserList(data.list);
              setTotal(parseInt(data.total_records));
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

  const columns = [
    {
      key: "restaurant_name",
      text: "Restaurant_Name",
      className: "restaurant_name",
      sortable: true
    },
    {
      key: "name",
      text: "Name",
      className: "name",
      sortable: true
    },
    {
      key: "email",
      text: "Email",
      className: "email",
      sortable: true
    },
    {
      key: "role",
      text: "Role",
      className: "role",
      sortable: true
    },
    {
      key: "action",
      text: "Action",
      className: "action",
      width: 100,
      sortable: false,
      cell: record => {
        return (
          <Fragment>
            {user?.role == 2 && <>
              <Link to={`/edit/user/${record.id}`}>
                <i class="fa fa-pencil" aria-hidden="true">
                </i>
              </Link>
              <i style={{ cursor: 'pointer' }}
                onClick={() => showModalFunc(record.id)}
                class="fa fa-user" aria-hidden="true">
              </i>
              <i style={{ cursor: "pointer" }}
                onClick={() => showModal(record.id)}
                class="fa fa-trash" aria-hidden="true">
              </i>
            </>}
          </Fragment>
        );
      }
    }
  ];
  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    button: {
      excel: false,
      print: false,
      extra: false,
    }
  }
  async function fetchData(query) {
    setLoad(true);
    const response = await fetch(url + query, {
      method: 'GET',
      headers: {
        'Authorization': user?.token
      }
    })
    if (response.ok === true) {
      const data = await response.json();
      setLoad(false)
      if (data.status === 200) {
        setUserList(data.list);
        setTotal(parseInt(data.total_records));
      } else {
        toast.error(data.message);
      }
    }
  }

  const showModal = value => {
    setId(value);
    setModal(true)
  }

  const handleChange = (e) => {
    let query = `fetchUserList?page_number=${e.page_number}&page_size=${e.page_size}&filter_value=${e.filter_value}`;
    if (e.sort_order) {
      let sort = JSON.stringify(e.sort_order);
      query = `fetchUserList?page_number=${e.page_number}&page_size=${e.page_size}&filter_value=${e.filter_value}&sort_order=${sort}`;
    }
    fetchData(query);
  }
  return (
    <section>
      <ToastContainer />
      <CustomModal modal={modal} setModal={setModal} deleteEntry={deleteEntry} />
      <InventoryAdjustModal header="Adjust Password" label="Enter new Password" showModal={showEditModal} setShowModal={setShowEditModal} adjustAmount={password} setAdjustAmount={setPassword} submitAdjust={submitAdjust} />
      <Link to='/create/user'>Create User</Link>
      <ReactDatatable
        config={config}
        records={userList}
        columns={columns}
        total_record={total}
        onChange={(e) => handleChange(e)}
        dynamic={true}
      />
    </section>
  )
}