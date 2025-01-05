import { SponsorCard } from '@/components/sponsor-card'

interface SponsorGridProps {
  sponsors: Array<{
    name: string
    logo: string
    description: string
  }>
  colors: string[]
}

export function SponsorGrid({ sponsors, colors }: SponsorGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sponsors.map((sponsor, index) => (
        <SponsorCard key={index} sponsor={sponsor} color={colors[index % colors.length]} />
      ))}
    </div>
  )
}

