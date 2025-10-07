"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { getTableColumns, sql,eq, desc } from 'drizzle-orm';
import BudgetItem from './BudgetItem';

const BudgetList = () => {
  const {user}=useUser();
  const [BudgetList,setBudgetlist]=useState([]);
  useEffect(()=>{
    user&&getBudgetList();
  },[user]);

  const getBudgetList=async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalCount: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.createdAt))

    setBudgetlist(result);
    console.log("result:",result);
  }
 console.log("budgetlist:",BudgetList);
  return (
    <div>
       <div className='border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
         <CreateBudget
          refreshData={()=>getBudgetList()}
         />
         {BudgetList?.length>0?
          BudgetList.map((budget)=>
          <BudgetItem key={budget.id} budget={budget}/>)
         :
         [1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='md:w-[27rem] w-[21.5rem]  m-3 md:m-2 bg-slate-300 rounded-lg h-[10rem] animate-pulse '>

          </div>

         ))
         } 
       </div>
    </div>
  )
}

export default BudgetList