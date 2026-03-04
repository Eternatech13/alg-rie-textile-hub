import { Outlet, Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ClientSidebar from './ClientSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { mockClientNotifications } from '@/data/mockClientData';

export default function ClientLayout() {
  const { isAuthenticated, loading } = useAuth();
  const unreadCount = mockClientNotifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/connexion-client?returnUrl=/mon-compte/profil" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ClientSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card shrink-0">
            <SidebarTrigger className="mr-2" />
            <div className="flex items-center gap-2">
              <Link to="/mon-compte/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-5 text-xs px-1">{unreadCount}</Badge>
                  )}
                </Button>
              </Link>
              <Link to="/catalogue">
                <Button variant="outline" size="sm">Continuer mes achats</Button>
              </Link>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
