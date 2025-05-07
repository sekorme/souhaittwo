
import React from 'react'
import Agent from "@/components/Agent";
import {getCurrentUser} from "@/lib/actions/auth.actions";
import GeminiVoiceChat from "@/components/GeminiVoiceChat";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCard from '@/components/InterviewCard';



const Interview = async() => {

    const user = await getCurrentUser();
    return (
        <>
           <section className={"flex flex-row bg-blue-dark-gradient  rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4"}>
                  <div className={"flex flex-col gap-6 max-w-lg"}>
                      <h2 className={"text-white text-3xl font-semibold"}>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                      <p className={"text-lg text-white"}>Practice on real interview questions and get instant feedback on your answers</p>
                      <Button asChild className={"w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10 max-sm:w-full"} variant={"secondary"} >
                          <Link href={"/interview/assistant"}>Start an Interview</Link>
                      </Button>


                  </div>
                  <Image src={"/robot.png"} alt={"robot"} width={500} height={500} className={"max-sm:hidden"}/>
           </section>

            <section className={"flex flex-col gap-6 mt-5"}>
                <h2 className={"text-3xl font-semibold"}>
                    Your Interviews
                </h2>

                <div className={"flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch"}>
                    {dummyInterviews.map((interview) => (
                        <InterviewCard key={interview.id} {...interview}/>
                    ))}
                </div>
            </section>
            <section className={"fex flex-col gap-6 mt-5"}>
                <h2 className={"text-3xl font-semibold"}>
                    Take an Interview
                </h2>

                <div className={"flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch"}>

                    {dummyInterviews.map((interview) => (
                        <InterviewCard key={interview.id} {...interview}/>
                    ))}
                </div>
            </section>
        </>
    )
}
export default Interview
