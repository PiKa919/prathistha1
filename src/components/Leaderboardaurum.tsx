import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Participant = {
  rank: number;
  name: string;
  score: number;
};

const topThree: Participant[] = [
  { rank: 1, name: "Eiden", score: 2430 },
  { rank: 2, name: "Jackson", score: 1847 },
  { rank: 3, name: "Emma Aria", score: 1674 },
];

const otherParticipants: Participant[] = [
  { rank: 4, name: "Sebastian", score: 1124 },
  { rank: 5, name: "Jason", score: 875 },
  { rank: 6, name: "Natalie", score: 774 },
  { rank: 7, name: "Serenity", score: 723 },
  { rank: 8, name: "Hannah", score: 559 },
];

const Medal = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold">
        🥇
      </div>
    );
  } else if (rank === 2) {
    return (
      <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-xl font-bold">
        🥈
      </div>
    );
  } else if (rank === 3) {
    return (
      <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-xl font-bold">
        🥉
      </div>
    );
  }
  return null;
};

export function Leaderboard() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Leaderboard
      </h2>

      {/* Top Three Section */}
      <div className="flex justify-center items-end space-x-4 mb-10">
        {/* Second Place */}
        <div className="flex flex-col items-center w-32">
          <Medal rank={2} />
          <div className="mt-2 text-gray-300 text-lg">Jackson</div>
          <div className="text-gray-400">{topThree[1].score} points</div>
        </div>

        {/* First Place */}
        <div className="flex flex-col items-center w-40">
          <Medal rank={1} />
          <div className="mt-2 text-gray-100 text-xl font-bold">Eiden</div>
          <div className="text-gray-300">{topThree[0].score} points</div>
        </div>

        {/* Third Place */}
        <div className="flex flex-col items-center w-32">
          <Medal rank={3} />
          <div className="mt-2 text-gray-300 text-lg">Emma Aria</div>
          <div className="text-gray-400">{topThree[2].score} points</div>
        </div>
      </div>

      {/* Remaining Participants */}
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="text-gray-300">Rank</TableHead>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {otherParticipants.map((participant) => (
            <TableRow
              key={participant.rank}
              className="border-b border-gray-700"
            >
              <TableCell className="text-gray-300">{participant.rank}</TableCell>
              <TableCell className="text-gray-300">{participant.name}</TableCell>
              <TableCell className="text-gray-300">{participant.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
