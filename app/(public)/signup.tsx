import { Button, Icon, Text, TextInput, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';

export default function Signup() {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={ {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      } }>
      <View style={ {
        alignItems: 'center'
      } }>
        <Icon size={ 150 } color={ colors.primary } source="chart-box-plus-outline" />
        <Text
          style={ {
            color: colors.primary,
            fontWeight: 'bold'
          } }
          variant="displayLarge">
          NEARLY
        </Text>
      </View>

      <View style={ {
        width: '100%',
        paddingHorizontal: 50,
        gap: 20
      } }>
        <View>
          <Text variant="labelLarge">
            Email
          </Text>
          <TextInput textContentType="emailAddress" />
        </View>

        <View>
          <Text variant="labelLarge">
            Password
          </Text>
          <TextInput secureTextEntry={ true } textContentType="password" />
        </View>

        <View>
          <Text variant="labelLarge">
            Re-type Password
          </Text>
          <TextInput secureTextEntry={ true } textContentType="password" />
        </View>

        <View style={ {
          alignItems: 'center',
        } }>
          <Button
            style={ {
              width: 200,
            } }
            mode="contained"
          >
            Signup
          </Button>
        </View>

        <View style={ {
          alignItems: 'center',
        } }>
          <Button
            style={ {
              width: 200,
            } }
            mode="outlined"
            onPress={ () => router.back() }
          >
            Login
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}