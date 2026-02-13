// ===== SAMZY DIGITAL CHATBOT v10.1 – FINAL =====
// ✅ 200+ QUESTIONS – ALL YOUR FAQs + EXISTING Q&As
// ✅ FRIENDLY PAGE NAMES (Business page, Community page, etc.)
// ✅ EXACT MATCH + 2‑WORD OVERLAP – GUARANTEED ANSWERS
// ✅ DIRECTIONS POINT TO PAGES IN PLAIN ENGLISH
// ✅ FORMSPREE FALLBACK – EMAILS YOU UNANSWERED QUESTIONS
// =================================================
(function() {
    "use strict";

    // ----- DOM ELEMENTS -----
    const bubble = document.getElementById('samzy-bubble');
    const windowEl = document.getElementById('samzy-window');
    const closeBtn = document.getElementById('samzy-close');
    const messagesEl = document.getElementById('samzy-messages');
    const inputEl = document.getElementById('samzy-user-input');
    const sendBtn = document.getElementById('samzy-send');
    let isOpen = false;

    const GREETING = "Hey there! 👋 I'm Samzy's assistant. Ask me about websites, pricing, learning to code, hosting, or the community.";

    // ----- FORMSPREE (YOUR EMAIL + ENDPOINT) -----
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqqdela';
    function sendToFormspree(question) {
        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                question: question,
                _replyto: 'samuelahiaba3@gmail.com',
                _subject: '🤖 Chatbot question - needs your answer'
            })
        }).catch(console.error);
    }

    // ----- NORMALISE TEXT (lowercase, remove punctuation, collapse spaces) -----
    function normaliseText(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // ------------------------------------------------------------
    //  KNOWLEDGE BASE – 200+ QUESTIONS (FULLY UPDATED WITH FRIENDLY PAGE NAMES)
    //  All categories combined:
    //  • Website Development (25)
    //  • How to Become a Developer (20)
    //  • Website Pricing & Costs (20)
    //  • Hosting & Maintenance (20)
    //  • Joke Questions (16)
    //  • Services & Packages (from previous work)
    //  • Community (from previous work)
    //  • Coding for Beginners (from previous work)
    //  • Logistics & Policies (from previous work)
    //  • Portfolio & Contact (from previous work)
    //  • Resources (from previous work)
    //  • Psycho / Slang (from previous work)
    //  • Fallback (last)
    // ------------------------------------------------------------
    const knowledge = [

        // ---------- 🌐 1. WEBSITE DEVELOPMENT (25) ----------
        { keywords: ["web development", "what is web development", "web dev definition", "what is web dev"], answer: "Web development is the process of building and maintaining websites. It includes frontend (what users see), backend (servers & databases), and everything in between. I specialise in custom‑coded, responsive sites 🖥️" },
        { keywords: ["frontend", "backend", "difference", "front end", "back end", "frontend vs backend"], answer: "Frontend = everything you see and interact with (HTML, CSS, JavaScript). Backend = servers, databases, user authentication (Node, Python, PHP). Full‑stack = both. I handle full‑stack projects – you don't need to worry about the split 🎨" },
        { keywords: ["programming languages", "languages", "code languages", "what languages"], answer: "For frontend: HTML, CSS, JavaScript. For backend: Node.js, PHP, Python. I also use frameworks like React. You can start with just HTML & CSS – download my **Free Coding Starter Guide** from the **Resources page** 📘" },
        { keywords: ["how long build website", "time to build", "development timeline", "how long does it take"], answer: "A Basic site: 1‑2 weeks, Standard: 2‑3 weeks, E‑commerce: 3‑5 weeks. Depends on content and feedback speed. Rush option available (30% expedite fee). See the **Business page** for packages 📅" },
        { keywords: ["cms", "content management system", "what is cms"], answer: "A CMS lets you edit your site without coding. I can build custom CMS or use WordPress if you prefer. For most clients, I build a clean, easy‑to‑update custom site. Details in the **Pricing Guide** on the **Business page** 📝" },
        { keywords: ["wordpress vs custom", "wordpress or custom", "should i use wordpress", "wordpress"], answer: "I prefer **custom code** – faster, more secure, no plugin bloat. But if you need WordPress (for themes/plugins), I can do that too. Let me know your preference via the **Contact page** 🛠️" },
        { keywords: ["responsive design", "mobile friendly", "responsive", "mobile responsive"], answer: "Responsive design means your site adapts to any screen – phone, tablet, desktop. Every site I build is 100% responsive. I test on real devices. Non‑negotiable 📱" },
        { keywords: ["domain name", "domain", "what is domain"], answer: "A domain is your website address (e.g., samzydigital.com). I can help you register one via **Namecheap**. Annual fee ~$10‑15. Explained in the **Pricing Guide** on the **Business page** 🌐" },
        { keywords: ["web hosting", "hosting", "what is hosting"], answer: "Hosting is where your website files live. I recommend **SiteGround** or **Cloudways**. I can set it up for you. All details in the **Pricing Guide** (download from the **Business page**) 🖥️" },
        { keywords: ["ssl certificate", "ssl", "https", "what is ssl"], answer: "SSL encrypts data between your site and visitors. Essential for security and Google ranking. I include a free SSL certificate with every site (Let's Encrypt). No extra cost 🔒" },
        { keywords: ["seo", "search engine optimization", "google ranking"], answer: "SEO helps your site rank on Google. I include **on‑page SEO** (meta tags, structure, speed) in every package. Advanced SEO (link building, local SEO) available as add‑on. Check the **Pricing Guide** on the **Business page** 🔍" },
        { keywords: ["build website myself", "diy website", "can i build myself"], answer: "You can, using website builders like Wix or Squarespace. But if you want a fast, custom, scalable site that you fully own, hiring a developer is better. I'm happy to help either way 🤝" },
        { keywords: ["html css javascript", "html", "css", "javascript"], answer: "HTML = structure, CSS = style, JavaScript = interactivity. The three core technologies of the web. I teach them in the **Community Learning Modules** on the **Community page** 💻" },
        { keywords: ["full stack developer", "full stack"], answer: "A full‑stack developer works on both frontend and backend. I am full‑stack – I can build everything from the database to the button you click 🧰" },
        { keywords: ["version control", "git", "github"], answer: "Git tracks changes in your code. GitHub stores it online. Essential for collaboration and backups. I use Git on every project. You can learn it in the Community Learning Modules (the **Community page**) 📦" },
        { keywords: ["api", "what is api", "application programming interface"], answer: "API = Application Programming Interface. It lets your site talk to other services (payment gateways, maps, email). I integrate APIs for custom features. More in the **Pricing Guide** 💡" },
        { keywords: ["mobile friendly", "make website mobile"], answer: "Every site I build is mobile‑friendly by default. I use a mobile‑first approach – designs look perfect on phones, then scale up 📱" },
        { keywords: ["ecommerce website", "ecommerce", "online store"], answer: "An e‑commerce website sells products or services online. My **Premium** package includes product catalog, cart, checkout, and payment gateway. Full details in the **Pricing Guide** on the **Business page** 🛒" },
        { keywords: ["payment gateway", "accept payments", "online payments"], answer: "I integrate **Paystack**, **Stripe**, or **PayPal** for secure payments. Setup included in e‑commerce package. More in the **Pricing Guide** 💳" },
        { keywords: ["accessibility", "a11y", "wcag"], answer: "Accessibility (a11y) ensures people with disabilities can use your site. I follow WCAG guidelines – alt text, keyboard navigation, contrast ratios. Inclusive design is non‑negotiable ♿" },
        { keywords: ["optimize website speed", "site speed", "fast website", "speed optimization"], answer: "I optimise images, minify code, use lazy loading, and recommend fast hosting. Speed is a ranking factor and improves user experience. Included in every package ⚡" },
        { keywords: ["website builder vs custom", "builder vs custom"], answer: "Website builders (Wix, Squarespace) are easy but limit you. Custom code gives you full control, better performance, and you own everything. I build custom sites that you can hand off to any developer later 🏗️" },
        { keywords: ["create blog", "add blog", "blog"], answer: "I can add a **blog** to any site. You'll be able to write and publish posts easily. Included in Standard & Premium packages ✍️" },
        { keywords: ["secure website", "website security", "security"], answer: "I use HTTPS, secure coding practices, regular updates, and daily backups. Maintenance plans include security monitoring. More in the **Pricing Guide** 🔐" },
        { keywords: ["website maintenance", "maintenance includes"], answer: "Maintenance includes: security updates, backups, content tweaks, performance checks, and 24h support. Monthly or pay‑as‑you‑go. See **Pricing Guide** on the **Business page** 🔧" },

        // ---------- 👨‍💻 2. HOW TO BECOME A DEVELOPER (20) ----------
        { keywords: ["skills to become web developer", "developer skills", "what skills"], answer: "Start with HTML, CSS, JavaScript. Then version control (Git), frameworks (React), and backend basics. Soft skills: communication, problem‑solving. My **Community Learning Modules** cover everything – join free at the **Community page** 🧠" },
        { keywords: ["degree needed", "cs degree", "do i need degree", "college"], answer: "No, you don't need a degree. I don't have one. Portfolio and people skills matter more. But university can be great for structure. Neither path is wrong 🎯" },
        { keywords: ["how long learn web dev", "learning timeline", "how long to become developer"], answer: "With consistent practice (1hr/day), you can build a job‑ready portfolio in 6‑12 months. Join the Community at the **Community page** to accelerate 🚀" },
        { keywords: ["best way learn web development", "how to learn", "learn web dev"], answer: "Build projects, don't just watch tutorials. Start with the **Free Coding Starter Guide** on the **Resources page**, then join the Community for structured Learning Modules 📚" },
        { keywords: ["frontend or backend first", "which first", "where to start"], answer: "Start with frontend – it's visual and satisfying. HTML → CSS → JavaScript. Then explore backend. My Learning Path on the **Community page** is designed for this 🎨" },
        { keywords: ["best online courses", "courses", "online courses"], answer: "Free: MDN, freeCodeCamp, The Odin Project. Paid: Coursera, Udemy. Plus my free Learning Modules on the **Community page**. No need to spend money at the beginning 📖" },
        { keywords: ["coding bootcamp worth it", "bootcamp", "should i do bootcamp"], answer: "Bootcamps can accelerate you, but they're expensive. Try free resources first. If you need structure, I recommend part‑time bootcamps. Many successful developers never attended one 🎒" },
        { keywords: ["build portfolio", "portfolio", "how to build portfolio"], answer: "Build 3‑5 real projects: personal site, small business site, to‑do app, weather app. Deploy them live. My **Starter Guide** on the **Resources page** includes portfolio project tutorials 🖥️" },
        { keywords: ["first web developer job", "get first job", "how to get hired"], answer: "Start freelancing for local businesses, contribute to open source, network on LinkedIn, join the Community Talent Portal (the **Community page**). Your first job may not be glamorous – that's okay 🔁" },
        { keywords: ["common interview questions", "developer interview", "interview prep"], answer: "Explain a recent project, how you solve problems, difference between == and ===, what's a closure, how CSS specificity works. I share more in the Community Discussion Board 💬" },
        { keywords: ["average web developer salary", "developer salary", "how much do developers make"], answer: "In Ghana: junior ~GHS 2‑4k/month, mid ~5‑8k, senior 10k+. Freelancers can earn more. Globally, averages are higher. Salary varies by tech stack and location 💰" },
        { keywords: ["frontend backend fullstack difference"], answer: "Frontend = UI, backend = data/server, full‑stack = both. Start frontend, then expand. I'm full‑stack and can guide you in the Community 🗺️" },
        { keywords: ["most in demand skills", "in demand skills"], answer: "React, Node.js, Python, TypeScript, cloud (AWS), Tailwind CSS. But fundamentals (HTML, CSS, JS) never go out of style. Master them first 📈" },
        { keywords: ["need to know design", "design for developer"], answer: "You don't need to be a designer, but understanding basic UI/UX principles (contrast, spacing, typography) helps. I include design tips in the Learning Modules 🎨" },
        { keywords: ["stay updated new technologies", "keep up with tech"], answer: "Follow newsletters (CSS‑Tricks, JavaScript Weekly), Twitter devs, GitHub trending. Join the Community – I share monthly tech updates 📰" },
        { keywords: ["best code editor", "code editor"], answer: "**VS Code** – free, extensible, industry standard. Download it today. My **Starter Guide** on the **Resources page** shows you how to set it up 🧰" },
        { keywords: ["practice coding effectively", "how to practice"], answer: "Code every day, even 30 minutes. Build projects you care about. Pair program. Solve coding challenges (LeetCode easy). Consistency > intensity 💪" },
        { keywords: ["projects build as beginner", "beginner projects"], answer: "Personal portfolio, digital clock, to‑do list, product landing page, weather app. Each introduces new concepts. I provide step‑by‑step in the **Starter Guide** 📘" },
        { keywords: ["career paths web development", "career paths"], answer: "Frontend dev, backend dev, full‑stack, DevOps, mobile dev, QA, tech lead, CTO. Web dev is a gateway to many roles 🛣️" },
        { keywords: ["prepare technical interviews", "technical interviews"], answer: "Practice algorithms (LeetCode), know your resume projects inside out, explain your thought process. Mock interviews help. The Community Discussion Board has interview prep threads 🎤" },

        // ---------- 💰 3. WEBSITE PRICING & COSTS (20) ----------
        { keywords: ["how much cost website", "website cost", "price website", "how much"], answer: "Pricing depends on package and custom features. I don't list public prices because every project is unique. Download the **Pricing Guide** from the **Business page** (tap **Download Pricing Guide** below the pricing cards) for package rates, add‑ons, and investment details 💰" },
        { keywords: ["why prices vary", "different prices"], answer: "Scope, complexity, timeline, custom features, and experience all affect price. A simple landing page costs less than a full e‑commerce site with custom API. My **Pricing Guide** explains everything 📊" },
        { keywords: ["how much charge as freelancer", "freelancer pricing"], answer: "Beginners: charge per project ($200‑500 for small sites). Intermediate: $500‑1500. Experienced: $1500+. Value‑based pricing is better than hourly. I share more in the Community **Talent Portal** on the **Community page** 💸" },
        { keywords: ["average cost small business website", "small business website cost"], answer: "In Ghana, a professional small business website typically costs GHS 2,000‑5,000. My **Standard** package is popular. Exact pricing in the **Pricing Guide** on the **Business page** 📈" },
        { keywords: ["ecommerce website cost", "ecommerce cost"], answer: "E‑commerce sites require more work – product catalog, cart, payments. My **Premium** package includes all that. Download the **Pricing Guide** from the **Business page** for the investment breakdown 🛒" },
        { keywords: ["how to price website project", "price a project"], answer: "Define scope, estimate hours, factor in value to the client. I provide a template in the Community **Talent Portal** (the **Community page**). Always document scope clearly 📋" },
        { keywords: ["hourly or fixed price", "hourly vs fixed"], answer: "Fixed price is easier for clients to understand. Hourly is better for ongoing work. I usually quote fixed price per project, with a clear scope. Revision rounds are capped 🕒" },
        { keywords: ["factors affect website pricing"], answer: "Number of pages, custom features, design complexity, content readiness, timeline, integrations, and ongoing maintenance. All detailed in my **Pricing Guide** 📑" },
        { keywords: ["website maintenance cost", "maintenance cost"], answer: "Maintenance plans start from GHS 300/month (basic security & backups) up to GHS 1,000+/month for full support. Pay‑as‑you‑go also available. See **Pricing Guide** on the **Business page** 🔧" },
        { keywords: ["fair price landing page", "landing page cost"], answer: "A professional, responsive landing page (one page) typically costs GHS 1,200‑2,500 in Ghana. My **Basic** package covers this. Exact price in the **Pricing Guide** 📄" },
        { keywords: ["custom website cost"], answer: "Custom websites with unique features (membership portals, booking systems, custom dashboards) start from GHS 8,000+. I provide a custom quote after discussing requirements. Start with the **Contact page** 💎" },
        { keywords: ["redesign cost", "website redesign cost"], answer: "Redesigns depend on the size of the existing site. I offer a flat‑fee redesign service. See typical rates in the **Pricing Guide** on the **Business page** 🧼" },
        { keywords: ["pay for domain annually", "domain renewal"], answer: "Yes, domains are annual renewals (~GHS 150‑250/year). I can register it for you or guide you to do it yourself 🌐" },
        { keywords: ["hosting cost per month"], answer: "Quality hosting costs GHS 50‑150/month (SiteGround, Cloudways). I can set it up and include it in maintenance plans. Details in the **Pricing Guide** 🖥️" },
        { keywords: ["hidden costs website"], answer: "**Zero hidden costs** from me. Domain, hosting, SSL are transparent. I quote everything upfront. Always 💎" },
        { keywords: ["hire web developer cost"], answer: "Freelancer rates in Ghana: GHS 100‑300/hr. Project rates vary. My packages offer better value. Download the **Pricing Guide** from the **Business page** 👨‍💻" },
        { keywords: ["wordpress website cost"], answer: "WordPress sites vary widely. My custom‑coded sites often outperform WordPress at a similar price. See the **Pricing Guide** for custom vs WordPress options 📉" },
        { keywords: ["how to quote website project"], answer: "1. Gather requirements, 2. Break into tasks, 3. Estimate hours, 4. Add buffer, 5. Present fixed price. I share a quoting template in the Community **Talent Portal** (the **Community page**) 📊" },
        { keywords: ["retainer for website maintenance"], answer: "A retainer is a monthly fee for ongoing services (updates, support). My retainers start at GHS 300/month. Details in the **Pricing Guide** 🔄" },
        { keywords: ["payment plans", "pay in instalments"], answer: "Yes, I offer **50% deposit, 50% on completion**. For larger projects, I can arrange 3 instalments. Discuss via the **Contact page** 💳" },

        // ---------- 🖥️ 4. HOSTING & MAINTENANCE (20) ----------
        { keywords: ["1 year hosting", "hosting included"], answer: "Hosting is not included by default, but I can set it up for you and bill annually. Some packages include the first year of hosting – check the **Pricing Guide** on the **Business page** 🗓️" },
        { keywords: ["hosting included packages"], answer: "Some of my packages include hosting for the first year. See the **Pricing Guide** on the **Business page** for details. After that, you pay the hosting provider directly 🏷️" },
        { keywords: ["recommended hosting"], answer: "I recommend **SiteGround** (managed WordPress) and **Cloudways** (flexible cloud). For small sites, **Hostinger** is budget‑friendly. I can help you set up any of these 🖥️" },
        { keywords: ["buy hosting separately"], answer: "Yes, you can buy hosting yourself and give me access. Or I can purchase it on your behalf. All costs are transparent. See the **Pricing Guide** 📋" },
        { keywords: ["transfer existing hosting", "migrate hosting"], answer: "I can migrate your site from your current host. Flat fee, no downtime. Contact me via the **Contact page** 🚛" },
        { keywords: ["managed wordpress hosting"], answer: "Managed WordPress hosting (e.g., SiteGround, Kinsta) offers automatic updates, better security, and speed. I recommend it if you use WordPress. I can set it up for you 🚀" },
        { keywords: ["backup frequency", "how often backups"], answer: "I perform **daily backups** during development and include weekly backups in maintenance plans. You also receive a final ZIP of your entire site 💾" },
        { keywords: ["ssl certificates"], answer: "I include a free SSL certificate (Let's Encrypt) with every site. It activates automatically. No extra cost 🔒" },
        { keywords: ["free ssl"], answer: "Yes, Let's Encrypt provides free SSL certificates. I set it up for you. Your site will show the padlock icon ✅" },
        { keywords: ["renew domain"], answer: "Domains renew annually. I can guide you through the process or do it for you (fee applies). You'll receive reminders before expiry 📆" },
        { keywords: ["hosting expires"], answer: "If hosting expires, your site goes offline. I monitor uptime for maintenance clients and will alert you. You can renew directly with the provider ⏰" },
        { keywords: ["email hosting"], answer: "I can help you set up professional email (e.g., info@yourdomain.com) via Google Workspace or your hosting provider. Setup fee + monthly cost. Details in **Pricing Guide** 📧" },
        { keywords: ["website updates"], answer: "You can update text/images yourself via a simple CMS I build, or I can do it for you (hourly or retainer). I offer training sessions too 🎓" },
        { keywords: ["ongoing maintenance"], answer: "Yes, I offer monthly maintenance plans or pay‑as‑you‑go support. Includes updates, backups, security patches, and 24h support. See **Pricing Guide** on the **Business page** 🔧" },
        { keywords: ["maintenance included"], answer: "Maintenance is not included in one‑time builds, but you can purchase a plan. The **Pricing Guide** lists options. Some packages include 1 month free 📦" },
        { keywords: ["how often update website"], answer: "Ideally, update content weekly, plugins monthly, and core security patches immediately. I handle this for maintenance clients 🗓️" },
        { keywords: ["24/7 support"], answer: "I offer 24/7 support for enterprise maintenance clients. For standard plans, response within 24 hours. Urgent issues prioritised 🆘" },
        { keywords: ["uptime guarantee"], answer: "I target 99.9% uptime. With reliable hosting (SiteGround/Cloudways), this is achievable. For maintenance clients, I monitor uptime and resolve issues quickly 📈" },
        { keywords: ["fix hacked website"], answer: "If your site gets hacked, I can clean it, patch vulnerabilities, and restore from backup. This is included in higher‑tier maintenance plans. Urgent assistance available 🛡️" },
        { keywords: ["migrate free"], answer: "Migration is **not free**, but it's a flat fee. I'm transparent about costs. No hidden charges. Ask via the **Contact page** 🚚" },

        // ---------- 😂 5. JOKE QUESTIONS (16) ----------
        { keywords: ["print money", "money printer", "website that prints money"], answer: "If I could build a website that prints money, I'd be on a beach right now 🏖️ But I can build you one that *makes* money through sales! Check out the **Business page** 🛒" },
        { keywords: ["famous overnight"], answer: "I can't promise fame, but a great website definitely helps! Ram's Beauty Salon got +200% bookings after their redesign. That's a kind of fame 😉 See the **Home page** 📸" },
        { keywords: ["make it pop", "pop button"], answer: "*Click* – POP! Just added a 'make it pop' button 💥 (Okay, I didn't, but I can add real animations. Let's talk via the **Contact page** 😄)" },
        { keywords: ["free website for cat", "cat website"], answer: "I love cats! 🐱 If your cat has a business plan, I'm listening. Otherwise, check out my affordable Basic package on the **Business page** 😸" },
        { keywords: ["logo bigger"], answer: "Ah, the classic! 'Make the logo bigger... but keep everything else the same.' I'm ready. Just say the word via the **Contact page** 🔍" },
        { keywords: ["rainbow sparkles"], answer: "Rainbow sparkles? That's a premium add‑on ✨✨ (Joking – I can do it, but let's talk about your brand identity first 😂)" },
        { keywords: ["superpowers"], answer: "Learning web development gives you the power to create something from nothing. That's pretty super 🦸‍♂️ Join the **Community page** to start your journey!" },
        { keywords: ["wear glasses"], answer: "Glasses are optional, but dark mode is mandatory. 😎 Actually, I wear glasses. Coincidence? I think not 👓" },
        { keywords: ["code in ms paint"], answer: "I can code in MS Paint if you have a few months. Let's stick to VS Code – it's faster ⚡ Download it from the **Resources page** 🎨" },
        { keywords: ["ctrl+z for real life"], answer: "I wish! That would be a game‑changer. Best I can do is unlimited revisions on your website. Check the **Pricing Guide** on the **Business page** ↩️" },
        { keywords: ["payment in exposure"], answer: "Exposure doesn't pay hosting bills 😅 But I do offer discounts for students and non‑profits. Let's chat via the **Contact page** 🤝" },
        { keywords: ["first page google free money"], answer: "If I knew that secret, I'd be on page 1 already. But I can help you rank for realistic keywords! SEO is in my packages – see the **Business page** 🔍" },
        { keywords: ["hack nasa"], answer: "I can't teach you to hack NASA, but I can teach you to build your own secure site. That's more fun and legal. Start with the **Resources page** 🚀" },
        { keywords: ["load before click"], answer: "I'll work on pre‑click loading if you work on patience 😉 In the meantime, my sites load in under 2 seconds. Fast, but not precognitive ⚡" },
        { keywords: ["lifetime hosting $5"], answer: "Lifetime hosting for $5 would be a steal... for the hosting company. Real hosting costs a bit more, but it's reliable. See my **Pricing Guide** for options 💰" },
        { keywords: ["what is pdf", "pdf"], answer: "PDF = Portable Document Format. It's a file type that looks the same on any device. My **Pricing Guide** and **Coding Starter Guide** are PDFs you can download from the **Business page** and **Resources page** 📄" },

        // ---------- 📦 6. SERVICES & PACKAGES (FROM PREVIOUS WORK) ----------
        { keywords: ["services", "offer", "what do you", "build", "websites", "what do you offer", "what can you do", "services offered", "your services"], answer: "I offer three main website packages: **Basic** (3‑5 pages, contact form, responsive), **Standard** (5‑10 pages, blog, basic SEO), and **Premium E‑commerce** (full online store, product management, payments). All include modern design and mobile optimisation. For full details, download the **Pricing Guide** from the **Business page** — scroll to the pricing cards and tap **Download Pricing Guide** right below them 📄" },
        { keywords: ["basic", "package", "tier", "starter", "small", "simple"], answer: "The **Basic** package is perfect for small businesses or personal brands. Includes: up to 5 pages, contact form, responsive design, and basic SEO. Price and full breakdown are in the **Pricing Guide PDF** — head to the **Business page**, find the pricing cards, and tap **Download Pricing Guide** 👌" },
        { keywords: ["standard", "package", "tier", "popular", "most popular", "recommended"], answer: "The **Standard** package adds a blog, advanced SEO setup, social media integration, and up to 10 pages. It's my most popular choice. Check the **Pricing Guide** on the **Business page** (tap **Download Pricing Guide** below the pricing cards) for pricing and all included features 🚀" },
        { keywords: ["ecommerce", "e-commerce", "premium", "store", "shop", "online store", "shopping cart", "products"], answer: "The **Premium E‑commerce** package includes a fully functional online store: product catalog, shopping cart, secure checkout, inventory management, and payment gateway integration. Perfect for selling products or services. Download the **Pricing Guide** from the **Business page** (right below the pricing cards) to see the full scope and investment 🛒" },
        { keywords: ["pricing", "cost", "price", "how much", "investment", "fee", "package price", "whats the cost", "how much for", "price list", "pricing range", "range", "budget", "cheap", "expensive"], answer: "Pricing depends on your selected package and any custom features. I don't list public prices because every project is unique. **But** you can instantly see all package details, add‑ons, and exact investment by downloading the **Pricing Guide PDF** — just go to the **Business page**, scroll to the pricing cards, and tap **Download Pricing Guide** right below them. You'll also find the **ROI Calculator** there to estimate your custom build 💰" },
        { keywords: ["affordable", "afford", "budget", "cheap", "cost effective", "value", "is it affordable"], answer: "Yes — I offer solutions for every budget, from the **Basic** package for small businesses to custom builds for larger companies. The **Pricing Guide** (download from the **Business page**) shows transparent rates with no hidden fees. You'll see exactly what you pay and what you get. Fair pricing, Ghana‑based 🇬🇭" },
        { keywords: ["i want a price", "give me price", "tell me price", "quote", "estimate", "get price"], answer: "I'd love to give you a custom quote! First, download the **Pricing Guide** from the **Business page** (below the pricing cards) to see my package rates and add‑ons. Then, head to the **Contact page** and fill out the Glass Contact Form with your requirements. I'll reply within 24 hours with a personalised estimate 📋" },
        { keywords: ["timeline", "how long", "delivery", "take", "finish", "completion"], answer: "A Basic site typically takes 1‑2 weeks, Standard 2‑3 weeks, and E‑commerce 3‑5 weeks. Timelines depend on content readiness and feedback speed. If you have a strict deadline, I offer a **rush option** — 30% expedite fee. Let me know via the **Contact page** 📅" },
        { keywords: ["revisions", "change", "edit", "feedback", "modify", "revision policy"], answer: "I include **2 rounds of revisions** in Basic, **3 rounds** in Standard, and **4 rounds** in Premium. I won't stop until you're happy. Additional revision rounds can be purchased. Full details in the **Pricing Guide** (download from the **Business page**) 📝" },
        { keywords: ["maintenance", "updates", "keep site", "support", "after launch", "maintain"], answer: "Yes, I offer **monthly maintenance plans**: security updates, backups, content tweaks, and 24h support. You can choose a plan or pay per hour. The **Pricing Guide** has all options — download it from the **Business page** 🔧" },
        { keywords: ["custom", "feature", "special", "unique", "addon", "extra", "additional"], answer: "Absolutely. I can add any custom feature — membership portals, booking systems, API integrations, custom animations, etc. Each add‑on is quoted separately. The **Pricing Guide** includes common add‑on prices, or you can ask me directly via the **Contact page** 💡" },
        { keywords: ["redesign", "existing site", "rebuild", "update site", "redo"], answer: "Yes, I redesign existing websites. I'll audit your current site, suggest improvements, and rebuild it with modern tech. Pricing depends on complexity — contact me for a custom quote. You can also download the **Pricing Guide** from the **Business page** to see typical redesign rates 🔨" },
        { keywords: ["domain", "hosting", "server", "web host"], answer: "I can help you register a domain and set up reliable hosting. I recommend **Namecheap** for domains and **SiteGround** / **Cloudways** for hosting. If you want me to handle it, I charge a one‑time setup fee + annual costs. All explained in the **Pricing Guide** (download from the **Business page**) 🌐" },
        { keywords: ["mobile", "responsive", "phone", "tablet", "mobile friendly", "mobile responsive"], answer: "Every site I build is **100% responsive** — it looks perfect on phones, tablets, and desktops. I test on real devices. Non‑negotiable 📱" },
        { keywords: ["seo", "google", "rank", "search engine", "optimisation"], answer: "I include **on‑page SEO** (meta tags, heading structure, alt text, site speed) in every package. For advanced SEO (keyword research, link building, local SEO), I partner with specialists. Check the **Pricing Guide** (on the **Business page**) for SEO add‑on options 🔍" },
        { keywords: ["portfolio", "examples", "past work", "samples", "showcase"], answer: "You can see my recent work on the **Home page** — check out the **Sister Website Showcase** (Ram's Beauty Salon) and the **Portfolio Grid** on the **Contact page** 📸" },
        { keywords: ["wordpress", "shopify", "wix", "platform", "page builder"], answer: "I build **custom‑coded websites** (HTML, CSS, JavaScript, React, Node) for maximum performance and flexibility. I don't use page builders like Elementor or Wix, but if you specifically need WordPress, I can do that too. Let me know your preference via the **Contact page** 🛠️" },
        { keywords: ["content", "copy", "images", "photos", "write", "text"], answer: "I can help you structure your content, and I can recommend professional copywriters and photographers if needed. I also provide placeholder images and icons to visualise the design. Reach out via the **Contact page** 📝" },
        { keywords: ["blog", "blogging", "articles", "posts", "blog section"], answer: "Yes, I can add a **blog** to any site. It's included in the Standard and Premium packages, or as an add‑on for Basic. You'll be able to write and publish posts easily ✍️" },
        { keywords: ["small project", "one page", "simple site", "landing page", "small business"], answer: "Yes, I take on **small projects** — landing pages, one‑page sites, simple updates. Everyone starts somewhere. Just describe what you need via the **Contact page** and I'll give you a fair price 🤝" },
        { keywords: ["payment", "deposit", "pay", "invoice", "money", "payments"], answer: "I require a **50% deposit** before starting, and the remaining **50% upon completion** before launch. I accept bank transfer, PayPal, and Paystack. All secure 💳" },
        { keywords: ["contract", "agreement", "sign", "paperwork", "legal"], answer: "Yes, I provide a **simple digital contract** outlining the scope, timeline, payment terms, and revision policy. Nothing scary, just clarity 📄" },
        { keywords: ["refund", "cancel", "money back", "cancellation"], answer: "If you cancel **before** I start work, you get a **full refund**. If work has begun, I charge for the hours already spent, and refund the rest. I'm fair — just talk to me via the **Contact page** 💬" },
        { keywords: ["rush", "urgent", "deadline", "fast", "expedite"], answer: "I offer a **30% rush fee** to prioritise your project. Email me via the **Contact page** with your deadline and I'll confirm if it's doable ⏳" },
        { keywords: ["international", "outside ghana", "foreign", "abroad", "global"], answer: "Yes, I work with clients **worldwide**. Time zones are not a problem — I communicate asynchronously and adapt to your schedule 🌍" },
        { keywords: ["nda", "confidential", "secret", "privacy", "non disclosure"], answer: "Yes, I'm happy to sign an **NDA** before we discuss your project. Your ideas are safe with me 🔏" },
        { keywords: ["student", "discount", "nonprofit", "charity", "student discount"], answer: "I offer **15% discount** for verified students and registered non‑profit organisations. Just let me know when you reach out via the **Contact page** 🎓" },
        { keywords: ["backup", "lose", "lost", "restore", "backups"], answer: "I maintain **daily backups** during development and give you a final ZIP of everything. You'll never lose your site 💾" },
        { keywords: ["migrate", "transfer", "move host", "switch", "migration"], answer: "I can **migrate** your existing site from another developer or hosting provider. Flat fee, no downtime. Contact me via the **Contact page** 🚛" },
        { keywords: ["why you", "why choose", "different", "unique", "why samzy"], answer: "You get **custom‑coded, high‑performance websites** that you fully own — no lock‑in, no page‑builder debt. I communicate clearly, meet deadlines, and actually answer my chat. Plus, I'm based in Accra and love supporting local and global clients 🇬🇭" },
        { keywords: ["guarantee", "what if i hate it", "satisfaction", "not happy"], answer: "I **guarantee** you'll love the result. I don't stop until you're happy. If you genuinely hate the direction, we'll pivot or part ways with no hard feelings. Hasn't happened yet 🙏" },
        { keywords: ["scam", "trust", "legit", "reliable", "credible"], answer: "Fair question. Check my **portfolio** on the **Home page** (Sister Website Showcase), read the **testimonials** on the **Home page**, or ask past clients directly. I've built dozens of successful sites and I'm transparent about my process. Trust is earned ✅" },
        { keywords: ["compare", "other developers", "vs", "better", "competitors"], answer: "Other developers are talented. My edge: **I treat your project like my own business**. I reply fast, explain everything in plain English, and build for the long term. No disappearing acts 🤝" },
        { keywords: ["expensive", "overcharge", "value", "worth", "overpriced"], answer: "You're not paying for the 2 hours it takes me — you're paying for the **10 years of experience** that makes it look effortless. My pricing is competitive and transparent. Check the **Pricing Guide** on the **Business page** to see the value 📈" },
        { keywords: ["hidden fees", "extra cost", "surprise", "additional charges"], answer: "**Zero hidden fees.** My quote is the final price. If you want to add features later, we agree on a new price upfront. Always 💎" },

        // ---------- 👥 7. COMMUNITY (FROM PREVIOUS WORK) ----------
        { keywords: ["community", "join community", "become member", "sign up community", "how to join"], answer: "Joining the **Samzy Digital Community** is easy! Head to the **Community page**, scroll to the **Member Registration CTA**, and fill out the quick form. It's **free** and gives you access to learning modules, discussion boards, mentor spotlights, and monthly events 👥" },
        { keywords: ["learning modules", "courses", "learn web dev", "tutorials", "lessons"], answer: "The Community includes **Learning Path Modules** — step‑by‑step guides for HTML, CSS, JavaScript, and freelancing. Completely free for members. Start on the **Community page** 📘" },
        { keywords: ["discussion board", "forum", "ask questions", "community forum"], answer: "Our **Discussion Board** is where members help each other with code, career advice, and project feedback. Join the Community via the **Community page** to participate 💬" },
        { keywords: ["mentor", "mentorship", "guidance", "mentors"], answer: "We have a **Mentor Spotlight** featuring experienced developers who share advice and answer questions. Some mentors offer 1:1 sessions — check the **Community page** for schedules 🌟" },
        { keywords: ["events", "webinars", "workshops", "meetup", "community events"], answer: "I host **monthly free workshops** on topics like 'Your First Freelance Client', 'CSS Grid Mastery', etc. All announced in the Community events calendar on the **Community page** 📅" },
        { keywords: ["talent portal", "jobs", "hire", "freelancers", "hiring"], answer: "The **Talent Portal** connects businesses with skilled community members for freelance work. It's a great way to gain experience. Accessible after 30 days of membership. Visit the **Community page** 🎯" },
        { keywords: ["community rules", "guidelines", "code of conduct", "rules"], answer: "Keep it respectful. No spam, no self‑promo without asking. We're here to learn and help each other 🧘" },
        { keywords: ["i have an idea", "not a developer", "non technical"], answer: "You don't need to be a developer to join. If you have an idea, I can help you build it, or you can learn step‑by‑step through the Learning Modules on the **Community page**. Both paths are welcome 🧠" },
        { keywords: ["feedback", "critique", "review my site", "site review"], answer: "Absolutely. Post your site link in the **Discussion Board** on the **Community page** and community members (including me) will give honest, constructive feedback 📎" },
        { keywords: ["accountability partner", "study buddy", "learning partner"], answer: "Use the **Discussion Board** on the **Community page** to find an accountability partner. Many members are at the same level — you're not alone 👥" },
        { keywords: ["hackathon", "challenge", "competition", "coding challenge"], answer: "We occasionally run **coding challenges** and hackathons. Follow the **Community page** for announcements 🏆" },
        { keywords: ["contribute", "help others", "give back", "volunteer"], answer: "Yes! Answer someone's question in the Discussion Board on the **Community page**. Even if you're a beginner, you know something someone else doesn't 💬" },

        // ---------- 💻 8. CODING FOR BEGINNERS (FROM PREVIOUS WORK) ----------
        { keywords: ["learn coding", "start coding", "beginner", "how to code", "coding beginner"], answer: "Love that you're starting! 💻 First, download **VS Code** (free). Then grab the **Free Coding Starter Guide** from the **Resources page** — it's a PDF that walks you through your first week of coding. After that, join the Community on the **Community page** for full Learning Path Modules. You've got this 💪" },
        { keywords: ["vs code", "editor", "software", "ide", "code editor"], answer: "**VS Code** is the best free code editor. Install it, create a file, and start typing HTML. No paid software needed. For a step‑by‑step setup, download the **Starter Guide** from the **Resources page** 🧰" },
        { keywords: ["first project", "beginner project", "build", "first website"], answer: "Build a **personal portfolio page**. One page, your name, skills, a project or two. It teaches HTML, CSS, layout, and you can actually use it to apply for jobs. The **Starter Guide** on the **Resources page** has a tutorial for this 🖥️" },
        { keywords: ["html", "css", "javascript", "languages"], answer: "Start with **HTML** (structure) and **CSS** (style). Then add **JavaScript** (interactivity). Those three are the foundation. The **Starter Guide** on the **Resources page** covers the basics, and the Community Learning Modules on the **Community page** go deeper 🎯" },
        { keywords: ["too late", "late to start", "age", "2026", "too old"], answer: "It's **never too late**. Web dev is still growing, and companies need people who understand both code and humans. You're right on time ⏰" },
        { keywords: ["practice", "projects", "build", "project ideas"], answer: "Try these beginner projects: to‑do list app, digital clock, product landing page, calculator, weather app. Each teaches something new. The **Starter Guide** on the **Resources page** has project ideas 🔨" },
        { keywords: ["stuck", "tutorial hell", "not learning", "feel stuck"], answer: "Totally normal. Close the tutorial and rebuild it from memory. Get stuck? Peek. Then close again. Repetition builds skill. Also, the Community Discussion Board on the **Community page** is great for help 🧠" },
        { keywords: ["git", "github", "version control", "git hub"], answer: "Learn Git early. It's like 'save' for coders. GitHub stores your code and is expected by employers. I have a module on it in the Community Learning Paths (the **Community page**) 🧰" },
        { keywords: ["react", "vue", "angular", "framework", "learn react"], answer: "Master **vanilla JavaScript** first. Once you can build a to‑do list, learn **React** — it's the most in‑demand framework. I cover it in advanced modules on the **Community page** ⚛️" },
        { keywords: ["free resources", "learn free", "no money", "free tutorials"], answer: "**MDN Web Docs**, **freeCodeCamp**, **The Odin Project** — all completely free and excellent. Plus, I have a **Free Coding Starter Guide** on the **Resources page** and free Learning Modules on the **Community page**. No payment needed 📚" },
        { keywords: ["deploy", "publish", "live", "hosting", "go live"], answer: "For static sites, use **Netlify** or **Vercel**. Drag & drop your folder → live URL. Free and easy. I explain this in the **Starter Guide** on the **Resources page** 🌍" },
        { keywords: ["imposter syndrome", "doubt", "not good enough"], answer: "Still hits me sometimes. The cure: **ship one project**. Confidence comes from finished work, not more courses 🚢" },
        { keywords: ["freelance", "find clients", "first job", "freelancing"], answer: "Start with people you know — family, friends, local businesses. Build 2‑3 sites for cheap or free, ask for testimonials, then raise your price. Repeat. The Community Talent Portal on the **Community page** can also help 🔁" },
        { keywords: ["soft skills", "communication", "client", "talk to clients"], answer: "Half the job is **managing expectations**. Be honest, over‑communicate, show progress often. A happy client with a simple site > genius who never delivers 🤝" },
        { keywords: ["degree", "university", "cs degree", "college"], answer: "You don't need a CS degree. I don't have one. Portfolio + people skills > diploma. But uni can be great for structure. Neither path is wrong 🎯" },
        { keywords: ["ai replace", "will i lose job", "chatgpt", "ai taking over"], answer: "No. AI lowers the entry bar but raises the ceiling. Clients still need someone who understands **them**, not just code. Be that person 🔐" },
        { keywords: ["api", "what is", "integration", "application programming interface"], answer: "API = Application Programming Interface. It lets your site talk to other services (payment, maps, email). I teach API basics in the Community Learning Modules on the **Community page** ☕" },
        { keywords: ["database", "mysql", "mongodb", "data storage"], answer: "Databases store user data, products, orders. I use MySQL and MongoDB. You don't need to touch them as a beginner 🗄️" },
        { keywords: ["responsive", "mobile friendly", "responsive design"], answer: "Responsive = your site adapts to any screen. I teach **mobile‑first** design in the CSS module on the **Community page** 📱" },
        { keywords: ["frontend", "backend", "full stack", "difference"], answer: "Frontend = what users see (HTML, CSS, JS). Backend = servers, databases (Node, Python). Full‑stack = both. Start with frontend 🎨" },
        { keywords: ["job ready", "hired", "junior developer", "first developer job"], answer: "With consistent practice (1hr/day), you can build a job‑ready portfolio in 6‑12 months. Join the Community on the **Community page** for support 🐢" },
        { keywords: ["resources", "starter guide", "pdf guide", "coding pdf"], answer: "I have a **Free Coding Starter Guide** available as a PDF. It covers setting up VS Code, your first HTML page, and three beginner projects. Download it directly from the **Resources page** — look for the **Download 'How to Get Started in Coding'** button 📘" },

        // ---------- 🧠 9. PSYCHO / SLANG (FROM PREVIOUS WORK) ----------
        { keywords: ["yo bot", "hey bot", "sup bot", "yo how much", "gimme price"], answer: "Yo! 😎 Check out the **Business page** for the **Pricing Guide** — tap **Download Pricing Guide** right below the pricing cards. All the numbers are in there. Holler if you need more help!" },
        { keywords: ["u got cheap", "u got affordable", "any cheap", "cheap websites"], answer: "Yep, the **Basic** package is budget‑friendly and solid. Full pricing breakdown is in the **Pricing Guide** on the **Business page**. Download it and see for yourself 💰" },
        { keywords: ["gimme price now", "price now", "tell me now", "i need price"], answer: "I feel you! 🔥 The fastest way: go to the **Business page**, scroll to the pricing cards, and tap **Download Pricing Guide**. You'll have the full price list in seconds. Then hit me up on the **Contact page** if you want a custom quote!" },
        { keywords: ["this affordable", "affordable bro", "is it cheap", "cost effective?"], answer: "100% affordable. I work with small businesses and startups. Download the **Pricing Guide** from the **Business page** — you'll see transparent rates that fit different budgets. No shock, no stress 😌" },
        { keywords: ["what can u do for me", "what u got", "what you offer", "tell me what you do"], answer: "Short version: I build fast, beautiful, custom websites — Basic, Standard, or E‑commerce. Long version: head to the **Business page**, check the pricing cards, and download the **Pricing Guide**. Everything I offer is in there 🚀" },

        // ---------- 📄 10. PORTFOLIO & CONTACT (FROM PREVIOUS WORK) ----------
        { keywords: ["portfolio", "work", "past projects", "examples", "showcase"], answer: "See the **Sister Website Showcase** on the **Home page** (Ram's Beauty Salon) and the **Portfolio Grid** on the **Contact page** 📸" },
        { keywords: ["contact", "message", "reach", "get in touch", "email"], answer: "Use the **Glass Contact Form** on the **Contact page**. I reply within 24 hours 💬" },
        { keywords: ["call", "discuss", "meeting", "phone call", "discovery call"], answer: "Book a free discovery call via the **Contact page** — just send your availability 📞" },
        { keywords: ["quote", "estimate", "get price", "custom quote"], answer: "First, download the **Pricing Guide** from the **Business page** (below the pricing cards). Then, if you need a custom quote, use the **Glass Contact Form** on the **Contact page** and let me know which package you're interested in 📄" },

        // ---------- 📚 11. RESOURCES (FROM PREVIOUS WORK) ----------
        { keywords: ["resources", "starter guide", "beginner pdf", "download guide", "coding guide"], answer: "Head to the **Resources page** – you'll find a **Download 'How to Get Started in Coding'** button. Tap it to get the free PDF guide instantly. It's perfect for absolute beginners 📥" },

        // ---------- 🛑 12. FALLBACK (LAST) ----------
        { keywords: [], answer: "Hmm, I'm still learning! 🤓 I've sent your question to Samzy and he'll get back to you soon. Want to try asking something else?" }
    ];

    // ------------------------------------------------------------
    //  PREPARE WORD SETS & KEYWORD PHRASES FOR FAST MATCHING
    // ------------------------------------------------------------
    const normalizedKeywords = knowledge.map(item => {
        const phraseSet = new Set();
        const wordSet = new Set();
        item.keywords.forEach(k => {
            const norm = normaliseText(k);
            phraseSet.add(norm);
            norm.split(' ').forEach(w => {
                if (w.length > 0) wordSet.add(w);
            });
        });
        return {
            ...item,
            phraseSet,
            wordSet
        };
    });

    // ----- MATCHING ENGINE: EXACT MATCH FIRST, THEN 2‑WORD OVERLAP -----
    function findBestAnswer(userInput) {
        if (!userInput.trim()) return "Please type something — I'm here to help! 😊";

        const normalizedInput = normaliseText(userInput);
        const inputWords = normalizedInput.split(' ');

        // 1. EXACT MATCH – check if normalized input equals any keyword phrase
        for (let item of normalizedKeywords) {
            if (item.phraseSet.has(normalizedInput)) {
                return item.answer;
            }
        }

        // 2. 2‑WORD OVERLAP – if input has at least 2 words, find best overlap
        if (inputWords.length >= 2) {
            let bestMatch = null;
            let highestOverlap = 0;

            for (let item of normalizedKeywords) {
                let overlap = 0;
                for (let w of inputWords) {
                    if (item.wordSet.has(w)) overlap++;
                }
                if (overlap >= 2 && overlap > highestOverlap) {
                    highestOverlap = overlap;
                    bestMatch = item;
                }
            }
            if (bestMatch) return bestMatch.answer;
        }

        // 3. NO MATCH – send to Formspree, return fallback
        sendToFormspree(userInput);
        return knowledge[knowledge.length-1].answer;
    }

    // ----- UI HELPERS -----
    function addMessage(text, sender = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('samzy-message', sender);
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        msgDiv.innerHTML = formatted;
        messagesEl.appendChild(msgDiv);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function handleSend() {
        const userText = inputEl.value.trim();
        if (userText === '') return;
        addMessage(userText, 'user');
        inputEl.value = '';
        setTimeout(() => {
            const reply = findBestAnswer(userText);
            addMessage(reply, 'bot');
        }, 400);
    }

    function openChat() {
        isOpen = true;
        bubble.style.display = 'none';
        windowEl.classList.add('open');
        if (messagesEl.children.length === 0) {
            addMessage(GREETING, 'bot');
        }
        inputEl.focus();
    }

    function closeChat() {
        isOpen = false;
        bubble.style.display = 'flex';
        windowEl.classList.remove('open');
    }

    // ----- EVENT LISTENERS -----
    bubble.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', handleSend);
    inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
    window.addEventListener('click', (e) => {
        if (isOpen && !windowEl.contains(e.target) && !bubble.contains(e.target)) {
            closeChat();
        }
    });
})();