import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Appbar } from 'react-native-paper';

import { useColorScheme } from 'nearly-utilities';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={ colorScheme === 'dark' ? DarkTheme : DefaultTheme }>
      <Stack>
        <Stack.Screen name="(tabs)" options={
          {
            header: () =>
              <Appbar.Header>
                <Appbar.Content title="NEARLY" />
                <Appbar.Action icon="account" onPress={ () => router.push('/profile') } />
              </Appbar.Header>
          } }
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
