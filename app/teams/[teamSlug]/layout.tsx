import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function TeamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { teamSlug: string };
}) {
  return (
    <div>
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href={`/teams/${params.teamSlug}`}>
                <Button variant="ghost">Overview</Button>
              </Link>
              <Link href={`/teams/${params.teamSlug}/roster-management`}>
                <Button variant="ghost">Roster Management</Button>
              </Link>
              <Link href={`/teams/${params.teamSlug}/draft`}>
                <Button variant="ghost">Draft Central</Button>
              </Link>
              <Link href={`/teams/${params.teamSlug}/analysis`}>
                <Button variant="ghost">Analysis</Button>
              </Link>
              <Link href={`/teams/${params.teamSlug}/results`}>
                <Button variant="ghost">Results</Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/documentation">
                <Button variant="ghost">Documentation</Button>
              </Link>
              <Link href="/teams">
                <Button variant="outline">Change Team</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}