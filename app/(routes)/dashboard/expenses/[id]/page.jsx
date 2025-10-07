"use client"
import { db } from '@/utils/dbConfig';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budget/_components/BudgetItem';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';

const ExpensesPage= ({params}) => {
    const {user}=useUser();
    const resolvedParams = React.use(params);
    const [budgetInfo,setbudgetInfo]=useState();
    const [expenseList,setExpenseList]=useState([]);
   useEffect(()=>{
    //  console.log("params:",params.id);
    user&&getBudgetInfo();
    console.log("BudgetInfo:",budgetInfo);
   },[user]);

   const getBudgetInfo=async()=>{
      const result=await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
            totalCount: sql `count(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
          .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
          .where(eq(Budgets.id, resolvedParams.id))
          .groupBy(Budgets.id)
        
          console.log("result in the expenses page:",result);
          setbudgetInfo(result[0]);
          getExpensesList();
          console.log("result in the expenses page:",result);
          console.log("budget info:",budgetInfo)
   }

   const getExpensesList=async()=>{
     const result=await db.select().from(Expenses)
     .where(eq(Expenses.budgetId,resolvedParams.id))
     .orderBy(desc(Expenses.createdAt));

     console.log("expense list result:",result);
     setExpenseList(result);
   }
  return (
    <div className=''>
        <h2 className='text-2xl font-bold p-3 '>
            My Expenses
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  m-2 '>
            {budgetInfo?<BudgetItem budget={budgetInfo} />:
            <div className=' m-3 md:m-2 bg-slate-300 rounded-lg h-[10rem] animate-pulse '></div>
            }
            <AddExpense budgetId={budgetInfo?.id} user={user} refreshData={getBudgetInfo}/>
        </div>
        <div className='m-3'>
            Latest Expenses
            <ExpenseListTable expenseList={expenseList} refreshData={()=>getBudgetInfo()}/>
        </div>
    </div>
  )
}

export default ExpensesPage