"use client";

import { motion } from "framer-motion";
import { Card } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { BarChart, LineChart, PieChart, TrendingUp, Users, DollarSign, Award } from "lucide-react";

// Mock data for demonstration
const analysisData = {
  teamPerformance: {
    wins: 12,
    losses: 5,
    winPercentage: 70.6,
    pointsScored: 425,
    pointsAllowed: 310,
  },
  rosterAnalysis: {
    averageAge: 26.4,
    averageSalary: "4.2M",
    rookieCount: 8,
    veteranCount: 45,
  },
  capAnalysis: {
    totalCap: "224.8M",
    usedCap: "192.3M",
    availableCap: "32.5M",
    deadCap: "12.3M",
  },
  draftSuccess: {
    totalPicks: 7,
    startersFound: 3,
    developmentalProspects: 4,
  }
};

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-center mb-2">Team Analysis</h1>
          <p className="text-xl text-gray-400 text-center mb-12">Comprehensive analysis of your team's performance</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Win Percentage</h3>
            <p className="text-2xl font-bold text-green-400">{analysisData.teamPerformance.winPercentage}%</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Roster Size</h3>
            <p className="text-2xl font-bold text-blue-400">{analysisData.rosterAnalysis.rookieCount + analysisData.rosterAnalysis.veteranCount}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <DollarSign className="w-8 h-8 text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Cap Space</h3>
            <p className="text-2xl font-bold text-yellow-400">{analysisData.capAnalysis.availableCap}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Award className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Draft Success</h3>
            <p className="text-2xl font-bold text-purple-400">{(analysisData.draftSuccess.startersFound / analysisData.draftSuccess.totalPicks * 100).toFixed(1)}%</p>
          </Card>
        </div>

        <Tabs 
          aria-label="Analysis sections"
          className="w-full"
          color="primary"
          variant="underlined"
        >
          <Tab key="performance" title="Team Performance">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Season Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Wins</span>
                      <span className="text-green-400">{analysisData.teamPerformance.wins}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Losses</span>
                      <span className="text-red-400">{analysisData.teamPerformance.losses}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Points Scored</span>
                      <span className="text-blue-400">{analysisData.teamPerformance.pointsScored}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Points Allowed</span>
                      <span className="text-yellow-400">{analysisData.teamPerformance.pointsAllowed}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <BarChart className="w-48 h-48 text-gray-500" />
                  <p className="text-gray-400 text-center mt-4">Performance visualization coming soon</p>
                </div>
              </div>
            </Card>
          </Tab>

          <Tab key="roster" title="Roster Analysis">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Roster Demographics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Age</span>
                      <span className="text-blue-400">{analysisData.rosterAnalysis.averageAge}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Salary</span>
                      <span className="text-green-400">{analysisData.rosterAnalysis.averageSalary}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rookies</span>
                      <span className="text-purple-400">{analysisData.rosterAnalysis.rookieCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Veterans</span>
                      <span className="text-yellow-400">{analysisData.rosterAnalysis.veteranCount}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <PieChart className="w-48 h-48 text-gray-500" />
                  <p className="text-gray-400 text-center mt-4">Roster distribution visualization coming soon</p>
                </div>
              </div>
            </Card>
          </Tab>

          <Tab key="financial" title="Financial Analysis">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Salary Cap Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Cap</span>
                      <span className="text-blue-400">{analysisData.capAnalysis.totalCap}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Used Cap</span>
                      <span className="text-yellow-400">{analysisData.capAnalysis.usedCap}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Available Cap</span>
                      <span className="text-green-400">{analysisData.capAnalysis.availableCap}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Dead Cap</span>
                      <span className="text-red-400">{analysisData.capAnalysis.deadCap}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <LineChart className="w-48 h-48 text-gray-500" />
                  <p className="text-gray-400 text-center mt-4">Cap space trend visualization coming soon</p>
                </div>
              </div>
            </Card>
          </Tab>

          <Tab key="draft" title="Draft Analysis">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Draft Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Picks</span>
                      <span className="text-blue-400">{analysisData.draftSuccess.totalPicks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Starters Found</span>
                      <span className="text-green-400">{analysisData.draftSuccess.startersFound}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Development Prospects</span>
                      <span className="text-yellow-400">{analysisData.draftSuccess.developmentalProspects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Success Rate</span>
                      <span className="text-purple-400">{(analysisData.draftSuccess.startersFound / analysisData.draftSuccess.totalPicks * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <BarChart className="w-48 h-48 text-gray-500" />
                  <p className="text-gray-400 text-center mt-4">Draft success visualization coming soon</p>
                </div>
              </div>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}