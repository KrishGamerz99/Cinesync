# CineSync — Complete Movie Social & Watch Party Platform

CineSync is a responsive, theater-grade synchronized watch party and movie social web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It is faithfully engineered from the Google Stitch "Cinematic Social Watchspace" design system (`stitch_cinesync_watch_party_platform/`).

---

## ✨ Features

- **Home Dashboard**:
  - Live presence indicator with interactive state cycling (`Ready`, `Watching`, `Away`).
  - Glowing Bento Quick Action hero banner with millimeter-lockstep sync party initiator.
  - "Crew Online" horizontal friend status strip with live activity badges and peek indicators.
  - "Resume Shared Session" card with synchronized timeline progress, paused-by indicators, and spatial audio tag.
  - "Parties Live Now" carousel with 4K Atmos & voice channel markers.
  - Trending catalog recommendations with instant mutual-watchlist bookmarks.
  - 6-character party room code modal dialog with connection animation.

- **Live Watch Party Room**:
  - 16:9 cinematic video player with edge-blended ambient shadows.
  - Synchronized HUD glass overlay with peer scrub heads (host marker and participant pins).
  - Floating emoji reaction stream with animated trajectories (`🍿`, `🚀`, `🔥`, `❤️`).
  - 4-mode selector dock (`Video`, `Voice`, `Chat`, `Pure`).
  - 4-tile participant stream grid with glowing neon magenta speaking rings, real-time wave indicators, and mic/cam toggles.
  - Synchronized room chat stream with typing indicators and system sync events.
  - Cinema bottom action bar with spatial audio ducking, mute toggles, invite link generator, and exit confirmation.

- **Movie Details & Planner**:
  - Volumetric ambient hero backdrop with quick trailer trigger.
  - Specs bento card (4K Ultra HD, Dolby Atmos, IMDb 8.0, RT 88%).
  - "Mutual Watchlist" friend stack with instant "Invite All" feedback animation.
  - Collapsible synopsis block with "Read more / Show less" toggle.
  - Director & Cast circular avatar gallery.
  - Official trailer preview tile.
  - Watch party configuration drawer (Friends Only / Invite Link / Public, Sync Control Lock switch, Spatial Voice Auto-Ducking).

- **Personalized Theme Studio**:
  - Real-time interactive mini-preview device stage with ambient reactive back-glow.
  - Curated palettes (`Purple Galaxy`, `Midnight Blue`, `Neon Cyber`, `Sunset Orange`, `Rose Velvet`).
  - Custom Color Engine with 360° HSL hue sliders for Primary Accent and Secondary Social Glow.
  - Display modes: `Dark`, `OLED Pure`, `Ambient`, `Studio Day`.
  - Theater Surface Depth selector: `Deep Space`, `Soft Glass`, `Pitch Black`.
  - Audio & Social preferences (Avatar grid placement, Spatial voice balance slider, Reaction animation intensity).
  - Tactile "Save & Apply Theme" button with delight floating toast notification.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (with tokens mapped from `DESIGN.md`), Custom Glassmorphism CSS layers
- **Icons & Fonts**: Google Material Symbols Outlined, Inter, Space Grotesk
- **Routing**: React Router v6 (SPA with `vercel.json` rewrites)
- **Backend Ready**: Modular Supabase integration with graceful local Demo Mode fallback

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd "Movie Chat App"

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the Vite development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
```bash
# Compile TypeScript and build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔐 Supabase Configuration (Optional)

CineSync works completely out of the box in **Demo Mode** with realistic simulated peers, real-time typing, and local storage state.

To connect a live Supabase backend:
1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Fill in your project URL and public anonymous key:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## 🌐 Vercel Deployment

1. Push this repository to GitHub/GitLab.
2. Import the project into Vercel.
3. Set the Framework Preset to **Vite**.
4. Deploy! The included `vercel.json` ensures client-side routing works seamlessly across all deep links (`/room`, `/movie/:id`, `/studio`, etc.).

