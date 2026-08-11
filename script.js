/* =========================================================================
   Yohannes Abegaz | Dashboard Portfolio JavaScript
   Hash router, skills/projects data engine, drawer, command palette,
   theme toggle, chatbot, animations, accessibility
   ========================================================================= */

'use strict';

/* =========================================================================
   SKILLS DATA
   ========================================================================= */
const skillsData = [
    { name: 'JavaScript', category: 'Languages', icon: 'javascript', level: 90 },
    { name: 'TypeScript', category: 'Languages', icon: 'typescript', level: 75 },
    { name: 'Python', category: 'Languages', icon: 'python', level: 80 },
    { name: 'C++', category: 'Languages', icon: 'cplusplus', level: 65 },
    { name: 'C#', category: 'Languages', icon: 'csharp', level: 60 },
    { name: 'Java', category: 'Languages', icon: 'java', level: 65 },
    { name: 'PHP', category: 'Languages', icon: 'php', level: 60 },
    { name: 'HTML5', category: 'Languages', icon: 'html5', level: 95 },
    { name: 'CSS3', category: 'Languages', icon: 'css3', level: 90 },
    { name: 'Node.js', category: 'Frameworks', icon: 'nodejs', level: 85 },
    { name: 'Express', category: 'Frameworks', icon: 'express', level: 85 },
    { name: 'Django', category: 'Frameworks', icon: 'django', level: 60 },
    { name: 'React', category: 'Frameworks', icon: 'react', level: 88 },
    { name: 'Next.js', category: 'Frameworks', icon: 'nextjs', level: 80 },
    { name: 'Bootstrap', category: 'Frameworks', icon: 'bootstrap', level: 80 },
    { name: 'Tailwind CSS', category: 'Frameworks', icon: 'tailwindcss', level: 90 },
    { name: 'MongoDB', category: 'Databases', icon: 'mongodb', level: 82 },
    { name: 'MySQL', category: 'Databases', icon: 'mysql', level: 78 },
    { name: 'PostgreSQL', category: 'Databases', icon: 'postgresql', level: 75 },
    { name: 'Git & GitHub', category: 'Tools & Cloud', icon: 'git', level: 88 },
    { name: 'Docker', category: 'Tools & Cloud', icon: 'docker', level: 55 },
    { name: 'Linux', category: 'Tools & Cloud', icon: 'linux', level: 70 },
    { name: 'Nginx', category: 'Tools & Cloud', icon: 'nginx', level: 55 },
    { name: 'Agile/Scrum', category: 'Tools & Cloud', icon: 'trello', level: 70 },
    { name: 'UI/UX Design', category: 'Tools & Cloud', icon: 'figma', level: 65 },
].map((skill) => ({
    id: String(skill.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    ...skill,
    proficiency: Math.max(0, Math.min(100, Number(skill.level || 0))),
    yearsUsed: skill.level >= 85 ? '3+' : skill.level >= 70 ? '2+' : '1+',
    teaser: `${skill.category} tool`,
    overview: `${skill.name} is part of my ${skill.category.toLowerCase()} stack and is used to build maintainable, production-ready products.`,
    projects: [],
    highlights: [
        'Built and shipped real product work with this technology',
        'Focused on maintainable architecture and clean interfaces',
        'Used in production workflows with measurable project impact'
    ],
    codeSnippet: null
}));

/* =========================================================================
   PROJECTS DATA
   ========================================================================= */
const projectsData = [
    {
        id: 'prime-invest-pro',
        name: 'Prime Invest Pro',
        // concept preview — replace with real screenshot when available
        image: 'images/prime-invest-pro-preview.jpg',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'OpenAI API'],
        desc: 'Enterprise-grade digital investment banking platform simulating core operations of a professional investment bank — portfolio & client management, live market data, and an AI financial assistant.',
        problem: 'Investment analysts lacked a unified platform for client portfolio tracking, live Ethiopian market data, and AI-assisted financial Q&A — forcing fragmented workflows across spreadsheets and external tools.',
        approach: 'Built a full-stack React + Node.js/Express + MongoDB platform with role-based access (Admin, Analyst, Manager), live market data integration, Chart.js performance dashboards, and an OpenAI-powered assistant trained on portfolio context.',
        highlights: [
            'Role-based authentication (Admin, Analyst, Manager) with KYC-style identity verification',
            'Live dashboard: total assets, portfolio performance, daily market summary, revenue & investment-growth charts',
            'Client/portfolio management table with search, filter, and PDF/Excel export',
            'Market watch panel — Ethiopian stock market, gold price, USD/ETB and EUR/ETB rates via live data integration',
            'Built-in investment calculator: principal, rate, term → future value & projected profit',
            'AI financial assistant powered by the OpenAI API for portfolio and market Q&A',
            'Professional banking-grade design system (navy/white/gold) with full dark mode'
        ],
        links: {
            github: 'https://github.com/yohannes1230/PrimeInvest-Pro',
            demo: '#',
            walkthrough: 'mailto:yohannesabegaz63@gmail.com?subject=Prime%20Invest%20Pro%20Walkthrough'
        }
    },
    {
        id: 'vehicle-brokerage-platform',
        name: 'Vehicle Brokerage Platform',
        image: 'images/car photo.jpg',
        tech: ['React', 'Node.js', 'Express', 'MongoDB'],
        desc: 'Built for brokers who need one place to track vehicle listings, buyer interest, and deal progress.',
        problem: 'Brokers relied on spreadsheets and phone calls to manage vehicle deals, leading to lost leads and delayed transactions.',
        approach: 'I designed a three-tier architecture with a React SPA, Express REST API, and MongoDB database. WebSockets enable real-time listing updates.',
        highlights: [
            'Designed RESTful API endpoints for vehicle CRUD and transaction state management',
            'Built role-based access for brokers, sellers, and admins with JWT auth',
            'Implemented real-time listing status updates via WebSocket integration',
            'Multer + Cloudinary pipeline for vehicle image uploads with compression'
        ],
        links: {
            github: 'https://github.com/yohannes1230',
            demo: '#',
            walkthrough: 'mailto:yohannesabegaz63@gmail.com?subject=Vehicle%20Brokerage%20Platform%20Walkthrough'
        }
    },
    {
        id: 'mesob-reporting-system',
        name: 'Mesob Reporting System',
        // concept preview image, replace with real screenshot
        image: 'images/mesob-preview.jpg',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        desc: 'Operational reporting platform for sales, service, and business monitoring in a single dashboard.',
        problem: 'Leadership teams were relying on fragmented reports and slow handoff between teams.',
        approach: 'I centralized KPI reporting with a clean dashboard layer and structured data views for daily operations.',
        highlights: [
            'Built KPI monitoring views for business performance and sales activity',
            'Designed a clean operations dashboard for fast decision-making',
            'Structured reporting flows to reduce operational blind spots'
        ],
        links: {
            github: 'https://github.com/yohannes1230',
            demo: '#',
            walkthrough: 'mailto:yohannesabegaz63@gmail.com?subject=Mesob%20Reporting%20System%20Walkthrough'
        }
    },
    {
        id: 'tipplay-sports-betting-and-casino-platform',
        name: 'Tipplay — Sports Betting & Casino Platform',
        // concept preview image, replace with real screenshot
        image: 'images/tipplay-preview.jpg',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth'],
        desc: 'A sports betting and casino platform built with Next.js, TypeScript, Tailwind CSS, Prisma, and NextAuth.',
        problem: 'Users needed a clear and secure betting experience with reliable account flows and admin oversight.',
        approach: 'I designed a modern dashboard stack with role-based account flows, odds display patterns, and modular admin views.',
        highlights: [
            'Rolled out role-aware account flows for bettors and operators',
            'Built dashboard patterns for odds, games, and transactions',
            'Designed admin controls for oversight, payouts, and status management'
        ],
        links: {
            github: 'https://github.com/yohannes1230',
            demo: '#',
            walkthrough: 'mailto:yohannesabegaz63@gmail.com?subject=Tipplay%20Project%20Walkthrough'
        }
    },
    {
        id: 'erp-system',
        name: 'ERP System',
        // concept preview image, replace with real screenshot
        image: 'images/erp-preview.jpg',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Express'],
        desc: 'Enterprise resource planning system covering inventory, HR, finance, and operational workflows.',
        problem: 'Different teams were using disconnected tools, creating delays and inconsistent records across departments.',
        approach: 'I built a modular ERP layer around shared resource models and cross-module workflows to keep processes aligned.',
        highlights: [
            'Unified inventory, finance, HR, and admin workflows in one platform',
            'Built connected data flows for consistent information across departments',
            'Designed dashboards for resource visibility and operational planning'
        ],
        links: {
            github: 'https://github.com/yohannes1230',
            demo: '#',
            walkthrough: 'mailto:yohannesabegaz63@gmail.com?subject=ERP%20System%20Walkthrough'
        }
    },
    {
        id: 'building-management-system',
        name: 'Building Management System',
        // concept preview image, replace with real screenshot
        image: 'images/bms-preview.jpg',
        tech: ['React', 'Node.js', 'MongoDB', 'Express'],
        desc: 'Property operations platform for tenants, maintenance requests, access, and billing.',
        problem: 'Facility teams were coordinating building tasks manually across a patchwork of spreadsheets and communication channels.',
        approach: 'I created a centralized operations dashboard for tenant records, maintenance routines, and billing workflows.',
        highlights: [
            'Managed tenant and unit records with access and service tracking',
            'Built maintenance request flows to speed up issue resolution',
            'Created billing and operational dashboards for building teams'
        ],
        links: {
            github: 'https://github.com/yohannes1230',
            demo: '#',
            walkthrough: 'mailto:yohannesabegaz63@gmail.com?subject=Building%20Management%20System%20Walkthrough'
        }
    },
    {
        id: 'enterprise-web-platform',
        name: 'Enterprise Web Platform',
        image: 'images/photo_2026-03-10_06-13-38.jpg',
        tech: ['Express', 'PostgreSQL', 'Node.js'],
        desc: 'Designed for organizations that need approval-heavy internal workflows and dependable reporting.',
        problem: 'Organizations struggled with manual approval chains, inconsistent data access, and poor audit trails.',
        approach: 'Built a modular Express.js server with PostgreSQL row-level security, a state-machine workflow engine, and comprehensive audit logging.',
        highlights: [
            'Architected multi-tier approval workflow engine with configurable rule chains',
            'Implemented row-level security policies in PostgreSQL for data isolation',
            'Built audit trail system logging every state change for compliance reporting',
            'Helmet.js, bcrypt, CSRF protection, and Joi validation for security'
        ],
        links: {
            github: 'https://github.com/yohannes1230',
            demo: '#',
            walkthrough: 'mailto:yohannesabegaz63@gmail.com?subject=Enterprise%20Web%20Platform%20Walkthrough'
        }
    },
    {
        id: 'blog-website',
        name: 'Blog Website',
        image: 'images/image123.png',
        tech: ['Next.js', 'Tailwind CSS'],
        desc: 'Created for writers who need a simple publishing workflow without sacrificing design.',
        problem: 'Writers needed a fast, SEO-optimized platform that was easy to publish on without complex CMS tools.',
        approach: 'Leveraged Next.js for hybrid rendering — static generation for posts, SSR for dynamic pages. Markdown with frontmatter for content management.',
        highlights: [
            'Implemented server-side rendering with Next.js for SEO-optimized blog pages',
            'Built dynamic routing and markdown parsing for flexible content creation',
            'Designed responsive layouts with TailwindCSS achieving 95+ Lighthouse scores',
            'Auto-generated sitemap and structured data (JSON-LD) for SEO'
        ],
        links: {
            github: 'https://github.com/yohannes1230',
            demo: '#',
            walkthrough: 'mailto:yohannesabegaz63@gmail.com?subject=Blog%20Website%20Walkthrough'
        }
    },
    {
        id: 'inventory-tracker',
        name: 'Inventory Tracker',
        image: 'images/inventory1.jpg',
        tech: ['MongoDB', 'Express', 'Node.js'],
        desc: 'Built to help small teams monitor stock levels, restocking needs, and inventory movement.',
        problem: 'Small teams managed inventory with spreadsheets, missing low-stock alerts and lacking reporting.',
        approach: 'Express.js with MongoDB aggregation pipelines for analytics, node-cron background jobs for alerts, and PDFKit/CSV export for reporting.',
        highlights: [
            'Designed MongoDB aggregation pipelines for real-time inventory analytics',
            'Implemented threshold-based alert system for automatic low-stock notifications',
            'Built export functionality generating CSV/PDF reports for stakeholders',
            'Clean MVC architecture with RESTful endpoints'
        ],
        links: {
            github: 'https://github.com/yohannes1230',
            demo: '#',
            walkthrough: 'mailto:yohannesabegaz63@gmail.com?subject=Inventory%20Tracker%20Walkthrough'
        }
    },
    {
        id: 'telegram-mini-apps',
        name: 'Telegram Mini Apps',
        image: 'images/telegram mini.jpg',
        tech: ['Telegram Bot API', 'Node.js'],
        desc: 'Lightweight in-chat tools with fast interactions and bot-connected workflows.',
        problem: 'Users needed quick-action tools within Telegram without leaving the chat interface.',
        approach: 'Node.js with Telegraf framework, webhook-based event handling via Nginx, and scene-based state machines for multi-step flows.',
        highlights: [
            'Integrated Telegram Bot API with webhook-based event handling',
            'Built inline keyboard navigation for complex multi-step user flows',
            'Optimized payload sizes for sub-200ms response times',
            'Dockerized deployment with PM2 process clustering'
        ],
        links: {
            github: 'https://github.com/yohannes1230',
            demo: '#',
            walkthrough: null
        }
    }
];

/* =========================================================================
   COMING SOON DATA
   ========================================================================= */
const comingSoonData = [
    { name: 'AI Study Companion', icon: 'bx-bot', tech: ['Python', 'FastAPI', 'OpenAI', 'React', 'Redis'], problem: 'Students waste hours on passive review instead of targeted practice on weak areas.', desc: 'A microservice-driven learning platform with a FastAPI backend orchestrating OpenAI embeddings for semantic content matching, a spaced-repetition scheduler, and a React dashboard.', progress: 35 },
    { name: 'Real-Time Analytics Hub', icon: 'bx-bar-chart-alt-2', tech: ['Next.js', 'Socket.io', 'D3.js', 'Redis', 'PostgreSQL'], problem: 'Teams rely on stale, batch-processed reports instead of live operational data.', desc: 'An event-driven analytics platform using Socket.io for bidirectional streaming, Redis pub/sub, D3.js for interactive visualizations, and a Next.js SSR shell.', progress: 20 },
    { name: 'Cross-Platform Expense Tracker', icon: 'bx-devices', tech: ['React Native', 'Node.js', 'MongoDB', 'Expo', 'Tesseract.js'], problem: 'Families and roommates lack a shared, real-time view of household spending.', desc: 'A cross-platform app with React Native + Expo, Node.js REST API with MongoDB change streams, OCR receipt scanning, and shared budget dashboards.', progress: 10 }
];


/* =========================================================================
   APP INITIALIZATION
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {

    // ===================== GREETING =====================
    const greetingEl = document.querySelector('#topbar-greeting h2');
    const h = new Date().getHours();
    const period = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
    if (greetingEl) {
        greetingEl.textContent = `Good ${period}, visitor 👋`;
    }

    // Update the hero eyebrow greeting to match time-of-day
    const heroGreetingSpan = document.querySelector('.hero-eyebrow__greeting');
    if (heroGreetingSpan) {
        heroGreetingSpan.textContent = `GOOD ${period.toUpperCase()}`;
    }

    // ===================== HERO TAGLINE ROTATOR =====================
    const rotator = document.querySelector('.hero-eyebrow__rotator');
    if (rotator) {
        let lines;
        try { lines = JSON.parse(rotator.dataset.lines); } catch (e) { lines = null; }
        if (lines && lines.length > 1) {
            let i = 0;
            rotator.textContent = lines[0];
            setInterval(() => {
                rotator.style.opacity = '0';
                setTimeout(() => {
                    i = (i + 1) % lines.length;
                    rotator.textContent = lines[i];
                    rotator.style.opacity = '1';
                }, 300);
            }, 3200);
        }
    }

    // ===================== FOCUS CARD 3D TILT =====================
    const focusCard = document.getElementById('hero-focus-card');
    if (focusCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        focusCard.addEventListener('mousemove', (e) => {
            const rect = focusCard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            focusCard.style.transform =
                `perspective(600px) rotateX(${(y * -6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
        });
        focusCard.addEventListener('mouseleave', () => {
            focusCard.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // ===================== AVATAR PULSE RING =====================
    // Pulse ring only appears when "open to work" badge is present
    const openToWorkBadge = document.getElementById('open-to-work-badge');
    const heroAvatar = document.getElementById('hero-avatar-large');
    if (heroAvatar && openToWorkBadge) {
        heroAvatar.classList.add('is-available');
    }


    // ===================== THEME TOGGLE =====================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.classList.toggle('bx-moon', theme === 'dark');
            themeIcon.classList.toggle('bx-sun', theme === 'light');
        }
    }

    // Init theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme') || 'dark';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // ===================== RENDER SKILLS =====================
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        const categories = [...new Set(skillsData.map(s => s.category))];
        const categoryIcons = { 'Languages': 'bx-terminal', 'Frameworks': 'bx-layer', 'Databases': 'bx-data', 'Tools & Cloud': 'bx-cloud' };
        // Map each skill icon key → devicon CDN variant that actually exists
        const iconVariantMap = {
            javascript:   'javascript/javascript-original.svg',
            typescript:   'typescript/typescript-original.svg',
            python:       'python/python-original.svg',
            cplusplus:    'cplusplus/cplusplus-original.svg',
            csharp:       'csharp/csharp-original.svg',
            java:         'java/java-original.svg',
            php:          'php/php-original.svg',
            html5:        'html5/html5-original.svg',
            css3:         'css3/css3-original.svg',
            nodejs:       'nodejs/nodejs-original.svg',
            express:      'express/express-original.svg',
            django:       'django/django-plain.svg',
            react:        'react/react-original.svg',
            nextjs:       'nextjs/nextjs-original.svg',
            bootstrap:    'bootstrap/bootstrap-original.svg',
            tailwindcss:  'tailwindcss/tailwindcss-original.svg',
            mongodb:      'mongodb/mongodb-original.svg',
            mysql:        'mysql/mysql-original.svg',
            postgresql:   'postgresql/postgresql-original.svg',
            git:          'git/git-original.svg',
            docker:       'docker/docker-original.svg',
            linux:        'linux/linux-original.svg',
            nginx:        'nginx/nginx-original.svg',
            trello:       'trello/trello-original.svg',
            figma:        'figma/figma-original.svg'
        };

        categories.forEach(cat => {
            const skills = skillsData.filter(s => s.category === cat);
            const section = document.createElement('div');
            section.className = 'skill-category-section';
            section.innerHTML = `<h3><i class='bx ${categoryIcons[cat] || 'bx-code-alt'}'></i> ${cat}</h3>`;

            const grid = document.createElement('div');
            grid.className = 'skill-cards-grid anim-stagger';

            skills.forEach((skill, idx) => {
                const level = Number(skill.level ?? 0);
                // Map category name to data-category slug for CSS color coding
                const catSlugMap = {
                    'Languages':     'languages',
                    'Frameworks':    'frameworks',
                    'Databases':     'databases',
                    'Tools & Cloud': 'tools-cloud'
                };
                const catSlug = catSlugMap[skill.category] || 'languages';
                const initials = (skill.name || '').split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase().slice(0, 2) || 'SK';
                const iconPath = iconVariantMap[skill.icon] || null;
                const iconSrc  = iconPath
                    ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconPath}`
                    : '';

                const card = document.createElement('div');
                card.className = 'skill-card tilt-card';
                card.setAttribute('data-skill-id', skill.id);
                card.setAttribute('role', 'button');
                card.setAttribute('tabindex', '0');
                card.setAttribute('aria-label', `View details for ${skill.name}`);

                card.innerHTML = `
                    <div class="skill-card-icon">
                        ${iconSrc ? `<img src="${iconSrc}" alt="${skill.name} logo" class="skill-icon-actual" loading="lazy" onerror="this.style.display='none';this.parentElement.querySelector('.skill-icon-fallback').style.display='inline-flex';">` : ''}
                        <span class="skill-icon-fallback" style="${iconSrc ? '' : 'display:inline-flex;'}">${initials}</span>
                    </div>
                    <div class="skill-card-info">
                        <div class="skill-card-name">${skill.name}</div>
                        <div class="skill-card-teaser">${skill.teaser}</div>
                    </div>
                    <div class="skill-gauge" data-level="${level}" data-category="${catSlug}" aria-label="${level}% proficiency">
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                            <circle class="skill-gauge__track" cx="32" cy="32" r="27"></circle>
                            <circle class="skill-gauge__fill"  cx="32" cy="32" r="27"></circle>
                        </svg>
                        <span class="skill-gauge__value">0%</span>
                    </div>
                `;

                card.addEventListener('click', () => openSkillDrawer(skill.id));
                card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSkillDrawer(skill.id); } });

                grid.appendChild(card);
            });

            section.appendChild(grid);
            skillsGrid.appendChild(section);
        });

        // ---- Gauge IntersectionObserver: fill once when card scrolls into view ----
        const CIRCUMFERENCE = 169.6; // 2 * π * 27
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const gaugeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const gauge = entry.target;
                const level = Number(gauge.dataset.level) || 0;
                const fillCircle = gauge.querySelector('.skill-gauge__fill');
                const valueLabel = gauge.querySelector('.skill-gauge__value');
                if (!fillCircle || !valueLabel) return;

                if (prefersReducedMotion) {
                    // Instant final state — no animation
                    fillCircle.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - level / 100));
                    valueLabel.textContent = `${level}%`;
                } else {
                    // Smooth fill
                    fillCircle.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - level / 100));

                    // Sync count-up label
                    const duration = 1100;
                    const start = performance.now();
                    function tick(now) {
                        const progress = Math.min((now - start) / duration, 1);
                        const current = Math.round(level * progress);
                        valueLabel.textContent = `${current}%`;
                        if (progress < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                }

                gaugeObserver.unobserve(gauge); // one-time only
            });
        }, { threshold: 0.4 });

        document.querySelectorAll('.skill-gauge').forEach(g => gaugeObserver.observe(g));


        // Fallback check: after images load, hide any that rendered at 0×0
        setTimeout(() => {
            document.querySelectorAll('.skill-icon-actual').forEach(icon => {
                if (icon.naturalWidth === 0 || icon.offsetWidth === 0) {
                    icon.style.display = 'none';
                    const fallback = icon.parentElement.querySelector('.skill-icon-fallback');
                    if (fallback) fallback.style.display = 'inline-flex';
                }
            });
        }, 800);
    }

    // ===================== RENDER PROJECTS =====================
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projectsGrid.classList.add('anim-stagger');
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card tilt-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View ${project.name} case study`);
            card.innerHTML = `
                <div class="project-card-image">
                    <img src="${project.image}" alt="${project.name} preview" loading="lazy">
                </div>
                <div class="project-card-body">
                    <h3 class="project-card-title">${project.name}</h3>
                    <p class="project-card-desc">${project.desc}</p>
                    <div class="project-card-tech">
                        ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openProjectDrawer(project.id));
            card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectDrawer(project.id); } });
            projectsGrid.appendChild(card);
        });
    }

    // ===================== RENDER COMING SOON =====================
    const csGrid = document.getElementById('coming-soon-grid');
    if (csGrid) {
        comingSoonData.forEach(cs => {
            const card = document.createElement('div');
            card.className = 'cs-card';
            card.innerHTML = `
                <div class="cs-badge"><i class='bx bx-time-five'></i> Coming Soon</div>
                <div class="cs-icon-wrap"><i class='bx ${cs.icon}'></i></div>
                <h3 class="cs-card-title">${cs.name}</h3>
                <p class="cs-problem"><i class='bx bx-target-lock'></i> Problem: ${cs.problem}</p>
                <p class="cs-card-desc">${cs.desc}</p>
                <div class="cs-tech-tags">${cs.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}</div>
                <div class="cs-progress"><div class="cs-progress-bar" style="--progress: ${cs.progress}%"></div></div>
                <span class="cs-progress-label">${cs.progress}% Complete</span>
            `;
            csGrid.appendChild(card);
        });
    }

    // ===================== RENDER DONUT CHART =====================
    const donutSvg = document.querySelector('.donut-svg');
    const donutLegend = document.getElementById('donut-legend');
    if (donutSvg && donutLegend) {
        const techUsage = {};
        projectsData.forEach(p => {
            p.tech.forEach(t => { techUsage[t] = (techUsage[t] || 0) + 1; });
        });
        const sorted = Object.entries(techUsage).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const total = sorted.reduce((s, e) => s + e[1], 0);
        const colors = ['var(--donut-1)', 'var(--donut-2)', 'var(--donut-3)', 'var(--donut-4)', 'var(--donut-5)'];
        const circumference = 2 * Math.PI * 50;
        let offset = 0;

        sorted.forEach(([tech, count], i) => {
            const pct = count / total;
            const dash = pct * circumference;
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '60');
            circle.setAttribute('cy', '60');
            circle.setAttribute('r', '50');
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke', colors[i]);
            circle.setAttribute('stroke-width', '12');
            circle.setAttribute('stroke-dasharray', `${dash} ${circumference - dash}`);
            circle.setAttribute('stroke-dashoffset', `${-offset}`);
            circle.style.transform = 'rotate(-90deg)';
            circle.style.transformOrigin = 'center';
            donutSvg.appendChild(circle);
            offset += dash;

            donutLegend.innerHTML += `
                <div class="donut-legend-item">
                    <span class="donut-legend-dot" style="background:${colors[i]}"></span>
                    <span>${tech} (${count})</span>
                </div>
            `;
        });
    }

    // ===================== MOBILE SIDEBAR =====================
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileOverlay = document.getElementById('mobile-sidebar-overlay');

    function openMobileSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('open');
        // Lock the real scroll container (not body — body is overflow:hidden at the CSS level)
        const ca = document.querySelector('.content-area');
        if (ca) ca.style.overflow = 'hidden';
    }
    function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('open');
        const ca = document.querySelector('.content-area');
        if (ca) ca.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileSidebar);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileSidebar);

    // Sidebar link clicks close mobile
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) closeMobileSidebar();
        });
    });

    // ===================== HASH ROUTER =====================
    function navigateTo(hash) {
        const route = hash.replace('#/', '').split('/')[0] || 'overview';
        const panels = document.querySelectorAll('.route-panel');
        const links = document.querySelectorAll('.sidebar-link');

        panels.forEach(p => {
            const isActive = p.getAttribute('data-route') === route;
            p.classList.toggle('active', isActive);
            p.setAttribute('aria-hidden', !isActive);
        });

        links.forEach(l => {
            const linkRoute = l.getAttribute('data-route');
            const isActive = linkRoute === route;
            l.classList.toggle('active', isActive);
            l.setAttribute('aria-current', isActive ? 'page' : 'false');
        });

        // Close mobile sidebar
        closeMobileSidebar();

        // Scroll content to top
        const contentArea = document.querySelector('.content-area');
        if (contentArea) contentArea.scrollTop = 0;

        // Handle deep links
        const parts = hash.replace('#/', '').split('/');
        if (parts[0] === 'skills' && parts[1]) {
            setTimeout(() => openSkillDrawer(parts[1]), 100);
        } else if (parts[0] === 'projects' && parts[1]) {
            setTimeout(() => openProjectDrawer(parts[1]), 100);
        }
    }

    window.addEventListener('hashchange', () => navigateTo(location.hash));

    // Init route
    if (!location.hash || location.hash === '#') {
        history.replaceState(null, '', '#/overview');
    }
    navigateTo(location.hash);

    // ===================== WIDE DRAWER =====================
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const drawerPanel = document.getElementById('drawer-panel');
    const drawerClose = document.getElementById('drawer-close');
    const drawerContent = document.getElementById('drawer-content');
    let previousHash = '';

    function openDrawer(html, hash) {
        previousHash = location.hash;
        if (drawerContent) drawerContent.innerHTML = html;
        if (drawerPanel) drawerPanel.classList.add('open');
        if (drawerBackdrop) drawerBackdrop.classList.add('open');
        if (drawerPanel) drawerPanel.setAttribute('aria-hidden', 'false');
        if (drawerBackdrop) drawerBackdrop.setAttribute('aria-hidden', 'false');
        const ca = document.querySelector('.content-area');
        if (ca) ca.style.overflowY = 'hidden';

        if (hash) history.pushState(null, '', hash);

        // Focus trap
        setTimeout(() => { if (drawerClose) drawerClose.focus(); }, 100);
    }

    function closeDrawer() {
        if (drawerPanel) drawerPanel.classList.remove('open');
        if (drawerBackdrop) drawerBackdrop.classList.remove('open');
        if (drawerPanel) drawerPanel.setAttribute('aria-hidden', 'true');
        if (drawerBackdrop) drawerBackdrop.setAttribute('aria-hidden', 'true');
        const ca = document.querySelector('.content-area');
        if (ca) ca.style.overflowY = '';

        if (previousHash) {
            history.pushState(null, '', previousHash);
            previousHash = '';
        }
    }

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drawerPanel && drawerPanel.classList.contains('open')) closeDrawer();
    });

    // ---- Open Skill Drawer ----
    window.openSkillDrawer = function (skillId) {
        const skill = skillsData.find(s => s.id === skillId);
        if (!skill) return;

        const projectChips = skill.projects.map(pName => {
            const proj = projectsData.find(p => p.name === pName);
            return proj ? `<button class="drawer-project-chip" onclick="closeDrawer();setTimeout(()=>openProjectDrawer('${proj.id}'),100)">${pName}</button>` : `<span class="drawer-project-chip">${pName}</span>`;
        }).join('');

        const codeBlock = skill.codeSnippet ? `
            <div class="drawer-section">
                <h3>Code Example</h3>
                <pre class="drawer-code-block">${skill.codeSnippet.code}</pre>
            </div>
        ` : '';

        const html = `
            <div class="drawer-skill-header">
                <div class="drawer-skill-icon"><i class='bx ${skill.icon}'></i></div>
                <div class="drawer-skill-meta">
                    <h2>${skill.name}</h2>
                    <div class="drawer-skill-stats">
                        <span><i class='bx bx-time'></i> ${skill.yearsUsed} years</span>
                        <span><i class='bx bx-folder'></i> Used in ${skill.projects.length} projects</span>
                        <span><i class='bx bx-star'></i> ${skill.proficiency}/5</span>
                    </div>
                </div>
            </div>
            <div class="drawer-section">
                <h3>Overview</h3>
                <p>${skill.overview}</p>
            </div>
            ${skill.projects.length ? `
            <div class="drawer-section">
                <h3>Where I've Used It</h3>
                <div class="drawer-project-chips">${projectChips}</div>
            </div>` : ''}
            <div class="drawer-section">
                <h3>Key Highlights</h3>
                <ul class="drawer-highlights">${skill.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
            </div>
            ${codeBlock}
        `;

        openDrawer(html, `#/skills/${skillId}`);
    };

    // ---- Open Project Drawer ----
    window.openProjectDrawer = function (projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        const techChips = project.tech.map(t => {
            const skill = skillsData.find(s => s.name === t || s.name.toLowerCase() === t.toLowerCase());
            return skill ? `<button class="drawer-tech-chip" onclick="closeDrawer();setTimeout(()=>openSkillDrawer('${skill.id}'),100)">${t}</button>` : `<span class="drawer-tech-chip">${t}</span>`;
        }).join('');

        const demoLink = project.links.demo && project.links.demo !== '#' ? `<a href="${project.links.demo}" class="drawer-link" target="_blank" rel="noopener noreferrer"><i class='bx bx-link-external'></i> Live Demo</a>` : '';
        const walkthroughLink = project.links.walkthrough ? `<a href="${project.links.walkthrough}" class="drawer-link"><i class='bx bx-envelope'></i> Request Walkthrough</a>` : '';

        const html = `
            <div class="drawer-project-header">
                <h2>${project.name}</h2>
                <div class="drawer-project-tech">${techChips}</div>
            </div>
            <div class="drawer-project-image">
                <img src="${project.image}" alt="${project.name}" loading="lazy">
            </div>
            <div class="drawer-section">
                <h3>Problem</h3>
                <p>${project.problem}</p>
            </div>
            <div class="drawer-section">
                <h3>Approach</h3>
                <p>${project.approach}</p>
            </div>
            <div class="drawer-section">
                <h3>Key Highlights</h3>
                <ul class="drawer-highlights">${project.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
            </div>
            <div class="drawer-project-links">
                <a href="${project.links.github}" class="drawer-link" target="_blank" rel="noopener noreferrer"><i class='bx bxl-github'></i> GitHub</a>
                ${demoLink}
                ${walkthroughLink}
            </div>
        `;

        openDrawer(html, `#/projects/${projectId}`);
    };

    window.closeDrawer = closeDrawer;

    // ===================== COMMAND PALETTE =====================
    const cmdBackdrop = document.getElementById('cmd-backdrop');
    const cmdPalette = document.getElementById('cmd-palette');
    const cmdInput = document.getElementById('cmd-input');
    const cmdResults = document.getElementById('cmd-results');
    let cmdSelectedIndex = -1;

    const cmdItems = [
        ...['overview', 'about', 'skills', 'projects', 'coming-soon', 'education', 'contact', 'resume'].map(r => ({
            type: 'Section', label: r.charAt(0).toUpperCase() + r.slice(1).replace('-', ' '), icon: 'bx-layout', action: () => { location.hash = `#/${r}`; }
        })),
        ...projectsData.map(p => ({
            type: 'Project', label: p.name, icon: 'bx-folder-open', action: () => { location.hash = '#/projects'; setTimeout(() => openProjectDrawer(p.id), 200); }
        })),
        ...skillsData.map(s => ({
            type: 'Skill', label: s.name, icon: 'bx-code-alt', action: () => { location.hash = '#/skills'; setTimeout(() => openSkillDrawer(s.id), 200); }
        }))
    ];

    function openCmdPalette() {
        if (cmdPalette) cmdPalette.classList.add('open');
        if (cmdBackdrop) cmdBackdrop.classList.add('open');
        if (cmdInput) { cmdInput.value = ''; cmdInput.focus(); }
        renderCmdResults('');
    }
    function closeCmdPalette() {
        if (cmdPalette) cmdPalette.classList.remove('open');
        if (cmdBackdrop) cmdBackdrop.classList.remove('open');
        cmdSelectedIndex = -1;
    }

    function renderCmdResults(query) {
        if (!cmdResults) return;
        const q = query.toLowerCase().trim();
        const filtered = q ? cmdItems.filter(i => i.label.toLowerCase().includes(q)) : cmdItems;

        if (!filtered.length) {
            cmdResults.innerHTML = '<div class="cmd-no-results">No results found</div>';
            return;
        }

        const grouped = {};
        filtered.forEach(item => {
            if (!grouped[item.type]) grouped[item.type] = [];
            grouped[item.type].push(item);
        });

        let html = '';
        let idx = 0;
        for (const [type, items] of Object.entries(grouped)) {
            html += `<div class="cmd-group-label">${type}s</div>`;
            items.forEach(item => {
                html += `<div class="cmd-result-item" data-index="${idx}" tabindex="-1"><i class='bx ${item.icon}'></i><span>${item.label}</span></div>`;
                idx++;
            });
        }
        cmdResults.innerHTML = html;
        cmdSelectedIndex = -1;

        cmdResults.querySelectorAll('.cmd-result-item').forEach(el => {
            el.addEventListener('click', () => {
                const i = parseInt(el.getAttribute('data-index'));
                const flatFiltered = Object.values(grouped).flat();
                if (flatFiltered[i]) { flatFiltered[i].action(); closeCmdPalette(); }
            });
        });
    }

    if (cmdInput) {
        cmdInput.addEventListener('input', () => renderCmdResults(cmdInput.value));
        cmdInput.addEventListener('keydown', e => {
            const items = cmdResults ? cmdResults.querySelectorAll('.cmd-result-item') : [];
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                cmdSelectedIndex = Math.min(cmdSelectedIndex + 1, items.length - 1);
                items.forEach((el, i) => el.classList.toggle('selected', i === cmdSelectedIndex));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                cmdSelectedIndex = Math.max(cmdSelectedIndex - 1, 0);
                items.forEach((el, i) => el.classList.toggle('selected', i === cmdSelectedIndex));
            } else if (e.key === 'Enter' && cmdSelectedIndex >= 0 && items[cmdSelectedIndex]) {
                items[cmdSelectedIndex].click();
            }
        });
    }

    document.getElementById('cmd-palette-btn')?.addEventListener('click', openCmdPalette);
    if (cmdBackdrop) cmdBackdrop.addEventListener('click', closeCmdPalette);
    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (cmdPalette && cmdPalette.classList.contains('open')) closeCmdPalette(); else openCmdPalette();
        }
        if (e.key === 'Escape' && cmdPalette && cmdPalette.classList.contains('open')) closeCmdPalette();
    });

    // ===================== TYPEWRITER EFFECT =====================
    const prefersReducedMotionTyped = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll(".typed-line").forEach((el) => {
        const lines = JSON.parse(el.dataset.lines);
        
        if (prefersReducedMotionTyped) {
            el.textContent = lines[0];
            const cursor = el.nextElementSibling;
            if (cursor && cursor.classList.contains('cursor')) {
                cursor.style.display = 'none'; // hide cursor if static
            }
            return;
        }

        let lineIndex = 0, charIndex = 0, deleting = false;

        function tick() {
            const current = lines[lineIndex];
            el.textContent = deleting
                ? current.slice(0, charIndex--)
                : current.slice(0, charIndex++);

            let delay = deleting ? 25 : 45;
            if (!deleting && charIndex === current.length + 1) { delay = 1400; deleting = true; }
            if (deleting && charIndex === 0) { deleting = false; lineIndex = (lineIndex + 1) % lines.length; delay = 300; }
            setTimeout(tick, delay);
        }
        tick();
    });

    // ===================== COUNT-UP ANIMATION =====================
    const countEls = document.querySelectorAll('[data-count]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                if (prefersReducedMotion) {
                    el.textContent = target;
                    countObserver.unobserve(el);
                    return;
                }
                let current = 0;
                const step = Math.max(1, Math.floor(target / 40));
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(interval); }
                    el.textContent = current;
                }, 30);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    countEls.forEach(el => countObserver.observe(el));

    // ===================== 3D TILT EFFECT =====================
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-2px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ===================== CONTACT FORM =====================
    const contactForm = document.getElementById('contactForm');

    function validateContactForm() {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        [nameError, emailError, messageError].forEach(el => { if (el) { el.textContent = ''; el.style.display = 'none'; } });
        [nameInput, emailInput, messageInput].forEach(el => { if (el) el.classList.remove('input-error'); });

        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            nameError.textContent = nameInput.value.trim() ? 'Name must be at least 2 characters.' : 'Please enter your name.';
            nameError.style.display = 'block';
            nameInput.classList.add('input-error');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = emailInput.value.trim() ? 'Please enter a valid email address.' : 'Please enter your email.';
            emailError.style.display = 'block';
            emailInput.classList.add('input-error');
            isValid = false;
        }

        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            messageError.textContent = messageInput.value.trim() ? 'Message must be at least 10 characters.' : 'Please enter a message.';
            messageError.style.display = 'block';
            messageInput.classList.add('input-error');
            isValid = false;
        }

        return isValid;
    }

    function showToast(type, title, message) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const icon = type === 'success' ? 'bx-check-circle' : 'bx-error-circle';
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class='bx ${icon}'></i><div class="toast-text"><strong>${title}</strong><span>${message}</span></div>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async e => {
            e.preventDefault();
            if (!validateContactForm()) return;

            const btn = contactForm.querySelector('.submit-btn');
            const formStatus = document.getElementById('form-status');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
            btn.disabled = true;
            if (formStatus) { formStatus.textContent = ''; formStatus.className = 'form-status-msg'; }

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();
                    if (formStatus) {
                        formStatus.textContent = "Message sent — I'll get back to you within 24 hours.";
                        formStatus.className = 'form-status-msg form-status--success';
                    }
                    showToast('success', 'Message Sent!', "Thanks for reaching out. I'll get back to you within 24 hours.");
                } else {
                    const data = await response.json().catch(() => null);
                    const msg = data?.errors
                        ? data.errors.map(err => err.message).join(', ')
                        : 'Something went wrong — please email me directly at yohannesabegaz63@gmail.com.';
                    if (formStatus) {
                        formStatus.textContent = msg;
                        formStatus.className = 'form-status-msg form-status--error';
                    }
                    showToast('error', 'Send Failed', 'Please try again or email directly.');
                }
            } catch (err) {
                const msg = 'Network error — please email me directly at yohannesabegaz63@gmail.com.';
                if (formStatus) {
                    formStatus.textContent = msg;
                    formStatus.className = 'form-status-msg form-status--error';
                }
                showToast('error', 'Network Error', 'Please check your connection and try again.');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalHTML;
            }
        });

        contactForm.querySelectorAll('.form-input, .form-textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.classList.remove('input-error');
                const errorEl = document.getElementById(field.id + '-error');
                if (errorEl) { errorEl.textContent = ''; errorEl.style.display = 'none'; }
            });
        });
    }

    // ===================== PHONE PRIVACY TOGGLE =====================
    const phoneToggle = document.getElementById('phone-toggle');
    const phoneIcon = document.getElementById('phone-toggle-icon');
    const phoneTextMain = document.getElementById('phone-text-main');
    const PHONE_FULL = '0977062985';
    const PHONE_MASKED = '097****985';
    let phoneVisible = false;

    if (phoneToggle) {
        phoneToggle.addEventListener('click', e => {
            e.stopPropagation();
            phoneVisible = !phoneVisible;
            if (phoneTextMain) phoneTextMain.textContent = phoneVisible ? PHONE_FULL : PHONE_MASKED;
            if (phoneIcon) {
                phoneIcon.classList.toggle('bx-hide', !phoneVisible);
                phoneIcon.classList.toggle('bx-show', phoneVisible);
            }
        });
    }

    // ===================== OVERVIEW QA CHIPS =====================
    document.querySelectorAll('#overview-qa-chips .qa-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const chatToggle = document.getElementById('chatbot-toggle');
            if (chatToggle) chatToggle.click();
            setTimeout(() => {
                const chatInput = document.getElementById('chatbot-input');
                if (chatInput) {
                    chatInput.value = chip.dataset.question;
                    document.getElementById('chatbot-send')?.click();
                }
            }, 500);
        });
    });

    // ===================== IMAGE FALLBACK =====================
    document.querySelectorAll('.project-card-image img, .drawer-project-image img').forEach(img => {
        img.addEventListener('error', () => { img.style.display = 'none'; });
    });

}); // End DOMContentLoaded


/* =========================================================================
   AI CHATBOT (preserved from original — self-contained IIFE)
   ========================================================================= */
(function initChatbot() {
    'use strict';

    const portfolio = {
        name: 'Yohannes Abegaz', title: 'Full-Stack Developer',
        university: 'Addis Ababa University', program: 'Information Systems',
        year: '3rd year', graduationExpected: '2027',
        location: 'Addis Ababa, Ethiopia', email: 'yohannesabegaz63@gmail.com',
        phone: '0977062985',
        github: 'https://github.com/yohannes1230',
        linkedin: 'https://www.linkedin.com/in/yohannes-abegaz-139325314',
        languages: ['JavaScript', 'Python', 'C++', 'C#', 'Java', 'PHP', 'HTML5', 'CSS3'],
        frameworks: ['Node.js', 'Express', 'Django', 'React', 'Bootstrap', 'Tailwind'],
        databases: ['MongoDB', 'MySQL'],
        tools: ['Git & GitHub', 'Docker', 'Linux', 'Nginx', 'Agile/Scrum', 'UI/UX Design'],
        about: 'Yohannes is an Information Systems student at Addis Ababa University and a hands-on full-stack developer. He enjoys building software that helps people manage real operational work.',
        projects: {
            'vehicle brokerage platform': { name: 'Vehicle Brokerage Platform', tech: 'React, Node.js, Express, MongoDB', desc: 'A full-stack platform for brokers to track vehicle listings, buyer interest, and deal progress.', highlights: ['RESTful API for vehicle CRUD and transactions', 'Role-based access with JWT auth', 'Real-time updates via WebSocket'], deepDive: 'The **Vehicle Brokerage Platform** uses a three-tier architecture: React SPA, Express REST API, and MongoDB. WebSockets provide real-time listing updates. JWT with refresh tokens handles auth. Multer + Cloudinary for image uploads.' },
            'enterprise web platform': { name: 'Enterprise Web Platform', tech: 'Express, PostgreSQL, Node.js', desc: 'Internal operations system with approval workflows.', highlights: ['Multi-tier approval workflow engine', 'Row-level security in PostgreSQL', 'Audit trail system'], deepDive: 'The **Enterprise Web Platform** uses Express.js with PostgreSQL row-level security, a state-machine workflow engine, and comprehensive audit logging for compliance.' },
            'blog website': { name: 'Blog Website', tech: 'Next.js, TailwindCSS', desc: 'Responsive content publishing platform.', highlights: ['SSR with Next.js for SEO', 'Dynamic routing + markdown parsing', '95+ Lighthouse scores'], deepDive: 'The **Blog Website** uses Next.js hybrid rendering, markdown with frontmatter, and TailwindCSS. Achieved 95+ Lighthouse scores with next/image optimization.' },
            'inventory tracker': { name: 'Inventory Tracker', tech: 'MongoDB, Express, Node.js', desc: 'Stock management with alerts and reporting.', highlights: ['MongoDB aggregation pipelines', 'Threshold-based alert system', 'CSV/PDF export'], deepDive: 'The **Inventory Tracker** uses MongoDB aggregation ($group, $lookup, $facet) for analytics, node-cron for background alerts, and PDFKit for report generation.' },
            'telegram mini apps': { name: 'Telegram Mini Apps', tech: 'Telegram Bot API, Node.js', desc: 'Lightweight in-chat tools.', highlights: ['Webhook-based event handling', 'Scene-based state machine', 'Sub-200ms response times'], deepDive: 'The **Telegram Mini Apps** use Telegraf framework with webhook-based updates via Nginx. Scene-based state machines manage multi-step flows. Dockerized with PM2 clustering.' }
        },
        comingSoon: [
            { name: 'AI Study Companion', tech: 'Python, FastAPI, OpenAI, React, Redis' },
            { name: 'Real-Time Analytics Hub', tech: 'Next.js, Socket.io, D3.js, Redis, PostgreSQL' },
            { name: 'Cross-Platform Expense Tracker', tech: 'React Native, Node.js, MongoDB, Expo' }
        ]
    };

    let lastTopic = null;

    function explainProject(name) {
        const key = name.toLowerCase();
        let project = portfolio.projects[key];
        if (!project) {
            for (const k of Object.keys(portfolio.projects)) {
                if (k.includes(key) || key.includes(k.split(' ')[0])) { project = portfolio.projects[k]; break; }
            }
        }
        if (!project) return "I couldn't find that project. Try: **Vehicle Brokerage Platform**, **Enterprise Web Platform**, **Blog Website**, **Inventory Tracker**, or **Telegram Mini Apps**.";
        lastTopic = project.name;
        return project.deepDive;
    }

    function generateResponse(q) {
        q = q.toLowerCase().trim();

        const explainMatch = q.match(/explain\s+(?:the\s+)?(.+?)(?:\s+(?:in\s+detail|project|for me|please))?$/i);
        if (explainMatch && explainMatch[1]) return explainProject(explainMatch[1].replace(/\s+project$/i, '').trim());

        if (/^(hi|hello|hey|yo|sup|greetings)/i.test(q)) return "Hey! 👋 I'm Yohannes's portfolio AI. Ask about his **projects**, **skills**, **education**, or **contact** info!";
        if (/skill|tech|stack|language|framework|tool|database/i.test(q)) { lastTopic = 'skills'; return `🛠️ **Technical Arsenal:**\n\n**Languages:** ${portfolio.languages.join(', ')}\n**Frameworks:** ${portfolio.frameworks.join(', ')}\n**Databases:** ${portfolio.databases.join(', ')}\n**Tools:** ${portfolio.tools.join(', ')}\n\nStrongest combo: **React + Node.js + MongoDB**. Ask me to explain any project!`; }

        const projectKeys = Object.keys(portfolio.projects);
        for (const pk of projectKeys) {
            if (q.includes(pk) || q.includes(pk.split(' ')[0])) {
                const p = portfolio.projects[pk];
                lastTopic = p.name;
                return `📋 **${p.name}** (${p.tech})\n\n${p.desc}\n\n**Highlights:**\n• ${p.highlights.join('\n• ')}\n\nSay **"Explain ${p.name}"** for a deep dive!`;
            }
        }

        if (/project|portfolio|work|built/i.test(q)) { lastTopic = 'projects'; return `🚀 **${projectKeys.length} Projects:**\n\n${projectKeys.map((k, i) => `**${i + 1}. ${portfolio.projects[k].name}** — ${portfolio.projects[k].tech}`).join('\n')}\n\nSay **"Explain [name]"** for details!`; }
        if (/coming soon|upcoming|future/i.test(q)) return `⏳ **Pipeline:**\n\n${portfolio.comingSoon.map((c, i) => `**${i + 1}. ${c.name}** — ${c.tech}`).join('\n')}`;
        if (/education|university|student|degree/i.test(q)) return `🎓 **${portfolio.university}**\n📚 ${portfolio.program} (${portfolio.year})\n📅 Graduation: **${portfolio.graduationExpected}**`;
        if (/contact|email|phone|hire|reach/i.test(q)) return `📬 **Contact:**\n\n📧 ${portfolio.email}\n📱 ${portfolio.phone}\n🔗 GitHub: github.com/yohannes1230\n📍 ${portfolio.location}`;
        if (/about|who|tell me|background/i.test(q)) return `🙋‍♂️ **About Yohannes:**\n\n${portfolio.about}`;
        if (/thank|thanks|awesome|great/i.test(q)) return `Glad I could help! 😊 Reach out at **${portfolio.email}**`;
        if (lastTopic && /more|detail|elaborate/i.test(q) && portfolio.projects[lastTopic.toLowerCase()]) return explainProject(lastTopic);

        return "I can tell you about Yohannes's **skills**, **projects**, **education**, or **contact** info. Try clicking a suggestion chip!";
    }

    function renderMarkdown(text) {
        return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    }

    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatMessages = document.getElementById('chatbot-messages');
    const chatInput = document.getElementById('chatbot-input');
    const chatSend = document.getElementById('chatbot-send');
    const suggestions = document.getElementById('chatbot-suggestions');

    if (!chatToggle || !chatWindow) return;

    function toggleChat() { chatWindow.classList.toggle('open'); if (chatWindow.classList.contains('open') && chatInput) chatInput.focus(); }
    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `chat-msg ${sender}-msg`;
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}-bubble`;
        bubble.innerHTML = sender === 'bot' ? renderMarkdown(text) : text;
        div.appendChild(bubble);
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    let isSending = false;
    function sendMessage(text) {
        if (!text || isSending) return;
        isSending = true;
        addMessage(text, 'user');
        chatInput.value = '';
        if (suggestions) suggestions.style.display = 'none';

        const typing = document.createElement('div');
        typing.className = 'chat-msg bot-msg';
        typing.id = 'typing-indicator';
        typing.innerHTML = '<div class="chat-bubble bot-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div><div class="typing-label">Thinking…</div></div>';
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            const t = document.getElementById('typing-indicator');
            if (t) t.remove();
            addMessage(generateResponse(text), 'bot');
            isSending = false;
        }, 600 + Math.random() * 600);
    }

    function handleSend() { const t = chatInput.value.trim(); if (t) sendMessage(t); }
    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => { chatInput.value = chip.dataset.question; handleSend(); });
    });
})();
