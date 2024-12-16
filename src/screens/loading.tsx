import {ImageBackground, Text, View} from 'react-native';

export const LoadingScreen = () => {
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
          marginBottom: '20%',
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
          Welcome to Sun of Energy!
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            textAlign: 'center',
            fontSize: 17,
            color: '#000000',
          }}>
          An app designed to help you recharge and find inspiration every day. —
          Discover how simple rituals can fill your day with light and
          positivity.
        </Text>
      </View>
    </ImageBackground>
  );
};
