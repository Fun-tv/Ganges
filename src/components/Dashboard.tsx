import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from './dashboard/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';


/**
 * Dashboard Wrapper Component
 * 
 * This component now acts as a shell that provides the layout and sidebar.
 * The actual content of each dashboard page is rendered via the <Outlet />
 * as defined in the nested routes in App.tsx.
 */
export function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    console.log('📊 Dashboard: Mounted shell', {
      hasUser: !!user,
      userId: user?.id,
      timestamp: new Date().toISOString()
    });
  }, [user]);

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
