'use client'
import React from 'react'
import {signOut} from "@/lib/actions/auth.actions";
import {Button} from "@heroui/button";
import { KeySquare, LockOpen } from 'lucide-react';
import {LockSvg} from "@/herosvgs/herosvg";
import Image from "next/image";
import confetti from 'canvas-confetti'
const SignOut = () => {

    const handleSignOut = async () => {
        confetti({particleCount: 100, spread: 160, origin: {y: 0.6}});
        await signOut();
    };


    return (
    <div onClick={handleSignOut} className={"cursor-pointer bg-[#ff3d57]/20 p-2 rounded-full animate-pulse"}><LockOpen color={"#ff3d57"} size={20}/></div>
    )
}
export default SignOut
