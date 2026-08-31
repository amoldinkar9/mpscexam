# Dependency Graph & File Relationships: `mpscexam`

This document details the file topology, inter-module dependencies, and high-impact files for the project.

---

## 1. Current File Topology

```
mpscexam/
├── .git/                      # Git metadata & local history
├── README.md                  # Baseline repository information
├── memory.md                  # Central brain & system intelligence
├── architecture.md            # System architecture & component design
├── routes.md                  # Route map & page hierarchy
├── api-map.md                 # API endpoints & contracts
├── database-map.md            # Data models & entity relationships
└── dependency-graph.md        # File dependency graph (this document)
```

---

## 2. Structural Layer Dependencies (Target Architecture)

```
[UI Components & Pages]
       │
       ▼
[Client State & Hooks (Timer, Question Navigation, Language Toggle)]
       │
       ▼
[API Client / Server Actions (Submission, Attempt Init, PYQ Fetch)]
       │
       ▼
[Domain Services (TestEngine, GradingService, AnalyticsService)]
       │
       ▼
[Data Access Layer / ORM (Prisma / SQL Client)]
       │
       ▼
[Database (PostgreSQL / Relational Store)]
```

---

## 3. High-Impact & Core System Modules

When implemented, the following modules represent core system files that should be modified with high caution:

1. **`TestEngineService` / Grading Engine:** Responsible for computing exam scores, applying negative marks, and enforcing strict timing constraints. Any regression will directly impact student test scores.
2. **`AuthMiddleware` & RBAC Guard:** Protects live exam endpoints and prevents unauthenticated data leakage (e.g. answer keys).
3. **`ExamRunnerContainer` (Client State):** Manages local state snapshots and timer synchronization to prevent data loss on network disruption.
4. **Database Schema & Migrations (`schema.prisma` / migration files):** Dictates relational integrity across questions, test attempts, and answers.
