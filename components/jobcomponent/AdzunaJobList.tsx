"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
    MapPin,
    Briefcase,
    Clock,
    Bookmark,
    BookmarkCheck,
} from "lucide-react";
import { useJobContext } from "@/context/JobContext";
import { useRouter } from "next/navigation";

function mapFiltersToAdzunaParams(filters: any) {
    const mapped: Record<string, string> = {
        app_id: "6cf3a985",
        app_key: "85df65836cb63da9c8be340f00b3676e",
        results_per_page: "12",
    };

    if (filters.what) mapped["what"] = filters.what;
    if (filters.salary_min) mapped["salary_min"] = filters.salary_min;
    if (filters.contract_type) mapped["contract_type"] = filters.contract_type;
    if (filters.category) mapped["category"] = filters.category;

    if (filters.where) {
        mapped["location0"] = "UK";
        mapped["location1"] = filters.where;
    }

    return mapped;
}

async function fetchAdzunaJobs(filters: any) {
    const params = new URLSearchParams(mapFiltersToAdzunaParams(filters));
    const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/gb/search/1?${params.toString()}`
    );
    const data = await response.json();
    return data.results;
}

// 🎉 Confetti trigger
function triggerConfetti() {
    const end = Date.now() + 2 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
        if (Date.now() > end) return;

        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors,
        });

        requestAnimationFrame(frame);
    };

    frame();
}

export default function AdzunaJobList({ filters }: any) {
    const router = useRouter();
    const { savedJobs, saveJob, unsaveJob } = useJobContext();

    const {
        data: jobs = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["adzunaJobs", filters],
        queryFn: () => fetchAdzunaJobs(filters),
    });

    const isSaved = (id: string) => savedJobs.some((job) => job.id === id);

    const toggleSave = (job: any) => {
        if (isSaved(job.id)) {
            unsaveJob(job.id);
        } else {
            saveJob({ ...job, id: job.id });
            triggerConfetti();
        }
    };

    if (isLoading)
        return (
            <p className="text-center text-gray-500 dark:text-gray-400">
                Loading jobs...
            </p>
        );

    if (isError)
        return (
            <p className="text-center text-red-500 dark:text-red-400">
                Failed to load jobs.
            </p>
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job: any, idx: number) => (
                <motion.div
                    key={job.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition relative"
                >
                    {/* Save/Unsave Button */}
                    <button
                        onClick={() => toggleSave(job)}
                        className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        {isSaved(job.id) ? (
                            <BookmarkCheck size={20} />
                        ) : (
                            <Bookmark size={20} />
                        )}
                    </button>

                    {/* Job Info */}
                    <div
                        className="flex items-start gap-4 cursor-pointer"
                        onClick={() => router.push(`/jobs/${job.id}`)}
                    >
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
                            <Image
                                src={job.company?.logo || "/logo2.PNG"}
                                alt={job.company?.display_name || "Company"}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {job.title}
                            </h3>
                            <div className="text-sm text-gray-500 dark:text-gray-300 flex flex-wrap gap-2 items-center mt-1">
                <span className="flex items-center gap-1">
                  <Briefcase size={14} />
                    {job.company.display_name}
                </span>
                                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                                    {job.location.display_name}
                </span>
                                <span className="flex items-center gap-1">
                  <Clock size={14} />
                                    {new Date(job.created).toLocaleDateString()}
                </span>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                  {job.contract_type || "Full Time"}
                </span>
                                <span className="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xs px-3 py-1 rounded-full">
                  {job.salary_min && job.salary_max
                      ? `$${job.salary_min} - $${job.salary_max}`
                      : "Salary not disclosed"}
                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
