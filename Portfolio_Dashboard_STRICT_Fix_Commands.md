# STRICT FIX COMMANDS — Portfolio Dashboard (v3)

Paste this entire document as-is into the coding agent. These are mandatory, verifiable instructions —
not suggestions. Do not summarize, skip, or "improve upon" a step without doing it. After each numbered
fix, there is an **Acceptance Test**; the fix is not complete until that test passes. If a step can't be
completed exactly as written, stop and report why instead of silently doing something different.

---

## FIX 1 — Stop all content from being cut off / overflowing the viewport

**Do exactly this:**
1. Open every CSS file. Find every `font-size` declared in a fixed unit (`px`, large `rem` values) on
   headings, the hero name, and any sidebar/panel text. Replace them with this fluid scale — add it to
   `:root` and use the variables everywhere a heading size is set:
   ```css
   :root {
     --fs-hero: clamp(2rem, 4vw + 1rem, 4rem);
     --fs-h1:   clamp(1.4rem, 1.6vw + 1rem, 2.1rem);
     --fs-h2:   clamp(1.15rem, 1vw + 1rem, 1.6rem);
     --fs-body: clamp(0.92rem, 0.3vw + 0.85rem, 1rem);
   }
   ```
2. Find the "Current Focus" / quick-info side panel and the AI copilot bubble in the HTML/CSS. If either
   uses `position: absolute` or `position: fixed` with a hardcoded `width`/`right` value that is not
   inside the grid layout, **remove that positioning** and place the element as a normal grid/flex child
   of the dashboard layout instead. It must never extend past `100vw`.
3. Add this rule globally and do not remove it:
   ```css
   html, body { max-width: 100%; overflow-x: hidden; }
   * { box-sizing: border-box; }
   ```
4. Find the main content container (the area to the right of the sidebar). It must use:
   ```css
   .app-shell { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
   .main-content { min-width: 0; overflow-y: auto; max-height: 100vh; }
   ```
   Remove any fixed `height` on this container that is currently clipping content — this is why the
   bottom project cards are sliced off.

**Acceptance test:** Resize the browser to 1366×768, 1440×900, and 1920×1080. At every width: no text
is clipped, no element extends past the right edge, and every row of cards (including the last row) is
fully visible by scrolling. Take a screenshot at each width and visually confirm before moving on.

---

## FIX 2 — Skill logos must actually render, not show `</>`

**Do exactly this:**
1. Add this line inside `<head>` if it is not already there and confirm it loads (check the Network tab
   for a 200 response, not 404):
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
   ```
2. Replace the entire skills dataset with this exact array — do not shorten it, do not drop any entries:
   ```js
   const skills = [
     { name: "JavaScript", category: "Languages", icon: "javascript", level: 90 },
     { name: "TypeScript", category: "Languages", icon: "typescript", level: 75 },
     { name: "Python", category: "Languages", icon: "python", level: 80 },
     { name: "C++", category: "Languages", icon: "cplusplus", level: 65 },
     { name: "C#", category: "Languages", icon: "csharp", level: 60 },
     { name: "Java", category: "Languages", icon: "java", level: 65 },
     { name: "PHP", category: "Languages", icon: "php", level: 60 },
     { name: "HTML5", category: "Languages", icon: "html5", level: 95 },
     { name: "CSS3", category: "Languages", icon: "css3", level: 90 },
     { name: "Node.js", category: "Frameworks", icon: "nodejs", level: 85 },
     { name: "Express", category: "Frameworks", icon: "express", level: 85 },
     { name: "Django", category: "Frameworks", icon: "django", level: 60 },
     { name: "React", category: "Frameworks", icon: "react", level: 88 },
     { name: "Next.js", category: "Frameworks", icon: "nextjs", level: 80 },
     { name: "Bootstrap", category: "Frameworks", icon: "bootstrap", level: 80 },
     { name: "Tailwind CSS", category: "Frameworks", icon: "tailwindcss", level: 90 },
     { name: "MongoDB", category: "Databases", icon: "mongodb", level: 82 },
     { name: "MySQL", category: "Databases", icon: "mysql", level: 78 },
     { name: "PostgreSQL", category: "Databases", icon: "postgresql", level: 75 },
     { name: "Git & GitHub", category: "Tools & Cloud", icon: "git", level: 88 },
     { name: "Docker", category: "Tools & Cloud", icon: "docker", level: 55 },
     { name: "Linux", category: "Tools & Cloud", icon: "linux", level: 70 },
     { name: "Nginx", category: "Tools & Cloud", icon: "nginx", level: 55 },
     { name: "Agile/Scrum", category: "Tools & Cloud", icon: "trello", level: 70 },
     { name: "UI/UX Design", category: "Tools & Cloud", icon: "figma", level: 65 },
   ];
   ```
3. Render each icon as:
   ```html
   <i class="devicon-{icon}-plain colored"></i>
   ```
   For `Git & GitHub`, `Agile/Scrum`, and `UI/UX Design` (no direct 1:1 devicon match), use
   `devicon-git-plain colored`, `devicon-trello-plain colored`, `devicon-figma-plain colored`
   respectively — these are placeholders for "process/tooling," not literal claims of those exact tools.
4. Add a JS `onerror` fallback on every icon element: if it fails to render (icon has zero width/height
   after load), replace it with a colored circle showing the skill's first 2 letters. **No blank or
   generic `</>` icon may ever be visible.**
5. Build each progress ring as an inline SVG with a `stroke-dasharray` equal to the circle's
   circumference and a `stroke-dashoffset` calculated as `circumference * (1 - level / 100)`, set via
   JS from the `level` field in the data array above — not hardcoded, not left at a default arc.

**Acceptance test:** Open the Skills page. Every one of the 25 skills listed above is visible, grouped
by category, each with its real brand-colored logo (not a generic bracket icon) and a ring that is
visibly filled to a different amount matching its `level` value (a 90 should look clearly fuller than a
55).

---

## FIX 3 — Projects grid must never clip cards

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}
```
This grid must live inside `.main-content` (see Fix 1, step 4) so it scrolls with the page. It must
never sit inside a container with `overflow: hidden` and a fixed `height`.

**Acceptance test:** Scroll to the very bottom of the Projects page. The last row of cards is fully
visible with normal spacing below it, not sliced by the viewport edge.

---

## FIX 4 — Add the four new projects (case-study card + drawer, same pattern as existing projects)

Add these as new entries in the projects data array. Replace every `[ ]` bracket with your real
specifics before shipping — do not invent features on your behalf:

```js
{
  title: "Mesob Reporting System",
  description: "[1–2 sentence real description]",
  tech: ["[your real stack]"],
  highlights: ["[real highlight 1]", "[real highlight 2]"],
  image: "images/mesob-preview.jpg"
},
{
  title: "Tipplay — Sports Betting & Casino Platform",
  description: "A sports betting and casino platform built with Next.js, TypeScript, Tailwind CSS, Prisma, and NextAuth.",
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "NextAuth"],
  highlights: ["[real highlight — odds/game logic]", "[real highlight — auth/payments/admin]"],
  image: "images/tipplay-preview.jpg"
},
{
  title: "ERP System",
  description: "[what modules — inventory, HR, finance, etc.]",
  tech: ["[your real stack]"],
  highlights: ["[real highlight 1]", "[real highlight 2]"],
  image: "images/erp-preview.jpg"
},
{
  title: "Building Management System",
  description: "[what it manages — tenants, maintenance, access, billing]",
  tech: ["[your real stack]"],
  highlights: ["[real highlight 1]", "[real highlight 2]"],
  image: "images/bms-preview.jpg"
}
```

**Image sourcing (mandatory, do not skip):** download real files (do not hotlink external URLs) from
Unsplash or Pexels and save them into `/images` under the filenames above, using these search terms:
- Mesob Reporting System → "restaurant management dashboard" / "POS reporting software"
- Tipplay → "sports betting app dashboard" / "sportsbook UI dark theme"
- ERP System → "ERP dashboard interface" / "enterprise resource planning software"
- Building Management System → "smart building management dashboard" / "facility management software"

Mark these clearly in the code comment as `<!-- concept preview image, replace with real screenshot -->`
so they're never confused with actual product screenshots later.

**Acceptance test:** All four new project cards appear in the Projects grid with a real image loaded
(not a broken image icon), and clicking each opens the same wide detail drawer used by the original
five projects.

---

## FIX 5 — Full color system replacement (light mode is the priority complaint)

Delete the current color variables entirely and replace with this exact token set:

```css
:root {
  --bg-page: #F7F7FA;
  --bg-sidebar: #FFFFFF;
  --bg-card: #FFFFFF;
  --border-subtle: #E7E7EF;
  --text-main: #14131F;
  --text-muted: #6B6B7B;
  --accent: #4F46E5;
  --accent-soft: #EEF0FF;
  --chip-blue: #2563EB;   --chip-blue-soft: #EAF1FF;
  --chip-green: #16A34A;  --chip-green-soft: #E9F9EF;
  --chip-amber: #D97706;  --chip-amber-soft: #FFF4E5;
  --chip-rose: #E11D48;   --chip-rose-soft: #FFEAF0;
  --shadow-card: 0 1px 2px rgba(20,19,31,0.04), 0 8px 24px rgba(20,19,31,0.06);
}
[data-theme="dark"] {
  --bg-page: #0F0E17;
  --bg-sidebar: #15141F;
  --bg-card: #1B1A28;
  --border-subtle: #2A2938;
  --text-main: #F3F3F7;
  --text-muted: #9A99AC;
  --accent: #7C6FF0;
  --accent-soft: rgba(124,111,240,0.14);
  --shadow-card: 0 8px 24px rgba(0,0,0,0.35);
}
```

**Apply these rules, do not leave the old purple-everywhere pattern in place:**
- Every button, active nav item, link, and focus ring uses `--accent` only. Nothing else uses it.
- The 4 stat cards on Overview each get a **different** chip color, in this order: blue, green, amber,
  rose. Do not repeat a color across the 4 cards.
- All body text uses `--text-main` on `--bg-page`/`--bg-card` — no gray-on-gray. Verify with a contrast
  checker that this pairing is ≥ 4.5:1.
- Remove any remaining flat lavender/purple background fill from `--bg-page` — it must be the warm
  off-white value above.

**Acceptance test:** Screenshot the Overview page in light mode. The 4 stat cards are visibly different
colors, the background reads as near-white (not lavender), and body text is clearly dark, high-contrast
against it.

---

## FIX 6 — Professional polish (apply after Fixes 1–5 pass, not before)

- Give every ring/stat/chatbot element a skeleton/shimmer loading state — nothing should ever render as
  a static broken shape while data loads.
- Define exactly 2 box-shadow levels (resting: `--shadow-card` above; hover: same values ×1.5 blur) and
  reuse them on every card type — no card gets its own custom shadow.
- Stagger entrance animations (blobs, marquee, count-up, ring fill, drawer open) so they don't all fire
  simultaneously — sequence them with 80–150ms delays between groups.
- Add `prefers-reduced-motion` handling: disable blob movement, marquee scroll, and count-up animation
  for users who request it.
- Once every Acceptance Test above passes, commit the changes to the `main` branch with a clear commit
  message (e.g. `fix: responsive overflow, skill icons/rings, new projects, color system`) — the repo
  currently shows only 1 commit, so none of this work is tracked yet.

---

## FINAL CHECK — do not report this task as done until all six are true:

1. No text or panel is clipped at 1366×768, 1440×900, or 1920×1080.
2. All 25 skills render with real logos and correctly filled progress rings.
3. The last row of the Projects grid is fully visible on scroll.
4. Mesob Reporting System, Tipplay, ERP System, and Building Management System all appear as working
   cards with images and open detail drawers.
5. Light mode shows 4 distinct stat-card colors and a near-white (not lavender) background with
   high-contrast text.
6. Changes are committed to `main`.
