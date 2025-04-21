import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/filecomponent/MobileNavigation";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

export const dynamic = "force-dynamic";
const Layout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();
    if (!user) return null;


    return (
        <main className={"flex h-screen mb-10"}>
            <Sidebar {...user} />
            <section className={"flex h-full flex-1 flex-col"}>
                <MobileNavigation
                    email={user.email}
                    fullName={user.name}
                    avatar="/assets/icons/profile-placeholder.svg"
                    $id={user.id}
                    accountId={user.id}
                />
                <Header userId={"1"} accountId={"join me"} />
                <div className={"main-content"}>{children}</div>
            </section>
            <Toaster />
        </main>
    );
};
export default Layout;
