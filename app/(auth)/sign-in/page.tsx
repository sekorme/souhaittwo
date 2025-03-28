import React from 'react'
import OtpModal from "@/components/OTPModal";
import AuthForm from "@/components/AuthForm";
import {isAuthenticated} from "@/lib/actions/auth.actions";
import {redirect} from "next/navigation";

const SignIn = async() => {
    const isUserAuthenticated = await isAuthenticated();

    if (isUserAuthenticated) redirect("/dashboard");
    return <AuthForm type="sign-in"/>
}
export default SignIn
