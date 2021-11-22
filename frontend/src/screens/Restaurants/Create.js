import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import { url } from 'src/helpers/helpers';

export default function Create() {
    const { user,setLoad } = React.useContext(userContext);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [food_license_number, setFoodLicenseNumber] = React.useState('');
    const [gst_number, setGSTNumber] = React.useState('');

    const handleSubmit = e => {
        setLoad(true)
        e.preventDefault();
         
        async function submitData() {
            if(name, email, password, mobile, food_license_number, gst_number, address)
            {const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('mobile', mobile);
            formData.append('food_license_number', food_license_number);
            formData.append('GST', gst_number);
            formData.append('address', address);

            const response = await fetch(url + 'createRestaurant', {
                method: 'POST',
                headers: {
                    'Authorization': user?.token
                },
                body: formData
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)

                if (data.status === 200) {
                    return window.location = window.location.origin + '/#/restaurantList'
                } else {
                    toast.error(data.message)
                }
            }
    }

    else{
        toast.error("Please fill the fields with *");
    }
    }
        submitData();
    }

    return (
        <div className="container create-page-main-section">
            <ToastContainer />
            <form onSubmit={e => handleSubmit(e)}>
                <div className='p-sm-5 create-form-field'>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Restaurant Name:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input required value={name} onChange={e => setName(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Email:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Password:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Mobile No:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input required value={mobile} onChange={e => setMobile(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Food License No:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={food_license_number} onChange={e => setFoodLicenseNumber(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">GST Number:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={gst_number} onChange={e => setGSTNumber(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="exampleFormControlTextarea1">Address:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <textarea required value={address} onChange={e => setAddress(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center create-catagory-btns">
                    <button onClick={() => window.location.reload()} type="submit" class="font-weight-bold m-3 py-2 px-4 btn btn-danger">Cancel<i
                        class="px-2 fa fa-times" aria-hidden="true"></i></button>
                    <button type="submit" class="font-weight-bold m-3 py-2 px-4 btn btn-success">Save<i
                        class="px-2 fa fa-floppy-o" aria-hidden="true"></i></button>
                </div>
            </form>
        </div>
    )
}
