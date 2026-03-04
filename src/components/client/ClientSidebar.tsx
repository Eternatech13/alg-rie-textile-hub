import { User, ShoppingBag, MapPin, CreditCard, Heart, Bell, Settings, LogOut, Home } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { mockClientNotifications } from '@/data/mockClientData';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';

const mainNav = [
  { title: 'Mon Profil', url: '/mon-compte/profil', icon: User },
  { title: 'Mes Commandes', url: '/mon-compte/commandes', icon: ShoppingBag },
  { title: 'Mes Adresses', url: '/mon-compte/adresses', icon: MapPin },
  { title: 'Mes Paiements', url: '/mon-compte/paiements', icon: CreditCard },
  { title: 'Mes Favoris', url: '/mon-compte/favoris', icon: Heart },
  { title: 'Notifications', url: '/mon-compte/notifications', icon: Bell },
  { title: 'Paramètres', url: '/mon-compte/parametres', icon: Settings },
];

export default function ClientSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const unreadCount = mockClientNotifications.filter(n => !n.read).length;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
          <img src="/logo.svg" alt="Logo" className="w-9 h-9 object-contain" />
          {!collapsed && (
            <div>
              <p className="font-heading font-bold text-sm text-sidebar-foreground">Salaate Bladi</p>
              <p className="text-xs text-muted-foreground">Mon Compte</p>
            </div>
          )}
        </div>

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
                <Badge className={profile.ccp_validated ? 'bg-green-100 text-green-800 text-xs' : 'bg-yellow-100 text-yellow-800 text-xs'}>
                  {profile.ccp_validated ? 'CCP Validé' : 'CCP en attente'}
                </Badge>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Mon espace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.title === 'Notifications' && unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 min-w-5 text-xs px-1.5">{unreadCount}</Badge>
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
