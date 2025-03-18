import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 font-[family-name:var(--font-geist-sans)]">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-float"></div>
        <div className="absolute bottom-20 left-[15%] w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-float-slow"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center max-w-5xl w-full px-6 py-12">
        <div className="flex flex-col items-center gap-16 py-16">
          {/* Logo with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
            <Image
              className="dark:invert transition-transform hover:scale-110 duration-500 relative z-10 drop-shadow-lg"
              src="/assets/NFL.png"
              alt="Next.js logo"
              width={250}
              height={250}
              priority
            />
          </div>

          {/* Text content with enhanced styling */}
          <div className="text-center space-y-8 max-w-3xl">
            <h1 className="text-6xl font-black tracking-tight text-center relative mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
                Welcome to the Simulator
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-500 to-violet-600 rounded-full"></div>
            </h1>
          </div>

          {/* CTA button with enhanced effects */}
          <a
            className="group relative overflow-hidden rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-lg py-4 px-10 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20 flex items-center gap-4 transform hover:scale-105"
            href="/teams"
            target="_self"
            rel="noopener noreferrer"
          >
            {/* Button background gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

            {/* Button shine effect */}
            <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-all duration-1000 transform -skew-x-12 -translate-x-full group-hover:translate-x-[400%]"></span>

            <Image
              className="relative z-10 dark:invert transition-transform group-hover:rotate-12 duration-500"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={28}
              height={28}
            />
            <span className="relative z-10 tracking-wide">
              Start Simulator
            </span>
          </a>
        </div>
      </main>

      {/* Enhanced footer */}
      <footer className="relative z-10 w-full text-center py-8 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Simulator. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
