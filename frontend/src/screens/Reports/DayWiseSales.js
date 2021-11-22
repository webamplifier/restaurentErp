import { CBadge, CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'

export default function DayWiseSales() {
    const { user,setLoad } = React.useContext(userContext);
    const fields = ['#', 'product_name', 'qty', 'item_rate', 'item_type', 'total'];
    const [purchaseList, setPurchaseList] = React.useState([]);
    const [to,setTo] = React.useState('');
    const [from,setFrom] = React.useState('');

    React.useEffect(() => {
        setLoad(true)
        async function fetchData() {
            const response = await fetch(url + 'get-sales-data', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    setPurchaseList(data.combined_data);
                } else {
                    toast.error(data.message);
                }
            }
        }

        fetchData();
    }, [])

    function handleSubmit(){
        if (to && from){
            setLoad(true)
            const formData = new FormData();
            formData.append('to',to);
            formData.append('from',from);
            async function submit(){
                const response = await fetch(url + 'get-sales-data',{
                    method : 'POST',
                    headers : {
                        'Authorization' : user?.token
                    },
                    body : formData
                });

                if (response.ok === true){
                    const data = await response.json();
                    setLoad(false)
                    if (data.status == 200){
                        setPurchaseList(data.combined_data);
                    }else{
                        toast.error(data.message)
                    }
                }else{
                    toast.error('Oops something went wrong!')
                }
            }

            submit().catch(err=>toast.error('Internal server error!. Please try again later'))
        }else{
            toast.error('Please fill the to and from date')
        }
    }

    return (
        <section>

            <div className="container">
                <div className="row align-items-center">
                    <div className="form-group col-md-4">
                        <label htmlFor="">From</label>
                        <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="">To</label>
                        <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={()=>handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
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
                                'item_rate' : (item,index) => (
                                    <td>
                                        {item.sales_price}
                                    </td>
                                ),
                                'total' : (item,index) => (
                                    <td>
                                        {item.amount_before_tax}
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
