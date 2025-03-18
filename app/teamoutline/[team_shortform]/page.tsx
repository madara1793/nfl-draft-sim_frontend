"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

type Player = {
  player_name: string;
  position: string;
  age: number;
  cap_hit: number;
  cap_hit_percent: number;
  base_salary: number;
  signing_bonus: number;
  game_bonus: number;
  dead_cap: number;
  // Add other player properties as needed
};

type Team = {
  team_shortform: string;
  team_name: string;
  total_cap: number;
  top_51: number;
  team_cap_space: number;
  offense_cap: number;
  defense_cap: number;
  special_cap: number;
  team_need_pos: string[];
  // Add other team properties as needed
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

// Helper function to format percentage
const formatPercent = (value: number) => {
  return `${value.toFixed(2)}%`;
};

const getPositionColor = (position: string) => {
  const positionGroups: Record<string, string> = {
    // Offense
    QB: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    RB: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    WR: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    TE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    IOL: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
    OL: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
    OT: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
    OG: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
    C: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",

    // Defense
    DL: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    DE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    DT: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    LB: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    CB: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    S: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    EDGE: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",

    // Special Teams
    K: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    P: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
    LS: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  return (
    positionGroups[position] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
  );
};

export default function TeamOutlinePage() {
  const params = useParams();
  const router = useRouter();
  const team_shortform = params.team_shortform as string;

  const [teamData, setTeamData] = useState<TeamOutlineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeamOutline = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams/${team_shortform}/outline/`
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

  // Add these state variables
  const [sortField, setSortField] = useState<keyof Player>("cap_hit");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Add this function to handle sorting
  const handleSort = (field: keyof Player) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getCapPercentageColor = (percentage: number) => {
    if (percentage > 10) return "text-red-600 dark:text-red-400 font-bold";
    if (percentage > 5)
      return "text-amber-600 dark:text-amber-400 font-semibold";
    return "text-green-600 dark:text-green-400";
  };

  useEffect(() => {
    if (team_shortform) {
      fetchTeamOutline();
    }
  }, [team_shortform]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-r-4 border-l-4 border-transparent border-opacity-50 animate-pulse"></div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Loading Team Data
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            Preparing team information for {team_shortform}...
          </p>
        </div>
      </div>
    );
  }
  let sortedPlayers: Player[] = [];

  // Sort the players array
  if (teamData) {
    sortedPlayers = [...teamData.players].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
  
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
  
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
  
      return 0;
    });
  }


  if (error) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl shadow-md max-w-md w-full text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => {
              setError("");
              setLoading(true);
              fetchTeamOutline();
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
        <svg
          className="w-16 h-16 mx-auto text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
          No data available
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Team Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-32 h-32">
            <Image
              src={`/assets/${teamData.team.team_shortform}.png`}
              alt={teamData.team.team_shortform}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {teamData.team.team_name || teamData.team.team_shortform}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Team Code: {teamData.team.team_shortform}
            </p>

            {/* Team Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Cap
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {formatCurrency(teamData.team.total_cap)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Top 51
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {formatCurrency(teamData.team.top_51)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cap Space
                </p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(teamData.team.team_cap_space)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Needs Section */}
      {teamData.team.team_need_pos &&
        teamData.team.team_need_pos.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Team Needs
            </h2>
            <div className="flex flex-wrap gap-3">
              {teamData.team.team_need_pos.map((need, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-full font-medium ${getPositionColor(
                    need
                  )}`}
                >
                  {need}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Cap Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Cap Distribution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-1">
              Offense
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(teamData.team.offense_cap)}
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-1">
              Defense
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(teamData.team.defense_cap)}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-1">
              Special Teams
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(teamData.team.special_cap)}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Team Roster
      </h2>

      {teamData.players.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            No players available for this team
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSort("player_name")}
                >
                  Player
                  {sortField === "player_name" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSort("position")}
                >
                  Position
                  {sortField === "position" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSort("age")}
                >
                  Age
                  {sortField === "age" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSort("cap_hit")}
                >
                  Cap Hit
                  {sortField === "cap_hit" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSort("cap_hit_percent")}
                >
                  Cap %
                  {sortField === "cap_hit_percent" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSort("base_salary")}
                >
                  Base Salary
                  {sortField === "base_salary" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSort("signing_bonus")}
                >
                  Signing Bonus
                  {sortField === "signing_bonus" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSort("game_bonus")}
                >
                  Game Bonus
                  {sortField === "game_bonus" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => handleSort("dead_cap")}
                >
                  Dead Cap
                  {sortField === "dead_cap" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedPlayers.map((player, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {player.player_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getPositionColor(
                        player.position
                      )}`}
                    >
                      {player.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {player.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.cap_hit)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${getCapPercentageColor(
                      player.cap_hit_percent
                    )}`}
                  >
                    {formatPercent(player.cap_hit_percent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.base_salary)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.signing_bonus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.game_bonus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {formatCurrency(player.dead_cap)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
