import { theme } from "@/constants/theme";
import { auth } from "@/firebase/firebase-config";
import { useUser } from "@/hooks/useUser";
import { Link, useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

export default function Index() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.replace("/home");
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError &&
        error.code === "auth/invalid-credential"
      ) {
        Alert.alert("Ops!", "E-mail ou senha inválidos");
      } else {
        Alert.alert("Error!", "Serviço indisponível no momento");
      }
    } finally {
      setLoading(false);
    }  
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title} variant="titleLarge">Memento</Text>
      <Formik
        initialValues={{ 
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
        validationSchema={loginSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
          <View style={styles.form}>
            <TextInput 
              label="E-mail" 
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")} 
              value={values.email}
              error={touched.email && !!errors.email}
            />
            { touched.email && !!errors.email && (
              <HelperText type="error">
                {errors.email}
              </HelperText>
            )}
            <TextInput 
              label="Senha" 
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")} 
              value={values.password}
              error={touched.password && !!errors.password}
            />
            { touched.password && !!errors.password && (
              <HelperText type="error">
                {errors.password}
              </HelperText>
            )}
            <Button loading={loading} disabled={!isValid} onPress={() => handleSubmit()} icon="login-variant" mode="contained">Entrar</Button>
            <Link href="/sign-up" asChild>
              <Button>Não possui uma conta? Cadastrar-se</Button>
            </Link>
          </View>
        )}
      </Formik>
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
