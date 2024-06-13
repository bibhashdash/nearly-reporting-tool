import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAuthContext } from 'nearly-contexts';
import { ProtectedPageWrapper } from 'nearly-components';

export default function AdminScreen() {
  const { nearlyUser } = useAuthContext();
  return (
    <ProtectedPageWrapper>
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
    </ProtectedPageWrapper>
  );
}
