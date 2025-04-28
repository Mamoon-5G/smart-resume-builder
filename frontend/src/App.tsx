import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ResumeCreationPage from "./pages/resume/ResumeCreationPage";
import ResumePreviewPage from "./pages/resume/ResumePreviewPage";
import NotFound from "./pages/NotFound";

// Query client for React Query
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { authStatus } = useAuth();

  if (authStatus === "loading") {
    return <div>Loading...</div>; // You can customize loading state
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return element;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
            <Route path="/resume/new" element={<ProtectedRoute element={<ResumeCreationPage />} />} />
            <Route path="/resume/edit/:id" element={<ProtectedRoute element={<ResumeCreationPage />} />} />
            <Route path="/resume/preview/:id" element={<ProtectedRoute element={<ResumePreviewPage />} />} />
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
