# System Architecture: `mpscexam`

This document details the high-level and component-level architecture for the **MPSC Exam Preparation & Mock Test Platform**.

---

## 1. High-Level Architectural Diagram

```
+-------------------------------------------------------------------------------+
|                                  USER CLIENTS                                 |
|   - Desktop & Mobile Web Browsers                                             |
|   - Aspirants taking timed exams / Reviewing PYQs                             |
|   - Admins / SMEs authoring questions                                         |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / WSS
                                        v
+-------------------------------------------------------------------------------+
|                            EDGE & PRESENTATION LAYER                          |
|   - Next.js Edge / CDN & Static Asset Caching                                 |
|   - Responsive Bilingual UI (Marathi + English)                               |
|   - Client-side Exam Timer Engine & LocalStorage Snapshot Sync                |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                             APPLICATION & API LAYER                           |
|   - Route Handlers / Server Actions                                           |
|   - Auth & Session Verification Middleware (JWT / NextAuth)                   |
|   - Request Validation (Zod Schemas)                                          |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                              BUSINESS DOMAIN SERVICES                         |
|   - TestEngineService (Session generator, auto-grading, negative marking)     |
|   - QuestionBankService (PYQ filtering, category & subject management)        |
|   - AnalyticsService (Percentile, topic accuracy, speed distribution)         |
|   - ContentService (Current affairs articles, syllabus tracking)              |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                               PERSISTENCE & DATA LAYER                        |
|   - Relational Database: PostgreSQL (via Prisma / Drizzle ORM)                |
|   - Object Storage: AWS S3 / Cloudinary (Question diagrams, study PDFs)       |
|   - Cache / In-Memory Store: Redis (Optional for live leaderboards)           |
+-------------------------------------------------------------------------------+
```

---

## 2. Core Subsystems

### A. Exam Engine & Grading Subsystem
* **Session Lifecycle:** When a test begins, a snapshot of sanitized questions is delivered to the client. The backend tracks the start time on the server to prevent client-side clock manipulation.
* **Auto-Submission:** Triggers on client countdown completion or forced server timestamp expiry.
* **Negative Marking Engine:** Configurable per exam rule (e.g., MPSC standard 0.25 marks deduction per wrong answer in Prelims GS 1).

### B. Bilingual Content Subsystem
* Marathi (मराठी) is first-class alongside English.
* All question stems, multiple-choice options, and pedagogical explanations support UTF-8 Devanagari text formatting and mathematical/diagrammatic assets.

### C. Analytics & Reporting Subsystem
* Generates instant feedback upon test submission:
  * Raw Score (Correct $\times$ Marks - Incorrect $\times$ Negative Marks)
  * Accuracy % across Subjects (History, Geography, Polity, Economy, Science, CSAT)
  * Time Spent Breakdown (Average seconds per question vs top percentiles)

---

## 3. Security & Integrity Considerations

1. **Answer Shielding:** Question endpoints for active exam sessions MUST omit `correctOption` and `explanation`. Solutions are only delivered post-submission.
2. **Time Server-Validation:** Test start and end timestamps are validated server-side.
3. **Role-Based Access Control (RBAC):**
   * `ASPIRANT`: Take tests, view owned attempts, browse public study material.
   * `SME / CONTENT_CREATOR`: Create and edit draft questions and tests.
   * `ADMIN`: Publish tests, manage users, view system telemetry.
