# Mobile Rendering Quirks & Testing Guide

## 1. Overview & Problem Description
On certain mobile devices (notably Android Chrome, iOS Safari, and in-app WebViews like Telegram/Instagram), the portfolio site could render as a blank or dark page, or lock vertical scrolling.

### Root Causes Identified
1. **Viewport & Nested Overflow Lockup (`overflow: hidden` + `height: 100%` / `height: 100vh`)**:
   - `html, body` had `overflow: hidden` and `height: 100%`.
   - `.main-panel` had `overflow: hidden` and `height: 100vh` / `height: 100dvh`.
   - On mobile browsers with dynamic URL bars (Chrome/Safari), `100vh` includes space beneath browser chrome. When combined with nested `overflow: hidden`, older WebKit/Blink engines failed to establish flex height on `.content-area`, causing child panels to render with zero height or clip entirely.
   - Root-level scrolling was completely frozen.

2. **Uncaught Storage & Initialization Exceptions**:
   - In strict privacy modes, private/incognito browsing, or sandboxed WebViews, accessing `localStorage.getItem` or `localStorage.setItem` throws a `SecurityError` or `DOMException`.
   - Without error boundaries around `DOMContentLoaded`, an unhandled error prevented the router (`navigateTo`) from executing, leaving all panels hidden except the initial static markup, or failing to switch routes.

3. **Missing Router Fallback on Stale or Invalid Hash**:
   - If an unfamiliar hash was visited (or opened with deep links), all `.route-panel` elements were set to inactive with no fallback, presenting a blank content area.

4. **High-Resolution Image Decoded Memory Footprint**:
   - Images such as `inventory1.jpg` (5861×3907, 5.75MB) and `telegram mini.jpg` (6000×4000, 1.53MB) required ~100MB+ of GPU RAM per image when decoded, leading to memory pressure or dropped compositor layers on low-memory mobile hardware.

---

## 2. Solutions Implemented

### A. CSS Layout & Viewport Resilience (`styles.css`)
- **Root Overflow Relaxed**:
  Replaced `overflow: hidden` on `html, body` with:
  ```css
  html, body {
      max-width: 100%;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      width: 100%;
      height: 100%;
  }
  ```
- **Main Panel Clipping Removed**:
  Removed `overflow: hidden` from `.main-panel` so `.content-area` reliably manages its own scrolling without clipping.
- **Dynamic Viewport Units**:
  Added `@supports (height: 100dvh)` and `100svh` overrides for mobile:
  ```css
  @supports (height: 100dvh) {
      .main-panel { height: 100dvh; }
  }
  @media (max-width: 768px) {
      .main-panel { height: 100svh; }
  }
  ```
- **Content Area Scroll Container**:
  Configured `.content-area` with `flex: 1`, `min-height: 0`, `overflow-y: auto`, `overflow-x: hidden`, `-webkit-overflow-scrolling: touch;`, and `height: auto`.

### B. JavaScript Robustness & Defensive Init (`script.js`)
- **Safe `DOMContentLoaded` Boundary**:
  Wrapped entire initialization in a `try/catch` block. If any unhandled exception occurs, the handler catches it and reveals the overview panel as a fallback so the page never stays blank.
- **Defensive Storage**:
  Created `safeGetStorage` and `safeSetStorage` helpers to safely interact with `localStorage` without throwing security exceptions.
- **Router Fallback**:
  Updated `navigateTo(hash)` to fall back to the `overview` panel whenever a hash fails to match an existing panel.
- **IntersectionObserver Guards**:
  Safely check `'IntersectionObserver' in window` with immediate fallbacks for unsupported browsers.
- **Mobile Diagnostic Banner**:
  Added a diagnostic banner triggered by `?debug=1` that prints `navigator.userAgent`, `window.innerHeight`, and `window.innerWidth` for easy real-device troubleshooting.

### C. Image Asset Optimization
- Web-optimized versions generated for high-resolution images (`.webp` with maximum 1600px dimension and ~95% file size reduction).
- Added `loading="lazy"` across spotlight project images in `index.html`.

---

## 3. How to Test & Verify

### Local Testing (Chrome DevTools Device Emulation)
1. Start the static server:
   ```bash
   python -m http.server 8080
   ```
2. Open Chrome DevTools (`F12`), click the **Toggle Device Toolbar** (`Ctrl+Shift+M` or `Cmd+Shift+M`).
3. Select presets:
   - **iPhone 12/14/15 Pro** (390 × 844)
   - **Pixel 7** (412 × 915)
   - **Samsung Galaxy S20 Ultra** (412 × 915)
   - Custom low dimensions (e.g. 360 × 640)
4. Verify:
   - Header, hero copy, spotlight projects, and buttons render cleanly.
   - Vertical scrolling works smoothly without blank spaces.
   - Hamburger menu opens and closes the mobile sidebar smoothly.
   - Navigating between sections (Overview, Skills, Projects, Contact) displays content immediately.
   - Inspect console (`Console` tab) — verify zero errors.

### Real Mobile Device Testing
1. Visit the deployed Netlify URL or local tunnel on a smartphone:
   `https://yohannesportfolio1.netlify.app/`
2. Test both light and dark mode toggling.
3. Test with Safari Private Browsing (iOS) or Chrome Incognito (Android).
4. **Diagnostic Mode**:
   Visit `https://yohannesportfolio1.netlify.app/?debug=1`
   - Observe the green diagnostic banner at the bottom showing exact User Agent and innerHeight/innerWidth dimensions.
