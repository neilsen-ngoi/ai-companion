import { Menu } from 'lucide-react'
import SideBar from './Sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const MobileSidebar = ({ isPro }: { isPro: boolean }) => {
  return (
    <Sheet>
      <SheetTrigger className=" md:hidden pr-4">
        <Menu />
      </SheetTrigger>
      <SheetContent className=" p0 bg-secondary pt-10 w-32" side="left">
        <SideBar isPro={isPro} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
