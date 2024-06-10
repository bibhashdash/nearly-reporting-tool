import { useFonts } from 'expo-font';
import { MD3LightTheme as DefaultTheme, Provider } from 'react-native-paper';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { enGB, registerTranslation } from 'react-native-paper-dates'
import { AuthContextProvider } from 'nearly-contexts';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const theme = {
    colors: {
      ...DefaultTheme.colors,
      primary: '#0a9f48',
      secondary: '#00b0ec',
      tertiary: '#211818',
    }
  }
  useEffect(() => {
    registerTranslation('en-GB', enGB)

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <Provider theme={ theme }>
        <Stack>
          <Stack.Screen name="(auth)/(tabs)" options={ {
            headerShown: false,
          } } />
          <Stack.Screen name="index" options={ {
            headerShown: false,
          } } />
          <Stack.Screen name="(public)/signup" />
        </Stack>
      </Provider>
    </AuthContextProvider>
  );
}
