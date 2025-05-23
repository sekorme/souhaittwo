"use client";

import React from "react";

export default function JobFilters() {
    return (
        <aside className="w-full lg:w-1/4 space-y-4 animate-fade-in-up">
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Job Type</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Freelance</option>
                <option>Temporary</option>
            </select>

            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Experience Level</option>
                <option>Entry</option>
                <option>Mid</option>
                <option>Senior</option>
            </select>

            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Salary Estimate</option>
                <option>$10k–$30k</option>
                <option>$30k–$60k</option>
                <option>$60k–$100k</option>
            </select>

            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort by (default)</option>
                <option>Most Recent</option>
                <option>Highest Salary</option>
            </select>
        </aside>
    );
}
