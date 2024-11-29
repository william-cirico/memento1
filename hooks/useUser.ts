import { auth } from "@/firebase/firebase-config";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsub();
    }, []);

    return user;
}