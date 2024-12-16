import React from 'react';
import {useUserProfile, useUserProfileStorage} from '../../user';
import {Card} from './card.tsx';
import {Image, Share, TouchableOpacity, View} from 'react-native';
import {AFFIRMATIONS} from '../../affirmations.ts';

const getRandomAffirmation = () => {
  return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
};
export const AffirmationTask = () => {
  const {userProfile, setUserProfile} = useUserProfile();

  const [randomAffirmation, setRandomAffirmation] = React.useState(
    getRandomAffirmation(),
  );
  return (
    <>
      <Card tag="Positive Affirmation" title={randomAffirmation} />
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          gap: 12,
        }}>
        <TouchableOpacity
          onPress={() => {
            setRandomAffirmation(getRandomAffirmation());
          }}
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
            width: 38,
            height: 38,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../../shared/assets/reload.png')} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (!userProfile) return;
            if (!userProfile.affirmations.includes(randomAffirmation)) {
              setUserProfile({
                ...userProfile,
                affirmations: [...userProfile?.affirmations, randomAffirmation],
              });
            } else {
              setUserProfile({
                ...userProfile,
                affirmations: userProfile.affirmations.filter(
                  affirmation => affirmation !== randomAffirmation,
                ),
              });
            }
          }}
          style={{
            backgroundColor: userProfile?.affirmations.includes(randomAffirmation)
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
              userProfile?.affirmations.includes(randomAffirmation)
                ? require('../../shared/assets/whirebookmark.png')
                : require('../../shared/assets/bookmark.png')
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Share.share({
              title: 'Positive Affirmation',
              message: randomAffirmation,
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
          <Image source={require('../../shared/assets/share.png')} />
        </TouchableOpacity>
      </View>
    </>
  );
};
