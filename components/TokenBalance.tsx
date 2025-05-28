'use client';
import {Badge, Avatar} from "@heroui/react";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/client";

export function TokenBalance({ userId }: { userId: string }) {
    const [tokens, setTokens] = useState<number>(0);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", userId), (docSnap) => {
            setTokens(docSnap.data()?.tokenBalance || 0);
        });
        return () => unsub();
    }, [userId]);
  const color = tokens > 20 ? "success" : "danger";
    return (
        <div className="flex flex-col items-center">
            <Badge color={color} content={tokens} size={"sm"}>
                <Avatar radius="full" src="/binance.png" className={"w-6 h-6"} />
            </Badge>
            <p className={"text-xs"}>Tokens</p>
        </div>
    );
}
