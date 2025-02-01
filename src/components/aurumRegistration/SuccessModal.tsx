import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span>Registration Successful</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
            {"Your registration has been submitted successfully! We'll contact you soon with further details."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

