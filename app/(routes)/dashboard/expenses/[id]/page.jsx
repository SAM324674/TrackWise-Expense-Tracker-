"use client"
import { db } from '@/utils/dbConfig';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budget/_components/BudgetItem';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { Pen, PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';
const ExpensesPage = ({ params }) => {
  const { user } = useUser();
  const resolvedParams = React.use(params);
  const [budgetInfo, setbudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState([]);
  const route = useRouter();
  useEffect(() => {
    //  console.log("params:",params.id);
    user && getBudgetInfo();
    console.log("BudgetInfo:", budgetInfo);
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalCount: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, resolvedParams.id))
      .groupBy(Budgets.id)

    console.log("result in the expenses page:", result);
    setbudgetInfo(result[0]);
    getExpensesList();
    console.log("result in the expenses page:", result);
    console.log("budget info:", budgetInfo)
  }

  const getExpensesList = async () => {
    const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, resolvedParams.id))
      .orderBy(desc(Expenses.createdAt));

    console.log("expense list result:", result);
    setExpenseList(result);
  }

  const DeleteBudget = async () => {
    const DeleteExpensesresult = await db.delete(Expenses).where(eq(Expenses.budgetId, resolvedParams.id))
      .returning();

    if (DeleteExpensesresult) {
      const result = await db.delete(Budgets).where(eq(Budgets.id, resolvedParams.id)).returning();
    }
    toast("Budget Deleted Successfully");
    route.replace('/dashboard/budget');
  }

  return (
    <div className=''>
      <div className='flex items-center justify-between m-2'>
        <h2 className='text-2xl font-bold p-3 '>
          My Expenses
        </h2>

        <div className='flex gap-4 items-center'>
          <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()} />
          <AlertDialog>
            <AlertDialogTrigger className="border w-[6.7rem] hover:text-white hover:bg-destructive text-destructive cursor-pointer border-destructive rounded-md ">
              {/* <Button variant="outline" className="border bg-destructive text-white border-destructive "> */}
              <div className='flex p-2 justify-evenly items-center'>
                <Trash size={18}/>
                <h2>Delete</h2>
              </div>

              {/* </Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className={"bg-destructive hover:bg-destructive/80"} onClick={() => DeleteBudget()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>



        </div>

      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  m-2 '>
        {budgetInfo ? <BudgetItem budget={budgetInfo} /> :
          <div className=' m-3 md:m-2 bg-slate-300 rounded-lg h-[10rem] animate-pulse '></div>
        }
        <AddExpense budgetId={budgetInfo?.id} user={user} refreshData={getBudgetInfo} />
      </div>
      <div className='m-3'>
        {expenseList.length > 0 ?
          <>
            <h2 className='text-lg font-bold'>Latest Expenses</h2>
            <ExpenseListTable expenseList={expenseList} refreshData={() => { getBudgetInfo(); getExpensesList() }} />
          </>
          : <></>}
      </div>
    </div>
  )
}

export default ExpensesPage