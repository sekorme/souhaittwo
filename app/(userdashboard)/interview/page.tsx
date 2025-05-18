import React from "react";
import Image from "next/image";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
    getInterviewsByUserId,
    getFeedbackByUserId,
} from "@/lib/actions/general.action";
import InterviewCard from "@/components/InterviewCard";
import InterviewForm from "@/components/InterviewForm";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const Interview = async () => {
    const user = await getCurrentUser();

    const [userInterviews, feedbackList] = await Promise.all([
        getInterviewsByUserId(user?.id!),
        getFeedbackByUserId(user?.id!), // NEW: fetch feedback
    ]);

    const feedbackInterviewIds = feedbackList.map((f:any) => f.interviewId);


    const withFeedback = userInterviews?.filter(
        (i:any) => i.finalized && feedbackInterviewIds.includes(i.id)
    ) || [];
    const awaitingFeedback = userInterviews?.filter(
        (i:any) => i.finalized && !feedbackInterviewIds.includes(i.id)
    ) || [];

    return (
        <div className="mb-10">
            {/* Hero */}
            <section className="flex flex-row bg-blue-dark-gradient rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2 className="text-white text-3xl font-semibold">
                        Get Interview-Ready with AI-Powered Practice & Feedback
                    </h2>
                    <p className="text-lg text-white">
                        Practice on real interview questions and get instant feedback on your answers.
                    </p>
                    <InterviewForm />
                </div>
                <Image alt="robot" className="max-sm:hidden" height={500} src="/robot.png" width={500} />
            </section>

            {/* Tabs */}
            <div className="flex w-full flex-col mt-10">
                <Tabs defaultValue="awaiting" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">

                        <TabsTrigger value="awaiting">⌛ Awaiting Interview</TabsTrigger>
                        <TabsTrigger value="taken">✅ View Feedback</TabsTrigger>
                    </TabsList>

                    {/* Not Yet Taken */}


                    {/* Awaiting Feedback */}
                    <TabsContent value="awaiting">
                        <section className="flex flex-col gap-6 mt-8">
                            <h2>Completed Interviews Awaiting Feedback</h2>
                            <div className="interviews-section gap-4 grid grid-cols-1 md:grid-cols-2 w-full items-stretch">
                                {awaitingFeedback.length > 0 ? (
                                    awaitingFeedback.map((interview:any) => (
                                        <InterviewCard
                                            key={interview.id}
                                            createdAt={interview.createdAt}
                                            interviewId={interview.id}
                                            role={interview.role}
                                            techstack={interview.techstack}
                                            type={interview.type}
                                            userId={user?.id}

                                        />
                                    ))
                                ) : (
                                    <p>You have no interviews awaiting feedback.</p>
                                )}
                            </div>
                        </section>
                    </TabsContent>

                    {/* With Feedback */}
                    <TabsContent value="taken">
                        <section className="flex flex-col gap-6 mt-8">
                            <h2>Your Completed Interviews (With Feedback)</h2>
                            <div className="interviews-section gap-4 grid grid-cols-1 md:grid-cols-2 w-full items-stretch">
                                {withFeedback.length > 0 ? (
                                    withFeedback.map((interview: any) => (
                                        <InterviewCard
                                            key={interview.id}
                                            createdAt={interview.createdAt}
                                            interviewId={interview.id}
                                            role={interview.role}
                                            techstack={interview.techstack}
                                            type={interview.type}
                                            userId={user?.id}

                                        />
                                    ))
                                ) : (
                                    <p>You haven&apos;t received feedback on any interviews yet.</p>
                                )}
                            </div>
                        </section>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Interview;
