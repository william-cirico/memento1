import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Text variant="bodyMedium">Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },
});
