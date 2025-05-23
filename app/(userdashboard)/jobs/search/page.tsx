"use client";

import React, { useState } from "react";

import { Search, MapPin } from "lucide-react";
import AdzunaJobList from "@/components/jobcomponent/AdzunaJobList";

export default function JobSearchLayout() {
    const [filters, setFilters] = useState({
        what: "",
        locationN: "",
        contract_type: "",
        category: "",
        salary_min: "",
    });

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <section className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Explore Job Opportunities
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Find jobs that match your skills and experience
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
                    <div className="relative">
                        <Search className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Job title or keyword"
                            value={filters.what}
                            onChange={(e) => setFilters({ ...filters, what: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Location"
                            value={filters.locationN}
                            onChange={(e) => setFilters({ ...filters, locationN: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <select
                            value={filters.contract_type}
                            onChange={(e) => setFilters({ ...filters, contract_type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Contract Type</option>
                            <option value="full_time">Full Time</option>
                            <option value="part_time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="permanent">Permanent</option>
                            <option value="intern">Intern</option>
                        </select>
                    </div>
                    <div>
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Category</option>
                            <option value="IT Jobs">IT Jobs</option>
                            <option value="Engineering Jobs">Engineering Jobs</option>
                            <option value="Healthcare & Nursing Jobs">Healthcare</option>
                            <option value="Teaching Jobs">Teaching</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Min Salary"
                            value={filters.salary_min}
                            onChange={(e) => setFilters({ ...filters, salary_min: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Job List */}
                <AdzunaJobList filters={filters} />
            </section>
        </main>
    );
}
