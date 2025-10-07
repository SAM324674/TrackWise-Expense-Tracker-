import React from 'react'
import CreateBudget from './CreateBudget'

const BudgetList = () => {

  const getBudgetList=async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalCount: sql `count(${Expenses.id})`.mapWith(Number)
    })
  }
  return (
    <div>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
         <CreateBudget/> 
       </div>
    </div>
  )
}

export default BudgetList