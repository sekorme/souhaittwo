"use client";

import { useState } from "react";
import JobSideBar from "@/components/jobcomponent/JobSideBar";
import JobNavBar from "@/components/jobcomponent/JobNavBar";



export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const [isMobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <JobSideBar isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} />
            <div className="md:ml-64">
                <JobNavBar onMenuClick={() => setMobileOpen(true)} />
                <main className="pt-20 px-4 bg-gray-50 min-h-screen">{children}</main>
            </div>
        </>
    );
}
