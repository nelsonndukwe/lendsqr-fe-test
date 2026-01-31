# Lendsqr Front-End Test — Implementation Documentation

**Purpose:** This document describes what was built, the reasoning behind the approach, and decisions that shaped the final outcome. It is written in a format suitable for pasting into Google Docs, Notion, or similar tools.

---

## 1. Project Overview

**Lendsqr FE Test** is a Next.js 16 (App Router) web application that implements a **lending user dashboard**. It provides:

- A **sign-in flow** (email/password) that validates against users returned from an API
- A **dashboard** with a top navbar, collapsible sidebar, and main content area
- A **users list** page with metric cards, a filterable/sortable table, and pagination
- A **user detail** page with tabbed sections (General Details, Documents, Bank Details, Loans, Savings, App and System)

The app is built with **React 19**, **TypeScript 5**, **SCSS modules**, **Axios** for API calls, and optional **Zustand** for state. Table logic uses **TanStack React Table** where applicable.

---

## 2. What Was Built (Features)

### 2.1 Authentication

- **Sign-in page (home):** Email and password form. On submit, the app fetches all users via `getUsers()` (API), finds a user whose email and password match, stores that user in `localStorage` under the key `"user"`, then redirects to `/dashboard/{user.id}/users`.
- **Route guard:** The root layout for unauthenticated routes reads `user` from `localStorage` (via `useLocalStorage`). If a user exists, it redirects to the dashboard so logged-in users cannot see the sign-in page.
- **Logout:** The sidebar “Log out” action clears `localStorage` and redirects to `/`.

**Reason for approach:** The requirement was to support a simple login that works with an existing users API. Storing the matched user in `localStorage` and using it as the “session” keeps implementation straightforward and avoids a separate auth API. The same `user` object is used to derive `[orgId]` in dashboard URLs.

### 2.2 Dashboard Layout

- **Structure:** Dashboard routes live under `/dashboard/[orgId]/...`. `[orgId]` is the **logged-in user’s `id`** (from `localStorage`), so the URL reflects “this user’s dashboard.”
- **Layout components:** The dashboard layout renders:
  - **Navbar** at the top
  - **Sidebar** (collapsible on desktop, overlay on mobile)
  - **MobileToggle** — a floating button on small screens to open/close the sidebar
  - Main content area (`children`) with consistent padding and background

**Reason for approach:** Using the same user’s `id` as `orgId` keeps routing simple and aligns with “one user, one org” for this test. The layout is built so the sidebar can be collapsed (desktop) or toggled (mobile) without losing navigation or logout.

### 2.3 Sidebar and Navigation

- **Sidebar state:** A custom hook `useDashboardState` (in `use-dashboard.tsx`) holds:
  - `open` — desktop sidebar expanded/collapsed
  - `openMobile` — mobile sidebar visible/hidden
  - `isMobile` — whether the viewport is at or below 768px
- **Persistence:** This state is stored in `localStorage` under `"dashboard-state"` via `useLocalStorage`, so the user’s sidebar preference survives refresh.
- **Navigation:** Sidebar links are driven by `getRoutes(orgId, pathName)` from `lib/data.ts`, which returns grouped routes (Customer, Business, Settings, etc.) with active state based on `pathName`. Only the **Users** list and **User detail** pages are implemented; other items are present in the nav for structure.
- **Organization switcher:** A dropdown at the top of the sidebar allows “Switch organization” (options from `lib/data.ts`). Selecting an option navigates to the corresponding route (e.g. another org’s dashboard) as defined in the data layer.

**Reason for approach:** Centralizing sidebar state in a hook and persisting it improves UX (e.g. keeping sidebar collapsed on refresh). Using a data-driven route list (`getRoutes`) keeps the sidebar easy to extend and keeps active state in sync with the URL.

### 2.4 Users List Page

- **Route:** `/dashboard/[orgId]/users`
- **Metric cards:** Display high-level counts (e.g. Users, Active Users, Users with Loans, Users with Savings). Data for labels and asset paths comes from `lib/data.ts` (`userMetrics`).
- **Table:**
  - Fetches users on mount via `getUsers()` and displays: Organization, Username, Email, Phone, Date joined, Status, Actions.
  - **Pagination:** Client-side pagination with a page size of 8. Helpers `handlePagination` and `getPaginationRange` (in `helpers/index.ts`) handle slicing and page number/ellipsis display.
  - **Filtering:** A filter UI (organization, username, email, date, phone, status) is available. Applying filters runs `filterUsers(users, filters)` and updates the table; pagination applies to the filtered list.
- **Actions column:** Each row has a dropdown with “View Details,” “Blacklist user,” “Whitelist user.” “View Details” navigates to `/dashboard/[orgId]/users/[userId]`, where `[userId]` is the **username** (see below).

**Reason for approach:** Client-side pagination and filtering were chosen for simplicity and because the API returns all users at once. The table is implemented with a base table component plus columns, filter, and pagination so that filtering and pagination logic stay reusable and testable.

### 2.5 User Detail Page

- **Route:** `/dashboard/[orgId]/users/[userId]`
- **Important decision:** `[userId]` in the URL is the user’s **username**, not their numeric/id field. This was chosen so that the URL is human-readable and stable (e.g. `/dashboard/abc/users/johndoe`).
- **Data loading:** The page fetches all users again via `getUsers()`, then finds the **selected user** by `user.username === params.userId`. That user is passed into the detail/tabs component.
- **UI:** Back link to the users list, “User Details” header with Blacklist/Activate actions, and **tabs** (General Details, Documents, Bank Details, Loans, Savings, App and System). Only **General Details** is fully implemented: it uses `formatGeneralDetails(selectedUser)` from `helpers/index.ts` to build sections for Personal Information, Education and Employment, Socials, and Guarantors.

**Reason for approach:** Using `username` as the route param keeps URLs readable and avoids exposing internal IDs. Re-fetching users on the detail page keeps the implementation simple and avoids passing full user objects through navigation state; for a larger app, this could be replaced by a single-user API or cache.

### 2.6 API and Environment

- **API client:** `lib/api-client.ts` creates an Axios instance with `NEXT_PUBLIC_BASE_URL` and attaches `Authorization: Bearer {NEXT_ACCESS_TOKEN}`. Response interceptors: on 401 or 403, the app clears `localStorage` and redirects to `/` so that expired or invalid tokens result in logout.
- **getUsers:** Implemented in `app/actions/sign-in.ts` as `apiClient.get("/users")` returning `User[]`. The app expects the backend to expose a `/users` endpoint and env vars to be set (e.g. in `.env.local`).

**Reason for approach:** A single Axios instance with interceptors keeps auth and error handling in one place. Centralizing the “session” in `localStorage` and clearing it on 401/403 ensures the user is sent back to sign-in when the token is no longer valid.

---

## 3. Technical Approach and Reasons

### 3.1 Next.js App Router and Route Groups

- **App Router:** The project uses the Next.js 16 App Router. Routes are organized with **route groups**: `(root)` for unauthenticated (e.g. home/sign-in) and `(dashboard)` for authenticated dashboard. This keeps URL paths clean (`/`, `/dashboard/[orgId]/users`) while separating layouts and behaviour.
- **Layouts:** Root layout wraps the whole app (metadata, fonts, global styles). The `(root)` layout adds the redirect-if-logged-in behaviour. The dashboard layout adds Navbar, Sidebar, MobileToggle, and content wrapper.

**Reason:** Route groups allow different layouts and client logic (e.g. auth check) per section without changing the public URL structure.

### 3.2 State and Persistence

- **useLocalStorage:** A custom hook syncs React state with `localStorage` (get, set, remove, clear). It is used for:
  - `"user"` — the logged-in user (drives redirect and `orgId`).
  - `"dashboard-state"` — sidebar open/closed and mobile flag (persisted across reloads).
- **No global auth store:** Auth is not stored in Zustand or Context; it is derived from `localStorage` in the root layout and in components that need it. This was chosen to keep the flow simple and to avoid syncing server and client state for this test.

**Reason:** `localStorage` gives a simple “session” that survives refresh and is easy to clear on logout or 401/403.

### 3.3 Styling (SCSS Modules)

- **SCSS modules** are used for component and layout styles (e.g. `layout.module.scss`, `table.module.scss`, `sidebar.module.scss`). Global variables and base styles live in `globals.scss`.
- **Breakpoint:** 768px is used as the mobile breakpoint for the sidebar (e.g. in `use-dashboard.tsx` and in media queries). Below that, the sidebar is shown as an overlay and the floating toggle button is visible.

**Reason:** SCSS modules keep styles scoped and avoid class-name clashes while allowing shared variables and mixins where needed.

### 3.4 Reusable Building Blocks

- **Dropdown:** A generic dropdown component is used for the organization switcher and for table row actions (View Details, Blacklist, Whitelist). It accepts options, value, onChange, trigger element, and custom option renderer.
- **Status:** A small component renders status pills (Active, Inactive, Pending, Blacklisted) with consistent styling.
- **Card:** Used for metric cards on the users page (label, count, optional image).
- **Loader:** Shown in the table while users are loading.

**Reason:** Reusing these components keeps the UI consistent and reduces duplication.

### 3.5 Data and Types

- **types.ts:** Defines `User` and nested types (`PersonalInformation`, `EducationAndEmployment`, `Socials`, `Guarantor`, etc.) used across the app and aligned with the API/mock data.
- **lib/data.ts:** Holds configuration and static data: `getRoutes(orgId, pathName)`, `userMetrics`, `organizations`, `tabs`, `status`, `pageSizeOptions`. This keeps copy and structure in one place and out of components.

**Reason:** Centralizing types and config makes it easier to adapt to API changes and to add new routes or metrics.

### 3.6 Helpers and Filtering

- **helpers/index.ts** includes:
  - `handlePagination(page, limit, users)` — returns the slice of users for the current page.
  - `getPaginationRange(currentPage, totalPages, ...)` — returns an array of page numbers and ellipsis for the pagination UI.
  - `formatGeneralDetails(user)` — maps a `User` to the structure expected by the General Details tab (sections and label/value items).
  - `filterUsers(users, filters)` — filters by organization, username, email, phone, date, status.
- **Filter behaviour:** Filters are applied in memory; the table and pagination then operate on the filtered list.

**Reason:** Pure helpers are easy to unit test and keep components focused on rendering and event handling. One known issue: in `filterUsers`, the username filter logic is inverted (it excludes when it should include); this would be corrected in a follow-up so “username” filters as expected.

---

## 4. Decisions That Influenced the Outcome

| Decision | Effect |
|----------|--------|
| **Use logged-in user’s `id` as `[orgId]`** | Dashboard URLs are tied to the current user; no separate “organization” entity in this test. Simplifies routing and layout. |
| **Use `username` as `[userId]` in user detail URL** | Human-readable URLs; detail page resolves user by matching `user.username === params.userId` after fetching users. |
| **Store “session” in `localStorage`** | No backend session or JWT refresh; 401/403 trigger clear + redirect. Adequate for a front-end test; production would typically use proper auth/session. |
| **Persist sidebar state in `localStorage`** | Sidebar open/closed (and mobile flag) survive refresh, improving UX. |
| **Client-side pagination and filtering** | All users are fetched once; pagination and filters are applied in the browser. Fits current API; would be revisited for very large lists. |
| **Single `getUsers()` fetch for both list and detail** | Detail page re-fetches all users and finds by username. Simple and consistent; can be replaced later by a user-by-id or by-id API. |
| **Mobile breakpoint at 768px** | Sidebar becomes overlay; floating toggle appears. Aligns with common “tablet vs desktop” breakpoint. |
| **Centralized API client with interceptors** | All requests use the same base URL and token; 401/403 handling and logout are in one place. |

---

## 5. Testing

- **Jest** and **React Testing Library** are used for unit tests.
- **Covered areas:**
  - **Helpers:** `handlePagination`, `getPaginationRange`, `formatGeneralDetails` (including edge cases and invalid input).
  - **Hooks:** `useDebounce`, `useLocalStorage` (get/set/remove/clear, initial value, invalid JSON).
  - **Actions:** `getUsers` (success, empty response, network error, 401/403).
  - **Components:** Status (all variants), Card (label, count, formatting), DetailsSection (sections and items).
- **Config:** `jest.config.mjs` uses `next/jest`; `jest.setup.mjs` adds `@testing-library/jest-dom`.

**Reason:** Testing helpers and hooks gives confidence in pagination, formatting, and persistence; testing the API action and key UI components ensures critical paths behave as expected.

---

## 6. Summary

The Lendsqr FE Test delivers a complete dashboard flow: sign-in, guarded routes, a responsive layout with navbar and sidebar, a users list with metrics, filtering, and pagination, and a user detail page with tabbed content (General Details implemented). The approach prioritizes clarity and maintainability: route groups for auth vs dashboard, `localStorage` for session and sidebar state, a shared API client with interceptors, and reusable UI and helpers. Key design choices—using the logged-in user’s `id` as `orgId`, using `username` for the user detail URL, and client-side pagination/filtering—directly shape the current behaviour and can be revisited when scaling to a production API and auth system.

---

*This document can be copied in full into Google Docs, Notion, or similar tools. Formatting (headings, lists, tables) should be preserved when pasted.*
