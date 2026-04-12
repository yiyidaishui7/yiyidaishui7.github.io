# Implementation Plan — Yiyidaishui Homepage

*Source of truth: docs/plans/yiyidaishui-design.md*
*Output target: index.html (project root — standalone static HTML, not Jekyll template)*

---

## Task 0 — Project Setup & `<head>`
- [ ] Single-file HTML, no external files except Google Fonts CDN + Simple Icons CDN
- [ ] `<meta charset="UTF-8">`, viewport, description, title
- [ ] Google Fonts import: Cormorant Garamond (300,400), Noto Serif SC (300,400), Space Grotesk (300,400)
- [ ] CSS custom properties in `:root` for all color tokens and spacing scale
- [ ] `prefers-reduced-motion` media query reducing all animations to `opacity` only
- [ ] Favicon link: `/images/favicon.ico`

## Task 1 — CSS Foundation
- [ ] Reset: `box-sizing: border-box; margin:0; padding:0`
- [ ] Body: `background:#fdfcfb; color:#0d0d0d; font-family:'Noto Serif SC',serif; line-height:1.9;`
- [ ] `.container`: `max-width:680px; margin:0 auto; padding:0 clamp(1.5rem,5vw,4rem);`
- [ ] Spacing scale: `--s1:1rem; --s2:1.5rem; --s3:2.5rem; --s4:4rem; --s5:6rem;`
- [ ] `.reveal` + `@keyframes inkRise` scroll animation setup
- [ ] `.cursor-glow` fixed overlay with CSS `var(--mx,--my)`
- [ ] `.ink-link` underline slide-in from left
- [ ] All transitions: `cubic-bezier(0.16,1,0.3,1)`

## Task 2 — Cursor Glow (JS)
- [ ] Add `<div class="cursor-glow" aria-hidden="true"></div>` as first child of body
- [ ] JS: `document.addEventListener('mousemove', e => { document.documentElement.style.setProperty('--mx', e.clientX+'px'); document.documentElement.style.setProperty('--my', e.clientY+'px') })`
- [ ] Touch devices: skip glow (detect via pointer media query)

## Task 3 — Header
- [ ] `<header class="site-header reveal">`: site name in Cormorant Garamond 300, clamp(2.8rem,6vw,5rem)
- [ ] Site description in Space Grotesk 300, 0.75rem, letter-spacing 0.14em, uppercase, secondary color `#4a4a4a`
- [ ] Minimal `<nav>`: text links "Blog · About · Tags", Space Grotesk, no borders, hover via ink-link
- [ ] Header padding-top: `clamp(3rem, 8vh, 6rem)`, padding-bottom: `2rem`
- [ ] Hairline separator under nav: `border-bottom: 1px solid rgba(13,13,13,0.1)`

## Task 4 — Profile Section
- [ ] `<section class="profile reveal">` with delay 100ms
- [ ] Avatar: `<img src="images/avatar.webp">` — 72px circle, `filter: grayscale(20%) contrast(1.05)`, hover: `filter:none`
- [ ] Bio text from page-story About Me section, verbatim
- [ ] Avatar + bio in flex row on desktop, column on mobile (≤480px)
- [ ] Section padding-top: `var(--s5)` (6rem)

## Task 5 — Links Section (icon SVG)
- [ ] `<section class="links reveal">` with delay 200ms
- [ ] Render as icon-based links per PageClaw Rendering Conventions
- [ ] Email: envelope SVG inline (not Simple Icons)
- [ ] GitHub: Simple Icons CDN `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg`
- [ ] Icon size: 20px, color: `currentColor`, opacity 0.7 hover 1.0
- [ ] Flex row, gap `1.5rem`
- [ ] Each icon wrapped in `<a aria-label="..." class="icon-link" href="...">`

## Task 6 — Blog List Section
- [ ] `<section class="blog reveal">` with delay 300ms
- [ ] Section label: "WRITING" in Space Grotesk 300, letter-spacing 0.2em, font-size 0.7rem, color `#4a4a4a`
- [ ] Top hairline: `border-top: 1px solid rgba(13,13,13,0.1)`; padding-top `var(--s4)`
- [ ] Jekyll `{% for post in paginator.posts %}` loop — each article:
  - `<article class="post-item reveal">` with staggered delay
  - Post date: Space Grotesk 300, 0.7rem, `#4a4a4a`, letter-spacing 0.1em
  - Post title: Noto Serif SC 400, 1.1rem → 1.25rem — `.ink-link` hover
  - Tags: pill-style `<span>` tags, 0.65rem, border `1px solid rgba(13,13,13,0.2)`, no fill, Space Grotesk
  - Excerpt: 0.875rem, `#4a4a4a`, line-height 1.7
  - Hairline between articles: `border-top: 1px solid rgba(13,13,13,0.08)`
  - Padding between: `var(--s3)` (2.5rem)
- [ ] "No posts yet" empty state with gentle message
- [ ] Pagination: prev/next as text arrows, Space Grotesk

## Task 7 — Footer
- [ ] `<footer class="site-footer">`: Space Grotesk 300, 0.7rem, `#4a4a4a`
- [ ] Copyright: `Copyright © 2024 Yiyidaishui`
- [ ] Visitor counter: busuanzi script, same style as above
- [ ] Padding: `var(--s5)` top, `var(--s4)` bottom
- [ ] Hairline separator top

## Task 8 — Scroll Reveal (IntersectionObserver JS)
- [ ] After DOM ready: `document.querySelectorAll('.reveal').forEach(el => observer.observe(el))`
- [ ] `IntersectionObserver` threshold `0.1`, once: `el.classList.add('visible')`
- [ ] Staggered delay: each `.reveal` gets `animation-delay` from `data-delay` attribute (0ms, 100ms, 200ms...)
- [ ] `prefers-reduced-motion`: skip animation, set `opacity:1; transform:none` immediately

## Task 9 — Responsive
- [ ] Mobile (≤480px): avatar column, font sizes reduce gracefully via `clamp()`
- [ ] No horizontal scroll at 375px
- [ ] Touch: hide cursor glow, tap targets ≥44px

## Task 10 — Build Checklist
- [ ] All interactive elements have `:hover` + `:focus-visible`
- [ ] Typography: 3+ distinct levels (display / body / meta)
- [ ] Consistent spacing rhythm throughout
- [ ] Responsive: 375px ✓, 1200px ✓
- [ ] Icon links use SVG with aria-label ✓
- [ ] Aesthetic reflected in CSS — not generic ✓
- [ ] Animation respects `prefers-reduced-motion` ✓
