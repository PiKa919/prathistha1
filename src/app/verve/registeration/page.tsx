"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { User, Mail, Phone, Hash, School, GitBranch, CreditCard, Camera, PartyPopper } from "lucide-react"
import { database } from "@/firebaseConfig"
import { ref, set } from "firebase/database"
import { VERVE_REGISTRATION_CONFIRMATION_TEMPLATE } from "@/utils/emailTemplates"
import axios from "axios"

interface IEvent {
  name: string;
  icon: string;
  type: "single" | "team";
  event: "aurum" | "verve";
  price: number;
  enabled: boolean;
}


const formSchema = z.object({
  event: z.string().min(1, "Please select an event"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string()
    .email("Invalid email address")
    .regex(/^[a-zA-Z0-9._%+-]+@sakec\.ac\.in$/, "Email must end with @sakec.ac.in"),
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, "Phone number must be 10 digits and start with 6-9"),
  prn: z.string().min(1, "PRN is required"),
  class: z.string().min(1, "Class is required"),
  branch: z.string().min(1, "Branch is required"),
  paymentReferenceId: z.string().min(1, "Payment reference ID is required"),
  paymentScreenshot: z.any().optional(),
})

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
] as const;

export default function RegistrationForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [enabledEvents, setEnabledEvents] = useState<IEvent[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event: "",
      fullName: "",
      email: "",
      phone: "",
      prn: "",
      class: "",
      branch: "",
      paymentReferenceId: "",
      paymentScreenshot: undefined,
    },
  })

  useEffect(() => {
    setIsMounted(true)
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      const filteredEvents = response.data.filter((event: IEvent) => event.event === "verve" && event.enabled);
      setEnabledEvents(filteredEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      if (!values.paymentScreenshot?.[0]) {
        throw new Error("Payment screenshot is required");
      }

      const file = values.paymentScreenshot[0];
      const reader = new FileReader();

      const base64Screenshot = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const registrationData = {
        event: values.event,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        prn: values.prn,
        class: values.class,
        branch: values.branch,
        payment: {
          referenceId: values.paymentReferenceId,
          timestamp: new Date().toISOString(),
          screenshot: base64Screenshot,
        },
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Save to Firebase
      const verveRef = ref(database, `verve/${Date.now()}`);
      await set(verveRef, registrationData);

      // Create email content
      const emailContent = VERVE_REGISTRATION_CONFIRMATION_TEMPLATE(
        registrationData.event,
        registrationData.fullName || '',
        registrationData.email,               // Added
        registrationData.phone,               // Added
        registrationData.payment.referenceId,
        registrationData.payment.timestamp,
        registrationData.createdAt,
        registrationData.prn,
        registrationData.class,               // Renamed to `className` if you changed it in the object
        registrationData.branch
      );
      

      // Send confirmation email
      const emailResponse = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: values.email, // Send email to the user's email
          subject: "VERVE Event Registration Confirmation",
          text: "Your registration has been confirmed for the event.",
          html: emailContent, // HTML formatted email content
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send confirmation email");
      }

      setShowSuccessModal(true);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      alert(error instanceof Error ? error.message : "An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null // or a loading spinner
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {enabledEvents.map((event) => (
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
            </div>

            {/* Other form fields remain unchanged */}

            <div className="space-y-4 p-4 bg-black/30 rounded-xl">
              <FormField
                control={form.control}
                name="fullName"
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
                name="email"
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
                name="phone"
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
                name="prn"
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
                name="class"
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
                name="branch"
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
                {/* <p className="text-center">{`Fees: Rs.${enabledEvents.find(e => e.name === form.getValues().event)?.price || 0}`}</p> */}
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

            {/* ... */}

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
                Your registration has been submitted successfully & A registration mail is sent to you. Thank you for participating!
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


