import React from 'react'

const BudgetItem = ({ budget }) => {
    return (
        <div className='m-3 border rounded-xl p-5 hover:shadow-xl '>
            <div className='flex gap-2 items-center justify-between  '>
                <div className='flex gap-2'>
                    <div>
                        <h2 className='text-3xl p-2 bg-slate-100 rounded-full'>{budget?.icon}</h2>
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>{budget.name}</h2>
                        <h2 className='text-sm text-slate-600 '>{budget.totalCount} Items</h2>
                    </div>
                </div>
                <h2 className='font-bold text-primary text-lg'>
                    ${budget.amount}
                </h2>
             
            </div>
               <div className='mt-5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xs text-slate-400'>${budget.totalSpend?budget.totalSpend:0} Spent</h2>
                        <h2 className='text-xs text-slate-400'>${budget.amount-budget.totalSpend} Remaining</h2>
                    </div>
                    <div className='w-full bg-slate-400 h-2 rounded-full mt-2'>
                        <div className='w-[40%] rounded-full h-2 bg-primary'>

                        </div>
                    </div>
                </div>

        </div>
    )
}

export default BudgetItem