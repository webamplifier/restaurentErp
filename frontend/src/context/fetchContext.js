import React from 'react';
import {url} from '../helpers/helpers'

const fetchContext = React.createContext();

function FetchContext(props){
    const [allCountries,setAllCountries] = React.useState([]);
    const [allStates,setAllStates] = React.useState([]);
    const [allCities,setAllCities] = React.useState([]);
    const [allBusinessTypes,setAllBusinessTypes] = React.useState([]);

    React.useEffect(()=>{
        async function fetchData(){
            const response = await fetch(url + 'fetchCountriesStatesCities');

            if (response.ok === true){
                const data = await response.json();

                setAllCountries(data.countries_data.map(item=>{
                    return {
                        value : item.id,
                        label : item.name
                    }
                }));
                setAllStates(data.states_data.map(item=>{
                    return {
                        value : item.id,
                        label : item.name,
                        company_id : item.country_id
                    }
                }));
                setAllCities(data.cities_data.map(item=>{
                    return {
                        value : item.id,
                        label : item.name,
                        state_id : item.state_id
                    }
                }))
            }
        }
        fetchData();

        async function fetchBusinessType(){
            const response = await fetch(url + 'fetchBusinessTypes');

            if (response.ok === true){
                const data = await response.json();

                setAllBusinessTypes(data.business_type_data.map(item=>{
                    return {
                        value : item.id,
                        label : item.name
                    }
                }));
            }
        }

        fetchBusinessType();

    },[])

    return(
        <fetchContext.Provider value={{allCountries,allStates,allCities,allBusinessTypes}}>
            {props.children}
        </fetchContext.Provider>
    )
}

export {fetchContext,FetchContext}