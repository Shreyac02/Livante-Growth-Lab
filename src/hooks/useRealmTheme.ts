
import { useState, useEffect } from 'react';

interface RealmTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundGradient: string;
  accentColor: string;
  textColor: string;
}

const realmThemes: Record<string, RealmTheme> = {
  'foundation': {
    id: 'foundation Realm',
    name: 'Foundation Forest',
    primaryColor: '#10b981', // emerald-500
    secondaryColor: '#059669', // emerald-600
    backgroundGradient: 'from-emerald-900 via-slate-900 to-emerald-800',
    accentColor: '#34d399', // emerald-400
    textColor: '#ffffff'
  },
  'life-mastery': {
    id: 'life-mastery Realm',
    name: 'Life Mastery Mountains',
    primaryColor: '#3b82f6', // blue-500
    secondaryColor: '#2563eb', // blue-600
    backgroundGradient: 'from-blue-900 via-slate-900 to-blue-800',
    accentColor: '#60a5fa', // blue-400
    textColor: '#ffffff'
  },
  'elite-skills': {
    id: 'elite-skills Realm',
    name: 'Elite Skills Citadel',
    primaryColor: '#8b5cf6', // violet-500
    secondaryColor: '#7c3aed', // violet-600
    backgroundGradient: 'from-violet-900 via-slate-900 to-violet-800',
    accentColor: '#a78bfa', // violet-400
    textColor: '#ffffff'
  },
  'mastery': {
    id: 'Mastery Realm',
    name: 'Mastery Sanctum',
    primaryColor: '#f59e0b', // amber-500
    secondaryColor: '#d97706', // amber-600
    backgroundGradient: 'from-amber-900 via-slate-900 to-amber-800',
    accentColor: '#fbbf24', // amber-400
    textColor: '#ffffff'
  }
};

export const useRealmTheme = (currentRealmId: string) => {
  const [theme, setTheme] = useState<RealmTheme>(realmThemes['foundation']);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (realmThemes[currentRealmId] && realmThemes[currentRealmId].id !== theme.id) {
      setIsTransitioning(true);
      
      // Smooth transition delay
      setTimeout(() => {
        setTheme(realmThemes[currentRealmId]);
        setTimeout(() => setIsTransitioning(false), 500);
      }, 200);
    }
  }, [currentRealmId, theme.id]);

  return {
    theme,
    isTransitioning,
    realmThemes
  };
};
