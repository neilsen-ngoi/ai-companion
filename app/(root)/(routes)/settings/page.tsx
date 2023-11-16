import SubscriptionButton from '@/components/SubscriptionButton'
import { checkSubscription } from '@/lib/subscription'

const SettingsPage = async () => {
  const isPro = await checkSubscription()
  return (
    <div className=" h-full p-4 space-y-2">
      <h3 className=" text-lg font-medium">Settings</h3>
      <div className=" text-muted-foreground text-sm">
        {isPro ? 'Well done you are rich' : 'Sadly you are poor'}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  )
}

export default SettingsPage
