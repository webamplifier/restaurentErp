import { CBadge, CCard, CCardBody, CCol, CDataTable } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { url } from 'src/helpers/helpers';
import {toast,ToastContainer} from 'react-toastify'
import {userContext} from '../../context/UserContext'

const getBadge = status => {
    switch (status) {
      case '1': return 'success'
      case '2': return 'secondary'
      // case 'Pending': return 'warning'
      // case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

export default function CompanyList(){
    const {user} = React.useContext(userContext);
    const fields = ['#','restaurant_name','email','mobile_number','food_License_Number','password','GST Number','Address','status','action'];
    const [restaurantList,setRestaurantList] = React.useState([]);

    React.useEffect(()=>{
      async function fetchList(){
        const response = await fetch(url + 'restaurantList',{
          method : 'GET',
          headers : {
            'Authorization' : user?.token
          }
        }
        );

        if (response.ok === true){
          const data = await response.json();

          if (data.status === 200)
          {
            console.log(data.restaurant_data)
            setRestaurantList(data.restaurant_data)
          }
          else
          {
            toast.error(data.message)
          }
        }
      }
      fetchList()
    },[])

    return(
        <section>
          <ToastContainer />
            <Link to='/create/restaurant'>Create Restaurant</Link>
            <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
            <CDataTable
              items={restaurantList}
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
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    <i class="fa fa-trash" aria-hidden="true"></i>
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