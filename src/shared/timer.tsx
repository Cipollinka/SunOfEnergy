import {Image, Text, TouchableOpacity, View} from 'react-native';
import {FC, useEffect, useRef, useState} from 'react';

interface Props {
  time: number;
  onTimeEnd: () => void;
  onTimerDestroy: (seconds: number) => void;
}

export const TimerElement: FC<Props> = ({time, onTimeEnd, onTimerDestroy}) => {
  const defaultTime = 15 * 60;
  const [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => {
          if (seconds === 0) {
            onTimeEnd();
            setIsActive(false);
            return seconds;
          }
          return seconds - 1;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if (seconds === 0) {
      onTimeEnd();
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const ref = useRef(0);

  useEffect(() => {
    ref.current = seconds;
  }, [seconds]);

  useEffect(() => {
    return () => {
      onTimerDestroy(ref.current);
    };
  }, []);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(defaultTime);
    setIsActive(false);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 26,
        paddingRight: 26,
        marginBottom: 12,
      }}>
      <Text
        style={{
          fontSize: 64,
          fontFamily: 'Montserrat-ExtraBold',
          color: '#FFC934',
        }}>
        {formatSecondsToMMSS(seconds)}
      </Text>
      <View
        style={{
          width: 36,
          gap: 8,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          disabled={seconds === 0}
          style={{
            opacity: isActive ? 1 : 0.5,
          }}
          onPress={toggle}>
          <Image source={require('../shared/assets/pause.png')} />
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#D9D9D9',
          }}></View>
        <TouchableOpacity onPress={reset}>
          <Image source={require('../shared/assets/stop.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

function formatSecondsToMMSS(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
