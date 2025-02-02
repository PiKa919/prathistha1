"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { User, Mail, Phone, Hash, School, GitBranch, Crown, CreditCard, Camera, PartyPopper } from "lucide-react"

type Event = {
  name: string
  icon: string
  type: "single" | "team"
}

const events: Event[] = [
  { name: "Crime Scene Investigation", icon: "🕵️", type: "team" },
  { name: "Escape Room", icon: "🚪", type: "team" },
  { name: "AR Treasure Hunt", icon: "🗺️", type: "team" },
  { name: "Giant Jenga", icon: "🧱", type: "single" },
  { name: "Glow-in-the-Dark Pickleball", icon: "🏓", type: "single" },
  { name: "Laser Maze", icon: "🔦", type: "single" },
  { name: "BGMI Tournament", icon: "📱", type: "team" },
  { name: "Valorant Championship", icon: "🎮", type: "team" },
  { name: "Robo Sumo", icon: "🤖", type: "team" },
  { name: "Robo Race", icon: "🏎️", type: "team" },
  { name: "Cozmo Clench", icon: "🦾", type: "single" },
  { name: "Technokagaz", icon: "📄", type: "single" },
  { name: "Tech Expo", icon: "🔬", type: "single" },
  { name: "Code of Duty", icon: "💻", type: "single" },
  { name: "Cybersecurity Challenge", icon: "🔒", type: "single" },
  { name: "FIFA Tournament", icon: "⚽", type: "single" },
  { name: "VR Room", icon: "🥽", type: "single" },
  { name: "Mortal Kombat Tournament", icon: "🥋", type: "single" },
  { name: "Midtown Madness", icon: "🏙️", type: "team" },
]

const memberSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  prn: z.string().min(1, "PRN is required"),
  class: z.string().min(1, "Class is required"),
  branch: z.string().min(1, "Branch is required"),
  isTeamLeader: z.boolean().optional(),
})

const formSchema = z.object({
  event: z.string().min(1, "Please select an event"),
  teamSize: z.number().min(1).max(10).optional(),
  members: z.array(memberSchema).min(1, "At least one member is required"),
  paymentReferenceId: z.string().min(1, "Payment reference ID is required"),
  paymentScreenshot: z.any().refine((file) => file?.length > 0, "Payment screenshot is required"),
})

export default function RegistrationForm() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [teamSize, setTeamSize] = useState(1)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: [{}],
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    setShowSuccessModal(true)
  }

  const handleEventChange = (eventName: string) => {
    const event = events.find((e) => e.name === eventName)
    setSelectedEvent(event || null)
    if (event?.type === "single") {
      setTeamSize(1)
      form.setValue("teamSize", 1)
    } else {
      form.setValue("teamSize", undefined)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col lg:flex-row pt-24">
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className=" text-3xl font-bold mb-4">Event Registration</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 md:space-y-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-8 shadow-2xl border border-white/20"
          >
            <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-black/30 rounded-xl">
              <FormField
                control={form.control}
                name="event"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <User className="inline mr-2" /> Event
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleEventChange(value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {events.map((event) => (
                          <SelectItem key={event.name} value={event.name}>
                            <span className="mr-2">{event.icon}</span>
                            {event.name}
                            <span className="ml-2 text-muted-foreground text-sm">({event.type})</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedEvent?.type === "team" && (
                <FormField
                  control={form.control}
                  name="teamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <User className="inline mr-2" /> Number of Team Members
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number.parseInt(value))
                          setTeamSize(Number.parseInt(value))
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[2, 3, 4, 5].map((size) => (
                            <SelectItem key={size} value={size.toString()}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {Array.from({ length: teamSize }).map((_, index) => (
              <div key={index} className="space-y-4 md:space-y-6 p-4 md:p-6 bg-black/30 rounded-xl">
                <h3 className="text-xl font-semibold">
                  <User className="inline mr-2" /> Personal Details - Member {index + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`members.${index}.fullName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <User className="inline mr-2" /> Full Name
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`members.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Mail className="inline mr-2" /> Email
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`members.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Phone className="inline mr-2" /> Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`members.${index}.prn`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Hash className="inline mr-2" /> PRN
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`members.${index}.class`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <School className="inline mr-2" /> Class
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`members.${index}.branch`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <GitBranch className="inline mr-2" /> Branch
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {selectedEvent?.type === "team" && (
                  <FormField
                    control={form.control}
                    name={`members.${index}.isTeamLeader`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <Crown className="inline mr-2" /> Team Leader
                          </FormLabel>
                          <FormDescription>Is this member the team leader?</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            ))}

            <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-black/30 rounded-xl">
              <h3 className="text-xl font-semibold">
                <CreditCard className="inline mr-2" /> Payment
              </h3>
              <div className="flex justify-center mb-4">
                <Image src="/placeholder.svg" alt="Payment QR Code" width={200} height={200} />
              </div>
              <p className="text-center mb-4">UPI ID: example@upi</p>
              <FormField
                control={form.control}
                name="paymentReferenceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Hash className="inline mr-2" /> Payment Reference ID
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentScreenshot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Camera className="inline mr-2" /> Payment Screenshot
                    </FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="button"
              onClick={() => {
                form.handleSubmit((data) => {
                  console.log(data)
                  setShowSuccessModal(true)
                })()
                if (!form.formState.isValid) {
                  setShowSuccessModal(true)
                }
              }}
            >
              Submit Registration
            </Button>
          </form>
        </Form>

        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <PartyPopper className="inline mr-2" /> Registration Successful!
              </DialogTitle>
              <DialogDescription>
                Your registration has been submitted successfully. Thank you for participating!
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

