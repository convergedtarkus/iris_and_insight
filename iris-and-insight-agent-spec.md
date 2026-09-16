# Iris + Insight — Agent Development Specification

> **Purpose:** This document is the single source of truth for AI developer agents building the Iris + Insight website. Follow it sequentially. Every decision has been made — do not improvise or deviate unless explicitly noted as TBD.

---

## 1. PROJECT SUMMARY

Build a responsive, production-ready website for **Iris + Insight**, an equine-assisted psychotherapy and consulting business based in central Iowa. The site is informational (no e-commerce, no user auth). Two co-founders — Sareena and Kelsey — are licensed therapists who provide equine-assisted services.

---

## 2. TECH STACK (LOCKED)

| Layer          | Technology                          | Notes                                 |
| -------------- | ----------------------------------- | ------------------------------------- |
| Language       | TypeScript (strict mode)            | No `any` types                        |
| Framework      | React 18+                           | Functional components + hooks only    |
| Build Tool     | Vite 5+                             | `npm create vite@latest`              |
| Routing        | React Router v6                     | Client-side routing, `BrowserRouter`  |
| Styling        | Tailwind CSS 3+                     | Custom theme config, no inline styles |
| Image Handling | `vite-imagetools` or manual srcsets | Lazy loading, WebP conversion         |
| Linting        | ESLint + Prettier                   | Standard config                       |
| Hosting        | Digital Ocean Droplet (Ubuntu 24)   | $6/mo basic                           |
| Web Server     | Nginx                               | Static file serving + SSL termination |
| SSL            | Let's Encrypt via Certbot           | Auto-renewal                          |
| DNS            | Squarespace (registrar only)        | A records → droplet IP                |

### Package.json Dependencies (minimum)

```
react, react-dom, react-router-dom, typescript,
tailwindcss, postcss, autoprefixer,
@types/react, @types/react-dom,
vite, @vitejs/plugin-react
```

### Optional (evaluate during build)

```
react-helmet-async (SEO meta tags),
react-intersection-observer (scroll animations),
sharp (build-time image optimization)
```

---

## 3. DOMAINS & INFRASTRUCTURE

### 3.1 Domains (pending purchase approval)

- **Primary:** `irisandinsight.com`
- **Redirect:** `irisandinsights.com` → 301 redirect to primary
- **Registrar:** Squarespace (DNS management only — do NOT use Squarespace site builder)

### 3.2 Digital Ocean Droplet Setup

```bash
# 1. Create droplet: Ubuntu 24.04 LTS, Basic $6/mo, region: SFO or NYC
# 2. SSH in and run:
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx certbot python3-certbot-nginx nodejs npm
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### 3.3 Nginx Configuration

**Primary domain** — `/etc/nginx/sites-available/irisandinsight.com`:

```nginx
server {
    listen 80;
    server_name irisandinsight.com www.irisandinsight.com;
    root /var/www/irisandinsight.com/dist;
    index index.html;

    # SPA fallback — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|webp|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

**Redirect domain** — `/etc/nginx/sites-available/irisandinsights.com`:

```nginx
server {
    listen 80;
    server_name irisandinsights.com www.irisandinsights.com;
    return 301 https://irisandinsight.com$request_uri;
}
```

**SSL setup:**

```bash
sudo certbot --nginx -d irisandinsight.com -d www.irisandinsight.com
sudo certbot --nginx -d irisandinsights.com -d www.irisandinsights.com
```

### 3.4 Deploy Script (`deploy.sh` at project root)

```bash
#!/bin/bash
set -e
npm run build
rsync -avz --delete dist/ user@DROPLET_IP:/var/www/irisandinsight.com/dist/
ssh user@DROPLET_IP "sudo systemctl reload nginx"
echo "✅ Deployed successfully"
```

---

## 4. COLOR PALETTE (FROM CLIENT)

The client selected Behr Dynasty Marquee paint swatches. Translate to web-safe hex:

```typescript
// tailwind.config.ts → theme.extend.colors
const colors = {
  brand: {
    teal: '#2A9BBF', // Primary accent — CTAs, links, highlights
    'teal-dark': '#1E7A99', // Hover states, dark accents
    'teal-light': '#E8F4F8', // Light backgrounds, tag fills
    charcoal: '#2E2E2E', // Nav background, headings, footer
    'charcoal-light': '#3D3D3D', // Secondary dark text
    'charcoal-muted': '#555555', // Body text
    gray: '#B5B8B3', // Borders, muted text, placeholders
    'gray-light': '#E8E9E6', // Dividers, card borders
    white: '#FFFFFF', // Card backgrounds
    'off-white': '#F7F8F6', // Page background alternate sections
    bg: '#F9FAFA', // Main page background
  },
};
```

### Usage Rules

- **Nav bar & Footer:** `brand-charcoal` background, white text, `brand-teal` for active/accent
- **Body text:** `brand-charcoal-muted` on `brand-bg`
- **Headings:** `brand-charcoal`
- **Links & CTAs:** `brand-teal`, hover → `brand-teal-dark`
- **Section alternation:** Alternate between `brand-bg` and `brand-off-white` for visual rhythm
- **Cards:** `brand-white` background, `brand-gray-light` border

---

## 5. TYPOGRAPHY

```typescript
// tailwind.config.ts → theme.extend.fontFamily
fontFamily: {
  display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
  body: ['"DM Sans"', 'Helvetica', 'sans-serif'],
}
```

### Loading (in index.html `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
  rel="stylesheet"
/>
```

### Rules

- **Page titles, hero headings, names:** `font-display` (Cormorant Garamond)
- **Everything else (nav, body, labels, buttons, captions):** `font-body` (DM Sans)
- **Eyebrow labels:** `font-body`, 11-12px, uppercase, `tracking-[0.18em]`, `brand-teal`

---

## 6. PROJECT STRUCTURE

```
iris-and-insight/
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg              # Open Graph preview image (1200x630)
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── horses/           # Individual horse photos
│   │   │   │   ├── cat.jpg
│   │   │   │   ├── ginny.jpg
│   │   │   │   ├── grey.jpg
│   │   │   │   ├── boomer-jr.jpg
│   │   │   │   ├── bodie-goat.jpg
│   │   │   │   └── barn-cats.jpg
│   │   │   ├── people/           # Founders + interaction shots
│   │   │   │   ├── kelsey-with-horse-1.jpg
│   │   │   │   ├── kelsey-with-horse-2.jpg
│   │   │   │   ├── sareena-hugging-horse.jpg
│   │   │   │   ├── sareena-brushing-horse.jpg
│   │   │   │   ├── kids-with-brown-horse.jpg
│   │   │   │   ├── girl-with-white-horse.jpg
│   │   │   │   └── boy-with-white-horse.jpg
│   │   │   ├── scenic/           # Pasture, atmosphere shots
│   │   │   │   ├── horses-in-pasture.jpg
│   │   │   │   ├── white-horse-profile-sunset.jpg
│   │   │   │   ├── white-horse-over-fence.jpg
│   │   │   │   └── two-brown-horses-closeup.jpg
│   │   │   └── logo.png          # Business logo (SVG preferred when available)
│   │   └── icons/                # Custom SVG icons if needed
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx        # Wraps all pages (nav + footer + <Outlet/>)
│   │   │   └── MobileMenu.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── SectionHeading.tsx  # Eyebrow + title + subtitle pattern
│   │   │   ├── Card.tsx
│   │   │   ├── ImageCard.tsx       # Image with overlay/caption
│   │   │   └── ValueCard.tsx       # Icon + title + description
│   │   └── sections/
│   │       ├── Hero.tsx            # Homepage hero (photo + intro text)
│   │       ├── MissionBand.tsx     # Dark charcoal mission statement band
│   │       ├── LogoBar.tsx         # I+I Logo + OK Corral logo row
│   │       ├── InclusionStatement.tsx
│   │       └── ContactForm.tsx     # Name, email, message, submit
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── OurTeamPage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── AboutEALEAPPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── MeetTheHorsesPage.tsx
│   │   └── ContactUsPage.tsx
│   ├── data/
│   │   ├── horses.ts             # Horse profile data (name, photo, description)
│   │   ├── team.ts               # Founder bios
│   │   ├── services.ts           # Service card data
│   │   └── navigation.ts         # Route definitions + nav labels
│   ├── hooks/
│   │   └── useScrollToTop.ts     # Scroll to top on route change
│   ├── styles/
│   │   └── globals.css           # Tailwind directives + any custom CSS
│   ├── App.tsx                   # Router setup
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
├── deploy.sh
├── .eslintrc.cjs
├── .prettierrc
└── README.md
```

---

## 7. ROUTING

```typescript
// src/data/navigation.ts
export const routes = [
  { path: '/', label: 'Home', component: HomePage },
  { path: '/about', label: 'About Us', component: AboutUsPage },
  { path: '/history', label: 'History', component: HistoryPage },
  { path: '/equine-services', label: 'About EAL/EAP', component: AboutEALEAPPage },
  { path: '/services', label: 'Services', component: ServicesPage },
  { path: '/horses', label: 'Meet the Horses', component: MeetTheHorsesPage },
  { path: '/contact', label: 'Contact Us', component: ContactUsPage },
];
```

### Router Config (App.tsx)

- Use `BrowserRouter` with a `Layout` component wrapping `<Outlet />`
- Add a catch-all `*` route that redirects to `/`
- Use `useScrollToTop` hook in Layout to scroll to top on every navigation

---

## 8. COMPONENT SPECIFICATIONS

### 8.1 Navbar (`components/layout/Navbar.tsx`)

- **Position:** `sticky top-0 z-50`
- **Background:** `brand-charcoal`
- **Height:** 68px
- **Left:** Logo text "Iris" (white) "+ Insight" (teal, italic) — clickable, routes to `/`
- **Right:** Horizontal nav links from `navigation.ts`
- **Active link:** `brand-teal` text color + subtle `bg-brand-teal/10` background
- **Inactive link:** `white/75` text, hover → `white`
- **Breakpoint:** At `md` (768px), collapse to hamburger menu
- **Mobile menu:** Full-width dropdown below nav, same charcoal background, links stacked vertically
- **Behavior:** Close mobile menu on route change and on click outside

### 8.2 Footer (`components/layout/Footer.tsx`)

- **Background:** `brand-charcoal`
- **Content:** Brand name, tagline "Equine-Assisted Psychotherapy & Consulting", copyright year (dynamic), optional social links placeholder
- **Padding:** `py-10`

### 8.3 SectionHeading (`components/ui/SectionHeading.tsx`)

Reusable pattern used on every page:

```typescript
interface SectionHeadingProps {
  eyebrow: string; // e.g. "Our Team"
  title: string; // e.g. "About Us"
  subtitle?: string; // e.g. "Two licensed therapists..."
  centered?: boolean; // default true
}
```

- Eyebrow: `font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mb-4`
- Title: `font-display text-3xl md:text-5xl font-medium text-brand-charcoal mb-3`
- Subtitle: `font-body text-base text-brand-charcoal-muted max-w-xl mx-auto`

### 8.4 Card (`components/ui/Card.tsx`)

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
```

- Style: `bg-brand-white rounded-xl border border-brand-gray-light p-8`

### 8.5 ValueCard (`components/ui/ValueCard.tsx`)

Used in inclusion statement section:

```typescript
interface ValueCardProps {
  title: string;
  description: string;
}
```

- Container: Card style + `text-center`
- Title: `font-body text-sm font-semibold text-brand-teal mb-2`
- Description: `font-body text-sm text-brand-charcoal-muted`

---

## 9. PAGE SPECIFICATIONS

### 9.1 HOME PAGE (`/`)

**Layout (top to bottom):**

1. **Hero Section** — Two-column layout (responsive: stacks on mobile)
   - **Left column (flex 1):** Single photo — use `sareena-hugging-horse.jpg` (or `kelsey-with-horse-2.jpg` — client to confirm which photo of S+K with Cat to use). Rounded corners, subtle shadow.
   - **Right column (flex 1):**
     - Eyebrow: "Equine-Assisted Psychotherapy & Consulting"
     - Heading: "Welcome to _Iris + Insight_!" (Iris + Insight in teal italic)
     - Body: "Where healing, growth, and connection begin — guided by the wisdom of horses. We are two licensed therapists who believe in the power of the horse-human bond to transform lives, strengthen relationships, and foster personal growth."
   - **Padding:** `py-16 px-6`, max-width 1200px centered
   - **Gap:** 48px between columns
   - **Mobile:** Stack photo on top, text below

2. **Mission Statement Band** — Full-width dark section
   - **Background:** `brand-charcoal`
   - **Label:** "OUR MISSION" (teal eyebrow)
   - **Text:** _"Iris + Insight recognizes the strength and significance of horses and is passionate about providing services that utilize them to improve mental health and wellbeing."_
   - **Style:** `font-display italic text-xl md:text-2xl text-white/90 text-center max-w-3xl mx-auto`
   - **Padding:** `py-14`

3. **Logo Bar** — Two logos centered, horizontal
   - Left: Iris + Insight logo (`logo.png`)
   - Right: OK Corral Series logo (placeholder until provided — use dashed border box)
   - Both: 160px height, contain aspect ratio
   - **Padding:** `py-14`

4. **Inclusion Statement Section** — Alternate background
   - **Background:** `brand-off-white`, top and bottom border `brand-gray-light`
   - **Label:** "INCLUSION STATEMENT" (teal eyebrow)
   - **Text block:** Full inclusion statement text (see Content section below)
   - **Value cards row:** 3 cards — Inclusivity, Respect, Resourcefulness
   - **Padding:** `py-16`

---

### 9.2 ABOUT US PAGE (`/about`)

**Layout:**

1. **SectionHeading:** eyebrow "Our Team", title "About Us", subtitle "Two licensed therapists, one shared passion."

2. **Bio cards** — Two-column flex (stack on mobile)

   **Kelsey's card:**
   - Photo placeholder (circular, 80px, dashed border until headshot provided)
   - Name: "Kelsey" (`font-display text-xl`)
   - Role: "CO-FOUNDER / THERAPIST" (teal eyebrow style)
   - Bio text: "Kelsey grew up on a farm in rural Wisconsin. She went to college in Decorah, Iowa and moved to Des Moines for a summer internship after she graduated, intending to move to the Twin Cities in the fall. Once in Des Moines, she fell in love and found herself 'home.' She got her Master's Degree in Clinical Mental Health Counseling from Drake University in 2018. She is a Lead Therapist at New Beginnings Counseling Service, clinical supervisor, presenter, and passionate therapist and advocate. Kelsey truly loves what she does. In her spare time, you can find her petting horses or dogs, spending time with her spouse and friends, or finding a new adventure."
   - **Candidate photo:** `kelsey-with-horse-1.jpg` or `kelsey-with-horse-2.jpg`

   **Sareena's card:**
   - Photo placeholder (same styling)
   - Name: "Sareena"
   - Role: "CO-FOUNDER / THERAPIST & EQUINE PROFESSIONAL"
   - Bio text: _"Bio coming soon..."_ (italic, muted gray — client has not provided yet)
   - **Candidate photo:** `sareena-brushing-horse.jpg` or `sareena-hugging-horse.jpg`

3. **Placeholder block:** "Additional content needed: certification details, credentials, insurance information."

---

### 9.3 HISTORY PAGE (`/history`)

**Layout:**

1. **SectionHeading:** eyebrow "Our Story", title "History", subtitle "How a horse named Cat sparked a dream."

2. **Content blocks** — Stacked `Card` components, each containing one narrative paragraph. Content is final and provided by the client:

   **Block 1:** "Iris + Insight's journey began with a horse named **How D Iris** — affectionately known as Cat. She came into Sareena's life at a time when everything felt heavy, and she had all but lost hope. Cat was more than a horse; she was a lifeline, a quiet guide who reminded Sareena of her strength when she couldn't see it for herself. Cat's presence became the spark for something bigger — a dream Sareena had carried with her for years: to create a healing space where others could find what she found through horses — connection, clarity, and courage."

   **Block 2:** "Horses have been a part of Sareena's story since before she could walk. They've kept her focused, goal-oriented, and grounded through every season of life. She has seen firsthand how they can teach patience, build confidence, and help people communicate without a single word."

   **Block 3:** "Kelsey grew up on a farm in rural Wisconsin and begged her parents for a horse throughout her childhood. Even as a young girl with little exposure to horses, she knew they were something special. She moved to the Des Moines area and figured her dream of spending time with horses would remain a dream."

   **Block 4:** "Sareena and Kelsey met through their work in mental health, and initially bonded over their shared commitment to helping others. Sareena learned of Kelsey's love of horses and introduced her to her own. One day at work while talking about their love for horses, Sareena informed Kelsey that equine-assisted therapy is often recommended with two therapists. Kelsey couldn't let that carrot dangle, and the rest is history."

   **Block 5:** "Kelsey and Sareena got certified in equine-assisted therapy in November 2025 and founded Iris + Insight in January 2026, which offers **equine-assisted therapy and learning**, grounded in lived experience and deep respect for both people and horses." + closing italic in teal: "Iris + Insight's story is just beginning — and they're honored to walk (and ride) alongside those ready to start their own journey of insight, healing, and growth."

3. **Optional photo placement:** Intersperse `horses-in-pasture.jpg` or `cat.jpg` between blocks as visual breaks.

---

### 9.4 ABOUT EAL/EAP PAGE (`/equine-services`)

**Layout:**

1. **SectionHeading:** eyebrow "What We Do", title "About EAL / EAP", subtitle "Experiential approaches that harness the intuitive nature of horses."

2. **Content blocks** (each in a `Card`):

   **EAL block:**
   - Title: "Equine-Assisted Learning (EAL)"
   - Content: "An experiential learning approach that uses interactions with horses to help individuals develop personal, social, and emotional skills. Participants typically work with horses on the ground completing problem-solving exercises. These experiences create opportunities for reflection, communication, and growth."

   **EAP block:**
   - Title: "Equine-Assisted Psychotherapy (EAP)"
   - Content: "An experiential form of mental health treatment that involves interactions between clients, horses, and trained mental health professionals. Rather than traditional talk therapy alone, EAP incorporates guided activities with horses — such as grooming, leading, observing behavior, and ground-based exercises — to help individuals explore emotions, build self-awareness, and develop healthier patterns of thinking and behavior."

   **Why Horses block:**
   - Title: "Why Horses?"
   - Content: "Horses are highly sensitive animals that naturally respond to human body language, emotions, and energy. Because of this, they provide immediate and honest feedback to participants. This feedback helps individuals become more aware of their behavior, emotions, and communication styles."

   **Certification block:**
   - Title: "Our Certification"
   - Content: "Iris + Insight is certified by the O.K. Corral Series. Kelsey and Sareena were personally trained by Greg Kersten, recognized as the founder of Equine-Assisted Psychotherapy/Philosophy. The techniques emphasize natural, authentic horse and herd behavior as a model for human mental and emotional health."
   - Additional: "Iris + Insight is unique — both facilitators are licensed mental health professionals, with Sareena also serving as the equine professional."

3. **Optional:** Core Principles section (from Meet_The_Horses.md content). Include if page feels sparse — Pressure/Pain, Attention/At-Ease, The Re-Circle, Push/Pull, Nonverbal Zones, Herd vs Pack. Present as an accordion or expandable cards.

---

### 9.5 SERVICES PAGE (`/services`)

**Layout:**

1. **SectionHeading:** eyebrow "How We Help", title "Services", subtitle "Personalized approaches tailored to your needs and goals."

2. **Who We Serve block** (Card):
   - Title: "Who We Serve"
   - Content: "At Iris + Insight, clients get two licensed therapists who care deeply about the work they do. We work with adolescents, adults, couples, families, and businesses — personalizing and tailoring our approaches to fit different needs and goals."
   - Second paragraph: "We are passionate about serving those looking for new approaches to personal and professional growth, including the LGBTQ+ community, underrepresented populations, and corporate teams."
   - **Tag pills row:** Adolescents, Adults, Couples, Families, Businesses, LGBTQ+, Corporate Teams
   - Tag style: `bg-brand-teal-light text-brand-charcoal font-body text-sm font-medium px-4 py-1.5 rounded-full`

3. **Focus Areas block** (Card):
   - Title: "Our Focus Areas"
   - Content: "Building self-esteem, strengthening relationships, improving communication, encouraging teamwork, and fostering a sense of self-worth — all through the unique and intuitive language of horses."

4. **Service cards grid** — 2x2 grid:
   | Icon | Name | Description |
   |------|------|-------------|
   | 🐴 | EAL Sessions | Experiential learning with horses |
   | 💬 | EAP Sessions | Equine-assisted psychotherapy |
   | 🏢 | Corporate Partnerships | Team building & leadership development |
   | 🎓 | Workshops | Group learning experiences |

   Card style: `Card` + `text-center`, icon in `bg-brand-teal-light rounded-xl w-12 h-12` centered

5. **Opportunities mention:** "Will travel | EAL/EAP | Workshops | Corporate Partnerships"

6. **Placeholder block:** "Content needed: insurance info, pricing details, travel availability specifics."

---

### 9.6 MEET THE HORSES PAGE (`/horses`)

**Layout:**

1. **SectionHeading:** eyebrow "Our Herd", title "Meet the Horses", subtitle "The intuitive partners who make the work possible."

2. **Intro block** (Card): "The horses at Iris + Insight are more than animals — they are intuitive partners in the therapeutic process. Their sensitivity, honesty, and calm presence help create powerful moments of connection, self-awareness, and personal growth. Each horse in our herd brings a unique spirit and plays an important role in supporting connection, healing, and growth."

3. **Horse profile cards** — Grid layout (1 column mobile, 2 columns tablet, 3 columns desktop). Each card:
   - Photo (cover, rounded top corners, aspect ratio 4:3)
   - Name (`font-display text-xl`)
   - Description (placeholder until provided by client)
   - `Card` styling

   **Horse data** (from `src/data/horses.ts`):

   ```typescript
   export const horses = [
     {
       name: 'Cat',
       fullName: 'How D Iris',
       photo: '/images/horses/cat.jpg',
       description: 'The horse who started it all. Cat is the heart and soul of Iris + Insight.',
     },
     {
       name: 'Ginny',
       photo: '/images/horses/ginny.jpg',
       description: 'Description coming soon...',
     },
     {
       name: 'Grey',
       photo: '/images/horses/grey.jpg',
       description: 'Description coming soon...',
     },
     {
       name: 'Boomer JR',
       photo: '/images/horses/boomer-jr.jpg',
       description: 'Description coming soon...',
     },
   ];
   ```

4. **Bonus animals section** (optional, lighter treatment):
   - Bodie the Goat (`bodie-goat.jpg`)
   - Friendly Cat & Scaredy Cat — barn cats (`barn-cats.jpg`)
   - Smaller cards or a separate "Friends of the Herd" subsection

5. **Photo gallery** — Consider adding a simple image gallery section using the scenic/interaction photos that don't belong to specific profiles.

---

### 9.7 CONTACT US PAGE (`/contact`)

**Layout:**

1. **SectionHeading:** eyebrow "Get in Touch", title "Contact Us", subtitle "We'd love to hear from you."

2. **Contact form** (left column on desktop):
   - Fields: Name (text), Email (email), Phone (tel, optional), Message (textarea)
   - Submit button: `bg-brand-teal hover:bg-brand-teal-dark text-white font-body font-semibold py-3 px-8 rounded-lg`
   - **Form handling:** TBD — options include Formspree, Netlify Forms, or custom backend endpoint. For initial launch, use `mailto:` link or Formspree free tier.
   - Validation: Required fields (name, email, message), email format check

3. **Contact info** (right column on desktop):
   - Email: TBD (from client)
   - Phone: TBD (from client)
   - Location: General area (TBD from client — likely central Iowa)
   - Social media links: TBD

4. **Placeholder block** for any missing info

---

## 10. IMAGE ASSET INVENTORY

### 10.1 Provided Assets — File Mapping

| Original Filename                  | Rename To                        | Dimensions | Subject                                           | Recommended Usage                               |
| ---------------------------------- | -------------------------------- | ---------- | ------------------------------------------------- | ----------------------------------------------- |
| `Logo.png`                         | `logo.png`                       | 800x800    | I+I business logo (horse, iris flower, horseshoe) | Navbar, Logo Bar, favicon source                |
| `Cat.jpg`                          | `cat.jpg`                        | 1500x2000  | Dark brown horse (Cat) in pasture                 | Meet the Horses — Cat profile                   |
| `Ginny.jpg`                        | `ginny.jpg`                      | 577x640    | Gray horse saddled with fall tree                 | Meet the Horses — Ginny profile                 |
| `Grey.jpg`                         | `grey.jpg`                       | 1500x2000  | Gray horse lying in field                         | Meet the Horses — Grey profile                  |
| `Boomer_JR.jpg`                    | `boomer-jr.jpg`                  | 1500x2000  | Two brown horses in green pasture                 | Meet the Horses — Boomer JR                     |
| `Bodie_the_Goatie.jpg`             | `bodie-goat.jpg`                 | 1500x2000  | Red goat in trailer                               | Meet the Horses — Bodie                         |
| `Friendly_Cat_and_Scaredy_Cat.jpg` | `barn-cats.jpg`                  | 1505x2000  | Two orange cats on tractor                        | Meet the Horses — Barn cats                     |
| `Horses_in_pasture.jpg`            | `horses-in-pasture.jpg`          | 1500x2000  | 4 horses grazing, blue sky                        | Hero background candidate, History page, scenic |
| `F907AE8A...JPG`                   | `white-horse-profile-sunset.jpg` | 1500x2000  | White horse profile, sun behind                   | Feature image, atmospheric                      |
| `82BBED0B...JPG`                   | `white-horse-over-fence.jpg`     | 2000x1500  | White horse close-up at fence                     | Homepage, About                                 |
| `E67A4E5C...JPG`                   | `two-brown-horses-closeup.jpg`   | 1500x2000  | Two brown horses looking at camera                | Meet the Horses, scenic                         |
| `70AD2613...JPG`                   | `kelsey-with-horse-1.jpg`        | 1500x2000  | Woman in green shirt petting braided horse        | About Us — Kelsey                               |
| `CD59C57D...JPG`                   | `kelsey-with-horse-2.jpg`        | 1500x2000  | Same woman smiling with braided horse             | About Us — Kelsey alt                           |
| `D5A3400C...JPG`                   | `sareena-hugging-horse.jpg`      | 1500x2000  | Woman hugging buckskin horse                      | Homepage hero candidate, About Us — Sareena     |
| `F5F2A1FB...JPG`                   | `sareena-brushing-horse.jpg`     | 1500x2000  | Woman brushing chestnut horse                     | About Us — Sareena alt, EAL/EAP                 |
| `CB84F025...JPG`                   | `kids-with-brown-horse.jpg`      | 2000x1500  | Two kids petting brown horse in pasture           | Services, Gallery                               |
| `6063DD36...JPG`                   | `girl-with-white-horse.jpg`      | 1500x2000  | Girl petting white horse, smiling                 | Services, Gallery                               |
| `1FA93B16...JPG`                   | `boy-with-white-horse.jpg`       | 1500x2000  | Boy hugging white horse's face                    | Homepage, Gallery — powerful connection image   |

### 10.2 Image Processing Pipeline

Run at build time or as a pre-deploy step:

```bash
# Create optimized versions of all images
# For each source image, generate:
# 1. WebP version (primary — smaller file size)
# 2. JPEG fallback (for older browsers)
# 3. Thumbnail (400px wide for cards)
# 4. Medium (800px wide for content blocks)
# 5. Large (1200px wide for hero/feature)

# Example using sharp-cli:
for img in src/assets/images/**/*.{jpg,JPG}; do
  sharp -i "$img" -o "${img%.*}-lg.webp" -- resize 1200 --webp
  sharp -i "$img" -o "${img%.*}-md.webp" -- resize 800 --webp
  sharp -i "$img" -o "${img%.*}-sm.webp" -- resize 400 --webp
done
```

### 10.3 Image Component Pattern

```typescript
// Use native lazy loading + responsive srcset
<img
  src={imageMd}
  srcSet={`${imageSm} 400w, ${imageMd} 800w, ${imageLg} 1200w`}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
  alt={descriptiveAltText}
  className="w-full h-full object-cover"
/>
```

### 10.4 MISSING ASSETS (still needed from client)

- [ ] OK Corral Series logo file
- [ ] Sareena's bio text
- [ ] Horse personality/description text for each horse
- [ ] Sareena's headshot (separate from interaction photos)
- [ ] Kelsey's headshot (separate from interaction photos)
- [ ] Contact information (email, phone, address/area)
- [ ] Social media links
- [ ] Logo in SVG format (have PNG, SVG preferred)

---

## 11. SEO & METADATA

### 11.1 Per-Page Meta Tags (use react-helmet-async)

```typescript
// Each page wraps content with:
<Helmet>
  <title>{pageTitle} | Iris + Insight</title>
  <meta name="description" content={pageDescription} />
  <meta property="og:title" content={`${pageTitle} | Iris + Insight`} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href={`https://irisandinsight.com${path}`} />
</Helmet>
```

### 11.2 Page Descriptions

| Page     | Title           | Description                                                                                             |
| -------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| Home     | Iris + Insight  | Equine-assisted psychotherapy and consulting in Iowa. Healing, growth, and connection guided by horses. |
| About    | About Us        | Meet Kelsey and Sareena — two licensed therapists passionate about equine-assisted services.            |
| History  | Our Story       | How a horse named Cat sparked the dream behind Iris + Insight.                                          |
| EAL/EAP  | About EAL/EAP   | Learn about equine-assisted learning and psychotherapy at Iris + Insight.                               |
| Services | Services        | Personalized equine-assisted therapy for individuals, couples, families, and businesses.                |
| Horses   | Meet the Horses | Meet the intuitive equine partners at Iris + Insight.                                                   |
| Contact  | Contact Us      | Get in touch with Iris + Insight to learn more about our equine-assisted services.                      |

### 11.3 Additional SEO

- Generate `sitemap.xml` at build time or manually
- Add `robots.txt` allowing all crawlers
- Ensure all images have descriptive `alt` text
- Use semantic HTML (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- Add JSON-LD structured data for local business schema

---

## 12. ACCESSIBILITY REQUIREMENTS

- All interactive elements keyboard-navigable
- Focus visible outlines on all focusable elements
- `aria-label` on icon-only buttons (hamburger menu, social links)
- Color contrast minimum WCAG AA (4.5:1 for body text, 3:1 for large text)
- All images have meaningful `alt` attributes
- Skip-to-content link hidden until focused
- Mobile menu traps focus when open
- Form inputs have associated `<label>` elements

---

## 13. RESPONSIVE BREAKPOINTS

Follow Tailwind defaults:

- `sm`: 640px (small mobile → large mobile)
- `md`: 768px (tablet — hamburger → desktop nav transition)
- `lg`: 1024px (small desktop)
- `xl`: 1280px (large desktop — max-width container)

### Key Responsive Behaviors

- **Nav:** Horizontal links → hamburger menu at `< md`
- **Hero:** Side-by-side → stacked at `< md`
- **Bio cards:** Side-by-side → stacked at `< lg`
- **Horse cards:** 3-col → 2-col → 1-col
- **Service cards:** 2x2 → 1-col at `< sm`
- **Value cards (inclusion):** 3-col → stacked at `< md`
- **Max content width:** 1200px centered with `px-6` padding

---

## 14. PERFORMANCE TARGETS

- Lighthouse Performance score: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total page weight: < 2MB (with lazy loading)
- All images lazy loaded except above-the-fold hero image
- Font display: `swap` (already in Google Fonts URL)
- Preconnect to Google Fonts in `<head>`

---

## 15. CONTENT NOTES

### First vs Third Person

The client noted they still need to decide between first person ("we") and third person ("Iris + Insight"). The content in this spec uses a **mix** — the History page uses third person (as written by the client), while Services uses first person.

**Agent instruction:** Use the text exactly as provided in this spec. Do not rewrite for voice consistency — the client will handle that in a later review pass.

### Content That Is Final (use as-is)

- Mission statement
- History page (all 5 blocks)
- Kelsey's bio
- Inclusion statement + values
- EAL/EAP descriptions
- Who We Serve + Focus Areas text

### Content That Is Placeholder (mark clearly in UI)

- Sareena's bio
- Horse descriptions (except Cat)
- Contact information
- Insurance / credentials details
- Pricing
- OK Corral logo

---

## 16. EXECUTION ORDER FOR AGENTS

Execute in this exact sequence. Each phase must be complete before the next begins.

### Phase 1: Project Initialization

1. Scaffold Vite + React + TypeScript project
2. Install all dependencies (Tailwind, React Router, etc.)
3. Configure `tailwind.config.ts` with full color palette and font families
4. Set up `postcss.config.js`
5. Configure `globals.css` with Tailwind directives
6. Set up ESLint + Prettier configs
7. Create folder structure as defined in Section 6
8. Commit: "chore: project scaffolding"

### Phase 2: Routing & Layout Shell

1. Create `navigation.ts` with all route definitions
2. Create `Layout.tsx` with `<Outlet />`
3. Build `Navbar.tsx` (desktop + mobile responsive)
4. Build `Footer.tsx`
5. Set up `App.tsx` with `BrowserRouter` and all routes
6. Implement `useScrollToTop` hook
7. Verify: All 7 routes render, nav highlights active page, mobile menu works
8. Commit: "feat: routing and layout shell"

### Phase 3: Shared UI Components

1. Build `SectionHeading.tsx`
2. Build `Card.tsx`
3. Build `ValueCard.tsx`
4. Build `ImageCard.tsx`
5. Build `Button.tsx`
6. Commit: "feat: shared UI components"

### Phase 4: Home Page

1. Build `Hero.tsx` section component
2. Build `MissionBand.tsx` section component
3. Build `LogoBar.tsx` section component
4. Build `InclusionStatement.tsx` section component
5. Assemble `HomePage.tsx` from sections
6. Add all images and verify layout
7. Test responsive behavior at all breakpoints
8. Commit: "feat: home page"

### Phase 5: Interior Pages (in order)

1. Build `OurTeamPage.tsx` — bio cards, placeholders
2. Build `HistoryPage.tsx` — narrative blocks with photos
3. Build `AboutEALEAPPage.tsx` — content cards
4. Build `ServicesPage.tsx` — who we serve, service grid, tags
5. Build `MeetTheHorsesPage.tsx` — horse profile cards from data file
6. Build `ContactUsPage.tsx` — form + contact info
7. Commit each page separately: "feat: {page name} page"

### Phase 6: Image Optimization & Polish

1. Process all images (WebP, responsive sizes)
2. Implement lazy loading
3. Add all `alt` text
4. Smooth scroll behaviors
5. Add subtle hover animations on cards and nav
6. Cross-browser testing
7. Commit: "feat: image optimization and polish"

### Phase 7: SEO & Accessibility

1. Install and configure `react-helmet-async`
2. Add meta tags to every page
3. Add `sitemap.xml` and `robots.txt`
4. Add JSON-LD structured data
5. Accessibility audit (keyboard nav, contrast, alt text, ARIA)
6. Commit: "feat: SEO and accessibility"

### Phase 8: Infrastructure & Deploy

1. Provision Digital Ocean droplet
2. Install Nginx, Node.js, Certbot
3. Configure Nginx server blocks (both domains)
4. Set up SSL certificates
5. Create `deploy.sh` script
6. Run initial deployment
7. Verify site loads on both domains
8. Verify SSL, redirects, caching headers
9. Commit: "chore: deployment configuration"

---

## 17. TESTING CHECKLIST

Before declaring the site complete, verify:

- [ ] All 7 pages render without errors
- [ ] Navigation works on desktop and mobile
- [ ] Mobile hamburger menu opens, closes, and navigates correctly
- [ ] All images load and are properly sized
- [ ] Logo displays correctly in nav and logo bar
- [ ] Site is responsive at 320px, 768px, 1024px, 1440px widths
- [ ] No horizontal overflow/scrolling at any breakpoint
- [ ] All text is readable (contrast meets WCAG AA)
- [ ] Contact form submits successfully (or shows appropriate placeholder)
- [ ] `irisandinsights.com` redirects to `irisandinsight.com`
- [ ] SSL certificate is valid on both domains
- [ ] Page load time < 3s on 3G throttle
- [ ] Lighthouse score > 90 across all categories
- [ ] All placeholder content is visually distinct from final content
- [ ] Footer shows correct year
- [ ] No console errors or warnings
