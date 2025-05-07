import React from 'react'
import {Feedback, InterviewCardProps} from "@/types";
import dayjs from "dayjs"
import {getRandomInterviewCover} from "@/lib/utils";
import Image from "next/image";
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewCard = ({interviewId, userId, role, type, techstack, createdAt}: InterviewCardProps) => {

    const feedback = null as Feedback | null
    const normalizedType= /mix/gi.test(type) ? "mixed" : type
    const formattedDate = dayjs(feedback?.createdAt|| createdAt || Date.now()).format('MMM D, YYYY')
    return (
        <div className={"bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5 rounded-2xl w-fit w-[360px] max-sm:w-full "}>
              <div className={"card-interview "}>
                 <div>
                     <div className={"absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-indigo-600 "}>
                        <p className={"badge-text "}>{normalizedType}</p>
                     </div>
                     <Image src={getRandomInterviewCover()} alt ={"interviews"} width={50} height={50} className={"rounded-full object-fit size-[50px]"}/>
                     <h3 className={" text-2xl font-semibold text-white mt-5 capitalize"}>
                         {role} Interview
                     </h3>

                     <div className={"flex flex-row gap-5 mt-3"}>
                            <div className={"flex flex-row gap-2"}>
                                <Image src={'/calendar.svg'} alt ={"calendar"} width={20} height={20} />
                                <p className={"text-sm text-white"}>{formattedDate}</p>
                            </div>
                         <div className={"flex flex-row gap-2 items-center"}>
                             <Image src={'/star.svg'} alt ={"star"} width={20} height={20} />
                                <p className={"text-sm text-white"}>{feedback?.totalScore || '--'}/100</p>
                         </div>
                     </div>
                     <p className={"line-clamp-2 mt-5"}>
                            {feedback?.finalAssessment || "You haven't taken your interview yet. Take it now to improve your skills"}
                     </p>
                 </div>
                  <div className={"flex flex-row justify-between"}>
                      <DisplayTechIcons techStack={techstack}/>
                      <Button className={"w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10 "}>
                          <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>
                              {feedback ? "See Feedback" : "Continue Interview"}
                          </Link>
                      </Button>
                  </div>
              </div>
        </div>
    )
}
export default InterviewCard
