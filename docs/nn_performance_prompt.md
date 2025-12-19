# Prompt: Generate an Enhanced 7-Page Nigerian Navy Performance Evaluation Report (PER) Web App

You are an expert full-stack engineer and UI/UX specialist. Generate the **complete, production-ready codebase** (front end and back end) for a seven-page interactive digital form that exactly replicates the Nigerian Navy Performance Evaluation Report (PER Form 206 – Officers). Use modern, advanced libraries to deliver a fully functional experience.

## Must-Have Outputs
- Provide all HTML/JS/TSX/CSS (or SCSS) for a multi-page front end plus all server code (API routes, database integration, and real-time persistence). Include package manifests, build scripts, Dockerfiles, and any configuration required to run the project end-to-end.
- Use **TypeScript everywhere**. Favor **Next.js 14 (App Router) with React 18** for the UI, **Tailwind CSS** (with custom navy theme) or CSS Modules/SCSS for styling, **React Hook Form + Zod** for validation, and **Zustand** or **Redux Toolkit** for state management.
- Use **NestJS** (or a Next.js API layer) for the backend, with **Prisma** as ORM and **PostgreSQL** as the primary database. Include migrations and seed data. Add **Socket.IO** or **Supabase Realtime** for live collaboration, plus **Bolt** (or a mock equivalent) hooks where required.
- Include comprehensive inline comments and clear file/module organization.

## Visual and Layout Fidelity (All 7 Pages)
- Recreate the paper form’s **exact layout, spacing, margins, typography, and Nigerian Navy branding** across seven distinct pages. Match table/grid alignments, labels, headings, seals/logos, and official navy-blue color palette (#00205B or close). Keep legible, professional fonts (e.g., Inter or Source Sans) with print-ready spacing.
- Ensure every static element (lines, boxes, labels) from the source PDF appears in the digital version. Use consistent spacing and alignment so printed output matches the paper form.
- Provide print styles so each form page prints to its own page with correct margins.

## Multi-Page Experience
- Structure the UI as **seven pages/steps** with clear Previous/Next buttons, page indicators, sticky header, and automatic scroll-to-top on page change.
- Persist the current page across reloads and resume from the last visited step.

## Interactive Controls (Replace All Static Fields)
- Text inputs for all free-text areas (names, dates, remarks, reasons, etc.).
- Dropdown selects for:
  - Nigerian Navy ranks: Admiral, Vice Admiral, Rear Admiral, Commodore, Captain, Commander, Lieutenant Commander, Lieutenant, Sub-Lieutenant, Midshipman.
  - All 37 Nigerian states plus FCT.
  - Local Government Areas (LGAs) that auto-populate based on the selected state (provide full data for all states).
  - Commands/Autonomous Units: NHQ, ENC, WNC, CNC, NAVTRAC, NAVDOC, HQ LOC, NHL.
  - Units populated dynamically from the selected Command (provide sample per Command).
  - Commission Types: RC, DSSC, SD, DRC.
- Radio buttons and checkboxes exactly where the paper form uses them.

## Signature Capture
- Integrate a canvas-based signature pad with precise alignment and scaling (no offset/skew). Allow color selection (black, blue, green, red).
- Include Clear, Save, and auto-date stamp (local time) on save.
- Provide a **full-screen modal** pop-out for signing on mobile, then sync the saved signature back to the inline field.

## Date/Time Automation
- Auto-populate required date/time fields using JavaScript (local time). Allow manual override where appropriate.

## Validation
- Enforce required fields (including signatures) before submission. Show user-friendly inline errors and page-level summaries.

## Data Persistence and Real-Time Updates
- Auto-save form state to **LocalStorage** on change, including current page, so users can resume.
- Save completed/partial reports to a cloud database (e.g., **Bolt** or a similar real-time DB) with optimistic UI updates. Provide backend endpoints and front-end hooks for CRUD and real-time subscriptions.
- Include server-side validation and schema definitions.

## Collaboration and Sharing
- Generate unique, shareable links encoding form state or referencing saved records. Include **WhatsApp share links** and copy-to-clipboard with prefilled messages.
- Opening a shared link should load the saved data and allow continued editing (respecting access rules you define).

## Security, Auth, and Access Control
- Provide user authentication with JWT or session cookies (e.g., **NextAuth** or NestJS Passport**). Support roles (rater, reporting officer, admin) with row-level authorization for records.
- Sanitize and validate all inputs server-side; apply rate limiting to write endpoints. Use HTTPS-only cookies in production and CSRF mitigation for form posts.

## Design and UX
- Responsive layout that works on desktop, tablet, and mobile. Use navy-blue themed components, clear headings, and adequate padding for touch targets.
- Provide consistent navigation, sticky page header with step indicators, tooltips/help text, and accessible labels/ARIA attributes.

## Architecture and Implementation Guidance
- Recommend state management (e.g., Zustand or Redux Toolkit) and form handling (React Hook Form + Zod) with multi-step wizard support.
- Show data models/types for all entities (form schema, share tokens, signatures, audit timestamps, users, roles, sessions).
- Include services/helpers for:
  - LocalStorage autosave and restore.
  - Bolt (or chosen DB) client with real-time listeners.
  - LGA/state and Command/Unit lookups.
  - Signature pad handling (including mobile modal flow).
  - Sharing link generation and WhatsApp deep links.
  - Authentication, authorization checks, and audit logging.
- Provide API routes/controllers for save, fetch by share token/id, update, delete, and real-time subscription setup.
- Include environment variable examples for DB keys and any cloud services.

## Delivery Format
- Present code with clear file paths (e.g., `frontend/src/app/...`, `backend/src/...`).
- Include installation and run instructions (scripts for dev, build, test, lint, format, and e2e). Provide **Docker Compose** for local DB and full-stack spin-up.
- Add thorough comments explaining critical logic, validation, and integration points.

## Acceptance Criteria
- The generated project can be installed and run locally to produce a seven-page, fully interactive, validated PER form with signature capture, autosave, real-time cloud persistence, sharing links, and authentication/authorization.
- Layout matches the original PDF across all pages when rendered or printed.
- Code is modular, readable, secure, and ready for production deployment.
