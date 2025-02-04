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
import { REGISTRATION_CONFIRMATION_TEMPLATE } from "@/utils/emailTemplates"

type Event = {
  name: string
  icon: string
  type: "single"
}

const events: Event[] = [
  { name: "ABCD: Anybody Can Dance", icon: "💃", type: "single" },
]

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event: "ABCD: Anybody Can Dance", // Set default event
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
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      console.log("Form values:", values); // Debug log

      if (!values.paymentScreenshot?.[0]) {
        throw new Error("Payment screenshot is required");
      }

      // Create the registration data
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
          screenshot: "",
        },
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Handle the screenshot separately
      if (values.paymentScreenshot?.[0]) {
        const file = values.paymentScreenshot[0];
        const reader = new FileReader();

        const base64Screenshot = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        registrationData.payment.screenshot = base64Screenshot as string;
      }

      // Save to Firebase - Changed from aurum to verve
      const verveRef = ref(database, `verve/${Date.now()}`);
      await set(verveRef, registrationData);

      console.log("Registration successful!");

      // Generate the email content using the template
      const emailContent = REGISTRATION_CONFIRMATION_TEMPLATE(
        values.event,
        1,
        values.paymentReferenceId,
        [{ ...values, isTeamLeader: true }],
      );

      // Send confirmation email
      const emailResponse = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: values.email,
          subject: "VERVE Event Registration Confirmation", // Updated email subject
          text: `Dear ${values.fullName},\n\nThank you for registering for the ${values.event} event. Your registration has been successfully submitted.\n\nBest regards,\nVERVE Event Team`,
          html: emailContent,
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

              <div className="mt-4 p-4 bg-black/20 rounded-lg text-sm space-y-2">
                <div className="flex justify-center mb-4">
                  <Image 
                    src="/verve/ABCD/ABCD.webp" 
                    alt="Event Image" 
                    width={300} 
                    height={300} 
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-center font-bold text-xl mb-4">🌟 PRATISHTHA 2025🌟</h2>
                <p className="text-center">Shah and Anchor Kutchhi Engineering College&apos;s Annual Cultural Symposium</p>
                
                <p className="text-center font-semibold mt-4">🎭 VERVE🎬 presents</p>
                
                <p className="text-center font-bold text-lg">💃 ABCD: Any Body Can Dance💃</p>
                <p className="text-center italic">An electrifying intra-college solo dance competition!</p>
                
                <div className="space-y-1 mt-4">
                  <p>🔥 Showcase your best moves</p>
                  <p>🔥 Experience a dazzling mix of dance styles</p>
                  <p>🔥 Win exciting prizes</p>
                  <p>🔥 Own the stage and make it your moment!</p>
                </div>
                
                <div className="mt-4 space-y-1">
                  <p>📅 Date: 8th February 2025</p>
                  <p>⏰ Time: 2:00 PM – 5:00 PM</p>
                  <p>📍 Venue: 7th Floor Auditorium</p>
                </div>
                
                <p className="text-center font-bold mt-4">It&apos;s time to set the stage on fire! Don&apos;t miss out!</p>
                
                <div className="mt-4">
                  <p className="font-semibold">For more information contact:</p>
                  <p>Vedika Katarkar - 9324694492</p>
                  <p>Shivam Shinde - 79775 35959</p>
                </div>
              </div>
            </div>

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
                <p className="text-center">Fees: Rs. 100</p>
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
                disabled={isSubmitting || !form.formState.isValid}
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

