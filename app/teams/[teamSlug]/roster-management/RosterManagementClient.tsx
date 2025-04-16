"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  Tab,
  Card,
  Button,
  Chip,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import {
  Scissors,
  RefreshCw,
  UserPlus,
  Tag,
  DollarSign,
  Users,
  AlertCircle,
  Check,
  X,
  TrendingDown,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

// Define the Abilities type
type Abilities = {
  pass_coverage_ability: number;
  pass_rush_effectiveness: number;
  tackling_efficiency: number;
  run_defense_performance: number;
  coverage_versatility: number;
  pass_blocking_efficiency: number;
  run_blocking_strength: number;
  passing_accuracy: number;
  deep_passing_ability: number;
  pocket_presence: number;
  receiving_consistency: number;
  elusiveness: number;
  field_goal_accuracy: number;
  kickoff_distance: number;
  punting_efficiency: number;
  return_ability: number;
  durability: number;
  penalty_avoidance: number;
  interception_ability: number;
  red_zone_efficiency: number;
};

// Define the Player type
type Player = {
  player_name: string;
  position: string;
  age: number;
  cap_hit: number;
  base_salary: number;
  bonus: number;
  dead_cap: number;
  overall_score: number;
  abilities: Abilities;
  team_code: string;
};

// Define the Team type
type Team = {
  team_code: string;
  team_name: string;
  total_cap: number;
  top_51_space: number;
  dead_money: number;
  team_need_pos: string[];
  description: string;
};

// Define the UserTeamData type
type UserTeamData = {
  team: Team;
  players: Player[];
};

// Define the ActionImpact type
type ActionImpact = {
  cap_savings: number;
  dead_cap_increase: number;
  cap_space_after: number;
  team_rating_change: number;
  position_impact: string;
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

// Helper function to get relevant abilities for a position
const getRelevantAbilities = (player: Player) => {
  const position = player.position;
  const abilities = player.abilities;

  // Return abilities relevant to the position
  if (position === "QB") {
    return {
      "Passing Accuracy": abilities.passing_accuracy,
      "Deep Passing": abilities.deep_passing_ability,
      "Pocket Presence": abilities.pocket_presence,
      "Red Zone Efficiency": abilities.red_zone_efficiency,
    };
  } else if (["WR", "TE"].includes(position)) {
    return {
      "Receiving Consistency": abilities.receiving_consistency,
      Elusiveness: abilities.elusiveness,
      "Red Zone Efficiency": abilities.red_zone_efficiency,
    };
  } else if (position === "RB") {
    return {
      Elusiveness: abilities.elusiveness,
      "Red Zone Efficiency": abilities.red_zone_efficiency,
    };
  } else if (["OT", "OG", "C"].includes(position)) {
    return {
      "Pass Blocking": abilities.pass_blocking_efficiency,
      "Run Blocking": abilities.run_blocking_strength,
      "Penalty Avoidance": abilities.penalty_avoidance,
    };
  } else if (["DE", "DT", "NT"].includes(position)) {
    return {
      "Pass Rush": abilities.pass_rush_effectiveness,
      "Run Defense": abilities.run_defense_performance,
      Tackling: abilities.tackling_efficiency,
    };
  } else if (["LB", "MLB", "OLB"].includes(position)) {
    return {
      "Pass Coverage": abilities.pass_coverage_ability,
      "Pass Rush": abilities.pass_rush_effectiveness,
      "Run Defense": abilities.run_defense_performance,
      Tackling: abilities.tackling_efficiency,
    };
  } else if (["CB", "S", "FS", "SS"].includes(position)) {
    return {
      "Pass Coverage": abilities.pass_coverage_ability,
      "Coverage Versatility": abilities.coverage_versatility,
      Interception: abilities.interception_ability,
      Tackling: abilities.tackling_efficiency,
    };
  } else if (["K", "P"].includes(position)) {
    return {
      "Field Goal Accuracy": abilities.field_goal_accuracy,
      "Kickoff Distance": abilities.kickoff_distance,
      "Punting Efficiency": abilities.punting_efficiency,
    };
  }

  // Default return for other positions
  return {
    Durability: abilities.durability,
    "Penalty Avoidance": abilities.penalty_avoidance,
  };
};

// Helper function to get color based on ability rating
const getAbilityColor = (rating: number) => {
  if (rating >= 85) return "text-green-400";
  if (rating >= 70) return "text-blue-400";
  if (rating >= 60) return "text-yellow-400";
  return "text-red-400";
};

export default function RosterManagementClient({
  params,
}: {
  params: { teamSlug: string };
}) {
  // State variables
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [teamData, setTeamData] = useState<UserTeamData | null>(null);
  const [freeAgents, setFreeAgents] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("cut-restructure");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [actionImpact, setActionImpact] = useState<ActionImpact | null>(null);
  const [selectedPlayerForAction, setSelectedPlayerForAction] =
    useState<Player | null>(null);

  // Modal control
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Format team code from slug
  const team_code = params.teamSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  // Fetch team data and free agents
  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch user team data
      const username = "tester";
      const teamResponse = await axios.get(
        `http://127.0.0.1:8000/api/users/get_user_team/${username}/`
      );

      setTeamData(teamResponse.data);

      // Fetch free agents
      const freeAgentsResponse = await axios.get(
        "http://127.0.0.1:8000/api/freeagencies/"
      );

      console.log(freeAgentsResponse.data.data);

      setFreeAgents(freeAgentsResponse.data.data || []);
      setError("");
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load team data");
    } finally {
      setLoading(false);
    }
  };

  // Predict impact of an action
  const predictActionImpact = async () => {
    if (!selectedPlayerForAction || !selectedAction) return;

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate the response
      const simulatedImpact: ActionImpact = {
        cap_savings:
          selectedAction === "cut"
            ? selectedPlayerForAction.cap_hit - selectedPlayerForAction.dead_cap
            : selectedAction === "restructure"
            ? -Math.round(selectedPlayerForAction.base_salary * 0.3)
            : -Math.round(selectedPlayerForAction.overall_score * 200000),
        dead_cap_increase:
          selectedAction === "cut"
            ? selectedPlayerForAction.dead_cap
            : selectedAction === "restructure"
            ? Math.round(selectedPlayerForAction.base_salary * 0.3)
            : 0,
        cap_space_after: teamData
          ? teamData.team.top_51_space +
            (selectedAction === "cut"
              ? selectedPlayerForAction.cap_hit -
                selectedPlayerForAction.dead_cap
              : selectedAction === "restructure"
              ? -Math.round(selectedPlayerForAction.base_salary * 0.3)
              : -Math.round(selectedPlayerForAction.overall_score * 200000))
          : 0,
        team_rating_change:
          selectedAction === "cut"
            ? -0.5
            : selectedAction === "sign" || selectedAction === "resign"
            ? 0.3
            : 0,
        position_impact: `This action will ${
          selectedAction === "cut" ? "weaken" : "strengthen"
        } your ${selectedPlayerForAction.position} group.`,
      };

      setActionImpact(simulatedImpact);
    } catch (err) {
      console.error("Error predicting action impact:", err);
    }
  };

  // Execute player action
  const executePlayerAction = async () => {
    if (!selectedPlayerForAction || !selectedAction || !teamData) return;

    try {
      // In a real app, this would be an API call
      // For now, we'll just update the local state

      if (selectedAction === "cut") {
        // Remove player from team
        setTeamData({
          ...teamData,
          players: teamData.players.filter(
            (p) => p.player_name !== selectedPlayerForAction.player_name
          ),
          team: {
            ...teamData.team,
            top_51_space:
              teamData.team.top_51_space +
              (selectedPlayerForAction.cap_hit -
                selectedPlayerForAction.dead_cap),
            dead_money:
              teamData.team.dead_money + selectedPlayerForAction.dead_cap,
          },
        });
      } else if (selectedAction === "restructure") {
        // Update player contract
        setTeamData({
          ...teamData,
          players: teamData.players.map((p) =>
            p.player_name === selectedPlayerForAction.player_name
              ? {
                  ...p,
                  base_salary: p.base_salary * 0.7,
                  bonus: p.bonus + p.base_salary * 0.3,
                  dead_cap: p.dead_cap + p.base_salary * 0.3,
                }
              : p
          ),
          team: {
            ...teamData.team,
            top_51_space:
              teamData.team.top_51_space -
              Math.round(selectedPlayerForAction.base_salary * 0.3),
          },
        });
      } else if (selectedAction === "sign" || selectedAction === "resign") {
        // Add player to team or update contract
        const newSalary = selectedPlayerForAction.overall_score * 200000;

        if (selectedAction === "sign") {
          // Add free agent to team
          setTeamData({
            ...teamData,
            players: [
              ...teamData.players,
              {
                ...selectedPlayerForAction,
                cap_hit: newSalary,
                base_salary: newSalary * 0.8,
                bonus: newSalary * 0.2,
                dead_cap: newSalary * 0.2,
              },
            ],
            team: {
              ...teamData.team,
              top_51_space: teamData.team.top_51_space - newSalary,
            },
          });

          // Remove from free agents
          setFreeAgents(
            freeAgents.filter(
              (p) => p.player_name !== selectedPlayerForAction.player_name
            )
          );
        } else {
          // Update existing player contract
          setTeamData({
            ...teamData,
            players: teamData.players.map((p) =>
              p.player_name === selectedPlayerForAction.player_name
                ? {
                    ...p,
                    cap_hit: newSalary,
                    base_salary: newSalary * 0.8,
                    bonus: newSalary * 0.2,
                    dead_cap: newSalary * 0.2,
                    contract_years: 4,
                  }
                : p
            ),
            team: {
              ...teamData.team,
              top_51_space:
                teamData.team.top_51_space -
                (newSalary - selectedPlayerForAction.cap_hit),
            },
          });
        }
      } else if (
        selectedAction === "tag-franchise" ||
        selectedAction === "tag-transition"
      ) {
        // Apply tag to player
        const tagCost = selectedPlayerForAction.overall_score * 300000;

        setTeamData({
          ...teamData,
          players: teamData.players.map((p) =>
            p.player_name === selectedPlayerForAction.player_name
              ? {
                  ...p,
                  cap_hit: tagCost,
                  base_salary: tagCost,
                  bonus: 0,
                  dead_cap: 0,
                  contract_years: 1,
                  status:
                    selectedAction === "tag-franchise"
                      ? "Franchise Tagged"
                      : "Transition Tagged",
                }
              : p
          ),
          team: {
            ...teamData.team,
            top_51_space:
              teamData.team.top_51_space -
              (tagCost - selectedPlayerForAction.cap_hit),
          },
        });
      }

      onOpenChange();
      setSelectedPlayerForAction(null);
      setSelectedAction(null);
      setActionImpact(null);
      setSelectedPlayers([]);
    } catch (err) {
      console.error("Error executing player action:", err);
    }
  };
  // Handle player selection
  const handlePlayerSelect = (playerName: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerName)
        ? prev.filter((name) => name !== playerName)
        : [...prev, playerName]
    );
  };

  // Open action modal for a player
  const openActionModal = (player: Player, action: string) => {
    setSelectedPlayerForAction(player);
    setSelectedAction(action);
    setActionImpact(null);
    onOpen();
  };

  // Get color based on cap space
  const getCapSpaceColor = (amount: number) => {
    if (!teamData) return "success";
    const percentage = (amount / teamData.team.total_cap) * 100;
    if (percentage < 5) return "danger";
    if (percentage < 10) return "warning";
    return "success";
  };

  // Get color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 85) return "success";
    if (rating >= 70) return "primary";
    if (rating >= 60) return "warning";
    return "danger";
  };
  useEffect(() => {
    fetchData();
  }, []);
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
            onClick={() => fetchData()}
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-sport-navy to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-center mb-2 text-sport-gold">
            {teamData.team.team_name}
          </h1>
          <p className="text-xl text-gray-400 text-center mb-8">
            Roster Management
          </p>
        </motion.div>

        {/* Team Cap Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-sport-gray/50 border-sport-gray p-6">
            <DollarSign className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Current Cap Space</h3>
            <p className="text-2xl font-bold text-green-400">
              {formatCurrency(teamData.team.top_51_space)}
            </p>
          </Card>
          <Card className="bg-sport-gray/50 border-sport-gray p-6">
            <RefreshCw className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Total Cap</h3>
            <p className="text-2xl font-bold text-blue-400">
              {formatCurrency(teamData.team.total_cap)}
            </p>
          </Card>
          <Card className="bg-sport-gray/50 border-sport-gray p-6">
            <Users className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Active Players</h3>
            <p className="text-2xl font-bold text-purple-400">
              {teamData.players.length}
            </p>
          </Card>
          <Card className="bg-sport-gray/50 border-sport-gray p-6">
            <DollarSign className="w-8 h-8 text-red-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Dead Money</h3>
            <p className="text-2xl font-bold text-red-400">
              {formatCurrency(teamData.team.dead_money)}
            </p>
          </Card>
        </div>
        <Tabs
          aria-label="Roster Management Options"
          className="w-full"
          color="primary"
          variant="underlined"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          {/* Cut/Restructure Tab */}
          <Tab key="cut-restructure" title="Cut/Restructure">
            <Card className="bg-sport-gray/50 border-sport-gray p-6">
              <div className="flex justify-between mb-6">
                <div className="space-x-2">
                  <Button
                    color="danger"
                    isDisabled={selectedPlayers.length !== 1}
                    className="gap-2"
                    onClick={() => {
                      const player = teamData.players.find((p) =>
                        selectedPlayers.includes(p.player_name)
                      );
                      if (player) openActionModal(player, "cut");
                    }}
                  >
                    <Scissors className="w-4 h-4" />
                    Cut Selected
                  </Button>
                  <Button
                    color="secondary"
                    isDisabled={selectedPlayers.length !== 1}
                    className="gap-2"
                    onClick={() => {
                      const player = teamData.players.find((p) =>
                        selectedPlayers.includes(p.player_name)
                      );
                      if (player) openActionModal(player, "restructure");
                    }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Restructure
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3">Select</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Position</th>
                      <th className="text-left p-3">Age</th>
                      <th className="text-left p-3">Rating</th>
                      <th className="text-left p-3">Cap Hit</th>
                      <th className="text-left p-3">Base Salary</th>
                      <th className="text-left p-3">Bonus</th>
                      <th className="text-left p-3">Dead Cap</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.players.map((player) => (
                      <tr
                        key={player.player_name}
                        className="border-b border-gray-700 hover:bg-sport-gray/30 transition-colors"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedPlayers.includes(
                              player.player_name
                            )}
                            onChange={() =>
                              handlePlayerSelect(player.player_name)
                            }
                            className="rounded border-gray-400 text-blue-500 focus:ring-blue-500"
                          />
                        </td>
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
                        <td className="p-3">{formatCurrency(player.bonus)}</td>
                        <td className="p-3">
                          {formatCurrency(player.dead_cap)}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button
                              color="danger"
                              size="sm"
                              variant="light"
                              onClick={() => openActionModal(player, "cut")}
                            >
                              Cut
                            </Button>
                            <Button
                              color="secondary"
                              size="sm"
                              variant="light"
                              onClick={() =>
                                openActionModal(player, "restructure")
                              }
                            >
                              Restructure
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tab>

          {/* Re-sign/Tag Tab */}
          <Tab key="resign-tag" title="Re-sign/Tag">
            <Card className="bg-sport-gray/50 border-sport-gray p-6">
              <div className="flex justify-between mb-6">
                <div className="space-x-2">
                  <Button
                    color="primary"
                    isDisabled={selectedPlayers.length !== 1}
                    className="gap-2"
                    onClick={() => {
                      const player = freeAgents.find((p) =>
                        selectedPlayers.includes(p.player_name)
                      );
                      if (player) openActionModal(player, "resign");
                    }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Re-sign Selected
                  </Button>
                  <Button
                    color="warning"
                    isDisabled={selectedPlayers.length !== 1}
                    className="gap-2"
                    onClick={() => {
                      const player = freeAgents.find((p) =>
                        selectedPlayers.includes(p.player_name)
                      );
                      console.log(player);
                      if (player) openActionModal(player, "tag-franchise");
                    }}
                  >
                    <Tag className="w-4 h-4" />
                    Franchise Tag
                  </Button>
                  <Button
                    color="secondary"
                    isDisabled={selectedPlayers.length !== 1}
                    className="gap-2"
                    onClick={() => {
                      const player = freeAgents.find((p) =>
                        selectedPlayers.includes(p.player_name)
                      );
                      if (player) openActionModal(player, "tag-transition");
                    }}
                  >
                    <Tag className="w-4 h-4" />
                    Transition Tag
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3">Select</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Position</th>
                      <th className="text-left p-3">Age</th>
                      <th className="text-left p-3">Rating</th>
                      <th className="text-left p-3">Current Contract</th>
                      <th className="text-left p-3">Estimated Value</th>
                      <th className="text-left p-3">Tag Cost</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {freeAgents
                      .filter((player) =>
                        player.team_code.includes(teamData.team.team_code)
                      )
                      .map((player) => {
                        // Calculate estimated contract value based on player rating
                        const estimatedValue = player.overall_score * 200000;
                        // Calculate tag cost (simplified - would come from backend in real app)
                        const tagCost = player.overall_score * 300000;

                        return (
                          <tr
                            key={player.player_name}
                            className="border-b border-gray-700 hover:bg-sport-gray/30 transition-colors"
                          >
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={selectedPlayers.includes(
                                  player.player_name
                                )}
                                onChange={() => {
                                  handlePlayerSelect(player.player_name);
                                }}
                                className="rounded border-gray-400 text-blue-500 focus:ring-blue-500"
                              />
                            </td>
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
                            <td className="p-3">
                              {formatCurrency(player.cap_hit)}
                            </td>
                            <td className="p-3">
                              {formatCurrency(estimatedValue)}
                            </td>
                            <td className="p-3">{formatCurrency(tagCost)}</td>
                            <td className="p-3">
                              <div className="flex gap-1">
                                <Button
                                  color="primary"
                                  size="sm"
                                  variant="light"
                                  onClick={() =>
                                    openActionModal(player, "resign")
                                  }
                                >
                                  Re-sign
                                </Button>
                                <Button
                                  color="warning"
                                  size="sm"
                                  variant="light"
                                  onClick={() =>
                                    openActionModal(player, "tag-franchise")
                                  }
                                >
                                  F-Tag
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tab>

          {/* Free Agency Tab */}
          <Tab key="free-agency" title="Free Agency">
            <Card className="bg-sport-gray/50 border-sport-gray p-6">
              <div className="flex justify-between mb-6">
                <div className="space-x-2">
                  <Button
                    color="success"
                    isDisabled={selectedPlayers.length !== 1}
                    className="gap-2"
                    onClick={() => {
                      const player = freeAgents.find((p) =>
                        selectedPlayers.includes(p.player_name)
                      );
                      if (player) openActionModal(player, "sign");
                    }}
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Selected
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">Available Cap Space:</span>
                  <span className="font-bold text-green-400">
                    {formatCurrency(teamData.team.top_51_space)}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3">Select</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Position</th>
                      <th className="text-left p-3">Age</th>
                      <th className="text-left p-3">Rating</th>
                      <th className="text-left p-3">Estimated Value</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {freeAgents.map((player) => {
                      // Calculate estimated contract value based on player rating
                      const estimatedValue = player.overall_score * 200000;

                      return (
                        <tr
                          key={player.player_name}
                          className="border-b border-gray-700 hover:bg-sport-gray/30 transition-colors"
                        >
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={selectedPlayers.includes(
                                player.player_name
                              )}
                              onChange={() =>
                                handlePlayerSelect(player.player_name)
                              }
                              className="rounded border-gray-400 text-blue-500 focus:ring-blue-500"
                            />
                          </td>
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
                          <td className="p-3">
                            {formatCurrency(estimatedValue)}
                          </td>
                          <td className="p-3">
                            <Button
                              color="success"
                              size="sm"
                              variant="light"
                              onClick={() => openActionModal(player, "sign")}
                            >
                              Sign
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </Tab>
        </Tabs>
        {/* Action Modal */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          scrollBehavior="inside"
          classNames={{
            backdrop: "bg-black/70",
            base: "bg-sport-gray text-white",
            body: "py-6",
            header: "border-b border-gray-700",
            footer: "border-t border-gray-700",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold">
                    {selectedAction === "cut" && "Cut Player"}
                    {selectedAction === "restructure" && "Restructure Contract"}
                    {selectedAction === "resign" && "Re-sign Player"}
                    {selectedAction === "tag-franchise" &&
                      "Apply Franchise Tag"}
                    {selectedAction === "tag-transition" &&
                      "Apply Transition Tag"}
                    {selectedAction === "sign" && "Sign Free Agent"}
                  </h3>
                  {selectedPlayerForAction && (
                    <p className="text-gray-300">
                      {selectedPlayerForAction.player_name} -{" "}
                      {selectedPlayerForAction.position} - Rating:{" "}
                      {selectedPlayerForAction.overall_score}
                    </p>
                  )}
                </ModalHeader>
                <ModalBody>
                  {selectedPlayerForAction && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-sport-gray/70 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Contract Details</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Current Cap Hit:</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  selectedPlayerForAction.cap_hit
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Base Salary:</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  selectedPlayerForAction.base_salary
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Bonus:</span>
                              <span className="font-medium">
                                {formatCurrency(selectedPlayerForAction.bonus)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Dead Cap:</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  selectedPlayerForAction.dead_cap
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-sport-gray/70 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">
                            Player Attributes
                          </h4>
                          <div className="space-y-1 text-sm">
                            {Object.entries(
                              getRelevantAbilities(selectedPlayerForAction)
                            ).map(([ability, rating]) => (
                              <div
                                key={ability}
                                className="flex justify-between"
                              >
                                <span>{ability}:</span>
                                <span
                                  className={`font-medium ${getAbilityColor(
                                    rating as number
                                  )}`}
                                >
                                  {rating}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Button
                          color="primary"
                          className="gap-2"
                          onClick={predictActionImpact}
                        >
                          <BarChart2 className="w-4 h-4" />
                          Predict Impact
                        </Button>
                      </div>
                      {actionImpact && (
                        <div className="bg-sport-gray/70 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Predicted Impact</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>Cap Savings:</span>
                                <span
                                  className={`font-medium ${
                                    actionImpact.cap_savings > 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {actionImpact.cap_savings > 0 ? "+" : ""}
                                  {formatCurrency(actionImpact.cap_savings)}
                                </span>
                              </div>
                              <Progress
                                value={Math.min(
                                  100,
                                  Math.abs(
                                    (actionImpact.cap_savings /
                                      teamData.team.total_cap) *
                                      1000
                                  )
                                )}
                                color={
                                  actionImpact.cap_savings > 0
                                    ? "success"
                                    : "danger"
                                }
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>Dead Cap Change:</span>
                                <span
                                  className={`font-medium ${
                                    actionImpact.dead_cap_increase <= 0
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {actionImpact.dead_cap_increase > 0
                                    ? "+"
                                    : ""}
                                  {formatCurrency(
                                    actionImpact.dead_cap_increase
                                  )}
                                </span>
                              </div>
                              <Progress
                                value={Math.min(
                                  100,
                                  Math.abs(
                                    (actionImpact.dead_cap_increase /
                                      teamData.team.total_cap) *
                                      1000
                                  )
                                )}
                                color={
                                  actionImpact.dead_cap_increase <= 0
                                    ? "success"
                                    : "danger"
                                }
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>Cap Space After:</span>
                                <span
                                  className={`font-medium ${
                                    actionImpact.cap_space_after >
                                    teamData.team.top_51_space
                                      ? "text-green-400"
                                      : "text-amber-400"
                                  }`}
                                >
                                  {formatCurrency(actionImpact.cap_space_after)}
                                </span>
                              </div>
                              <Progress
                                value={Math.min(
                                  100,
                                  (actionImpact.cap_space_after /
                                    teamData.team.total_cap) *
                                    100
                                )}
                                color={getCapSpaceColor(
                                  actionImpact.cap_space_after
                                )}
                                className="h-2"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span>Team Rating Impact:</span>
                              {actionImpact.team_rating_change > 0 ? (
                                <div className="flex items-center text-green-400">
                                  <TrendingUp className="w-4 h-4 mr-1" />
                                  <span>
                                    +
                                    {actionImpact.team_rating_change.toFixed(1)}
                                  </span>
                                </div>
                              ) : actionImpact.team_rating_change < 0 ? (
                                <div className="flex items-center text-red-400">
                                  <TrendingDown className="w-4 h-4 mr-1" />
                                  <span>
                                    {actionImpact.team_rating_change.toFixed(1)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-400">No change</span>
                              )}
                            </div>
                            <div>
                              <span>Position Impact:</span>
                              <p className="text-sm text-gray-300 mt-1">
                                {actionImpact.position_impact}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onClick={() => onClose()}
                    className="gap-1"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    color="success"
                    onClick={() => {
                      executePlayerAction();
                      onClose();
                    }}
                    className="gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
