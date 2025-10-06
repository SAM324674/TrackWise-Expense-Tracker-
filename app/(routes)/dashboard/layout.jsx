import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'

const Dashboardlayout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='border fixed '>
        <SideNav />
      </div>
      <div className='ml-[10rem]  border border-red-400 w-screen'>
        <DashboardHeader/>
        {children}

      </div>
    </div>
  )
}

export default Dashboardlayout