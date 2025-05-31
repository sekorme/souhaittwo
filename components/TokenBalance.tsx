'use client';
import {Badge, Avatar} from "@heroui/react";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/client";
import Image from "next/image";
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
        <div className="flex flex-col mt-3 items-center">
            <Badge color={color} content={tokens} size={"sm"}>
                <Image     alt="binance"  src="/binance.png" width={50} height={50} className={"w-15 h-15"} />
            </Badge>

        </div>
    );
}
