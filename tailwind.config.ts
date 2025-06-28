
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
        // Identidade Visual Sofisticada - Tema Espelho Invertido
        espelhoinvertido: {
          primary: '#2c3e50',      // Azul escuro reflexivo
          secondary: '#708090',     // Cinza espelho
          accent: '#FFD700',       // Dourado revelação
          light: '#f8fafc',        // Branco suave
          mirror: '#e2e8f0',       // Cinza espelho claro
          shadow: '#0f172a',       // Sombra profunda
          reflection: '#cbd5e1',   // Reflexo sutil
          truth: '#059669',        // Verde verdade
          bias: '#ef4444',         // Vermelho viés
          gold: '#FFD700',         // Dourado (compatibilidade)
          silver: '#708090',       // Prata (compatibilidade)
          dark: '#0f172a',         // Preto profundo (compatibilidade)
          text: '#2c3e50',         // Texto principal (compatibilidade)
        },
        // Cores temáticas para diferentes perspectivas
        perspective: {
          rafael: '#8B1538',       // Bordô para Rafael
          luisa: '#1e40af',        // Azul para Luísa
          synthesis: '#7c3aed',    // Roxo para síntese
        },
        burgundy: 'hsl(var(--burgundy))',
        navy: 'hsl(var(--navy))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
        shimmer: {
          '0%': { backgroundPosition: '-40rem 0' },
          '100%': { backgroundPosition: '40rem 0' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        // Animações específicas do tema espelho
        'mirror-flip': {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' }
        },
        'reflection-shimmer': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        },
        'bias-pulse': {
          '0%, 100%': { 
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            transform: 'scale(1)' 
          },
          '50%': { 
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            transform: 'scale(1.02)' 
          }
        },
        'truth-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(5, 150, 105, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(5, 150, 105, 0.6)' 
          }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s infinite linear',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 10s linear infinite',
        // Animações temáticas
        'mirror-flip': 'mirror-flip 3s ease-in-out infinite',
        'reflection-shimmer': 'reflection-shimmer 2s ease-in-out infinite',
        'bias-pulse': 'bias-pulse 3s ease-in-out infinite',
        'truth-glow': 'truth-glow 2s ease-in-out infinite',
			},
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Crimson Text', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Monaco', 'monospace'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Sans Pro', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dot-pattern': 'radial-gradient(rgba(44, 62, 80, 0.1) 1px, transparent 0)',
        'dark-dot-pattern': 'radial-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 0)',
        // Gradientes temáticos
        'mirror-gradient': 'linear-gradient(135deg, #2c3e50 0%, #708090 50%, #FFD700 100%)',
        'reflection-gradient': 'linear-gradient(45deg, rgba(248, 250, 252, 0.9), rgba(226, 232, 240, 0.9))',
        'bias-gradient': 'linear-gradient(45deg, #ef4444, #FFD700)',
        'truth-gradient': 'linear-gradient(45deg, #059669, #FFD700)',
        'perspective-gradient': 'linear-gradient(135deg, #8B1538 0%, #1e40af 50%, #7c3aed 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        // Sombras temáticas
        'mirror': '0 4px 20px rgba(44, 62, 80, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'reflection': '0 8px 30px rgba(255, 215, 0, 0.2), 0 2px 8px rgba(44, 62, 80, 0.1)',
        'bias': '0 4px 20px rgba(239, 68, 68, 0.2)',
        'truth': '0 4px 20px rgba(5, 150, 105, 0.2)',
        'glow': '0 0 15px rgba(255, 215, 0, 0.3)',
        'gold-glow': '0 0 20px rgba(255, 215, 0, 0.4)',
      },
      // Espaçamentos específicos para layout sofisticado
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
