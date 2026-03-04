import {
  LayoutDashboard, Palette, PlusCircle, Handshake, ShoppingBag,
  DollarSign, UserCircle, Bell, Settings, LogOut,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { mockNotifications } from '@/data/mockDesignerData';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';

const mainNav = [
  { title: 'Tableau de bord', url: '/designer/dashboard', icon: LayoutDashboard },
  { title: 'Mes Designs', url: '/designer/designs', icon: Palette },
  { title: 'Nouveau Design', url: '/designer/designs/nouveau', icon: PlusCircle },
  { title: 'Conventions', url: '/designer/conventions', icon: Handshake },
  { title: 'Commandes', url: '/designer/commandes', icon: ShoppingBag },
  { title: 'Revenus', url: '/designer/revenus', icon: DollarSign },
];

const accountNav = [
  { title: 'Mon Profil', url: '/designer/profil', icon: UserCircle },
  { title: 'Notifications', url: '/designer/notifications', icon: Bell },
  { title: 'Paramètres', url: '/designer/parametres', icon: Settings },
];

export default function DesignerSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        {/* Brand */}
        <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
          <img src="/logo.svg" alt="Logo" className="w-9 h-9 object-contain" />
          {!collapsed && (
            <div>
              <p className="font-heading font-bold text-sm text-sidebar-foreground">Salaate Bladi</p>
              <p className="text-xs text-muted-foreground">Espace Designer</p>
            </div>
          )}
        </div>

        {/* Profile summary */}
        {!collapsed && profile && (
          <div className="px-4 py-3 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {profile.first_name} {profile.last_name}
                </p>
                <p className="text-xs text-muted-foreground">Designer</p>
              </div>
            </div>
          </div>
        )}

        {/* Main nav */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account nav */}
        <SidebarGroup>
          <SidebarGroupLabel>Compte</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.title === 'Notifications' && unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 min-w-5 text-xs px-1.5">
                              {unreadCount}
                            </Badge>
                          )}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} className="text-destructive hover:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && <span>Déconnexion</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
