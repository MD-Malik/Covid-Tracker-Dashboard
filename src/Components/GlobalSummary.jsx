import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from "./GlobalSummary.module.css"

export const GlobalSummary = () => {

    const[globalSummaryData, setGlobalSummaryData] = useState({
        TotalConfirmed: 536513704,
        TotalDeaths: 6310639,
        TotalRecovered: 0
    })

    const getGlobalSummary = async() => {
        let result = await fetch('https://api.covid19api.com/summary')
        result = await result.json();
        console.log(result.Global)
        setGlobalSummaryData(result.Global)
    }

    useEffect(()=>{
        getGlobalSummary()
    },[])
  
    return (
    <div className={styles.globalSummary}>
        <h2>Summary</h2>
        <div>
            <div>
                <div>Active</div>
                <div>Recovered</div>
                <div>Deceased</div>
            </div>
            <div>
                <div>{globalSummaryData.TotalConfirmed}</div>
                <div>{globalSummaryData.TotalRecovered}</div>
                <div>{globalSummaryData.TotalDeaths}</div>
            </div>
        </div>
    </div>
  )
}
