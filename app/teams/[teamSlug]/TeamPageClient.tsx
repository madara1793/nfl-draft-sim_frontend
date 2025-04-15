"use client";

import { motion } from "framer-motion";
import { Tabs, Tab, Card } from "@nextui-org/react";
import { Star, DollarSign, Users, Trophy } from "lucide-react";

// Mock data for demonstration
const teamData = {
  overview: {
    recentSuccess: "Division champions in 2023",
    abilityScore: 4,
    introduction: "A storied franchise with a rich history of success, currently in a competitive rebuild phase with promising young talent.",
    capState: {
      totalCap: "224.8M",
      capSpace: "32.5M",
      deadCap: "12.3M"
    },
    neededPositions: ["DE", "RT", "CB", "WR"]
  },
  roster: [
    {
      name: "John Smith",
      position: "QB",
      age: 25,
      ability: 88,
      capHit: "4.5M",
      bonus: "2.1M",
      deadMoney: "3.2M",
      experience: "3 years",
      contractEnd: "2025"
    },
    // Add more players here
  ]
};

export default function TeamPageClient({ params }: { params: { teamSlug: string } }) {
  const teamName = params.teamSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-center mb-8">{teamName}</h1>
        </motion.div>

        <Tabs 
          aria-label="Team Options" 
          className="w-full"
          color="primary"
          variant="underlined"
        >
          <Tab key="overview" title="Team Overview">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Recent Success</h2>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <p className="text-gray-300">{teamData.overview.recentSuccess}</p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Team Rating</h2>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < teamData.overview.abilityScore
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">Team Overview</h2>
                  <p className="text-gray-300">{teamData.overview.introduction}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Salary Cap Status</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(teamData.overview.capState).map(([key, value]) => (
                      <div key={key} className="bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5 text-green-500" />
                          <h3 className="text-lg font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                        </div>
                        <p className="text-2xl font-bold text-green-400">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Team Needs</h2>
                  <div className="flex flex-wrap gap-2">
                    {teamData.overview.neededPositions.map((position) => (
                      <span
                        key={position}
                        className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-medium"
                      >
                        {position}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Tab>

          <Tab key="roster" title="Team Roster">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Position</th>
                      <th className="text-left p-3">Age</th>
                      <th className="text-left p-3">Rating</th>
                      <th className="text-left p-3">Cap Hit</th>
                      <th className="text-left p-3">Bonus</th>
                      <th className="text-left p-3">Dead Money</th>
                      <th className="text-left p-3">Experience</th>
                      <th className="text-left p-3">Contract End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.roster.map((player, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="p-3">{player.name}</td>
                        <td className="p-3">{player.position}</td>
                        <td className="p-3">{player.age}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                            {player.ability}
                          </span>
                        </td>
                        <td className="p-3">{player.capHit}</td>
                        <td className="p-3">{player.bonus}</td>
                        <td className="p-3">{player.deadMoney}</td>
                        <td className="p-3">{player.experience}</td>
                        <td className="p-3">{player.contractEnd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}