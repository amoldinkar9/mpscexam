# Route Map & Navigation Hierarchy: `mpscexam`

This document defines the complete client-side and server-side route architecture for the MPSC Exam portal.

---

## 1. Client Pages & View Routes

| Route Path | View / Component | Purpose | Auth Required | Target Roles |
|---|---|---|---|---|
| `/` | `LandingPage` | Home page, exam category overview, latest notifications | No | Public |
| `/login` | `LoginPage` | Aspirant login via credentials / OAuth | No | Public (Guest only) |
| `/register` | `RegisterPage` | Aspirant sign-up, target exam selection | No | Public (Guest only) |
| `/dashboard` | `DashboardPage` | Main user dashboard, active enrollments, quick test links | Yes | Aspirant |
| `/tests` | `TestCataloguePage` | Searchable list of mock tests & full-length papers | Yes | Aspirant |
| `/tests/[id]` | `TestDetailsPage` | Test instructions, syllabus, marking scheme, Start button | Yes | Aspirant |
| `/tests/[id]/live` | `LiveExamRunnerPage`| Full-screen timed exam interface with question palette | Yes | Aspirant |
| `/tests/[id]/results`| `TestResultPage` | Comprehensive scorecard, rank, solutions & explanations | Yes | Aspirant |
| `/pyq` | `PYQArchivePage` | Filterable previous years' question bank (2015-2025) | Yes | Aspirant |
| `/syllabus` | `SyllabusTrackerPage`| Interactive MPSC Prelims & Mains syllabus checklist | Yes | Aspirant |
| `/current-affairs` | `CurrentAffairsPage`| Daily & monthly Maharashtra / National current events | No | Public |
| `/admin` | `AdminDashboardPage`| Admin portal metrics, test management, question editor | Yes | Admin, SME |
| `/admin/questions/new`| `QuestionEditorPage`| Bilingual question authoring form with RichText/Latex | Yes | Admin, SME |

---

## 2. Route Protection & Middleware Flow

```
Incoming Request
  │
  ├── Is Static Asset / Public Page ('/', '/login', '/current-affairs')?
  │     └── YES ──> Allow Request
  │
  └── Requires Authentication?
        └── Check Session / Bearer Token
              ├── Valid Session?
              │     ├── Admin Route ('/admin/*') -> Check Role == ADMIN / SME
              │     │     ├── YES ──> Allow Request
              │     │     └── NO  ──> Redirect to /dashboard (Forbidden)
              │     └── User Route -> Allow Request
              └── Invalid / Missing Session -> Redirect to /login
```
