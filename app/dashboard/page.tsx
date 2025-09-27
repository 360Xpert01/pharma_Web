"use client";
import Link from "next/link";
import { Button } from "@/components/common/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLayout } from "@/contexts/layout-context";
import { 
  Settings, 
  Palette, 
  Monitor, 
  Smartphone, 
  Layout, 
  Eye,
  BarChart3,
  Users,
  FileText
} from "lucide-react";

function QuickActionsCard() {
  const { applyPreset } = useLayout();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Try different layout configurations instantly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Button 
            variant="outline" 
            onClick={() => applyPreset('website')}
            className="h-auto py-3 flex flex-col"
          >
            <span className="font-medium">Website</span>
            <span className="text-xs text-muted-foreground">Public site</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => applyPreset('dashboard')}
            className="h-auto py-3 flex flex-col"
          >
            <span className="font-medium">Dashboard</span>
            <span className="text-xs text-muted-foreground">Admin panel</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => applyPreset('portal')}
            className="h-auto py-3 flex flex-col"
          >
            <span className="font-medium">Portal</span>
            <span className="text-xs text-muted-foreground">User portal</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => applyPreset('blog')}
            className="h-auto py-3 flex flex-col"
          >
            <span className="font-medium">Blog</span>
            <span className="text-xs text-muted-foreground">Content site</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => applyPreset('minimal')}
            className="h-auto py-3 flex flex-col"
          >
            <span className="font-medium">Minimal</span>
            <span className="text-xs text-muted-foreground">Clean layout</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { config, computed } = useLayout();
  const { showHeader, showSidebar, showFooter, isMobile } = computed;

  const features = [
    {
      title: "Layout Settings",
      description: "Configure your layout in real-time with live preview",
      icon: Palette,
      href: "/dashboard/layout-settings",
      badge: "New"
    },
    {
      title: "Analytics",
      description: "View your application analytics and metrics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      badge: "Coming Soon"
    },
    {
      title: "Users",
      description: "Manage users and their permissions",
      icon: Users,
      href: "/dashboard/users",
      badge: "Demo"
    },
    {
      title: "Content",
      description: "Manage your application content and resources",
      icon: FileText,
      href: "/dashboard/content",
      badge: "Demo"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Experience the power of configurable layouts with real-time customization.
        </p>
      </div>

      {/* Current Layout Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Current Layout Configuration
          </CardTitle>
          <CardDescription>
            Your layout is dynamically configured and persisted in localStorage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Header</span>
              </div>
              <Badge variant={showHeader ? "default" : "secondary"}>
                {showHeader ? (config.header.fixed ? "Fixed" : "Static") : "Disabled"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Sidebar</span>
              </div>
              <Badge variant={showSidebar ? "default" : "secondary"}>
                {showSidebar ? `${config.sidebar.variant} (${config.sidebar.width})` : "Disabled"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Footer</span>
              </div>
              <Badge variant={showFooter ? "default" : "secondary"}>
                {showFooter ? config.footer.variant : "Disabled"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Device</span>
              </div>
              <Badge variant="outline">
                {isMobile ? "Mobile" : "Desktop"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <QuickActionsCard />

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {feature.title}
                  </div>
                  {feature.badge && (
                    <Badge variant={feature.badge === "New" ? "default" : "secondary"}>
                      {feature.badge}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={feature.href}>
                    Open {feature.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Layout System Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">Configuration Options</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Header: Enable/disable, fixed/relative, height options</li>
                <li>• Sidebar: Position, variant, width, collapsible</li>
                <li>• Footer: Enable/disable, variant, mobile visibility</li>
                <li>• Content: Max width, padding, centering</li>
                <li>• Navigation: Style, breadcrumbs, mobile menu type</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Responsive Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Mobile-first design approach</li>
                <li>• Automatic mobile menu conversion</li>
                <li>• Touch-friendly interactions</li>
                <li>• Orientation change handling</li>
                <li>• Configurable breakpoints</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
