import React from 'react'
import Agent from "@/components/Agent";
import {getCurrentUser} from "@/lib/actions/auth.actions";

const Page = async() => {
     const user = await getCurrentUser();
    return (
        <>
            <h3>Interview Generation</h3>
            {user && <Agent userName={user.name} userId={user.id} type={"interview"} />}
        </>
    )
}
export default Page
