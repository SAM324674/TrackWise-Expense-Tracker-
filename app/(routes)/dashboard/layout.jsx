"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
const Dashboardlayout = ({ children }) => {
  const router=useRouter();
    const {user}=useUser();
    useEffect(()=>{
        user && checkUserBudgets();
        console.log("user:",user);
    },[user])

    const checkUserBudgets=async()=>{
        const result=await db.select().from(Budgets).where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress));

        console.log("result:",result);
        if(result?.length==0){
            router.replace('/dashboard/budget');
        }
    }   
  return (
    <div className='flex'>
      <div className='border fixed '>
        <SideNav />
      </div>
      <div className='ml-[10rem] w-screen'>
        <DashboardHeader/>
        {children}

      </div>
    </div>
  )
}

export default Dashboardlayout