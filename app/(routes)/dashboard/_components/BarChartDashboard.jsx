import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({ budgetList }) => {
    return (
        <div className='border rounded-lg p-5'>
            <h2 className='font-bold text-lg'>Activity</h2>
            <ResponsiveContainer width={'80%'} height={300}>
                <BarChart

                    data={budgetList}
                    margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5
                    }}
                >
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='totalSpend' stackId='a' fill='#389647' />
                    <Bar dataKey='amount' stackId="a" fill='#cee5d1' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartDashboard