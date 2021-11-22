
import React from 'react';
import { url } from 'src/helpers/helpers';
import {userContext} from '../../context/UserContext'
import Select from 'react-select';
import { toast,ToastContainer } from 'react-toastify';
import {useParams} from 'react-router-dom';

export default function Edit() {
    const {id} = useParams();
    const {user,setLoad} = React.useContext(userContext);
    const [allCategory,setAllCategory] = React.useState([]);
    
    const [currentCategory,setCurrentCategory] = React.useState('');
    
    //sub category
    const [allSubCategory, setAllSubCategory] = React.useState([]);
    const [currentSubCategory, setCurrentSubCategory] = React.useState('');
    //
    const [name,setName] = React.useState('');

    const [price,setPrice] = React.useState('0');
    const [type,setType] = React.useState("product")
    
    //sales_unit pack_unit
    const [sales_unit,setSales_Unit] = React.useState('1');
    const [pack_unit,setPack_Unit] = React.useState('1');
    //

    React.useEffect(()=>{
        setLoad(true)
        async function fetchData(){
            const response = await fetch(url + 'categorylist',{
                method : 'GET',
                headers : {
                    'Authorization' : user.token
                }
            })

            if (response.ok === true){
                const data = await response.json();

                if (data.status === 200){
                    setLoad(false)
                    setAllCategory(data?.category_list?.map(item=>{
                        return {
                            value : item.id,
                            label : item.name
                        }
                    }));
                }
            }
        }
        fetchData();

        async function fetchDataSub(){
            const response = await fetch(url + 'subcategorylist',{
                method : 'GET',
                headers : {
                    'Authorization' : user?.token
                }
            })

            if (response.ok === true){
                const data = await response.json();

                if (data.status === 200){
                    setLoad(false)
                    setAllSubCategory(data?.subcategory_list?.map(item=>{
                        return {
                            value : item.id,
                            label : item.name,
                            category_id : item.category_id
                        }
                    }));
                }
            }
        }
        fetchDataSub();

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
                    setPrice(product_detail?.price)
                    setCurrentCategory({
                        value : product_detail.category_id,
                        label : product_detail.category_name
                    })
                    //subcategory
                    setCurrentSubCategory({
                        value : product_detail.subcategory_id,
                        label : product_detail.subcategory_name
                    })
                    //
                    //sales_unit pack_unit
                    setSales_Unit(product_detail.sales_unit)
                    setPack_Unit(product_detail.pack_unit)
                    setType(product_detail.type)
                    //

                }else{
                    setLoad(false)
                    toast.error(data.message)
                }
            }
        }
        fetchProductData();
    },[])

    const handleSubmit = e => {
        if(name && currentCategory && type && sales_unit && pack_unit)
        {   
            setLoad(true)
        const formData = new FormData();
        formData.append('category_id',currentCategory.value);
        formData.append('category_name',currentCategory.label);
        if(currentSubCategory)
        {formData.append('subcategory_id',currentSubCategory.value);
        formData.append('subcategory_name',currentSubCategory.label);
        }
        else
        {
            formData.append('subcategory_id'," ");
            formData.append('subcategory_name'," ");
        }
        formData.append('product_name',name);
        formData.append('price',price)
        formData.append('type',type)
        
        //sales_unit, pack_unit
        formData.append('sales',sales_unit);
        formData.append('pack',pack_unit);
        //

        async function submitData(){
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
        }

        submitData();
    }else{
        toast.error('Please fill the data with *');    
    }
    }

    return (
        <div className="container create-page-main-section">
            <ToastContainer />
            <form onSubmit={e=>handleSubmit(e)}>
                <div className='p-sm-5 create-form-field'>
                    
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Name:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={name} onChange={e=>setName(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label class="col-sm-2 col-form-label">Type: </label>
                        <select className="form-control d-flex align-items-sm-center col-sm-10" value={type} onChange={e=>setType(e.target.value)}>
                            <option value="product">Product</option>
                            <option value="service">Service</option>
                        </select>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="exampleFormControlSelect1">Catagory:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <Select className="form-control" options={allCategory} value={currentCategory} onChange={setCurrentCategory} />    
                        </div>
                    </div>
                    {/* subcategory */}
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="exampleFormControlSelect1">Sub Catagory:</label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <Select className="form-control" options={allSubCategory} value={currentSubCategory} onChange={setCurrentSubCategory} />    
                        </div>
                    </div>
                    {/* // */}

                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Price:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={price} onChange={e=>setPrice(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>

                    {/* pack_unit */}
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Pack_Unit<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={pack_unit} onChange={e=>setPack_Unit(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    {/* // */}
                    {/* sales_unit */}
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Sales_Unit<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={sales_unit} onChange={e=>setSales_Unit(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    {/* // */}
                    
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
