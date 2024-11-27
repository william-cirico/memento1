import { theme } from "@/constants/theme";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Página de Login",
            headerStyle: {
              backgroundColor: "#000"
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="home" />
        <Stack.Screen name="add-edit-memory" />
        <Stack.Screen name="sign-up" options={{ title: "Cadastro" }} />
      </Stack>
    </PaperProvider>
  );
}
