import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";

import { getRandomInterviewCover } from "@/lib/utils";
import { InterviewCardProps } from "@/types";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";
import DeleteConfirm from "@/components/DeleteConfirm";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;
  const normalizedType = /mix/gi.test(type) ? "mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now(),
  ).format("MMM D, YYYY");

  return (
    <div
      className={
        "bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5 rounded-2xl w-fit w-[360px] max-sm:w-full "
      }
    >
      <div className={"card-interview "}>
        <div>
          <div
            className={
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-indigo-600 "
            }
          >
            <p className={"badge-text "}>{normalizedType}</p>
          </div>
          <Image
            alt={"interviews"}
            className={"rounded-full object-fit size-[50px]"}
            height={50}
            src={getRandomInterviewCover()}
            width={50}
          />
          <h3 className={" text-2xl font-semibold text-white mt-5 capitalize"}>
            {role} Interview
          </h3>

          <div className={"flex flex-row gap-5 mt-3"}>
            <div className={"flex flex-row gap-2"}>
              <Image
                alt={"calendar"}
                height={20}
                src={"/calendar.svg"}
                width={20}
              />
              <p className={"text-sm text-white"}>{formattedDate}</p>
            </div>
            <div className={"flex flex-row gap-2 items-center"}>
              <Image alt={"star"} height={20} src={"/star.svg"} width={20} />
              <p className={"text-sm text-white"}>
                {feedback?.totalScore || "--"}/100
              </p>
            </div>
          </div>
          <p className={"line-clamp-2 mt-5"}>
            {feedback?.finalAssessment ||
              "You haven't taken your interview yet. Take it now to improve your skills"}
          </p>
        </div>
        <div className={"flex flex-row justify-between"}>
          <DisplayTechIcons techStack={techstack} />
          <Button
            className={
              "w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10 "
            }
          >
            <Link
              href={
                feedback
                  ? `/interview/assistant/${interviewId}/feedback`
                  : `/interview/assistant/${interviewId}`
              }
            >
              {feedback ? "See Feedback" : "Continue Interview"}
            </Link>
          </Button>
        </div>
        <DeleteConfirm interviewId={interviewId ?? ""} userId={userId ?? ""}/>
      </div>
    </div>
  );
};

export default InterviewCard;
