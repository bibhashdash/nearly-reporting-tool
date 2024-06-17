import { Text, View } from 'react-native';
import {useAuthContext} from "nearly-contexts";

export default function StatsScreen() {
  const {nearlyUser} = useAuthContext();
  return (
    <View>
      <Text>
        {nearlyUser?.displayName}
      </Text>
    </View>
  );
}
