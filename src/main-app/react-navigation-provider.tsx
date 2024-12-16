import React, {ReactNode, useEffect} from 'react';
import {useUserProfile, useUserProfileStorage} from '../user';
import {
  ScreensPathes,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';

export const ReactNavigationProvider = ({children}: {children: ReactNode}) => {
  const {navigateTo} = useReactNavigation();

  const {userProfile, isDataLoading} = useUserProfile();
  useEffect(() => {
    if (isDataLoading) {
      return;
    }
    if (userProfile?.isOnboarded) {
      navigateTo(ScreensPathes.Profile);
    } else {
      navigateTo(ScreensPathes.Onboarding);
    }
  }, [isDataLoading,userProfile?.isOnboarded]);

  return <>{children}</>;
};
