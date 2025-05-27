"use client";

import React, { useEffect, useState } from "react";
import { fetchJobs } from "@/lib/fetchJobs";
import { useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useJobContext } from "@/context/JobsContexts";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { saveJob, unsaveJob, savedJobs } = useJobContext();

  useEffect(() => {
    fetchJobs(page).then(setJobs).catch(console.error);
  }, [page]);

  const isSaved = (id: string) => savedJobs.some((j) => j.id === id);

  return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job: any) => (
              <div
                  key={job.id}
                  className="bg-white p-6 rounded-xl border shadow hover:shadow-md transition cursor-pointer relative"
                  onClick={() => router.push(`/jobs/${job.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500">
                      {job.city}, {job.state}, {job.countryCode}
                    </p>
                    <p className="text-sm text-gray-500">
                      Salary: {job.salaryCurrency}{" "}
                      {job.minSalary?.toLocaleString()} -{" "}
                      {job.maxSalary?.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  <button
                      onClick={(e) => {
                        e.stopPropagation();
                        isSaved(job.id)
                            ? unsaveJob(job.id)
                            : saveJob({ ...job, id: job.id });
                      }}
                  >
                    {isSaved(job.id) ? <BookmarkCheck /> : <Bookmark />}
                  </button>
                </div>
              </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 pt-4">
          <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 border rounded disabled:opacity-50"
              disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">Page {page}</span>
          <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded"
          >
            Next
          </button>
        </div>
      </div>
  );
}
