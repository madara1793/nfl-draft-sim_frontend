import TeamPageClient from "./TeamPageClient";
import { Metadata } from "next";

// This function tells Next.js which paths to pre-render
export async function generateStaticParams() {
  // Return an array of objects with the teamSlug parameter
  return [
    { teamSlug: "bal" },
    { teamSlug: "buf" },
    { teamSlug: "cin" },
    { teamSlug: "cle" },
    { teamSlug: "den" },
    { teamSlug: "hou" },
    { teamSlug: "ind" },
    { teamSlug: "jax" },
    { teamSlug: "kc" },
    { teamSlug: "lv" },
    { teamSlug: "lac" },
    { teamSlug: "mia" },
    { teamSlug: "ne" },
    { teamSlug: "nyj" },
    { teamSlug: "pit" },
    { teamSlug: "ten" },
    { teamSlug: "ari" },
    { teamSlug: "atl" },
    { teamSlug: "car" },
    { teamSlug: "chi" },
    { teamSlug: "dal" },
    { teamSlug: "det" },
    { teamSlug: "gb" },
    { teamSlug: "lar" },
    { teamSlug: "min" },
    { teamSlug: "no" },
    { teamSlug: "nyg" },
    { teamSlug: "phi" },
    { teamSlug: "sea" },
    { teamSlug: "sf" },
    { teamSlug: "tb" },
    { teamSlug: "was" },
  ];
}

// Optional: Generate metadata for the page
export const generateMetadata = ({
  params,
}: {
  params: { teamSlug: string };
}): Metadata => {
  const formattedTeamName = params.teamSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTeamName} Team Details | NFL Draft Simulator`,
    description: `View team details, roster, and salary cap information for the ${formattedTeamName}.`,
  };
};

export default function TeamPage({ params }: { params: { teamSlug: string } }) {
  return <TeamPageClient params={params} />;
}
