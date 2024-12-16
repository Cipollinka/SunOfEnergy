import {Text} from 'react-native';

export const TodayDate = () => {
  return (
    <Text
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 50,
        backgroundColor: '#EFEFEF',
        paddingTop: 4,
        paddingLeft: 17,
        paddingRight: 17,
        paddingBottom: 7,
      }}>
      {formatDate(new Date())}
    </Text>
  );
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
