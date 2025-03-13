
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import Index from "./pages/Index";
import CheckPage from "./pages/Check";
import AboutPage from "./pages/About";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";

// Profile Pages
import ProfilePage from "./pages/Profile/Index";
import SettingsPage from "./pages/Profile/Settings";
import BillingPage from "./pages/Profile/Billing";
import PaymentsPage from "./pages/Profile/Payments";
import ServicesPage from "./pages/Profile/Services";
import HistoryPage from "./pages/Profile/History";

const queryClient = new QueryClient();

// Get the publishable key from the environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_cHJvLXNhd2ZseS02MC5jbGVyay5hY2NvdW50cy5kZXYk";

// Redirect component for authentication state changes
const ClerkRouteChangeListener = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn && window.location.pathname.includes('/profile')) {
      navigate('/auth');
    }
  }, [isLoaded, isSignedIn, navigate]);

  return null;
};

const App = () => (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ClerkRouteChangeListener />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/check" element={<CheckPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              
              {/* Profile Routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/settings" element={<SettingsPage />} />
              <Route path="/profile/billing" element={<BillingPage />} />
              <Route path="/profile/payments" element={<PaymentsPage />} />
              <Route path="/profile/services" element={<ServicesPage />} />
              <Route path="/profile/history" element={<HistoryPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
