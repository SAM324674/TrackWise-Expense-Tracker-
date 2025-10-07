"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { getTableColumns, sql,eq } from 'drizzle-orm';
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
    .groupBy(Budgets.id);

    setBudgetlist(result);
    console.log("result:",result);
  }

  return (
    <div>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
         <CreateBudget
          refreshData={()=>getBudgetList()}
         />
         {
          BudgetList.map((budget)=>
          <BudgetItem key={budget.id} budget={budget}/>)
         } 
       </div>
    </div>
  )
}

export default BudgetList