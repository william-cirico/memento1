import { Loader } from "@/components/Loader";
import { MemoryCard } from "@/components/MemoryCard";
import { MemoryList } from "@/components/MemoryList";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

export default function Home() {
  const router = useRouter();
  const user = useUser();

  if (!user) {
    return <Loader />
  }

  return (
    <View
      style={styles.container}
    >
      <MemoryList userId={user.uid} />
      <FAB 
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/add-edit-memory")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
    zIndex: 1,
  },
});

