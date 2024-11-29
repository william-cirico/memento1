import { Memory } from "@/components/MemoryCard";
import { db } from "@/firebase/firebase-config";
import { useUser } from "@/hooks/useUser";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as Yup from "yup";

const memorySchema = Yup.object().shape({
  title: Yup.string().required("O título é obrigatório"),
});

export default function AddMemory() {
  const user = useUser();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Função para salvar ou atualizar uma memória
  const handleSave = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    if (!user) return;

    // Dados que serão salvos no Firestore
    const memoryData: Partial<Memory> = {
      title,
      content,
      image: image || "",
      userId: user.uid,
    };

    try {
      setLoading(true);

      // Para atualizar uma memória existente ou cria uma nova
      // await setDoc(doc(db, "memories", id), memoryData);

      await addDoc(collection(db, "memories"), memoryData);

      // Navega de volta para a tela inicial após salvar
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao salvar a memória");
    } finally {
      setLoading(false);
    }
  };

  // Função para abrir a câmera e selecionar uma imagem
  const handleSelectImage = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Permissão para usar a câmera é necessária."
      );
      return;
    }

    // Abre a câmera e permite tirar uma foto
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          title: "",
          content: "",
        }}
        validationSchema={memorySchema}
        onSubmit={handleSave}
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
              label="Título"
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              error={touched.title && !!errors.title}
            />
            {touched.title && errors.title && (
              <HelperText type="error" visible={true}>
                {errors.title}
              </HelperText>
            )}
            <TextInput
              label="Descrição"
              value={values.content}
              onChangeText={handleChange("content")}
              onBlur={handleBlur("content")}
              secureTextEntry
              multiline
              numberOfLines={5}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 200, marginTop: 12 }}
                resizeMode="contain"
              />
            )}
            <Button mode="outlined" onPress={handleSelectImage}>
              Adicionar Imagem
            </Button>
            <Button
              icon="login-variant"
              mode="contained"
              onPress={handleSubmit as any}
              loading={loading}
            >
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
    padding: 32,
  },
  form: {
    rowGap: 12,
  },
});
