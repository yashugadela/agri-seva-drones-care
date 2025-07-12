
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('agri-drone-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        name: 'Farmer User',
        email,
        phone: '+91 9876543210'
      };
      
      setUser(userData);
      localStorage.setItem('agri-drone-user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        name,
        email,
        phone
      };
      
      setUser(userData);
      localStorage.setItem('agri-drone-user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agri-drone-user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
