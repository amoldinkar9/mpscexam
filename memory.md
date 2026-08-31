# Project Overview

**Project Name:** `mpscexam`  
**Repository State:** Freshly Initialized Git Repository (Clean State / Green-field)  
**Workspace Location:** `/Users/amoldinkar9/Documents/mpscexam`  
**Git Branch:** `main` (Initial commit `9212d8c`)  
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
* **Frontend:** Next.js (App Router) / React with TypeScript
* **Styling & UI:** **Radix UI** (https://www.radix-ui.com/ - Radix Themes & Radix UI Primitives) with Vanilla CSS / CSS design tokens and Lucide Icons
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
  * Bilingual Marathi font providers (Google Fonts - Noto Sans Devanagari, Mukta, Tiro Devanagari Marathi).
  * Storage for question diagrams and aspirant study materials (AWS S3 / Cloudinary / Supabase Storage).
  * Payment gateway for premium mock tests (Razorpay / Stripe).

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
