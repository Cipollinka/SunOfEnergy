import {
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useUserProfile, useUserProfileStorage} from '../user';
import {Card} from './day/card.tsx';

export const SavesScreen = () => {
  const {userProfile, setUserProfile} = useUserProfile();
  const [currentScreen, setCurrentScreen] = useState<'affirmations' | 'ideas'>(
    'affirmations',
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 15,
      }}>
      <Text
        style={{
          fontSize: 22,
          fontFamily: 'Montserrat-Bold',
          color: '#3D3D3D',
          textAlign: 'center',
          marginBottom: 22,
        }}>
        Saved
      </Text>
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          maxWidth: 350,
          width: '100%',

          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => setCurrentScreen('affirmations')}
          style={{
            flex: 0.5,
            borderBottomWidth: 1,
            borderBottomColor:
              currentScreen === 'affirmations' ? '#FF9A35' : '#DFDFDF',
            paddingBottom: 6,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000000',
              fontFamily: 'Montserrat-Regular',
              fontSize: 15,
            }}>
            Affirmations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentScreen('ideas')}
          style={{
            flex: 0.5,
            borderBottomWidth: 1,
            borderBottomColor:
              currentScreen === 'ideas' ? '#FF9A35' : '#DFDFDF',
            paddingBottom: 6,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000000',
              fontFamily: 'Montserrat-Regular',
              fontSize: 15,
            }}>
            Ideas
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 20,
        }}>
        {currentScreen === 'affirmations' &&
          (!userProfile?.affirmations.length ? (
            <Text
              style={{
                textAlign: 'center',
                color: '#D3D3D3',
                fontFamily: 'Montserrat-Regular',
                fontSize: 15,
                marginTop: 54,
              }}>
              There is no saved affirmations now
            </Text>
          ) : (
            userProfile?.affirmations.map((affirmation, index) => (
              <View
                key={index}
                style={{
                  marginTop: 22,
                  position: 'relative',
                  width: '100%',
                  backgroundColor: '#EFEFEF',
                  borderRadius: 14,
                  padding: 17,
                  paddingBottom: 33,
                }}>
                <Card tag="Positive Affirmation" title={affirmation} />
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    gap: 12,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!userProfile) return;
                      if (!userProfile.affirmations.includes(affirmation)) {
                        setUserProfile({
                          ...userProfile,
                          affirmations: [
                            ...userProfile?.affirmations,
                            affirmation,
                          ],
                        });
                      } else {
                        setUserProfile({
                          ...userProfile,
                          affirmations: userProfile.affirmations.filter(
                            userAffirmation => userAffirmation !== affirmation,
                          ),
                        });
                      }
                    }}
                    style={{
                      backgroundColor: userProfile?.affirmations.includes(
                        affirmation,
                      )
                        ? '#FF9A35'
                        : 'white',
                      borderRadius: 4,
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={
                        userProfile?.affirmations.includes(affirmation)
                          ? require('../shared/assets/whirebookmark.png')
                          : require('../shared/assets/bookmark.png')
                      }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      Share.share({
                        title: 'Positive Affirmation',
                        message: affirmation,
                      });
                    }}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 4,
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={require('../shared/assets/share.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ))}

        {currentScreen === 'ideas' &&
          (!userProfile?.ideas.length ? (
            <Text
              style={{
                textAlign: 'center',
                color: '#D3D3D3',
                fontFamily: 'Montserrat-Regular',
                fontSize: 15,
                marginTop: 54,
              }}>
              There is no saved ideas
            </Text>
          ) : (
            userProfile?.ideas.map((idea, index) => (
              <View
                key={index}
                style={{
                  marginTop: 22,
                  position: 'relative',
                  width: '100%',
                  backgroundColor: '#EFEFEF',
                  borderRadius: 14,
                  padding: 17,
                  paddingBottom: 33,
                }}>
                <View
                  style={{
                    gap: 18,
                  }}>
                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      gap: 9,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../shared/assets/sparkspurple.png')}
                    />
                    <Text
                      style={{
                        fontFamily: 'Montserrat-ExtraBold',
                        fontSize: 22,
                        color: '#3D3D3D',
                      }}>
                      Generated idea
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'Montserrat-Regular',
                      color: '#7B7B7B',
                    }}>
                    {idea}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    gap: 12,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!userProfile) return;
                      if (!userProfile.ideas.includes(idea)) {
                        setUserProfile({
                          ...userProfile,
                          ideas: [...userProfile?.ideas, idea],
                        });
                      } else {
                        setUserProfile({
                          ...userProfile,
                          ideas: userProfile.ideas.filter(
                            userIdea => userIdea !== idea,
                          ),
                        });
                      }
                    }}
                    style={{
                      backgroundColor: userProfile?.ideas.includes(idea)
                        ? '#FF9A35'
                        : 'white',
                      borderRadius: 4,
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={
                        userProfile?.ideas.includes(idea)
                          ? require('../shared/assets/whirebookmark.png')
                          : require('../shared/assets/bookmark.png')
                      }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      Share.share({
                        title: 'Positive Idea',
                        message: idea,
                      });
                    }}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 4,
                      width: 38,
                      height: 38,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image source={require('../shared/assets/share.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};
