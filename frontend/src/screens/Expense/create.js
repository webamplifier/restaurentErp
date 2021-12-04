import React from 'react'
import { url } from 'src/helpers/helpers';
import { userContext } from '../../context/UserContext'
import { toast, ToastContainer } from 'react-toastify';

export default function Create() {
    const { user, setLoad } = React.useContext(userContext);
    const [expense_date, setExpenseDate] = React.useState('');
    const [name, setName] = React.useState('');
    const [item, setItem] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [paid_amount, setPaidAmount] = React.useState('0');
    const [remarks, setRemarks] = React.useState('');


    const handleSubmit = e => {
        setLoad(true)
        e.preventDefault();

        async function submitData() {
            if (name && paid_amount && item) {
                const formData = new FormData();
                formData.append('expense_date', expense_date);
                formData.append('name', name);
                formData.append('paid_amount', paid_amount);
                formData.append('item', item);
                formData.append('item_description', description);
                formData.append('remarks', remarks);
                const response = await fetch(url + 'createexpense', {
                    method: 'POST',
                    headers: {
                        'Authorization': user?.token
                    },
                    body: formData
                })

                if (response.ok === true) {
                    const data = await response.json();
                    setLoad(false);

                    if (data.status === 200) {
                        toast.success(data.message);
                        setExpenseDate('');
                        setName('');
                        setItem('');
                        setDescription('');
                        setPaidAmount(0);
                        setRemarks('');
                    } else {
                        toast.error(data.message)
                    }
                }
            }
            else {
                toast.error('Please fill the data with *');
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
                        <label for="inputDate" class="col-sm-2 col-form-label">Expense Date</label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={expense_date} onChange={e => setExpenseDate(e.target.value)} type="date" class="form-control" id="inputDate" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="inputname" class="col-sm-2 col-form-label">To:<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input required value={name} onChange={e => setName(e.target.value)} type="text" class="form-control" id="inputname" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputItem" class="col-sm-2 col-form-label">Item<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input required value={item} onChange={e => setItem(e.target.value)} type="text" class="form-control" id="inputItem" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputItemDescription" class="col-sm-2 col-form-label">Item Description</label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input value={description} onChange={e => setDescription(e.target.value)} type="text" class="form-control" id="inputItemDescription" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPrice" class="col-sm-2 col-form-label">Paid Amount<span className='required-label'>*</span></label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <input required value={paid_amount} onChange={e => setPaidAmount(e.target.value)} type="text" class="form-control" id="inputPrice" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="exampleFormControlTextarea1">Remarks:</label>
                        <div class="d-flex align-items-sm-center col-sm-10">
                            <textarea value={remarks} onChange={e => setRemarks(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center create-catagory-btns">
                    <button type="reset" class="font-weight-bold m-3 py-2 px-4 btn btn-danger" onClick={() => window.location.reload()} >Cancel<i
                        class="px-2 fa fa-times" aria-hidden="true"></i></button>
                    <button type="submit" class="font-weight-bold m-3 py-2 px-4 btn btn-success">Save<i
                        class="px-2 fa fa-floppy-o" aria-hidden="true"></i></button>
                </div>
            </form>
        </div>
    )
}