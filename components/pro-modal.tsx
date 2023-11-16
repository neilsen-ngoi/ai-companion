'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'

export const ProModal = () => {
  const proModal = useProModal()
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className=" space-y-4">
          <DialogTitle className=" text-center">Upgrade to PRO</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
