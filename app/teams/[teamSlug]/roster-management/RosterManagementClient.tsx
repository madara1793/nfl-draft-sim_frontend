"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, Tab, Card, Button } from "@nextui-org/react";
import {
  Scissors,
  RefreshCw,
  UserPlus,
  Tag,
  DollarSign,
  Users,
  AlertCircle,
} from "lucide-react";

// Mock data for demonstration
const rosterData = {
  players: [
    {
      id: 1,
      name: "John Smith",
      position: "QB",
      age: 28,
      currentSalary: "25M",
      contractYears: 2,
      deadCap: "15M",
      capSavings: "10M",
      status: "Active",
    },
    // Add more players as needed
  ],
  capSpace: "32.5M",
  projectedCap: "224.8M",
};

export default function RosterManagementClient({ params }: { params: { teamSlug: string } }) {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const teamName = params.teamSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const handlePlayerSelect = (playerId: number) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
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
          <p className="text-xl text-gray-400 text-center mb-8">Roster Management</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <DollarSign className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Current Cap Space</h3>
            <p className="text-2xl font-bold text-green-400">{rosterData.capSpace}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <RefreshCw className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Projected Cap</h3>
            <p className="text-2xl font-bold text-blue-400">{rosterData.projectedCap}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Users className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Active Players</h3>
            <p className="text-2xl font-bold text-purple-400">{rosterData.players.length}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Tag className="w-8 h-8 text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Available Tags</h3>
            <p className="text-2xl font-bold text-yellow-400">2</p>
          </Card>
        </div>

        <Tabs 
          aria-label="Roster Management Options" 
          className="w-full"
          color="primary"
          variant="underlined"
        >
          <Tab key="current-roster" title="Current Roster">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex justify-between mb-6">
                <div className="space-x-2">
                  <Button
                    color="danger"
                    isDisabled={selectedPlayers.length === 0}
                    className="gap-2"
                  >
                    <Scissors className="w-4 h-4" />
                    Cut Selected
                  </Button>
                  <Button
                    color="secondary"
                    isDisabled={selectedPlayers.length === 0}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Restructure
                  </Button>
                  <Button
                    color="secondary"
                    isDisabled={selectedPlayers.length === 0}
                    className="gap-2"
                  >
                    <Tag className="w-4 h-4" />
                    Apply Tag
                  </Button>
                </div>
                <Button color="primary" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Sign Free Agent
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3">Select</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Position</th>
                      <th className="text-left p-3">Age</th>
                      <th className="text-left p-3">Current Salary</th>
                      <th className="text-left p-3">Years Left</th>
                      <th className="text-left p-3">Dead Cap</th>
                      <th className="text-left p-3">Cap Savings</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rosterData.players.map((player) => (
                      <tr
                        key={player.id}
                        className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedPlayers.includes(player.id)}
                            onChange={() => handlePlayerSelect(player.id)}
                            className="rounded border-gray-400 text-blue-500 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3">{player.name}</td>
                        <td className="p-3">{player.position}</td>
                        <td className="p-3">{player.age}</td>
                        <td className="p-3">{player.currentSalary}</td>
                        <td className="p-3">{player.contractYears}</td>
                        <td className="p-3 text-red-400">{player.deadCap}</td>
                        <td className="p-3 text-green-400">{player.capSavings}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded bg-green-500/20 text-green-400">
                            {player.status}
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

          <Tab key="free-agents" title="Free Agents">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Free Agency Period Not Active</h3>
                  <p className="text-gray-400">
                    The free agency period will begin after the end of the regular season.
                  </p>
                </div>
              </div>
            </Card>
          </Tab>

          <Tab key="draft-picks" title="Draft Picks">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Draft Not Yet Started</h3>
                  <p className="text-gray-400">
                    The NFL Draft will begin after the free agency period.
                  </p>
                </div>
              </div>
            </Card>
          </Tab>

          <Tab key="trade-block" title="Trade Block">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Trade Block Coming Soon</h3>
                  <p className="text-gray-400">
                    The trade block feature will be available in the next update.
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