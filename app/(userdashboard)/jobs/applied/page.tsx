"use client";

import React from "react";
import { useJobContext } from "@/context/JobContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, CheckCircle2 } from "lucide-react";

export default function AppliedJobsPage() {
    const { appliedJobs } = useJobContext();
    const router = useRouter();

    if (appliedJobs.length === 0) {
        return <p className="text-center py-20 text-gray-500">You haven&#39;t applied to any jobs yet.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Applied Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appliedJobs.map((job, idx) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => router.push(`/jobs/${job.id}`)}
                        className="bg-white p-5 rounded-xl shadow border border-green-200 hover:shadow-lg transition cursor-pointer"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {job.title}
                            </h3>
                            <CheckCircle2 size={20} className="text-green-600" />
                        </div>
                        <div className="text-sm text-gray-500 flex flex-wrap gap-2 items-center">
              <span className="flex items-center gap-1">
                <Briefcase size={14} /> {job.company.display_name}
              </span>
                            <span className="flex items-center gap-1">
                <MapPin size={14} /> {job.location.display_name}
              </span>
                            <span className="flex items-center gap-1">
                <Clock size={14} /> {new Date(job.created).toLocaleDateString()}
              </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
