"use client"
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { db } from '../../../../utils/dbConfig'
import { Budgets } from '../../../../utils/schema'
import { useRouter } from 'next/navigation'
import BudgetList from './_components/BudgetList'
const Budget = () => {
  return (
    <div>
      <div className='p-4 text-3xl '>My Budgets</div>
      <BudgetList />
    </div>
  )
}

export default Budget
