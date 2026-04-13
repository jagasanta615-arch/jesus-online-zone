# Design Brief

## Tone & Purpose
Professional-utilitarian digital services marketplace. Blue-900 authority + orange warmth for Indian e-governance and business services. Trust-focused, structured, accessible.

## Palette
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | L 0.32 C 0.12 H 261 (Blue-900) | L 0.72 C 0.19 H 256 (Blue-600) | Navigation, primary CTAs, headers |
| Accent | L 0.62 C 0.23 H 41 (Orange-500) | L 0.70 C 0.27 H 46 (Orange-400) | "Order Now" buttons, highlights |
| Secondary | L 0.45 C 0.16 H 260 (Blue-700) | L 0.60 C 0.20 H 258 (Blue-500) | Hero gradient, secondary UI |
| Muted | L 0.90 C 0.01 H 248 (Slate-100) | L 0.25 C 0.02 H 252 (Slate-800) | Backgrounds, disabled states |
| Destructive | L 0.55 C 0.22 H 25 (Red-500) | L 0.65 C 0.19 H 22 (Red-400) | Errors, warnings |

## Category Colors
Blue (Government), Green (Banking L 0.52 C 0.18 H 142), Orange (Jobs), Slate (Printing), Purple (Design L 0.55 C 0.18 H 270).

## Typography
Display: Space Grotesk 600–700 (geometric, confident). Body: General Sans 400–600 (warm, readable). Mono: Monospace fallback for code/data.

## Zones
| Zone | Treatment | Notes |
|------|-----------|-------|
| Header | bg-primary text-primary-foreground elevation-md | Sticky top-0 z-50, white logo + nav |
| Hero | gradient-hero text-primary-foreground py-16 lg:py-24 | Blue-900 → Blue-700 diagonal gradient |
| Search | bg-card border-border elevation-md -mt-8 relative z-10 | Overlaps hero, white card centered |
| Services | bg-background grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 | Slate-50, card-based service catalog |
| Feature Cards | bg-muted/30 p-6 rounded-xl | Light muted background, elevated appearance |
| Footer | bg-foreground text-card | Slate-900, high contrast |

## Spacing & Rhythm
Container max-w-7xl, px-4. Gaps: 4px (xs), 6px (sm), 8px (md), 12px (lg), 16px (xl). Service cards: gap-6. Section padding: py-12 or py-16.

## Motion & Interaction
Service card hover: translateY(-5px) + elevation-lg. Form submit: 0.3s smooth transition. Modal enter: scale(0.9) → scale(1), opacity 0 → 1 over 0.3s.

## Signature Detail
Floating category badges (top-2 right-2) on service cards. Colored icon circles scale 1 → 1.1 on hover. Smooth card lift + shadow elevation on interaction.

## Constraints
No neon/glow shadows. No full-page gradients. Maintain AA+ contrast in light and dark. Use semantic tokens only—no arbitrary colors. Max 3 shadows: elevation-sm/md/lg.
