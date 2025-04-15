"use client";

import { motion } from "framer-motion";
import { Tabs, Tab, Card } from "@nextui-org/react";
import {
  Book,
  FileText,
  HelpCircle,
  Settings,
  Users,
  DollarSign,
  Trophy,
  Gamepad2,
} from "lucide-react";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-center mb-2">Documentation</h1>
          <p className="text-xl text-gray-400 text-center mb-12">Everything you need to know about the NFL GM Simulator</p>
        </motion.div>

        <Tabs 
          aria-label="Documentation sections" 
          className="w-full"
          color="primary"
          variant="underlined"
        >
          <Tab key="getting-started" title="Getting Started">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Book className="w-6 h-6 text-blue-400" />
                    Welcome to NFL GM Simulator
                  </h2>
                  <p className="text-gray-300 mb-4">
                    NFL GM Simulator puts you in the role of an NFL General Manager, where you'll make crucial decisions
                    about your team's future. From drafting players to managing the salary cap, every choice matters.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Quick Start Guide</h3>
                  <ol className="space-y-4 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">1</div>
                      Select your team from the available NFL franchises
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">2</div>
                      Review your current roster and salary cap situation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">3</div>
                      Make strategic decisions about trades, free agency, and the draft
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">4</div>
                      Monitor your team's performance and adjust strategy accordingly
                    </li>
                  </ol>
                </section>
              </div>
            </Card>
          </Tab>

          <Tab key="features" title="Features">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      Roster Management
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Complete control over your 53-man roster</li>
                      <li>Player development tracking</li>
                      <li>Injury management</li>
                      <li>Depth chart organization</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      Salary Cap Management
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Contract negotiations</li>
                      <li>Salary cap planning</li>
                      <li>Free agency management</li>
                      <li>Contract restructuring</li>
                    </ul>
                  </section>
                </div>

                <div className="space-y-6">
                  <section>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      Draft Central
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Comprehensive scouting reports</li>
                      <li>Draft pick management</li>
                      <li>Prospect ranking system</li>
                      <li>Trade simulation</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-purple-400" />
                      Team Analysis
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Performance metrics</li>
                      <li>Team chemistry analysis</li>
                      <li>Strength of schedule</li>
                      <li>Future projections</li>
                    </ul>
                  </section>
                </div>
              </div>
            </Card>
          </Tab>

          <Tab key="gameplay" title="Gameplay Guide">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Gamepad2 className="w-6 h-6 text-purple-400" />
                    Gameplay Guide
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Season Timeline</h3>
                      <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Pre-season preparation and roster evaluation
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Regular season management and adjustments
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Trade deadline decisions
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Post-season strategy
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Key Decisions</h3>
                      <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Balancing short-term vs long-term success
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Managing the salary cap effectively
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Building through the draft vs free agency
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Developing young talent
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </Card>
          </Tab>

          <Tab key="faq" title="FAQ">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-400" />
                  Frequently Asked Questions
                </h2>
                
                {[
                  {
                    question: "How realistic is the simulation?",
                    answer: "The simulation uses real NFL data and sophisticated algorithms to provide a realistic GM experience, including actual salary cap rules, player statistics, and team dynamics."
                  },
                  {
                    question: "Can I make trades with other teams?",
                    answer: "Yes, you can propose and negotiate trades with AI-controlled teams. The trade system considers factors like team needs, cap space, and player values."
                  },
                  {
                    question: "How does player development work?",
                    answer: "Players develop based on various factors including age, playing time, coaching staff quality, and random events. Young players have higher potential for improvement."
                  },
                  {
                    question: "What happens if I exceed the salary cap?",
                    answer: "Exceeding the salary cap will result in penalties and restrictions on roster moves until you get back under the cap, just like in the real NFL."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 last:border-0 pb-6">
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}