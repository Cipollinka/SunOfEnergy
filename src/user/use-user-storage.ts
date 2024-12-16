import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DayStepProgress, UserProfile} from './types.ts';

const STORAGE_KEY = 'user';
const defaultUserState: UserProfile = {
  isOnboarded: false,
  ideas: [],
  affirmations: [],
  dayStepProgress: DayStepProgress.Ritual,
  isStarted: false,
  timeLeft: 0,
  dayCompletedAt: 0,
  isAffirmationCompleted: false,
  isRitualCompleted: false,
  isBoostCompleted: false,
};

export const useUserProfileStorage = () => {
  const [userProfile, updateUserData] = useState<UserProfile>(defaultUserState);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsDataLoading(true);
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        updateUserData(JSON.parse(storedData));
      }
      setIsDataLoading(false);
    };

    fetchUserData();
  }, []);

  const setUserProfile = async (updatedData: UserProfile) => {
    const jsonValue = JSON.stringify(updatedData);
    console.log('updatedData', updatedData);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    updateUserData(updatedData);
  };

  const resetUserProfile = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    updateUserData(defaultUserState);
  };

  return {
    userProfile,
    isDataLoading,
    setUserProfile,
    resetUserProfile,
  };
};
