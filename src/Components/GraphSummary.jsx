import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from "./GraphSummary.module.css"

export const GraphSummary = () => {
    const [data, setData] = useState([]);
    const[country, setCountry] = useState("")
    const [countriesData, setCountriesData] = useState([])

    const getCasesByCountry = async(country) => {
        let result = await fetch(`https://api.covid19api.com/dayone/country/${country}`)
        result = await result.json();
        // console.log(result)
        setCountry(country);
        let output = [];
        for(var i=0; i<result.length; i=i+7){
            output.push(result[i]);
        }
        setTimeout(() => {
            setData(output);
        }, 1000);
    }

    const getCountriesName = async() => {
        let result = await fetch('https://api.covid19api.com/countries')
        result = await result.json();
        setCountriesData(result)
    }

    const handleSelectCountry = (e) => {
        setCountry(e.target.value)
        getCasesByCountry(e.target.value)
    }

    useEffect(()=>{
        getCasesByCountry("india")
        getCountriesName()
    },[])
  return (
    <div className={styles.GraphSummary}>
        <span>
            <select onChange={handleSelectCountry}>
                {countriesData.map(item=>(
                    <option value={item.Slug}>{item.Country}</option>
                ))}
            </select>
            <div>
                <span>Country : {country}</span>
            </div>
        </span>
        <h2>Graph</h2>
        <div>
            {data.map(item=>(
                <div style={{height : `${item.Confirmed/100000}px`, width : "6px"}} id={item.ID}></div>
            ))}
        </div>
    </div>
  )
}
