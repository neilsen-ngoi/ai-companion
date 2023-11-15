'use client'

import { Companion, Message } from '@prisma/client'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[]
    _count: {
      messages: number
    }
  }
}
const ChatHeader = ({ companion }: ChatHeaderProps) => {
  const router = useRouter()
  return (
    <div className=" border-b flex w-full justify-between items-center border-primary/10 pb-4">
      <div className=" flex gap-x-2 items-center">
        <Button size="icon" variant="ghost" onClick={() => router.back()}>
          <ChevronLeft className=" h-8 w-8" />
        </Button>
      </div>
    </div>
  )
}

export default ChatHeader
