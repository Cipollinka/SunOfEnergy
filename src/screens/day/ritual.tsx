import {TimerElement} from '../../shared/timer.tsx';
import React, {useMemo} from 'react';
import {useUserProfile, useUserProfileStorage} from '../../user';
import {Card} from './card.tsx';
import {rituals} from '../../rituals.ts';

export const RitualTask = () => {
  const {userProfile, setUserProfile} = useUserProfile();

  const randomRituals = useMemo(() => {
    return rituals[Math.floor(Math.random() * rituals.length)];
  }, []);
  return (
    <>
      {userProfile?.isStarted && (
        <TimerElement
          onTimeEnd={() => {
            setUserProfile({
              ...userProfile!,
              timeLeft: 0,
              isRitualCompleted: true,
            });
          }}
          onTimerDestroy={timeLeft => {
            if (
              !userProfile?.isStarted ||
              timeLeft === 0 ||
              userProfile.isRitualCompleted
            )
              return;
            setUserProfile({
              ...userProfile!,
              timeLeft,
            });
          }}
          time={userProfile?.timeLeft || 0}
        />
      )}
      <Card
        tag="Daily Ritual"
        title={randomRituals.title}
        description={randomRituals.description}
      />
    </>
  );
};
