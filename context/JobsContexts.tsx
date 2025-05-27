"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description?: string;
    url?: string;
    [key: string]: any;
}

interface JobContextType {
    savedJobs: Job[];
    appliedJobs: Job[];
    saveJob: (job: Job) => void;
    unsaveJob: (id: string) => void;
    applyToJob: (job: Job) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobContext = () => {
    const context = useContext(JobContext);
    if (!context) throw new Error("useJobContext must be used within a JobProvider");
    return context;
};

export const JobProvider = ({ children }: { children: ReactNode }) => {
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

    const saveJob = (job: Job) => {
        setSavedJobs((prev) => [...prev.filter((j) => j.id !== job.id), job]);
    };

    const unsaveJob = (id: string) => {
        setSavedJobs((prev) => prev.filter((job) => job.id !== id));
    };

    const applyToJob = (job: Job) => {
        if (!appliedJobs.find((j) => j.id === job.id)) {
            setAppliedJobs((prev) => [...prev, job]);
        }
    };

    return (
        <JobContext.Provider
            value={{ savedJobs, appliedJobs, saveJob, unsaveJob, applyToJob }}
        >
            {children}
        </JobContext.Provider>
    );
};
