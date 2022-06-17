import React from 'react'
import { GlobalSummary } from '../Components/GlobalSummary'
import { GraphSummary } from '../Components/GraphSummary'
import { Navbar } from '../Components/Navbar'

export const GlobalDashboardRoute = () => {
  return (
    <div>
        <Navbar />
        <div>
          <GlobalSummary />
          <GraphSummary />
        </div>
    </div>
  )
}
