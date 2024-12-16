import React, {ReactNode} from 'react';
import {UserProfileContext, useUserProfileStorage} from '../user';

export const UserProfileProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const {isDataLoading, setUserProfile, userProfile, resetUserProfile} =
    useUserProfileStorage();

  return (
    <UserProfileContext.Provider
      value={{
        isDataLoading,
        userProfile,
        setUserProfile,
        resetUserProfile,
      }}>
      {children}
    </UserProfileContext.Provider>
  );
};
