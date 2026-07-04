import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/pages/LoginPage';
import LandingPage from '@/pages/LandingPage';
import MainPage from '@/pages/MainPage';
import ReceiptPage from '@/pages/ReceiptPage';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse-glow text-gold text-2xl font-serif">
          ✦
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <LandingPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/welcome"
      element={
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/receipt"
      element={
        <ProtectedRoute>
          <ReceiptPage />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
export { AppRoutes };
