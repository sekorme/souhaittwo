"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const jobs = [
  {
    title: "Software Engineer (Android), Libraries",
    company: "Segment",
    logo: "https://logo.clearbit.com/segment.com",
    location: "London, UK",
    time: "11 hours ago",
    salary: "$35k - $45k",
    type: ["Full Time", "Private", "Urgent"],
  },
  {
    title: "Recruiting Coordinator",
    company: "Catalyst",
    logo: "https://logo.clearbit.com/catalyst.io",
    location: "London, UK",
    time: "11 hours ago",
    salary: "$35k - $45k",
    type: ["Freelancer", "Private", "Urgent"],
  },
  {
    title: "Senior Product Designer",
    company: "Upwork",
    logo: "https://logo.clearbit.com/upwork.com",
    location: "London, UK",
    time: "11 hours ago",
    salary: "$35k - $45k",
    type: ["Temporary", "Private", "Urgent"],
  },
  {
    title: "Senior Full Stack Engineer, Creator Success",
    company: "Medium",
    logo: "https://logo.clearbit.com/medium.com",
    location: "London, UK",
    time: "11 hours ago",
    salary: "$35k - $45k",
    type: ["Full Time", "Private", "Urgent"],
  },
];

export default function JobList() {
  return (
    <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
      {jobs.map((job, index) => (
        <motion.div
          key={index}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Image
                alt={job.company}
                className="rounded"
                height={40}
                src={job.logo}
                width={40}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <span>{job.company}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.time}</span>
                  <span>•</span>
                  <span>{job.salary}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.type.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        tag === "Full Time"
                          ? "bg-blue-500"
                          : tag === "Freelancer"
                            ? "bg-purple-500"
                            : tag === "Temporary"
                              ? "bg-sky-500"
                              : tag === "Private"
                                ? "bg-green-500"
                                : tag === "Urgent"
                                  ? "bg-yellow-500 text-black"
                                  : "bg-gray-400"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="text-gray-400 hover:text-blue-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.25 6.75L6.75 17.25M6.75 6.75l10.5 10.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
