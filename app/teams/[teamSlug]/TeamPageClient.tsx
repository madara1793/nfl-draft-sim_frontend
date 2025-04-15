"use client";

import { motion } from "framer-motion";
import { Tabs, Tab, Card, Chip, Progress, Tooltip } from "@nextui-org/react";
import {
  Star,
  DollarSign,
  Users,
  Trophy,
  Info,
  TrendingUp,
  TrendingDown,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";

type Player = {
  player_name: string;
  position: string;
  age: number;
  cap_hit: number;
  base_salary: number;
  bonus: number;
  dead_cap: number;
  overall_score: number;
};

type Team = {
  team_code: string;
  team_name: string;
  total_cap: number;
  top_51_space: number;
  dead_money: number;
  team_need_pos: string[];
  description: string;
};

type TeamOutlineData = {
  team: Team;
  players: Player[];
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to calculate team rating based on player overall scores
const calculateTeamRating = (players: Player[]): number => {
  if (!players || players.length === 0) return 0;

  const totalScore = players.reduce(
    (sum, player) => sum + (player.overall_score || 0),
    0
  );
  // Scale to 1-5 rating
  return Math.min(5, Math.max(1, Math.round(totalScore / players.length / 20)));
};

// Helper function to get position group averages
const getPositionGroupStats = (players: Player[]) => {
  const groups: Record<
    string,
    { count: number; totalScore: number; avgAge: number }
  > = {};

  players.forEach((player) => {
    const group = getPositionGroup(player.position);
    if (!groups[group]) {
      groups[group] = { count: 0, totalScore: 0, avgAge: 0 };
    }
    groups[group].count++;
    groups[group].totalScore += player.overall_score || 0;
    groups[group].avgAge += player.age || 0;
  });

  // Calculate averages
  Object.keys(groups).forEach((group) => {
    groups[group].totalScore = Math.round(
      groups[group].totalScore / groups[group].count
    );
    groups[group].avgAge =
      Math.round((groups[group].avgAge / groups[group].count) * 10) / 10;
  });

  return groups;
};

// Helper function to categorize positions into groups
const getPositionGroup = (position: string): string => {
  const qb = ["QB"];
  const rb = ["RB", "FB", "HB"];
  const wr = ["WR", "TE"];
  const ol = ["OT", "OG", "C", "OL"];
  const dl = ["DE", "DT", "NT", "DL"];
  const lb = ["LB", "ILB", "OLB", "MLB"];
  const db = ["CB", "S", "FS", "SS", "DB"];
  const st = ["K", "P", "LS"];

  if (qb.includes(position)) return "Quarterbacks";
  if (rb.includes(position)) return "Running Backs";
  if (wr.includes(position)) return "Receivers";
  if (ol.includes(position)) return "Offensive Line";
  if (dl.includes(position)) return "Defensive Line";
  if (lb.includes(position)) return "Linebackers";
  if (db.includes(position)) return "Defensive Backs";
  if (st.includes(position)) return "Special Teams";

  return "Other";
};

// Helper function to get color based on rating
const getRatingColor = (rating: number) => {
  if (rating >= 85) return "success";
  if (rating >= 75) return "primary";
  if (rating >= 65) return "warning";
  return "danger";
};

export default function TeamPageClient({
  params,
}: {
  params: { teamSlug: string };
}) {
  const router = useRouter();

  // Format team code from slug
  const team_code = params.teamSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [teamData, setTeamData] = useState<TeamOutlineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Add these state variables for sorting
  const [sortField, setSortField] = useState<keyof Player>("overall_score");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [positionFilter, setPositionFilter] = useState<string | null>(null);

  const fetchTeamOutline = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/teams/${team_code.toUpperCase()}/outline/`
      );
      console.log("API Response:", response.data);
      setTeamData(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching team outline:", err);
      setError("Failed to load team data");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle sorting
  const handleSort = (field: keyof Player) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Function to filter players by position group
  const filterPlayersByPosition = (players: Player[]) => {
    if (!positionFilter) return players;

    return players.filter(
      (player) => getPositionGroup(player.position) === positionFilter
    );
  };

  const getCapPercentageColor = (percentage: number) => {
    if (percentage > 10) return "text-red-600 dark:text-red-400 font-bold";
    if (percentage > 5)
      return "text-amber-600 dark:text-amber-400 font-semibold";
    return "text-green-600 dark:text-green-400";
  };

  useEffect(() => {
    if (team_code) {
      fetchTeamOutline();
    }
  }, [team_code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sport-navy flex items-center justify-center">
        <div className="animate-pulse-slow text-sport-gold text-2xl">
          Loading team data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sport-navy flex items-center justify-center">
        <div className="text-sport-red text-2xl">
          {error}
          <button
            onClick={() => fetchTeamOutline()}
            className="mt-4 px-4 py-2 bg-sport-blue text-white rounded-md hover:bg-opacity-80"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen bg-sport-navy flex items-center justify-center">
        <div className="text-sport-red text-2xl">No team data found</div>
      </div>
    );
  }

  // Calculate team rating based on player overall scores
  const teamRating = calculateTeamRating(teamData.players);

  // Get position group statistics
  const positionGroups = getPositionGroupStats(teamData.players);

  // Calculate salary cap usage percentage
  const capUsagePercentage = Math.round(
    ((teamData.team.total_cap - teamData.team.top_51_space) /
      teamData.team.total_cap) *
      100
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sport-navy to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-center mb-2 text-sport-gold">
            {teamData.team.team_name}
          </h1>
          <p className="text-center text-gray-300 text-lg">{team_code}</p>
        </motion.div>

        <Tabs
          aria-label="Team Options"
          className="w-full"
          color="primary"
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          <Tab key="overview" title="Team Overview">
            <Card className="bg-sport-gray/50 border-sport-gray p-6">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Team Rating Card */}
                  <div className="bg-sport-gray/70 p-5 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3 text-sport-gold flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Team Rating
                    </h2>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < teamRating
                              ? "text-sport-gold fill-sport-gold"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-300">
                      Based on player overall ratings
                    </p>
                  </div>

                  {/* Salary Cap Card */}
                  <div className="bg-sport-gray/70 p-5 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3 text-sport-gold flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Salary Cap
                    </h2>
                    <div className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">Cap Usage</span>
                        <span className="text-sm text-gray-300">
                          {capUsagePercentage}%
                        </span>
                      </div>
                      <Progress
                        value={capUsagePercentage}
                        color={
                          capUsagePercentage > 90
                            ? "danger"
                            : capUsagePercentage > 75
                            ? "warning"
                            : "success"
                        }
                        className="h-2"
                      />
                    </div>
                    <p className="text-lg font-medium">
                      Available:{" "}
                      <span className="text-sport-gold">
                        {formatCurrency(teamData.team.top_51_space)}
                      </span>
                    </p>
                  </div>

                  {/* Team Needs Card */}
                  <div className="bg-sport-gray/70 p-5 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3 text-sport-gold flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Team Needs
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {teamData.team.team_need_pos.map((position) => (
                        <Chip
                          key={position}
                          color="danger"
                          variant="flat"
                          className="text-sm"
                        >
                          {position}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Team Description */}
                <div className="bg-sport-gray/70 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold mb-3 text-sport-gold">
                    Team Overview
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {teamData.team.description ||
                      "No team description available."}
                  </p>
                </div>

                {/* Position Group Analysis */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-sport-gold">
                    Position Group Analysis
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(positionGroups).map(([group, stats]) => (
                      <div
                        key={group}
                        className="bg-sport-gray/70 p-4 rounded-lg cursor-pointer hover:bg-sport-gray/90 transition-colors"
                        onClick={() => {
                          setPositionFilter(group);
                          setActiveTab("roster");
                        }}
                      >
                        <h3 className="text-lg font-medium mb-2">{group}</h3>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Players:</span>
                          <span className="font-medium">{stats.count}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Avg Rating:</span>
                          <span
                            className={`font-medium ${
                              stats.totalScore >= 80
                                ? "text-green-400"
                                : stats.totalScore >= 70
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                          >
                            {stats.totalScore}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Avg Age:</span>
                          <span className="font-medium">{stats.avgAge}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary Cap Details */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-sport-gold">
                    Salary Cap Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-sport-gray/70 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-sport-gold" />
                        <h3 className="text-lg font-medium">Total Cap</h3>
                      </div>
                      <p className="text-2xl font-bold text-sport-blue">
                        {formatCurrency(teamData.team.total_cap)}
                      </p>
                    </div>
                    <div className="bg-sport-gray/70 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-sport-gold" />
                        <h3 className="text-lg font-medium">Top 51 Space</h3>
                      </div>
                      <p className="text-2xl font-bold text-sport-blue">
                        {formatCurrency(teamData.team.top_51_space)}
                      </p>
                    </div>
                    <div className="bg-sport-gray/70 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-sport-gold" />
                        <h3 className="text-lg font-medium">Dead Money</h3>
                      </div>
                      <p className="text-2xl font-bold text-sport-blue">
                        {formatCurrency(teamData.team.dead_money)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Tab>

          <Tab key="roster" title="Team Roster">
            <Card className="bg-sport-gray/50 border-sport-gray p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                <Chip
                  color="primary"
                  variant={positionFilter === null ? "solid" : "flat"}
                  className="cursor-pointer"
                  onClick={() => setPositionFilter(null)}
                >
                  All Positions
                </Chip>
                {Object.keys(getPositionGroupStats(teamData.players)).map(
                  (group) => (
                    <Chip
                      key={group}
                      color="primary"
                      variant={positionFilter === group ? "solid" : "flat"}
                      className="cursor-pointer"
                      onClick={() => setPositionFilter(group)}
                    >
                      {group}
                    </Chip>
                  )
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th
                        className="text-left p-3 cursor-pointer hover:text-sport-gold"
                        onClick={() => handleSort("player_name")}
                      >
                        Name{" "}
                        {sortField === "player_name" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left p-3 cursor-pointer hover:text-sport-gold"
                        onClick={() => handleSort("position")}
                      >
                        Position{" "}
                        {sortField === "position" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left p-3 cursor-pointer hover:text-sport-gold"
                        onClick={() => handleSort("age")}
                      >
                        Age{" "}
                        {sortField === "age" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left p-3 cursor-pointer hover:text-sport-gold"
                        onClick={() => handleSort("overall_score")}
                      >
                        Rating{" "}
                        {sortField === "overall_score" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left p-3 cursor-pointer hover:text-sport-gold"
                        onClick={() => handleSort("cap_hit")}
                      >
                        Cap Hit{" "}
                        {sortField === "cap_hit" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left p-3 cursor-pointer hover:text-sport-gold"
                        onClick={() => handleSort("base_salary")}
                      >
                        Base Salary{" "}
                        {sortField === "base_salary" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left p-3 cursor-pointer hover:text-sport-gold"
                        onClick={() => handleSort("bonus")}
                      >
                        Bonus{" "}
                        {sortField === "bonus" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="text-left p-3 cursor-pointer hover:text-sport-gold"
                        onClick={() => handleSort("dead_cap")}
                      >
                        Dead Cap{" "}
                        {sortField === "dead_cap" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterPlayersByPosition(teamData.players)
                      .sort((a, b) => {
                        const aValue = a[sortField] || 0;
                        const bValue = b[sortField] || 0;

                        if (
                          typeof aValue === "string" &&
                          typeof bValue === "string"
                        ) {
                          return sortDirection === "asc"
                            ? aValue.localeCompare(bValue)
                            : bValue.localeCompare(aValue);
                        }

                        return sortDirection === "asc"
                          ? Number(aValue) - Number(bValue)
                          : Number(bValue) - Number(aValue);
                      })
                      .map((player, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-700 hover:bg-sport-gray/30 transition-colors"
                        >
                          <td className="p-3 font-medium">
                            {player.player_name}
                          </td>
                          <td className="p-3">
                            <Chip size="sm" color="default" variant="flat">
                              {player.position}
                            </Chip>
                          </td>
                          <td className="p-3">{player.age}</td>
                          <td className="p-3">
                            <Chip
                              size="sm"
                              color={getRatingColor(player.overall_score)}
                              variant="flat"
                            >
                              {player.overall_score}
                            </Chip>
                          </td>
                          <td className="p-3 font-medium">
                            {formatCurrency(player.cap_hit)}
                          </td>
                          <td className="p-3">
                            {formatCurrency(player.base_salary)}
                          </td>
                          <td className="p-3">
                            {formatCurrency(player.bonus)}
                          </td>
                          <td className="p-3">
                            {formatCurrency(player.dead_cap)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {filterPlayersByPosition(teamData.players).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No players found for the selected position group.
                </div>
              )}
            </Card>
          </Tab>

          <Tab key="capAnalysis" title="Cap Analysis">
            <Card className="bg-sport-gray/50 border-sport-gray p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-sport-gold">
                    Salary Cap Overview
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-sport-gray/70 p-5 rounded-lg">
                      <h3 className="text-xl font-medium mb-3">Cap Space</h3>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>Total Cap</span>
                          <span>{formatCurrency(teamData.team.total_cap)}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Used Cap</span>
                          <span>
                            {formatCurrency(
                              teamData.team.total_cap -
                                teamData.team.top_51_space
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Available Space</span>
                          <span className="text-sport-gold">
                            {formatCurrency(teamData.team.top_51_space)}
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={capUsagePercentage}
                        color={
                          capUsagePercentage > 90
                            ? "danger"
                            : capUsagePercentage > 75
                            ? "warning"
                            : "success"
                        }
                        className="h-3"
                        showValueLabel={true}
                        label="Cap Usage"
                      />
                    </div>

                    <div className="bg-sport-gray/70 p-5 rounded-lg">
                      <h3 className="text-xl font-medium mb-3">Dead Money</h3>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl font-bold text-sport-red">
                          {formatCurrency(teamData.team.dead_money)}
                        </div>
                        <div className="text-sm text-gray-300">
                          {(
                            (teamData.team.dead_money /
                              teamData.team.total_cap) *
                            100
                          ).toFixed(1)}
                          % of total cap
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">
                        Dead money is cap space allocated to players no longer
                        on the team. Lower dead money indicates better contract
                        management.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Top Cap Hits</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left p-3">Player</th>
                            <th className="text-left p-3">Position</th>
                            <th className="text-left p-3">Cap Hit</th>
                            <th className="text-left p-3">% of Cap</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamData.players
                            .sort((a, b) => b.cap_hit - a.cap_hit)
                            .slice(0, 10)
                            .map((player, index) => {
                              const capPercentage =
                                (player.cap_hit / teamData.team.total_cap) *
                                100;
                              return (
                                <tr
                                  key={index}
                                  className="border-b border-gray-700 hover:bg-sport-gray/30 transition-colors"
                                >
                                  <td className="p-3 font-medium">
                                    {player.player_name}
                                  </td>
                                  <td className="p-3">{player.position}</td>
                                  <td className="p-3 font-medium">
                                    {formatCurrency(player.cap_hit)}
                                  </td>
                                  <td className="p-3">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={getCapPercentageColor(
                                          capPercentage
                                        )}
                                      >
                                        {capPercentage.toFixed(1)}%
                                      </span>
                                      <div className="w-20 bg-gray-700 h-2 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full ${
                                            capPercentage > 10
                                              ? "bg-red-500"
                                              : capPercentage > 5
                                              ? "bg-amber-500"
                                              : "bg-green-500"
                                          }`}
                                          style={{
                                            width: `${Math.min(
                                              100,
                                              capPercentage * 3
                                            )}%`,
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
