"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Users, FileText } from "lucide-react";
import Logo from "./logo";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sport-navy/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:text-sport-gold transition-colors"
            >
              <Logo size="medium" />
              <span className="font-bold text-lg">NFL GM Simulator</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/teams">
                <span className="nav-link text-white hover:text-sport-gold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Teams
                </span>
              </Link>
              <Link href="/documentation">
                <span className="nav-link text-white hover:text-sport-gold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documentation
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              className="bg-sport-red hover:bg-sport-red/80 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              endContent={<Logo size="small" />}
            >
              Start Simulation
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
