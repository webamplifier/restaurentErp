import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import { url } from 'src/helpers/helpers';
import { useParams } from 'react-router-dom'

export default function Edit() {
    const { id } = useParams();
    const { user,setLoad } = React.useContext(userContext);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [food_license_number, setFoodLicenseNumber] = React.useState('');
    const [gst_number, setGSTNumber] = React.useState('');
    const [expiry_date, setExpiryDate] = React.useState('');
    const [reminder_date, setReminderDate] = React.useState('');
    
    const handleSubmit = e => {
        setLoad(true)
        e.preventDefault();

        async function submitData() {
            if(name && email && mobile && expiry_date && reminder_date){
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('mobile', mobile);
            formData.append('food_license_number', food_license_number);
            formData.append('GST', gst_number);
            formData.append('address', address);
            formData.append('expiry_date',expiry_date);
            formData.append('reminder_date',reminder_date);

            const response = await fetch(url + 'updaterestaurant/' + id, {
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
                    return window.location = window.location.origin + '/#/restaurantlist'
                } else {
                    toast.error(data.message)
                }
            }
        }
        else{
            toast.error("Please fill the details with *");
        }
        }
        submitData();

    }

    React.useEffect(() => {
        setLoad(true)
        async function fetchData() {
            const response = await fetch(url + 'restaurantById/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': user.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                const restaurant_detail = data.restaurant_detail;
                console.log(restaurant_detail);
                setName(restaurant_detail.name);
                setEmail(restaurant_detail.email);
                setMobile(restaurant_detail.mobile);
                setFoodLicenseNumber(restaurant_detail.food_license_number);
                setGSTNumber(restaurant_detail.gst_number);
                setAddress(restaurant_detail.address);
                setExpiryDate(restaurant_detail.expiry_date);
                setReminderDate(restaurant_detail.reminder_date);
            }
        }
        fetchData();
    }, [id])

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
                            <input required value={email} onChange={e => setEmail(e.target.value)} type="email" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Mobile No:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input required value={mobile} onChange={e => setMobile(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Food License No:</label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={food_license_number} onChange={e => setFoodLicenseNumber(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">GST Number:</label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={gst_number} onChange={e => setGSTNumber(e.target.value)} type="text" class="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="date" class="col-md-4 col-form-label">Expiry Date<span className='required-label'>*</span></label>
                        <div class="col-md-8">
                            <input type="date" value={expiry_date} onChange= {e=> setExpiryDate(e.target.value)} class="form-control" id="date" required/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="date" class="col-md-4 col-form-label">Reminder Date<span className='required-label'>*</span></label>
                        <div class="col-md-8">
                            <input type="date" value={reminder_date} onChange= {e=> setReminderDate(e.target.value)} class="form-control" id="date" required/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="exampleFormControlTextarea1">Address:</label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <textarea value={address} onChange={e => setAddress(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center create-catagory-btns">
                    <button onClick={() => window.location.reload()} type="button" class="font-weight-bold m-3 py-2 px-4 btn btn-danger">Cancel<i
                        class="px-2 fa fa-times" aria-hidden="true"></i></button>
                    <button type="submit" class="font-weight-bold m-3 py-2 px-4 btn btn-success">Save<i
                        class="px-2 fa fa-floppy-o" aria-hidden="true"></i></button>
                </div>
            </form>
        </div>
    )
}
