import {
  LayoutDashboard, Users, Palette, Factory, Building2, Package,
  ShoppingCart, CreditCard, Tag, Star, Bell, Settings, LogOut, Home
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { adminKPIs } from '@/data/mockAdminData';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';

const mainNav = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Utilisateurs', url: '/admin/utilisateurs', icon: Users, badge: adminKPIs.pendingCCP },
  { title: 'Designers', url: '/admin/designers', icon: Palette, badge: adminKPIs.pendingDesigners },
  { title: 'Sociétés Textiles', url: '/admin/societes-textiles', icon: Factory, badge: adminKPIs.pendingCompanies },
  { title: 'Soc. Partenaires', url: '/admin/societes-partenaires', icon: Building2 },
  { title: 'Produits', url: '/admin/produits', icon: Package },
];

const commerceNav = [
  { title: 'Commandes', url: '/admin/commandes', icon: ShoppingCart },
  { title: 'Paiements', url: '/admin/paiements', icon: CreditCard, badge: adminKPIs.overduePayments },
  { title: 'Codes Promo', url: '/admin/promotions', icon: Tag },
];

const systemNav = [
  { title: 'Avis', url: '/admin/avis', icon: Star },
  { title: 'Notifications', url: '/admin/notifications', icon: Bell },
  { title: 'Paramètres', url: '/admin/parametres', icon: Settings },
];

export default function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const renderNavGroup = (label: string, items: typeof mainNav) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink to={item.url} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                  <item.icon className="mr-2 h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <span className="flex items-center gap-2 flex-1">
                      {item.title}
                      {'badge' in item && item.badge && item.badge > 0 && (
                        <Badge variant="destructive" className="h-5 min-w-5 text-xs px-1.5 ml-auto">{item.badge}</Badge>
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
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SB</span>
          </div>
          {!collapsed && (
            <div>
              <p className="font-heading font-bold text-sm text-sidebar-foreground">Salaate Bladi</p>
              <p className="text-xs text-muted-foreground">Administration</p>
            </div>
          )}
        </div>

        {renderNavGroup('Gestion', mainNav)}
        {renderNavGroup('Commerce', commerceNav)}
        {renderNavGroup('Système', systemNav)}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2 space-y-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate('/')} className="hover:bg-sidebar-accent/50">
              <Home className="mr-2 h-4 w-4" />
              {!collapsed && <span>Retour au site</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
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
