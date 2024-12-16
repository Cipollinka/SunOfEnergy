import {createContext, useContext} from 'react';
import {UserProfile} from './types.ts';

export const UserProfileContext = createContext<UserContextProps | undefined>(
  undefined,
);

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContext');
  }

  return context;
};

interface UserContextProps {
  userProfile: UserProfile | null;
  setUserProfile: (newState: UserProfile) => Promise<void>;
  resetUserProfile: () => void;
  isDataLoading: boolean;
}
