import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface TitleSponsorProps {
  sponsor: {
    name: string
    logo: string
    description: string
  }
  colors: {
    primary: string
    secondary: string
  }
}

export function TitleSponsor({ sponsor, colors }: TitleSponsorProps) {
  return (
    <Card className={`w-full max-w-2xl mx-auto ${colors.primary}`}>
      <CardContent className="flex flex-col items-center p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-black">Title Sponsor</h2>
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          width={200}
          height={100}
          className="object-contain bg-white p-2 rounded"
        />
        <h3 className="text-xl font-bold text-black">{sponsor.name}</h3>
        <p className="text-center text-black">{sponsor.description}</p>
      </CardContent>
    </Card>
  )
}

