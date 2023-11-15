'use client'

import { Companion } from '@prisma/client'
import ChatMessage from './ChatMessage'

interface ChatMessagesProps {
  messages: any[]
  isLoading: boolean
  companion: Companion
}

const ChatMessages = ({
  messages,
  isLoading,
  companion,
}: ChatMessagesProps) => {
  return (
    <div className=" flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={isLoading}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
        src={companion.src}
      />
    </div>
  )
}

export default ChatMessages
