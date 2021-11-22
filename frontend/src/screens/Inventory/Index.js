import {CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import InventoryAdjustModal from '../../components/InventoryAdjustModal';

export default function Index() {
    const { user,setLoad } = React.useContext(userContext);
    const fields = ['#', 'product_name', 'available_qty', 'action'];
    const [inventoryList, setInventoryList] = React.useState([]);
    const [showModal,setShowModal] = React.useState(false);
    const [id,setId] = React.useState('');
    const [adjutAmount,setAdjustAmount] = React.useState('');
    
    const showModalFunc = (id) => {
        setId(id);
        setShowModal(true);
    }

    const submitAdjust = () => {
        setLoad(true)
        const formData = new FormData();
        formData.append('new_qty',adjutAmount);
        async function editData(){
            
            const respone = await fetch(url + 'edit/inventory/' + id,{
                method : 'POST',
                headers : {
                    'Authorization' : user.token,
                },
                body : formData
            })

            if (respone.ok === true){
                const data = await respone.json();
                setLoad(false)
                if (data.status === 200){
                    setId('');
                    setAdjustAmount('');
                    setShowModal(false);
                    async function fetchData() {
                        const response = await fetch(url + 'inventoryList', {
                            method: 'GET',
                            headers: {
                                'Authorization': user?.token
                            }
                        })
            
                        if (response.ok === true) {
                            const data = await response.json();
            
                            if (data.status === 200) {
                                setInventoryList(data.inventory_list);
                            } else {
                                toast.error(data.message);
                            }
                        }
                    }
            
                    fetchData();
                }else{
                    toast.error(data.message)
                }
            }

        }
        editData();
    }

    React.useEffect(() => {
        setLoad(true)
        async function fetchData() {
            const response = await fetch(url + 'inventoryList', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    console.log('inventory',data)
                    setInventoryList(data.inventory_list);
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
            <InventoryAdjustModal showModal={showModal} setShowModal={setShowModal} adjutAmount={adjutAmount} setAdjustAmount={setAdjustAmount} submitAdjust={submitAdjust} />
            <CCol xs="12" lg="12">
                <CCard>
                    <CCardBody>
                        <CDataTable
                            items={inventoryList}
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
                                'product_name' : (item) => (<td>{item.product_name}</td>),
                                'available_qty' : (item) => (<td>{item.total_qty}</td>),
                                'action': (item) => (
                                    <td>
                                        <i style={{cursor:'pointer'}} onClick={()=>showModalFunc(item.id)} class="fa fa-pencil" aria-hidden="true"></i>
                                        {/* <i style={{ cursor: "pointer" }} onClick={() => showModal(item.id)} class="fa fa-trash" aria-hidden="true"></i> */}
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