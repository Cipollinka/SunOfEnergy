import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {OnboardingScreen} from './onboarding.tsx';
import {LoadingScreen} from './loading.tsx';
import {
  ScreensPathes,
  useReactNavigation,
} from '../shared/use-react-navigation.ts';
import {ProfileScreen} from './profile.tsx';
import {DayScreen} from './day';
import {IdeasScreen} from './ideas';
import {SavesScreen} from './saves.tsx';

const Stack = createStackNavigator();
export const Screens = () => {
  return (
    <View style={styles.wrapper}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={ScreensPathes.Loading}>
        <Stack.Screen name={ScreensPathes.Loading} component={LoadingScreen} />
        <Stack.Screen name={ScreensPathes.Profile} component={ProfileScreen} />
        <Stack.Screen name={ScreensPathes.Ideas} component={IdeasScreen} />
        <Stack.Screen name={ScreensPathes.Saved} component={SavesScreen} />
        <Stack.Screen name={ScreensPathes.Day} component={DayScreen} />
        <Stack.Screen
          name={ScreensPathes.Onboarding}
          component={OnboardingScreen}
        />
      </Stack.Navigator>

      <Navigation />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const Navigation = () => {
  const {openedScreen, navigateTo} = useReactNavigation();
  console.log('currentScreen', openedScreen);
  if (
    !openedScreen ||
    openedScreen === ScreensPathes.Onboarding ||
    openedScreen === ScreensPathes.Loading
  )
    return null;
  return (
    <View
      style={{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 37,
        backgroundColor: '#FF9A35',
      }}>
      <SafeAreaView
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'space-between',
          maxWidth: 248,
          width: '100%',
        }}>
        <TouchableOpacity onPress={() => navigateTo(ScreensPathes.Saved)}>
          <Image source={require('../shared/assets/navshare.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo(ScreensPathes.Ideas)}>
          <Image source={require('../shared/assets/navlight.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo(ScreensPathes.Profile)}>
          <Image source={require('../shared/assets/navprofile.png')} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
