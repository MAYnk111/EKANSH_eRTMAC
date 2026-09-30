import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../services/firebase';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, role: UserRole, org: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsDemoUser: (role: UserRole) => void;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
}

const DEFAULT_DEMO_USER: UserProfile = {
  uid: 'demo-engineer-01',
  email: 'b.borah@oilindia.in',
  displayName: 'Bhaskar Borah',
  role: 'Drilling Engineer',
  organization: 'Oil India Limited (Assam Asset)',
  lastLogin: new Date().toLocaleTimeString()
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ertmac_auth_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isFirebaseConfigured()) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const profile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || 'user@oilindia.in',
            displayName: firebaseUser.displayName || 'OIL Drilling Specialist',
            role: 'Drilling Engineer',
            organization: 'Oil India Limited',
            lastLogin: new Date().toLocaleTimeString()
          };
          setCurrentUser(profile);
          localStorage.setItem('ertmac_auth_user', JSON.stringify(profile));
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      setLoading(false);
    }
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    if (isFirebaseConfigured()) {
      await signInWithEmailAndPassword(auth, email, pass);
    } else {
      // Local authenticated session
      const user: UserProfile = {
        uid: `user-${Date.now()}`,
        email,
        displayName: email.split('@')[0].toUpperCase(),
        role: 'Drilling Engineer',
        organization: 'Oil India Limited',
        lastLogin: new Date().toLocaleTimeString()
      };
      setCurrentUser(user);
      localStorage.setItem('ertmac_auth_user', JSON.stringify(user));
    }
  };

  const registerWithEmail = async (
    email: string, 
    pass: string, 
    name: string, 
    role: UserRole, 
    org: string
  ) => {
    if (isFirebaseConfigured()) {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: name });
    }
    const user: UserProfile = {
      uid: `user-${Date.now()}`,
      email,
      displayName: name,
      role,
      organization: org || 'Oil India Limited',
      lastLogin: new Date().toLocaleTimeString()
    };
    setCurrentUser(user);
    localStorage.setItem('ertmac_auth_user', JSON.stringify(user));
  };

  const loginWithGoogle = async () => {
    if (isFirebaseConfigured()) {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } else {
      const user: UserProfile = {
        uid: 'google-oil-user-01',
        email: 'geoscience.ertmac@oilindia.in',
        displayName: 'Dr. A. Sharma (OIL Operations)',
        role: 'Operations Manager',
        organization: 'Oil India Limited - Duliajan HQ',
        lastLogin: new Date().toLocaleTimeString()
      };
      setCurrentUser(user);
      localStorage.setItem('ertmac_auth_user', JSON.stringify(user));
    }
  };

  const loginAsDemoUser = (role: UserRole) => {
    let name = 'Bhaskar Borah';
    let email = 'b.borah@oilindia.in';

    if (role === 'eRTMAC Operator') {
      name = 'Pranjal Saikia';
      email = 'p.saikia@ertmac.oilindia.in';
    } else if (role === 'Operations Manager') {
      name = 'Debajit Kalita';
      email = 'd.kalita@oilindia.in';
    } else if (role === 'OIL Management') {
      name = 'R. K. Hazarika (ED Exploration)';
      email = 'rk.hazarika@oilindia.in';
    }

    const user: UserProfile = {
      uid: `demo-${role.toLowerCase().replace(/\s+/g, '-')}`,
      email,
      displayName: name,
      role,
      organization: 'Oil India Limited (Assam Asset)',
      lastLogin: new Date().toLocaleTimeString()
    };
    setCurrentUser(user);
    localStorage.setItem('ertmac_auth_user', JSON.stringify(user));
  };

  const switchRole = (role: UserRole) => {
    if (currentUser) {
      const updated = { ...currentUser, role };
      setCurrentUser(updated);
      localStorage.setItem('ertmac_auth_user', JSON.stringify(updated));
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured()) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('Signout warning:', err);
      }
    }
    setCurrentUser(null);
    localStorage.removeItem('ertmac_auth_user');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      loginWithEmail,
      registerWithEmail,
      loginWithGoogle,
      loginAsDemoUser,
      logout,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
