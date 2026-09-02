# Graph Report - mpscexam  (2026-09-02)

## Corpus Check
- Corpus is ~10,979 words - fits in a single context window. You may not need a graph.

## Summary
- 180 nodes · 201 edges · 19 communities (13 shown, 6 thin omitted)
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.8)
- Token cost: 75,030 input · 0 output

## Community Hubs (Navigation)
- Landing Page Components
- Core Architecture & Routes
- Dev Tooling Dependencies
- TypeScript Compiler Config
- System Architecture & Data Layer
- Runtime Dependencies
- Database Schema Map
- TypeScript Project References
- Package Scripts & Metadata
- Domain Services & Entities
- Project Overview & Agent Rules
- MPSC Exam Brand & Core Rules
- Exam Runner UI Components
- Root App Layout
- ESLint Config
- Category & Subject Entities
- Next.js Config
- PostCSS Config
- Gemini Project Directives

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 7 edges
3. `mpscexam Route Map` - 7 edges
4. `mpscexam System Architecture` - 6 edges
5. `QUESTION Entity` - 6 edges
6. `TestAttempt Entity` - 6 edges
7. `scripts` - 5 edges
8. `Business Domain Services` - 5 edges
9. `TestEngineService` - 5 edges
10. `TEST_ATTEMPT Entity` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Structural Layer Dependencies` --semantically_similar_to--> `mpscexam System Architecture`  [INFERRED] [semantically similar]
  dependency-graph.md → architecture.md
- `Next.js Agent Rules Notice` --semantically_similar_to--> `mpscexam Project Overview`  [INFERRED] [semantically similar]
  AGENTS.md → memory.md
- `README Getting Started (create-next-app)` --semantically_similar_to--> `mpscexam Project Overview`  [INFERRED] [semantically similar]
  README.md → memory.md
- `Graphify Knowledge Graph` --conceptually_related_to--> `mpscexam File Dependency Graph`  [INFERRED]
  .agents/rules/graphify.md → dependency-graph.md
- `TestEngineService` --shares_data_with--> `TEST_ATTEMPT Entity`  [INFERRED]
  architecture.md → database-map.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Test Attempt & Grading Flow** — api_map_post_tests_id_submit, architecture_test_engine_service, architecture_negative_marking_engine, database_map_test_attempt, database_map_user_answer [EXTRACTED 0.80]
- **mpscexam Layered Architecture** — architecture_edge_presentation_layer, architecture_application_api_layer, architecture_business_domain_services, architecture_persistence_data_layer [EXTRACTED 0.90]
- **Exam Endpoint Protection** — dependency_graph_auth_middleware_rbac_guard, architecture_rbac, routes_route_protection_middleware_flow, architecture_answer_shielding [INFERRED 0.75]
- **Core Backend Services** — memory_authservice, memory_testengineservice, memory_analyticsservice, memory_questionbankservice [EXTRACTED 1.00]
- **Exam Test Runner Component Hierarchy** — memory_examcontainer, memory_questionpalette, memory_questioncard, memory_examcontrols [EXTRACTED 1.00]

## Communities (19 total, 6 thin omitted)

### Community 0 - "Landing Page Components"
Cohesion: 0.11
Nodes (12): AspirantPainPoints(), FAQ(), Footer(), HeroSection(), HowItWorks(), OfferBreakdown(), Pricing(), SampleProof() (+4 more)

### Community 1 - "Core Architecture & Routes"
Cohesion: 0.11
Nodes (23): Graphify Knowledge Graph, Graphify Workflow, mpscexam API Inventory, Authentication Endpoints, POST /api/tests/:id/start, Question Bank & PYQ Endpoints, Test Series & Exam Runner Endpoints, Answer Shielding (+15 more)

### Community 2 - "Dev Tooling Dependencies"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss (+11 more)

### Community 3 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "System Architecture & Data Layer"
Cohesion: 0.16
Nodes (16): POST /api/tests/:id/submit, Analytics & Reporting Subsystem, AnalyticsService, Application & API Layer, Bilingual Content Subsystem, Business Domain Services, ContentService, Edge & Presentation Layer (+8 more)

### Community 5 - "Runtime Dependencies"
Cohesion: 0.15
Nodes (13): lucide-react, next, dependencies, lucide-react, next, @radix-ui/react-accordion, @radix-ui/themes, react (+5 more)

### Community 6 - "Database Schema Map"
Cohesion: 0.27
Nodes (10): CATEGORY Entity, mpscexam Database Entity Map, QUESTION Entity, SUBJECT Entity, TEST_ATTEMPT Entity, TEST_QUESTION_MAPPING Entity, TEST_SERIES Entity, USER Entity (+2 more)

### Community 7 - "TypeScript Project References"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 8 - "Package Scripts & Metadata"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 9 - "Domain Services & Entities"
Cohesion: 0.32
Nodes (8): AnalyticsService, Question Entity, QuestionBankService, Test Attempt & Grading Flow, TestAttempt Entity, TestEngineService, TestSeries Entity, UserAnswer Entity

### Community 10 - "Project Overview & Agent Rules"
Cohesion: 0.40
Nodes (5): generate-agent-files.js Mechanism, Next.js Agent Rules Notice, CLAUDE.md (imports AGENTS.md), mpscexam Project Overview, README Getting Started (create-next-app)

### Community 11 - "MPSC Exam Brand & Core Rules"
Cohesion: 0.50
Nodes (4): Brand Identity (mpscexam), mpscexam Core Project Rules, Mandatory Memory Reference, Radix UI Styling Framework

### Community 12 - "Exam Runner UI Components"
Cohesion: 0.50
Nodes (4): ExamContainer Component, ExamControls Component, QuestionCard Component, QuestionPalette Component

## Knowledge Gaps
- **73 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+68 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 80 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Tooling Dependencies` to `Package Scripts & Metadata`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `mpscexam Route Map` connect `Core Architecture & Routes` to `System Architecture & Data Layer`, `Database Schema Map`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _73 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Landing Page Components` be split into smaller, more focused modules?**
  _Cohesion score 0.10826210826210826 - nodes in this community are weakly interconnected._
- **Should `Core Architecture & Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.1067193675889328 - nodes in this community are weakly interconnected._
- **Should `Dev Tooling Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._