import React from 'react'
import plus from '../../assets/images_manual/add.svg'
import { url, GST } from 'src/helpers/helpers';
import { userContext } from '../../context/UserContext'
import { toast, ToastContainer } from 'react-toastify';
import {useParams} from 'react-router-dom'

export default function Create() {
    const {id} = useParams();
    const { user,setLoad } = React.useContext(userContext);
    const [invoiceNo, setInvoiceNo] = React.useState('');
    const [purchaseDate, setPurchaseDate] = React.useState('');
    const [currentParty, setCurrentParty] = React.useState('');
    const [creditPeriod, setCreditPeriod] = React.useState('');
    const [currentLos, setCurrentLos] = React.useState('');
    const [discountType, setDiscountType] = React.useState('None');
    const [currentGst, setCurrentGst] = React.useState(GST[0]);
    const [currentProduct, setCurrentProduct] = React.useState('');
    const [currentUnit, setCurrentUnit] = React.useState('');
    const [costPerUnit, setCostPerUnit] = React.useState(0);
    const [qty, setQty] = React.useState(0);
    const [freeQty, setFreeQty] = React.useState(0);
    const [currentDiscountCriteria, setCurrentDiscountCriteria] = React.useState('percent');
    const [discountValue, setDiscountValue] = React.useState(0);
    const [itemDescription, setItemDescription] = React.useState('');
    const [remarks, setRemarks] = React.useState('');


    const [allProducts, setAllProducts] = React.useState([]);
    const [allParty, setAllParty] = React.useState([]);
    const [allStates, setAllStates] = React.useState([]);
    const [unitOptions, setUnitOptions] = React.useState([]);
    const [allItems, setAllItems] = React.useState([]);

    //final related variables and states
    let finalAmount = 0;
    let roundOffTotal = 0;
    let remainAmount = 0;
    let discount_amount_final = 0;
    let amount_before_discount_final = 0;
    let amount_after_discount_final = 0;


    const [finalDiscountCriteria, setFinalDiscountCriteria] = React.useState('percent');
    const [finalDiscountValue, setFinalDiscountValue] = React.useState(0);
    const [paidAmount, setPaidAmount] = React.useState(0);
    const [paymentMethod, setPaymentMethod] = React.useState('cash');
    const [totalValue, setTotalValue] = React.useState(0);
    const [taxableAmount,setTaxableAmount] = React.useState(0);
    const [discountAmount,setDiscountAmount] = React.useState(0);

    //edit related states
    const [currentEditItem, setCurrentEditItem] = React.useState('');

    //item based variables
    let perItemAmount = 0;
    let amount_before_tax_item = 0;
    let amount_after_tax_item = 0;
    let tax_amount_item = 0;
    let amount_before_discount = 0;
    let amount_after_discount = 0;
    let discount_amount = 0;

    React.useEffect(() => {
        setLoad(true)
        async function fetchData() {
            const response = await fetch(url + 'expense-detail/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    let header = data.header;
                    setPurchaseDate(header.date);
                    setCurrentParty(header.to);
                    setTotalValue(header.total_value);
                    setRemarks(header.remarks)
                    roundOffTotal = header.round_off_total;
                    setAllItems(data.items)
                } else {
                    toast.error(data.message)
                }
            }
        }

        fetchData();


        // products grab
        async function fetchProd() {
            setLoad(true)
            const response = await fetch(url + 'productlist', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    setAllProducts(data?.product_list?.map(item=>{
                        return {
                            value : item.id,
                            label : item.product_name,
                            type : item.type
                        }
                    }))
                } else {
                    toast.error(data.message)
                }
            }
        }

        fetchProd();
    }, [])


    const calculateTotal = () => {
        if (costPerUnit > 0 && qty > 0) {
            perItemAmount = parseFloat(costPerUnit) * parseFloat(qty);
        }
    }

    calculateTotal()

    const calculateFinalPrice = () => {
        if (totalValue > 0) {
            roundOffTotal = Math.round(totalValue)
        }
    }

    calculateFinalPrice()

    const handleSubmitItem = () => {
        if (purchaseDate && currentParty && currentProduct &&costPerUnit && qty) {
            let new_item_dict = {
                item: currentProduct,
                description: itemDescription,
                cost_per_unit: costPerUnit,
                qty: qty,
                total: perItemAmount,
            };

            

            if (currentEditItem) {
                setCurrentEditItem('')
                let new_list_edit = []
                allItems.map((item, index) => {
                    if (index == parseInt(currentEditItem)-1) {
                        
                        new_list_edit.push(new_item_dict)
                    } else {
                        
                        new_list_edit.push(item)
                    }
                })
                let taxable_amount = 0;
                let total = 0;
                let discount_amount = 0;
                new_list_edit.map(item=>{
                    taxable_amount = parseFloat(taxable_amount) + parseFloat(item.tax_amount_item);
                    total = parseFloat(total) + parseFloat(item.total);
                    discount_amount = parseFloat(discount_amount) + parseFloat(item.discount_amount)
                })
                setTaxableAmount(taxable_amount);
                setTotalValue(total);
                setDiscountAmount(discount_amount);
                setAllItems(new_list_edit);
            } else {
                let new_item_list = [...allItems, new_item_dict];

                let taxable_amount = 0;
                let total = 0;
                let discount_amount = 0;
                new_item_list.map(item=>{
                    taxable_amount = parseFloat(taxable_amount) + parseFloat(item.tax_amount_item);
                    total = parseFloat(total) + parseFloat(item.total);
                    discount_amount = parseFloat(discount_amount) + parseFloat(item.discount_amount)
                })
                setTaxableAmount(taxable_amount);
                setDiscountAmount(discount_amount);
                setTotalValue(total);

                setTotalValue(parseFloat(totalValue) + parseFloat(perItemAmount))
                setAllItems(new_item_list);
            }



            setCurrentProduct('');
            setCostPerUnit(0);
            setCurrentUnit('');
            setCostPerUnit(0);
            setQty(0);
            setFreeQty(0);
            setCurrentGst('');
            setCurrentDiscountCriteria('');
            setDiscountValue(0);
            setItemDescription('');
            perItemAmount = 0;

            amount_before_tax_item = 0;
            amount_after_tax_item = 0;
            tax_amount_item = 0;
            amount_before_discount = 0;
            amount_after_discount = 0;
            discount_amount = 0;

        } else {
            toast.error('Fill all fields having *')
        }
    }

    const finalSubmit = () => {
        if (purchaseDate && currentParty && allItems.length > 0 && totalValue){
            setLoad(true)
            let header = {
                invoiceNo : invoiceNo,
                purchaseDate : purchaseDate,
                currentParty : currentParty,
                discountType : discountType
            }
            let final = {
                totalValue : totalValue,
                finalAmount : finalAmount,
                roundOffTotal : roundOffTotal,
                paidAmount : paidAmount,
                remainAmount : remainAmount,
                finalDiscountValue : finalDiscountValue,
                finalDiscountCriteria : finalDiscountCriteria,
                remarks : remarks,
                paymentMethod : paymentMethod,
                taxableAmount : taxableAmount,
                discountAmount : discountAmount
            }

            let final_array = [];

            final_array.push(header);
            final_array.push(final);

            const formData = new FormData();
            formData.append('final_array',JSON.stringify(final_array));
            formData.append('allItems',JSON.stringify(allItems));

            async function submitPurchase(){
                const response = await fetch(url + 'edit-expense/' + id,{
                    method : 'POST',
                    headers : {
                        'Authorization' : user.token
                    },
                    body : formData
                });
                if (response.ok == true){
                    const data = await response.json();
                    setLoad(false)
                    if (data.status == 200){
                        window.location.reload();
                    }else{
                        toast.error(data.message);
                    }
                }
            }

            submitPurchase()
        }else{
            toast.error('Please fill the data with *');
        }
    }

    const handleEdit = (item, index_value) => {
        setCurrentEditItem(index_value);
        setCurrentProduct(item.item);
        setItemDescription(item.description)
        setCostPerUnit(item.cost_per_unit);
        setQty(item.qty);
        perItemAmount = item.total;
    }

    // if (allItems.length > 0) {

    // }

    const handleDelete = (index_value) => {
        let total = 0;
        const new_item = [];
        allItems.map((item, index) => {
            if (index != index_value) {
                new_item.push(item)
            }
        })
        new_item.map(item=>{
            total = parseFloat(total) + parseFloat(item.total);
        })
        setTotalValue(total);
        setAllItems(new_item);
    }

    return (
        <div className="container full-size-create-page-main-section">
            <ToastContainer />
            <form>
                <div className='p-sm-5 px-md-3 create-form-field create-purchase-page'>
                    <div class="py-4 px-2 form-row create-purchase-header">
                        <div class="form-group col-md-4">
                            <label for="date">Date<span className='required-label'>*</span></label>
                            <input value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} type="date" class="form-control" id="date" required />
                        </div>
                        <div class="form-group col-md-5">
                                <label for="input-party">To<span className='required-label'>*</span></label>
                                <input className="form-control" value={currentParty} onChange={e=>setCurrentParty(e.target.value)} />
                        </div>
                    </div>




                    <div class="my-4 form-row">
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Item<span className='required-label'>*</span></label>
                            <input value={currentProduct} onChange={e=>setCurrentProduct(e.target.value)} className="form-control" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Item Description</label>
                            <textarea value={itemDescription} onChange={e => setItemDescription(e.target.value)} class="form-control"></textarea>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Cost/Unit<span className='required-label'>*</span></label>
                            <input value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} type="text" class="form-control" id="" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Quantity<span className='required-label'>*</span></label>
                            <input value={qty} onChange={e => setQty(e.target.value)} type="text" class="form-control" id="" />
                        </div>
                        <div class="form-group col-md-4 row">
                            <div class="form-group col-9">
                                <label for="invoice-number">Total<span className='required-label'>*</span></label>
                                <input value={perItemAmount} readOnly type="text" class="form-control" id="" />
                            </div>
                            <div class="form-group col-3 p-0 purchase-create-mid-plus-img">
                                <img className='img-fluid' onClick={() => handleSubmitItem()} style={{ cursor: 'pointer' }} src={plus} alt="" />
                            </div>
                        </div>

                    </div>



                    {allItems.length > 0 && <div className='my-table-responsive'>
                        <table class="table mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Items</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Cost/Unit</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='table-borderless'>
                                {allItems.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.item}
                                            </td>
                                            <td>{item.description}</td>
                                            <td>{item.cost_per_unit}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.total}</td>
                                            <td>
                                                <i style={{ cursor: 'pointer' }} onClick={() => handleEdit(item, index+1)} class="fa fa-pencil" aria-hidden="true"></i>
                                                <i onClick={() => handleDelete(index)} style={{ cursor: "pointer" }} class="fa fa-trash" aria-hidden="true"></i>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>}
                    <div className='row mt-5 justify-content-between purchase-create-footer'>
                        <div class="form-group col-md-5">
                            <label for="exampleFormControlTextarea1">Remarks</label>
                            <textarea value={remarks} onChange={e => setRemarks(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                        </div>
                        <div className='col-md-6'>
                            <div class="form-group row">
                                <label for="" class="col-md-4 col-form-label">Total Value</label>
                                <div class="col-md-8">
                                    <input type="text" value={totalValue} readOnly class="form-control" id="" />
                                </div>
                            </div>
                            
                            
                            <div class="form-group row">
                                <label for="" class="col-md-4 col-form-label">Round Off Total</label>
                                <div class="col-md-8">
                                    <input readOnly value={roundOffTotal} type="text" class="form-control" id="" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="d-flex justify-content-center create-catagory-btns">
                    <button type="button" onClick={() => window.location.reload()} class="font-weight-bold m-3 py-2 px-4 btn btn-danger">Cancel<i
                        class="px-2 fa fa-times" aria-hidden="true"></i></button>
                    <button type="button" onClick={()=>finalSubmit()} class="font-weight-bold m-3 py-2 px-4 btn btn-success">Save<i
                        class="px-2 fa fa-floppy-o" aria-hidden="true"></i></button>
                </div>
            </form>
        </div>
    )
}
