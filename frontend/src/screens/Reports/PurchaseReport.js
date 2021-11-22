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

export default function PurchaseReport() {
    const { user,setLoad } = React.useContext(userContext);
    const fields = ['#', 'invoice_number', 'party_name', 'purchase_date', 'bill_amount', 'paid_amount', 'remain_amount', 'status', 'action'];
    const [purchaseList, setPurchaseList] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [paymodal,setPayModal] = React.useState(false);
    const [payAmount,setPayAmount] = React.useState('');
    const [paymentMode,setPaymentMode] = React.useState('')
    const [id, setId] = React.useState('')

    const payBill = () => {
        setLoad(true)
        async function payBillServer(){
            const formData = new FormData();
            formData.append('pay_amount',payAmount);
            formData.append('payment_mode',paymentMode);
            const response = await fetch(url + 'pay/purchase/' + id,{
                method : 'POST',
                headers : {
                    'Authorization' : user.token
                },
                body : formData
            })

            if (response.ok === true){
                const data = await response.json();

                if (data.status === 200){
                    setPayModal(false);
                    setId('');
                    async function fetchData() {
                        const response = await fetch(url + 'purchase/report', {
                            method: 'GET',
                            headers: {
                                'Authorization': user?.token
                            }
                        })
            
                        if (response.ok === true) {
                            const data = await response.json();
                            setLoad(false)
                            if (data.status === 200) {
                                setPurchaseList(data.purchase_data);
                            } else {
                                toast.error(data.message);
                            }
                        }
                    }
            
                    fetchData();
                }else{
                    toast.error(data.message);
                }
            }
        }
        payBillServer();
    }

    const payModal = (item,id) => {
        setPayAmount(parseFloat(item.total_after_roundoff) - parseFloat(item.amount_paid))
        setPayModal(true);
        setId(id);
    }

    const deleteEntry = () => {
        setLoad(true)
        async function deleteData() {
            const response = await fetch(url + 'deletePurchase/' + id, {
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
                    const response = await fetch(url + 'purchaseList', {
                        method: 'GET',
                        headers: {
                            'Authorization': user?.token
                        }
                    })
        
                    if (response.ok === true) {
                        const data = await response.json();
                        setLoad(false)
                        if (data.status === 200) {
                            setPurchaseList(data.purchase_list);
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
            const response = await fetch(url + 'purchaseList', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    setPurchaseList(data.purchase_list);
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
            <PayModal paymodal={paymodal} setPayModal={setPayModal} payAmount={payAmount} setPayAmount={setPayAmount} paymentMode={paymentMode} payBill={payBill} setPaymentMode={setPaymentMode}  />
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
                                '#' : (item,index) => (
                                    <td>
                                        {index + 1}
                                    </td>
                                ),
                                'purchase_date' : (item,index) => (
                                    <td>
                                        {item.purchase_date.split(' ')[0]}
                                    </td>
                                ),
                                'Payment Method' : (item) => (
                                    <td>
                                        {item.payment_type}
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
                                            <CBadge color={getBadge(item.status)}>
                                                {item.status === 1 ? 'Un Paid' : 'Paid'}
                                            </CBadge>
                                        </td>
                                    ),
                                'action': (item) => (
                                    <td>
                                        {item.status === 1 && <i style={{cursor:'pointer'}} onClick={()=>payModal(item,item.id)} class="fa fa-money" aria-hidden="true"></i>}
                                        <Link to={`/edit/purchase/${item.id}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link>
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