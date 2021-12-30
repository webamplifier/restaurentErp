import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import CustomModal from '../../components/CustomModal';
import PayModal from '../../components/PayModal';

export default function Dashboard() {
  const { user, setLoad } = React.useContext(userContext);
  const [salesList, setSalesList] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [paymodal, setPayModal] = React.useState(false);
  const [payAmount, setPayAmount] = React.useState('');
  const [paymentMode, setPaymentMode] = React.useState('')
  const [to, setTo] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [total, setTotal] = React.useState(0);
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
                setSalesList(data.sale_list.map((item, index) => {
                  return {
                    '#': index + 1,
                    'id': item.id,
                    'invoice_number': item.invoice_number,
                    'sale_date': item.sale_date,
                    'customer_name': item.customer_name,
                    'total_after_roundoff': item.total_after_roundoff,
                    'payment_type': item.payment_type
                  }
                }));
                setTotal(parseInt(data.total_records));
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
              setSalesList(data.sale_list.map((item, index) => {
                return {
                  '#': index + 1,
                  'id': item.id,
                  'invoice_number': item.invoice_number,
                  'sale_date': item.sale_date,
                  'customer_name': item.customer_name,
                  'total_after_roundoff': item.total_after_roundoff,
                  'payment_type': item.payment_type
                }
              }));
              setTotal(parseInt(data.total_records))
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

  const columns = [
    {
      key: "#",
      text: "#",
      className: "id",
      sortable: true
    },
    {
      key: "invoice_number",
      text: "Invoice No",
      className: "invoice_number",
      sortable: true
    },
    {
      key: "sale_date",
      text: "Sale Date",
      className: "sale_date",
      sortable: true
    },
    {
      key: "customer_name",
      text: "Customer Name",
      className: "customer_name",
      sortable: true
    },
    {
      key: "total_after_roundoff",
      text: "Total Amount",
      className: "total_after_roundoff",
      sortable: true
    },
    {
      key: "payment_type",
      text: "Payment Method",
      className: "payment_type",
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
            <Link to={`/edit/sales/${record.id}`}>
              <i class="fa fa-pencil mr-2" aria-hidden="true" style={{ cursor: 'pointer' }}>
              </i>
            </Link>
            {user?.role == 2 && (<>
              <i style={{ cursor: "pointer" }}
                onClick={() => showModal(record.id)}
                class="fa fa-trash"
                aria-hidden="true"
              >
              </i>
            </>)
            }
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
        setSalesList(data.sale_list.map((item, index) => {
          return {
            '#': index + 1,
            'id': item.id,
            'invoice_number': item.invoice_number,
            'sale_date': item.sale_date,
            'customer_name': item.customer_name,
            'total_after_roundoff': item.total_after_roundoff,
            'payment_type': item.payment_type
          }
        }));
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
    let query = `salesListPending?page_number=${e.page_number}&page_size=${e.page_size}&filter_value=${e.filter_value}&to=${to}&from=${from}`;
    if (e.sort_order) {
      let sort = JSON.stringify(e.sort_order);
      query = `salesListPending?page_number=${e.page_number}&page_size=${e.page_size}&filter_value=${e.filter_value}&sort_order=${sort}&to=${to}&from=${from}`;
    }
    fetchData(query);
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
          setSalesList(data.sale_list.map((item, index) => {
            return {
              '#': index + 1,
              'id': item.id,
              'invoice_number': item.invoice_number,
              'sale_date': item.sale_date,
              'customer_name': item.customer_name,
              'total_after_roundoff': item.total_after_roundoff,
              'payment_type': item.payment_type
            }
          }));
          setTotal(parseInt(data.total_records));
        } else {
          toast.error(data.message);
        }
      }
    }

    fetchData();
  }, [])
  
  function handleSubmit() {
    if (to && from) {
        setLoad(true)
        async function submit() {
            const response = await fetch(url + `salesListPending?to=${to}&from=${from}`, {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                },
            });

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status == 200) {
                    setSalesList(data.sale_list.map((item,index)=>{
                        return{
                          '#': index+1,
                          'id': item.id,
                          'invoice_number': item.invoice_number,
                          'sale_date':item.sale_date,
                          'customer_name':item.customer_name,
                          'total_after_roundoff': item.total_after_roundoff,
                          'payment_type': item.payment_type
                        }
                }));
                    setTotal(parseInt(data.total_records))
                } else {
                    toast.error(data.message)
                }
            } else {
                toast.error('Oops something went wrong!')
            }
        }
        submit().catch(err => toast.error('Internal server error!. Please try again later'))
    } else {
        toast.error('Please fill the to and from date')
    }
}

  return (
    <section>
      <div className="container">
        <div className="row align-items-center">
          <div className="form-group col-md-4">
            <label htmlFor="">From</label>
            <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="form-control" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="">To</label>
            <input type="date" value={to} onChange={e => setTo(e.target.value)} className="form-control" />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <CustomModal modal={modal} setModal={setModal} deleteEntry={deleteEntry} />
      <PayModal paymodal={paymodal} setPayModal={setPayModal} payAmount={payAmount} setPayAmount={setPayAmount} paymentMode={paymentMode} payBill={payBill} setPaymentMode={setPaymentMode} />
      <ReactDatatable
        config={config}
        records={salesList}
        columns={columns}
        total_record={total}
        onChange={(e) => handleChange(e)}
        dynamic={true}
      />
    </section>
  )
}