"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budget/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();
  const [BudgetList, setBudgetlist] = useState([]);
  const [ExpenseList, setExpenseList] = useState([]);
  useEffect(() => {
    if (user){
      getBudgetList();
      checkUserBudgets();
    } 
  }, [user]);
 
  
      const checkUserBudgets=async()=>{
          const result=await db.select().from(Budgets).where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress));
  
          console.log("result:",result);
          if(result?.length==0){
              router.replace('/dashboard/budget');
          }
      }   
  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalCount: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.createdAt))

    setBudgetlist(result);
    getAllExpenses();
    console.log("result:", result);
  }
  //  console.log("budgetlist:",BudgetList);
  
  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpenseList(result)
    console.log(result);

  }

  console.log("expense list:", ExpenseList);
  return (
    <div className=' m-5  '>
      <h2 className=' font-bold text-2xl mt-3'> Hi, {user?.fullName}</h2>
      <p className='text-slate-500 text-sm mb-3'>
        Here's what's happening with your Money, Let's Manage your expense
      </p>
      <CardInfo budgetList={BudgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='md:col-span-2 mt-5'>
          <BarChartDashboard budgetList={BudgetList} />
          <h2 className='font-bold text-lg mt-4'>Latest Expenses</h2>
          <ExpenseListTable expenseList={ExpenseList} refreshData={() => getBudgetList()} />
        </div>

        <div className=' text-lg font-bold gap-3 mt-4'>
          <h2>Latest budgets</h2>
          {BudgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard