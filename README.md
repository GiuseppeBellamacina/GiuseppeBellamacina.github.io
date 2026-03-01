# Giuseppe Bellamacina - Portfolio

[![Deploy to GitHub Pages](https://github.com/GiuseppeBellamacina/GiuseppeBellamacina.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/GiuseppeBellamacina/GiuseppeBellamacina.github.io/actions/workflows/deploy.yml)

A modern, cyberpunk-themed portfolio website showcasing AI/ML engineering projects and skills with immersive visual effects.

🌐 **Live Demo**: [giuseppebellamacina.github.io](https://giuseppebellamacina.github.io)

## ✨ Features

### 🎨 Visual Effects

- **Matrix Rain Animation** - Dynamic character rain effect on the navigation bar
- **Seasonal Effects System** - Automatic themed animations based on calendar periods
  - 🎄 **Christmas Snow** (Dec 1 - Jan 6) - Falling snowflakes with natural physics
  - 🌟 **Summer Fireflies** (Jun-Aug) - Glowing fireflies with smooth fade animations
  - 🎆 **New Year** (Dec 31 - Jan 2) - Confetti and firework explosions with rotation
- **Neural Network Visualization** - Interactive canvas-based feedforward network with animated impulse propagation
- **Binary Particle System** - Animated binary digits with neon glow effects
- **Shooting Stars & Constellations** - Space-themed background animations
- **Glitch Effects** - Cyberpunk-style text animations and hover effects

### 🚀 Performance

- **Lazy Loading** - All heavy visual effects use IntersectionObserver for viewport-based rendering
- **GPU Acceleration** - CSS animations optimized with `will-change` and hardware acceleration
- **Pause When Offscreen** - Animations automatically pause when not visible to conserve resources
- **Optimized Rendering** - Canvas effects capped at optimal frame rates

### 📱 Responsive Design

- **Mobile-First Approach** - Fully responsive across all devices
- **Futuristic Hamburger Menu** - Cyberpunk-styled mobile navigation with gradient effects
- **Touch-Optimized** - Smooth interactions on mobile devices
- **Accessibility** - ARIA labels, keyboard navigation support, and semantic HTML

## 🛠️ Tech Stack

- **[Svelte 5](https://svelte.dev/)** - Next-generation reactive framework with latest runes API
- **[SvelteKit](https://kit.svelte.dev/)** - Full-stack framework with SSR capabilities
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Bun](https://bun.sh/)** - Ultra-fast JavaScript runtime and package manager
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **GitHub Actions** - Automated deployment pipeline

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

```bash
# Clone the repository
git clone https://github.com/GiuseppeBellamacina/GiuseppeBellamacina.github.io.git

# Navigate to project directory
cd GiuseppeBellamacina.github.io

# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun run dev

# Open http://localhost:5173 in your browser
```

### Build

```bash
# Create production build
bun run build

# Preview production build
bun run preview
```

### Code Quality

```bash
# Type checking
bun run check

# Type checking in watch mode
bun run check:watch

# Format code
bun run format

# Check formatting
bun run format:check
```

## 📂 Project Structure

```text
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ deploy.yml
├── 📁 src
│   ├── 📁 lib
│   │   ├── 📁 assets
│   │   │   └── 🖼️ favicon.svg
│   │   ├── 📁 components
│   │   │   ├── 📁 seasonal
│   │   │   │   ├── 📄 AutumnEffect.svelte
│   │   │   │   ├── 📄 HalloweenEffect.svelte
│   │   │   │   ├── 📄 NewYearEffect.svelte
│   │   │   │   ├── 📄 SakuraEffect.svelte
│   │   │   │   ├── 📄 SeasonalEffectsDebug.svelte
│   │   │   │   ├── 📄 SnowEffect.svelte
│   │   │   │   └── 📄 SummerEffect.svelte
│   │   │   ├── 📄 About.svelte
│   │   │   ├── 📄 BackToTop.svelte
│   │   │   ├── 📄 Contact.svelte
│   │   │   ├── 📄 CursorTrail.svelte
│   │   │   ├── 📄 Experience.svelte
│   │   │   ├── 📄 Footer.svelte
│   │   │   ├── 📄 Hero.svelte
│   │   │   ├── 📄 Navbar.svelte
│   │   │   ├── 📄 Projects.svelte
│   │   │   ├── 📄 ScrollProgress.svelte
│   │   │   └── 📄 Skills.svelte
│   │   ├── 📁 stores
│   │   │   └── 📄 seasonStore.ts
│   │   ├── 📄 index.ts
│   │   └── 🎨 performance.css
│   ├── 📁 routes
│   │   ├── 📄 +layout.svelte
│   │   ├── 📄 +layout.ts
│   │   └── 📄 +page.svelte
│   ├── 🎨 app.css
│   ├── 📄 app.d.ts
│   └── 🌐 app.html
├── 📁 static
│   ├── 📁 assets
│   │   ├── 📁 icons
│   │   │   ├── 🖼️ ...
│   │   ├── 📁 projects
│   │   │   ├── 🖼️ ...
│   │   ├── 📕 cv.pdf
│   │   └── 🖼️ profile.png
│   └── 📄 robots.txt
├── ⚙️ .gitignore
├── ⚙️ .npmrc
├── ⚙️ .prettierignore
├── ⚙️ .prettierrc
├── 📝 README.md
├── 📄 bun.lock
├── ⚙️ package.json
├── 📄 svelte.config.js
├── ⚙️ tsconfig.json
└── 📄 vite.config.ts
```

## 🎯 Key Components

### Seasonal Effects

Automatic themed animations that activate based on the current date:

- **Snow Effect**: Falling snowflakes with adjustable density based on screen size
- **Halloween Effect**: Falling pumpkins, ghosts, and spiders during Halloween period
- **Summer Fireflies**: Smart population control system maintaining 25-55 fireflies with smooth fade-in/out animations
- **New Year Effect**: Confetti with spin variations and firework explosions using Web Animations API

All effects use:

- Date-based activation (no manual switching required)
- Screen-responsive particle density
- Web Animations API for smooth, conflict-free animations
- Automatic cleanup and resource management

### Navbar

- Dynamic matrix rain effect with customizable character pool
- Smooth scroll navigation with active section highlighting
- Responsive hamburger menu with futuristic animations
- Backdrop blur and gradient effects

### Hero

- Animated typing effect with multiple text variations
- Glitch-style title animation
- CSS-based cursor blink
- Profile image with hover effects

### About

- Canvas-based neural network with 5-layer architecture
- Color-coded impulse propagation (green → cyan → magenta)
- Trail effects for visual depth
- Real-time connection rendering

### Projects

- GitHub API integration for live star counts
- Scroll-triggered fade-in animations
- External links to demos and repositories
- Technology tags for each project

### Skills

- Shooting stars background effect
- Connected constellation patterns
- Rainbow color cycling on select icons
- Staggered fade-in animations

### Experience

- Timeline layout with alternating cards
- Binary particle background with neon glow
- Gradient text effects on dates
- Responsive card positioning

## 🌟 Performance Optimizations

- **IntersectionObserver**: All canvas-based effects only render when visible
- **RequestAnimationFrame**: Optimized animation loops
- **Web Animations API**: Seasonal effects use modern API for smooth, isolated animations
- **Smart Population Control**: Fireflies maintain stable count (85-100%) with interval monitoring
- **CSS Containment**: Isolated rendering contexts
- **Debounced Scroll**: Efficient scroll event handling
- **Lazy GitHub API**: Star counts fetched only when needed
- **Dynamic Density**: Particle count scales with viewport size

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

Giuseppe Bellamacina

- GitHub: [@GiuseppeBellamacina](https://github.com/GiuseppeBellamacina)
- Email: [g.bellamacina@gmail.com](mailto:g.bellamacina@gmail.com)
- LinkedIn: [Giuseppe Bellamacina](https://www.linkedin.com/in/giuseppe-bellamacina/)

---

Made with ❤️ using Svelte 5 and modern web technologies
