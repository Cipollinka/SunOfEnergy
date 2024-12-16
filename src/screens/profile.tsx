import {FC, useEffect} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {DayStepProgress, useUserProfile, useUserProfileStorage} from '../user';
import {
  ScreensPathes,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';
import {Progress} from '../shared/progress.tsx';

export const ProfileScreen: FC = () => {
  const {userProfile, setUserProfile} = useUserProfile();
  const {navigateTo} = useReactNavigation();
  const isNewDay = (lastCompletedAt: number) => {
    const lastDate = new Date(lastCompletedAt);
    const currentDate = new Date();

    // Порівнюємо лише дату без часу
    return (
      lastDate.getFullYear() !== currentDate.getFullYear() ||
      lastDate.getMonth() !== currentDate.getMonth() ||
      lastDate.getDate() !== currentDate.getDate()
    );
  };

  const newDay = isNewDay(userProfile?.dayCompletedAt || 0);

  useEffect(() => {
    if (!userProfile || !newDay) return;
    const isAllCompleted =
      userProfile.isRitualCompleted &&
      userProfile.isAffirmationCompleted &&
      userProfile.isBoostCompleted;
    if (newDay && isAllCompleted) {
      setUserProfile({
        ...userProfile,
        isBoostCompleted: false,
        isAffirmationCompleted: false,
        isRitualCompleted: false,
        dayStepProgress: DayStepProgress.Ritual,
        isStarted: false,
      });
    }
  }, [newDay]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 15,
      }}>
      <Text
        style={{
          color: '#3D3D3D',
          fontSize: 22,
          marginBottom: 30,
          fontFamily: 'Montserrat-Bold',
        }}>
        My profile
      </Text>
      <Image
        borderRadius={500}
        source={require('../shared/assets/profile.png')}
        style={{
          marginBottom: 30,
        }}
      />
      {isNewDay(userProfile?.dayCompletedAt || 0) && (
        <View
          style={{
            maxWidth: 350,
            width: '100%',
            gap: 20,
          }}>
          <Progress />
          <TouchableOpacity
            onPress={() => navigateTo(ScreensPathes.Day)}
            style={{
              borderRadius: 500,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FF9A35',
              borderWidth: 1,
              width: '100%',
              height: 56,
              borderColor: '#ED721B',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: 'white',
                fontFamily: 'Montserrat-ExtraBold',
              }}>
              Start your day
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!isNewDay(userProfile?.dayCompletedAt || 0) && (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 350,
            width: '100%',
            gap: 20,
          }}>
          <Image source={require('../shared/assets/checks.png')} />
          <View
            style={{
              width: '100%',
              height: 14,
              borderRadius: 500,
              backgroundColor: '#FFC934',
            }}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-ExtraBold',
              fontSize: 22,
              textAlign: 'center',
              color: '#3D3D3D',
            }}>
            The energy bar is full!
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Light',
              fontSize: 14,
              textAlign: 'center',
              color: '#7B7B7B',
            }}>
            You started your day right, come back for more boosts tomorrow!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
