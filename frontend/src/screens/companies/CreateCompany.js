import React from 'react';
import Select from 'react-select';
import {fetchContext} from '../../context/fetchContext'
import {toast,ToastContainer} from 'react-toastify'
import { url } from 'src/helpers/helpers';
import {userContext} from '../../context/UserContext'

export default function CreateCompany(){
    const {user} = React.useContext(userContext);
    const {allCountries,allStates,allCities,allBusinessTypes} = React.useContext(fetchContext);
    const [filterStates,setFilterStates] = React.useState([]);
    const [filterCities,setFilterCities] = React.useState([]);
    const [currentCountry,setCurrentCountry] = React.useState('');
    const [currentState,setCurrentState] = React.useState('');
    const [currentCity,setCurrentCity] = React.useState('');
    const [currentBusiness,setCurrentBusiness] = React.useState('');
    const [companyLogo,setCompanyLogo] = React.useState('');
    const [previewImage,setPreviewImage] = React.useState('');
    const [name,setName] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [number,setNumber] = React.useState('');
    const [pincode,setPinCode] = React.useState('');
    const [taxNumber,setTaxNumber] = React.useState('');
    const [website,setWebsite] = React.useState('');
    const [isDemo,setIsDemo] = React.useState(false);
    const [expiredDate,setExpiredDate] = React.useState('');
    const [showLogo,setShowLogo] = React.useState(false);
    const [address,setAddress] = React.useState('');

    const setCountryValue = value => {
        setFilterStates([]);
        setCurrentState('');
        setFilterCities([]);
        setCurrentCity('');
        setCurrentCountry(value)
        const filter_states_data = [];
        allStates.map(item=>{
            if (item.company_id === value.value){
                filter_states_data.push(item)
            }
            return {};
        })
        setFilterStates(filter_states_data)
    }

    const setStateValue = value => {
        setCurrentState(value);
        setCurrentCity('')
        const filter_cities_data = [];
        allCities.map(item=>{
            if (item.state_id === value.value){
                filter_cities_data.push(item);
            }
            return {};
        })
        setFilterCities(filter_cities_data);

    }

    const setCityValue = value => {
        setCurrentCity(value)
    }

    const changeImage = e => {
        console.log(e);
        setCompanyLogo(e[0])
        setPreviewImage(URL.createObjectURL(e[0]))

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        async function submitData(){
            if (currentCity && currentCountry && currentState){
                const formData = new FormData();
                formData.append('name',name);
                formData.append('email',email);
                formData.append('number',number);
                formData.append('country',currentCountry.value);
                formData.append('state',currentState.value);
                formData.append('city',currentCity.value);
                formData.append('pincode',pincode);
                formData.append('tax_number',taxNumber);
                formData.append('business_type',currentBusiness.value);
                formData.append('website',website);
                formData.append('is_demo',isDemo);
                formData.append('expired_date',expiredDate);
                formData.append('show_logo',showLogo);
                formData.append('company_logo',companyLogo);
                formData.append('address',address);

                const response = await fetch(url + 'createCompany',{
                    method : 'POST',
                    headers : {
                        'Authorization' : user?.token
                    },
                    body : formData
                })

                if (response.ok === true){
                    const data = await response.json();

                    if (data.status === 200){
                        return window.location = window.location.origin + '/#/companyList'
                    }else{
                        toast.error(data.message);
                    }
                }
            }else{
                toast.error('Select the dropdown first')
            }
        }

        submitData();
    }

    return(
        <section>
            <ToastContainer />
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Firm Name</label>
                        <input value={name} onChange={e=>setName(e.target.value)} required type='text' className='form-control' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Firm Email</label>
                        <input value={email} onChange={e=>setEmail(e.target.value)} required type='email' className='form-control' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Mobile Number</label>
                        <input value={number} onChange={e=>setNumber(e.target.value)} required type='text' className='form-control' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Select Country</label>
                        <Select options={allCountries} value={currentCountry} onChange={setCountryValue}  />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Select State</label>
                        <Select options={filterStates} value={currentState} onChange={setStateValue} />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Select City</label>
                        <Select options={filterCities} value={currentCity} onChange={setCityValue} />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Pincode</label>
                        <input value={pincode} onChange={e=>setPinCode(e.target.value)} required type='text' className='form-control' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Tax Number</label>
                        <input value={taxNumber} onChange={e=>setTaxNumber(e.target.value)} type='text' className='form-control' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Business Type</label>
                        <Select options={allBusinessTypes} value={currentBusiness} onChange={setCurrentBusiness}  />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Website</label>
                        <input value={website} onChange={e=>setWebsite(e.target.value)} type='text' className='form-control' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Demo Account</label>
                        <input value={isDemo} onChange={e=>setIsDemo(!isDemo)} type='checkbox' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Demo Expired</label>
                        <input value={expiredDate} onChange={e=>setExpiredDate(e.target.value)} type='date' className='form-control' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Show Logo On Bill</label>
                        <input value={showLogo} onChange={()=>setShowLogo(!showLogo)} type='checkbox' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='form-group'>
                        <label>Company Logo</label>
                        <input type='file' onChange={e=>changeImage(e.target.files)} />
                    </div>
                    {previewImage && <div>
                            <img src={previewImage} alt='company logo' />
                        </div>}
                </div>
            </div>
            <div className='row'>
                <label>Address</label>
                <textarea value={address} onChange={e=>setAddress(e.target.value)} rows='8' cols='125' className='form-control' />
            </div>

            <button type='submit' className='btn btn-primary my-4'>Submit</button>
            </form>
        </section>
    )
}