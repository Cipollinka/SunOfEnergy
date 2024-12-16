import {View} from 'react-native';
import {useUserProfile, useUserProfileStorage} from '../user';

export const Progress = () => {
  const {userProfile} = useUserProfile();

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
    <View
      style={{
        maxWidth: 332,
        width: '100%',
        borderRadius: 500,
        height: 14,
        backgroundColor: '#FFF0C7',
      }}>
      <View
        style={{
          width: `${getProgressLevel()}%`,
          borderRadius: 500,
          height: '100%',
          backgroundColor: '#FFC934',
        }}
      />
    </View>
  );
};
