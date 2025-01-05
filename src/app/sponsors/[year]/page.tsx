import { TitleSponsor } from '@/components/title-sponsor'
import { SponsorGrid } from '@/components/sponsor-grid'
import { sponsorsData } from '@/lib/sponsordata'
import { getYearColors } from '@/lib/colors'

export default function SponsorsPage({ params }: { params: { year: string } }) {
  const { year } = params
  const { titleSponsor, sponsors } = (sponsorsData[year as keyof typeof sponsorsData]) || sponsorsData['2024']
  const colors = getYearColors(year || '2024') // Ensure default year is used for colors

  return (
    <div className={`space-y-12 ${colors.background} min-h-screen -mt-8 -mx-4 p-8`}>
      <h1 className={`text-4xl font-bold text-center mb-8 ${colors.text}`}>Sponsors {year}</h1>
      <TitleSponsor sponsor={titleSponsor} colors={{ primary: colors.primary, secondary: colors.secondary }} />
      <SponsorGrid sponsors={sponsors} colors={colors.sponsorColors} />
    </div>
  )
}

