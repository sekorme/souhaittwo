
import React from "react";



import JobSearchBar from "@/components/jobcomponent/JobSearchBar";
import JobFilters from "@/components/jobcomponent/JobFilters";
import JobList from "@/components/jobcomponent/JobList";
import {isSubscribed} from "@/lib/actions/checkSubscription";
import {getCurrentUser} from "@/lib/actions/auth.actions";
import {redirect} from "next/navigation";

export  default async function JobSearchPage() {
     const user = await getCurrentUser();
     const hasAccess = await isSubscribed(user?.id!);
     if(!hasAccess) redirect("/jobs")
    return (
        <main className="bg-gray-50 min-h-screen">
            <section className="pt-24 pb-10 bg-gradient-to-br from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
                        Find Your Dream Job
                    </h1>
                    <JobSearchBar />
                </div>
            </section>

            <section className="pt-8 pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <JobFilters />
                        <JobList />
                    </div>
                </div>
            </section>
        </main>
    );
}
