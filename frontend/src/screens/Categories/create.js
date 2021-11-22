import React from 'react'
import { toast,ToastContainer } from 'react-toastify';
import { url } from 'src/helpers/helpers';
import {userContext} from '../../context/UserContext'

export default function Create() {
    const {user,setLoad} = React.useContext(userContext);
    const [name,setName] = React.useState('');
    const [code,setCode] = React.useState('');

    const handleSubmit = e => {
        setLoad(true)
        e.preventDefault();
        async function sendData(){
            const formData = new FormData();
            formData.append('name',name);
            formData.append('code',code);

            const response = await fetch(url + 'createcategory',{
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
                    return window.location = window.location.origin + '/#/category'
                }else{
                    setLoad(false)
                    toast.error(data.message)
                }
            }

        }
        sendData();
    }

    return (
        <div className="container create-page-main-section">
            <ToastContainer />
            <form onSubmit={e=>handleSubmit(e)}>
                <div className='p-sm-5 create-form-field'>
                    <div className="form-group row">
                        <label for="colFormLabelLg" className="d-flex justify-content-md-center  col-md-2 col-sm-12 col-form-label col-form-label-lg">Name<span className='required-label'>*</span></label>
                        <div className="col-md-10 col-sm-12">
                            <input value={name} onChange={e=>setName(e.target.value)} type="text" className="form-control form-control-lg" id="colFormLabelLg" placeholder="enter catagory name" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="colFormLabelLg" className="d-flex justify-content-md-center  col-md-2 col-sm-12 col-form-label col-form-label-lg">Code<span className='required-label'>*</span></label>
                        <div className="col-md-10 col-sm-12">
                            <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} type="text" className="form-control form-control-lg" id="colFormLabelLg" placeholder="enter catagory short code" required />
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
