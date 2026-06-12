'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, type User } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';
import { toast } from 'sonner';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  google: () => Promise<void>;
  reset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!auth) { setLoading(false); return; }
    return onAuthStateChanged(auth, (next) => { setUser(next); setLoading(false); });
  }, []);

  async function syncUser(nextUser: User, username?: string) {
    if (!db) return;
    await setDoc(doc(db, 'users', nextUser.uid), {
      uid: nextUser.uid,
      username: username || nextUser.displayName || nextUser.email?.split('@')[0] || 'Creator',
      email: nextUser.email,
      avatar: nextUser.photoURL || `https://api.dicebear.com/9.x/shapes/svg?seed=${nextUser.uid}`,
      role: 'user',
      createdAt: serverTimestamp(),
    }, { merge: true });
  }

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    async login(email, password) {
      if (!auth) throw new Error('Firebase is not configured.');
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back to PromptHub AI');
    },
    async signup(name, email, password) {
      if (!auth) throw new Error('Firebase is not configured.');
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      await syncUser(credential.user, name);
      toast.success('Account created successfully');
    },
    async google() {
      if (!auth) throw new Error('Firebase is not configured.');
      const credential = await signInWithPopup(auth, googleProvider);
      await syncUser(credential.user);
      toast.success('Signed in with Google');
    },
    async reset(email) {
      if (!auth) throw new Error('Firebase is not configured.');
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
    },
    async logout() {
      if (!auth) return;
      await signOut(auth);
      toast.success('Signed out');
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
