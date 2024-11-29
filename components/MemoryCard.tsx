import { db } from "@/firebase/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Alert } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export interface Memory {
    id: string;
    title: string;
    image: string;
    content: string;
    userId: string;
}

interface Props {
    memory: Memory;
}

export function MemoryCard({ memory }: Props) {
    const [loading, setLoading] = useState(false);

    const handleRemove = async () => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, "memories", memory.id));            
        } catch (error) {
            Alert.alert("Erro!", "Falha ao remover a memória");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <Card.Title title={memory.title} />
            <Card.Cover source={{ uri: memory.image }} />
            <Card.Content>
                <Text variant="bodyMedium">{memory.content}</Text>
            </Card.Content>
            <Card.Actions>
                <Button loading={loading} onPress={handleRemove}>Remover</Button>
            </Card.Actions>
        </Card>
    )
}