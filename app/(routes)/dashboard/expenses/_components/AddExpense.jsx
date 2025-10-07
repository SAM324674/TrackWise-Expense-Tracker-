"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';

const AddExpense = ({ budgetId, user, refreshData }) => {
    console.log("budgetId in add expense:", budgetId);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    if (!budgetId) {
        toast.error("Please select a valid budget");
        return;
    }

    const addExpensehandler = async () => {

        const result = await db.insert(Expenses).values({
            id: Math.floor(Math.random() * 1000000),
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: new Date()
        }).returning({ insertedId: Expenses.id });
        console.log("result of adding expense:", result);
        if (result) {

            refreshData();
            toast("Expense Added Successfully");
            setName("");
            setAmount(0);
        }
    }
    return (
        <div>
            <div className='border p-3 rounded-md'>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1"> Expense Name</Label>
                        <Input id="name-1" name="name" placeholder="Grocery..." value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="amount-1">Expense Amount</Label>
                        <Input type="number" id="amount-1" name="amount" placeholder="1000" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <Button className="w-full bg-primary" onClick={addExpensehandler}>Add New Expense</Button>
                </div>
            </div>

        </div>
    )
}

export default AddExpense