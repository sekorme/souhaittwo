// app/providers.tsx or _app.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function TanProvider({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient());

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
