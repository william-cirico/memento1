import { theme } from "@/constants/theme";
import { auth } from "@/firebase/firebase-config";
import { Stack, useRouter } from "expo-router";
import { IconButton, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.replace("/");
  };

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
        <Stack.Screen 
          name="home" 
          options={{ 
            title: "Memórias",
            headerRight: (props) => <IconButton onPress={handleLogout} {...props} icon="logout-variant" />
          }} 
        />
        <Stack.Screen name="add-edit-memory" />
        <Stack.Screen name="sign-up" options={{ title: "Cadastro" }} />
      </Stack>
    </PaperProvider>
  );
}
