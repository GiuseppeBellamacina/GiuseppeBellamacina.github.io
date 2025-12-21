# 🚀 Giuseppe Bellamacina - Portfolio

Portfolio personale costruito con **SvelteKit** e **Bun**.

## 🛠️ Tech Stack

- **Framework**: SvelteKit 2 con Svelte 5
- **Runtime**: Bun
- **Linguaggio**: TypeScript
- **Styling**: CSS con animazioni custom
- **Deploy**: GitHub Pages (CI/CD automatico)

## 📦 Installazione & Sviluppo

```bash
# Installa le dipendenze
bun install

# Avvia il dev server
bun run dev

# Build per produzione
bun run build

# Preview della build
bun run preview
```

## 🎨 Formattazione

```bash
# Formatta tutto il codice
bun run format

# Controlla formattazione
bun run format:check
```

## 🚀 Deploy

Il sito viene deployato automaticamente su GitHub Pages quando pusshi su `main`.

### Setup GitHub Pages:

1. Vai su **Settings** > **Pages**
2. Source: **GitHub Actions**
3. Il workflow `.github/workflows/deploy.yml` si occupa di tutto

## 📂 Struttura

```
svelte-portfolio/
├── src/
│   ├── lib/
│   │   └── components/     # Componenti Svelte
│   ├── routes/
│   │   ├── +page.svelte   # Pagina principale
│   │   ├── +layout.svelte # Layout globale
│   │   └── +layout.ts     # Config SSR
│   ├── app.css            # Stili globali
│   └── app.html           # Template HTML
├── static/
│   └── assets/            # Immagini e icone
└── svelte.config.js       # Config adapter-static
```

## ✨ Features

- 🎭 Matrix rain effect nella navbar
- ⌨️ Typing animation nel hero
- 🧠 Neural network canvas animato
- ⏱️ Timeline con binary particles
- 🎨 Skills con space effects (shooting stars, constellations)
- 🌈 Rainbow glow su icone tech random
- 📱 Completamente responsive

## 📝 License

© 2025 Giuseppe Bellamacina
