"use client";

import { useState } from "react";
import { useLayout } from "@/contexts/layout-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Download, Upload, Eye, Settings2 } from "lucide-react";

export function LayoutSettings() {
  const { config, updateConfig, resetConfig, applyPreset } = useLayout();
  const [activeTab, setActiveTab] = useState("header");

  const handleConfigChange = (section: keyof typeof config, key: string, value: any) => {
    updateConfig({
      [section]: {
        ...config[section],
        [key]: value,
      },
    });
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'layout-config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string);
          updateConfig(importedConfig);
        } catch (error) {
          console.error('Failed to import config:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Layout Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure your application layout with real-time preview
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportConfig}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" asChild>
            <label>
              <Upload className="h-4 w-4 mr-2" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={importConfig}
                className="hidden"
              />
            </label>
          </Button>
          <Button variant="outline" onClick={resetConfig}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Quick Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Quick Presets
          </CardTitle>
          <CardDescription>
            Apply pre-configured layout setups for common use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {([
              { key: 'website', label: 'Website', desc: 'Public website layout' },
              { key: 'dashboard', label: 'Dashboard', desc: 'Admin dashboard layout' },
              { key: 'portal', label: 'Portal', desc: 'User portal layout' },
              { key: 'blog', label: 'Blog', desc: 'Content-focused layout' },
              { key: 'minimal', label: 'Minimal', desc: 'Clean, minimal layout' },
            ] as const).map((preset) => (
              <Button
                key={preset.key}
                variant="outline"
                onClick={() => applyPreset(preset.key)}
                className="flex flex-col h-auto p-4 text-left"
              >
                <span className="font-medium">{preset.label}</span>
                <span className="text-xs text-muted-foreground">{preset.desc}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="header">Header</TabsTrigger>
              <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>

            {/* Header Settings */}
            <TabsContent value="header" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Header Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="header-enabled">Enable Header</Label>
                    <Switch
                      id="header-enabled"
                      checked={config.header.enabled}
                      onCheckedChange={(checked) => 
                        handleConfigChange('header', 'enabled', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="header-fixed">Fixed Position</Label>
                    <Switch
                      id="header-fixed"
                      checked={config.header.fixed}
                      onCheckedChange={(checked) => 
                        handleConfigChange('header', 'fixed', checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Header Height</Label>
                    <Select
                      value={config.header.height}
                      onValueChange={(value) => 
                        handleConfigChange('header', 'height', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small (48px)</SelectItem>
                        <SelectItem value="md">Medium (64px)</SelectItem>
                        <SelectItem value="lg">Large (80px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-logo">Show Logo</Label>
                    <Switch
                      id="show-logo"
                      checked={config.header.showLogo}
                      onCheckedChange={(checked) => 
                        handleConfigChange('header', 'showLogo', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-navigation">Show Navigation</Label>
                    <Switch
                      id="show-navigation"
                      checked={config.header.showNavigation}
                      onCheckedChange={(checked) => 
                        handleConfigChange('header', 'showNavigation', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-user-menu">Show User Menu</Label>
                    <Switch
                      id="show-user-menu"
                      checked={config.header.showUserMenu}
                      onCheckedChange={(checked) => 
                        handleConfigChange('header', 'showUserMenu', checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sidebar Settings */}
            <TabsContent value="sidebar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sidebar Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sidebar-enabled">Enable Sidebar</Label>
                    <Switch
                      id="sidebar-enabled"
                      checked={config.sidebar.enabled}
                      onCheckedChange={(checked) => 
                        handleConfigChange('sidebar', 'enabled', checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Select
                      value={config.sidebar.position}
                      onValueChange={(value) => 
                        handleConfigChange('sidebar', 'position', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Variant</Label>
                    <Select
                      value={config.sidebar.variant}
                      onValueChange={(value) => 
                        handleConfigChange('sidebar', 'variant', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed</SelectItem>
                        <SelectItem value="drawer">Drawer</SelectItem>
                        <SelectItem value="overlay">Overlay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Width</Label>
                    <Select
                      value={config.sidebar.width}
                      onValueChange={(value) => 
                        handleConfigChange('sidebar', 'width', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small (192px)</SelectItem>
                        <SelectItem value="md">Medium (256px)</SelectItem>
                        <SelectItem value="lg">Large (288px)</SelectItem>
                        <SelectItem value="xl">Extra Large (320px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sidebar-collapsible">Collapsible</Label>
                    <Switch
                      id="sidebar-collapsible"
                      checked={config.sidebar.collapsible}
                      onCheckedChange={(checked) => 
                        handleConfigChange('sidebar', 'collapsible', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sidebar-mobile">Show on Mobile</Label>
                    <Switch
                      id="sidebar-mobile"
                      checked={config.sidebar.showOnMobile}
                      onCheckedChange={(checked) => 
                        handleConfigChange('sidebar', 'showOnMobile', checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Footer Settings */}
            <TabsContent value="footer" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Footer Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="footer-enabled">Enable Footer</Label>
                    <Switch
                      id="footer-enabled"
                      checked={config.footer.enabled}
                      onCheckedChange={(checked) => 
                        handleConfigChange('footer', 'enabled', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="footer-fixed">Fixed Position</Label>
                    <Switch
                      id="footer-fixed"
                      checked={config.footer.fixed}
                      onCheckedChange={(checked) => 
                        handleConfigChange('footer', 'fixed', checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Footer Variant</Label>
                    <Select
                      value={config.footer.variant}
                      onValueChange={(value) => 
                        handleConfigChange('footer', 'variant', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="simple">Simple</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="footer-mobile">Show on Mobile</Label>
                    <Switch
                      id="footer-mobile"
                      checked={config.footer.showOnMobile}
                      onCheckedChange={(checked) => 
                        handleConfigChange('footer', 'showOnMobile', checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Settings */}
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Max Width</Label>
                    <Select
                      value={config.content.maxWidth}
                      onValueChange={(value) => 
                        handleConfigChange('content', 'maxWidth', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Width</SelectItem>
                        <SelectItem value="container">Container (1280px)</SelectItem>
                        <SelectItem value="prose">Prose (896px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Padding</Label>
                    <Select
                      value={config.content.padding}
                      onValueChange={(value) => 
                        handleConfigChange('content', 'padding', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="content-centered">Center Content</Label>
                    <Switch
                      id="content-centered"
                      checked={config.content.centered}
                      onCheckedChange={(checked) => 
                        handleConfigChange('content', 'centered', checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Navigation Settings */}
            <TabsContent value="navigation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Navigation Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Navigation Style</Label>
                    <Select
                      value={config.navigation.style}
                      onValueChange={(value) => 
                        handleConfigChange('navigation', 'style', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="horizontal">Horizontal</SelectItem>
                        <SelectItem value="vertical">Vertical</SelectItem>
                        <SelectItem value="tabs">Tabs</SelectItem>
                        <SelectItem value="breadcrumb">Breadcrumb</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-breadcrumbs">Show Breadcrumbs</Label>
                    <Switch
                      id="show-breadcrumbs"
                      checked={config.navigation.showBreadcrumbs}
                      onCheckedChange={(checked) => 
                        handleConfigChange('navigation', 'showBreadcrumbs', checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Mobile Menu Type</Label>
                    <Select
                      value={config.navigation.mobileMenuType}
                      onValueChange={(value) => 
                        handleConfigChange('navigation', 'mobileMenuType', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drawer">Drawer</SelectItem>
                        <SelectItem value="dropdown">Dropdown</SelectItem>
                        <SelectItem value="fullscreen">Fullscreen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Current Configuration Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                Current Config
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Header</span>
                  <Badge variant={config.header.enabled ? "default" : "secondary"}>
                    {config.header.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sidebar</span>
                  <Badge variant={config.sidebar.enabled ? "default" : "secondary"}>
                    {config.sidebar.enabled ? `${config.sidebar.variant}` : "Disabled"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Footer</span>
                  <Badge variant={config.footer.enabled ? "default" : "secondary"}>
                    {config.footer.enabled ? config.footer.variant : "Disabled"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Content</span>
                  <Badge variant="outline">
                    {config.content.maxWidth}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Preview Info */}
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Changes are applied immediately to the current layout. Navigate to different pages to see how the configuration affects various parts of your application.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LayoutSettings;