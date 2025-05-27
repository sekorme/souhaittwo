"use client";


import { TanProvider } from "@/providers/TanProvider";
import {JobProvider} from "@/context/JobContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <TanProvider>
            <JobProvider>
                {children}
            </JobProvider>
        </TanProvider>
    );
}