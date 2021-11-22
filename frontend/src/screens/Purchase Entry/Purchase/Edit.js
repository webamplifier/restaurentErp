import React from 'react'
import plus from '../../../assets/images_manual/add.svg'
import Select from 'react-select';
import { url, formatDate } from 'src/helpers/helpers';
import { userContext } from '../../../context/UserContext'
import { toast, ToastContainer } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom'

export default function Edit() {
    let { id } = useParams();
    const history = useHistory();
    const { user,setLoad } = React.useContext(userContext);
    const [invoiceNo, setInvoiceNo] = React.useState('');
    const [purchaseDate, setPurchaseDate] = React.useState(new Date());
    const [remainPaymentDate, setRemainPaymentDate] = React.useState(new Date());
    const [currentParty, setCurrentParty] = React.useState('');
    const [discountType, setDiscountType] = React.useState('None');
    const [currentProduct, setCurrentProduct] = React.useState('');
    const [purchase_price, setPurchasePrice] = React.useState(0);
    const [qty, setQty] = React.useState(1);
    const [mrp, setMrp] = React.useState(0);
    const [currentDiscountCriteria, setCurrentDiscountCriteria] = React.useState('percent');
    const [discountValue, setDiscountValue] = React.useState(0);
    const [itemDescription, setItemDescription] = React.useState('');
    const [remarks, setRemarks] = React.useState('');


    const [allProducts, setAllProducts] = React.useState([]);
    const [allParty, setAllParty] = React.useState([]);
    const [allItems, setAllItems] = React.useState([]);

    //final related variables and states
    let finalAmount = 0;
    let remainAmount = 0;
    let discount_amount_final = 0;
    let amount_before_discount_final = 0;
    let amount_after_discount_final = 0;


    const [finalDiscountCriteria, setFinalDiscountCriteria] = React.useState('percent');
    const [finalDiscountValue, setFinalDiscountValue] = React.useState(0);
    const [paidAmount, setPaidAmount] = React.useState(0);
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [totalValue, setTotalValue] = React.useState(0);
    const [discountAmount, setDiscountAmount] = React.useState(0);

    //edit related states
    const [currentEditItem, setCurrentEditItem] = React.useState('');

    //item based variables
    let perItemAmount = 0;
    let amount_item = 0;
    let amount_before_discount = 0;
    let amount_after_discount = 0;
    let discount_amount = 0;

    React.useEffect(() => {
        setLoad(true)
        async function fetchData() {
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
                    console.log(data);
                    setAllProducts(data?.product_list.map(item => {
                        return {
                            value: item.id,
                            label: item.name,
                            type: item.type
                        }
                    }))
                } else {
                    toast.error(data.message)
                }
            }
        }

        fetchData();
        
        async function fetchDataParty() {
            const response = await fetch(url + 'partylist', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    console.log(data);
                    setAllParty(data?.party_list.map(item => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    }))
                } else {
                    toast.error(data.message)
                }
            }
        }
        fetchDataParty();

        async function fetchDetailPurchase() {
            const response = await fetch(url + 'getPurchaseById/' + id, {
                headers: {
                    'Authorization': user.token
                }
            });

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    console.log(data);
                    let header = data.purchase_header;
                    let final_discount_criteria;
                    let final_discount_value = 0;
                    if (header.bill_discount_percentage) {
                        final_discount_criteria = 'percent';
                        final_discount_value = header.bill_discount_percentage;
                    } else if (header.bill_discount_amount) {
                        final_discount_criteria = 'amount';
                        final_discount_value = header.bill_discount_amount
                    }
                    let items = data.purchase_items;
                    setInvoiceNo(header.invoice_number);
                    setPurchaseDate(header.purchase_date);
                    setRemainPaymentDate(header.remain_amount_date);
                    setCurrentParty({
                        value: header.party_id,
                        label: header.party_name
                    });
                    setDiscountType(header.discount_type)
                    let midItems = [];
                    for (let i = 0; i < items.length; i++) {
                        let current_item = items[i];

                        let discount_type = '';
                        let discount_value = 0;
                        
                        if (current_item.discount_percent && parseFloat(current_item.discount_percent) > 0) {
                            discount_type = 'percent'
                            discount_value = current_item.discount_percent
                        } else if (current_item.discount_amount) {
                            discount_type = 'amount';
                            discount_value = current_item.discount_amount
                        } else {
                            //
                        }
                        let obj = {
                            item: {
                                value: current_item.product_id,
                                label: current_item.product_name
                            },
                            description: current_item.description,
                            item_id: current_item.id,
                            purchase_price: current_item.purchase_price,
                            qty: current_item.qty,
                            mrp: current_item.mrp,
                            discount_type: discount_type,
                            discountValue: discount_value,
                            total: current_item.total,
                            amount_item: current_item.total,
                            amount_before_discount: current_item.amount_before_discount,
                            discount_amount: current_item.discount_amount,
                            amount_after_discount: current_item.amount_after_discount,
                        }

                        midItems.push(obj)
                    }

                    setAllItems(midItems);
                    let current_total_fetch = 0
                    let discount_amount = 0;
                    midItems.map(item => {
                        current_total_fetch = parseFloat(current_total_fetch) + parseFloat(item.total)
                        discount_amount = parseFloat(discount_amount) + parseFloat(item.discount_amount)
                    })
                    setTotalValue(current_total_fetch)
                    setDiscountAmount(discount_amount)
                    setFinalDiscountValue(final_discount_value)
                    setFinalDiscountCriteria(final_discount_criteria)
                    setPaidAmount(header.amount_paid);
                    setPaymentMethod(header.payment_type)
                    setRemarks(header.remarks)
                } else {
                    toast.error(data.message);
                }
            }
        }
        fetchDetailPurchase()
    }, [])


    const calculateTotal = () => {
        if (purchase_price > 0 && qty > 0 ) {
            amount_item = parseFloat(purchase_price) * parseFloat(qty); //amount before tax
            perItemAmount = amount_item

            if (discountType === 'Item' || discountType === 'Both') {
                amount_before_discount = amount_item;
                if (currentDiscountCriteria === 'percent') {
                    discount_amount = (parseFloat(amount_before_discount) / 100) * parseFloat(discountValue)
                    amount_after_discount = amount_before_discount - discount_amount;
                    perItemAmount = amount_after_discount;
                }

                if (currentDiscountCriteria === 'amount') {
                    discount_amount = parseFloat(discountValue);
                    amount_after_discount = amount_before_discount - discount_amount;
                    perItemAmount = amount_after_discount;
                }
            }
        }
    }

    calculateTotal()

    const calculateFinalPrice = () => {
        if (totalValue > 0) {
            if (discountType === 'Bill' || discountType === 'Both') {
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
                remainAmount = finalAmount - parseFloat(paidAmount);
            } else {
                finalAmount = totalValue
                remainAmount = finalAmount - parseFloat(paidAmount);
            }
        }
    }

    calculateFinalPrice()

    const handleSubmitItem = () => {
        if (invoiceNo && purchaseDate && currentParty && discountType && currentProduct && purchase_price && qty) {
            let new_item_dict = {
                item: currentProduct,
                description: itemDescription,
                purchase_price: purchase_price,
                qty: qty,
                mrp: mrp,
                discount_type: currentDiscountCriteria,
                discountValue,
                total: perItemAmount,
                amount_item,
                amount_before_discount,
                discount_amount,
                amount_after_discount
            };



            if (currentEditItem) {
                setCurrentEditItem('')
                let new_list_edit = []
                allItems.map((item, index) => {
                    if (index === parseInt(currentEditItem) - 1) {

                        new_list_edit.push(new_item_dict)
                    } else {

                        new_list_edit.push(item)
                    }
                })
                let total = 0;
                let discount_amount = 0;
                new_list_edit.map(item => {
                    total = parseFloat(total) + parseFloat(item.total);
                    discount_amount = parseFloat(discount_amount) + parseFloat(item.discount_amount)
                })
                setTotalValue(total);
                setDiscountAmount(discount_amount);
                setAllItems(new_list_edit);
            } else {
                let new_item_list = [...allItems, new_item_dict];

                let total = 0;
                let discount_amount = 0;
                new_item_list.map(item => {
                    total = parseFloat(total) + parseFloat(item.total);
                    discount_amount = parseFloat(discount_amount) + parseFloat(item.discount_amount)
                })
                setDiscountAmount(discount_amount);
                setTotalValue(total);

                // setTotalValue(parseFloat(totalValue) + parseFloat(perItemAmount))
                setAllItems(new_item_list);
            }

            setCurrentProduct('');
            setPurchasePrice(0);
            setQty(1);
            setMrp(0);
            setCurrentDiscountCriteria('');
            setDiscountValue(0);
            setItemDescription('');
            perItemAmount = 0;
            amount_item = 0;
            amount_before_discount = 0;
            amount_after_discount = 0;
            discount_amount = 0;

        } else {
            toast.error('Fill all fields having *')
        }
    }

    const finalSubmit = () => {
        if (invoiceNo && purchaseDate && currentParty && allItems.length > 0 && totalValue) {
            setLoad(true)
            let header = {
                invoiceNo: invoiceNo,
                purchaseDate: purchaseDate,
                currentParty: currentParty,
                discountType: discountType
            }
            let final = {
                totalValue: totalValue,
                finalAmount: finalAmount,
                paidAmount: paidAmount,
                remainAmount: remainAmount,
                finalDiscountValue: finalDiscountValue,
                finalDiscountCriteria: finalDiscountCriteria,
                remarks: remarks,
                paymentMethod: paymentMethod,
                discountAmount: discountAmount,
                remainPaymentDate: remainPaymentDate
            }

            let final_array = [];

            final_array.push(header);
            final_array.push(final);

            const formData = new FormData();
            formData.append('final_array', JSON.stringify(final_array));
            formData.append('allItems', JSON.stringify(allItems));

            async function submitPurchase() {
                const response = await fetch(url + 'updatePurchaseEntry/' + id, {
                    method: 'POST',
                    headers: {
                        'Authorization': user.token
                    },
                    body: formData
                });
                if (response.ok === true) {
                    const data = await response.json();
                    setLoad(false)
                    if (data.status === 200) {
                        history.push('/#/create/purchase')
                    } else {
                        toast.error(data.message);
                    }
                }
            }

            submitPurchase()
        } else {
            toast.error('Please fill the data with *');
        }
    }

    const handleEdit = (item, index_value) => {
        setCurrentEditItem(index_value);
        setCurrentProduct(item.item);
        setItemDescription(item.description);
        setPurchasePrice(item.purchase_price);
        setQty(item.qty);
        setMrp(item.mrp);
        setCurrentDiscountCriteria(item.discount_type);
        setDiscountValue(item.discountValue);
        perItemAmount = item.total;
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
        let discount_amount = 0;
        new_item.map(item => {
            total = parseFloat(total) + parseFloat(item.total);
            discount_amount = parseFloat(discount_amount) + parseFloat(item.discount_amount)
        })
        setDiscountAmount(discount_amount);
        setTotalValue(total);
        setAllItems(new_item);

    }

    return (
        <div className="container full-size-create-page-main-section">
            <ToastContainer />
            <form>
                <div className='p-sm-5 px-md-3 create-form-field create-purchase-page'>
                    <div class="py-4 px-2 form-row create-purchase-header">
                        <div class="form-group col-md-3">
                            <label for="invoice-number">Invoice No.<span className='required-label'>*</span></label>
                            <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} type="text" class="form-control" id="invoice-number" required />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="date">Purchase Date<span className='required-label'>*</span></label>
                            {/* <DatePicker value={purchaseDate} onChange={setPurchaseDate} /> */}
                            <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} className='form-control' />
                        </div>
                        <div class="form-group col-md-6">

                            <label for="input-party">Party<span className='required-label'>*</span></label>
                            <Select options={allParty} value={currentParty} onChange={setCurrentParty} />

                        </div>
                        <div class="form-group my-md-3 col-md-4">
                            <div className="text-center mb-2 font-weight-bold">
                                <label for="input-party">Discount Type<span className='required-label'>*</span></label>
                            </div>
                            <div className='row px-3'>
                                <div class="form-check col-sm-3">
                                    <input checked={discountType === 'None' && true} onClick={() => setDiscountType('None')} class="form-check-input" name="discount" type="radio" value="" id="defaultCheck1" />
                                    <label class="form-check-label" for="defaultCheck1">
                                        None
                                    </label>
                                </div>
                                <div class="form-check col-sm-3">
                                    <input checked={discountType === 'Item' && true} onClick={() => setDiscountType('Item')} class="form-check-input" name="discount" type="radio" value="" id="defaultCheck2" />
                                    <label class="form-check-label" for="defaultCheck2">
                                        Item
                                    </label>
                                </div>
                                <div class="form-check col-sm-3">
                                    <input checked={discountType === 'Bill' && true} onClick={() => setDiscountType('Bill')} class="form-check-input" name="discount" type="radio" value="" id="defaultCheck3" />
                                    <label class="form-check-label" for="defaultCheck3">
                                        Bill
                                    </label>
                                </div>
                                <div class="form-check col-sm-3">
                                    <input checked={discountType === 'Both' && true} onClick={() => setDiscountType('Both')} class="form-check-input" name="discount" type="radio" value="" id="defaultCheck3" />
                                    <label class="form-check-label" for="defaultCheck3">
                                        Both
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="my-4 form-row">
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Item<span className='required-label'>*</span></label>
                            <Select options={allProducts} value={currentProduct} onChange={setCurrentProduct} />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Item Description</label>
                            <textarea value={itemDescription} onChange={e => setItemDescription(e.target.value)} class="form-control"></textarea>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Purchase_Price<span className='required-label'>*</span></label>
                            <input value={purchase_price} onChange={(e) => setPurchasePrice(e.target.value)} type="text" class="form-control" id="" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="invoice-number">Quantity<span className='required-label'>*</span></label>
                            <input value={qty} onChange={e => setQty(e.target.value)} type="text" class="form-control" id="" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="invoice-number">MRP</label>
                            <input value={mrp} onChange={e => setMrp(e.target.value)} type="text" class="form-control" id="" />
                        </div>
                        {discountType === 'Item' &&
                            <div className='form-group col-md-4'>
                                <label htmlFor="">Discount</label>
                                <div className='m-0 p-0 col-12 row'>
                                    <div className="px-0 col-5">
                                        <input value={discountValue} onChange={e => setDiscountValue(e.target.value)} class="form-control" type="text" name="" id="" />
                                    </div>
                                    <div className="p-0 col-7">
                                        <select value={currentDiscountCriteria} onChange={e => setCurrentDiscountCriteria(e.target.value)} class="form-control" required>
                                            <option value="">Select Type</option>
                                            <option value='percent'>Percent</option>
                                            <option value='amount'>Amount</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
                        {discountType === 'Both' &&
                            <div className='form-group col-md-4'>
                                <label htmlFor="">Discount</label>
                                <div className='m-0 p-0 col-12 row'>
                                    <div className="px-0 col-5">
                                        <input value={discountValue} onChange={e => setDiscountValue(e.target.value)} class="form-control" type="text" name="" id="" />
                                    </div>
                                    <div className="p-0 col-7">
                                        <select value={currentDiscountCriteria} onChange={e => setCurrentDiscountCriteria(e.target.value)} class="form-control" required>
                                            <option value="">Select Type</option>
                                            <option value='percent'>Percent</option>
                                            <option value='amount'>Amount</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
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
                                    <th scope="col">Purchase_Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">MRP</th>
                                    <th>Discount</th>

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
                                            <td>{item.purchase_price}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.mrp}</td>
                                            <td>{item.discountValue} {item.discount_type}</td>
                                            <td>{item.total}</td>
                                            <td>
                                                <i style={{ cursor: 'pointer' }} onClick={() => handleEdit(item, index + 1)} class="fa fa-pencil" aria-hidden="true"></i>
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
                            discount amount:- {discountAmount && discountAmount}
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

                            {discountType === 'Both' && <div class="form-group row">
                                <label for="" class="col-md-4 col-form-label">Discount</label>
                                <div class="pr-0 col-md-8 row">
                                    <div className="pr-0 col-5">
                                        <input class="form-control" type="text" value={finalDiscountValue} onChange={e => setFinalDiscountValue(e.target.value)} />
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
                                <label for="" class="col-md-4 col-form-label">Paid Amount</label>
                                <div class="col-md-8">
                                    <input value={paidAmount} onChange={e => setPaidAmount(e.target.value)} type="text" class="form-control" id="" />
                                </div>
                            </div>
                            {paidAmount > 0 && <div class="form-group row">
                                <label for="" class="col-md-4 col-form-label">Payment Method</label>
                                <div class="col-md-8">
                                    <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} id="input-party" class="form-control" required>
                                        <option value="">Select payment mode</option>
                                        <option value="cash">Cash</option>
                                        <option value="bank">Bank</option>
                                        <option value="link">Link</option>
                                    </select>
                                </div>
                            </div>}
                            <div class="form-group row">
                                <label for="" class="col-md-4 col-form-label">Remain Amount</label>
                                <div class="col-md-8">
                                    <input type="text" value={remainAmount} readOnly class="form-control" id="" />
                                </div>
                            </div>
                            { remainAmount > 0 && <div class="form-group row">
                                <label for="date" class="col-md-4 col-form-label">Remain Payment Date</label>
                                <div class="col-md-8">
                                    <input type="date" value={remainPaymentDate} onChange= {e=> setRemainPaymentDate(e.target.value)} class="form-control" id="date" required/>
                                </div>
                            </div>
                            }
                        </div>
                    </div>

                </div>
                <div class="d-flex justify-content-center create-catagory-btns">
                    <button type="button" onClick={() => window.location.reload()} class="font-weight-bold m-3 py-2 px-4 btn btn-danger">Cancel<i
                        class="px-2 fa fa-times" aria-hidden="true"></i></button>
                    <button type="button" onClick={() => finalSubmit()} class="font-weight-bold m-3 py-2 px-4 btn btn-success">Save<i
                        class="px-2 fa fa-floppy-o" aria-hidden="true"></i></button>
                </div>
            </form>
        </div>
    )
}
