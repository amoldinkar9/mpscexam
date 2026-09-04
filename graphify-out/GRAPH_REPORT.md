# Graph Report - mpscexam  (2026-09-04)

## Corpus Check
- 46 files · ~75,070 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 261 nodes · 296 edges · 27 communities (17 shown, 7 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d1f98a1a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app/page.tsx
- mpscexam Route Map
- devDependencies
- compilerOptions
- contentStore.ts
- dependencies
- include
- scripts
- TestAttempt Entity
- Next.js Agent Rules Notice
- mpscexam Core Project Rules
- ExamContainer Component
- app/layout.tsx
- eslint.config.mjs
- Category/ExamType Entity
- next.config.ts
- postcss.config.mjs
- mpscexam Project Directives (GEMINI.md)
- MPSC Exam Aspirants & Active Students Roster
- admin/page.tsx
- admin/layout.tsx
- middleware.ts
- seed-d1.mjs
- QUESTION Entity

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 9 edges
3. `getScarcityData()` - 7 edges
4. `include` - 7 edges
5. `mpscexam Route Map` - 7 edges
6. `getSiteContent()` - 6 edges
7. `QUESTION Entity` - 6 edges
8. `mpscexam System Architecture` - 6 edges
9. `TestAttempt Entity` - 6 edges
10. `Business Domain Services` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Agent Rules Notice` --semantically_similar_to--> `mpscexam Project Overview`  [INFERRED] [semantically similar]
  AGENTS.md → memory.md
- `README Getting Started (create-next-app)` --semantically_similar_to--> `mpscexam Project Overview`  [INFERRED] [semantically similar]
  README.md → memory.md
- `Structural Layer Dependencies` --semantically_similar_to--> `mpscexam System Architecture`  [INFERRED] [semantically similar]
  dependency-graph.md → architecture.md
- `Graphify Knowledge Graph` --conceptually_related_to--> `mpscexam File Dependency Graph`  [INFERRED]
  .agents/rules/graphify.md → dependency-graph.md
- `QuestionBankService` --shares_data_with--> `QUESTION Entity`  [INFERRED]
  architecture.md → database-map.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Test Attempt & Grading Flow** — api_map_post_tests_id_submit, architecture_test_engine_service, architecture_negative_marking_engine, database_map_test_attempt, database_map_user_answer [EXTRACTED 0.80]
- **mpscexam Layered Architecture** — architecture_edge_presentation_layer, architecture_application_api_layer, architecture_business_domain_services, architecture_persistence_data_layer [EXTRACTED 0.90]
- **Core Backend Services** — memory_authservice, memory_testengineservice, memory_analyticsservice, memory_questionbankservice [EXTRACTED 1.00]
- **Exam Test Runner Component Hierarchy** — memory_examcontainer, memory_questionpalette, memory_questioncard, memory_examcontrols [EXTRACTED 1.00]
- **Exam Endpoint Protection** — dependency_graph_auth_middleware_rbac_guard, architecture_rbac, routes_route_protection_middleware_flow, architecture_answer_shielding [INFERRED 0.75]

## Communities (27 total, 7 thin omitted)

### Community 0 - "app/page.tsx"
Cohesion: 0.08
Nodes (21): dynamic, revalidate, AspirantPainPoints(), CutoffContrastData, FAQ(), Footer(), HeroSection(), HowToPurchase() (+13 more)

### Community 1 - "mpscexam Route Map"
Cohesion: 0.08
Nodes (36): Graphify Knowledge Graph, Graphify Workflow, mpscexam API Inventory, Authentication Endpoints, POST /api/tests/:id/start, POST /api/tests/:id/submit, Question Bank & PYQ Endpoints, Test Series & Exam Runner Endpoints (+28 more)

### Community 2 - "devDependencies"
Cohesion: 0.07
Nodes (29): @cloudflare/vite-plugin, eslint, eslint-config-next, devDependencies, @cloudflare/vite-plugin, eslint, eslint-config-next, postcss (+21 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "contentStore.ts"
Cohesion: 0.33
Nodes (8): GET(), POST(), Home(), getD1Database(), getDefaultSiteContent(), getSiteContent(), saveSiteContent(), SiteContent

### Community 5 - "dependencies"
Cohesion: 0.08
Nodes (25): lucide-react, next, dependencies, lucide-react, next, @radix-ui/react-accordion, @radix-ui/react-dialog, @radix-ui/react-switch (+17 more)

### Community 6 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 8 - "scripts"
Cohesion: 0.14
Nodes (13): name, private, scripts, build, build:vinext, deploy:vinext, dev, dev:vinext (+5 more)

### Community 9 - "TestAttempt Entity"
Cohesion: 0.22
Nodes (11): AnalyticsService, Authentication Flow, AuthService, Question Entity, QuestionBankService, Test Attempt & Grading Flow, TestAttempt Entity, TestEngineService (+3 more)

### Community 10 - "Next.js Agent Rules Notice"
Cohesion: 0.40
Nodes (5): generate-agent-files.js Mechanism, Next.js Agent Rules Notice, CLAUDE.md (imports AGENTS.md), mpscexam Project Overview, README Getting Started (create-next-app)

### Community 11 - "mpscexam Core Project Rules"
Cohesion: 0.50
Nodes (4): Brand Identity (mpscexam), mpscexam Core Project Rules, Mandatory Memory Reference, Radix UI Styling Framework

### Community 12 - "ExamContainer Component"
Cohesion: 0.50
Nodes (4): ExamContainer Component, ExamControls Component, QuestionCard Component, QuestionPalette Component

### Community 13 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): googleSans, metadata, samaDevanagari

### Community 19 - "MPSC Exam Aspirants & Active Students Roster"
Cohesion: 0.50
Nodes (3): MPSC Exam Aspirants & Active Students Roster, Roster Index, Verified Student Roster

### Community 22 - "admin/page.tsx"
Cohesion: 0.22
Nodes (7): AdminPage(), getInitialHtmlForQuestion(), SiteContent, COLOR_PALETTE_ROWS, MATH_SYMBOLS, RichTextEditor(), RichTextEditorProps

### Community 25 - "seed-d1.mjs"
Cohesion: 0.40
Nodes (4): content, escaped, jsonPath, sqlFile

### Community 26 - "QUESTION Entity"
Cohesion: 0.27
Nodes (10): CATEGORY Entity, mpscexam Database Entity Map, QUESTION Entity, SUBJECT Entity, TEST_ATTEMPT Entity, TEST_QUESTION_MAPPING Entity, TEST_SERIES Entity, USER Entity (+2 more)

## Knowledge Gaps
- **108 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+103 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 126 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `Route Protection & Middleware Flow` connect `mpscexam Route Map` to `TestAttempt Entity`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _108 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Should `mpscexam Route Map` be split into smaller, more focused modules?**
  _Cohesion score 0.07777777777777778 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._