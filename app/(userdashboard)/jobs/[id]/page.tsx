"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useJobContext } from "@/context/JobContext";
import Link from "next/link";
import {
    Briefcase,
    MapPin,
    Clock,
    Globe,
    Tag,
    MessageCircle,
    Mail,
    Linkedin,
} from "lucide-react";
import React, { useEffect, useState } from "react";

async function fetchAdzunaJobs() {
    const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=6cf3a985&app_key=85df65836cb63da9c8be340f00b3676e&results_per_page=50&content-type=application/json`
    );
    const data = await response.json();
    return data.results;
}

export default function JobDetailsPage() {
    const params = useParams();
    const jobId = params?.id;
    const { applyToJob, appliedJobs } = useJobContext();

    const { data: jobs = [], isLoading } = useQuery({
        queryKey: ["adzunaJobs"],
        queryFn: fetchAdzunaJobs,
    });

    const job = jobs.find((j: any) => j.id === jobId);

    const isApplied = appliedJobs.some((j) => j.id === jobId);

    // Social share links (client-side only)
    const [shareLinks, setShareLinks] = useState({
        whatsapp: "#",
        email: "#",
        linkedin: "#",
    });

    console.log(fetchAdzunaJobs())
    useEffect(() => {
        if (typeof window !== "undefined" && job) {
            const shareUrl = encodeURIComponent(window.location.href);
            const shareText = encodeURIComponent(`Check out this job: ${job.title}`);
            setShareLinks({
                whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
                email: `mailto:?subject=${shareText}&body=${shareUrl}`,
                linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
            });
        }
    }, [job]);

    if (isLoading || !job)
        return <p className="text-center">Loading job details...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{job.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <span className="flex items-center gap-1">
                    <Briefcase size={16} /> {job.company.display_name}
                </span>
                <span className="flex items-center gap-1">
                    <MapPin size={16} /> {job.location.display_name}
                </span>
                <span className="flex items-center gap-1">
                    <Clock size={16} /> {new Date(job.created).toLocaleDateString()}
                </span>
                {job.latitude && job.longitude && (
                    <span className="flex items-center gap-1">
                        <Globe size={16} /> Lat: {job.latitude}, Lon: {job.longitude}
                    </span>
                )}
                {job.category?.label && (
                    <span className="flex items-center gap-1">
                        <Tag size={16} /> {job.category.label}
                    </span>
                )}
            </div>

            <div className="prose dark:prose-invert mb-8">
                {job.description}
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                    Type: {job.contract_type || "Full Time"}
                </span>
                <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                    Salary:
                    {job.salary_min && job.salary_max
                        ? ` $${job.salary_min} - $${job.salary_max}`
                        : " Salary not disclosed"}
                </span>
            </div>

            <div className="mt-8 flex items-center gap-4">
                <Link href={job.redirect_url || "#"} target="_blank" rel="noopener noreferrer">
                    <button
                        disabled={isApplied}
                        onClick={() => applyToJob({ ...job, id: job.id })}
                        className={`px-6 py-3 text-white rounded-lg transition ${
                            isApplied
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {isApplied ? "Already Applied" : "Apply Now"}
                    </button>
                </Link>
                {/* Social Sharing Buttons */}
                <div className="flex items-center gap-2">
                    <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                        <MessageCircle size={24} className="text-green-500" />
                    </a>
                    <a href={shareLinks.email} target="_blank" rel="noopener noreferrer">
                        <Mail size={24} className="text-blue-500" />
                    </a>
                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin size={24} className="text-blue-700" />
                    </a>
                </div>
            </div>
        </div>
    );
}