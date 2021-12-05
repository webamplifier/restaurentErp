import { CBadge, CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import CustomModal from '../../components/CustomModal';
import PayModal from '../../components/PayModal';

const getBadge = status => {
  switch (status) {
    case 2: return 'success'
    // case 2: return 'secondary'
    case 1: return 'dark'
    // case 'Banned': return 'danger'
    default: return 'primary'
  }
}

export default function Dashboard() {
  const { user, setLoad } = React.useContext(userContext);
  const fields = ['#', 'invoice_number', 'customer_name', 'sale_date', 'total_amount', 'payment_Method', 'action'];
  const [salesList, setSalesList] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [paymodal, setPayModal] = React.useState(false);
  const [payAmount, setPayAmount] = React.useState('');
  const [paymentMode, setPaymentMode] = React.useState('')
  const [id, setId] = React.useState('')

  const payBill = () => {
    setLoad(true)
    async function payBillServer() {
      const formData = new FormData();
      formData.append('pay_amount', payAmount);
      formData.append('payment_mode', paymentMode);
      const response = await fetch(url + 'pay/sales/' + id, {
        method: 'POST',
        headers: {
          'Authorization': user.token
        },
        body: formData
      })

      if (response.ok === true) {
        const data = await response.json();

        if (data.status === 200) {
          setPayModal(false);
          setId('');
          async function fetchData() {
            const response = await fetch(url + 'salesList', {
              method: 'GET',
              headers: {
                'Authorization': user?.token
              }
            })

            if (response.ok === true) {
              const data = await response.json();
              setLoad(false)
              if (data.status === 200) {
                setSalesList(data.sale_list);
              } else {
                toast.error(data.message);
              }
            }
          }

          fetchData();
        } else {
          toast.error(data.message);
        }
      }
    }
    payBillServer();
  }

  const payModal = (item, id) => {
    setPayAmount(parseFloat(item.total_after_roundoff) - parseFloat(item.amount_paid))
    setPayModal(true);
    setId(id);
  }

  const deleteEntry = () => {
    setLoad(true)
    async function deleteData() {
      const response = await fetch(url + 'delete/sales/' + id, {
        method: 'GET',
        headers: {
          'Authorization': user?.token
        }
      })

      const data = await response.json();

      if (data.status === 200) {
        setModal(false);
        setId('');
        async function fetchData() {
          const response = await fetch(url + 'salesList', {
            method: 'GET',
            headers: {
              'Authorization': user?.token
            }
          })

          if (response.ok === true) {
            const data = await response.json();
            setLoad(false)
            if (data.status === 200) {
              setSalesList(data.sale_list);
            } else {
              toast.error(data.message);
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



  React.useEffect(() => {
    setLoad(true)
    async function fetchData() {
      const response = await fetch(url + 'salesListPending', {
        method: 'GET',
        headers: {
          'Authorization': user?.token
        }
      })

      if (response.ok === true) {
        const data = await response.json();
        setLoad(false)
        if (data.status === 200) {
          setSalesList(data.sale_list);
        } else {
          toast.error(data.message);
        }
      }
    }

    fetchData();
  }, [])

  return (
    <section>
      <ToastContainer />
      <CustomModal modal={modal} setModal={setModal} deleteEntry={deleteEntry} />
      <PayModal paymodal={paymodal} setPayModal={setPayModal} payAmount={payAmount} setPayAmount={setPayAmount} paymentMode={paymentMode} payBill={payBill} setPaymentMode={setPaymentMode} />
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              items={salesList}
              fields={fields}
              columnFilter
              tableFilter
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              scopedSlots={{
                '#': (item, index) => (
                  <td>
                    {index + 1}
                  </td>
                ),
                'invoice_number': (item) => (
                  <td>
                    {item.invoice_number}
                  </td>
                ),
                'customer_name': (item) => (
                  <td>
                    {item.customer_name}
                  </td>
                ),
                'sale_date': (item) => (
                  <td>
                    {item.sale_date.split(' ')[0]}
                  </td>
                ),
                'total_amount': (item) => (
                  <td>
                    {item.total_after_roundoff}
                  </td>
                ),
                'payment_Method': (item) => (
                  <td>
                    {item.payment_type}
                  </td>
                ),
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status_id)}>
                        {item.status_id === 1 ? 'Un Paid' : 'Paid'}
                      </CBadge>
                      <Link to={`/edit/sales/${item.id}`}>
                        <i className="fa fa-pencil"></i>
                      </Link>
                    </td>
                  ),
                'action': (item) => (
                  <td>
                    {/* <Link to={`/printBill/${item.id}`}><i class="fa fa-print" aria-hidden="true"></i></Link> */}
                    <Link to={`/edit/sales/${item.id}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                    {user?.role == 2 && (<>
                      <i style={{ cursor: "pointer" }} onClick={() => showModal(item.id)} class="fa fa-trash" aria-hidden="true"></i></>)}
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