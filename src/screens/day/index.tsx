import {SafeAreaView, View} from 'react-native';
import React from 'react';
import {DayStepProgress, useUserProfile, useUserProfileStorage} from '../../user';
import {TodayDate} from '../../shared/today.tsx';
import {Progress} from '../../shared/progress.tsx';
import {RitualTask} from './ritual.tsx';
import {Button} from '../../shared/button.tsx';
import {AffirmationTask} from './affirmation.tsx';
import {BoostTask} from './boost.tsx';
import {ScreensPathes, useReactNavigation} from '../../shared/use-react-navigation.ts';

export const DayScreen = () => {
  const {userProfile, setUserProfile} = useUserProfile();
  const {navigateTo} = useReactNavigation();
  const getProgressLevel = () => {
    if (userProfile?.isBoostCompleted) {
      return 100;
    }
    if (userProfile?.isAffirmationCompleted) {
      return 80;
    }
    if (userProfile?.isRitualCompleted) {
      return 40;
    }
    return 20;
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: 15,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <TodayDate />
      <View
        style={{
          maxWidth: 332,
          width: '100%',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Progress />
        <View
          style={{
            marginTop: 22,
            position: 'relative',
            width: '100%',
            backgroundColor: '#EFEFEF',
            borderRadius: 14,
            padding: 17,
            paddingBottom: 33,
          }}>
          {userProfile?.dayStepProgress === DayStepProgress.Ritual && (
            <RitualTask />
          )}
          {userProfile?.dayStepProgress === DayStepProgress.Affirmation && (
            <AffirmationTask />
          )}
          {userProfile?.dayStepProgress === DayStepProgress.Boost && <BoostTask />}
          <View
            style={{
              position: 'absolute',
              top: -14,
              left: `${getProgressLevel()}%`,
              transform: [{translateX: getProgressLevel() === 100 ? -14 : 7}],
              width: 0,
              height: 0,
              borderLeftWidth: 14,
              borderRightWidth: 14,
              borderBottomWidth: 14,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: '#EFEFEF',
            }}
          />
        </View>
        {userProfile?.dayStepProgress === DayStepProgress.Ritual && (
          <Button
            disabled={Boolean(userProfile?.isStarted && userProfile?.timeLeft)}
            onPress={() => {
              if (userProfile?.isRitualCompleted || userProfile?.timeLeft) {
                setUserProfile({
                  ...userProfile!,
                  isStarted: false,
                  isRitualCompleted: true,
                  timeLeft: 0,
                  dayStepProgress: DayStepProgress.Affirmation,
                });
              } else {
                setUserProfile({
                  ...userProfile!,
                  isStarted: true,
                  timeLeft: 15*60,
                });
              }
            }}
            style={{
              marginTop: 15,
            }}>
            {Boolean(userProfile?.isRitualCompleted || userProfile?.timeLeft)
              ? 'Next step'
              : 'Start Now!'}
          </Button>
        )}
        {userProfile?.dayStepProgress === DayStepProgress.Boost && (
          <Button
            disabled={Boolean(userProfile?.isStarted && userProfile?.timeLeft)}
            onPress={async () => {
              if (userProfile?.isBoostCompleted || userProfile?.timeLeft) {
                await setUserProfile({
                  ...userProfile!,
                  isStarted: false,
                  timeLeft: 0,
                });
                navigateTo(ScreensPathes.Profile);
              } else {
                setUserProfile({
                  ...userProfile!,
                  isStarted: true,
                  timeLeft: 15*60,
                });
              }
            }}
            style={{
              marginTop: 15,
            }}>
            {Boolean(userProfile?.isBoostCompleted || userProfile?.timeLeft)
              ? 'Finish'
              : 'Start Now!'}
          </Button>
        )}
        {userProfile?.dayStepProgress === DayStepProgress.Affirmation && (
          <Button
            onPress={() => {
              setUserProfile({
                ...userProfile!,
                dayStepProgress: DayStepProgress.Boost,
                isAffirmationCompleted: true,
                isStarted: false,
                timeLeft: 0,
              });
            }}
            style={{
              marginTop: 15,
            }}>
            Next step
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};
