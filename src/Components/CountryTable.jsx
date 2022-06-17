import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styles from "./CountryTable.module.css"

export const CountryTable = () => {
    const [countryData, setCountryData] = useState([])
    const [searchedData, setSearchedData] = useState([])
    const [inputString, setInputString] = useState("")

    const getCountriesData = async() => {
        let result = await fetch("https://api.covid19api.com/summary")
        result = await result.json();
        // console.log(result.Countries);
        setCountryData(result.Countries);
        setSearchedData(result.Countries);
    }

    const navigate = useNavigate();

    const verifyToken = async(token) => {
        let result = await fetch('https://covid-tracker-dashborad.herokuapp.com/verifyToken', {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({token})
        })
        result = await result.json();
        if(!result.status){
            navigate("/login")
            return;
        }
    }

    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem("token"))
        if(!token){
            navigate("/login")
        }
        verifyToken(token);
        getCountriesData();
    },[])

    const handleSearchByInp = (e) => {
        let value = e.target.value;
        setInputString(value);
        let output = [];
        countryData.forEach(item=>{
            if(item.Country.match(new RegExp(value, 'gi'))){
                output.push(item)
            }
        })
        setTimeout(() => {
            setSearchedData(output)
        }, 1000);
    }
  return (
    <div>
        <div className={styles.SearchInp}>
            <input type="text" placeholder='Search' onChange={handleSearchByInp}/>
        </div>
        <div className={styles.CountryTableDiv}>
            <div className={styles.TableHeading} onScroll={{position: "sticky"}}>
                <div>Country</div>
                <div>Confirmed (total confirmed cases)</div>
                <div>Recovered (total number of recovered cases)</div>
                <div>Deceased (total number of deceased cases)</div>
            </div>
            {searchedData.length==0?false:searchedData.map(item=>(
                <div key={item.ID}>
                    <div>{item.Country}</div>
                    <div>{item.TotalConfirmed}</div>
                    <div>{item.TotalRecovered}</div>
                    <div>{item.TotalDeaths}</div>
                </div>
            ))}
            <div style={searchedData.length==0?{color : "black"}:{color : "white"}}>No Data Found For {inputString}</div>    
        </div>
    </div>
  )
}
