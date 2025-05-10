import React from "react";
import Link from "next/link";
import Image from "next/image";

import { getCurrentUser } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const Interview = async () => {
  const user = await getCurrentUser();
  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section
        className={
          "flex flex-row bg-blue-dark-gradient  rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4"
        }
      >
        <div className={"flex flex-col gap-6 max-w-lg"}>
          <h2 className={"text-white text-3xl font-semibold"}>
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className={"text-lg text-white"}>
            Practice on real interview questions and get instant feedback on
            your answers
          </p>
          <Button
            asChild
            className={
              "w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10 max-sm:w-full"
            }
            variant={"secondary"}
          >
            <Link href={"/interview/assistant"}>Start an Interview</Link>
          </Button>
        </div>
        <Image
          alt={"robot"}
          className={"max-sm:hidden"}
          height={500}
          src={"/robot.png"}
          width={500}
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch;">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
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
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
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
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Interview;
