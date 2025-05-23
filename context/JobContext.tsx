"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import {
    collection,
    doc,
    setDoc,
    deleteDoc,
    onSnapshot,
    DocumentData,
} from "firebase/firestore";
import { auth, db } from "@/firebase/client";

type User = FirebaseUser | null;

type Job = {
    id: string;
    [key: string]: any;
};

type JobContextType = {
    user: User;
    savedJobs: Job[];
    appliedJobs: Job[];
    saveJob: (job: Job) => Promise<void>;
    unsaveJob: (jobId: string) => Promise<void>;
    applyToJob: (job: Job) => Promise<void>;
};

const JobContext = createContext<JobContextType | null>(null);

export function JobProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
    function sanitizeFirestoreFields(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(sanitizeFirestoreFields);
        }
        if (obj && typeof obj === "object") {
            return Object.fromEntries(
                Object.entries(obj)
                    .filter(([key]) => !(key.startsWith("__") && key.endsWith("__")))
                    .map(([key, value]) => [key, sanitizeFirestoreFields(value)])
            );
        }
        return obj;
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) {
            setSavedJobs([]);
            setAppliedJobs([]);
            return;
        }

        const savedRef = collection(db, "users", user.uid, "savedJobs");
        const appliedRef = collection(db, "users", user.uid, "appliedJobs");

        const unsubSaved = onSnapshot(savedRef, (snap) => {
            setSavedJobs(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Job)));
        });

        const unsubApplied = onSnapshot(appliedRef, (snap) => {
            setAppliedJobs(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Job)));
        });

        return () => {
            unsubSaved();
            unsubApplied();
        };
    }, [user]);

    const saveJob = async (job: Job) => {
        if (!user) return;
        const sanitizedJob = sanitizeFirestoreFields(job);
        await setDoc(doc(db, "users", user.uid, "savedJobs", job.id), sanitizedJob);
    };

    const applyToJob = async (job: Job) => {
        if (!user) return;
        const sanitizedJob = sanitizeFirestoreFields(job);
        await setDoc(doc(db, "users", user.uid, "appliedJobs", job.id), sanitizedJob);
    };

    const unsaveJob = async (jobId: string) => {
        if (!user) return;
        await deleteDoc(doc(db, "users", user.uid, "savedJobs", jobId));
    };



    return (
        <JobContext.Provider
            value={{
                user,
                savedJobs,
                appliedJobs,
                saveJob,
                unsaveJob,
                applyToJob,
            }}
        >
            {children}
        </JobContext.Provider>
    );
}

export const useJobContext = () => {
    const context = useContext(JobContext);
    if (!context) throw new Error("useJobContext must be used within a JobProvider");
    return context;
};