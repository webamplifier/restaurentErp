import React,{Fragment} from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import { toast, ToastContainer } from 'react-toastify'
import { userContext } from '../../context/UserContext'
import CustomModal from 'src/components/CustomModal';


export default function Index() {
  const { user, setLoad } = React.useContext(userContext);
  const [productList, setProductList] = React.useState([]);
  const [id, setId] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const [modal, setModal] = React.useState(false)

  React.useEffect(() => {
    setLoad(true)
    async function fetchData() {
      const response = await fetch(url + 'fetchProductList', {
        method: 'GET',
        headers: {
          'Authorization': user?.token
        }
      })

      if (response.ok === true) {
        const data = await response.json();

        if (data.status === 200) {
          setLoad(false)
          setProductList(data.list.map((item,index)=>{
            return{
              '#': index+1,
              'id': item.id,
              'name': item.name,
              'price':item.price,
              'stock_quantity': item.stock_quantity,
            }
    }));
          setTotal(data.total_records);
        }else{
          toast.error(data.message);
        }
      }
    }
    fetchData();
  }, [])

  const deleteEntry = () => {
    setLoad(true)
    async function deleteData() {
      const response = await fetch(url + 'deleteproduct/' + id, {
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
          const response = await fetch(url + 'fetchProductList', {
            method: 'GET',
            headers: {
              'Authorization': user?.token
            }
          })

          if (response.ok === true) {
            const data = await response.json();

            if (data.status === 200) {
              setLoad(false)
              setProductList(data.list.map((item,index)=>{
                return{
                  '#': index+1,
                  'id': item.id,
                  'name': item.name,
                  'price':item.price,
                  'stock_quantity': item.stock_quantity,
                }
        }));
              setTotal(data.total_records);
            }else{
              toast.error(data.message)
            }
          }
        }
        fetchData();

      } else {
        setLoad(false)
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
        key: "name",
        text: "Product Name",
        className: "name",
        sortable: true
    },
    {
        key: "price",
        text: "Price",
        className: "price",
        sortable: true
    },
    {
        key: "stock_quantity",
        text: "Quantity",
        className: "stock_quantity",
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
                        to={`/edit/products/${record.id}`}
                    >
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
          setProductList(data.list.map((item,index)=>{
            return{
              '#': index+1,
              'id': item.id,
              'name': item.name,
              'price':item.price,
              'stock_quantity': item.stock_quantity,
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
    let query = `fetchProductList?page_number=${e.page_number}&page_size=${e.page_size}&filter_value=${e.filter_value}`;
    if (e.sort_order) {
        let sort = JSON.stringify(e.sort_order);
        query = `fetchProductList?page_number=${e.page_number}&page_size=${e.page_size}&filter_value=${e.filter_value}&sort_order=${sort}`;
    }
    fetchData(query);
}

  return (
    <section>
      <ToastContainer />
      <CustomModal modal={modal} setModal={setModal} deleteEntry={deleteEntry} />
      <Link to='/create/products' className="btn btn-primary float-right" >Create Product</Link>
      <ReactDatatable
                    config={config}
                    records={productList}
                    columns={columns}
                    total_record={total}
                    onChange={(e)=>handleChange(e)}
                    dynamic={true}
                />
    </section>
  )
}