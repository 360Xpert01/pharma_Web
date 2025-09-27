# Configurable Layout System

A powerful, flexible layout system for Next.js applications that allows real-time configuration of headers, sidebars, footers, and content areas. Perfect for building websites, dashboards, portals, and any application that needs dynamic layout control.

## 🚀 Features

### Core Features
- **100% Responsive Design** - Mobile-first approach with touch-friendly interactions
- **Real-time Configuration** - See changes instantly as you modify settings
- **localStorage Persistence** - Layout preferences are saved automatically
- **TypeScript Support** - Fully typed for better development experience
- **Configurable Components** - Toggle any layout element on/off

### Layout Components
- **Header**: Fixed/relative positioning, height options, logo/navigation/user menu controls
- **Sidebar**: Left/right positioning, fixed/drawer/overlay variants, collapsible, width options
- **Footer**: Simple/detailed/minimal variants, fixed positioning, mobile visibility
- **Content Area**: Max width options, padding controls, centering
- **Mobile Menu**: Automatic mobile conversion with drawer/dropdown/fullscreen options

### Layout Presets
- **Website** - Public website layout with header and footer
- **Dashboard** - Admin panel with fixed header and sidebar
- **Portal** - User portal with drawer sidebar
- **Blog** - Content-focused layout with centered prose
- **Minimal** - Clean layout with minimal chrome

## 📁 File Structure

```
contexts/
  layout-context.tsx          # Main layout context provider
components/
  layout/
    dynamic-layout.tsx        # Main layout wrapper component
    header.tsx               # Configurable header component
    sidebar.tsx              # Configurable sidebar component
    footer.tsx               # Configurable footer component
    mobile-menu.tsx          # Mobile menu component
hooks/
  use-mobile-detection.ts    # Mobile detection utilities
types/
  layout.ts                 # TypeScript definitions
app/
  dashboard/
    layout-settings/
      page.tsx              # Layout configuration interface
```

## 🛠️ Usage

### 1. Basic Setup

The layout system is already integrated into your app. Just wrap your content:

```tsx
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function MyPage() {
  return (
    <DynamicLayout>
      <h1>Your content here</h1>
    </DynamicLayout>
  );
}
```

### 2. Using Layout Context

```tsx
import { useLayout } from "@/contexts/layout-context";

function MyComponent() {
  const { config, updateConfig, applyPreset } = useLayout();

  // Apply a preset
  const handlePreset = () => {
    applyPreset('dashboard');
  };

  // Update specific config
  const toggleSidebar = () => {
    updateConfig({
      sidebar: {
        ...config.sidebar,
        enabled: !config.sidebar.enabled
      }
    });
  };

  return (
    <div>
      <button onClick={handlePreset}>Apply Dashboard Layout</button>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
  );
}
```

### 3. Layout-specific Configurations

#### Dashboard Layout
```tsx
// app/dashboard/layout.tsx
useEffect(() => {
  applyPreset('dashboard'); // Fixed header + sidebar
}, []);
```

#### Website Layout
```tsx
// app/page.tsx  
useEffect(() => {
  applyPreset('website'); // Header + footer, no sidebar
}, []);
```

## ⚙️ Configuration Options

### Header Configuration
```typescript
header: {
  enabled: boolean;           // Show/hide header
  fixed: boolean;            // Fixed or relative positioning
  height: 'sm' | 'md' | 'lg'; // Height variants (48px, 64px, 80px)
  showLogo: boolean;         // Show logo/brand
  showNavigation: boolean;   // Show navigation menu
  showUserMenu: boolean;     // Show user menu
  collapsible: boolean;      // Allow collapsing
}
```

### Sidebar Configuration
```typescript
sidebar: {
  enabled: boolean;                    // Show/hide sidebar
  position: 'left' | 'right';         // Side positioning
  variant: 'fixed' | 'drawer' | 'overlay'; // Display variant
  width: 'sm' | 'md' | 'lg' | 'xl';   // Width (192px, 256px, 288px, 320px)
  collapsible: boolean;               // Allow collapsing
  defaultCollapsed: boolean;          // Start collapsed
  showOnMobile: boolean;              // Show on mobile devices
  mobileBreakpoint: 'sm' | 'md' | 'lg' | 'xl'; // Mobile breakpoint
}
```

### Footer Configuration
```typescript
footer: {
  enabled: boolean;                     // Show/hide footer
  fixed: boolean;                      // Fixed or relative positioning
  variant: 'simple' | 'detailed' | 'minimal'; // Footer style
  showOnMobile: boolean;               // Show on mobile devices
}
```

### Content Configuration
```typescript
content: {
  maxWidth: 'full' | 'container' | 'prose'; // Max width (100%, 1280px, 896px)
  padding: 'none' | 'sm' | 'md' | 'lg';     // Padding options
  centered: boolean;                         // Center content
}
```

## 🎨 Layout Settings Interface

Visit `/dashboard/layout-settings` for a comprehensive configuration interface featuring:

- **Tabbed Configuration** - Organize settings by component
- **Real-time Preview** - See changes immediately
- **Quick Presets** - Apply common layouts instantly  
- **Import/Export** - Save and share configurations
- **Current Status** - View active configuration summary

## 📱 Mobile Responsiveness

The layout system is mobile-first with automatic adaptations:

- **Automatic Menu Conversion** - Sidebar becomes mobile menu on small screens
- **Touch-friendly Interactions** - Optimized for touch devices
- **Orientation Support** - Handles portrait/landscape changes
- **Configurable Breakpoints** - Customize responsive behavior

## 🔧 Advanced Usage

### Custom Presets
```tsx
const customPreset = () => {
  updateConfig({
    header: { enabled: true, fixed: true, height: 'lg' },
    sidebar: { enabled: true, variant: 'overlay', width: 'xl' },
    footer: { enabled: false },
    content: { maxWidth: 'container', centered: true }
  });
};
```

### Persistent Storage
Layout preferences are automatically saved to localStorage and restored on page load.

### TypeScript Support
Full TypeScript definitions are available in `types/layout.ts` for type-safe configuration.

## 🎯 Use Cases

### 1. Multi-tenant SaaS
Different layout configurations for different customer types:
```tsx
// Admin dashboard
applyPreset('dashboard');

// Customer portal  
applyPreset('portal');

// Public marketing site
applyPreset('website');
```

### 2. Progressive Web App
Adapt layout based on device capabilities:
```tsx
const { isMobile } = useLayoutComputed();

useEffect(() => {
  if (isMobile) {
    updateConfig({
      sidebar: { ...config.sidebar, variant: 'drawer' }
    });
  }
}, [isMobile]);
```

### 3. Content Management
Different layouts for different content types:
```tsx
// Blog posts
applyPreset('blog');

// Documentation
updateConfig({
  content: { maxWidth: 'prose', centered: true },
  sidebar: { enabled: true, variant: 'fixed', width: 'sm' }
});
```

## 🔍 Debugging

Enable layout debugging by checking the current configuration:
```tsx
const { config, computed, state } = useLayout();
console.log('Layout Config:', config);
console.log('Computed Values:', computed);
console.log('Runtime State:', state);
```

## 🚀 Best Practices

1. **Use Presets First** - Start with built-in presets, then customize
2. **Test Mobile** - Always test layouts on mobile devices
3. **Performance** - Layout changes are optimized but avoid rapid updates
4. **Accessibility** - All interactive elements have proper ARIA labels
5. **Consistency** - Use the same layout configuration across similar pages

## 🤝 Contributing

The layout system is designed to be extensible. To add new features:

1. Update types in `types/layout.ts`
2. Modify the context in `contexts/layout-context.tsx`
3. Update components in `components/layout/`
4. Add configuration options to the settings page

---

Built with ❤️ for flexible, responsive web applications.