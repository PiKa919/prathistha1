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
import { User, Mail, Phone, Hash, School, GitBranch, Crown, CreditCard, Camera, PartyPopper, Loader2 } from "lucide-react"
import { database } from "@/firebaseConfig"
import { ref, set } from "firebase/database"
import axios from "axios"

interface IEvent {
  name: string
  icon: string
  type: "single" | "team"
  event: "verve"
  price: string
  enabled: boolean
}

const BRANCHES = [
  { value: "CM", label: "Computer Engineering" },
  { value: "IT", label: "Information Technology" },
  { value: "ECS", label: "Electronics & Computer Science" },
  { value: "AIDS", label: "AI & Data Science" },
  { value: "EXTC", label: "Electronics & Telecommunication" },
  { value: "ACT", label: "Advanced Telecommunication" },
  { value: "VLSI", label: "VLSI Design" },
  { value: "CYSE", label: "Cybersecurity" },
] as const;

const CLASSES = [
  { value: "FE", label: "First Year" },
  { value: "SE", label: "Second Year" },
  { value: "TE", label: "Third Year" },
  { value: "BE", label: "Fourth Year" },
] as const

const memberSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .regex(/^[a-zA-Z0-9._%+-]+@sakec\.ac\.in$/, "Email must end with @sakec.ac.in"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Phone number must be 10 digits and start with 6-9"),
  prn: z.string().min(1, "PRN is required"),
  class: z.string().min(1, "Class is required"),
  branch: z.string().min(1, "Branch is required"),
  isTeamLeader: z.boolean().optional(),
})

const formSchema = z.object({
  event: z.string().min(1, "Please select an event"),
  teamSize: z.number().min(1).max(5),
  members: z.array(memberSchema).min(1, "At least one member is required"),
  paymentReferenceId: z.string().min(1, "Payment reference ID is required"),
  paymentScreenshot: z.any().refine((files) => files?.length > 0, "Payment screenshot is required"),
})

export default function VervePage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [enabledEvents, setEnabledEvents] = useState<IEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)
  const [teamSize, setTeamSize] = useState(1)
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event: "",
      teamSize: 1,
      members: [{ fullName: "", email: "", phone: "", prn: "", class: "", branch: "", isTeamLeader: false }],
      paymentReferenceId: "",
      paymentScreenshot: undefined,
    },
  })

  useEffect(() => {
    setIsMounted(true)
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/events");
      const filteredEvents = response.data.filter((event: IEvent) => event.event === "verve" && event.enabled);
      setEnabledEvents(filteredEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)

      // Basic validation
      if (!values.event) {
        throw new Error("Please select an event")
      }

      if (!values.members?.[0]?.fullName) {
        throw new Error("Member details are required")
      }

      if (!values.paymentReferenceId) {
        throw new Error("Payment reference ID is required")
      }

      if (!values.paymentScreenshot?.[0]) {
        throw new Error("Payment screenshot is required")
      }

      const file = values.paymentScreenshot[0]
      const reader = new FileReader()

      const base64Screenshot = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const registrationData = {
        id: Date.now().toString(),
        event: values.event,
        teamSize: values.teamSize || 1,
        members: values.members.map(member => ({
          ...member,
          isTeamLeader: member.isTeamLeader || false
        })),
        payment: {
          referenceId: values.paymentReferenceId,
          timestamp: new Date().toISOString(),
          screenshot: base64Screenshot,
        },
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      // Save to Firebase
      const verveRef = ref(database, `verve/${registrationData.id}`)
      await set(verveRef, registrationData)

      setShowSuccessModal(true)
      form.reset()
      setIsSubmitting(false)
    } catch (error) {
      console.error("Form submission error:", error)
      alert(error instanceof Error ? error.message : "An error occurred during submission")
      setIsSubmitting(false)
    }
  }

  const handleEventChange = (eventName: string) => {
    const event = enabledEvents.find((e) => e.name === eventName)
    setSelectedEvent(event || null)

    // Special handling for different events
    if (event?.name === "Pratishtha's Got Talent") {
      setTeamSize(1)
      form.setValue("teamSize", 1)
    } else if (event?.name === "IPL Auctions") {
      setTeamSize(4)
      form.setValue("teamSize", 4)
    } else if (event?.name === "FIFA") {
      setTeamSize(1)
      form.setValue("teamSize", 1)
    } else if (event?.type === "single") {
      setTeamSize(1)
      form.setValue("teamSize", 1)
    } else {
      setTeamSize(2)
      form.setValue("teamSize", 2)
    }
  }

  if (!isMounted) {
    return null;
  }

  // Add this check after isMounted
  if (!isLoading && enabledEvents.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center py-16 px-4">
        <div className="text-center space-y-4 bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">VERVE Event Registration</h1>
          <div className="text-6xl mb-6">🎭</div>
          <p className="text-xl text-gray-300">
            Registration forms will be opened soon. Please check back later!
          </p>
          <p className="text-gray-400">
            Stay tuned for exciting events and competitions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col lg:flex-row py-16 px-4">
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-3xl mb-6 text-center lg:text-left">VERVE Event Registration</h1>
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
                        field.onChange(value);
                        handleEventChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isLoading ? "Loading events..." : "Select an event"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="ml-2">Loading events...</span>
                          </div>
                        ) : enabledEvents.length > 0 ? (
                          enabledEvents.map((event) => (
                            <SelectItem key={event.name} value={event.name}>
                              <span className="mr-2">{event.icon}</span>
                              {event.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="">
                            No events available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {(selectedEvent?.type === "team" || selectedEvent?.name === "Pratishtha's Got Talent") && (
              <div className="space-y-4 p-4 bg-black/30 rounded-xl">
                <FormField
                  control={form.control}
                  name="teamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <User className="inline mr-2" />
                        {selectedEvent?.name === "Pratishtha's Got Talent" ? "Select Mode" : "Number of Team Members"}
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const size = Number.parseInt(value)
                          field.onChange(size)
                          setTeamSize(size)
                          // Update the members array
                          const currentMembers = form.getValues("members")
                          if (size > currentMembers.length) {
                            form.setValue("members", [
                              ...currentMembers,
                              ...Array(size - currentMembers.length).fill({}),
                            ])
                          } else if (size < currentMembers.length) {
                            form.setValue("members", currentMembers.slice(0, size))
                          }
                        }}
                        disabled={selectedEvent?.name === "IPL Auctions"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={
                              selectedEvent?.name === "Pratishtha's Got Talent"
                                ? "Select single or team mode"
                                : selectedEvent?.name === "IPL Auctions"
                                  ? "Team of 4 only"
                                  : selectedEvent?.name === "FIFA"
                                    ? "Select 1 or 2 players"
                                    : "Select team size"
                            } />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedEvent?.name === "IPL Auctions" ? (
                            <SelectItem value="4">4 Players Team</SelectItem>
                          ) : selectedEvent?.name === "FIFA" ? (
                            <>
                              <SelectItem value="1">Single Player</SelectItem>
                              <SelectItem value="2">2 Players Team</SelectItem>
                            </>
                          ) : selectedEvent?.name === "Pratishtha's Got Talent" ? (
                            <>
                              <SelectItem value="1">Single Player</SelectItem>
                              {[2, 3, 4, 5].map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                  {size} Players Team
                                </SelectItem>
                              ))}
                            </>
                          ) : (
                            [2, 3, 4, 5].map((size) => (
                              <SelectItem key={size} value={size.toString()}>
                                {size}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {selectedEvent?.name === "IPL Auctions" && (
                        <FormDescription>IPL Auctions require exactly 4 players per team.</FormDescription>
                      )}
                      {selectedEvent?.name === "FIFA" && (
                        <FormDescription>FIFA registrations can be single player or 2 players team.</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

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
                        <FormDescription>Enter your full name as per college records</FormDescription>
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
                        <FormDescription>Use your college email id ending with sakec.ac.in</FormDescription>
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
                        <FormDescription>Enter 10-digit mobile number without country code</FormDescription>
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
                        <FormDescription>FEs enter PRN124BTCM1071, rest enter 14 digit PRN</FormDescription>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CLASSES.map((classOption) => (
                              <SelectItem key={classOption.value} value={classOption.value}>
                                {classOption.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Select your current year and division</FormDescription>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your branch" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BRANCHES.map((branch) => (
                              <SelectItem key={branch.value} value={branch.value}>
                                {branch.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Select your engineering branch</FormDescription>
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
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked)
                              // Uncheck other team leaders
                              const updatedMembers = form.getValues("members").map((member, i) => ({
                                ...member,
                                isTeamLeader: i === index ? checked === true : false,
                              }))
                              form.setValue("members", updatedMembers)
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            <Crown className="inline mr-2" /> Team Leader
                          </FormLabel>
                          <FormDescription>Only one team leader can be selected.</FormDescription>
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
                <p className="text-center">{`Fees: Rs.${selectedEvent?.price || 0}`}</p>
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
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⌛</span>
                    Submitting...
                  </span>
                ) : (
                  "Submit Registration"
                )}
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
                Your registration has been submitted successfully & A confirmation mail is sent you. Thank you for participating!
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

