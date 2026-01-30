# Lendsqr FE Test

A Next.js dashboard for managing lending users. It includes sign-in, a users list with metrics and table, and detailed user profiles with tabs.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, SCSS modules
- **Data:** Axios, Zustand (optional state)
- **Table:** TanStack React Table
- **Icons:** react-icons, custom SVGs in `public/icons`
- **Tooling:** TypeScript 5, ESLint, Babel React Compiler

---

## Project Structure

```
lendsqr-fe-test/
├── app/
│   ├── (root)/                    # Unauthenticated area
│   │   ├── (home)/
│   │   │   ├── page.tsx           # Home = Sign-in page
│   │   │   └── home.module.scss
│   │   └── layout.tsx             # Redirects to dashboard if user in localStorage
│   ├── (dashboard)/dashboard/    # Authenticated dashboard
│   │   └── [orgId]/
│   │       ├── layout.tsx         # Navbar + Sidebar + content
│   │       ├── (routes)/
│   │       │   └── users/
│   │       │       ├── page.tsx   # Users list (metrics + table)
│   │       │       └── [userId]/
│   │       │           └── page.tsx  # User detail (tabs)
│   │       └── scss/
│   ├── actions/
│   │   └── sign-in.ts             # getUsers() – fetches users from API
│   ├── components/
│   │   ├── Card/                  # Metric cards (Users, Active Users, etc.)
│   │   ├── Dropdown/              # Reusable dropdown (org switch, table actions)
│   │   ├── Loader/                # Loading spinner
│   │   ├── Navbar.tsx/            # Top navbar
│   │   ├── Sidebar/               # Dashboard sidebar + nav + logout
│   │   ├── Signup/                # Sign-in form (email/password)
│   │   ├── Table/                 # User table, columns, status, pagination, filter
│   │   └── Tabs/                  # User detail tabs + General Details sections
│   ├── globals.scss
│   ├── layout.tsx                 # Root layout (metadata, favicon)
│   ├── error.tsx                  # Error boundary UI
│   └── loading.tsx                # Global loading UI (Loader)
├── hooks/
│   ├── useLocalStorage.tsx        # Persist state in localStorage (user, dashboard state)
│   ├── use-dashboard.tsx         # Sidebar open/close + mobile detection
│   ├── useDebounce.tsx           # Debounce a string value
│   └── use-mobile.tsx            # Mobile breakpoint (if used)
├── lib/
│   ├── api-client.ts             # Axios instance, base URL, auth header, 401/403 → redirect
│   ├── assets.ts                 # Icon and image paths (icons.*, images.*)
│   └── data.ts                   # getRoutes(), userMetrics, organizations, tabs, pageSizeOptions
├── helpers/
│   └── index.ts                  # handlePagination, getPaginationRange, formatGeneralDetails
├── types.ts                      # User, PersonalInformation, EducationAndEmployment, etc.
├── users.json                    # Sample/mock user data (optional)
└── public/icons/                 # SVG and image assets
```

---

## Features

### Authentication

- **Sign-in** (`/`): Email + password form. Calls `getUsers()` from `app/actions/sign-in.ts`, matches email/password, stores matched user in `localStorage` under key `"user"`, then redirects to `/dashboard/{user.id}/users`.
- **Route guard:** `(root)/layout.tsx` reads `user` from `useLocalStorage`. If present, redirects to `/dashboard/{user.id}/users`.
- **Logout:** Sidebar “Log out” clears localStorage and redirects to `/`.

### Dashboard

- **Layout:** `[orgId]` is the logged-in user’s `id`. Layout renders `Navbar` and `Sidebar`; sidebar nav and `lib/data.ts` `getRoutes(orgId, pathName)` drive Customer / Business / Settings links (Users, Guarantors, Decision Models, etc.). Only Users list and User detail are implemented.
- **Users list** (`/dashboard/[orgId]/users`):
  - Metric cards (e.g. Users, Active Users, Users with Loans, Users with Savings) from `lib/data.ts` `userMetrics`.
  - `TableComponent` (`app/components/Table/user-table.tsx`) fetches users via `getUsers()`, paginates with `handlePagination(page, 8, data)` and renders `MyTable` (base-table) plus `Pagination`.
  - Table columns: Organization, Username, Email, Phone, Date joined, Status, Actions (dropdown: View Details, Blacklist, Whitelist). “View Details” goes to `/dashboard/[orgId]/users/[userId]` where `[userId]` is **username** (see User detail below).

### User detail

- **Route:** `/dashboard/[orgId]/users/[userId]` — `[userId]` is the **username** (e.g. from dropdown `href`).
- **Page:** Fetches all users again, finds `selectedUser` by `user.username === params.userId`, then renders:
  - Back link to Users list.
  - “User Details” header with Blacklist / Activate buttons.
  - `CustomerTabs` with tabs from `lib/data.ts` (General Details, Documents, Bank Details, Loans, Savings, App and System). General Details uses `formatGeneralDetails(selectedUser)` from `helpers/index.ts` to show Personal Information, Education and Employment, Socials, and Guarantors.

### API and env

- **API client:** `lib/api-client.ts` uses `NEXT_PUBLIC_BASE_URL` and `NEXT_ACCESS_TOKEN`. On 401/403 it clears localStorage and redirects to `/`.
- **getUsers:** `app/actions/sign-in.ts` calls `apiClient.get("/users")` and returns `User[]`. Ensure the backend serves `/users` and that env vars are set (e.g. in `.env.local`).

---

## Data and types

- **User** and related types live in `types.ts`: `User`, `PersonalInformation`, `EducationAndEmployment`, `Socials`, `Guarantor`, etc.
- **Sidebar routes and UI copy** come from `lib/data.ts`: `getRoutes`, `organizations`, `userMetrics`, `tabs`, `pageSizeOptions`.
- **Assets:** `lib/assets.ts` exports `icons` and `images` used across Signup, Sidebar, Table, etc.

---

## Hooks

| Hook | Purpose |
|------|--------|
| `useLocalStorage(key, initialValue)` | Sync state with `localStorage` (get/set/remove/clear). Returns `[value, setValue, removeItem, clearStorage, getKey]`. Used for `"user"` and `"dashboard-state"`. |
| `use-dashboard` | Sidebar state (open/close, mobile). Uses `useLocalStorage("dashboard-state")` and resize listener. |
| `useDebounce(value, delay)` | Returns a debounced string (e.g. for search/filter). |

---

## Getting started

1. **Install**

   ```bash
   npm install
   ```

2. **Environment**

   Create `.env.local` (or set in your host) with:

   - `NEXT_PUBLIC_BASE_URL` – API base URL (e.g. `https://api.example.com`).
   - `NEXT_ACCESS_TOKEN` – Bearer token for `api-client` (if your API requires it).

   If the API is not available, you can point `NEXT_PUBLIC_BASE_URL` at a mock server or adjust `getUsers()` to fall back to local data (e.g. from `users.json`).

3. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You should see the sign-in page. Use an email/password that match one of the users returned by `getUsers()` (e.g. from your backend or mock).

4. **Build**

   ```bash
   npm run build
   npm start
   ```

5. **Lint**

   ```bash
   npm run lint
   ```

---

## Summary

- **Lendsqr FE Test** is a Next.js 16 App Router app for a lending user dashboard: sign-in, users list with metrics and table, and user detail with tabs. Auth is session-like via `localStorage` and the logged-in user’s `id` is used as `[orgId]` in dashboard routes. User detail is identified by **username** in the URL (`[userId]`). The codebase is organized into `app/` (pages, layouts, components, actions), `hooks/`, `lib/`, `helpers/`, and shared `types` and assets.
