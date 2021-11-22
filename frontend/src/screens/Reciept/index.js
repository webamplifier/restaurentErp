import { CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import InventoryAdjustModal from '../../components/InventoryAdjustModal';

export default function Index() {
    const { user, setLoad } = React.useContext(userContext);
    const fields = ['#', 'Type', 'Amount', 'Date', 'Payment_Type', 'action'];
    const [recieptList, setRecieptList] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [id, setId] = React.useState('');
    const [adjutAmount, setAdjustAmount] = React.useState('');

    const showModalFunc = (id) => {
        setId(id);
        let result = window.prompt("Enter the amount to be add or subtract");
        if (result) {
            setLoad(true)
            const formData = new FormData();
            formData.append('new_amount', result);
            async function editData() {

                const respone = await fetch(url + 'edit/reciept/' + id, {
                    method: 'POST',
                    headers: {
                        'Authorization': user.token,
                    },
                    body: formData
                })

                if (respone.ok === true) {
                    const data = await respone.json();
                    setLoad(false)
                    if (data.status === 200) {
                        setId('');
                        async function fetchData() {
                            const response = await fetch(url + 'recieptList', {
                                method: 'GET',
                                headers: {
                                    'Authorization': user?.token
                                }
                            })

                            if (response.ok === true) {
                                const data = await response.json();

                                if (data.status === 200) {
                                    setRecieptList(data.reciept_list);
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

            }
            editData();
        }
    }

    React.useEffect(() => {
        setLoad(true)
        async function fetchData() {
            const response = await fetch(url + 'recieptList', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    console.log('Reciept', data)
                    setRecieptList(data.reciept_list);
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
            <InventoryAdjustModal showModal={showModal} setShowModal={setShowModal} adjutAmount={adjutAmount} setAdjustAmount={setAdjustAmount} />
            <CCol xs="12" lg="12">
                <CCard>
                    <CCardBody>
                        <CDataTable
                            items={recieptList}
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
                                'Type': (item) => (<td>{(item.type === 1) ? "purchase" : "sales"}</td>),
                                'Amount': (item) => (<td>{item.amount}</td>),
                                'Date': (item) => (<td>{item.date}</td>),
                                'Payment_Type': (item) => (<td>{item.payment_type}</td>),
                                'action': (item) => (
                                    <td>
                                        <i style={{ cursor: 'pointer' }} onClick={() => showModalFunc(item.id)} class="fa fa-pencil" aria-hidden="true"></i>
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