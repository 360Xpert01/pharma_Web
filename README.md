# Next.js Enterprise Starter Kit

A production-ready Next.js 15 starter template with advanced dynamic layout system, comprehensive form handling, real-time features, and enterprise-grade architecture. Built with TypeScript, Tailwind CSS 4, and modern React patterns.

## Key Features

- **Dynamic Layout System**: Fully configurable layout engine with multiple variants
- **Advanced Form Builder**: Type-safe forms with 20+ field types and dynamic validation
- **Real-time Dashboard**: Live updates with Socket.IO and WebSocket support
- **Enterprise Authentication**: Complete auth flow with role-based access control
- **Modern UI Components**: 50+ shadcn/ui components with custom theming
- **State Management**: Redux Toolkit with persistence and React Query integration
- **Testing Suite**: Unit, integration, and E2E testing setup
- **Performance Optimized**: Server components, lazy loading, and bundle optimization

## Tech Stack

<p align="left">
  <a href="https://nextjs.org" target="_blank"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js&logoColor=white"></a>
  <a href="https://react.dev" target="_blank"><img alt="React" src="https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB"></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white"></a>
  <a href="https://tailwindcss.com" target="_blank"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-4.1.9-06B6D4?logo=tailwindcss&logoColor=white"></a>
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

## What's New in Dynamic Layout Branch

### Dynamic Layout System
- **Configurable Layouts**: Toggle between landing page and admin shell layouts
- **Responsive Design**: Mobile-first approach with breakpoint-specific configurations
- **Layout Context**: Centralized layout state management with TypeScript support
- **Multiple Variants**: Fixed, drawer, and overlay sidebar variants
- **Real-time Updates**: Layout changes apply instantly without page refresh

### Advanced Form Builder
- **20+ Field Types**: Text, email, password, select, multiselect, date, file upload, rich text, and more
- **Dynamic Validation**: Zod-based schemas with conditional field rendering
- **Nested Forms**: Section-based form organization with repeatable fields
- **Type Safety**: End-to-end TypeScript support from schema to submission
- **Custom Components**: Currency selectors, tag inputs, and dynamic selects

### Real-time Dashboard
- **Live Metrics**: Real-time data updates with Socket.IO integration
- **Interactive Charts**: Recharts-powered visualizations with live data
- **Activity Feeds**: Real-time notifications and activity streams
- **Performance Monitoring**: Built-in error tracking and performance metrics

### Enhanced Authentication
- **Complete Auth Flow**: Login, signup, OTP verification, password reset
- **Role-Based Access**: RBAC system with route protection
- **Session Management**: Persistent auth state with Redux
- **Security Headers**: CSP and security middleware integration

## Core Architecture

### Dynamic Layout Engine
- **Layout Context**: Centralized configuration for header, sidebar, footer, and content areas
- **Responsive Breakpoints**: Mobile-first design with customizable breakpoints
- **Variant System**: Multiple layout variants (fixed, drawer, overlay) with smooth transitions
- **State Persistence**: Layout preferences saved in localStorage with Redux integration

### Advanced Form System
- **BaseForm Component**: Universal form component with automatic validation
- **Field Registry**: 20+ pre-built field components with consistent API
- **Schema-Driven**: Zod validation schemas with TypeScript inference
- **Conditional Logic**: Dynamic field visibility based on form state
- **Nested Structures**: Support for sections and repeatable field groups

### State Management Architecture
- **Redux Toolkit**: Centralized state with slices for UI, Auth, and App data
- **Redux Persist**: Automatic state persistence with selective hydration
- **React Query**: Server state management with caching and synchronization
- **Context Providers**: Layout and error contexts for component communication

### Real-time Infrastructure
- **Socket.IO Integration**: Bidirectional real-time communication
- **WebSocket Support**: Native WebSocket implementation for high-frequency updates
- **Event Management**: Typed event handlers with automatic cleanup
- **Connection Management**: Automatic reconnection and error recovery

### API & Networking
- **Axios Client**: Pre-configured HTTP client with interceptors
- **Request/Response Middleware**: Authentication, error handling, and logging
- **Type-Safe Endpoints**: Generated TypeScript interfaces for API responses
- **Error Normalization**: Consistent error handling across the application

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── globals.css              # Tailwind v4 theme tokens + animations
│   ├── page.tsx                 # Landing page
│   ├── not-found.tsx            # Custom 404 page
│   ├── global-error.tsx         # Global error boundary
│   ├── dashboard/               # Admin dashboard section
│   │   ├── layout.tsx           # Dynamic layout wrapper
│   │   ├── page.tsx             # Main dashboard with real-time features
│   │   └── components/          # Dashboard-specific components
│   │       ├── metrics-cards.tsx
│   │       ├── interactive-charts.tsx
│   │       ├── data-lists.tsx
│   │       └── real-time-provider.tsx
│   └── auth/                    # Authentication pages
│       ├── layout.tsx           # 50/50 split auth layout
│       ├── login/page.tsx       # Login form with validation
│       ├── signup/page.tsx      # Registration form
│       ├── otp/page.tsx         # OTP verification
│       ├── forgot/page.tsx      # Password reset request
│       └── reset/page.tsx       # Password reset form
├── components/                   # Reusable components
│   ├── form/                    # Advanced form system
│   │   ├── base-form.tsx        # Universal form component
│   │   ├── base-field.tsx       # Base field wrapper
│   │   ├── form-wrapper.tsx     # Form section wrapper
│   │   └── fields/              # Field type implementations
│   │       ├── input.tsx        # Text input with password toggle
│   │       ├── select.tsx       # Dropdown select
│   │       ├── multi-select.tsx # Multi-selection dropdown
│   │       ├── checkbox.tsx     # Checkbox input
│   │       ├── date-input.tsx   # Date picker
│   │       ├── file-upload.tsx  # File upload handler
│   │       ├── tag-input.tsx    # Tag management
│   │       ├── dynamic-select.tsx # API-driven select
│   │       └── repeatable-field.tsx # Dynamic field groups
│   ├── layout/                  # Layout components
│   │   ├── dynamic-layout.tsx   # Main layout engine
│   │   ├── header.tsx           # Responsive header
│   │   ├── sidebar.tsx          # Collapsible sidebar
│   │   ├── footer.tsx           # Footer component
│   │   ├── mobile-menu.tsx      # Mobile navigation
│   │   ├── theme-toggle.tsx     # Theme switcher
│   │   └── user-profile.tsx     # User menu dropdown
│   ├── shared/                  # Shared utility components
│   │   ├── error-boundary.tsx   # React error boundary
│   │   ├── loader-overlay.tsx   # Loading states
│   │   ├── data-table.tsx       # Advanced data table
│   │   ├── pagination-section.tsx # Table pagination
│   │   ├── breadcrumbs.tsx      # Navigation breadcrumbs
│   │   └── page-head.tsx        # SEO meta tags
│   ├── providers/               # Context providers
│   │   ├── providers.tsx        # Root provider composition
│   │   └── theme-provider.tsx   # Theme context
│   └── ui/                      # shadcn/ui components (50+ components)
│       ├── form.tsx             # Form primitives
│       ├── button.tsx           # Button variants
│       ├── input.tsx            # Input styles
│       ├── dialog.tsx           # Modal dialogs
│       ├── table.tsx            # Table components
│       └── ...                  # Additional UI primitives
├── contexts/                    # React contexts
│   ├── layout-context.tsx       # Dynamic layout state
│   └── error-context.tsx        # Global error handling
├── hooks/                       # Custom React hooks
│   ├── use-base-form.tsx        # Form management hook
│   ├── use-loading-state.tsx    # Loading state management
│   ├── use-mobile-detection.ts  # Mobile breakpoint detection
│   └── use-sidebar.tsx          # Sidebar state management
├── lib/                         # Utility libraries
│   ├── api/                     # API configuration
│   ├── actions/                 # Server and client actions
│   │   └── actions.ts           # Utility functions
│   ├── utils.ts                 # Common utilities (cn, formatters)
│   ├── logger.ts                # Structured logging
│   ├── icons.ts                 # Icon components
│   └── error-factory.ts         # Error handling utilities
├── navigation/                  # Navigation configuration
│   ├── config.ts                # Navigation structure
│   ├── links.ts                 # Link definitions
│   └── rbac.ts                  # Role-based access control
├── socket/                      # Real-time communication
│   ├── index.ts                 # Socket.IO client
│   ├── websocket.ts             # WebSocket implementation
│   └── config.ts                # Socket configuration
├── store/                       # Redux state management
│   ├── index.ts                 # Store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   └── slices/                  # Redux slices
├── types/                       # TypeScript definitions
│   ├── index.ts                 # Type exports
│   ├── api.ts                   # API response types
│   ├── form.ts                  # Form field types
│   ├── layout.ts                # Layout configuration types
│   └── user.ts                  # User/auth types
├── constants/                   # Application constants
│   ├── dashboard.ts             # Dashboard configuration
│   ├── keys.ts                  # Storage keys
│   └── loading.ts               # Loading states
├── utils/                       # Utility functions
│   ├── safe-json-parse.ts       # Safe JSON parsing
│   ├── storage.ts               # LocalStorage utilities
│   ├── sleep.ts                 # Async utilities
│   └── try-catch.ts             # Error handling
├── __tests__/                   # Test suites
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── e2e/                     # End-to-end tests
├── public/                      # Static assets
└── Configuration files          # Config files (Next.js, TypeScript, etc.)
```

## Quick Start

### Prerequisites
- Node.js 18+ and pnpm (recommended) or npm
- Git for version control


## Theming & UI

### Theme System
- **next-themes** integration with system preference detection
- **3 Built-in Themes**: Light, Dark, and Ocean (custom palette)
- **CSS Variables**: Tailwind v4 CSS variables for consistent theming
- **Theme Toggle**: Accessible theme switcher in header/sidebar
- **Semantic Tokens**: All components use design tokens (bg-background, text-foreground, etc.)

### UI Component Library (50+ Components)

Built on **shadcn/ui** and **Radix UI** primitives for accessibility and customization:

#### Layout & Navigation
- `accordion`, `breadcrumb`, `navigation-menu`, `menubar`, `tabs`
- `sheet`, `drawer`, `collapsible`, `resizable`

#### Forms & Inputs
- `form`, `input`, `textarea`, `select`, `checkbox`, `radio-group`
- `input-otp`, `switch`, `toggle`, `toggle-group`, `slider`
- `calendar`, `date-picker`, `command` (combobox)

#### Feedback & Overlays
- `alert`, `alert-dialog`, `dialog`, `popover`, `tooltip`
- `toast`/`toaster` (Sonner), `progress`, `skeleton`
- `hover-card`, `context-menu`

#### Data Display
- `table`, `card`, `avatar`, `badge`, `separator`
- `carousel`, `scroll-area`, `aspect-ratio`

#### Interactive
- `button` (5 variants), `dropdown-menu`, `pagination`
- Custom components: `data-table`, `file-upload`, `color-picker`

### Styling Architecture
- **Tailwind CSS 4**: Latest version with improved performance
- **CSS-in-JS**: No runtime CSS generation, all static
- **Design System**: Consistent spacing, typography, and color scales
- **Responsive**: Mobile-first approach with breakpoint utilities
- **Animations**: Tailwind animations with custom keyframes

##  Advanced Features

### Dynamic Layout System

The layout system provides complete control over application structure:

```typescript
// Layout configuration example
const layoutConfig: LayoutConfig = {
  header: {
    enabled: true,
    fixed: false,
    height: 'md',
    showLogo: true,
    showNavigation: true,
    showUserMenu: true,
    collapsible: true,
  },
  sidebar: {
    enabled: true,
    position: 'left',
    variant: 'fixed', // 'drawer' | 'overlay'
    width: 'md', // 'sm' | 'lg' | 'xl'
    collapsible: true,
    defaultCollapsed: false,
    showOnMobile: false,
  },
  // ... more configuration
};
```

**Key Features:**
- **Responsive Breakpoints**: Different configurations for mobile/desktop
- **Multiple Variants**: Fixed sidebar, drawer, or overlay modes
- **State Persistence**: Layout preferences saved automatically
- **Smooth Transitions**: CSS transitions for all layout changes
- **Mobile Optimization**: Touch-friendly mobile navigation

### Advanced Form Builder

**Supported Field Types:**
- **Basic**: text, email, password, number, textarea
- **Selection**: select, multiselect, radio, checkbox, toggle
- **Advanced**: date, file, color, range, tags
- **Dynamic**: dynamicselect (API-driven), repeatable fields
- **Rich**: rich text editor, currency selector


### Testing Suite

**Complete testing setup:**
- **Unit Tests**: Jest + Testing Library for components
- **Integration Tests**: API integration testing
- **E2E Tests**: Authentication and critical user flows
- **Coverage**: Comprehensive coverage reporting

### Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Focus Management**: Proper focus handling in modals and dropdowns
- **Color Contrast**: WCAG AA compliant color schemes
- **Responsive Text**: Scalable text sizes for better readability

### Browser Support

- **Modern Browsers**: Chrome 91+, Firefox 90+, Safari 14+, Edge 91+
- **Mobile**: iOS Safari 14+, Chrome Android 91+
- **Progressive Enhancement**: Graceful degradation for older browsers

## Additional Resources

### Component Documentation
Each component includes TypeScript interfaces and JSDoc comments for better developer experience.

### Deployment Guide
- **Vercel**: Zero-config deployment (recommended)
- **Docker**: Dockerfile included for containerization
- **Self-hosted**: Compatible with any Node.js hosting platform

