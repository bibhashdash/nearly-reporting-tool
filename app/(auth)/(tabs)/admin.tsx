import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAuthContext } from 'nearly-contexts';

export default function AdminScreen() {
  const { nearlyUser } = useAuthContext();
  return (
    <ScrollView style={ {
      paddingVertical: 24,
      paddingHorizontal: 12,
      flex: 1,
    } }>
      <View style={ {
        gap: 24,
        flex: 1,
        alignItems: 'center'
      } }>
        <Text variant="titleLarge">Hi { nearlyUser?.displayName }!</Text>
        <Text>Your role is</Text>
        <Text>
          { nearlyUser?.role }
        </Text>
      </View>
    </ScrollView>
  );
}
