import {heroui} from '@heroui/theme';
import type { Config } from 'tailwindcss';
import { nextui } from "@nextui-org/react";

const config: Config = {
  darkMode: ['class'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/modal.js"
  ],
  theme: {
    extend: {
      colors: {
        'sport-red': '#E31837',
        'sport-blue': '#004C9E',
        'sport-gold': '#FFB81C',
        'sport-navy': '#0B162A',
        'sport-gray': '#2D3748',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=2090&q=80')",
      },
      borderColor: {
        border: 'hsl(var(--border))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [nextui({
    prefix: "nextui",addCommonColors: true,defaultTheme: "dark",defaultExtendTheme: "dark",layout: {
      spacingUnit: 4,disabledOpacity: 0.5,dividerWeight: "1px",fontSize: {
        tiny: "0.75rem",small: "0.875rem",medium: "1rem",large: "1.125rem",},lineHeight: {
        tiny: "1rem",small: "1.25rem",medium: "1.5rem",large: "1.75rem",},radius: {
        small: "8px",medium: "12px",large: "14px",},borderWidth: {
        small: "1px",medium: "2px",large: "3px",},},themes: {
      dark: {
        colors: {
          background: "#0B162A",foreground: "#FFFFFF",primary: {
            50: "#E6F1FE",100: "#CCE4FD",200: "#99C9FB",300: "#66AEF9",400: "#3393F7",500: "#004C9E",600: "#0060C4",700: "#004893",800: "#003062",900: "#001831",DEFAULT: "#004C9E",foreground: "#FFFFFF",},secondary: {
            DEFAULT: "#E31837",foreground: "#FFFFFF",},success: {
            DEFAULT: "#17B26A",foreground: "#FFFFFF",},warning: {
            DEFAULT: "#FFB81C",foreground: "#000000",},focus: "#004C9E",},},},}),heroui()],
};

export default config;