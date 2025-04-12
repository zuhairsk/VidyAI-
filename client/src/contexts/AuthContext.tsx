import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { User } from '@shared/schema';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'twitter' | 'facebook') => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: { username: string; email: string; password: string; fullName?: string; gradeLevel?: number; }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/status', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to check auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/auth/login', { username, password });
      const userData = await response.json();
      setUser(userData);
      setLocation('/dashboard');
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.fullName || userData.username}!`,
      });
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithProvider = async (provider: 'google' | 'twitter' | 'facebook') => {
    // This is just a placeholder for social login
    // In a real app, this would redirect to the provider's OAuth flow
    toast({
      title: "Social login",
      description: `Social login with ${provider} is not implemented in this demo.`,
      variant: "default",
    });
  };

  const logout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout', {});
      setUser(null);
      setLocation('/login');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const register = async (userData: { username: string; email: string; password: string; fullName?: string; gradeLevel?: number; }) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/auth/register', userData);
      const newUser = await response.json();
      setUser(newUser);
      setLocation('/dashboard');
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login,
      loginWithProvider,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
