import {Image, View} from 'react-native';

import {ReactNavigationProvider} from './react-navigation-provider.tsx';
import {Screens} from '../screens';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {UserProfileProvider} from './userProfileProvider.tsx';
import React from 'react';

export const MainApp = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Image
        source={require('../shared/assets/bg.png')}
        style={{flex: 1, position: 'absolute', width: '100%', height: '100%', opacity: 0.4}}
      />
      <UserProfileProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer theme={navTheme}>
            <ReactNavigationProvider>
              <Screens />
            </ReactNavigationProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </UserProfileProvider>
    </View>
  );
};

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
