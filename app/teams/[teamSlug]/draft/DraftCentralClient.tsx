"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, Tab, Card, Button } from "@nextui-org/react";
import {
  Search,
  Star,
  Clock,
  Award,
  BarChart,
  FileSpreadsheet,
  ArrowUpDown,
  Filter,
} from "lucide-react";

// Mock data for demonstration
const draftData = {
  draftPosition: 12,
  totalPicks: 7,
  picks: [
    { round: 1, pick: 12, overall: 12 },
    { round: 2, pick: 12, overall: 44 },
    { round: 3, pick: 12, overall: 76 },
    { round: 4, pick: 12, overall: 108 },
    { round: 5, pick: 12, overall: 140 },
    { round: 6, pick: 12, overall: 172 },
    { round: 7, pick: 12, overall: 204 },
  ],
  prospects: [
    {
      id: 1,
      name: "Michael Williams",
      position: "QB",
      college: "Ohio State",
      height: "6'3\"",
      weight: "220 lbs",
      projectedRound: "1st",
      rating: 85,
      strengths: ["Arm Strength", "Accuracy", "Mobility"],
      weaknesses: ["Decision Making", "Experience"],
    },
    // Add more prospects as needed
  ],
};

export default function DraftCentralClient({ params }: { params: { teamSlug: string } }) {
  const [selectedProspects, setSelectedProspects] = useState<number[]>([]);
  const teamName = params.teamSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const handleProspectSelect = (prospectId: number) => {
    setSelectedProspects(prev =>
      prev.includes(prospectId)
        ? prev.filter(id => id !== prospectId)
        : [...prev, prospectId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-center mb-2">{teamName}</h1>
          <p className="text-xl text-gray-400 text-center mb-8">Draft Central</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Award className="w-8 h-8 text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Draft Position</h3>
            <p className="text-2xl font-bold text-yellow-400">#{draftData.draftPosition}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <FileSpreadsheet className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Total Picks</h3>
            <p className="text-2xl font-bold text-blue-400">{draftData.totalPicks}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Star className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Watchlist</h3>
            <p className="text-2xl font-bold text-purple-400">{selectedProspects.length}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Clock className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Days Until Draft</h3>
            <p className="text-2xl font-bold text-green-400">45</p>
          </Card>
        </div>

        <Tabs 
          aria-label="Draft Options" 
          className="w-full"
          color="primary"
          variant="underlined"
        >
          <Tab key="draft-board" title="Draft Board">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex justify-between mb-6">
                <div className="flex gap-2">
                  <Button color="secondary" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                  <Button color="secondary" className="gap-2">
                    <ArrowUpDown className="w-4 h-4" />
                    Sort
                  </Button>
                </div>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search prospects..."
                    className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3">Watch</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Position</th>
                      <th className="text-left p-3">College</th>
                      <th className="text-left p-3">Height</th>
                      <th className="text-left p-3">Weight</th>
                      <th className="text-left p-3">Projected</th>
                      <th className="text-left p-3">Rating</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {draftData.prospects.map((prospect) => (
                      <tr
                        key={prospect.id}
                        className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="p-3">
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            onClick={() => handleProspectSelect(prospect.id)}
                          >
                            <Star
                              className={`w-5 h-5 ${
                                selectedProspects.includes(prospect.id)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-400"
                              }`}
                            />
                          </Button>
                        </td>
                        <td className="p-3">{prospect.name}</td>
                        <td className="p-3">{prospect.position}</td>
                        <td className="p-3">{prospect.college}</td>
                        <td className="p-3">{prospect.height}</td>
                        <td className="p-3">{prospect.weight}</td>
                        <td className="p-3">{prospect.projectedRound}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                            {prospect.rating}
                          </span>
                        </td>
                        <td className="p-3">
                          <Button color="primary" size="sm" variant="light">
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tab>

          <Tab key="my-picks" title="My Picks">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="space-y-4">
                {draftData.picks.map((pick, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 p-4 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">Round {pick.round} - Pick {pick.pick}</h3>
                      <p className="text-gray-400">Overall: #{pick.overall}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button color="secondary" size="sm">Trade</Button>
                      <Button variant="light" size="sm">View Board</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Tab>

          <Tab key="scouting" title="Scouting Reports">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftData.prospects.slice(0, 3).map((prospect) => (
                  <div key={prospect.id} className="bg-gray-700/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{prospect.name}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Strengths</h4>
                        <div className="flex flex-wrap gap-2">
                          {prospect.strengths.map((strength, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-sm"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Weaknesses</h4>
                        <div className="flex flex-wrap gap-2">
                          {prospect.weaknesses.map((weakness, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-sm"
                            >
                              {weakness}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button color="primary" className="w-full mt-4">View Full Report</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Tab>

          <Tab key="trade-picks" title="Trade Picks">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <BarChart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Trade Calculator Coming Soon</h3>
                  <p className="text-gray-400">
                    Our advanced trade calculator will help you evaluate and propose draft pick trades.
                  </p>
                </div>
              </div>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}