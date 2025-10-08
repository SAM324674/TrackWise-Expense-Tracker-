"use client"
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const page = () => {
    const { user } = useUser();
    const router=useRouter();
    const [BudgetList, setBudgetlist] = useState([]);
    const [ExpenseList, setExpenseList] = useState([]);
    useEffect(() => {
        if(user) {
            getBudgetList(); 
            checkUserBudgets()
        };
    }, [user]);

    const checkUserBudgets = async () => {
        const result = await db.select().from(Expenses).where(eq(Expenses.createdBy, user?.primaryEmailAddress?.emailAddress));
  
        console.log("result:", result);
        if (result?.length == 0) {
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
    return (
        <div className='m-4'>
            <h2 className='text-lg font-bold m-4'>
                Latest Expenses
            </h2>
            <ExpenseListTable expenseList={ExpenseList} refreshData={() => getBudgetList()} />
        </div>
    )
}

export default page