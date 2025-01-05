export function getYearColors(year: string) {
    if (year === '2023') {
      // Bollywood theme - subtle warm tones
      return {
        background: 'bg-gradient-to-br from-orange-50 to-orange-100',
        primary: 'bg-orange-200',
        secondary: 'bg-orange-300',
        text: 'text-orange-800',
        textHover: 'text-orange-600',
        sponsorColors: ['bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600']
      }
    } else if (year === '2024') {
      // Seasons theme - subtle nature tones
      return {
        background: 'bg-gradient-to-br from-green-50 to-green-100',
        primary: 'bg-green-200',
        secondary: 'bg-green-300',
        text: 'text-green-800',
        textHover: 'text-green-600',
        sponsorColors: ['bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500']
      }
    } else if (year === '2025') {
      // Mumbai theme - subtle ocean tones
      return {
        background: 'bg-gradient-to-br from-blue-50 to-blue-100',
        primary: 'bg-blue-200',
        secondary: 'bg-blue-300',
        text: 'text-blue-800',
        textHover: 'text-blue-600',
        sponsorColors: ['bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500']
      }
    } else {
      // Default theme - subtle gray tones
      return {
        background: 'bg-gradient-to-br from-gray-50 to-gray-100',
        primary: 'bg-gray-200',
        secondary: 'bg-gray-300',
        text: 'text-gray-800',
        textHover: 'text-gray-600',
        sponsorColors: ['bg-gray-200', 'bg-gray-300', 'bg-gray-400', 'bg-gray-500']
      }
    }
  }

