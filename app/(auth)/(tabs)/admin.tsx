import { Text, View } from 'react-native';
import { useAuthContext } from 'nearly-contexts';

export default function AdminScreen() {
  const { nearlyUser } = useAuthContext();
  return (
    <View>
      <Text>Your role is</Text>
      <Text>
        { nearlyUser?.role }
      </Text>
    </View>
  );
}
