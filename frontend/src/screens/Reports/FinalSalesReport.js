import { CBadge, CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { node_url, url } from 'src/helpers/helpers';
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

export default function FinalSalesReport() {
    const { user,setLoad } = React.useContext(userContext);
    const fields = ['#', 'invoice_number', 'invoice_date', 'client_name', 'vehicle_name', 'bill_amount', 'paid_amount', 'remain_amount', 'status', 'action'];
    const [purchaseList, setPurchaseList] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [paymodal, setPayModal] = React.useState(false);
    const [payAmount, setPayAmount] = React.useState(0);
    const [paymentMode, setPaymentMode] = React.useState('')
    const [id, setId] = React.useState('')

    const payBill = () => {
        setLoad(true)
        async function payBillServer() {
            const formData = new FormData();
            formData.append('pay_amount', payAmount);
            formData.append('payment_mode', paymentMode);
            const response = await fetch(url + 'pay/invoice/' + id, {
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
                        const response = await fetch(url + 'fetch-invoicebill-list', {
                            method: 'GET',
                            headers: {
                                'Authorization': user?.token
                            }
                        })
            
                        if (response.ok === true) {
                            const data = await response.json();
                            setLoad(false)
                            if (data.status === 200) {
                                setPurchaseList(data.invoice_list);
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
        setPayModal(true);
        setId(id);
    }

    const deleteEntry = () => {
        setLoad(true)
        async function deleteData() {
            const response = await fetch(url + 'delete/jobcard/' + id, {
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
                    const response = await fetch(url + 'fetch-invoicebill-list', {
                        method: 'GET',
                        headers: {
                            'Authorization': user?.token
                        }
                    })
        
                    if (response.ok === true) {
                        const data = await response.json();
                        setLoad(false)
                        if (data.status === 200) {
                            setPurchaseList(data.invoice_list);
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
            const response = await fetch(url + 'fetch-invoicebill-list', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    setPurchaseList(data.invoice_list);
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
                            items={purchaseList}
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
                                'bill_amount' : (item) => (
                                    <td>
                                        {item.total_after_roundoff}
                                    </td>
                                ),
                                'paid_amount': (item) => (
                                    <td>
                                        {item.amount_paid}
                                    </td>
                                ),
                                'status':
                                    (item) => (
                                        <td>
                                            {item.invoice_payment_status === 0 ? 'unpaid' : 'paid'}
                                        </td>
                                    ),
                                'action': (item) => (
                                    <td>
                                        {user?.role_id === 1 && (
                                            <>
                                                <Link to={`/edit/jobcard/${item.id}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                                                <i style={{ cursor: "pointer" }} onClick={() => showModal(item.id)} class="fa fa-trash" aria-hidden="true"></i>
                                            </>
                                        )}

                                        {item.invoice_payment_status == 0 && <i style={{cursor:'pointer'}} onClick={()=>payModal(item.id,item.id)} class="fa fa-usd" aria-hidden="true"></i>}
                                        <a target="_blank" href={`${node_url}print-sales/${item.id}`} ><i class="fa fa-print" aria-hidden="true"></i></a>
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
