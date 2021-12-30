import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import CustomModal from '../../components/CustomModal';

export default function ExpenseReport() {
    const { user, setLoad } = React.useContext(userContext);
    const [expenseList, setExpenseList] = React.useState([]);
    const [total,setTotal] = React.useState("");
    const [modal, setModal] = React.useState(false);
    const [id, setId] = React.useState('')
    const [to, setTo] = React.useState('');
    const [from, setFrom] = React.useState('');

    const deleteEntry = () => {
        setLoad(true)
        async function deleteData() {
            const response = await fetch(url + 'deleteexpense/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            const data = await response.json();
            if (data.status === 200) {
                setModal(false);
                setId('');
                async function fetchData() {
                  const response = await fetch(url + 'fetchexpenseList', {
                        method: 'GET',
                        headers: {
                            'Authorization': user?.token
                        }
                    })

                    if (response.ok === true) {
                        const data = await response.json();
                        setLoad(false)
                        if (data.status === 200) {
                            setExpenseList(data.list.map((item,index)=>{
                                return{
                                  '#': index+1,
                                  'id': item.id,
                                  'expense_date': item.expense_date,
                                  'name':item.name,
                                  'item_name':item.item_name,
                                  'paid_amount': item.paid_amount,
                                }
                        }));
                            setTotal(parseInt(data.total_records));
                        } else {
                            toast.error(data.message);
                        }
                    }
                }
                fetchData();
            } else {
                toast.error(data.message)
            }
        }
        deleteData();
    }

    const columns = [
        {
            key: "#",
            text: "#",
            className: "#",
            sortable: true
        },
        {
            key: "expense_date",
            text: "Expense Date",
            className: "expense_date",
            sortable: true
        },
        {
            key: "name",
            text: "To",
            className: "name",
            sortable: true
        },
        {
            key: "item_name",
            text: "Item",
            className: "item_name",
            sortable: true
        },
        {
            key: "paid_amount",
            text: "Paid Amount",
            className: "paid_amount",
            sortable: true
        },
        {
            key: "action",
            text: "Action",
            className: "action",
            width: 100,
            sortable: false,
            cell: record => {
                return (
                    <Fragment>
                        <Link
                            to={`/edit/expense/${record.id}`}
                            style={{ cursor: "pointer" }}>
                            <i className="fa fa-pencil mr-2"></i>
                        </Link>
                        <i
                            style={{ cursor: "pointer" }}
                            onClick={() => showModal(record.id)}
                            class="fa fa-trash"
                            aria-hidden="true">
                        </i>
                    </Fragment>
                );
            }
        }
    ];
    const config = {
        page_size: 10,
        length_menu: [10, 20, 50],
        button: {
            excel: false,
            print: false,
            extra: false,
        }
    }
    async function fetchData(query) {
        setLoad(true);
        const response = await fetch(url + query, {
            method: 'GET',
            headers: {
                'Authorization': user?.token
            }
        })
        if (response.ok === true) {
            const data = await response.json();
            setLoad(false)
            if (data.status === 200) {
                setExpenseList(data.list.map((item,index)=>{
                    return{
                      '#': index+1,
                      'id': item.id,
                      'expense_date': item.expense_date,
                      'name':item.name,
                      'item_name':item.item_name,
                      'paid_amount': item.paid_amount,
                    }
            }));
                setTotal(parseInt(data.total_records));
            } else {
                toast.error(data.message);
            }
        }
    }

    const showModal = value => {
        setId(value);
        setModal(true)
    }

    const handleChange = (e) => {
        let query = `fetchexpenseList?page_number=${e.page_number}&page_size=${e.page_size}&filter_value=${e.filter_value}&to=${to}&from=${from}`;
        if (e.sort_order) {
            let sort = JSON.stringify(e.sort_order);
            query = `fetchexpenseList?page_number=${e.page_number}&page_size=${e.page_size}&filter_value=${e.filter_value}&sort_order=${sort}&to=${to}&from=${from}`;
        }
        fetchData(query);
    }

    function handleSubmit() {
        if (to && from) {
            setLoad(true)
            async function submit() {
                const response = await fetch(url + `fetchexpenseList?to=${to}&from=${from}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': user?.token
                    },
                });
                if (response.ok === true) {
                    const data = await response.json();
                    setLoad(false)
                    if (data.status == 200) {
                        setExpenseList(data.list.map((item,index)=>{
                            return{
                              '#': index+1,
                              'id': item.id,
                              'expense_date': item.expense_date,
                              'name':item.name,
                              'item_name':item.item_name,
                              'paid_amount': item.paid_amount,
                            }
                    }));
                        setTotal(parseInt(data.total_records));
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

    React.useEffect(() => {
        setLoad(true)
        async function fetchData() {
            const response = await fetch(url + 'fetchexpenseList', {
                method: 'GET',
                headers: {
                    'Authorization': user?.token
                }
            })

            if (response.ok === true) {
                const data = await response.json();
                setLoad(false)
                if (data.status === 200) {
                    setExpenseList(data.list.map((item,index)=>{
                        return{
                          '#': index+1,
                          'id': item.id,
                          'expense_date': item.expense_date,
                          'name':item.name,
                          'item_name':item.item_name,
                          'paid_amount': item.paid_amount,
                        }
                }));
                    setTotal(parseInt(data.total_records));
                } else {
                    toast.error(data.message);
                }
            }
        }

        fetchData();
    }, [])

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
            <CustomModal modal={modal} setModal={setModal} deleteEntry={deleteEntry} />
            <ReactDatatable
                    config={config}
                    records={expenseList}
                    columns={columns}
                    total_record={total}
                    onChange={(e)=>handleChange(e)}
                    dynamic={true}
                />
        </section>
    )
}
