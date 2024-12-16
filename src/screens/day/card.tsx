import React, {FC, ReactNode} from 'react';
import {Text, View} from 'react-native';

interface Props {
  tag: string;
  title: string;
  description?: string;
}

export const Card: FC<Props> = ({tag, title, description}) => {
  return (
    <View
      style={{
        gap: 11,
        alignItems: 'flex-start',
      }}>
      <View
        style={{
          minWidth: 140,
          paddingRight: 18,
          paddingLeft: 18,
          backgroundColor: '#FF9A35',
          borderRadius: 15,
          height: 24,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            lineHeight: 17,
            fontFamily: 'Montserrat-Bold',
            fontSize: 14,
            color: 'white',
          }}>
          {tag}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: 22,
          color: '#3D3D3D',
        }}>
        {title}
      </Text>
      {description && (
        <Text
          style={{
            fontFamily: 'Montserrat-Light',
            fontSize: 14,
            color: '#7B7B7B',
          }}>
          {description}
        </Text>
      )}
    </View>
  );
};
