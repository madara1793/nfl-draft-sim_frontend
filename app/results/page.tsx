"use client";

import { motion } from "framer-motion";
import { Card } from "@nextui-org/react";
import { Trophy, Medal, Star, TrendingUp, ChevronUp, ChevronDown } from "lucide-react";

// Mock data for demonstration
const resultsData = {
  seasonResults: {
    record: "12-5",
    divisionRank: 1,
    playoffSeed: 2,
    pointDifferential: "+115",
  },
  achievements: [
    {
      title: "Division Champions",
      description: "Won the AFC North",
      icon: Trophy,
    },
    {
      title: "Playoff Berth",
      description: "Secured 2nd seed in AFC",
      icon: Medal,
    },
    {
      title: "Draft Success",
      description: "3 rookie starters found",
      icon: Star,
    },
  ],
  keyStats: [
    {
      label: "Points Scored",
      value: "425",
      change: "+45",
      trend: "up",
    },
    {
      label: "Points Allowed",
      value: "310",
      change: "-28",
      trend: "down",
    },
    {
      label: "Cap Space",
      value: "$32.5M",
      change: "+$12.8M",
      trend: "up",
    },
    {
      label: "Team Rating",
      value: "86",
      change: "+4",
      trend: "up",
    },
  ],
  improvements: [
    "Offensive line efficiency increased by 15%",
    "Reduced penalties by 25%",
    "Improved red zone scoring to 68%",
    "Decreased opponent third down conversion rate",
  ],
  challenges: [
    "Injuries to key players",
    "Struggled in divisional away games",
    "Pass rush needs improvement",
    "Secondary depth concerns",
  ],
};

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-center mb-2">Season Results</h1>
          <p className="text-xl text-gray-400 text-center mb-12">Your team's performance summary</p>
        </motion.div>

        {/* Season Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Record</h3>
            <p className="text-2xl font-bold text-yellow-400">{resultsData.seasonResults.record}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Medal className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Division Rank</h3>
            <p className="text-2xl font-bold text-blue-400">#{resultsData.seasonResults.divisionRank}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <Star className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Playoff Seed</h3>
            <p className="text-2xl font-bold text-purple-400">#{resultsData.seasonResults.playoffSeed}</p>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Point Differential</h3>
            <p className="text-2xl font-bold text-green-400">{resultsData.seasonResults.pointDifferential}</p>
          </Card>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Season Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resultsData.achievements.map((achievement, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 p-6">
                <achievement.icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-400">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Stats */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Key Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resultsData.keyStats.map((stat, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{stat.label}</h3>
                  {stat.trend === "up" ? (
                    <ChevronUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className={`text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {stat.change}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Improvements and Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h2 className="text-2xl font-bold mb-6">Key Improvements</h2>
            <ul className="space-y-4">
              {resultsData.improvements.map((improvement, index) => (
                <li key={index} className="flex items-center gap-3">
                  <ChevronUp className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h2 className="text-2xl font-bold mb-6">Areas for Improvement</h2>
            <ul className="space-y-4">
              {resultsData.challenges.map((challenge, index) => (
                <li key={index} className="flex items-center gap-3">
                  <ChevronDown className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}