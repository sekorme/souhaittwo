'use client'
import React from 'react'

import {signOutUser} from "@/lib/actions/users.actions";

const Dashboard = () => {

    const handleSignOut = async () => {
        await signOutUser();
        window.location.reload()
    };
    return (
        <div className={"md:mt-20 mt-5"}>
            <h1>Dashboard</h1>
            <button onClick={handleSignOut}>SignOut</button>
        </div>
    )
}
export default Dashboard
