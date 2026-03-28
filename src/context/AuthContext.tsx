'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAvatarUrl } from '@/utils/avatarUtils';

type UserRole = 'landlord' | 'tenant' | null;

interface AuthContextType {
  role: UserRole;
  userName: string | null;
  login: (data: { role: UserRole; name?: string; profileImage?: string }) => void;
  logout: () => void;
  profileImage: string | null;
  displayImage: string;
  updateProfileImage: (url: string) => void;
  updateUserName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string | null>("Alex Johnson");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  const login = ({ role: newRole, name }: { role: UserRole; name?: string }) => {
    setRole(newRole);
    if (name) setUserName(name);
    router.push(newRole === 'landlord' ? '/landlord' : '/tenant');
  };

  const logout = () => {
    setRole(null);
    setUserName(null);
    window.location.href = '/';
  };

  const updateProfileImage = (url: string) => setProfileImage(url);
  const updateUserName = (name: string) => setUserName(name);

  const displayImage = profileImage || getAvatarUrl(userName);

  return (
    <AuthContext.Provider value={{ role, userName, login, logout, profileImage, displayImage, updateProfileImage, updateUserName }}>
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
