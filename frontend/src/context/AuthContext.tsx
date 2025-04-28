import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthStatus } from '@/types';  // Ensure these types are defined

interface AuthContextType {
  user: User | null;
  authStatus: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setAuthStatus('authenticated');
    } else {
      setAuthStatus('unauthenticated');
    }
  }, []);

  // Login method
  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Please fill all fields');
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      localStorage.setItem('user', JSON.stringify(data.user));  // Store user in localStorage
      setUser(data.user);
      setAuthStatus('authenticated');
    } catch (err: any) {
      throw new Error(err.message || 'Login failed');
    }
  };

  // Signup method
  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      throw new Error('Please fill all fields');
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user));  // Store user in localStorage
      setUser(data.user);
      setAuthStatus('authenticated');
    } catch (err: any) {
      throw new Error(err.message || 'Signup failed');
    }
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem('user');  // Clear user from localStorage
    setUser(null);
    setAuthStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, authStatus, login, signup, logout }}>
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
