"use client"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React from 'react'

function Hero() {
    const {user}=useUser();
    const route=useRouter();
    const getStarted=()=>{
        if(user){
            route.replace('/dashboard')

        }
        else{
            route.replace('/sign-in')
        }
        
    }
    return (
        <section className="bg-white border lg:grid lg:h-screen lg:place-content-center">
            <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                <div className="mx-auto max-w-prose text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Manage Your Expense
                        <strong className="text-[#389647]"> Control your Money </strong>
                        
                    </h1>

                    <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                        Take control of your finances with our intuitive expense tracker. Monitor your spending, set budgets, and achieve your financial goals with ease.
                    </p>

                    <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                        <a
                            className="inline-block rounded border border-[#389647] bg-[#389647] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                            onClick={()=>getStarted()}
                        >
                            Get Started
                        </a>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default Hero