'use client'
import React from 'react'
import {signOut} from "@/lib/actions/auth.actions";
import {Button} from "@heroui/button";

const SignOut = () => {

    const handleSignOut = async () => {
        await signOut();
    };


    return (
    <Button onPress={()=>handleSignOut()}>SignOut</Button>
    )
}
export default SignOut
