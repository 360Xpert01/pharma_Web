# Next Tailwind TS Boiler Plate

A production-minded Next.js App Router starter focused on performance, accessibility, and DX. It includes theming, state management, form validation, a typed API client with interceptors, real-time sockets, structured logging, dynamic layouts (landing vs admin shell), an auth 50/50 layout, and a curated UI kit.

## Tech Stack

<p align="left">
  <a href="https://nextjs.org" target="_blank"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white"></a>
  <a href="https://react.dev" target="_blank"><img alt="React" src="https://img.shields.io/badge/React-18/19-20232A?logo=react&logoColor=61DAFB"></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white"></a>
  <a href="https://tailwindcss.com" target="_blank"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white"></a>
  <a href="https://ui.shadcn.com" target="_blank"><img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-Components-000000"></a>
  <a href="https://www.radix-ui.com/" target="_blank"><img alt="Radix UI" src="https://img.shields.io/badge/Radix%20UI-Primitives-161618?logo=radixui&logoColor=white"></a>
  <a href="https://redux-toolkit.js.org/" target="_blank"><img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux%20Toolkit-Store-764ABC?logo=redux&logoColor=white"></a>
  <a href="https://tanstack.com/query/latest" target="_blank"><img alt="React Query" src="https://img.shields.io/badge/TanStack%20Query-React-FF4154?logo=reactquery&logoColor=white"></a>
  <a href="https://zod.dev" target="_blank"><img alt="Zod" src="https://img.shields.io/badge/Zod-Validation-3E67B1"></a>
  <a href="https://react-hook-form.com" target="_blank"><img alt="React Hook Form" src="https://img.shields.io/badge/React%20Hook%20Form-Forms-EC5990?logo=reacthookform&logoColor=white"></a>
  <a href="https://axios-http.com" target="_blank"><img alt="Axios" src="https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?logo=axios&logoColor=white"></a>
  <a href="https://socket.io" target="_blank"><img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socketdotio&logoColor=white"></a>
  <a href="https://sonner.emilkowal.ski" target="_blank"><img alt="Sonner" src="https://img.shields.io/badge/Sonner-Toasts-000000"></a>
</p>

## Features

- Theming: next-themes with light, dark, and ocean palettes
- State: Redux Toolkit + redux-persist (UI + Auth slices), TanStack React Query
- Forms: React Hook Form + Zod resolvers with typed schemas
- API: Axios client with request/response interceptors and typed helpers
- Realtime: Socket.IO client and WebSocket singleton
- Logging: Structured app logger helper
- Layouts: Landing layout and Admin shell (Header/Sidebar/Content) via LayoutContext
- Auth: Dedicated 50/50 split layout and sample pages (login/signup/otp/forgot/reset)
- UI Kit: shadcn/ui components (cards, forms, dialogs, tables, nav, etc.)
- Navigation & RBAC: central link registry and role-aware helpers
- Accessibility: semantic HTML, keyboard-friendly primitives, toasts, ARIA-friendly components

## Architecture

- Providers: wraps Theme, Redux + Persist, React Query, and Toaster
- Axios Client: centralizes baseURL, headers, auth token, error normalization
- Sockets: lazily initialized singletons for Socket.IO and native WebSocket
- Logger: normalized logging utility
- RBAC: role-based guards and navigational filtering
- LayoutContext: toggles landing vs admin shell (header/sidebar)

## Project Structure

Condensed file map of the most relevant pieces.

```
├─ app/
│  ├─ layout.tsx                # Root layout wiring Providers and theming
│  ├─ globals.css               # Tailwind v4 theme tokens + base styles
│  ├─ page.tsx                  # Landing page
│  ├─ dashboard/
│  │  ├─ layout.tsx             # Admin shell (Header/Sidebar)
│  │  └─ page.tsx               # Protected dashboard sample
│  └─ auth/
│     ├─ layout.tsx             # 50/50 split auth layout
│     ├─ login/page.tsx
│     ├─ signup/page.tsx
│     ├─ otp/page.tsx
│     ├─ forgot/page.tsx
│     └─ reset/page.tsx
├─ components/
│  ├─ layout/{header,sidebar,footer,theme-toggle}.tsx
│  ├─ common/{button,input}.tsx
│  ├─ ui/*                      # shadcn/ui primitives (form, dialog, table, etc.)
│  ├─ providers.tsx             # Theme + Redux/Persist + Query + Toaster
│  └─ theme-provider.tsx
├─ contexts/layout-context.tsx  # Landing/Admin layout mode
├─ navigation/{links.ts,rbac.ts}
├─ store/
│  ├─ index.ts                  # configureStore + persist
│  ├─ hooks.ts                  # typed hooks
│  └─ slices/{auth-slice,ui-slice}.ts
├─ lib/
│  ├─ api/client.ts             # axios instance + interceptors
│  ├─ socket.ts                 # socket.io client singleton
│  ├─ ws.ts                     # WebSocket singleton
│  ├─ logger.ts                 # logger helper
│  └─ utils.ts                  # cn(), formatting, helpers
├─ types/{index.ts,api.ts,user.ts}
├─ lib/actions/actions.ts                    # Consolidated utility functions
├─ constants/keys.ts
├─ public/placeholder-logo.{svg,png}
├─ styles/globals.css
├─ package.json
├─ tsconfig.json
└─ next.config.mjs

```

## Environment Variables

The following environment variables need to be configured for the application to work properly:

- `NEXT_PUBLIC_API_BASE_URL` - Base URL for your API endpoints (client-side)
- `API_BASE_URL` - Base URL for server-side API calls (Route Handlers/Server Actions)
- `NEXT_PUBLIC_SOCKET_URL` - Socket.IO server URL for real-time features
- `NEXT_PUBLIC_WS_URL` - WebSocket server URL for WebSocket connections

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser, while others are only available on the server side.

## Theming

- Implemented with next-themes
- Modes: light, dark, ocean (custom token set via Tailwind v4 CSS variables)
- Toggle: components/layout/theme-toggle.tsx
- All components use semantic tokens (bg-background, text-foreground, etc.)

## UI Components (shadcn/ui)

Included highlights: accordion, alert, alert-dialog, avatar, badge, breadcrumb, button, calendar, card, carousel, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, skeleton, slider, sonner, switch, table, tabs, textarea, toast/toaster, toggle, toggle-group, tooltip.

## File-by-File Highlights

- app/layout.tsx: root HTML, theme class, global Providers
- components/providers.tsx: ThemeProvider, Redux + PersistGate, React Query, Toaster
- lib/api/client.ts: axios setup and interceptors
- contexts/layout-context.tsx: toggle landing vs admin shell
- app/dashboard/layout.tsx: shell composition with Header/Sidebar
- app/auth/\*: auth layout and example forms
- store/\*: redux toolkit store configuration and slices

## State Management

- Redux Toolkit slices:
  - ui-slice: sidebar open, layout mode, etc.
  - auth-slice: session/user snapshot suitable for client-side use
- redux-persist to persist minimal UI/auth state in localStorage
- Typed hooks: store/hooks.ts (useAppDispatch/useAppSelector)

## Data Fetching

- TanStack React Query for server cache, retries, and deduplication
- Prefer React Server Components for initial data where possible; use SWR/Query in clients when interactivity or sync is needed
- No fetching inside useEffect; use query hooks or RSC

## Forms & Validation

- React Hook Form with Zod resolvers for type-safe validation
- Example auth forms: login/signup/otp/forgot/reset
- Shared UI via components/ui/form.tsx and shadcn/ui inputs

## API Client

- lib/api/client.ts wraps axios with:
  - Base URL: from env
  - Request interceptors: attach auth token if available
  - Response interceptors: normalize errors, handle 401/403, toast feedback
- Example use:
  ```ts
  import { api } from "@/lib/api/client";
  const { data } = await api.get("/me");
  ```

Environment variables:

- NEXT_PUBLIC_API_BASE_URL (client)
- API_BASE_URL (server; for Route Handlers/Server Actions if used)

## Realtime

- Socket.IO (lib/socket.ts) and native WebSocket (lib/ws.ts) as lazy singletons
- Reuse a single live connection per tab, clean up listeners on unmount
- Provide typed event helpers for consistent usage

## Logger

- lib/logger.ts provides a small structured logger (info/warn/error) with levels and prefixes
- Replaceable with your preferred logging library

## Navigation & RBAC

- navigation/links.ts: central link registry with metadata (title, icon, role guard)
- navigation/rbac.ts: helpers for role checks and filtered menus
- Sidebar/Header consume filtered links to show role-appropriate navigation

## Layouts

- Landing layout: minimal header, marketing-friendly page sections
- Admin shell: Header + Sidebar + Content with responsive behavior and keyboard navigation
- Auth layout: 50/50 split with an image on the side and centered form content

## Accessibility & Performance

- Semantic HTML and ARIA attributes via Radix UI primitives and shadcn/ui patterns
- Keyboard navigable menus/dialogs/tooltips
- Image alt text and sr-only labels where needed
- Avoid heavy client bundles; favor RSC and selective client components
