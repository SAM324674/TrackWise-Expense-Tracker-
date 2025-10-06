"use client"
import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, LucideReceiptText, PiggyBank, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SideNav = () => {
  const path = usePathname();
  useEffect(() => {
    console.log(path)
  }, [path])
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budget'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: LucideReceiptText,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    }
  ]
  return (
    <div className='h-screen w-[10rem] bg-white p-2'>
      <Image src={'/logo.png'} width={100} height={100} alt='logo' />
      <div className=' h-full flex flex-col gap-5 mt-10 text-gray-500 '>
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div className={`flex gap-5 cursor-pointer  p-2 hover:text-[#389647] hover:bg-green-50 rounded-md ${path == menu.path && 'text-[#389647] bg-green-50'}`} >
              <h1><menu.icon className='' /></h1>
              <span>{menu.name}</span>
            </div>
          </Link>
        ))}
        <div className='mt-[20rem] flex gap-5 cursor-pointer  p-2 hover:text-[#389647] hover:bg-green-50 rounded-md '>
          <UserButton />
          <h1>Profile</h1>
        </div>
      </div>
    </div>
  )
}

export default SideNav