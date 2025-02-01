
// import { Events } from '@/components/Events'
import  Events  from '@/components/verve-event'
// import { Hackathon } from '@/components/Hackathon'
import '../globals.css'

export default function VervePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      
      <main className="space-y-12 py-12">
        
        <Events />
      </main>
    </div>
  )
}

