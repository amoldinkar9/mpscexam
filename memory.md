# Project Overview

**Project Name:** `mpscexam`  
**Repository State:** Active Development  
**Workspace Location:** `/Users/amoldinkar9/Documents/mpscexam`  
**Git Branch:** `main`  
**Active Checkpoints:** `C00A` (Tagged Release Point - Drag & Drop reorder activated across all admin tables & options, Cloudflare D1 Database integration for persistence, favicon & title update, and phone number updated)  
**Git User Configuration:** `mpscexam` (`84007471+amoldinkar9@users.noreply.github.com`)  

---

# Business Purpose

### 1. Problem Domain
The repository name and identity indicate an educational / exam preparation and testing portal focused on the **Maharashtra Public Service Commission (MPSC)** competitive examinations (e.g., State Services / Rajyaseva, Combined Subordinate Services - Group B & Group C, Police Sub-Inspector [PSI], State Tax Inspector [STI], Assistant Section Officer [ASO], Forest Services, Engineering Services, etc.).

### 2. Primary Intended Users
* **Aspirants / Students:** Candidates preparing for MPSC competitive examinations requiring mock tests, previous years' question papers (PYQs), subject-wise quizzes, study materials, syllabus tracking, performance analytics, and current affairs.
* **Content Creators / Educators / Subject Matter Experts (SMEs):** Educators who author and curate questions, explanations (in Marathi and English), syllabus modules, test series, and reference materials.
* **Administrators:** Platform owners managing user accounts, test schedules, payments/subscriptions, notifications, announcements, and platform analytics.

### 3. Core Anticipated Features
* **Practice & Mock Test Engine:** Timed exam simulations following exact MPSC marking schemes (e.g., 1/4th negative marking, bilingual support Marathi/English, sectional timers).
* **Question Bank & PYQ Archive:** Categorized repository of previous years' questions indexed by year, paper (GS Paper 1, CSAT, Mains papers), subject, topic, and difficulty.
* **Detailed Analytics & Performance Reports:** Accuracy breakdown, time spent per question, topic-wise strengths and weaknesses, percentile ranking, and score trajectories.
* **Bilingual Content Support:** Full Marathi (मराठी) and English language toggle for questions, explanations, syllabus outlines, and UI.
* **Current Affairs & Daily Quizzes:** Daily updates and weekly revision tests on state, national, and international events.
* **Study Material & Syllabus Tracker:** Detailed syllabus mapping with progress indicators for Prelims and Mains.

---

# Tech Stack

### Current Codebase Inventory
* **Repository Baseline:** Initialized Git repository containing root `README.md`.
* **Framework / Language Implementations:** *Pending initial scaffolding.*

### Recommended / Standard Production Stack (Subject to User Confirmation)
* **Frontend:** Next.js 16 (App Router) / React 19 with TypeScript
* **Styling & UI:** **Tailwind CSS v4** with custom MPSC seal color palette (Maroon & Navy), responsive design tokens, and Lucide Icons
* **Backend / API Layer:** Next.js Server Actions & Route Handlers / Node.js API endpoints
* **Database:** PostgreSQL (via Prisma ORM / Supabase) or MongoDB
* **Authentication:** NextAuth.js (Auth.js) / Supabase Auth / JWT-based session management
* **State Management:** React Context / Zustand / TanStack Query
* **Deployment & Hosting:** Vercel / Railway / AWS / Docker containerization

---

# Repository Structure

```
mpscexam/
├── .git/                      # Git Version Control metadata
│   ├── config
│   ├── HEAD
│   ├── hooks/
│   ├── info/
│   ├── logs/
│   ├── objects/
│   └── refs/
├── README.md                  # Project initialization documentation
├── memory.md                  # Permanent project brain & architectural intelligence
├── architecture.md            # System architecture specification
├── routes.md                  # Route map & page hierarchy
├── api-map.md                 # API endpoints & contracts inventory
├── database-map.md            # Data models & schema specifications
└── dependency-graph.md        # File dependencies & structural topology
```

### Folder Responsibilities & Status
* `/` (Root): Repository root containing setup documentation and repository configuration.
* Source applications, packages, and shared utilities are ready to be structured upon development kickoff.

---

# System Architecture

```
+-----------------------------------------------------------------------+
|                              Client Layer                             |
|    - Web Browser (Desktop / Mobile Responsive)                        |
|    - Bilingual UI Engine (Marathi / English)                          |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                          Application Layer                            |
|    - Next.js / React Frontend Application                             |
|    - State Management & Client-side Exam Timer Engine                 |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                           API & Logic Layer                           |
|    - Authentication & Authorization Middleware                        |
|    - Test Engine & Question Evaluation Service                        |
|    - Analytics & Leaderboard Generator                                |
|    - Content & Syllabus Management Service                            |
+-----------------------------------+-----------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                            Database Layer                             |
|    - Relational Database (PostgreSQL / SQLite / Supabase)             |
|    - Entity Models (Users, Exams, Questions, Attempts, Results)       |
+-----------------------------------------------------------------------+
```

---

# Routing Map

*Status: Clean baseline. Target routes documented below.*

| Route | Expected File | Purpose | Auth Required |
|---|---|---|---|
| `/` | `app/page.tsx` or `index.html` | Landing page, featured test series, announcements | No |
| `/login` | `app/login/page.tsx` | User login (email/phone/Google) | No |
| `/register` | `app/register/page.tsx` | Aspirant registration and target exam selection | No |
| `/dashboard` | `app/dashboard/page.tsx` | Aspirant hub, recent scores, ongoing tests | Yes |
| `/tests` | `app/tests/page.tsx` | Test series catalogue (Prelims/Mains/Subject-wise) | Yes |
| `/tests/[id]` | `app/tests/[id]/page.tsx` | Test overview, syllabus coverage, start test prompt| Yes |
| `/tests/[id]/live` | `app/tests/[id]/live/page.tsx`| Live exam interface with timer and question palette | Yes |
| `/tests/[id]/results`| `app/tests/[id]/results/page.tsx`| Score breakdown, solutions, explanations, percentile | Yes |
| `/pyq` | `app/pyq/page.tsx` | Previous Years' Question papers archive | Yes |
| `/current-affairs` | `app/current-affairs/page.tsx` | Daily and monthly current affairs articles | No |
| `/admin` | `app/admin/page.tsx` | Admin management panel | Yes (Admin) |

---

# Frontend Architecture

* **UI Layout Structure:** Root layout with responsive navigation bar (header with language switcher, theme toggle, and user profile), main content viewport, and contextual sidebar/footer.
* **Exam Test Runner Component Hierarchy:**
  * `ExamContainer`: Coordinates exam session lifecycle, auto-submission timers, and local storage state backups.
  * `QuestionPalette`: Grid representing question statuses (Answered, Unanswered, Marked for Review, Not Visited).
  * `QuestionCard`: Bilingual question statement, options, image attachments, and language toggle.
  * `ExamControls`: Action buttons (Save & Next, Clear Response, Mark for Review & Next, Submit Exam).

---

# Backend Architecture

* **Request Processing Pipeline:** HTTP Request → Global Error / Rate Limiting Middleware → Authentication Middleware (JWT / Session) → Route Controller / Server Action → Validation Layer (Zod) → Business Logic / Service Layer → Database ORM Query → Formatted Response.
* **Core Services:**
  1. `AuthService`: Sign up, login, password reset, session verification.
  2. `TestEngineService`: Test instantiation, random question ordering (if applicable), real-time answer recording, automated grading, negative mark calculation.
  3. `AnalyticsService`: User historical performance tracking, accuracy percentage, time distribution analytics.
  4. `QuestionBankService`: Filtering by exam tier (Prelims/Mains), subject, sub-topic, and language.

---

# Database Architecture

*Status: Pending initial schema migration.*

### Core Proposed Entity Models:
1. **User:** `id`, `name`, `email`, `phone`, `passwordHash`, `targetExam`, `role` (ASPIRANT, ADMIN, SME), `createdAt`.
2. **Category / ExamType:** `id`, `name` (Rajyaseva, Combine Group B/C, etc.), `description`, `slug`.
3. **Subject / Topic:** `id`, `categoryId`, `titleMarathi`, `titleEnglish`, `code`.
4. **Question:** `id`, `subjectId`, `questionMarathi`, `questionEnglish`, `options` (JSON), `correctOption`, `explanationMarathi`, `explanationEnglish`, `marks`, `negativeMarks`, `year`, `examPaper`.
5. **TestSeries:** `id`, `title`, `description`, `durationMinutes`, `totalMarks`, `passingMarks`, `negativeMarkingRatio`.
6. **TestAttempt:** `id`, `userId`, `testSeriesId`, `startedAt`, `submittedAt`, `score`, `totalCorrect`, `totalIncorrect`, `totalUnattempted`, `status`.
7. **UserAnswer:** `id`, `attemptId`, `questionId`, `selectedOption`, `isMarkedForReview`, `timeSpentSeconds`.

---

# Authentication Flow

```
User submits credentials (Email/Phone + Password)
  ↓
Backend validates input & verifies password hash / OTP
  ↓
Issues Secure HttpOnly JWT / Session Token
  ↓
Client stores session in cookie / secure state
  ↓
Protected routes inspect session via Auth Middleware before rendering or executing actions
```

---

# API Inventory

*Status: Scaffolding baseline.*

| Method | Route | Purpose | Used By |
|---|---|---|---|
| POST | `/api/auth/register` | Register new student profile | Registration page |
| POST | `/api/auth/login` | Authenticate user & return session | Login page |
| GET | `/api/auth/me` | Retrieve active authenticated session | App root & navigation |
| GET | `/api/tests` | Fetch available test series list | Tests catalogue |
| GET | `/api/tests/:id` | Fetch test series metadata and question count | Test overview |
| POST | `/api/tests/:id/start` | Start test attempt & initialize attempt session | Live test screen |
| POST | `/api/tests/:id/submit`| Submit test responses & compute score | Live test screen |
| GET | `/api/attempts/:id` | Get detailed attempt results and explanations | Results screen |
| GET | `/api/analytics/user` | Fetch cumulative user preparation metrics | Dashboard |

---

# Data Flow Diagrams

### Test Attempt & Grading Flow:
```
Student selects test -> Client calls /api/tests/:id/start
  ↓
Backend creates TestAttempt record with timestamp -> Returns sanitized question list (no answer keys)
  ↓
Student answers questions -> State maintained in local client storage (with heartbeat sync)
  ↓
Student submits or timer expires -> Client sends payload to /api/tests/:id/submit
  ↓
Backend grades each question against Answer Key -> Computes positive/negative marks
  ↓
Calculates rank/percentile -> Stores in TestAttempt -> Returns Result Summary to Client
```

---

# Environment Variables

*Anticipated configuration variables:*

```env
# Server / App
PORT=3000
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mpscexam

# Authentication
AUTH_SECRET=super_secret_jwt_or_auth_key
NEXTAUTH_URL=http://localhost:3000

# Third-Party / Storage / Analytics (Optional)
CLOUDINARY_URL=
SENTRY_DSN=
```

---

# Third Party Integrations

* **Planned / Expected:**
  * Bilingual Marathi & English typography: Self-hosted **Sama Devanagari** (`next/font/local` across 6 weights: 400 to 800) prioritized with `unicode-range: U+0900-097F, U+A8E0-A8FF, U+1CD0-1CFF, U+200C-200D, U+20B9` strictly for all Marathi/Devanagari text, with **Google Sans** (`next/font/google` latin subset) specifically for all English/Latin words and numerals.
  * Storage for question diagrams and aspirant study materials (AWS S3 / Cloudinary / Supabase Storage).
  * Payment gateway for premium mock tests (Razorpay / Stripe).

---

# Conversion & FOMO Strategy Architecture

### 1. FOMO Strategy Statement
> **Core Strategy Statement:**  
> *"Every serious MPSC aspirant has access to the standard reference books. What truly decides the 2–4 mark cutoff gap in the Maharashtra Group C Preliminary Exam is not reading more theory, but simulated timed test practice and rigorous negative-mark (-0.25) control. By combining live competitor momentum across Maharashtra, authentic slot scarcity for the ₹199 launch tier, the official exam day countdown, and the 1-year opportunity cost of missing the cutoff, we guide aspirants through an urgent, high-converting decision flow that cements our 25-Test Series as the essential tool to secure their cutoff."*

### 2. Behavioral Conversion Flow (Buyer Journey)
```mermaid
flowchart TD
    A[Visitor Lands on mpscexam] --> B[Live Header Pulse & Real-time Maharashtra Toasts]
    B --> C[Official MPSC Group C Exam Countdown Timer]
    C --> D[Syllabus Weightage & Sample Question Proof]
    D --> E[Loss Aversion: Reading Only vs 25-Test Simulation]
    E --> F[5-Step Score Acceleration Flow]
    F --> G[Tiered Slot Scarcity: 442/500 Booked - 58 Left]
    G --> H[Instant 1-Click Enrollment at ₹199]
    H --> I[Immediate Test Series & PDF Access]
```

### 3. Key Placement Elements & Drivers
* **Real-time Social Proof:** Floating dynamic toast (`LiveActivityToast.tsx`) displaying verified actions (test completions, 74+ scores, package unlocks) across Pune, Kolhapur, Sambhaji Nagar, Nashik, etc.
* **Official Exam Urgency:** Prominent countdown to the actual MPSC Group C Preliminary Exam paper date in `UrgencyBanner.tsx`.
* **Cutoff Gap Contrast:** Explicit comparison in `AspirantPainPoints.tsx` showing the danger of losing 1 full year by relying on book reading alone without -0.25 negative marking mastery.
* **Slot Scarcity & Price Lock:** Launch offer locked to the first 500 aspirants (`Pricing.tsx` & `StickyMobileBar.tsx`), reverting to ₹999 after 58 remaining slots are claimed.

---

# Feature Inventory

1. **Bilingual Question Engine:** Simultaneous or toggled Marathi/English question display.
2. **Real-time Exam Simulation:** Accurate MPSC Prelims (GS + CSAT) and Mains interface with timer, color-coded question palette, and auto-submit.
3. **Automated Negative Marking:** Dynamic deduction based on MPSC standard ratios (e.g., 0.25 marks per incorrect answer).
4. **Performance Analytics Dashboard:** Visual progress charts, subject-wise accuracy, and speed analysis.
5. **PYQ (Previous Year Questions) Search & Filter:** Filter by exam year (2015-2025), paper, topic, and difficulty.

---

# Dependency Graph & Important Files

* **Current Files:**
  * `README.md`: Basic repository marker.
  * `memory.md`: Central brain and codebase reference.
  * `architecture.md`: Architectural blueprint and system flow.
  * `routes.md`: Routing structure and hierarchy.
  * `api-map.md`: API specifications and contracts.
  * `database-map.md`: Database entities and ER diagrams.
  * `dependency-graph.md`: Topological file dependencies.

---

# Performance Notes & Technical Debt

* **Baseline Performance:** Clean slate; zero current runtime overhead.
* **Anticipated Performance Considerations:**
  * Large question banks should implement efficient pagination and database indexing (on `subjectId`, `year`, `examType`).
  * Test attempt submissions should evaluate answers in batch within a database transaction.
  * Static study material pages should leverage SSR/ISR for search engine visibility and fast initial loads.

---

# Development Workflow & Deployment Process

1. **Local Setup:** Initialize runtime framework (`npm init` / `npx create-next-app` / Vite).
2. **Version Control:** Feature branches branched off `main`, merged via Pull Requests.
3. **Deployment:** Production automated builds via Vercel / Docker container running behind reverse proxy (Nginx).

---

# Known Risks & Future Recommendations

1. **Devanagari Font Rendering:** Ensure consistent typography rendering across mobile devices and older browsers for complex Marathi ligatures.
2. **Offline Resilience during Exams:** Implement local storage syncing so candidate answers are preserved if internet connectivity drops temporarily during an active mock test.
3. **Data Integrity:** Prevent client-side answer tampering by never transmitting correct answer keys in the initial test start payload.

---

# UI & Navigation Architecture Updates

### Sticky Header (`src/components/Header.tsx`)
- **Positioning:** Fixed sticky at viewport top (`sticky top-0 z-50`) across all landing sections.
- **Constant Sizing:** Preserves the exact height, padding, and logo dimensions without any shrinkage or layout shift during scrolling.
- **Scroll Feedback:** Soft shadow transition (`shadow-xs` -> `shadow-md`) over content while maintaining its background blur (`bg-[#fbf4f3]/95 backdrop-blur-md`).
- **Components:** TCS9 Logo + MPSC Seal with unified height, exam pill badge ("MPSC Group C पूर्व परीक्षा 2026"), and live countdown timer.
- **Page Structure:** Elevated out of `HeroSection.tsx` into `src/app/page.tsx` as a direct descendant of `<main>` to bypass CSS `overflow-hidden` constraints.

### Mobile Sticky Footer Bar (`src/components/StickyMobileBar.tsx`)
- **Inverted Palette:** Transformed from light white container to rich deep maroon (`bg-[#8b261e]/98 backdrop-blur-md border-t border-[#a6362d]`).
- **High-Contrast Elements:**
  - Price: Glowing crisp white `₹199` and translucent strikethrough `₹999` (`text-white/60`).
  - Scarcity Urgency: Glowing amber icon and text (`text-amber-300 fill-amber-300`).
  - WhatsApp: Translucent glass pill (`bg-white/10 border-white/20 text-emerald-300`).
  - Primary Action Button: Inverted to crisp white button with maroon text (`bg-white text-[#8b261e] font-black shadow-lg`).
  - Periodic Click Micro-Animation: Automatic simulated tap-and-click gesture (`animate-tap-click` + `animate-tap-ripple`) that periodically depresses the button, triggers a radiating tap wave, bounces back, and settles smoothly.

### Landing Page Section Drag-and-Drop & Visibility Manager
- **Section Order & State Storage:** Configured in `src/data/siteContent.json` under `sections: SectionConfig[]` with IDs:
  1. `hero`: Hero Section
  2. `urgency`: Urgency / Countdown Banner
  3. `testimonials`: Social Proof & Reviews
  4. `syllabus`: Syllabus Breakdown Accordion
  5. `howToPurchase`: Purchase Guide & Slider
  6. `painPoints`: Aspirant Pain Points & Cutoff Contrast
  7. `sampleProof`: Sample Questions & Explanations
  8. `faqs`: Frequently Asked Questions
  9. `pricing`: Pricing & Final CTA Card
- **Admin Management Panel (`src/app/admin/page.tsx`):**
  - Dedicated "Sections Order" tab with `Layers` icon.
  - Native HTML5 Drag & Drop reordering via grip handle (`GripVertical`).
  - Single-click Move Up (`ChevronUp`) and Move Down (`ChevronDown`) arrow buttons.
  - Accessible Radix UI Switch (`Switch.Root` & `Switch.Thumb`) for instant live Enable / Disable toggling.
  - Visual status pill badges ("सक्रिय / Live" in emerald vs "लपवलेला / Off" in zinc).
  - Direct deep-links to jump into specific content editing tabs.
  - One-click "मूळ क्रम (Reset Order)" button to restore default conversion flow.
- **Dynamic Main Page Renderer (`src/app/page.tsx`):**
  - Consumes `content.sections` dynamically, skips disabled sections (`s.enabled !== false`), and renders remaining sections in the exact saved sequence.
  - Preserves persistent top sticky `Header` and floating `Footer`, `StickyMobileBar`, and `LiveActivityToast`.

### LaTeX Math & Formula Engine in Rich Text Editor (`src/components/admin/RichTextEditor.tsx`)
- **Integration:** Powered by `katex` for high-performance server/client math typesetting.
- **Global Styles:** `katex/dist/katex.min.css` imported in `src/app/layout.tsx` for universal rendering across admin and public landing pages (`SampleProof.tsx`).
- **Toolbar & Modal Controls:**
  - Dedicated `TeX LaTeX` button in WYSIWYG toolbar and `+ LaTeX सूत्र` shortcut in editor footer.
  - Mode selector: **Inline Formula** (`$...$`) for embedding within sentences vs **Display Block** (`$$...$$`) for centered standout equations.
  - Real-time live KaTeX preview updating synchronously as the author types LaTeX.
### Admin Authentication & Passcode Protection (`src/app/admin/page.tsx` & `/api/admin/content`)
- **Passcode Protection:** The admin panel requires passcode authentication before any content or management controls are accessible.
- **Configured Passcode:** Set to `3103@moL..**` via `ADMIN_PASSCODE` in `.env.local`, `wrangler.jsonc` vars for Cloudflare Workers, and server fallback.
- **No Default Pre-fill:** The password input field begins empty (`""`) by default.
- **Zero Hint Disclosure:** All hints disclosing default credentials have been completely removed from the UI and error messages.
- **Server Verification:** Passwords are authenticated via `POST /api/admin/content` (`{ action: "verify", passcode }`) against `ADMIN_PASSCODE` environment variable.
- **Session Continuity:** Authenticated sessions are held in browser `sessionStorage` (`admin_auth_passcode`) so active sessions persist during browser navigation and clear completely upon logout.



