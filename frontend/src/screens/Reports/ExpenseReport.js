import { CBadge, CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import CustomModal from '../../components/CustomModal';
const getBadge = status => {
    switch (status) {
        case 2: return 'success'
        // case 2: return 'secondary'
        case 1: return 'dark'
        // case 'Banned': return 'danger'
        default: return 'primary'
    }
}

export default function ExpenseReport() {
    const { user,setLoad } = React.useContext(userContext);
    const fields = ['#', 'expense_date','to','item','paid_Amount','action'];
    const [expenseList, setExpenseList] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [id, setId] = React.useState('')
    const [to, setTo] = React.useState('');
    const [from, setFrom] = React.useState('');

    const deleteEntry = () => {
        setLoad(true)
        async function deleteData() {
            const response = await fetch(url + 'deleteexpense/' + id, {
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
                    const response = await fetch(url + 'expenselist', {
                        method: 'GET',
                        headers: {
                            'Authorization': user?.token
                        }
                    })
        
                    if (response.ok === true) {
                        const data = await response.json();
                        setLoad(false)
                        if (data.status === 200) {
                            setExpenseList(data.expense_list);
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

    function handleSubmit() {
        if (to && from) {
            setLoad(true)
            const formData = new FormData();
            formData.append('to', to);
            formData.append('from', from);
            async function submit() {
                const response = await fetch(url + 'filterExpensesByDate', {
                    method: 'POST',
                    headers: {
                        'Authorization': user?.token
                    },
                    body: formData
                });

                if (response.ok === true) {
                    const data = await response.json();
                    setLoad(false)
                    if (data.status == 200) {
                        setExpenseList(data.expense_list);
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

    React.useEffect(() => {
        setLoad(true)
        async function fetchData() {
            const response = await fetch(url + 'expenselist', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    setExpenseList(data.expense_list);
                } else {
                    toast.error(data.message);
                }
            }
        }

        fetchData();
    }, [])

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
            <CCol xs="12" lg="12">
                <CCard>
                    <CCardBody>
                        <CDataTable
                            items={expenseList}
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
                                'expense_date':(item)=>(
                                    <td>
                                        {item.expense_date.split(' ')[0]}
                                    </td>
                                ),
                                'to':(item)=>(
                                    <td>
                                        {item.name}
                                    </td>
                                ),
                                'item':(item)=>(
                                    <td>
                                    {item.item_name}
                                    </td>
                                ),
                                'paid_Amount' : (item) => (
                                    <td>
                                        {item.paid_amount}
                                    </td>
                                ),
                                'action': (item) => (
                                    <td>
                                        <Link to={`/edit/expense/${item.id}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                                        <i style={{ cursor: "pointer" }} onClick={() => showModal(item.id)} class="fa fa-trash" aria-hidden="true"></i>
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
