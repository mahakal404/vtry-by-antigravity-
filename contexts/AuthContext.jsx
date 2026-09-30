'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

// AuthContext manages Firebase authentication state
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Format the user object to match expected structure
        const names = firebaseUser.displayName ? firebaseUser.displayName.split(' ') : ['User'];
        const firstName = names[0];
        const lastName = names.length > 1 ? names.slice(1).join(' ') : '';
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          firstName,
          lastName,
          avatar: firebaseUser.photoURL || firstName.charAt(0).toUpperCase(),
          isAdmin: false, // Defaulting to false, can be extended later
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login failed", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`.trim()
      });
      // Updating profile doesn't automatically trigger onAuthStateChanged with the new name,
      // so we manually refresh the user state by fetching the current user
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        firstName,
        lastName,
        avatar: firstName.charAt(0).toUpperCase(),
        isAdmin: false
      });
    } catch (error) {
      console.error("Email sign up failed", error);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loginWithGoogle, 
      signUpWithEmail, 
      loginWithEmail, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
