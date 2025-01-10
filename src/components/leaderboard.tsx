"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { database } from "@/firebaseConfig"
import { ref, onValue } from "firebase/database"

// First, define interfaces
interface CCEntry {
  rank: number;
  clId: string;
  name: string;
  ccPoints: number;
  ccName: string;
  ccNumber: string;
}

interface PREntry {
  rank: number;
  clId: string;
  name: string;
  prPoints: number;
  ccName: string;
  ccNumber: string;
}

interface ParticipantData {
  name: string;
  ccName: string;
  ccNumber: string;
  ccPoints: number;
  prPoints: number;
}

// Update the component
export function Leaderboard() {
  const [prLeaderboard, setPRLeaderboard] = useState<PREntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rsvpsRef = ref(database, 'rsvps');
    
    const unsubscribe = onValue(rsvpsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const participants = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as ParticipantData)
        }));

        // Sort PR Points
        const prSorted = [...participants]
          .sort((a, b) => (b.prPoints || 0) - (a.prPoints || 0))
          .map((p, index) => ({
            rank: index + 1,
            clId: p.id,
            name: p.name,
            prPoints: p.prPoints || 0,
            ccName: p.ccName || '',
            ccNumber: p.ccNumber || ''
          }));

        setPRLeaderboard(prSorted);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-500/20 to-transparent"
      case 2: return "bg-gradient-to-r from-gray-500/20 to-transparent"
      case 3: return "bg-gradient-to-r from-yellow-600/20 to-transparent"
      default: return ""
    }
  }

  if (loading) {
    return <div className="text-center p-4">Loading leaderboard...</div>;
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
        
        <div className="rounded-lg border border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="sticky top-0 z-10 p-4 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-green-400">PR Points</h3>
          </div>
          <div className="overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-black/50 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>CC Name</TableHead>
                  <TableHead>CC Number</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="wait">
                  {prLeaderboard.map((entry) => (
                    <motion.tr
                      key={entry.clId}
                      className={cn(getRankColor(entry.rank), "transition-colors")}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell className="font-medium">{entry.rank}</TableCell>
                      <TableCell>{entry.ccName}</TableCell>
                      <TableCell>{entry.ccNumber}</TableCell>
                      <TableCell className="text-right font-bold text-green-400">{entry.prPoints}</TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}
