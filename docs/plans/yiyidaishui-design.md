# Design Document — Yiyidaishui Homepage v2 (Apple × Academic × Interactive)

## Reference Analysis

### Reference 1: RayeRen/acad-homepage (Content Structure)
From screenshot analysis:
- Color temperature: **Cool-neutral** — near-white background with soft blue-lavender gradient sidebar
- Typography: **Sans-serif, high weight contrast** — bold name/section headings, regular body text
- Spatial density: **Comfortable / moderate** — not cramped, generous line-height
- Layout: **Left sidebar sticky** + right scrollable main content area
- Surface treatment: **Flat, no heavy shadows**, clean dividers
- Navigation: Horizontal top bar with anchor links (About Me, News, Publications, Honors, Educations)
- Social icons: Icon-based row under profile name
- Hover: Minimal color-change on links
- Animation: Static, no motion effects
- Content sections: About bio paragraph → News (date-prefixed bullets) → Publications (card with image+meta)

### Reference 2: SimonAKing/HomePage (Interactivity)
From screenshot analysis:
- Color: **Deep dark** `#1c1c1c` / near-black, subtle grid lines overlay in dark grey (~`rgba(255,255,255,0.04)`)
- Border accent: `rgba(0, 100, 255, 0.4)` blue glow on viewport border
- Entry: Full-screen cover with large thin-weight name centered + „PRESS START" prompt
- After entry: Same dark canvas, centered avatar circle + name + monospaced subtitle + icon-grid navigation
- Icons: Stroke-style, white, equal-size grid
- Badge/UI: Minimal floating green square dot (activity indicator)
- No animations captured — but implies scroll-through transition
- Typography: Thin/light weight sans for display, monospace for descriptor

### Apple Aesthetic Signals (from Apple.com / design system knowledge)
- **Color**: Pure white `#ffffff` or `#f5f5f7` off-white, with `#1d1d1f` near-black text
- **Typography**: SF Pro equivalent — `-apple-system, BlinkMacSystemFont, "SF Pro Display"` fallback to `Inter`
- **Motion**: Spring-based fade-up entrances (duration ~0.6s, delay cascade), smooth scrolling, subtle parallax
- **Surface**: frosted glass `backdrop-filter: blur(20px) saturate(180%)` on nav, clean cards with `1px` border `rgba(0,0,0,.06)`
- **Spacing**: Extremely generous — Apple uses `140px` section padding on desktop
- **CTA style**: Rounded pill buttons, blue `#0071e3` accent
- **Layout**: Wide single column, max-width `980px`, content breathes

---

## Design Context

### Users
技术圈访客、同行开发者/AI 学生、潜在朋友、偶然发现的陌生人。场景：桌面端首次访问，期待在 30 秒内判断博主是谁、值不值得关注。

### Brand Personality
**专业 · 年轻 · 有品位**
不是学术大佬式的严肃，而是有自己审美的技术学生。Apple 风格赋予可信度与精致感，互动性赋予个性与温度。

### Aesthetic Direction (Synthesized)
**「Apple × 沉浸入场 × 学术内容结构」**

Combined signals:
- Background: Apple off-white `#f5f5f7` (light mode) — NOT dark like SimonAKing
- An optional fullscreen entry splash (SimonAKing style) with dark subtle canvas → click reveals the Apple-white content below
- Sticky frosted-glass top navigation (Apple.com style)
- Wide two-column above-fold: left = avatar+name+bio+icons, right = abstract geometric/particle canvas for visual interest
- Below fold: News timeline → Blog Posts cards
- Accent: Apple blue `#0071e3`
- Font: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, sans-serif`

### Design Principles
1. **Apple finish** — every element must feel premium, no rough edges
2. **Progressive reveal** — content fades up on scroll (spring easing)
3. **Glassmorphic nav** — frosted backdrop, always readable
4. **Generous whitespace** — section gaps ≥ 80px
5. **Accent discipline** — blue `#0071e3` used ONLY for primary CTAs and active states

---

## Design System

### Colors
| Role | Light Value | Notes |
|------|-------------|-------|
| Page background | `#f5f5f7` | Apple off-white |
| Card background | `#ffffff` | Pure white cards |
| Primary text | `#1d1d1f` | Apple near-black |
| Secondary text | `#6e6e73` | Apple grey |
| Tertiary / meta | `#aeaeb2` | Dates, labels |
| Accent / CTA | `#0071e3` | Apple blue |
| Accent hover | `#0077ed` | Slightly lighter |
| Divider | `rgba(0,0,0,0.08)` | Hairline |
| Card border | `rgba(0,0,0,0.06)` | 1px card outline |
| Nav glass | `rgba(245,245,247,0.8)` | Frosted |
| Splash bg | `#161617` | SimonAKing-inspired entry |

### Typography
```css
--font: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Inter, sans-serif;
```
| Role | Size | Weight | Letter-spacing |
|------|------|--------|----------------|
| Hero name | clamp(3rem, 6vw, 5.5rem) | 700 | -0.03em |
| Section heading | clamp(1.8rem, 3vw, 2.8rem) | 700 | -0.02em |
| Card title | 1.1rem | 600 | -0.01em |
| Body | 1rem | 400 | normal |
| Meta / label | 0.78rem | 400 | 0.02em |
| Tag | 0.68rem | 500 | 0.06em uppercase |

### Key Effects
- **Glassmorphic nav**: `backdrop-filter: blur(20px) saturate(180%); background: rgba(245,245,247,0.72);`
- **Scroll reveal**: `@keyframes fadeUp { from {opacity:0; transform:translateY(30px)} to {opacity:1; transform:translateY(0)} }` — IntersectionObserver, 0.6s ease-out
- **Card hover**: `transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.10);`
- **Splash entry**: Dark fullscreen `#161617` cover fades out on click/keydown to reveal main content
- **Particle canvas**: Subtle floating dots on splash screen (plain JS canvas, ≤60fps)
- **Button**: `background:#0071e3; border-radius:980px; padding:0.5em 1.2em;` hover scale 1.02

### Aesthetic Implementation

#### Layout Structure
```
<body>
  <!-- Entry splash (SimonAKing reference) -->
  <div id="splash">            ← dark full-screen entry
    <canvas id="particle-canvas">
    <div class="splash-content">  name + subtitle + "进入" button
  </div>

  <!-- Main content (Apple reference) -->
  <nav class="glass-nav">      ← fixed top, glassmorphic
  <main>
    <section class="hero">     ← two-col: avatar+bio, right side for decor
    <section class="news">     ← timeline list
    <section class="blog">     ← card grid
    <footer>
  </main>
</body>
```

Desktop: `max-width: 980px; margin: 0 auto;`
Hero section: `display:grid; grid-template-columns: 1fr 1fr; gap:60px; align-items:center;`
Mobile: single column stack

#### Surface Treatment
Cards: `background:#fff; border:1px solid rgba(0,0,0,0.06); border-radius:18px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.04);`
Nav: `border-bottom: 1px solid rgba(0,0,0,0.08); backdrop-filter:blur(20px);`
No heavy shadows on flat elements, only subtle lift on card hover.

#### Typography Expression
700-weight headings vs 400-weight body. Apple uses size+weight, not color, for hierarchy. Section headings: extra-bold, large.

#### Decorative Rules
**Present:** floating particle canvas on splash; thin 1px dividers; rounded pill tags; Apple-blue underlines on hover
**Forbidden:** gradient text (too AI-slop), glassmorphism on cards (only on nav), neon glow, heavy drop shadows

#### Spatial Rhythm
**Generous Apple-style**:
- `--section-gap: clamp(60px, 10vw, 120px)`
- `--card-gap: 16px`
- `--component-padding: clamp(20px, 4vw, 60px)`
- Nav height: `52px`

#### Signature CSS
```css
/* 1. Apple system font stack */
body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif; background: #f5f5f7; color: #1d1d1f; }

/* 2. Glassmorphic nav */
.glass-nav { backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); background: rgba(245,245,247,0.72); border-bottom: 1px solid rgba(0,0,0,0.08); }

/* 3. Card hover lift */
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.12); }
.card { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease; }

/* 4. Scroll reveal spring */
.reveal { opacity: 0; transform: translateY(30px); }
.reveal.in { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
@keyframes fadeUp { to { opacity:1; transform:translateY(0); } }

/* 5. Apple blue CTA */
.btn-primary { background: #0071e3; color:#fff; border-radius:980px; border:none; padding:0.55em 1.4em; font-size:0.9rem; font-weight:500; cursor:pointer; transition:background 0.2s, transform 0.2s; }
.btn-primary:hover { background: #0077ed; transform:scale(1.02); }
```
