# Project Architecture

## Overview
This is a practice dashboard-style frontend project built with React and Vite.

The architecture is intentionally simple and pragmatic.
Most components are self-contained and handle both logic and UI in order to:
- Reduce complexity
- Avoid premature abstraction
- Make learning and iteration easier

The project uses IndexedDB via Dexie.js to simulate real-world data persistence
without relying on a backend.

---

## Application Entry Flow

index.html  
→ main.jsx  
→ App.jsx  
→ routes.jsx  
→ pages  
→ components

- `main.jsx` bootstraps the React application and mounts it to the DOM.
- `App.jsx` defines the global layout shared across pages.
- `routes.jsx` maps routes to page components.

---

## Folder Structure

### public/
Static assets.

### src/
Main source code.

#### src/pages/
Page-level components mapped directly to routes.

Each folder represents a distinct section of the application, such as:
- Authentication (Login, NewUser)
- User management (Users, EditProfile)
- Content (Blogs, Categories, Products)
- Settings (AccountSetting, SystemSetting, Accessibility)

Pages mainly define layout and page-level composition.
Most business logic is delegated to components.

---

#### src/components/
Reusable and domain-specific components.

Most components:
- Fetch their own data
- Manage local state (loading, error, modal)
- Render UI and handle user interactions

This includes:
- Layout components (Navbar, Sidebar)
- Domain widgets (LatestUsers, LatestTransactions)
- Shared UI elements (Modal, Icons)
- Utility helpers

---

#### src/dbModules/
Local data layer built on top of IndexedDB using Dexie.js.

This folder simulates a backend-like structure and includes:

- `dbConfig`
  Database configuration and schema definition.

- `userModule`
  Seeds and manages fake user data stored in IndexedDB.

- `userServices`
  Acts as a service layer providing operations such as:
  - Create user
  - Fetch users
  - Query user data

This abstraction allows UI components to interact with data
without being coupled to the underlying storage mechanism.

---

#### src/routes.jsx
Centralized route definitions mapping URLs to page components.

---

#### src/App.jsx
Main layout wrapper.
Responsible for rendering persistent UI elements such as:
- Navbar
- Sidebar

---

#### src/main.jsx
Application bootstrap file.
Responsible only for mounting React to the DOM.

---

## Component Philosophy

Components in this project are intentionally self-contained.

Typical responsibilities include:
- Data fetching via service modules
- UI state management (loading, error, modal)
- Rendering and interaction handling

This approach is suitable for a practice project where clarity and learning
are prioritized over strict separation of concerns.

As the project grows, shared logic may be extracted into custom hooks or
more specialized service layers.

---

## Styling

- Global styles are defined in `index.css`
- Component-specific styles are colocated when needed
- Utility-first CSS (e.g. Tailwind) is used for fast UI development

---

## Notes

This architecture prioritizes:
- Readability
- Ease of understanding
- Fast iteration

Refactoring toward a more layered or scalable architecture
is intentionally postponed until it provides real value.
