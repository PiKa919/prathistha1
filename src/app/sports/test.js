'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

export const TestComponent = () => {
  return (
    <div>
      <CardHeader title="Test" />
      <FormField />
      <FormMessage />
    </div>
  );
};
const Form1 = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-4">
      <CardTitle className="text-center font-normal">User Registration</CardTitle>
      
      <div className="flex gap-4">
        <FormItem className="flex-1">
          <FormLabel>First name</FormLabel>
          <FormControl>
            <Input placeholder="First name" />
          </FormControl>
        </FormItem>

        <FormItem className="flex-1">
          <FormLabel>Last name</FormLabel>
          <FormControl>
            <Input placeholder="Last name" />
          </FormControl>
        </FormItem>
      </div>

      <FormItem>
        <FormLabel>Email address</FormLabel>
        <FormControl>
          <Input type="email" />
        </FormControl>
        <FormDescription>
          We&apos;ll never share your email.
        </FormDescription>
      </FormItem>

      <FormItem>
        <FormLabel>Password</FormLabel>
        <div className="relative">
          <FormControl>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
            />
          </FormControl>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </div>
      </FormItem>
    </div>
  )
}

const Form2 = () => {
  return (
    <div className="space-y-4">
      <CardTitle className="text-center font-normal">User Details</CardTitle>

      <FormItem>
        <FormLabel>Country / Region</FormLabel>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="mx">Mexico</SelectItem>
          </SelectContent>
        </Select>
      </FormItem>

      <FormItem>
        <FormLabel>Street address</FormLabel>
        <FormControl>
          <Input placeholder="Street address" />
        </FormControl>
      </FormItem>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input placeholder="City" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>State / Province</FormLabel>
          <FormControl>
            <Input placeholder="State" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>ZIP / Postal</FormLabel>
          <FormControl>
            <Input placeholder="ZIP code" />
          </FormControl>
        </FormItem>
      </div>
    </div>
  )
}

const Form3 = () => {
  return (
    <div className="space-y-4">
      <CardTitle className="text-center font-normal">Social Handles</CardTitle>

      <FormItem>
        <FormLabel>Website</FormLabel>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            http://
          </span>
          <Input className="rounded-l-none" placeholder="www.example.com" />
        </div>
      </FormItem>

      <FormItem>
        <FormLabel>About</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Brief description for your profile"
            className="min-h-[100px]"
          />
        </FormControl>
        <FormDescription>
          Brief description for your profile. URLs are hyperlinked.
        </FormDescription>
      </FormItem>
    </div>
  )
}

export default function MultistepForm() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

  return (
    <Card className="max-w-[800px] mx-auto my-4">
      <CardContent className="pt-6">
        <Progress value={progress} className="mb-6" />
        
        <Form>
          {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
          
          <div className="flex justify-between mt-6">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 33.33)
                }}
                disabled={step === 1}
                variant="secondary"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  setStep(step + 1)
                  setProgress(progress + 33.33)
                }}
                disabled={step === 3}
              >
                Next
              </Button>
            </div>
            
            {step === 3 && (
              <Button
                variant="destructive"
                onClick={() => {
                  toast({
                    title: "Account created",
                    description: "We've created your account for you.",
                  })
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}