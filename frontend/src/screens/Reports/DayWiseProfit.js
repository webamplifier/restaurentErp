import { CBadge, CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'

export default function DayWiseProfit() {
    const { user,setLoad } = React.useContext(userContext);
    const [expense, setExpense] = React.useState(0);
    const [sale, setSale] = React.useState(0);
    const [to, setTo] = React.useState('');
    const [from, setFrom] = React.useState('');
    const [cash, setCash] = React.useState(0);
    const [bank, setBank] = React.useState(0);

    React.useEffect(() => {
        setLoad(true)
        async function fetchData() {
            const response = await fetch(url + 'get-total-profile-record', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    setExpense(data.expense_record);
                    setSale(data.sales_record);
                    setCash(data.cash_record);
                    setBank(data.bank_record);
                } else {
                    toast.error(data.message);
                }
            }
        }

        fetchData();
    }, [])

    function handleSubmit() {
        if (to && from) {
            setLoad(true)
            const formData = new FormData();
            formData.append('to', to);
            formData.append('from', from);
            async function submit() {
                const response = await fetch(url + 'get-profit-data', {
                    method: 'POST',
                    headers: {
                        'Authorization': user?.token
                    },
                    body: formData
                });

                if (response.ok === true) {
                    const data = await response.json();
                    setLoad(false)
                    if (data.status == 200) {
                        setExpense(data.expense_record);
                        setSale(data.sales_record);
                        setCash(data.cash_record);
                        setBank(data.bank_record);
                    } else {
                        toast.error(data.message)
                    }
                } else {
                    toast.error('Oops something went wrong!')
                }
            }

            submit().catch(err => toast.error('Internal server error!. Please try again later'))
        } else {
            toast.error('Please fill the to and from date')
        }
    }

    return (
        <section>

            <div className="container">
                <div className="row align-items-center">
                    <div className="form-group col-md-4">
                        <label htmlFor="">From</label>
                        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="">To</label>
                        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
            <ToastContainer />

            <section className='day-wise-profit-table col-md-4'>
                <table className='bg-white w-100 text-dark px-3 py-3'>
                    <tr>
                        <td>
                            <p>Cash</p>
                            <p>Bank</p>
                            <p>Total Sales</p>
                        </td>
                        <td> 
                            <p style={{textAlign: 'center'}}>{cash}</p>
                            <p style={{textAlign: 'center'}}>+ {bank}</p>
                            <p style={{textAlign:'center', fontWeight:"bolder"}}>{sale}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Expense</td>
                        <td style={{fontWeight:"bolder", textAlign:'center'}}>- {expense}</td>
                    </tr>
                    <tr>
                        <td style={{fontWeight:'bold'}}>Total</td>
                        <td style={{fontWeight:'bold', textAlign:'center'}}>{parseFloat(sale) - parseFloat(expense)}</td>
                    </tr>
                </table>
            </section>
        </section>
    )
}
