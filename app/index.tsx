import { Button, Icon, Text, TextInput, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';

export default function LoginScreen() {
  const { colors } = useTheme();
  return (
    <ScrollView
      contentContainerStyle={ {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      } }
    >
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
            Username
          </Text>
          <TextInput />
        </View>

        <View>
          <Text variant="labelLarge">
            Password
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
            Login
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
          >
            Signup
          </Button>
        </View>
      </View>

    </ScrollView>
  )
}