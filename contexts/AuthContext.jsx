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
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const names = firebaseUser.displayName ? firebaseUser.displayName.split(' ') : ['User'];
        const firstName = names[0];
        const lastName = names.length > 1 ? names.slice(1).join(' ') : '';
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          firstName,
          lastName,
          avatar: firebaseUser.photoURL || firstName.charAt(0).toUpperCase(),
          isAdmin: false, 
        });

        // Check and update user doc in Firestore
        const userRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          
          const userDataToSave = {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || `${firstName} ${lastName}`.trim(),
            firstName,
            lastName,
            photoURL: firebaseUser.photoURL || null,
          };

          if (!userSnap.exists()) {
            await setDoc(userRef, {
              ...userDataToSave,
              vTokens: 5,
              lastLoginDate: null,
              loginStreak: 0,
              dailyAdsWatched: 0,
              lastAdDate: null,
              createdAt: serverTimestamp()
            });
            toast.success('Welcome! 5 Free V-Tokens credited. 🎉');
          } else {
            // Update latest basic details (merge true protects token balance)
            await setDoc(userRef, {
              ...userDataToSave,
              lastLoginAt: serverTimestamp()
            }, { merge: true });
          }
        } catch (error) {
          console.error("Error creating or updating user document", error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error("Google login failed", error);
      toast.error('Login failed.');
      throw error;
    }
  };

  const signUpWithEmail = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`.trim()
      });
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        firstName,
        lastName,
        avatar: firstName.charAt(0).toUpperCase(),
        isAdmin: false
      });
      toast.success('Signed up successfully!');
    } catch (error) {
      console.error("Email sign up failed", error);
      toast.error('Sign up failed.');
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error("Email login failed", error);
      toast.error('Login failed.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out.');
    } catch (error) {
      console.error("Logout failed", error);
      toast.error('Logout failed.');
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
