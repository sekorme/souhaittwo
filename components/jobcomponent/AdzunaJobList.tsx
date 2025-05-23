"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Clock, Bookmark, BookmarkCheck } from "lucide-react";
import { useJobContext } from "@/context/JobContext";
import { useRouter } from "next/navigation";

function mapFiltersToAdzunaParams(filters:any) {
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
        mapped["location0"] = "UK"; // assuming UK, adjust based on user input if needed
        mapped["location1"] = filters.where;
    }

    return mapped;
}

async function fetchAdzunaJobs(filters :any) {
    const params = new URLSearchParams(
        mapFiltersToAdzunaParams(filters)
    );
    const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/gb/search/1?${params.toString()}`
    );
    const data = await response.json();
    return data.results;
}

export default function AdzunaJobList({ filters }:any) {
    const router = useRouter();
    const { user, savedJobs, saveJob, unsaveJob } = useJobContext();
    const { data: jobs = [], isLoading, isError } = useQuery({
        queryKey: ["adzunaJobs", filters],
        queryFn: () => fetchAdzunaJobs(filters),
    });

    const isSaved = (id:any) => savedJobs.some((job) => job.id === id);

    if (isLoading) return <p className="text-center">Loading jobs...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load jobs.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job:any, idx:any) => (
                <motion.div
                    key={job.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-5 rounded-xl shadow border border-gray-200 hover:shadow-lg transition relative"
                >
                    <button
                        onClick={() =>
                            isSaved(job.id) ? unsaveJob(job.id) : saveJob({ ...job, id: job.id })
                        }
                        className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
                    >
                        {isSaved(job.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>

                    <div
                        className="flex items-start gap-4 cursor-pointer"
                        onClick={() => router.push(`/jobs/${job.id}`)}
                    >
                        <div className="bg-gray-100 p-2 rounded-xl">
                            <Image
                                src={job.company?.logo || "/logo-placeholder.png"}
                                alt={job.company?.display_name || "Company"}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {job.title}
                            </h3>
                            <div className="text-sm text-gray-500 flex flex-wrap gap-2 items-center mt-1">
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
                <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                  {job.contract_type || "Full Time"}
                </span>
                                <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
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
