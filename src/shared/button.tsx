import {FC} from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  children: string;
  style?: ViewStyle;
}

export const Button: FC<ButtonProps> = ({
  children,
  onPress,
  disabled,
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        opacity: disabled ? 0.5 : 1,
        borderRadius: 500,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF9A35',
        ...style,
      }}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 17,
          fontFamily: 'Montserrat-ExtraBold',
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
