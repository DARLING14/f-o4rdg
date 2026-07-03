import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { client } from '@/lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  username: string | null;
  login: (username: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; message: string }>;
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

  const checkSession = async () => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const response = await client.apiCall.invoke({
        url: '/api/v1/private-auth/verify',
        method: 'POST',
        data: { token },
      });

      if (response.data?.valid) {
        setIsAuthenticated(true);
        setUsername(response.data.username);
      } else {
        localStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_token');
        setIsAuthenticated(false);
        setUsername(null);
      }
    } catch {
      setIsAuthenticated(false);
      setUsername(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (usernameInput: string, password: string, rememberMe: boolean) => {
    try {
      const response = await client.apiCall.invoke({
        url: '/api/v1/private-auth/login',
        method: 'POST',
        data: { username: usernameInput, password, remember_me: rememberMe },
      });

      if (response.data?.success) {
        const token = response.data.token;
        if (rememberMe) {
          localStorage.setItem('auth_token', token);
        } else {
          sessionStorage.setItem('auth_token', token);
        }
        setIsAuthenticated(true);
        setUsername(usernameInput);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data?.message || 'Invalid credentials' };
      }
    } catch {
      return { success: false, message: 'Authentication error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (token) {
        await client.apiCall.invoke({
          url: '/api/v1/private-auth/logout',
          method: 'POST',
          data: { token },
        });
      }
    } catch {
      // Ignore errors during logout
    } finally {
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      setIsAuthenticated(false);
      setUsername(null);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    loading,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
