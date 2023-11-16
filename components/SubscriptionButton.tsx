'use client'

import { Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { useToast } from './ui/use-toast'
import axios from 'axios'

interface SubscriptionButtonProps {
  isPro: boolean
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const onClick = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'something is wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      variant={isPro ? 'default' : 'premium'}
    >
      {isPro ? 'Manage Subscription' : 'upgrade'}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white " />}
    </Button>
  )
}
export default SubscriptionButton
