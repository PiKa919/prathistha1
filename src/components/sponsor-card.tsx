import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface SponsorCardProps {
  sponsor: {
    name: string
    logo: string
    description: string
  }
  color: string
}

export function SponsorCard({ sponsor, color }: SponsorCardProps) {
  return (
    <Card className={`h-full ${color}`}>
      <CardContent className="flex flex-col items-center p-6 space-y-4">
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          width={150}
          height={75}
          className="object-contain bg-white p-2 rounded"
        />
        <h3 className="text-lg font-semibold text-black">{sponsor.name}</h3>
        <p className="text-center text-sm text-black">{sponsor.description}</p>
      </CardContent>
    </Card>
  )
}

