"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  BarChart as ChartBar,
  FolderRoot as Football,
  FileText,
  Star,
  DollarSign,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Header from "@/components/Header";

const testimonials = [
  {
    quote: "The most realistic NFL management experience I've ever had.",
    author: "John D.",
    role: "Fantasy Football Veteran",
  },
  {
    quote: "Makes you feel like a real NFL GM making tough decisions.",
    author: "Mike R.",
    role: "Sports Analyst",
  },
  {
    quote: "Incredible depth in player development and team building.",
    author: "Sarah W.",
    role: "Football Enthusiast",
  },
];

const achievements = [
  {
    title: "Active Users",
    value: "100K+",
    icon: Users,
    color: "text-sport-blue",
  },
  {
    title: "Teams Managed",
    value: "500K+",
    icon: Trophy,
    color: "text-sport-gold",
  },
  {
    title: "Success Stories",
    value: "50K+",
    icon: Star,
    color: "text-sport-red",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=2090&q=80')] bg-cover bg-center bg-fixed">
          <div className="min-h-screen bg-gradient-to-b from-sport-navy/95 via-sport-navy/85 to-sport-navy/70 pt-16">
            <div className="container mx-auto px-4 py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-24 h-24 mx-auto mb-8 bg-sport-red rounded-full flex items-center justify-center shadow-lg shadow-sport-red/20"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>
                <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-sport-gold via-white to-sport-gold bg-clip-text text-transparent [text-shadow:_2px_2px_10px_rgb(0_0_0_/_90%)]">
                  NFL GM Simulator
                </h1>
                <p className="text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Experience the thrill of managing an NFL team. Make trades,
                  draft future stars, and lead your team to glory.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/teams">
                    <Button
                      size="lg"
                      className="bg-sport-red hover:bg-sport-red/80 text-white px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                      startContent={<Trophy className="w-5 h-5" />}
                    >
                      Start Your GM Journey
                    </Button>
                  </Link>
                  <Link href="/documentation">
                    <Button
                      size="lg"
                      variant="bordered"
                      className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                      startContent={<FileText className="w-5 h-5" />}
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
                {[
                  {
                    icon: <Trophy className="w-12 h-12 mb-4 text-sport-gold" />,
                    title: "Build a Dynasty",
                    description:
                      "Make strategic decisions to create a championship-caliber team",
                  },
                  {
                    icon: <Users className="w-12 h-12 mb-4 text-sport-gold" />,
                    title: "Manage Your Roster",
                    description:
                      "Handle contracts, trades, and free agency like a pro",
                  },
                  {
                    icon: (
                      <Football className="w-12 h-12 mb-4 text-sport-gold" />
                    ),
                    title: "Draft Future Stars",
                    description:
                      "Scout and select the next generation of NFL talent",
                  },
                  {
                    icon: (
                      <ChartBar className="w-12 h-12 mb-4 text-sport-gold" />
                    ),
                    title: "Advanced Analytics",
                    description:
                      "Use data-driven insights to make informed decisions",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="hero-card rounded-2xl text-center transform hover:scale-105 transition-all duration-200 border border-white/10 hover:border-sport-blue/50 group"
                  >
                    <div className="p-8">
                      <div className="flex justify-center transform group-hover:scale-110 transition-transform duration-200">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-gradient-to-r from-sport-navy via-black to-sport-navy">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sport-gold via-white to-sport-gold bg-clip-text text-transparent">
                Our Impact in Numbers
              </h2>
              <p className="text-xl text-gray-400">
                Join thousands of football enthusiasts managing their dream
                teams
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="hero-card p-8 rounded-2xl text-center"
                >
                  <achievement.icon
                    className={`w-12 h-12 mx-auto mb-4 ${achievement.color}`}
                  />
                  <h3 className="text-3xl font-bold mb-2">
                    {achievement.value}
                  </h3>
                  <p className="text-gray-400">{achievement.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-20 bg-[url('https://images.unsplash.com/photo-1508163223045-1880bc36e222?ixlib=rb-1.2.1&auto=format&fit=crop&w=2090&q=80')] bg-cover bg-fixed">
          <div className="bg-gradient-to-b from-black/90 to-sport-navy/90 py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sport-gold via-white to-sport-gold bg-clip-text text-transparent">
                  Comprehensive GM Experience
                </h2>
                <p className="text-xl text-gray-400">
                  Everything you need to build a championship team
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <DollarSign className="w-8 h-8 text-sport-gold" />,
                    title: "Salary Cap Management",
                    description:
                      "Navigate complex salary structures and stay under the cap while building a competitive roster.",
                  },
                  {
                    icon: <Award className="w-8 h-8 text-sport-gold" />,
                    title: "Player Development",
                    description:
                      "Nurture young talent and watch them develop into NFL stars under your guidance.",
                  },
                  {
                    icon: <ChartBar className="w-8 h-8 text-sport-gold" />,
                    title: "Performance Analytics",
                    description:
                      "Access detailed statistics and analytics to make data-driven decisions.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="hero-card p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-r from-sport-navy via-black to-sport-navy">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sport-gold via-white to-sport-gold bg-clip-text text-transparent">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-400">
                Join thousands of satisfied GMs
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="hero-card p-8 rounded-2xl"
                >
                  <div className="mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="inline-block w-5 h-5 text-sport-gold fill-sport-gold"
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6 text-gray-300">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[url('https://images.unsplash.com/photo-1484482340112-e1e2682b4856?ixlib=rb-1.2.1&auto=format&fit=crop&w=2090&q=80')] bg-cover bg-center">
          <div className="bg-gradient-to-b from-sport-navy/90 to-black/90 py-20">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sport-gold via-white to-sport-gold bg-clip-text text-transparent">
                  Ready to Build Your Dynasty?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Take control of your favorite NFL team and start your journey
                  to championship glory.
                </p>
                <Link href="/teams">
                  <Button
                    size="lg"
                    className="bg-sport-red hover:bg-sport-red/80 text-white px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                    endContent={<ArrowRight className="w-5 h-5" />}
                  >
                    Start Managing Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-sport-navy py-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="w-8 h-8 text-sport-gold" />
                  <span className="text-2xl font-bold text-white">
                    NFL GM Sim
                  </span>
                </div>
                <p className="text-gray-400">
                  The ultimate NFL management simulation experience.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/teams"
                      className="text-gray-400 hover:text-sport-gold transition-colors"
                    >
                      Teams
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/documentation"
                      className="text-gray-400 hover:text-sport-gold transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 hover:text-sport-gold transition-colors"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Features
                </h3>
                <ul className="space-y-2">
                  <li>
                    <span className="text-gray-400">Roster Management</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Draft Central</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Trade System</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Connect
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-sport-gold transition-colors"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-sport-gold transition-colors"
                    >
                      Discord
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-sport-gold transition-colors"
                    >
                      Reddit
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} NFL GM Simulator. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
