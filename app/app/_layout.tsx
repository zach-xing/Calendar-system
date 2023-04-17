import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Slot } from "expo-router";
import React from "react";
import { useEffect } from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import Toast from "react-native-toast-message";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/LXGWWenKai-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <View style={{ height: StatusBar.currentHeight }}></View>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </ThemeProvider>
      <Toast topOffset={70} />
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            header: () => (
              <View style={{ height: StatusBar.currentHeight }}></View>
            ),
          }}
        >
          <Stack.Screen name='index' />
          <Stack.Screen name='home' />
          <Stack.Screen name='register' />
          <Stack.Screen
            name='schedule'
            options={{
              header: () => <HeaderBackButton />,
            }}
          />
          <Stack.Screen
            name='task'
            options={{
              header: () => <HeaderBackButton />,
            }}
          />
          <Stack.Screen
            name='memorandum'
            options={{
              header: () => <HeaderBackButton />,
            }}
          />
          <Stack.Screen name='modal' options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
      <Toast topOffset={70} /> */}
    </>
  );
}
