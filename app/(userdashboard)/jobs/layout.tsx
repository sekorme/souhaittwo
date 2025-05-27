import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/filecomponent/MobileNavigation";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { isSubscribed } from "@/lib/actions/checkSubscription";
import ClientProviders from "@/providers/ClientProviders";
import {redirect} from "next/navigation";
import JobSideBar from "@/components/jobcomponent/JobSideBar";
import JobNavBar from "@/components/jobcomponent/JobNavBar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();
    if (!user) return null;

    const isPaid = await isSubscribed(user.id);


    if (isPaid) {
        return (
            <ClientProviders>
                <main className={"flex h-screen mb-10"}>
                    <JobSideBar/>
                    <section className={"flex h-full flex-1 flex-col"}>

                        <JobNavBar name={user.name}  email={user.email}/>

                        <div className={"main-content"}>{children}</div>
                    </section>
                    <Toaster />
                </main>
            </ClientProviders>
        );
    }

    return (
        <ClientProviders>
            {children}
        </ClientProviders>
    );
};

export default Layout;