'use client';

import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import {
    Briefcase,
    Bell,
    MessageSquare,
    Bookmark
} from "lucide-react";

const data = [
    { name: "January", views: 200 },
    { name: "February", views: 140 },
    { name: "March", views: 220 },
    { name: "April", views: 360 },
    { name: "May", views: 190 },
    { name: "June", views: 240 },
];

export default function JobDashboard() {
    return (
        <div className="p-2 space-y-6">
            <h1 className="text-3xl font-bold text-indigo-600  mb-6">Job Dashboard</h1>
            {/* Statistic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <StatCard label="Applied Jobs" value="22" icon={<Briefcase />} color="bg-blue-100" />
                <StatCard label="Job Alerts" value="9382" icon={<Bell />} color="bg-red-100" />
                <StatCard label="Messages" value="74" icon={<MessageSquare />} color="bg-yellow-100" />
                <StatCard label="Shortlist" value="32" icon={<Bookmark />} color="bg-green-100" />
            </div>

            {/* Profile Views and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Views Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Profile Views</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              Last 6 Months
            </span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="views"
                                stroke="#3b82f6"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Notifications List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl"
                >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Notifications</h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        {[
                            { name: "Henry Wilson", job: "Product Designer", color: "text-blue-600" },
                            { name: "Raul Costa", job: "Product Manager, Risk", color: "text-green-600" },
                            { name: "Jack Milk", job: "Technical Architect", color: "text-blue-600" },
                            { name: "Michel Arian", job: "Software Engineer", color: "text-green-600" },
                            { name: "Wade Warren", job: "Web Developer", color: "text-blue-600" },
                        ].map((item, i) => (
                            <li key={i}>
                                <strong>{item.name}</strong> applied for <span className={item.color}>{item.job}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}

function StatCard({
                      label,
                      value,
                      icon,
                      color
                  }: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className={`rounded-2xl p-5 ${color} dark:bg-opacity-10 shadow-lg transition`}
        >
            <div className="flex items-center justify-center mb-4 text-3xl text-gray-700 dark:text-gray-100">
                {icon}
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
            </div>
        </motion.div>
    );
}
