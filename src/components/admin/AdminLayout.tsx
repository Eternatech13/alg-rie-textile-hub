import { Outlet, Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { adminKPIs } from '@/data/mockAdminData';

export default function AdminLayout() {
  const { isAuthenticated, loading } = useAuth();

  // In production, check has_role(auth.uid(), 'admin')
  // For now, allow authenticated users (mock)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // For demo purposes, we allow access without strict admin check
  // In production: if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card shrink-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="mr-2" />
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Administration Salaate Bladi</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {adminKPIs.pendingCCP + adminKPIs.pendingDesigners + adminKPIs.pendingCompanies > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-5 text-xs px-1">
                    {adminKPIs.pendingCCP + adminKPIs.pendingDesigners + adminKPIs.pendingCompanies}
                  </Badge>
                )}
              </Button>
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
