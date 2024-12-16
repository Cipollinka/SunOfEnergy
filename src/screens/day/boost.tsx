import {TimerElement} from '../../shared/timer.tsx';
import React, {useMemo} from 'react';
import {useUserProfile, useUserProfileStorage} from '../../user';
import {Card} from './card.tsx';
import {energyBoostIdeas} from '../../energyBoostIdeas.ts';

export const BoostTask = () => {
  const {userProfile, setUserProfile} = useUserProfile();
  const randomBoost = useMemo(() => {
    return energyBoostIdeas[
      Math.floor(Math.random() * energyBoostIdeas.length)
    ];
  }, []);

  return (
    <>
      {userProfile?.isStarted && (
        <TimerElement
          onTimeEnd={() => {
            setUserProfile({
              ...userProfile!,
              timeLeft: 0,
              isBoostCompleted: true,
              dayCompletedAt: new Date().getTime(),
            });
          }}
          onTimerDestroy={timeLeft => {
            if (!userProfile?.isStarted || timeLeft === 0) return;
            setUserProfile({
              ...userProfile!,
              timeLeft,
            });
          }}
          time={userProfile?.timeLeft || 0}
        />
      )}
      <Card
        tag="Energy Boost"
        title="Sunrise Stretch"
        description={randomBoost}
      />
    </>
  );
};
