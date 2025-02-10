"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PhoneIcon, MailIcon, MapPinIcon, Loader2 } from "lucide-react"

// Dynamically import the MapContainer component to avoid SSR issues


export default function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ... existing form validation ...

      // Send email notification
      const emailResponse = await fetch("/api/contactEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "New Contact Form Submission",
          text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
          `,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          `,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email notification");
      }
      alert("Message sent successfully!");
      setName("")
      setEmail("")
      setMessage("")

      // ... existing success handling ...
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                <p>
                  Mahavir Education Trust&apos;s Chowk,
                  <br />
                  Waman Tukaram Patil Marg,
                  <br />
                  Next to Dukes Co., Chembur,
                  <br />
                  Mumbai - 400 088.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="text-primary h-5 w-5 flex-shrink-0" />
                <p>022-25580854</p>
              </div>
              <div className="flex items-center space-x-3">
                <MailIcon className="text-primary h-5 w-5 flex-shrink-0" />
                <p>prathistha@sakec.ac.in</p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-[100px]"
                />
                <Button onClick={handleSubmit} >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send message'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="lg:col-span-1 h-[400px] lg:h-auto rounded-lg overflow-hidden shadow-lg">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.346173299134!2d72.90900817563053!3d19.04851155283403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c5f39a7d77d1%3A0x9ebbdeaea9ec24ae!2sShah%20%26%20Anchor%20Kutchhi%20Engineering%20College!5e0!3m2!1sen!2sus!4v1738594041640!5m2!1sen!2sus" width="400" height="400" style={{ border: 0 }} loading="lazy" ></iframe>

          </div>
        </div>
      </div>
    </section>
  )
}

