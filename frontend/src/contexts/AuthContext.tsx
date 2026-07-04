import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  username: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  const extractUsername = (user: User | null): string | null => {
    if (!user) return null;
    return user.user_metadata?.full_name || user.email?.split('@')[0] || null;
  };

  const handleSession = (session: Session | null) => {
    if (session?.user) {
      setIsAuthenticated(true);
      setUsername(extractUsername(session.user));
    } else {
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, _rememberMe: boolean) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Map Supabase error messages to user-friendly messages
        let message = error.message;
        if (message.includes('Invalid login credentials')) {
          message = 'Invalid email or password. Please try again.';
        } else if (message.includes('Email not confirmed')) {
          message = 'Please confirm your email address before logging in.';
        } else if (message.includes('Too many requests')) {
          message = 'Too many login attempts. Please wait a moment and try again.';
        }
        return { success: false, message };
      }

      if (data.user) {
        return { success: true, message: 'Welcome back, my love! 💕' };
      }

      return { success: false, message: 'Login failed. Please try again.' };
    } catch {
      return { success: false, message: 'Authentication error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore errors during logout
    } finally {
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    loading,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
