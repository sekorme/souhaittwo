import React from 'react'
import AuthForm from "@/components/AuthForm";
import {isAuthenticated} from "@/lib/actions/auth.actions";
import {redirect} from "next/navigation";

const SignUp = async() => {
    const isUserAuthenticated = await isAuthenticated();

    if (isUserAuthenticated) redirect("/dashboard");
    return <AuthForm type="sign-up"/>
}
export default SignUp
