import { Memory } from "@/components/MemoryCard";
import { db } from "@/firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useMemories = (userId: string | undefined) => {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const q = query(
            collection(db, "memories"),
            where("userId", "==", userId)
        );

        // Definindo o listener de alterações no DB
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                setMemories(
                    querySnapshot.docs.map(
                        (doc) => ({ id: doc.id, ...doc.data() } as Memory)
                    )
                );
                setLoading(false);
            },
            () => {
                setLoading(false);
            }, // Em caso de erro
        );

        // Removendo o listener
        return () => unsubscribe();
    }, []);

    return { memories, loading };
};
