import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

const ExpenseListTable = ({ expenseList,refreshData }) => {
    console.log("expenses list in the table:", expenseList);

     const deleteExpense=async(expense)=>{
        const result=await db.delete(Expenses)
        .where(eq(Expenses.id,expense.id))
        .returning();

        if(result){
            toast("Expense Deleted Successfully");
            refreshData(); 
        }
     }
    return (
        <div className='mt-3'>
            <div className='grid grid-cols-4 bg-slate-200 p-2 text-bold'>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>
            {expenseList.map((expense, index) => (
                <div className='grid grid-cols-4 bg-slate-50 p-2' key={index}>
                    <h2>{expense.name}</h2>
                    <h2>{expense.amount}</h2>
                    <h2>{expense.createdAt.toLocaleString()}</h2>
                    <h2 className='cursor-pointer hover:text-red-400'>
                        <Trash
                        onClick={()=>deleteExpense(expense)}/>
                    </h2>
                </div>
            )
            )}
        </div>
    )
}

export default ExpenseListTable