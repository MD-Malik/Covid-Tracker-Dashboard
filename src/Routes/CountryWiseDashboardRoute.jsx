import React from 'react'
import { CountryTable } from '../Components/CountryTable'
import { Navbar } from '../Components/Navbar'

export const CountryWiseDashboardRoute = () => {   
  return (
    <div>
        <Navbar />
        <CountryTable />
    </div>
  )
}
