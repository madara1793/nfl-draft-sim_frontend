import TeamPageClient from './TeamPageClient';

// List of all NFL teams for static generation
const NFL_TEAMS = [
  "arizona-cardinals",
  "atlanta-falcons",
  "baltimore-ravens",
  "buffalo-bills",
  "carolina-panthers",
  "chicago-bears",
  "cincinnati-bengals",
  "cleveland-browns",
  "dallas-cowboys",
  "denver-broncos",
  "detroit-lions",
  "green-bay-packers",
  "houston-texans",
  "indianapolis-colts",
  "jacksonville-jaguars",
  "kansas-city-chiefs",
  "las-vegas-raiders",
  "los-angeles-chargers",
  "los-angeles-rams",
  "miami-dolphins",
  "minnesota-vikings",
  "new-england-patriots",
  "new-orleans-saints",
  "new-york-giants",
  "new-york-jets",
  "philadelphia-eagles",
  "pittsburgh-steelers",
  "san-francisco-49ers",
  "seattle-seahawks",
  "tampa-bay-buccaneers",
  "tennessee-titans",
  "washington-commanders"
];

export function generateStaticParams() {
  return NFL_TEAMS.map((team) => ({
    teamSlug: team,
  }));
}

export default function TeamPage({ params }: { params: { teamSlug: string } }) {
  return <TeamPageClient params={params} />;
}