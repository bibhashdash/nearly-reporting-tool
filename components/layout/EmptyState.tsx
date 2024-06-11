import { View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

export const EmptyState = () => {
  const { colors } = useTheme();
  return (
    <View style={ {
      justifyContent: 'center',
      flex: 1,
      height: 500,
      alignItems: 'center',
      gap: 24
    } }>
      <Text variant="labelLarge" style={ {
        color: colors.shadow
      } }>
        It looks like there are no reports yet. Why not create one?
      </Text>
      <Avatar.Image size={ 180 } source={ require('../../assets/images/undraw_No_data_re_kwbl.png') } />
    </View>
  )
}