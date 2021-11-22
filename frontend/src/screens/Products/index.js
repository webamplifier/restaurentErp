import { CBadge, CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import {toast,ToastContainer} from 'react-toastify'
import {userContext} from '../../context/UserContext'
import CustomModal from 'src/components/CustomModal';


const getBadge = status => {
    switch (status) {
      case '1': return 'success'
      case '2': return 'secondary'
      // case 'Pending': return 'warning'
      // case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

export default function Index(){
    const {user,setLoad} = React.useContext(userContext);
    //subcategory,sales_unit,pack_unit
    const fields = ['#','name','category','subcategory','type','price','pack_unit', 'sales_unit','action'];
    //
    const [productList,setProductList] = React.useState([]);
    const [id,setId] = React.useState(null);
    const [modal,setModal] = React.useState(false)

    React.useEffect(()=>{
      setLoad(true)
      async function fetchData(){
        const response = await fetch(url + 'productlist',{
          method : 'GET',
          headers : {
            'Authorization' : user?.token
          }
        })

        if (response.ok === true){
          const data = await response.json();

          if (data.status === 200){
            setLoad(false)
            // deleteProduct
            setProductList(data.product_list.map((item,index)=>{
              return {
                '#' : index +1,
                'name' : item.name,
                'category' : item.category_name,
                'subcategory': item.subcategory_name,
                'price' : item.price,
                'pack_unit': item.pack_unit,
                'sales_unit':item.sales_unit,
                'product_id' : item.id,
                'type' : item.type
                
              }
            }));
          }
        }
      }
      fetchData();
    },[])

    const deleteEntry = () => {
      setLoad(true)
      async function deleteData(){
        const response = await fetch(url + 'deleteproduct/' + id,{
          method : 'GET',
          headers : {
            'Authorization' : user?.token
          }
        })

        const data = await response.json();

        if (data.status === 200){
          setModal(false);
          setId('');
          async function fetchData(){
            const response = await fetch(url + 'productlist',{
              method : 'GET',
              headers : {
                'Authorization' : user?.token
              }
            })
    
            if (response.ok === true){
              const data = await response.json();
    
              if (data.status === 200){
                setLoad(false)
                // deleteProduct
                setProductList(data.product_list.map((item,index)=>{
                  return {
                    '#' : index +1,
                    'product_name' : item.name,
                    'product_category' : item.category_name,
                    //subcategory 
                    'product_subcategory': item.subcategory_name,
                    //
                    'price' : item.price,
                    //sales_unit, pack_unit
                    'pack_unit': item.pack_unit,
                    'sales_unit':item.sales_unit,
                    //
                    'product_id' : item.id
                  }
                }));
              }
            }
          }
          fetchData();
          
        }else{
          setLoad(false)
          toast.error(data.message)
        }
      }
      deleteData();
    }

    const showModal = value => {
      setId(value);
      setModal(true)
    }

    return(
        <section>
          <ToastContainer />
          <CustomModal modal={modal} setModal={setModal} deleteEntry={deleteEntry} />
            <Link to='/create/products'>Create Product</Link>
            <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
            <CDataTable
              items={productList}
              fields={fields}
              columnFilter
              tableFilter
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status_id)}>
                        {item.status_id === 1 ? 'Active' : 'Inactive'}
                      </CBadge>
                    </td>
                  ),
                'action': (item)=>(
                  <td>
                    <Link to={`/edit/products/${item.product_id}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                    <i style={{cursor:"pointer"}} onClick={()=>showModal(item.product_id)} class="fa fa-trash" aria-hidden="true"></i>
                  </td>
                )

              }
            }
            />
            </CCardBody>
          </CCard>
        </CCol>
        </section>
    )
}