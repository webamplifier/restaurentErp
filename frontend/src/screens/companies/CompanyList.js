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
    const fields = ['#','firm_name','email','mobile_number','status','action'];
    const [companiesList,setCompaniesList] = React.useState([]);

    React.useEffect(()=>{
      async function fetchList(){
        const response = await fetch(url + 'companiesList',{
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
            console.log(data.companies_data)
            setCompaniesList(data.companies_data)
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
            <Link to='/create/company'>Create Company</Link>
            <CCol xs="12" lg="12">
          <CCard>
            <CCardBody>
            <CDataTable
              items={companiesList}
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