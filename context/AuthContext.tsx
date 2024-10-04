import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Models, AppwriteException } from 'react-native-appwrite'; // Import AppwriteException for error handling
import { useRouter } from 'expo-router';
import {account} from "@/utils/Appwrite";

// Define the type for the authentication context state
interface AuthContextType {
  user: Models.User<{}> | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// Initialize AuthContext with undefined to enforce the use of the provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Models.User<{}> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Attempt to retrieve the current user session
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        if (error instanceof AppwriteException && error.code === 401) {
          // If the user is not authenticated, redirect to the login page
          console.log('No session found, redirecting to login.');
          router.replace('/login');
        } else {
          console.log('An unexpected error occurred: ', error);
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const logout = async (): Promise<void> => {
  if (!user) {
    // If the user is not logged in, simply return and do not attempt to log out
    console.log('User is already logged out.');
    router.push('/login'); // Redirect to the login page
    return;
  }

  try {
    await account.deleteSessions(); // Deletes the current session
    setUser(null); // Set user state to null
    router.push('/login'); // Redirect to the login page
  } catch (error: any) {
    console.log('Error logging out', error);
  }
};


  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
