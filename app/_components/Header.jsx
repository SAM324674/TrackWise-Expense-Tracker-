"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {UserButton, useUser} from '@clerk/nextjs';
import React from 'react'
import Link from 'next/link';

function Header() {

    const {user, isSignedIn}=useUser();
  return (
    <div className='p-4 flex justify-between items-center border shadow-md'>
        <Image src={'/logo.png'} alt='logo' width={100} height={100}/>
       
        {isSignedIn?<UserButton/>
        :
        <Link href={'/sign-in'}>
            <Button>Get Started</Button>
        </Link>
        }
    </div>
  )
}

export default Header