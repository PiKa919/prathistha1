'use client'

import { useState } from 'react'
// import { TECarousel, TECarouselItem } from "tw-elements-react";
// import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import  CarouselComponent  from '@/components/ui/CarouselComponent'
import SportsSchedule from '@/components/ui/SportsSchedule'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from "@/components/ui/scroll-area"
import { EnhancedTreeStyleBracket } from '@/components/ui/enhanced-tree-style-bracket'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"


const sports = {
  esports: [
    { name: 'BGMI', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 1000 - i * 10 })) },
    { name: 'FIFA', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 800 - i * 8 })) },
    { name: 'Valorant', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 1200 - i * 12 })) },
    { name: 'Rocket League', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 600 - i * 6 })) },
    { name: 'League of Legends', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 1500 - i * 15 })) },
  ],
  inter: [
    { name: 'Cricket', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `College ${String.fromCharCode(65 + i)}`, points: 500 - i * 5 })) },
    { name: 'Football', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `College ${String.fromCharCode(65 + i)}`, points: 300 - i * 3 })) },
    { name: 'Basketball', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `College ${String.fromCharCode(65 + i)}`, points: 400 - i * 4 })) },
    { name: 'Volleyball', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `College ${String.fromCharCode(65 + i)}`, points: 350 - i * 3.5 })) },
    { name: 'Table Tennis', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `College ${String.fromCharCode(65 + i)}`, points: 250 - i * 2.5 })) },
  ],
  intra: [
    { name: 'Baseball', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 200 - i * 2 })) },
    { name: 'Volleyball', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 250 - i * 2.5 })) },
    { name: 'Tennis', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 150 - i * 1.5 })) },
    { name: 'Badminton', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 180 - i * 1.8 })) },
    { name: 'Chess', leaderboard: Array.from({ length: 25 }, (_, i) => ({ rank: i + 1, team: `Team ${String.fromCharCode(65 + i)}`, points: 120 - i * 1.2 })) },
  ],
}
const branches = [
  { name: 'CSE', points: 1000 },
  { name: 'ECE', points: 950 },
  { name: 'ME', points: 900 },
  { name: 'CE', points: 850 },
  { name: 'EE', points: 800 },
  { name: 'CH', points: 750 },
  { name: 'BT', points: 700 },
]
// Validation schemas
const step1Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

const step2Schema = z.object({
  country: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
})

const step3Schema = z.object({
  website: z.string().optional(),
  about: z.string().optional(),
})

const formSchema = step1Schema.merge(step2Schema).merge(step3Schema)

type FormData = z.infer<typeof formSchema>

// Form Components
const Form1: React.FC<{ form: UseFormReturn<FormData> }> = ({ form }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="space-y-4">
      <CardTitle className="text-center font-normal">User Registration</CardTitle>
      
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email" {...field} />
            </FormControl>
            <FormDescription>We&apos;ll never share your email.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <div className="relative">
              <FormControl>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

const Form2: React.FC<{ form: UseFormReturn<FormData> }> = ({ form }) => {
  return (
    <div className="space-y-4">
      <CardTitle className="text-center font-normal">User Details</CardTitle>

      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country / Region</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="mx">Mexico</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="streetAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street address</FormLabel>
            <FormControl>
              <Input placeholder="Street address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>ZIP Code</FormLabel>
              <FormControl>
                <Input placeholder="ZIP Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

const Form3: React.FC<{ form: UseFormReturn<FormData> }> = ({ form }) => {
  return (
    <div className="space-y-4">
      <CardTitle className="text-center font-normal">Social Handles</CardTitle>

      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website</FormLabel>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                http://
              </span>
              <FormControl>
                <Input className="rounded-l-none" placeholder="www.example.com" {...field} />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="about"
        render={({ field }) => (
          <FormItem>
            <FormLabel>About</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brief description for your profile"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Brief description for your profile. URLs are hyperlinked.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default function MultistepFormPage(): JSX.Element {
  const { toast } = useToast()
  const [step, setStep] = useState<number>(1)
  const [progress, setProgress] = useState<number>(33.33)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      website: "",
      about: "",
    },
    mode: "onChange"
  })

  const validateStep = async () => {
    let isValid = false
    
    switch (step) {
      case 1:
        isValid = await form.trigger(['firstName', 'lastName', 'email', 'password'])
        break
      case 2:
        isValid = await form.trigger(['country', 'streetAddress', 'city', 'state', 'zipCode'])
        break
      case 3:
        isValid = await form.trigger(['website', 'about'])
        break
    }
    
    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateStep()
    
    if (isValid) {
      setStep(step + 1)
      setProgress(progress + 33.33)
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      })
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    setProgress(progress - 33.33)
  }

  const onSubmit = (data: FormData) => {
    toast({
      title: "Account created",
      description: "We've created your account for you.",
    })
    console.log(data)
  }
  const LeaderboardCard = ({ game, category }) => {
    const showBrackets = ['Cricket', 'Valorant', 'Football', 'Basketball', 'Volleyball', 'Table Tennis', 'Badminton', 'Chess', 'Baseball'].includes(game.name);

    return (
      <Card>
        <CardHeader>
          <CardTitle>{game.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {game.leaderboard.slice(0, 3).map((entry) => (
                <TableRow key={entry.rank}>
                  <TableCell>{entry.rank}</TableCell>
                  <TableCell>{entry.team}</TableCell>
                  <TableCell>{entry.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-2 mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1">View All Positions</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{game.name} - All Team Positions</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[50vh] mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {game.leaderboard.map((entry) => (
                        <TableRow key={entry.rank}>
                          <TableCell>{entry.rank}</TableCell>
                          <TableCell>{entry.team}</TableCell>
                          <TableCell>{entry.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            {showBrackets && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1">View Brackets</Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl">
                  <DialogHeader>
                    <DialogTitle>{game.name} - Tournament Brackets</DialogTitle>
                  </DialogHeader>
                  <EnhancedTreeStyleBracket />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const SportsCategorySection = ({ category, games }) => {
    const [showAll, setShowAll] = useState(false)
    const displayedGames = showAll ? games : games.slice(0, 3)

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedGames.map((game) => (
            <LeaderboardCard key={game.name} game={game} category={category} />
          ))}
        </div>
        {games.length > 3 && (
          <Button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 mx-auto block"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    )
  }
  return (
    // deep and dilip sports componenets
    <>
    {/* Carousel */}
    <CarouselComponent/>

    {/* leaderboard */}
    <Tabs defaultValue="esports" className="mt-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="esports">E-Sports</TabsTrigger>
          
          <TabsTrigger value="inter">Inter-College</TabsTrigger>
          <TabsTrigger value="intra">Intra-College</TabsTrigger>
        </TabsList>
        {Object.entries(sports).map(([category, games]) => (
          <TabsContent key={category} value={category}>
            <SportsCategorySection category={category} games={games} />
          </TabsContent>
        ))}
      </Tabs>

     {/* Schedule */}
     <SportsSchedule/>

     <Card className="mt-12">
        <CardHeader>
          <CardTitle>Branch Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches
                .sort((a, b) => b.points - a.points)
                .map((branch, index) => (
                  <TableRow key={branch.name}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.points}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
    
    // pika bhai form

    // <Card className="max-w-[800px] mx-auto my-4">
    //   <CardContent className="pt-6">
    //     <Progress value={progress} className="mb-6" />
        
    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    //         {step === 1 ? (
    //           <Form1 form={form} />
    //         ) : step === 2 ? (
    //           <Form2 form={form} />
    //         ) : (
    //           <Form3 form={form} />
    //         )}
            
    //         <div className="flex justify-between">
    //           <div className="flex gap-2">
    //             <Button
    //               type="button"
    //               onClick={handleBack}
    //               disabled={step === 1}
    //               variant="secondary"
    //             >
    //               Back
    //             </Button>
    //             <Button
    //               type="button"
    //               onClick={handleNext}
    //               disabled={step === 3}
    //             >
    //               Next
    //             </Button>
    //           </div>
              
    //           {step === 3 && (
    //             <Button type="submit" variant="destructive">
    //               Submit
    //             </Button>
    //           )}
    //         </div>
    //       </form>
    //     </Form>
    //   </CardContent>
    // </Card>
  )
}