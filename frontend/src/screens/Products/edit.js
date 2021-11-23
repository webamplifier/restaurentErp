
import React from 'react';
import { url } from 'src/helpers/helpers';
import {userContext} from '../../context/UserContext'
import { toast,ToastContainer } from 'react-toastify';
import {useParams} from 'react-router-dom';

export default function Edit() {
    const {id} = useParams();
    const {user,setLoad} = React.useContext(userContext);
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('0')
    const [stock_quantity,setStockQuantity] = React.useState('0');
    React.useEffect(()=>{
        setLoad(true)
        
        async function fetchProductData(){
            const response = await fetch(url + 'productById/' + id,{
                method : 'GET',
                headers : {
                    'Authorization' : user?.token
                }
            })

            if (response.ok === true){
                const data = await response.json();

                if (data.status === 200){
                    setLoad(false)
                    let product_detail = data.product_detail;
                    setName(product_detail.name);
                    setPrice(product_detail.price);
                    setStockQuantity(product_detail.stock_quantity);
                }else{
                    setLoad(false)
                    toast.error(data.message)
                }
            }
        }
        fetchProductData();
    },[])

    const handleSubmit = e => {
        setLoad(true);
        e.preventDefault();
        async function submitData(){
            if(name && price && stock_quantity)
            {   
            const formData = new FormData();
            formData.append('product_name',name);
            formData.append('price',price)
            formData.append('stock_quantity',stock_quantity);
            const response = await fetch(url + 'updateproduct/' + id,{
                method : 'POST',
                headers : {
                    'Authorization' : user?.token
                },
                body : formData
            })

            if (response.ok === true){
                const data = await response.json();

                if (data.status === 200){
                    setLoad(false)
                    return window.location = window.location.origin + '/#/products'
                }else{
                    setLoad(false)
                    toast.error(data.message)
                }
            }
        }else{
            toast.error('Please fill the data with *');    
        }
        }
        submitData();
    }

    return (
        <div className="container create-page-main-section">
            <ToastContainer />
            <form onSubmit={e=>handleSubmit(e)}>
                <div className='p-sm-5 create-form-field'>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Product Name:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input required value={name} onChange={e=>setName(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Price:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input required value={price} onChange={e=>setPrice(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Stock Quantity<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input required value={stock_quantity} onChange={e=>setStockQuantity(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center create-catagory-btns">
                    <button type="submit" class="font-weight-bold m-3 py-2 px-4 btn btn-danger">Cancel<i
                        class="px-2 fa fa-times" aria-hidden="true"></i></button>
                    <button type="submit" class="font-weight-bold m-3 py-2 px-4 btn btn-success">Save<i
                        class="px-2 fa fa-floppy-o" aria-hidden="true"></i></button>
                </div>
            </form>
        </div>
    )
}
