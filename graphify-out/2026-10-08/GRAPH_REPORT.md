# Graph Report - mpscexam  (2026-10-08)

## Corpus Check
- 58 files · ~196,296 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 334 nodes · 405 edges · 28 communities (17 shown, 7 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d55c218`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LandingPageChassis.tsx
- mpscexam Route Map
- devDependencies
- compilerOptions
- dependencies
- contentStore.ts
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
- pseo.ts
- generate-sitemap.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 10 edges
3. `getScarcityData()` - 9 edges
4. `getDb()` - 9 edges
5. `getSiteContent()` - 7 edges
6. `include` - 7 edges
7. `mpscexam Route Map` - 7 edges
8. `QUESTION Entity` - 6 edges
9. `mpscexam System Architecture` - 6 edges
10. `TestAttempt Entity` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Structural Layer Dependencies` --semantically_similar_to--> `mpscexam System Architecture`  [INFERRED] [semantically similar]
  dependency-graph.md → architecture.md
- `Next.js Agent Rules Notice` --semantically_similar_to--> `mpscexam Project Overview`  [INFERRED] [semantically similar]
  AGENTS.md → memory.md
- `README Getting Started (create-next-app)` --semantically_similar_to--> `mpscexam Project Overview`  [INFERRED] [semantically similar]
  README.md → memory.md
- `Graphify Knowledge Graph` --conceptually_related_to--> `mpscexam File Dependency Graph`  [INFERRED]
  .agents/rules/graphify.md → dependency-graph.md
- `QuestionEditorPage` --conceptually_related_to--> `QUESTION Entity`  [INFERRED]
  routes.md → database-map.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Test Attempt & Grading Flow** — api_map_post_tests_id_submit, architecture_test_engine_service, architecture_negative_marking_engine, database_map_test_attempt, database_map_user_answer [EXTRACTED 0.80]
- **mpscexam Layered Architecture** — architecture_edge_presentation_layer, architecture_application_api_layer, architecture_business_domain_services, architecture_persistence_data_layer [EXTRACTED 0.90]
- **Core Backend Services** — memory_authservice, memory_testengineservice, memory_analyticsservice, memory_questionbankservice [EXTRACTED 1.00]
- **Exam Test Runner Component Hierarchy** — memory_examcontainer, memory_questionpalette, memory_questioncard, memory_examcontrols [EXTRACTED 1.00]
- **Exam Endpoint Protection** — dependency_graph_auth_middleware_rbac_guard, architecture_rbac, routes_route_protection_middleware_flow, architecture_answer_shielding [INFERRED 0.75]

## Communities (28 total, 7 thin omitted)

### Community 0 - "LandingPageChassis.tsx"
Cohesion: 0.06
Nodes (28): dynamic, revalidate, AspirantPainPoints(), CutoffContrastData, FAQ(), Footer(), Header(), HeroSection() (+20 more)

### Community 1 - "mpscexam Route Map"
Cohesion: 0.06
Nodes (47): Graphify Knowledge Graph, Graphify Workflow, mpscexam API Inventory, Authentication Endpoints, POST /api/tests/:id/start, POST /api/tests/:id/submit, Question Bank & PYQ Endpoints, Test Series & Exam Runner Endpoints (+39 more)

### Community 2 - "devDependencies"
Cohesion: 0.06
Nodes (31): @cloudflare/vite-plugin, eslint, eslint-config-next, devDependencies, @cloudflare/vite-plugin, eslint, eslint-config-next, postcss (+23 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 5 - "dependencies"
Cohesion: 0.07
Nodes (27): katex, lucide-react, next, dependencies, katex, lucide-react, next, @radix-ui/react-accordion (+19 more)

### Community 6 - "contentStore.ts"
Cohesion: 0.14
Nodes (23): GET(), getAdminPasscode(), POST(), DELETE(), GET(), getAdminPasscode(), POST(), GET() (+15 more)

### Community 8 - "scripts"
Cohesion: 0.13
Nodes (14): name, private, scripts, build, build:vinext, deploy:vinext, dev, dev:vinext (+6 more)

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

### Community 13 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): googleSans, metadata, samaDevanagari

### Community 19 - "MPSC Exam Aspirants & Active Students Roster"
Cohesion: 0.50
Nodes (3): MPSC Exam Aspirants & Active Students Roster, Roster Index, Verified Student Roster

### Community 22 - "admin/page.tsx"
Cohesion: 0.18
Nodes (9): AdminPage(), getInitialHtmlForQuestion(), NAV_ITEMS, SiteContent, COLOR_PALETTE_ROWS, LATEX_PRESETS, MATH_SYMBOLS, RichTextEditor() (+1 more)

### Community 25 - "seed-d1.mjs"
Cohesion: 0.40
Nodes (4): content, escaped, jsonPath, sqlFile

### Community 26 - "pseo.ts"
Cohesion: 0.16
Nodes (16): dynamic, generateMetadata(), generateStaticParams(), Props, PseoSlugPage(), capitalizeWords(), COMMERCIAL_PACKAGES, getAllPseoSlugs() (+8 more)

### Community 28 - "generate-sitemap.mjs"
Cohesion: 0.12
Nodes (14): AEO_QUESTION_SLUGS, COMMERCIAL_SLUGS, __dirname, DISTRICTS, __filename, keywordsJsonPath, MARATHI_SLUGS, NEWS_SLUGS (+6 more)

## Knowledge Gaps
- **142 isolated node(s):** `Props`, `dynamic`, `googleSans`, `samaDevanagari`, `metadata` (+137 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 163 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `Props`, `dynamic`, `googleSans` to the rest of the system?**
  _142 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LandingPageChassis.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06462585034013606 - nodes in this community are weakly interconnected._
- **Should `mpscexam Route Map` be split into smaller, more focused modules?**
  _Cohesion score 0.06105457909343201 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._