import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { ReactNode } from 'react';

export interface EmptyStateProps {
  children: ReactNode,
}
export const EmptyState = ({ children }: EmptyStateProps) => {

  return (
    <View style={ {
      justifyContent: 'center',
      flex: 1,
      height: 500,
      alignItems: 'center',
      gap: 24
    } }>
      <View>
        { children }
      </View>
      <Avatar.Image size={ 180 } source={ require('../../assets/images/undraw_No_data_re_kwbl.png') } />
    </View>
  )
}