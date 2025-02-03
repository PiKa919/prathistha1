"use client"

import { useState, useEffect } from "react"
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
import { database } from "@/firebaseConfig"
import { ref, set } from "firebase/database"

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: [{}],
      event: "",
      teamSize: 1,
      paymentReferenceId: "",
      paymentScreenshot: undefined,
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)
      console.log("Starting submission...", data);

      // Test database connection first
      // const testRef = ref(database, '.info/connected');
      // const connectedRef = await get(testRef);
      // if (!connectedRef.val()) {
      //   throw new Error('No database connection');
      // }

      // Create the registration data
      const registrationData = {
        event: data.event,
        teamSize: data.teamSize || 1,
        members: data.members.map(member => ({
          ...member,
          isTeamLeader: member.isTeamLeader || false
        })),
        payment: {
          referenceId: data.paymentReferenceId,
          timestamp: new Date().toISOString(),
          screenshot: ""
        },
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Handle the screenshot separately
      if (data.paymentScreenshot?.[0]) {
        const file = data.paymentScreenshot[0];
        const reader = new FileReader();
        
        const base64Screenshot = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        registrationData.payment.screenshot = base64Screenshot as string;
      }

      // Try to save to a specific path
      const aurumRef = ref(database, `aurum/${Date.now()}`);
      await set(aurumRef, registrationData);

      console.log("Registration successful!");
      setShowSuccessModal(true);
      form.reset();
    } catch (error) {
      console.error("Registration failed:", error);
      let errorMessage = 'Registration failed: ';
      
      if (error instanceof Error) {
        if (error.message.includes('PERMISSION_DENIED')) {
          errorMessage += 'Access denied. Please try again later.';
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage += 'Unknown error occurred';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (!isMounted) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col lg:flex-row py-16 px-4">
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-3xl mb-6 text-center lg:text-left">AURUM Event Registration</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl border border-white/20"
          >
            <div className="space-y-4 p-4 bg-black/30 rounded-xl">
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
              <div key={index} className="space-y-4 p-4 bg-black/30 rounded-xl">
                <h3 className="text-xl mb-4">
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

            <div className="space-y-4 p-4 bg-black/30 rounded-xl">
              <h3 className="text-xl mb-4">
                <CreditCard className="inline mr-2" /> Payment
              </h3>
              <div className="flex flex-col items-center gap-4 mb-6">
                <Image 
                  src="/payment/qr-code.webp" 
                  alt="Payment QR Code" 
                  width={200} 
                  height={200}
                  className="w-48 h-48 md:w-52 md:h-52" 
                />
                <p className="text-center">UPI ID: example@upi</p>
              </div>
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
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>
                      <Camera className="inline mr-2" /> Payment Screenshot
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const files = e.target.files
                          if (files?.length) {
                            onChange(files)
                          }
                        }}
                        {...field}
                        value={value?.fileName}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center mt-6">
              <Button
                type="submit"  // Changed from "button" to "submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </Form>

        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PartyPopper /> Registration Successful!
              </DialogTitle>
              <DialogDescription>
                Your registration has been submitted successfully. Thank you for participating!
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

