import React from 'react'
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/filecomponent/MobileNavigation";
import Header from "@/components/Header";
import {Toaster} from "@/components/ui/toaster";
import {getCurrentUser} from "@/lib/actions/auth.actions";
import {isSubscribed} from "@/lib/actions/checkSubscription";
import {JobProvider} from "@/context/JobContext";
import {TanProvider} from "@/providers/TanProvider";
const Layout = async({children}: {children: React.ReactNode}) => {
    const user = await getCurrentUser();
    if (!user) return null;

    const isPaid = await isSubscribed(user?.id!);


    if(isPaid){
        return (
            <TanProvider>
            <JobProvider>
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
                    <Header userId={"1"} accountId={"join me"}/>
                    <div className={"main-content"}>{children}</div>
                </section>
                <Toaster/>
            </main>
            </JobProvider>
            </TanProvider>
        )
    }



    return(
        <>
        <TanProvider>
            <JobProvider>
            {children}
        </JobProvider>
        </TanProvider>
        </>
    )
}
export default Layout
