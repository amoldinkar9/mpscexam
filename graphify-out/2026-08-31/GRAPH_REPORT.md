# Graph Report - mpscexam  (2026-08-31)

## Corpus Check
- 12 files · ~4,158 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 77 nodes · 66 edges · 16 communities (8 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `094464f3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- memory.md
- 2. Test Series & Exam Runner Endpoints
- 2. Core Subsystems
- 2. Table Specifications & Indexes
- Dependency Graph & File Relationships: `mpscexam`
- Business Purpose
- Route Map & Navigation Hierarchy: `mpscexam`
- Project Instructions & Directives: mpscexam
- Project Guidelines & Core Rules
- Project Instructions & Directives: mpscexam
- Tech Stack
- rules/graphify.md
- workflows/graphify.md
- Database Architecture
- Data Flow Diagrams
- Repository Structure

## God Nodes (most connected - your core abstractions)
1. `2. Test Series & Exam Runner Endpoints` - 5 edges
2. `API Inventory & Endpoint Specifications: `mpscexam`` - 4 edges
3. `System Architecture: `mpscexam`` - 4 edges
4. `2. Core Subsystems` - 4 edges
5. `2. Table Specifications & Indexes` - 4 edges
6. `Dependency Graph & File Relationships: `mpscexam`` - 4 edges
7. `Business Purpose` - 4 edges
8. `1. Authentication Endpoints` - 3 edges
9. `Database Architecture & Entity Map: `mpscexam`` - 3 edges
10. `Tech Stack` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (16 total, 8 thin omitted)

### Community 0 - "memory.md"
Cohesion: 0.13
Nodes (14): API Inventory, Authentication Flow, Backend Architecture, Dependency Graph & Important Files, Development Workflow & Deployment Process, Environment Variables, Feature Inventory, Frontend Architecture (+6 more)

### Community 1 - "2. Test Series & Exam Runner Endpoints"
Cohesion: 0.17
Nodes (11): 1. Authentication Endpoints, 2. Test Series & Exam Runner Endpoints, 3. Question Bank & PYQ Endpoints, API Inventory & Endpoint Specifications: `mpscexam`, `GET /api/attempts/:id`, `GET /api/pyq`, `GET /api/tests`, `POST /api/auth/login` (+3 more)

### Community 2 - "2. Core Subsystems"
Cohesion: 0.25
Nodes (7): 1. High-Level Architectural Diagram, 2. Core Subsystems, 3. Security & Integrity Considerations, A. Exam Engine & Grading Subsystem, B. Bilingual Content Subsystem, C. Analytics & Reporting Subsystem, System Architecture: `mpscexam`

### Community 3 - "2. Table Specifications & Indexes"
Cohesion: 0.29
Nodes (6): 1. Entity-Relationship Diagram (Text / Mermaid), 2. Table Specifications & Indexes, Database Architecture & Entity Map: `mpscexam`, Table: `questions`, Table: `test_attempts`, Table: `users`

### Community 4 - "Dependency Graph & File Relationships: `mpscexam`"
Cohesion: 0.40
Nodes (4): 1. Current File Topology, 2. Structural Layer Dependencies (Target Architecture), 3. High-Impact & Core System Modules, Dependency Graph & File Relationships: `mpscexam`

### Community 5 - "Business Purpose"
Cohesion: 0.50
Nodes (4): 1. Problem Domain, 2. Primary Intended Users, 3. Core Anticipated Features, Business Purpose

### Community 6 - "Route Map & Navigation Hierarchy: `mpscexam`"
Cohesion: 0.50
Nodes (3): 1. Client Pages & View Routes, 2. Route Protection & Middleware Flow, Route Map & Navigation Hierarchy: `mpscexam`

### Community 10 - "Tech Stack"
Cohesion: 0.67
Nodes (3): Current Codebase Inventory, Recommended / Standard Production Stack (Subject to User Confirmation), Tech Stack

## Knowledge Gaps
- **48 isolated node(s):** `graphify`, `Core Directives:`, `Workflow: graphify`, `Directives`, `Directives` (+43 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 58 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Business Purpose` connect `Business Purpose` to `memory.md`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `Tech Stack` connect `Tech Stack` to `memory.md`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `graphify`, `Core Directives:`, `Workflow: graphify` to the rest of the system?**
  _48 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `memory.md` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._