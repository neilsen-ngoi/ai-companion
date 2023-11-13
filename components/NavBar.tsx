'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import { UserButton } from '@clerk/nextjs'

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
})

const NavBar = () => {
  return (
    <div
      className=" fixed w-full z-50 flex justify-between items-center py2 px-4 border-b
                  border-primary/10 bg-secondary"
    >
      <div className=" flex items-center">
        <Menu className=" block md:hidden" />
        <Link href="/">
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className=" flex items-center gap-x-3">
        <UserButton />
      </div>
    </div>
  )
}

export default NavBar
