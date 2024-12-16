import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TodayDate} from '../../shared/today.tsx';
import {useEffect, useRef, useState} from 'react';
import {useUserProfile, useUserProfileStorage} from '../../user';
import {creativeActivities} from '../../creativeActivities.ts';

export const IdeasGenerator = () => {
  const {userProfile, setUserProfile} = useUserProfile();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState('');

  useEffect(() => {
    if (isGenerating) {
      setTimeout(() => {
        setGeneratedIdea(
          creativeActivities[
            Math.floor(Math.random() * creativeActivities.length)
          ],
        );
        setIsGenerating(false);
      }, 1000);
    }
  }, [isGenerating]);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isGenerating) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2, // Scale up to 1.2
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1, // Scale back to original size
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1); // Reset the scaling when not generating
    }
  }, [isGenerating, pulseAnim]);

  if (generatedIdea || isGenerating) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 15,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            maxWidth: 350,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TodayDate />

          <View
            style={{
              width: '100%',
              marginBottom: 'auto',
              marginTop: 'auto',
              borderRadius: 14,
              backgroundColor: '#EFEFEF',
              paddingTop: 17,
              paddingLeft: 17,
              paddingRight: 17,
              paddingBottom: 31,
              alignItems: 'center',
            }}>
            <Animated.Image
              style={{
                width: 119,
                height: 119,
                transform: [{scale: pulseAnim}],
              }}
              source={require('../../shared/assets/sparksbig.png')}
            />
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
                marginTop: 22,
                marginBottom: 11,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 14,
                  color: '#FFFFFF',
                }}>
                UNLOCKED
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Montserrat-ExtraBold',
                fontSize: 22,
                color: '#3D3D3D',
              }}>
              {isGenerating ? 'Generating idea for you' : 'Your idea:'}
            </Text>
            {generatedIdea && (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  gap: 28,
                  marginTop: 22,
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 17,
                    color: '#7B7B7B',
                    textAlign: 'center',
                  }}>
                  {generatedIdea}
                </Text>
                <View
                  style={{
                    gap: 12,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!userProfile) return;
                      if (!userProfile.ideas.includes(generatedIdea)) {
                        setUserProfile({
                          ...userProfile,
                          ideas: [...userProfile?.ideas, generatedIdea],
                        });
                      } else {
                        setUserProfile({
                          ...userProfile,
                          ideas: userProfile.ideas.filter(
                            affirmation => affirmation !== generatedIdea,
                          ),
                        });
                      }
                    }}
                    style={{
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: userProfile?.ideas.includes(generatedIdea)
                        ? '#FF9A35'
                        : 'white',
                      borderRadius: 4,
                    }}>
                    <Image
                      source={
                        userProfile?.ideas.includes(generatedIdea)
                          ? require('../../shared/assets/whirebookmark.png')
                          : require('../../shared/assets/bookmark.png')
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Share.share({
                        title: 'Positive Idea',
                        message: generatedIdea,
                      });
                    }}
                    style={{
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderRadius: 4,
                    }}>
                    <Image source={require('../../shared/assets/share.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }

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
          width: '100%',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 10,
          width: '100%',
        }}>
        <View
          style={{
            alignItems: 'center',
            paddingBottom: 10,
            maxWidth: 350,
            width: '100%',
          }}>
          <TodayDate />
          <View
            style={{
              marginTop: 23,
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 350,
              width: '100%',
              gap: 20,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={require('../../shared/assets/checks.png')}
            />
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
          <View
            style={{
              marginTop: 11,
              padding: 17,
              width: '100%',
              backgroundColor: '#EFEFEF',
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
                UNLOCKED
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
              You have opened access to idea generation
            </Text>
            <Text
              style={{
                maxWidth: 211,
                textAlign: 'center',
                fontFamily: 'Montserrat-Light',
                fontSize: 14,
                color: '#7B7B7B',
              }}>
              you can use it by clicking on the button below
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsGenerating(true)}
            style={{
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
