import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Appbar, MD3LightTheme as DefaultTheme, Provider } from 'react-native-paper';
import { enGB, registerTranslation } from 'react-native-paper-dates'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const theme = {
  colors: {
    ...DefaultTheme.colors,
    primary: '#0a9f48',
    secondary: '#00b0ec',
    tertiary: '#211818',
  }
}
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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
    <Provider theme={ theme }>
      <Stack>
        <Stack.Screen name="(tabs)" options={
          {
            header: () =>
              <Appbar.Header style={ {
                backgroundColor: '#ffffff'
              } }>
                <Appbar.Content title="NEARLY" />
                <Appbar.Action icon="account-circle" size={ 36 } onPress={ () => router.push('/profile') } />
              </Appbar.Header>
          } }
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="profile/index" options={ {
          title: 'Profile'
        } } />
      </Stack>
    </Provider>
  );
}
