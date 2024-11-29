import { useMemories } from "@/hooks/useMemories";
import { FlatList, StyleSheet, View } from "react-native";
import { MemoryCard } from "./MemoryCard";
import { Text } from "react-native-paper";
import { Loader } from "./Loader";

interface Props {
  userId: string;
}

export function MemoryList({ userId }: Props) {
  const { memories, loading } = useMemories(userId);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : memories.length ? (
        <FlatList
          data={memories}
          renderItem={({ item }) => <MemoryCard memory={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyListText} variant="bodyMedium">
          Nenhuma memória cadastrada
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyListText: {
    textAlign: "center",
  },
});
