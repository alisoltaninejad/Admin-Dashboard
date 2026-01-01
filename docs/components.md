# Components Guide

This document describes the purpose and responsibility of key components.

Only core and non-obvious components are documented here.
Small, purely visual components are intentionally omitted.

---

## Layout Components

### Navbar

Location: `src/components/Navbar`

Responsibility:
Top-level navigation and user interaction area.

Internal Structure:

- `Navbar.jsx`: Main wrapper and layout
- `SearchBox.jsx`: Handles search input UI
- `ProfileMenu.jsx`: User profile dropdown
- `UserMenuItem.jsx`: Reusable menu item
- `ControlButtons.jsx`: Action buttons (notifications, settings, etc.)

Reasoning:
Split into smaller components to improve readability
and isolate UI concerns.

---

### Sidebar

Location: `src/components/Sidebar`

Responsibility:
Primary side navigation for dashboard sections.

Internal Structure:

- `Sidebar.jsx`: Main container
- `SidebarHeader.jsx`: Logo and header area
- `MainMenuItem.jsx`: Top-level navigation items
- `SubMenuItem.jsx`: Nested navigation items
- `menuData.jsx`: Navigation configuration data

Reasoning:
Data-driven sidebar structure allows easier updates
to navigation without modifying UI components.

---

## Domain Components

### LatestUsers

Location: `src/components/LatestUsers`

Responsibility:

- Fetch user data via `userServices`
- Sort and display the most recent users
- Handle loading and error states
- Manage modal state for viewing user details

Reasoning:
Designed as a self-contained component to simplify page composition
and avoid unnecessary abstraction in a practice project.

---

### LatestTransactions

Location: `src/components/LatestTransactions`

Responsibility:

- Display recent transaction data
- Handle related UI states

Reasoning:
Keeps transaction-related logic isolated from layout components.

---

## UI Components

### Modal

Location: `src/components/Modal`

Responsibility:

- Generic modal container
- Handles open/close behavior
- Renders dynamic content

Reasoning:
Prevents duplication of modal logic across components.

---

### Icons

Location: `src/components/Icons`

Responsibility:

- Centralized icon rendering
- Abstracts icon implementation details

Reasoning:
Ensures consistent icon usage and easier replacement.

---

## Utility Components

### Utilities

Location: `src/components/Utilities`

Responsibility:

- Shared helper UI components or small utilities

Reasoning:
Avoids duplication of common UI patterns.

---

## Notes

If a component:

- Contains non-obvious logic
- Handles both data and UI
- Or requires design explanation

It should be documented here.

Components with clear, self-explanatory responsibilities
are intentionally left undocumented.
