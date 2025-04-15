"use client";

import { motion } from "framer-motion";
import { Card } from "@nextui-org/react";
import Link from "next/link";
import { removeAllListeners } from "process";
import { te } from "date-fns/locale";

const NFL_TEAMS = [
  {
    team_code: "ARI",
    name: "Arizona Cardinals",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/u9fltoslqdsyao8cpm0k",
    division: "NFC West",
  },
  {
    team_code: "ATL",
    name: "Atlanta Falcons",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/d8m7hzpsbrl6pnqht8op",
    division: "NFC South",
  },
  {
    team_code: "BAL",
    name: "Baltimore Ravens",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ucsdijmddsqcj1i9tddd",
    division: "AFC North",
  },
  {
    team_code: "BUF",
    division: "AFC East",
  },
  {
    team_code: "CAR",
    name: "Carolina P anthers",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ervfzgrqdpnc7lh5gqwq",
    division: "NFC South",
  },
  {
    team_code: "CHI",
    name: "Chicago Bears",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ra0poq2ivwyahbaq86d2",
    division: "NFC North",
  },
  {
    team_code: "CIN",
    name: "Cincinnati Bengals",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/okxpteoliyayufypqalq",
    division: "AFC North",
  },
  {
    team_code: "CLE",
    name: "Cleveland Browns",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/fgbn8acp4opvyxk13dcy",
    division: "AFC North",
  },
  {
    team_code: "DAL",
    name: "Dallas Cowboys",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ieid8hoygzdlmzo0tnf6",
    division: "NFC East",
  },
  {
    team_code: "DEN",
    name: "Denver Broncos",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/t0p7m5cjdjy18rnzzqbx",
    division: "AFC West",
  },
  {
    team_code: "DET",
    name: "Detroit Lions",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ocvxwnapdvwevupe4tpr",
    division: "NFC North",
  },
  {
    team_code: "GB",
    name: "Green Bay Packers",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/gppfvr7n8gljgjaqux2x",
    division: "NFC North",
  },
  {
    team_code: "HOU",
    name: "Houston Texans",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/bpx88i8nw4nnabuq0oob",
    division: "AFC South",
  },
  {
    team_code: "IND",
    name: "Indianapolis Colts",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ketwqeuschqzjsllbid5",
    division: "AFC South",
  },
  {
    team_code: "JAC",
    name: "Jacksonville Jaguars",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/qycbib6ivrm9dqaexryk",
    division: "AFC South",
  },
  {
    team_code: "KC",
    name: "Kansas City Chiefs",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ujshjqvmnxce8m4obmvs",
    division: "AFC West",
  },
  {
    team_code: "LAC",
    name: "Las Vegas Raiders",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/gzcojbzcyjgubgyb6xf2",
    division: "AFC West",
  },
  {
    team_code: "LAR",
    name: "Los Angeles Chargers",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ayvwcmluj2ohkdlbiegi",
    division: "AFC West",
  },
  {
    team_code: "LV",
    name: "Los Angeles Rams",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ayvwcmluj2ohkdlbiegi",
    division: "NFC West",
  },
  {
    team_code: "MIA",
    name: "Miami Dolphins",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/lits6p8ycthy9to70bnt",
    division: "AFC East",
  },
  {
    team_code: "MIN",
    name: "Minnesota Vikings",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/teguylrnqqmfcwxvcmmz",
    division: "NFC North",
  },
  {
    team_code: "NE",
    name: "New England Patriots",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/moyfxx3dq5pio4aiftnc",
    division: "AFC East",
  },
  {
    team_code: "NO",
    name: "New Orleans Saints",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/grhjkahghjkk17v43hdx",
    division: "NFC South",
  },
  {
    team_code: "NYG",
    name: "New York Giants",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/t6mhdmgizi6qhndh8b9p",
    division: "NFC East",
  },
  {
    team_code: "NYJ",
    name: "New York Jets",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/ekijosiae96gektbo4iw",
    division: "AFC East",
  },
  {
    team_code: "PHI",
    name: "Philadelphia Eagles",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/puhrqgj71gobgdkdo6uq",
    division: "NFC East",
  },
  {
    team_code: "PIT",
    name: "Pittsburgh Steelers",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/xujg9t3t4u5nmjgr54wx",
    division: "AFC North",
  },
  {
    team_code: "SF",
    name: "San Francisco 49ers",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/dxibuyxbk0b9ua5ih9hn",
    division: "NFC West",
  },
  {
    team_code: "SEA",
    name: "Seattle Seahawks",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/gcytzwpjdzbpwnwxincg",
    division: "NFC West",
  },
  {
    team_code: "TB",
    name: "Tampa Bay Buccaneers",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/v8uqiualryypwqgvwcih",
    division: "NFC South",
  },
  {
    team_code: "TEN",
    name: "Tennessee Titans",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/pln44vuzugjgipyidsre",
    division: "AFC South",
  },
  {
    team_code: "WAS",
    name: "Washington Commanders",
    logo: "https://static.www.nfl.com/image/private/f_auto/league/xymxwrxtyj9fhaemhdyd",
    division: "NFC East",
  },
];

const DIVISIONS = [
  "AFC North",
  "AFC South",
  "AFC East",
  "AFC West",
  "NFC North",
  "NFC South",
  "NFC East",
  "NFC West",
];

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sport-navy to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-sport-gold via-white to-sport-gold bg-clip-text text-transparent">
            NFL GM Simulator
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Select your team to begin your journey
          </p>
        </motion.div>

        {DIVISIONS.map((division) => (
          <div key={division} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-sport-blue flex items-center">
              <span className="w-2 h-8 bg-sport-red mr-3 rounded-r"></span>
              {division}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {NFL_TEAMS.filter((team) => team.division === division).map(
                (team, index) => (
                  <motion.div
                    key={team.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/teams/${team.team_code.toLowerCase()}`}>
                      <Card className="team-card bg-sport-navy/50 border border-white/5 hover:border-sport-blue/50">
                        <div className="p-6 text-center">
                          <div className="relative w-32 h-32 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={team.logo}
                              alt={`${team.name} logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-white">
                            {team.name}
                          </h3>
                          <p className="text-sport-gold">{team.division}</p>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
