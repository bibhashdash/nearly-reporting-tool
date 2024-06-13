import { ScrollView } from 'react-native';
import { ReactNode } from 'react';

export const ProtectedPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollView style={ {
      paddingVertical: 24,
      paddingHorizontal: 12,
      flex: 1,
    } }>
      { children }
    </ScrollView>
  )
}