import React from 'react'
import Agent from "@/components/Agent";
import {getCurrentUser} from "@/lib/actions/auth.actions";
import GeminiVoiceChat from "@/components/GeminiVoiceChat";



const Interview = async() => {

    const user = await getCurrentUser();
    return (
        <div className={"min-h-screen"}>
           <GeminiVoiceChat/>

        </div>
    )
}
export default Interview
