import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import type React from "react"
import { QrCode, Upload } from "lucide-react"

export default function Payment({
  paymentScreenshot,
  setPaymentScreenshot,
}: {
  paymentScreenshot: File | null
  setPaymentScreenshot: (file: File | null) => void
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPaymentScreenshot(event.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold flex items-center space-x-2">
        <QrCode className="w-5 h-5" />
        <span>Payment</span>
      </h2>
      <div className="space-y-4">
        <div className="flex justify-center">
          <Image src="/placeholder.svg?height=200&width=200" alt="Payment QR Code" width={200} height={200} />
        </div>
        <p className="text-center">UPI ID: example@upi</p>
        <div className="space-y-2">
          <Label htmlFor="payment-screenshot" className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload Payment Screenshot</span>
          </Label>
          <Input id="payment-screenshot" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {paymentScreenshot && (
          <p className="text-sm text-green-600 flex items-center space-x-2">
            <span>✅</span>
            <span>File uploaded: {paymentScreenshot.name}</span>
          </p>
        )}
      </div>
    </div>
  )
}

