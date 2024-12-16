import {Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IdeasGenerator} from './ideas-generator.tsx';
import {useUserProfile, useUserProfileStorage} from '../../user';
import {TodayDate} from '../../shared/today.tsx';

export const IdeasScreen = () => {
  const {userProfile, setUserProfile} = useUserProfile();
  const isTasksCompleted =
    userProfile?.isBoostCompleted &&
    userProfile?.isAffirmationCompleted &&
    userProfile?.isRitualCompleted;

  if (isTasksCompleted) {
    return <IdeasGenerator />;
  } else
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 15,
          alignItems: 'center',
        }}>
        <ScrollView
          style={{
            flex: 1,
            maxWidth: 350,
            width: '100%',
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <TodayDate />

          <View
            style={{
              marginTop: 11,
              padding: 17,
              width: '100%',
              backgroundColor: '#EFEFEF',
              opacity: 0.5,
              alignItems: 'center',
              borderRadius: 14,
              paddingBottom: 24,
            }}>
            <View
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 14,
                backgroundColor: '#FF9A35',
                paddingTop: 3,
                paddingBottom: 4,
                paddingLeft: 27,
                paddingRight: 27,
                marginBottom: 11,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 14,
                  color: '#FFFFFF',
                }}>
                LOCKED
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22,
                color: '#3D3D3D',
                fontFamily: 'Montserrat-ExtraBold',
                marginBottom: 17,
              }}>
              To open this feature, fill in today's energy scale completely
            </Text>
          </View>
          <TouchableOpacity
            disabled
            style={{
              opacity: 0.5,
              marginTop: 17,
              width: '100%',
            }}>
            <ImageBackground
              borderRadius={500}
              style={{
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 11,
              }}
              source={require('../../shared/assets/generate.png')}>
              <Image source={require('../../shared/assets/sparksbutton.png')} />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 17,
                  fontFamily: 'Montserrat-ExtraBold',
                }}>
                Use random idea
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
};
