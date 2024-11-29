import { theme } from "@/constants/theme";
import { auth } from "@/firebase/firebase-config";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { Alert, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as Yup from "yup";

// Esquema de validação com Yup
const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não correspondem")
    .required("A confirmação da senha é obrigatória"),
});

export default function SignUp() {
  const router = useRouter();

  const handleSignUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Sistema indisponível no momento");
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={signUpSchema}
        onSubmit={handleSignUp}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              label="E-mail"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <HelperText type="error" visible={true}>
                {errors.email}
              </HelperText>
            )}
            <TextInput
              label="Senha"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
              error={touched.password && !!errors.password}
            />
            {touched.password && errors.password && (
              <HelperText type="error" visible={true}>
                {errors.password}
              </HelperText>
            )}
            <TextInput
              label="Confirmar senha"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              secureTextEntry
              error={touched.confirmPassword && !!errors.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <HelperText type="error" visible={true}>
                {errors.confirmPassword}
              </HelperText>
            )}
            <Button mode="contained" onPress={handleSubmit as any}>
              Cadastrar
            </Button>
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
    backgroundColor: theme.colors?.background,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  form: {
    rowGap: 12,
  },
});
