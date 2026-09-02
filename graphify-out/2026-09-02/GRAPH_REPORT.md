# Graph Report - mpscexam  (2026-09-02)

## Corpus Check
- 33 files · ~11,751 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 184 nodes · 206 edges · 19 communities (13 shown, 6 thin omitted)
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cdd407a6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- page.tsx
- mpscexam Route Map
- devDependencies
- compilerOptions
- mpscexam System Architecture
- dependencies
- QUESTION Entity
- include
- package.json
- TestAttempt Entity
- Next.js Agent Rules Notice
- mpscexam Core Project Rules
- ExamContainer Component
- layout.tsx
- eslint.config.mjs
- Category/ExamType Entity
- next.config.ts
- postcss.config.mjs
- mpscexam Project Directives (GEMINI.md)

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 7 edges
3. `mpscexam Route Map` - 7 edges
4. `mpscexam System Architecture` - 6 edges
5. `QUESTION Entity` - 6 edges
6. `TestAttempt Entity` - 6 edges
7. `scripts` - 5 edges
8. `mpscexam File Dependency Graph` - 5 edges
9. `Business Domain Services` - 5 edges
10. `TestEngineService` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Agent Rules Notice` --semantically_similar_to--> `mpscexam Project Overview`  [INFERRED] [semantically similar]
  AGENTS.md → memory.md
- `README Getting Started (create-next-app)` --semantically_similar_to--> `mpscexam Project Overview`  [INFERRED] [semantically similar]
  README.md → memory.md
- `Structural Layer Dependencies` --semantically_similar_to--> `mpscexam System Architecture`  [INFERRED] [semantically similar]
  dependency-graph.md → architecture.md
- `QuestionEditorPage` --conceptually_related_to--> `QUESTION Entity`  [INFERRED]
  routes.md → database-map.md
- `Graphify Knowledge Graph` --conceptually_related_to--> `mpscexam File Dependency Graph`  [INFERRED]
  .agents/rules/graphify.md → dependency-graph.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Test Attempt & Grading Flow** — api_map_post_tests_id_submit, architecture_test_engine_service, architecture_negative_marking_engine, database_map_test_attempt, database_map_user_answer [EXTRACTED 0.80]
- **mpscexam Layered Architecture** — architecture_edge_presentation_layer, architecture_application_api_layer, architecture_business_domain_services, architecture_persistence_data_layer [EXTRACTED 0.90]
- **Core Backend Services** — memory_authservice, memory_testengineservice, memory_analyticsservice, memory_questionbankservice [EXTRACTED 1.00]
- **Exam Test Runner Component Hierarchy** — memory_examcontainer, memory_questionpalette, memory_questioncard, memory_examcontrols [EXTRACTED 1.00]
- **Exam Endpoint Protection** — dependency_graph_auth_middleware_rbac_guard, architecture_rbac, routes_route_protection_middleware_flow, architecture_answer_shielding [INFERRED 0.75]

## Communities (19 total, 6 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.09
Nodes (15): AspirantPainPoints(), FAQ(), Footer(), HeroSection(), HowItWorks(), activities, ActivityItem, LiveActivityToast() (+7 more)

### Community 1 - "mpscexam Route Map"
Cohesion: 0.11
Nodes (22): Graphify Knowledge Graph, Graphify Workflow, mpscexam API Inventory, Authentication Endpoints, POST /api/tests/:id/start, Question Bank & PYQ Endpoints, Test Series & Exam Runner Endpoints, Answer Shielding (+14 more)

### Community 2 - "devDependencies"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss (+11 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "mpscexam System Architecture"
Cohesion: 0.16
Nodes (16): POST /api/tests/:id/submit, Analytics & Reporting Subsystem, AnalyticsService, Application & API Layer, Bilingual Content Subsystem, Business Domain Services, ContentService, Edge & Presentation Layer (+8 more)

### Community 5 - "dependencies"
Cohesion: 0.15
Nodes (13): lucide-react, next, dependencies, lucide-react, next, @radix-ui/react-accordion, @radix-ui/themes, react (+5 more)

### Community 6 - "QUESTION Entity"
Cohesion: 0.31
Nodes (9): CATEGORY Entity, mpscexam Database Entity Map, QUESTION Entity, SUBJECT Entity, TEST_ATTEMPT Entity, TEST_QUESTION_MAPPING Entity, TEST_SERIES Entity, USER Entity (+1 more)

### Community 7 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 8 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 9 - "TestAttempt Entity"
Cohesion: 0.24
Nodes (10): AnalyticsService, AuthService, Question Entity, QuestionBankService, Test Attempt & Grading Flow, TestAttempt Entity, TestEngineService, TestSeries Entity (+2 more)

### Community 10 - "Next.js Agent Rules Notice"
Cohesion: 0.40
Nodes (5): generate-agent-files.js Mechanism, Next.js Agent Rules Notice, CLAUDE.md (imports AGENTS.md), mpscexam Project Overview, README Getting Started (create-next-app)

### Community 11 - "mpscexam Core Project Rules"
Cohesion: 0.50
Nodes (4): Brand Identity (mpscexam), mpscexam Core Project Rules, Mandatory Memory Reference, Radix UI Styling Framework

### Community 12 - "ExamContainer Component"
Cohesion: 0.50
Nodes (4): ExamContainer Component, ExamControls Component, QuestionCard Component, QuestionPalette Component

## Knowledge Gaps
- **75 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+70 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 82 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `mpscexam Route Map` connect `mpscexam Route Map` to `mpscexam System Architecture`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _75 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09247311827956989 - nodes in this community are weakly interconnected._
- **Should `mpscexam Route Map` be split into smaller, more focused modules?**
  _Cohesion score 0.11255411255411256 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._