import { useState, useEffect } from 'react';

interface User {
  email: string;
  role: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('smartinventory_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('smartinventory_user');
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = (credentials: { email: string; password: string }) => {
    // Mock authentication logic
    const validCredentials = [
      { email: 'admin@smartinventory.com', password: 'admin123', role: 'Admin', name: 'John Admin' },
      { email: 'manager@smartinventory.com', password: 'manager123', role: 'Manager', name: 'Sarah Manager' },
      { email: 'operator@smartinventory.com', password: 'operator123', role: 'Operator', name: 'Mike Operator' }
    ];

    const user = validCredentials.find(
      cred => cred.email === credentials.email && cred.password === credentials.password
    );

    if (user) {
      const userData = {
        email: user.email,
        role: user.role,
        name: user.name
      };
      
      localStorage.setItem('smartinventory_user', JSON.stringify(userData));
      setAuthState({
        isAuthenticated: true,
        user: userData,
        isLoading: false
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('smartinventory_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};