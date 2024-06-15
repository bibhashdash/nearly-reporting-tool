import { View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import { ReactNode } from 'react';

export interface EmptyStateProps {
  children: ReactNode,
}
export const EmptyState = ({ children }: EmptyStateProps) => {
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
        { children }
      </Text>
      <Avatar.Image size={ 180 } source={ require('../../assets/images/undraw_No_data_re_kwbl.png') } />
    </View>
  )
}