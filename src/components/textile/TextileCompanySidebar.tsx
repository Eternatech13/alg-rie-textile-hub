import {
  LayoutDashboard,
  Building2,
  Package,
  ShoppingCart,
  Handshake,
  TrendingUp,
  User,
  Bell,
  Settings,
  Factory,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainItems = [
  { title: "Tableau de bord", url: "/societe-textile/dashboard", icon: LayoutDashboard },
  { title: "Structure & Unités", url: "/societe-textile/structure", icon: Building2 },
  { title: "Produits", url: "/societe-textile/produits", icon: Package },
  { title: "Commandes", url: "/societe-textile/commandes", icon: ShoppingCart, badge: 2 },
  { title: "Conventions", url: "/societe-textile/conventions", icon: Handshake, badge: 2 },
  { title: "Revenus", url: "/societe-textile/revenus", icon: TrendingUp },
];

const accountItems = [
  { title: "Profil société", url: "/societe-textile/profil", icon: User },
  { title: "Notifications", url: "/societe-textile/notifications", icon: Bell, badge: 2 },
  { title: "Paramètres", url: "/societe-textile/parametres", icon: Settings },
];

export default function TextileCompanySidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Factory className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">SOTEXAL</p>
              <p className="text-xs text-muted-foreground">Société Textile</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="flex-1">{item.title}</span>}
                      {!collapsed && item.badge && (
                        <Badge variant="destructive" className="ml-auto h-5 min-w-5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Compte</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="flex-1">{item.title}</span>}
                      {!collapsed && item.badge && (
                        <Badge variant="destructive" className="ml-auto h-5 min-w-5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
