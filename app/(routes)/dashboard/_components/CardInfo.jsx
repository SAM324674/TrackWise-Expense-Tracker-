"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, getTableColumns, sql } from 'drizzle-orm';
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const CardInfo = ({ budgetList }) => {

  const [totalBudget, setTotalBudget] = useState();
  const [totalSpend, setTotalSpend] = useState();
  useEffect(() => {
    budgetList && CalculateCardInfo()
  }, [budgetList]);
  const CalculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget = 0;
    let totalSpend = 0;
    budgetList.forEach(element => {
      totalBudget = totalBudget + Number(element.amount);
      totalSpend = totalSpend + element.totalSpend;

    })

    console.log("totalSpend and totalBudget:", totalBudget, totalSpend);
    setTotalBudget(totalBudget);
    setTotalSpend(totalSpend);
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-9 gap-3 '>
      {/* total budget */}
      <div className='flex justify-between border p-4 rounded-md items-center h-[6rem]'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-slate-600'>Total Budget</h2>
          <h2 className='text-xl font-bold'>${totalBudget}</h2>
        </div>
        <div className='p-2 rounded-full bg-primary text-white'>
          <PiggyBank />
        </div>
      </div>
      {/* total spend */}
      <div className='flex justify-between border p-4 rounded-md items-center'>
        <div className='flex flex-col gap-2'>
          <h2>Total Spend</h2>
          <h2 className='text-xl font-bold'>${totalSpend}</h2>
        </div>
        <div className='p-2 rounded-full bg-primary text-white'>
          <ReceiptText />
        </div>
      </div>
      {/* No of expenses */}
      <div className='flex justify-between border p-4 rounded-md items-center'>
        <div className='flex flex-col gap-2'>
          <h2>No of Budgets</h2>
          <h2 className='text-xl font-bold'>{budgetList?.length}</h2>
        </div>
        <div className='p-2 rounded-full bg-primary text-white'>
          <Wallet />
        </div>
      </div>
    </div>
  )
}

export default CardInfo