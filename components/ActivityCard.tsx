"use client";
import React from "react";
import { Card, CardHeader, Avatar, Button } from "@heroui/react";
import { Mic, FileText, FileCheck2, CalendarClock } from "lucide-react";
import {BorderBeam} from "@/components/magicui/border-beam";
import Link from "next/link";

export default function ActivityCard() {
  const activityData = [
    {
      id: 1,
      title: "Voice Assistant",
      description: "Interview Coach",
      avatarUrl: <Mic  size={24} />,
      action: "Start Practice",
      path: "/interview",
    },
    {
      id: 2,
      title: "Draft",
      description: "Draft Your Documents",
      avatarUrl: <FileText  size={24} />,
      action: "Draft",
      path: "/draft",
    },
    {
      id: 3,
      title: "Documents",
      description: "Review Your Documents",
      avatarUrl: <FileCheck2  size={24} />,
      action: "Review",
      path: "/files",
    },
    {
      id: 4,
      title: "Appointment",
      description: "Schedule an Appointment",
      avatarUrl: <CalendarClock  size={24} />,
      action: "Schedule",
      path: "/schedule",
    },
  ];

  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <div
      className={
        "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-4 p-4"
      }
    >
      {activityData.map((activity) => (
        <Card key={activity.id} className="w-full  dark:bg-neutral-900 shadow-lg rounded-2xl">
          <CardHeader className=" justify-between gap-2">
            <div className="flex gap-5">
              <Avatar
                isBordered
                icon={activity.avatarUrl}
                radius="full"
                size="md"
                className={"animate-aurora"}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {activity.title}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  {activity.description}
                </h5>
              </div>
            </div>
          <Link href={activity.path} className="">
            <Button

                className={
                  "w-[100px] shadow-2xl"
                }
                color="primary"
                radius="full"
                size="sm"
                href={activity.path}
            >
              {activity.action}
            </Button>
          </Link>
          </CardHeader>
          <BorderBeam
              duration={6}
              size={400}
              className="from-transparent via-amber-500 to-transparent"
          />
          <BorderBeam
              duration={6}
              delay={3}
              size={400}
              className="from-transparent via-blue-500 to-transparent"
          />
        </Card>
      ))}
    </div>
  );
}
