"use client";

import React from "react";
import { Search, MapPin, Filter } from "lucide-react";

export default function JobSearchBar() {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
            <div className="relative">
                <Search className="absolute top-3 left-3 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="relative">
                <MapPin className="absolute top-3 left-3 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="City or postcode"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <select className="w-full pl-3 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Choose a category</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                </select>
            </div>
            <div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Find Jobs
                </button>
            </div>
        </div>
    );
}
