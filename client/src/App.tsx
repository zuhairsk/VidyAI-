import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import Quizzes from "@/pages/Quizzes";
import Quiz from "@/pages/Quiz";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import Layout from "@/components/layout/Layout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// We need to separate the parts that use useAuth hook
function AuthenticatedRoutes() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Check if user is authenticated and redirect if needed
  useEffect(() => {
    // Listen for speech recognition results
    const handleSpeechResult = (event: CustomEvent) => {
      toast({
        title: "Voice Command Detected",
        description: `"${event.detail.transcript}"`,
        duration: 3000,
      });
    };

    // Add event listener for custom speech events
    window.addEventListener("speech-result" as any, handleSpeechResult);

    return () => {
      window.removeEventListener("speech-result" as any, handleSpeechResult);
    };
  }, [toast]);

  return (
    <Switch>
      <Route path="/" component={isAuthenticated ? Dashboard : Login} />
      <Route path="/login" component={Login} />
      
      {/* Protected routes */}
      {isAuthenticated ? (
        <>
          <Route path="/dashboard">
            <Layout>
              <Dashboard />
            </Layout>
          </Route>
          <Route path="/courses">
            <Layout>
              <Courses />
            </Layout>
          </Route>
          <Route path="/quizzes">
            <Layout>
              <Quizzes />
            </Layout>
          </Route>
          <Route path="/quiz/:id">
            {(params) => (
              <Layout>
                <Quiz id={params.id} />
              </Layout>
            )}
          </Route>
          <Route path="/profile">
            <Layout>
              <Profile />
            </Layout>
          </Route>
          <Route path="/settings">
            <Layout>
              <Settings />
            </Layout>
          </Route>
          <Route path="/help">
            <Layout>
              <Help />
            </Layout>
          </Route>
        </>
      ) : (
        // Redirect to login if not authenticated
        <Route path="/:rest*">
          <Login />
        </Route>
      )}
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Create a separate standalone app
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <AuthenticatedRoutes />
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
