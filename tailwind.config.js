import {heroui} from "@heroui/theme"
import tailwindcssAnimate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-sans)'
  			],
  			mono: [
  				'var(--font-mono)'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			brand: {
				'100': '#00D630',
				DEFAULT: '#00D748'
			},
			red: '#FF7474',
			error: '#b80000',
			green: '#3DD9B3',
			blue: '#56B8FF',
			pink: '#EEA8FD',
			orange: '#F9AB72',
			light: {
				'100': '#333F4E',
				'200': '#A3B2C7',
				'300': '#F2F5F9',
				'400': '#F2F4F8'
			},

  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		boxShadow: {
			'drop-1': '0px 10px 30px 0px rgba(66, 71, 97, 0.1)',
			'drop-2': '0 8px 30px 0 rgba(65, 89, 214, 0.3)',
			'drop-3': '0 8px 30px 0 rgba(65, 89, 214, 0.1)'
		},

  		keyframes: {
  			wave: {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-100%)' }
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
  			aurora: {
  				'0%': {
  					backgroundPosition: '0% 50%',
  					transform: 'rotate(-5deg) scale(0.9)'
  				},
  				'25%': {
  					backgroundPosition: '50% 100%',
  					transform: 'rotate(5deg) scale(1.1)'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%',
  					transform: 'rotate(-3deg) scale(0.95)'
  				},
  				'75%': {
  					backgroundPosition: '50% 0%',
  					transform: 'rotate(3deg) scale(1.05)'
  				},
  				'100%': {
  					backgroundPosition: '0% 50%',
  					transform: 'rotate(-5deg) scale(0.9)'
  				}
  			}
  		},
  		animation: {
  			'wave': 'wave 15s linear infinite',
  			'wave-delayed': 'wave 15s linear -7.5s infinite',
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			aurora: 'aurora 8s ease-in-out infinite alternate'
  		},
		backgroundImage:{

			'custom-gradient': 'linear-gradient(to top right, #ec4899, #fbbf24)',
		}
  	}
  },
  darkMode: ["class"],
  plugins: [heroui(),],
}
