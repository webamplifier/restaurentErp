import React from 'react'
import { fetchContext } from '../../context/fetchContext'
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import { url } from 'src/helpers/helpers';
import { useParams } from 'react-router-dom'

export default function Edit() {
    const { id } = useParams();
    const { user, setLoad } = React.useContext(userContext);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');
    const [allRestaurants, setAllRestaurants] = React.useState('');
    const [currentRestaurant, setCurrentRestaurant] = React.useState('');

    const handleSubmit = e => {
        setLoad(true)
        e.preventDefault();
        async function submitData() {
            if (name && role && email) {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('restaurent_id', currentRestaurant.value);
                formData.append('restaurant_name', currentRestaurant.label);
                formData.append('role', role);

                const response = await fetch(url + 'updateuser/' + id, {
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
                        return window.location = window.location.origin + '/#/userList'
                    } else {
                        toast.error(data.message)
                    }
                }
            } else {
                toast.error("Please fill the fields with *");
            }
        }
        submitData();
    }

    React.useEffect(() => {
        setLoad(true)
        async function fetchRestaurants() {
            const response = await fetch(url + 'restaurantlist', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                setLoad(false)
                const data = await response.json();

                if (data.status === 200) {
                    setLoad(false)
                    setAllRestaurants(data?.restaurant_list?.map(item => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    }));
                }else{
                    toast.error(data.message)
                }
            }
        }
        fetchRestaurants();

        async function fetchData() {
            const response = await fetch(url + 'userById/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': user.token
                }
            })
            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status == 200) {
                    const user_detail = data.user_detail;
                    setName(user_detail.name);
                    setEmail(user_detail.email);
                    setRole(user_detail.role);
                    setCurrentRestaurant({
                        value: user_detail.restaurent_id,
                        label: user_detail.restaurant_name
                    })
                }else{
                    toast.error(data.message)
                }
            }
        }
        fetchData();
    }, [id])

    return (
        <div className="container create-page-main-section">
            <ToastContainer />
            <form onSubmit={e => handleSubmit(e)}>
                <div className='p-sm-5 create-form-field'>
                    {user?.role == 1 && <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="exampleFormControlSelect1">Restaurant id:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <Select className="form-control" options={allRestaurants} value={currentRestaurant} onChange={setCurrentRestaurant} />
                        </div>
                    </div>}
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Name:<span className='required-label'>*</span></label>
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
                        <label class="col-sm-2 col-form-label">Role:<span className='required-label'>*</span></label>
                        <select className="form-control d-flex align-items-sm-center col-sm-10" value={role} onChange={e => setRole(e.target.value)}>
                            <option value="">Choose</option>
                            <option value="2">Restaurant_admin</option>
                            <option value="3">Staff</option>
                        </select>
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
