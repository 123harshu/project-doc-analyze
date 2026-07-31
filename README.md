# Project Document Analyzer & Action Review Tool

A full-stack, AI-driven application designed to ingest project documents (meeting notes, requirements drafts, implementation notes, decision records), extract structured insights, detect conflicts, align against organizational standards, and facilitate human review.

---

## 🌟 Core Workflow & Completed Scope

1. **Document Ingestion**: Upload up to 3 text-based documents (`.txt`, `.md`, `.json`, `.csv`).
2. **AI Analysis & Extraction**:
   - Classifies document types automatically.
   - Extracts confirmed facts, decisions, assumptions, risks, open questions, and action items with exact source/section references.
   - Identifies overlapping or conflicting statements across documents.
   - Checks content against a predefined organizational knowledge base.
3. **Human Review & Oversight**:
   - Users can correct item classifications (`fact`, `assumption`, `unresolved`).
   - Users can resolve or provide explanations for detected conflicts.
   - Users must explicitly **approve, edit, or reject** proposed action items (the AI strictly never creates or assigns tasks automatically).
4. **Data Persistence & Summary**:
   - Persists all reviewed items, source references, and conflict resolutions into a SQLite database.

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **OpenAI API Key**: (For live extraction)

### Local Quickstart

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/123harshu/project-doc-analyze.git](https://github.com/123harshu/project-doc-analyze.git)
   cd project-doc-analyze