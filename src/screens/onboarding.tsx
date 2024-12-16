import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {useUserProfile, useUserProfileStorage} from '../user';
import {
  ScreensPathes,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';

export const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {navigateTo} = useReactNavigation();
  const {userProfile, setUserProfile} = useUserProfile();
  const {
    title = 'Welcome to Sun of Energy!',
    description = 'An app designed to help you recharge and find inspiration every day. — Discover how simple rituals can fill your day with light and positivity.',
  } = STEPS[currentStep];
  return (
    <ImageBackground
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
      source={require('../shared/assets/onboardbg.png')}>
      <View
        style={{
          maxWidth: 342,
          width: '100%',
          marginBottom: '10%',
          gap: 20,
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 26,
            color: '#FF9A35',
            fontFamily: 'DelaGothicOne-Regular',
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            textAlign: 'center',
            fontSize: 17,
            color: '#000000',
          }}>
          {description}
        </Text>

        <TouchableOpacity
          onPress={async () => {
            if (currentStep === STEPS.length - 1) {
              await setUserProfile({
                ...userProfile!,
                isOnboarded: true,
              });
              navigateTo(ScreensPathes.Profile);
            } else {
              setCurrentStep(currentStep + 1);
            }
          }}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#FF9A35',
            width: '100%',
            height: 56,
            borderRadius: 500,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-ExtraBold',
              color: '#FFFFFF',
              fontSize: 17,
            }}>
            {currentStep === 0 ? 'Ok!' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const STEPS = [
  {
    title: 'Welcome to Sun of Energy!',
    description:
      'An app designed to help you recharge and find inspiration every day. — Discover how simple rituals can fill your day with light and positivity.',
  },
  {
    title: 'Daily Energy Rituals',
    description:
      'Get started with short, energizing tasks to boost your mood and creativity. Each day, you’ll receive a new ritual designed to awaken your inner energy.',
  },
  {
    title: 'Positive Reflections',
    description:
      'Enjoy daily affirmations and reflections on life, designed to help you start your day with a positive outlook and keep your energy high.',
  },
  {
    title: 'Personalized Boosts',
    description:
      "Based on your time of day, Sun of Energy will offer personalized tips to recharge—whether it's a morning stroll, a midday break, or an evening reflection.",
  },
];
