/* =========================================================================
   Yohannes Abegaz | Portfolio JavaScript
   Handles interactions, reveal animations, and mobile menu
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Reveal Elements on Scroll --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });

    /* --- 2. Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- 3. Mobile Navigation Menu --- */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    };

    if (mobileMenuBtn && closeMenuBtn && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);

        mobileLinks.forEach((link) => {
            link.addEventListener('click', toggleMenu);
        });
    }

    /* --- 4. Active Nav Link Highlighting --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNavLink = () => {
        const scrollY = window.scrollY;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);

    /* --- 5. Contact Form — Client-side Validation + Formspree AJAX + Success Message ---
       FIX: Replaced placeholder YOUR_FORM_ID submission with proper client-side validation
       that checks all fields before submission and shows inline error messages under each
       field. Shows a success confirmation message after submission that replaces the form. */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formSuccessReset = document.getElementById('formSuccessReset');

    // Inline validation helper — returns true if all fields pass
    function validateContactForm() {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        // Clear previous errors
        [nameError, emailError, messageError].forEach(el => { if (el) { el.textContent = ''; el.style.display = 'none'; } });
        [nameInput, emailInput, messageInput].forEach(el => { if (el) el.classList.remove('input-error'); });

        // Name validation
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Please enter your name.';
            nameError.style.display = 'block';
            nameInput.classList.add('input-error');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters.';
            nameError.style.display = 'block';
            nameInput.classList.add('input-error');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Please enter your email address.';
            emailError.style.display = 'block';
            emailInput.classList.add('input-error');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            emailInput.classList.add('input-error');
            isValid = false;
        }

        // Message validation
        if (!messageInput.value.trim()) {
            messageError.textContent = 'Please enter a message.';
            messageError.style.display = 'block';
            messageInput.classList.add('input-error');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters.';
            messageError.style.display = 'block';
            messageInput.classList.add('input-error');
            isValid = false;
        }

        return isValid;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Run validation first
            if (!validateContactForm()) return;

            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
            btn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            })
                .then((response) => {
                    if (response.ok) {
                        // FIX: Show success confirmation that replaces the form
                        contactForm.reset();
                        contactForm.style.display = 'none';
                        if (formSuccess) formSuccess.style.display = 'flex';
                    } else {
                        btn.innerHTML = 'Error, try again <i class="bx bx-error"></i>';
                        btn.style.background = '#ef4444';
                    }
                })
                .catch(() => {
                    btn.innerHTML = 'Error, try again <i class="bx bx-error"></i>';
                    btn.style.background = '#ef4444';
                })
                .finally(() => {
                    btn.disabled = false;
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 3000);
                });
        });

        // Clear inline error when user starts typing in a field
        contactForm.querySelectorAll('.form-input, .form-textarea').forEach((field) => {
            field.addEventListener('input', () => {
                field.classList.remove('input-error');
                const errorEl = document.getElementById(field.id + '-error');
                if (errorEl) { errorEl.textContent = ''; errorEl.style.display = 'none'; }
            });
        });
    }

    // "Send Another Message" button resets the success view
    if (formSuccessReset) {
        formSuccessReset.addEventListener('click', () => {
            if (formSuccess) formSuccess.style.display = 'none';
            if (contactForm) contactForm.style.display = '';
        });
    }

    /* --- 6. Phone Number Privacy Toggle ---
       Starts masked (097****985). Eye icon toggles show/hide.
       Syncs the contact section and footer phone displays. */
    const phoneToggle = document.getElementById('phone-toggle');
    const phoneIcon = document.getElementById('phone-toggle-icon');
    const phoneTextMain = document.getElementById('phone-text-main');
    const phoneTextFooter = document.getElementById('phone-text-footer');
    const phoneWrapMain = document.getElementById('phone-wrap-main');
    const phoneFooter = document.getElementById('phone-link-footer');
    const PHONE_FULL = '0977062985';
    const PHONE_MASKED = '097****985';
    let phoneVisible = false;

    if (phoneToggle) {
        phoneToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            phoneVisible = !phoneVisible;

            if (phoneVisible) {
                // Show full number
                if (phoneTextMain) phoneTextMain.textContent = PHONE_FULL;
                if (phoneTextFooter) phoneTextFooter.textContent = PHONE_FULL;
                if (phoneIcon) { phoneIcon.classList.remove('bx-hide'); phoneIcon.classList.add('bx-show'); }
                phoneToggle.title = 'Hide phone number';
                // Make the main wrap a clickable link
                if (phoneWrapMain) phoneWrapMain.style.cursor = 'pointer';
                if (phoneFooter) phoneFooter.style.cursor = 'pointer';
            } else {
                // Re-mask the number
                if (phoneTextMain) phoneTextMain.textContent = PHONE_MASKED;
                if (phoneTextFooter) phoneTextFooter.textContent = PHONE_MASKED;
                if (phoneIcon) { phoneIcon.classList.remove('bx-show'); phoneIcon.classList.add('bx-hide'); }
                phoneToggle.title = 'Show phone number';
                if (phoneWrapMain) phoneWrapMain.style.cursor = '';
                if (phoneFooter) phoneFooter.style.cursor = '';
            }
        });

        // Clicking the phone wrap (not the toggle) dials when visible
        if (phoneWrapMain) {
            phoneWrapMain.addEventListener('click', () => {
                if (phoneVisible) window.location.href = 'tel:' + PHONE_FULL;
            });
        }
        if (phoneFooter) {
            phoneFooter.addEventListener('click', () => {
                if (phoneVisible) window.location.href = 'tel:' + PHONE_FULL;
            });
        }
    }

    /* --- 7. Project Image Fallback --- */
    document.querySelectorAll('.project-image img').forEach((img) => {
        img.addEventListener('error', () => {
            const wrapper = img.closest('.project-image');
            if (wrapper) {
                wrapper.classList.add('is-fallback');
            }
        });
    });

    /* --- 7. Footer Particle Network Animation --- */
    const canvas = document.getElementById('footer-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let isFooterVisible = false;

        const resizeCanvas = () => {
            const footer = document.getElementById('footer-section');
            if (footer) {
                canvas.width = footer.offsetWidth;
                canvas.height = footer.offsetHeight;
            }
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            const maxDist = 150;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const opacity = (1 - dist / maxDist) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!isFooterVisible) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            drawConnections();
            animationId = requestAnimationFrame(animate);
        };

        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                isFooterVisible = entry.isIntersecting;
                if (isFooterVisible) {
                    animate();
                } else {
                    cancelAnimationFrame(animationId);
                }
            });
        }, { threshold: 0.05 });

        const footerEl = document.getElementById('footer-section');
        if (footerEl) {
            footerObserver.observe(footerEl);
        }

        resizeCanvas();
        initParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }
});

/* =========================================================================
   AI Chatbot — Local Intelligence Engine
   FIX: Removed all backend/streaming/localhost references (API_BASE,
   MAX_RETRIES, RETRY_DELAY, backendAvailable, conversationHistory,
   MAX_HISTORY_LENGTH, sendToBackend, createStreamBubble, checkBackend).
   The chatbot runs entirely client-side with the local generateResponse().
   Self-contained IIFE; does NOT modify any code above.
   ========================================================================= */

(function initChatbotV3() {
    'use strict';


    /* ================================================================
       DEEP PORTFOLIO KNOWLEDGE BASE (Local Fallback)
       ================================================================ */
    var portfolio = {
        name: 'Yohannes Abegaz',
        title: 'Full-Stack Developer',
        university: 'Addis Ababa University',
        program: 'Information Systems',
        year: '3rd year',
        graduationExpected: '2027',
        location: 'Addis Ababa, Ethiopia',
        email: 'yohannesabegaz63@gmail.com',
        phone: '0977062985',
        github: 'https://github.com/yohannes1230',
        linkedin: 'https://www.linkedin.com/in/yohannes-abegaz-139325314',
        languages: ['JavaScript', 'Python', 'C++', 'C#', 'Java', 'PHP', 'HTML5', 'CSS3'],
        frameworks: ['Node.js', 'Express', 'Django', 'React', 'Bootstrap', 'Tailwind'],
        databases: ['MongoDB', 'MySQL'],
        tools: ['Git & GitHub', 'Docker', 'Linux', 'Nginx', 'Agile/Scrum', 'UI/UX Design'],
        about: 'Yohannes is an Information Systems student at Addis Ababa University and a hands-on full-stack developer. He enjoys building software that helps people manage real operational work \u2014 from internal dashboards to transaction-heavy web platforms. He is currently seeking internships, junior developer roles, and collaborative projects where he can contribute quickly while growing as an engineer.',
        coursework: 'Systems analysis and design, database systems, software engineering, networking, and project implementation.',

        projects: {
            'vehicle brokerage platform': {
                name: 'Vehicle Brokerage Platform',
                tech: 'React, Node.js, Express, MongoDB',
                desc: 'A full-stack platform for brokers to track vehicle listings, buyer interest, and deal progress.',
                highlights: [
                    'Designed RESTful API endpoints for vehicle CRUD and transaction state management',
                    'Built role-based access for brokers, sellers, and admins with JWT authentication',
                    'Implemented real-time listing status updates via WebSocket integration'
                ],
                deepDive: 'The **Vehicle Brokerage Platform** was architected as a three-tier application.\n\n**Backend:** A Node.js + Express REST API handles listing management, user authentication (JWT with refresh tokens), and transaction workflows. The API follows a controller-service-repository pattern for clean separation of concerns.\n\n**Database:** MongoDB with Mongoose ODM. Collections are structured with embedded documents for vehicle specs and referenced documents for user relationships. Indexes are optimized for search queries on make, model, year, and price range.\n\n**Frontend:** React with component-based architecture, React Router for SPA navigation, and Context API for state management. The broker dashboard uses a Kanban-style layout for tracking deal stages.\n\n**Key Technical Decisions:**\n\u2022 WebSocket layer (Socket.io) for real-time listing updates and bid notifications\n\u2022 Multer + Cloudinary pipeline for vehicle image uploads with automatic compression\n\u2022 Rate limiting and input sanitization middleware for API security'
            },
            'enterprise web platform': {
                name: 'Enterprise Web Platform',
                tech: 'Express, PostgreSQL, Node.js',
                desc: 'An internal operations system with approval workflows, secure data handling, and multi-step task management.',
                highlights: [
                    'Architected multi-tier approval workflow engine with configurable rule chains',
                    'Implemented row-level security policies in PostgreSQL for data isolation',
                    'Built audit trail system logging every state change for compliance reporting'
                ],
                deepDive: 'The **Enterprise Web Platform** is an operations management system designed for organizations with complex approval hierarchies.\n\n**Architecture:** A monolithic Express.js server with a modular route structure. Each business domain (approvals, reports, user management) is isolated into its own module with dedicated controllers and middleware.\n\n**Database:** PostgreSQL with advanced features \u2014 row-level security (RLS) policies ensure tenants only access their own data, materialized views power dashboards, and database triggers maintain audit logs automatically.\n\n**Workflow Engine:** A state-machine based approval engine where each request passes through configurable stages. Approvers are determined dynamically based on department, amount thresholds, and custom business rules stored as JSON configuration.\n\n**Security:** Helmet.js for HTTP headers, bcrypt for password hashing, CSRF protection, and comprehensive input validation with Joi schemas.'
            },
            'blog website': {
                name: 'Blog Website',
                tech: 'Next.js, TailwindCSS',
                desc: 'A responsive content publishing platform with clean CMS and mobile-friendly experience.',
                highlights: [
                    'Implemented server-side rendering with Next.js for SEO-optimized blog pages',
                    'Built dynamic routing and markdown parsing for flexible content creation',
                    'Designed responsive layouts with TailwindCSS achieving 95+ Lighthouse scores'
                ],
                deepDive: 'The **Blog Website** leverages Next.js for hybrid rendering \u2014 static generation for blog posts and server-side rendering for dynamic pages.\n\n**Content System:** Markdown files with YAML frontmatter serve as the content source. gray-matter parses metadata, and remark + rehype transform markdown into sanitized HTML with syntax highlighting via Prism.js.\n\n**Routing:** Next.js dynamic routes with `getStaticPaths` for pre-generating blog post pages at build time. Incremental Static Regeneration (ISR) enables content updates without full rebuilds.\n\n**Performance:** TailwindCSS with PurgeCSS for minimal CSS bundles. Images use next/image for automatic WebP conversion and lazy loading. Achieved 95+ Lighthouse scores across all categories.\n\n**SEO:** Dynamic meta tags, Open Graph images, structured data (JSON-LD), and an auto-generated sitemap.'
            },
            'inventory tracker': {
                name: 'Inventory Tracker',
                tech: 'MongoDB, Express, Node.js',
                desc: 'Stock management tool with low-stock alerts, reporting views, and CRUD operations.',
                highlights: [
                    'Designed MongoDB aggregation pipelines for real-time inventory analytics',
                    'Implemented threshold-based alert system for automatic low-stock notifications',
                    'Built export functionality generating CSV/PDF reports for stakeholders'
                ],
                deepDive: 'The **Inventory Tracker** solves the problem of small teams managing stock with spreadsheets.\n\n**Backend:** Express.js with a clean MVC architecture. RESTful endpoints handle products, categories, suppliers, and transaction logs. Middleware handles authentication and request validation.\n\n**Database:** MongoDB leveraging the aggregation framework extensively \u2014 `$group`, `$lookup`, and `$facet` stages power dashboard analytics showing stock levels, movement trends, and value summaries.\n\n**Alert System:** Background jobs (node-cron) periodically check inventory levels against configurable thresholds. When triggered, alerts are dispatched via email (Nodemailer) and stored in a notification queue.\n\n**Reporting:** PDFKit generates formatted inventory reports. CSV exports use json2csv for data portability. Both support date-range filtering and category breakdowns.'
            },
            'telegram mini apps': {
                name: 'Telegram Mini Apps',
                tech: 'Telegram Bot API, Node.js',
                desc: 'Lightweight in-chat tools with fast interactions and bot-connected workflows.',
                highlights: [
                    'Integrated Telegram Bot API with webhook-based event handling for real-time responses',
                    'Built inline keyboard navigation for complex multi-step user flows',
                    'Optimized payload sizes for sub-200ms response times within chat interface'
                ],
                deepDive: 'The **Telegram Mini Apps** are a collection of purpose-built bots designed for in-chat productivity.\n\n**Architecture:** Node.js server using the Telegraf framework for structured bot development. Webhooks (via Nginx reverse proxy) handle incoming updates instead of long-polling for reliability and lower latency.\n\n**User Flows:** Complex multi-step interactions are managed with a scene-based state machine. Each "scene" represents a step in the workflow (e.g., data entry \u2192 confirmation \u2192 result), with inline keyboards providing structured navigation.\n\n**Performance:** Payloads are kept minimal \u2014 messages use Telegram\u2019s native markdown for formatting. Response times average under 200ms by pre-computing common responses and caching frequently accessed data with in-memory stores.\n\n**Deployment:** Dockerized for consistent environments. Nginx handles SSL termination and webhook routing. PM2 manages process clustering for high availability.'
            }
        },

        comingSoon: [
            { name: 'AI Study Companion', tech: 'Python, FastAPI, OpenAI, React, Redis' },
            { name: 'Real-Time Analytics Hub', tech: 'Next.js, Socket.io, D3.js, Redis, PostgreSQL' },
            { name: 'Cross-Platform Expense Tracker', tech: 'React Native, Node.js, MongoDB, Expo, Tesseract.js' }
        ]
    };

    /* ================================================================
       CONTEXT TRACKING
       ================================================================ */
    var lastTopic = null;

    /* ================================================================
       explainProject() â€” Deep Technical Dive
       ================================================================ */
    function explainProject(projectName) {
        var key = projectName.toLowerCase();
        var project = portfolio.projects[key];
        if (!project) {
            // Fuzzy match
            var keys = Object.keys(portfolio.projects);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].indexOf(key) !== -1 || key.indexOf(keys[i].split(' ')[0]) !== -1) {
                    project = portfolio.projects[keys[i]];
                    break;
                }
            }
        }
        if (!project) {
            return "I couldn't find a project matching \"" + projectName + "\". Try asking about: **Vehicle Brokerage Platform**, **Enterprise Web Platform**, **Blog Website**, **Inventory Tracker**, or **Telegram Mini Apps**.";
        }

        lastTopic = project.name;
        return project.deepDive;
    }

    /* ================================================================
       RESPONSE GENERATOR â€” Advanced Intent Matching
       ================================================================ */
    function generateResponse(query) {
        var q = query.toLowerCase().trim();

        // --- Explicit project explain request ---
        var explainMatch = q.match(/explain\s+(?:the\s+)?(.+?)(?:\s+(?:in\s+detail|project|for me|please))?$/i);
        if (explainMatch && explainMatch[1]) {
            return explainProject(explainMatch[1].replace(/\s+project$/i, '').trim());
        }

        // --- Greeting ---
        if (/^(hi|hello|hey|yo|sup|greetings|howdy|what'?s up|good\s+(morning|afternoon|evening))/i.test(q)) {
            return "Hey! \uD83D\uDC4B I'm Yohannes's portfolio AI. I can explain how any of his **5 projects** are built, break down his **tech stack**, or tell you about his **education** and how to **contact** him. What interests you?";
        }

        // --- Skills / Tech ---
        if (/skill|tech|stack|language|framework|tool|database|what.*(know|use|work)|proficien/i.test(q)) {
            lastTopic = 'skills';
            return "\uD83D\uDEE0\uFE0F **Yohannes's Technical Arsenal:**\n\n**Languages:** " + portfolio.languages.join(', ') + "\n**Frameworks:** " + portfolio.frameworks.join(', ') + "\n**Databases:** " + portfolio.databases.join(', ') + "\n**Tools & DevOps:** " + portfolio.tools.join(', ') + "\n\nHis strongest combination is **React + Node.js + MongoDB** for full-stack web apps, with growing experience in **Django** and **PostgreSQL** for enterprise-grade backends. Want me to explain how he uses these in a specific project?";
        }

        // --- Specific project name mention ---
        var projectKeys = Object.keys(portfolio.projects);
        for (var pk = 0; pk < projectKeys.length; pk++) {
            if (q.indexOf(projectKeys[pk]) !== -1 || q.indexOf(projectKeys[pk].split(' ')[0]) !== -1) {
                var p = portfolio.projects[projectKeys[pk]];
                lastTopic = p.name;
                return "\uD83D\uDCCB **" + p.name + "** (" + p.tech + ")\n\n" + p.desc + "\n\n**Key highlights:**\n\u2022 " + p.highlights.join('\n\u2022 ') + "\n\nWant me to **explain this project in detail**? Just ask!";
            }
        }

        // --- General projects ---
        if (/project|portfolio|work|built|build|made|create/i.test(q)) {
            lastTopic = 'projects';
            var resp = "\uD83D\uDE80 **Yohannes has built " + projectKeys.length + " production-quality projects:**\n\n";
            projectKeys.forEach(function(key, i) {
                var pr = portfolio.projects[key];
                resp += "**" + (i + 1) + ". " + pr.name + "** \u2014 " + pr.tech + "\n";
            });
            resp += "\nHe also has **" + portfolio.comingSoon.length + " projects in the pipeline**.\n\nSay **\"Explain [project name]\"** for a deep technical breakdown of any project!";
            return resp;
        }

        // --- Coming soon ---
        if (/coming soon|upcoming|future|pipeline|next|roadmap/i.test(q)) {
            lastTopic = 'coming-soon';
            var resp2 = "\u23F3 **Projects in the Pipeline:**\n\n";
            portfolio.comingSoon.forEach(function(cs, i) {
                resp2 += "**" + (i + 1) + ". " + cs.name + "** \u2014 " + cs.tech + "\n";
            });
            resp2 += "\nThese projects focus on AI/ML, real-time systems, and cross-platform mobile development.";
            return resp2;
        }

        // --- Education ---
        if (/education|university|college|school|degree|study|student|course|academic|graduat/i.test(q)) {
            lastTopic = 'education';
            return "\uD83C\uDF93 **Education:**\n\n\uD83C\uDFEB **" + portfolio.university + "**\n\uD83D\uDCDA " + portfolio.program + " (" + portfolio.year + ")\n\uD83D\uDCC5 Expected Graduation: **" + portfolio.graduationExpected + "**\n\n**Relevant Coursework:** " + portfolio.coursework + "\n\nOutside academics, Yohannes spends most of his time deepening his full-stack development, API design, and deployment workflow skills through hands-on projects.";
        }

        // --- Contact ---
        if (/contact|email|phone|hire|reach|connect|message|talk|available|open to/i.test(q)) {
            lastTopic = 'contact';
            return "\uD83D\uDCEC **Get in Touch with Yohannes:**\n\n\uD83D\uDCE7 **Email:** " + portfolio.email + "\n\uD83D\uDCF1 **Phone:** " + portfolio.phone + "\n\uD83D\uDD17 **GitHub:** github.com/yohannes1230\n\uD83D\uDD17 **LinkedIn:** linkedin.com/in/yohannes-abegaz\n\uD83D\uDCCD **Location:** " + portfolio.location + "\n\nHe\u2019s currently open for **internships, junior dev roles, and collaborative projects**. He typically responds to emails within 24 hours.";
        }

        // --- About / Who ---
        if (/about|who|tell me|yourself|background|intro|summary|overview|describe/i.test(q)) {
            lastTopic = 'about';
            return "\uD83D\uDE4B\u200D\u2642\uFE0F **About Yohannes Abegaz:**\n\n" + portfolio.about + "\n\nHis strongest work sits at the intersection of **backend logic**, **database design**, and **usable interfaces**. He takes vague processes, understands the bottlenecks, and turns them into software teams can rely on daily.";
        }

        // --- Name ---
        if (/name|called|who are|who is/i.test(q)) {
            return "His name is **" + portfolio.name + "** \u2014 a " + portfolio.title + " based in " + portfolio.location + ". He\u2019s a " + portfolio.year + " " + portfolio.program + " student at " + portfolio.university + ".";
        }

        // --- Location ---
        if (/where|location|based|live|city|country|from/i.test(q)) {
            return "\uD83D\uDCCD Yohannes is based in **" + portfolio.location + "**. He\u2019s open to both local and remote opportunities.";
        }

        // --- Experience ---
        if (/experience|intern|job|role|work.*at|employ|resume|cv/i.test(q)) {
            lastTopic = 'experience';
            return "Yohannes is a " + portfolio.year + " student actively seeking **internships and junior developer roles**.\n\nHis practical experience comes from building **" + projectKeys.length + " production-quality projects** covering:\n\u2022 Full-stack web development (React, Node.js, Express)\n\u2022 RESTful API design and authentication systems\n\u2022 Database architecture (MongoDB, PostgreSQL)\n\u2022 Real-time features (WebSockets, Telegram Bot API)\n\u2022 DevOps basics (Docker, Nginx, Linux)\n\nWant to see his resume? There\u2019s a **Download Resume** button in the hero section.";
        }

        // --- Architecture / Design patterns ---
        if (/architect|design pattern|structure|how.*(built|designed|organized|structured)/i.test(q)) {
            return "\uD83C\uDFD7\uFE0F Yohannes follows these architectural patterns across his projects:\n\n\u2022 **MVC / Controller-Service-Repository** for clean backend separation\n\u2022 **Component-based** frontend architecture (React)\n\u2022 **RESTful API design** with proper HTTP semantics and status codes\n\u2022 **JWT-based auth** with refresh token rotation\n\u2022 **State machines** for complex workflow management\n\nWant me to explain the architecture of a specific project in detail?";
        }

        // --- Thanks ---
        if (/thank|thanks|thx|cheers|appreciate|cool|nice|awesome|great/i.test(q)) {
            return "Glad I could help! \uD83D\uDE0A Ask me anything else, or reach out directly at **" + portfolio.email + "**. Yohannes would love to hear from you!";
        }

        // --- Capabilities ---
        if (/what can you|help|what do you know|how do you work|capabilities/i.test(q)) {
            return "\uD83E\uDD16 I can answer questions about:\n\n\u2022 **Yohannes\u2019s skills** and tech stack\n\u2022 **Each of his " + projectKeys.length + " projects** (with deep technical breakdowns)\n\u2022 His **education** and coursework\n\u2022 **How to contact** him\n\u2022 His **experience** and what he\u2019s looking for\n\u2022 **Architecture decisions** behind his work\n\nTry: **\"Explain the Vehicle Brokerage Platform\"** for a deep dive!";
        }

        // --- Follow-up awareness ---
        if (lastTopic && /more|detail|elaborate|tell me more|go on|continue|deeper|expand/i.test(q)) {
            if (portfolio.projects[lastTopic.toLowerCase()]) {
                return explainProject(lastTopic);
            }
            if (lastTopic === 'skills') {
                return "Diving deeper into skills: Yohannes is most proficient in **JavaScript/Node.js** for backend work and **React** for frontend. He\u2019s comfortable with both **NoSQL (MongoDB)** and **SQL (PostgreSQL/MySQL)** databases. On the DevOps side, he uses **Docker** for containerization, **Nginx** as a reverse proxy, and **Git** for version control with feature-branch workflows.";
            }
        }

        // --- Default fallback ---
        return "That\u2019s an interesting question! \uD83E\uDD14 I\u2019m best at answering about Yohannes\u2019s:\n\n\u2022 **Skills** \u2014 \u201CWhat tech does Yohannes use?\u201D\n\u2022 **Projects** \u2014 \u201CExplain the Inventory Tracker\u201D\n\u2022 **Education** \u2014 \u201CWhere does Yohannes study?\u201D\n\u2022 **Contact** \u2014 \u201CHow can I hire Yohannes?\u201D\n\nTry one of these, or click a suggestion chip below!";
    }

    /* ================================================================
       MARKDOWN-LITE RENDERER (bold + bullets)
       ================================================================ */
    function renderMarkdown(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    /* ================================================================
       DOM REFERENCES
       ================================================================ */
    var chatToggle = document.getElementById('chatbot-toggle');
    var chatWindow = document.getElementById('chatbot-window');
    var chatClose = document.getElementById('chatbot-close');
    var chatMessages = document.getElementById('chatbot-messages');
    var chatInput = document.getElementById('chatbot-input');
    var chatSend = document.getElementById('chatbot-send');
    var suggestions = document.getElementById('chatbot-suggestions');

    if (!chatToggle || !chatWindow) return;

    /* ================================================================
       TOGGLE CHAT
       ================================================================ */
    function openChat() {
        if (!chatWindow.classList.contains('open')) {
            chatWindow.classList.add('open');
            chatInput.focus();
        }
    }

    function closeChat() {
        chatWindow.classList.remove('open');
    }

    function toggleChat() {
        if (chatWindow.classList.contains('open')) {
            closeChat();
        } else {
            openChat();
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', closeChat);

    /* ================================================================
       ADD MESSAGE
       ================================================================ */
    function addMessage(text, sender) {
        var msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg ' + sender + '-msg';

        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble ' + sender + '-bubble';
        bubble.innerHTML = sender === 'bot' ? renderMarkdown(text) : text;

        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /* ================================================================
       TYPING INDICATOR (with "Thinking..." label)
       ================================================================ */
    function showTyping() {
        var typingDiv = document.createElement('div');
        typingDiv.className = 'chat-msg bot-msg';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<div class="chat-bubble bot-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div><div class="typing-label">Thinking\u2026</div></div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTyping() {
        var el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    /* ================================================================
       SEND HANDLER
       FIX: Simplified — goes directly to local generateResponse().
       Removed all backend streaming, fetch, retry, and SSE logic.
       ================================================================ */
    var isSending = false;

    function sendMessage(text) {
        if (!text || isSending) return;
        isSending = true;

        addMessage(text, 'user');
        chatInput.value = '';

        if (suggestions) suggestions.style.display = 'none';

        showTyping();

        // Realistic delay before showing response (0.6-1.4s)
        var delay = 600 + Math.random() * 800;
        setTimeout(function() {
            removeTyping();
            var response = generateResponse(text);
            addMessage(response, 'bot');
            isSending = false;
        }, delay);
    }

    function handleSend() {
        var text = chatInput.value.trim();
        if (text) sendMessage(text);
    }

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') handleSend();
    });

    /* FIX: Mobile keyboard fallback — touchstart on send button
       ensures the message is sent even if 'click' doesn't fire
       reliably on some mobile virtual keyboards. */
    chatSend.addEventListener('touchstart', function(e) {
        e.preventDefault();
        handleSend();
    }, { passive: false });

    /* ================================================================
       SUGGESTION CHIP CLICKS
       ================================================================ */
    document.querySelectorAll('.suggestion-chip').forEach(function(chip) {
        chip.addEventListener('click', function() {
            chatInput.value = chip.dataset.question;
            handleSend();
        });
    });

    /* ================================================================
       FEATURE: "Explain with AI" BUTTON on project cards
       ================================================================ */
    document.querySelectorAll('.project-link-ai').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var projectName = btn.dataset.project;
            if (projectName) {
                openChat();
                setTimeout(function() {
                    sendMessage('Explain ' + projectName + ' in detail');
                }, 400);
            }
        });
    });

    /* ================================================================
       FEATURE: Project card click â†’ Toast suggestion
       ================================================================ */
    var toastTimeout = null;
    document.querySelectorAll('.project-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            // Don't show toast if a link was clicked
            if (e.target.closest('a')) return;

            var titleEl = card.querySelector('.project-title');
            if (!titleEl) return;
            var projectName = titleEl.textContent.trim();

            // Remove existing toast
            var existingToast = document.querySelector('.chatbot-project-toast');
            if (existingToast) existingToast.remove();
            if (toastTimeout) clearTimeout(toastTimeout);

            // Create toast
            var toast = document.createElement('div');
            toast.className = 'chatbot-project-toast';
            toast.innerHTML = '<i class="bx bx-bot"></i><span>Want me to explain <strong>' + projectName + '</strong>?</span><button class="toast-close"><i class="bx bx-x"></i></button>';
            document.body.appendChild(toast);

            // Click toast â†’ open chatbot with explain
            toast.addEventListener('click', function(ev) {
                if (ev.target.closest('.toast-close')) {
                    toast.remove();
                    return;
                }
                toast.remove();
                openChat();
                setTimeout(function() {
                    sendMessage('Explain ' + projectName + ' in detail');
                }, 400);
            });

            // Auto-dismiss after 6s
            toastTimeout = setTimeout(function() {
                if (toast.parentNode) toast.remove();
            }, 6000);
        });
    });

    /* ================================================================
       FEATURE: Auto-open chatbot after 20s (once per session)
       FIX: Changed from 6s to 20s. Added scroll/click interaction
       detection — if the user has scrolled or clicked anywhere on the
       page, the auto-open is cancelled to avoid interrupting them.
       ================================================================ */
    var userHasInteracted = false;
    var interactionHandler = function() {
        userHasInteracted = true;
        // Remove listeners after first interaction to avoid overhead
        window.removeEventListener('scroll', interactionHandler);
        document.removeEventListener('click', interactionHandler);
    };
    window.addEventListener('scroll', interactionHandler);
    document.addEventListener('click', interactionHandler);

    if (!sessionStorage.getItem('chatbot_opened')) {
        setTimeout(function() {
            // FIX: Cancel auto-open if user has already interacted
            if (userHasInteracted) return;
            if (!chatWindow.classList.contains('open')) {
                openChat();
                sessionStorage.setItem('chatbot_opened', '1');
            }
        }, 20000);
    }

    /* ================================================================
       FIX: Disable dead project links (href="#")
       Adds .link-disabled class, tooltip, cursor: not-allowed, and
       prevents the default click from scrolling to top.
       ================================================================ */
    document.querySelectorAll('.project-link-demo').forEach(function(link) {
        if (link.getAttribute('href') === '#') {
            link.classList.add('link-disabled');
            link.setAttribute('title', 'Coming soon \u2014 contact me for a walkthrough');
            link.setAttribute('aria-disabled', 'true');
            link.addEventListener('click', function(e) { e.preventDefault(); });
        }
    });

    /* ================================================================
       OBSERVE Coming Soon reveal elements
       ================================================================ */
    var csRevealElements = document.querySelectorAll('.coming-soon .reveal');
    if (csRevealElements.length) {
        var csObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        csRevealElements.forEach(function(el) { csObserver.observe(el); });
    }
})();

