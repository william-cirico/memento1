import { theme } from "@/constants/theme";
import { Link, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function Index() {
  const router = useRouter();

  const handleLogin = () => {
    // Validação do login

    router.push("/add-edit-memory");
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title} variant="titleLarge">Memento</Text>
      <View style={styles.form}>
        <TextInput label="E-mail" />
        <TextInput label="Senha" secureTextEntry />
        <Button icon="login-variant" mode="contained">Entrar</Button>
        <Link href="/sign-up" asChild>
          <Button>Não possui uma conta? Cadastrar-se</Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    backgroundColor: theme.colors?.background
  },
  title: {
    textAlign: "center",
    marginBottom: 16
  },
  form: {
    rowGap: 12
  }
});
