"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Briefcase,
  Bell,
  MessageSquare,
  Bookmark,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

import { useJobContext } from "@/context/JobContext";

const data = [
  { name: "January", views: 200 },
  { name: "February", views: 140 },
  { name: "March", views: 220 },
  { name: "April", views: 360 },
  { name: "May", views: 190 },
  { name: "June", views: 240 },
];
// Reusable fadeIn animation
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function JobDashboard() {
  const appliedJobs = useJobContext();
  const router = useRouter();

  return (
    <div className="p-2 space-y-6">
      <h1 className="text-3xl font-light text-indigo-600  mb-6" data-aos="fade-right">
        Job Dashboard
      </h1>
      <p className="mt-10 text-sm" data-aos="fade-right">Welcome to your job dashboard!</p>
      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2" data-aos="fade-left">
        <StatCard
          color="bg-blue-100"
          icon={<Briefcase />}
          label="Applied Jobs"
          value="22"

        />
        <StatCard
          color="bg-red-100"
          icon={<Bell />}
          label="Job Alerts"
          value="9382"
        />
        <StatCard
          color="bg-yellow-100"
          icon={<MessageSquare />}
          label="Messages"
          value="74"
        />
        <StatCard
          color="bg-green-100"
          icon={<Bookmark />}
          label="Shortlist"
          value="32"
        />
      </div>

      {/* Profile Views and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Views Chart */}
        <motion.div
          animate="visible"
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl"
          initial="hidden"
          variants={fadeIn}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Profile Views
            </h3>
            <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              Last 6 Months
            </span>
          </div>
          <ResponsiveContainer height={200} width="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                dataKey="views"
                stroke="#3b82f6"
                strokeWidth={2}
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Recent Notifications
          </h3>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            {[
              {
                name: "Henry Wilson",
                job: "Product Designer",
                color: "text-blue-600",
              },
              {
                name: "Raul Costa",
                job: "Product Manager, Risk",
                color: "text-green-600",
              },
              {
                name: "Jack Milk",
                job: "Technical Architect",
                color: "text-blue-600",
              },
              {
                name: "Michel Arian",
                job: "Software Engineer",
                color: "text-green-600",
              },
              {
                name: "Wade Warren",
                job: "Web Developer",
                color: "text-blue-600",
              },
            ].map((item, i) => (
              <li key={i}>
                <strong>{item.name}</strong> applied for{" "}
                <span className={item.color}>{item.job}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <Card >
        <CardHeader><h2 className={"text-2xl font-light text-indigo-600"}>Jobs Applied Recently </h2></CardHeader>
        <CardBody >
          {appliedJobs.appliedJobs && appliedJobs.appliedJobs.length > 0 ? (
            <div className="w-full mx-auto px-4 py-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appliedJobs.appliedJobs.map((job: any, idx: number) => (
                  <motion.div
                    key={job.id}
                    animate={"visible"}
                    className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow border border-green-200 dark:border-green-700 hover:shadow-lg transition cursor-pointer"
                    initial={"hidden"}

                    variants={fadeIn}
                    onClick={() => router.push(`/jobs/${job.id}`)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {job.title}
                      </h3>
                      <CheckCircle2 className="text-green-600" size={20} />
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300 flex flex-wrap gap-2 items-center">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} /> {job.company.display_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location.display_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />{" "}
                        {new Date(job.created).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-20 text-gray-500 dark:text-gray-400">
              You haven&#39;t applied to any jobs yet.
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-5 ${color} dark:bg-opacity-10 shadow-lg transition`}
      initial={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center justify-center mb-4 text-3xl text-gray-700 dark:text-gray-100">
        {icon}
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
      </div>
    </motion.div>
  );
}
