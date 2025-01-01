"use client"

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { firestore } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function RSVPModal() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
          const rsvpCollection = collection(firestore, "rsvps");
          const rsvpData = { email: "example@example.com", timestamp: new Date().toISOString() };
          await addDoc(rsvpCollection, rsvpData);
          console.log("RSVP submitted successfully:", rsvpData);
            setSubmitted(true);
            setEmail("");

            setTimeout(() => {
                setOpen(false);
                setSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error("Error submitting RSVP:", error);
            setError("Failed to submit RSVP. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#CBA35C] text-[#754E1A] hover:bg-[#F8E1B7] rounded-full scale-125">
                    RSVP Now
                </Button>
            </DialogTrigger>
            <DialogContent 
                className="sm:max-w-[50%] bg-[#F8E1B7]"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#754E1A]">RSVP for the Event</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {submitted ? (
                        <div className="text-center text-[#754E1A] font-semibold">
                            Thank you for your RSVP! We look forward to seeing you at the event.
                        </div>
                    ) : (
                        <>
                            <div className="relative w-full h-64">
                                <Image src="/clmeet/rude.webp" alt="Event location" layout="fill" objectFit="cover" className="rounded-md" />
                            </div>
                            <div className="text-[#754E1A] font-semibold">Rude Lounge</div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#754E1A]">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-[#B6CBBD] text-[#754E1A] placeholder-[#754E1A] border-[#CBA35C]"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                {error && (
                                    <div className="text-red-600 text-sm">{error}</div>
                                )}
                                <Button type="submit" className="w-full bg-[#CBA35C] text-[#754E1A] hover:bg-[#F8E1B7]" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit RSVP"}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
