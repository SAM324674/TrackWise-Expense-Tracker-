import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='p-5 shadow-sm border flex justify-between'>
        <div className='border border-teal-700 rounded-full flex items-center gap-2 w-[25rem]'>
            <div className='bg-green-100 p-2 overflow-hidden rounded-l-full '>
                <Search size={19}/>
            </div>
            <div className='bg-white flex items-center h-full rounded-r-full'>
                <input placeholder='search' className='outline-none h-full w-[20rem] border-none'/>
            </div>

        </div>
        <div>
            <UserButton/>
        </div>
    </div>
  )
}

export default DashboardHeader