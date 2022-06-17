import React from 'react'
import { Route, Routes } from 'react-router'
import { Navbar } from '../Components/Navbar'
import { CountryWiseDashboardRoute } from './CountryWiseDashboardRoute'
import { GlobalDashboardRoute } from './GlobalDashboardRoute'
import { HomeRoute } from './HomeRoute'

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/Global" element={<GlobalDashboardRoute /> } />
        <Route path='/Country' element={<CountryWiseDashboardRoute />} />
        <Route path='/' element={<HomeRoute />} />
      </Routes>
    </>
  )
}
