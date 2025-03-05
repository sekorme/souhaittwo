import React from 'react'
import {getCurrentUser} from "@/lib/actions/users.actions";
import {redirect} from "next/navigation";

const Layout = async({children}:{children:React.ReactNode}) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return redirect("/sign-in");
    return (
        <div className={""}>{children}</div>
    )
}
export default Layout