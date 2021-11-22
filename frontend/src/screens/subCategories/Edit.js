import React from 'react'
import { toast,ToastContainer } from 'react-toastify';
import Select from 'react-select';
import { url } from 'src/helpers/helpers';
import {userContext} from '../../context/UserContext'
import { useParams } from 'react-router';

export default function Edit() {
    
    const {user,setLoad} = React.useContext(userContext);
    const {id} = useParams();
    const [name,setName] = React.useState('');
    
    const [currentcategory,setcurrentcategory] = React.useState('');

    const[ allCategories, setAllCategories] = React.useState([]);

    React.useEffect(()=>{
        setLoad(true)
        async function fetchCategory(){
            const response = await fetch(url + 'categorylist',{
                method : 'GET',
                headers : {
                    'Authorization' : user?.token
                }
            })

            if (response.ok === true){
                const data = await response.json();
                if (data.status === 200){
                    setLoad(false)
                    setAllCategories(data?.category_list?.map((item)=>{
                        return {
                            value : item.id,
                            label : item.name
                        }
                    }))
            }
            else{
                toast.error(data.message)
            }
        }}
        fetchCategory();

        async function fetchIdData(){
            const response = await fetch(url + 'subcategoryById/' + id,{
                method: 'GET',
                headers: {
                    'Authorization' : user?.token
                }
            })
            if(response.ok === true){
                const data = await response.json()
                if(data.status === 200)
                {
                    const detail = data.subcategory_detail;

                    setcurrentcategory({
                        value: detail.category_id,
                        label: detail.category_name
                    })
                    setName(detail.name)
                }
                else{
                    toast.error(data.message)
                }
            }
        }

        fetchIdData();
    },[])
    
    
    const handleSubmit = e => {
        if(currentcategory && name)
        {setLoad(true)
        e.preventDefault();
        async function sendData(){
            const formData = new FormData();
            
            formData.append('category',JSON.stringify(currentcategory));
            formData.append('name',name);

            const response = await fetch(url + 'updatesubcategory/' + id,{
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
                    return window.location = window.location.origin + '/#/subcategory'
                }else{
                    setLoad(false)
                    toast.error(data.message)
                }
            }

        }
        sendData();
    }
    else{
        toast.error('Please fill the details with *')
    }
    }
    return (
        <div className="container create-page-main-section">
            <ToastContainer />
            <form onSubmit={e=>handleSubmit(e)}>
                <div className='p-sm-5 create-form-field'>
                    <div className="form-group row">
                        <label for="colFormLabelLg" className="d-flex justify-content-md-center  col-md-2 col-sm-12 col-form-label col-form-label-lg">Category<span className='required-label'>*</span></label>
                        <div className="col-md-10 col-sm-12">
                        <Select options={allCategories} value={currentcategory} onChange={setcurrentcategory} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="colFormLabelLg" className="d-flex justify-content-md-center  col-md-2 col-sm-12 col-form-label col-form-label-lg">Name<span className='required-label'>*</span></label>
                        <div className="col-md-10 col-sm-12">
                            <input value={name} onChange={e=>setName(e.target.value)} type="text" className="form-control form-control-lg" id="colFormLabelLg" placeholder="enter sub catagory name"/>
                        </div>
                    </div>
                </div>
                <div  className="create-catagory-btns d-flex justify-content-center">
                    <button onClick={()=>window.location.reload()} type="button" class="font-weight-bold m-3 py-2 px-4 btn btn-danger">Cancel<i class="px-2 fa fa-times" aria-hidden="true"></i></button>
                    <button type="submit" class="font-weight-bold m-3 py-2 px-4 btn btn-success">Save<i class="px-2 fa fa-floppy-o" aria-hidden="true"></i></button>
                </div>
            </form>
        </div>
    )
}
