import { Button, Icon, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAuthContext } from 'nearly-contexts';

export default function LoginScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signIn } = useAuthContext();

  return (
    <ScrollView
      contentContainerStyle={ {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      } }
    >
      <View>
        <Snackbar visible={ showError } onDismiss={ () => setShowError(false) }>
          { errorMessage }
        </Snackbar>
      </View>
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
          <TextInput onChangeText={ text => setEmail(text) } textContentType="emailAddress" />
        </View>

        <View>
          <Text variant="labelLarge">
            Password
          </Text>
          <TextInput onChangeText={ text => setPassword(text) } secureTextEntry={ true } textContentType="password" />
        </View>

        <View style={ {
          alignItems: 'center',
        } }>
          <Button
            style={ {
              width: 200,
            } }
            mode="contained"
            onPress={ () => {
              signIn(email, password);
            } }
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
            onPress={ () => router.push('/signup') }
          >
            Signup
          </Button>
        </View>
      </View>

    </ScrollView>
  )
}