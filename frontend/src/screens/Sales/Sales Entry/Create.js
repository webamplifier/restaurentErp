import React from 'react'
import plus from '../../../assets/images_manual/add.svg'
import Select from 'react-select';
import { url, currentDate } from 'src/helpers/helpers';
import { userContext } from '../../../context/UserContext'
import { toast, ToastContainer } from 'react-toastify';
import {useHistory} from 'react-router-dom'

export default function Create() {
    const history = useHistory();    
    const { user,setLoad } = React.useContext(userContext);
    const [invoiceNo, setInvoiceNo] = React.useState('');
    const [saleDate, setSaleDate] = React.useState(currentDate(new Date().toLocaleDateString()));
    const [tax, setTax] = React.useState(0);
    const [customer, setCustomer] = React.useState('');
    const [mobile_number, setMobileNumber] = React.useState(' ');
    const [discountType, setDiscountType] = React.useState('Bill');
    const [currentProduct, setCurrentProduct] = React.useState('');
    const [qty, setQty] = React.useState(1);
    const [mrp, setMrp] = React.useState(0);
    const [itemDescription, setItemDescription] = React.useState('');
    const [remarks, setRemarks] = React.useState('');

    const [taxList,setTaxList] = React.useState([])

    const [allProducts, setAllProducts] = React.useState([]);
    const [allItems, setAllItems] = React.useState([]);

    //final related variables and states
    let finalAmount = 0;
    let discount_amount_final = 0;
    let amount_before_discount_final = 0;
    let amount_after_discount_final = 0;


    const [finalDiscountCriteria, setFinalDiscountCriteria] = React.useState('percent');
    const [finalDiscountValue, setFinalDiscountValue] = React.useState(0);
    const [paymentMethod, setPaymentMethod] = React.useState('cash');
    const [totalValue, setTotalValue] = React.useState(0);
    const [taxableAmount, setTaxAmount] = React.useState(0);
    //edit related states
    const [currentEditItem, setCurrentEditItem] = React.useState('');

    //item based variables
    let perItemAmount = 0;
    let amount_item = 0;
    let tax_amount = 0; 
    React.useEffect(() => {
        setLoad(true)

        // products grab
        async function fetchProd() {
            
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
                    setTaxList(data?.tax_list)
                    setAllProducts(data?.product_list?.map(item=>{
                        return {
                            value : item.id,
                            label : item.name,
                            mrp : item.price
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
        if (mrp > 0 && qty > 0) {
            amount_item = parseFloat(mrp) * parseFloat(qty); //amount before tax
            tax_amount = (parseFloat(amount_item)/100) * parseFloat(tax)
            perItemAmount = amount_item + tax_amount
        }
    }
    calculateTotal()

    const calculateFinalPrice = () => {
        if (totalValue > 0) {
            if (discountType === 'Bill') {
                if (finalDiscountCriteria === 'percent') {
                    discount_amount_final = totalValue / 100 * parseFloat(finalDiscountValue);
                    amount_before_discount_final = totalValue;
                    amount_after_discount_final = totalValue - discount_amount_final;
                }

                if (finalDiscountCriteria === 'amount') {
                    discount_amount_final = parseFloat(finalDiscountValue);
                    amount_before_discount_final = totalValue;
                    amount_after_discount_final = totalValue - discount_amount_final;
                }
                finalAmount = amount_after_discount_final;
            } else {
                finalAmount = totalValue
            }
        }
    }

    calculateFinalPrice()

    const handleSubmitItem = () => {
        if (currentProduct && qty) {
            let new_item_dict = {
                item: currentProduct,
                description: itemDescription,
                qty: qty,
                tax: tax,
                mrp: mrp,
                total: perItemAmount,
                amount_item: amount_item,
                tax_amount: tax_amount
            };

            if (currentEditItem) {
                setCurrentEditItem('')
                let new_list_edit = []
                allItems.map((item, index) => {
                    if (index === parseInt(currentEditItem)-1) {                        
                        new_list_edit.push(new_item_dict)
                    } else {
                        new_list_edit.push(item)
                    }
                })
                let total = 0;
                let tax_amount = 0;
                new_list_edit.map(item=>{
                    total = parseFloat(total) + parseFloat(item.total);
                    tax_amount = parseFloat(tax_amount) + parseFloat(item.tax_amount); 
                })
                setTotalValue(total);
                setTaxAmount(tax_amount);
                setAllItems(new_list_edit);
            } else {
                let new_item_list = [...allItems, new_item_dict];
                let total = 0;
                let tax_amount = 0;
                new_item_list.map(item=>{
                    total = parseFloat(total) + parseFloat(item.total);
                    tax_amount = parseFloat(tax_amount) + parseFloat(item.tax_amount);
                })
                setTotalValue(total);
                setTaxAmount(tax_amount);
                setTotalValue(parseFloat(totalValue) + parseFloat(perItemAmount))
                setAllItems(new_item_list);
            }

            setCurrentProduct('');
            setQty(1);
            setTax("0");
            setMrp(0);
            setItemDescription('');
            perItemAmount = 0;
            amount_item= 0;

        } else {
            toast.error('Fill all fields having *')
        }
    }

    const finalSubmit = () => {
        if (invoiceNo && saleDate && allItems.length > 0 && totalValue){
            setLoad(true)
            let header = {
                invoiceNo : invoiceNo,
                saleDate : saleDate,
                customer : customer,
                mobile_number: mobile_number,
                discountType: discountType,
            }
            let final = {
                totalValue : totalValue,
                finalAmount : finalAmount,
                finalDiscountValue : finalDiscountValue,
                finalDiscountCriteria : finalDiscountCriteria,
                remarks : remarks,
                paymentMethod : paymentMethod,
                tax_amount: taxableAmount
            }

            let final_array = [];

            final_array.push(header);
            final_array.push(final);

            const formData = new FormData();
            formData.append('final_array',JSON.stringify(final_array));
            formData.append('allItems',JSON.stringify(allItems));

            async function submitSales(){
                const response = await fetch(url + 'create/sales',{
                    method : 'POST',
                    headers : {
                        'Authorization' : user.token
                    },
                    body : formData
                });
                if (response.ok === true){
                    const data = await response.json();
                    setLoad(false)
                    if (data.status === 200){
                        window.location.reload();
                    }else{
                        toast.error(data.message);
                    }
                }
            }
            submitSales()
        }else{
            toast.error('Please fill the data with *');
        }
    }

    const handleEdit = (item, index_value) => {
        setCurrentEditItem(index_value);
        setCurrentProduct(item.item);
        setItemDescription(item.description)
        setQty(item.qty);
        setTax(item.tax);
        setMrp(item.mrp);
        perItemAmount = item.total;
        tax_amount = item.tax_amount;
    }

    // if (allItems.length > 0) {

    // }

    const handleDelete = (index_value) => {
        const new_item = [];
        allItems.map((item, index) => {
            if (index !== index_value) {
                new_item.push(item)
            }
        })
        let total = 0;
        let tax_amount = 0;
        new_item.map(item => {
        total = parseFloat(total) + parseFloat(item.total);
        tax_amount = parseFloat(tax_amount) + parseFloat(item.tax_amount)
    })
        setTaxAmount(tax_amount);
        setTotalValue(total);    
        setAllItems(new_item);
     }
    function setCurrentProductFunc(value){
        setCurrentProduct(value);
        setMrp(value.mrp)
    }

    return (
        <div className="container full-size-create-page-main-section">
            <ToastContainer />
            <form>
                <div className='p-sm-5 px-md-3 create-form-field create-purchase-page'>
                    <div class="py-4 px-2 form-row create-purchase-header">
                        <div class="form-group col-md-3">
                            <label for="invoice-number">Invoice No.</label>
                            <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} type="text" class="form-control" id="invoice-number" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="date">Sale Date</label>
                            <input value={saleDate} readOnly type="date" class="form-control" id="date" />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="customer">Customer</label>
                            <input value={customer} onChange={e => setCustomer(e.target.value)} type="text" class="form-control" id="customer" />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="customermobile">Mobile Number:</label>
                            <input value={mobile_number} onChange={e => setMobileNumber(e.target.value)} type="text" class="form-control" id="customermobile" />
                        </div>
                    </div>

                    <div class="my-4 form-row">
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Item<span className='required-label'>*</span></label>
                            <Select options={allProducts} value={currentProduct} onChange={setCurrentProductFunc} />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Item Description</label>
                            <textarea value={itemDescription} onChange={e => setItemDescription(e.target.value)} class="form-control"></textarea>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="quantity">Quantity<span className='required-label'>*</span></label>
                            <input required value={qty} onChange={e => setQty(e.target.value)} type="text" class="form-control" id="quantity" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="mrp">MRP:</label>
                            <input required value={mrp} onChange={e => setMrp(e.target.value)} type="text" class="form-control" id="mrp" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="tax">Tax:</label>
                            <select id="tax" value={tax} onChange={e => setTax(e.target.value)} class="form-control" required>
                                {taxList?.map((item,index)=>(
                                    <option value={item.value} key={index}>{item.label}</option>
                                ))}
                            </select>
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
                                    <th scope="col">Mrp</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Tax</th>
                                    <th scope="col">Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='table-borderless'>
                                {allItems.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.item.label}
                                            </td>
                                            <td>{item.description}</td>
                                            <td>{item.mrp}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.tax}</td>
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
                    <div>
                        <div>
                            Taxable amount:- {taxableAmount && taxableAmount}
                        </div> 
                    </div>
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
                            {discountType === 'Bill' && <div class="form-group row">
                                <label for="" class="col-md-4 col-form-label">Discount</label>
                                <div class="pr-0 col-md-8 row">
                                    <div className="pr-0 col-5">
                                        <input class="form-control" value={finalDiscountValue} onChange={e => setFinalDiscountValue(e.target.value)} type="text" name="" id="" />
                                    </div>
                                    <div className="px-0 col-7">
                                        <select value={finalDiscountCriteria} onChange={e => setFinalDiscountCriteria(e.target.value)} class="form-control" required>
                                            <option value="">Select Type</option>
                                            <option value='percent'>Percent</option>
                                            <option value='amount'>Amount</option>
                                        </select>
                                    </div>
                                </div>
                            </div>}

                            <div class="form-group row">
                                <label for="" class="col-md-4 col-form-label">Final Amount</label>
                                <div class="col-md-8">
                                    <input readOnly value={finalAmount} type="text" class="form-control" id="" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-md-4 col-form-label">Payment Method</label>
                                <div class="col-md-8">
                                    <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} id="input-customer" class="form-control" required>
                                        <option value="">Select payment mode</option>
                                        <option value="cash">Cash</option>
                                        <option value="bank">Bank</option>
                                    </select>
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
