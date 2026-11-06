---
name: Cinematic Social Watchspace
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1b1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f0'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#dfe2f0'
  inverse-on-surface: '#2c303b'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#ffb0cd'
  on-secondary: '#640039'
  secondary-container: '#aa0266'
  on-secondary-container: '#ffbad3'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0f131d'
  on-background: '#dfe2f0'
  surface-variant: '#313540'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system crafts a synchronized, theater-grade collective viewing atmosphere. Blending the high-fidelity immersion of modern streaming platforms with the real-time social dynamics of voice/chat spaces, the design language communicates intimacy, high production value, and communal immersion.

The design direction is **Cinematic Glassmorphism & Nocturnal Depth**:
- **Atmosphere**: Pure cinema immersion anchored by deep midnight slates, allowing visual media, live streams, and rich video colors to command focus.
- **Accents**: High-voltage electric violet and neon magenta signal community activity, playback sync, and active voice channels, while cinematic gold marks curated moments, premieres, and host roles.
- **Surface Quality**: Translucent backdrop blurs, luminous edges, and low-opacity glowing elements evoke physical cinema screens illuminating a dark room.

## Colors

The palette is tuned specifically for low-light environments to reduce eye strain while amplifying focal hierarchy through luminance contrast.

- **Primary (`#8B5CF6` - Electric Violet)**: Denotes core sync functions, primary CTAs, active media states, and navigational highlights.
- **Secondary (`#EC4899` - Neon Magenta)**: Drives real-time social energy: speaking states, friend invites, dynamic audio visualizers, and interactive screen reactions.
- **Tertiary (`#F59E0B` - Cinematic Gold)**: Reserved for watch-party room hosts, premium theatrical releases, movie ratings, and VIP status indicators.
- **Neutral Surface Ecosystem**:
  - `Canvas / Void`: `#0A0D14` (Deepest base backing video canvas and master viewport)
  - `Surface Low`: `#10141E` (Default sidebar, watch-party drawer, and ambient panel base)
  - `Surface Mid`: `#181F2E` (Cards, list rows, collapsed chat trays)
  - `Surface High`: `#232B3E` (Modals, popovers, active overlay panels)
  - `Surface Glass`: `rgba(16, 20, 30, 0.72)` with blur for HUD layers over running video
- **Text & Foreground**:
  - `Primary Text`: `#F8FAFC`
  - `Muted / Secondary Text`: `#94A3B8`
  - `Subtle / Tertiary Text`: `#64748B`

## Typography

Typography balances bold, screen-centric presentation with high-density legibility during quick-moving text chats.

- **Display & Headlines (`Space Grotesk`)**: Provides an angular, slightly tech-forward, cinematic punch reminiscent of modern title design. Letter tracking is pulled tight on larger sizes to maintain tension and impact.
- **Body & Labels (`Inter`)**: Neutral, systematically neutral legibility engine. Handles chat transcripts, participant tags, timestamps, and deep system controls without visual fatigue.
- **Status & Badges**: Utilize uppercase styling with tracked `label-sm` to maintain instant recognition across variable brightness video backdrops.

## Layout & Spacing

The layout is built around a split-focus model: accommodating high-aspect ratio video playback (16:9 / 2.39:1) alongside real-time communication modules.

- **Desktop (>= 1280px)**: A fluid 12-column master grid where the media player occupies an 8-column or 9-column span, while the social dock (chat, voice avatars, sync controls) occupies the remaining 3 to 4 columns. Section margins set to `margin` (2rem).
- **Tablet (768px - 1279px)**: Media maintains top placement across full width, and social elements transition into a bottom split tray or collapsible sidebar with `gutter` (1.5rem).
- **Mobile (< 768px)**: Strict vertical stacking. Fixed media screen docked to top with a floating glass overlay HUD. Live chat, voice strips, and party members sit in swipeable vertical tab sheets with `margin-mobile` (1rem) and `gutter-mobile` (0.75rem).
- **Internal Density**: Dense 4px-aligned rhythmic steps (`space-xs` through `space-xl`) ensure controls remain tight without occluding content.

## Elevation & Depth

Depth is established through frosted glassmorphism, luminescent rims, and directional colored back-glows rather than traditional dark drop shadows.

- **Level 0 (Stage Void)**: `#0A0D14` pure backdrop without blur or border.
- **Level 1 (Docked Surfaces & Sidebars)**: `#10141E` with an internal right/top 1px ghost border of `rgba(255, 255, 255, 0.06)`.
- **Level 2 (Glass Containers & Floating Overlays)**: `rgba(16, 20, 30, 0.75)` backdrop with `backdrop-filter: blur(16px)` and a continuous rim border `rgba(255, 255, 255, 0.12)`.
- **Level 3 (Interactive Modals & Menus)**: `rgba(24, 31, 46, 0.90)` backed by an ambient colored shadow: `0 16px 32px -8px rgba(10, 13, 20, 0.8), 0 0 24px -4px rgba(139, 92, 246, 0.15)`.
- **Glowing States**: Active participant video bubbles and synced timeline heads feature an outer glow: `box-shadow: 0 0 12px rgba(236, 72, 153, 0.5)` for speaking voice, and `0 0 12px rgba(139, 92, 246, 0.5)` for stream hosts.

## Shapes

The design system uses balanced curves (`roundedness: 2`) that soften the high-tech UI while maintaining geometric structure.

- **Base Radius (0.5rem / 8px)**: Inputs, buttons, chat speech bubbles, dropdown triggers, and status badges.
- **Large Radius (1rem / 16px)**: Movie thumbnail cards, voice participant cards, video frame containers, and drawer panels.
- **Pill (9999px)**: Timestamp badges, audio mute toggles, emoji reaction counters, and dynamic live status indicators.

## Components

### Buttons
- **Primary**: Electric violet solid background (`#8B5CF6`), text `#F8FAFC`, with a subtle top highlight line (`inset 0 1px 0 rgba(255, 255, 255, 0.2)`). On hover, brightness escalates with a violet drop glow (`0 0 16px rgba(139, 92, 246, 0.4)`).
- **Secondary (Social)**: Neon magenta border (`1px solid #EC4899`) over a semi-transparent base (`rgba(236, 72, 153, 0.1)`), scaling to full fill on click.
- **Glass / Ghost**: `rgba(255, 255, 255, 0.05)` fill with `1px solid rgba(255, 255, 255, 0.08)`. On hover, surface becomes `rgba(255, 255, 255, 0.1)`.

### Cards & Media Tiles
- **Movie/Episode Cards**: 16px radius, dark slate fill (`#181F2E`), with an absolute gradient overlay running from transparent to `rgba(10, 13, 20, 0.95)` at the base. Hover triggers a smooth 1.03x scale, revealing quick actions ("Watch with Friends", "Add to Watchlist") accompanied by an electric violet border illumination.
- **Participant Cards**: Compact cards holding user avatars, real-time audio wave meters, and status rings. Speaking state drives an animated multi-layered ring in Neon Magenta (`#EC4899`).

### Input Fields & Search
- Surface utilizes `#10141E` overlaid with `1px solid rgba(255, 255, 255, 0.1)`. On focus, switches border to `#8B5CF6` and emits a subtle inner violet tint. Placeholders in `#64748B`. Chat entry fields feature docked right-aligned emoji, gif, and voice note action icons.

### Status Badges & Chips
- **Host Badge**: Tinted `#F59E0B` gold background (`rgba(245, 158, 11, 0.15)`), text `#F59E0B`, border `rgba(245, 158, 11, 0.3)`.
- **Sync Lock**: Ultra-crisp pill badge displaying "SYNCED" in neon violet or "BUFFERING" in amber.
- **Reaction Chips**: Translucent glass pills displaying emoji alongside an increment counter, glowing slightly when voted by the current user.

### Lists & Chat Stream
- Alternating invisible borders with 8px horizontal padding; messages from room members support inline timestamp metadata and subtle tinting when tagged. System events (e.g., "Alex paused the movie") render centered in Space Grotesk `label-sm` with gold or violet accents.

### Specialized Synchronized Player HUD
- Floats directly over active canvas using Level 2 glassmorphism (`backdrop-filter: blur(16px)`).
- Timeline scrubbing track displays friend avatars perched directly on the seek bar where peers are currently positioned or have placed timeline bookmarks.