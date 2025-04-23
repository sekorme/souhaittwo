"use client";
import React from "react";
import { Input, Button } from "@heroui/react";
import { Search, MapPin } from "lucide-react";
import {NumberTicker} from "@/components/magicui/number-ticker";
import {Safari} from "@/components/magicui/safari";

const JobHero = () => {
  return (
    <div className="w-full  bg-white-gradient dark:bg-dark-gradient grid grid-cols-1 md:grid-cols-2  justify-center items-center" >
      <div className="w-full flex flex-col  mt-10 p-5 ">
        <h1 className="md:text-4xl text-xl font-semibold sm:text-centr capitalize" data-aos={"fade-up"}>
          There are <span className={"text-[#00d346]"}> <NumberTicker
            value={489565}
            className="whitespace-pre-wrap text-xl md:text-4xl font-medium tracking-tighter text-[#00d346] dark:text-[#00d346]"/>
        </span> jobs
          waiting for you!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-5" data-aos={"fade-up"}>
          Find jobs, Employment & Career Opportunities.
        </p>
        <div
          className={
            "items-center grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 md:p-5 md:bg-white md:dark:bg-neutral-800 rounded-xl  md:shadow-xl"
          }
          data-aos={"fade-left"}
        >
          <div className="flex flex-row items-center justify-start bg-white dark:bg-neutral-800 p-2 rounded-lg">
            <Input
              className={
                "bg-transparent border-none focus:border-none focus:outline-none"
              }
              placeholder={"Job title, keywords or company"}
              startContent={<Search className={"text-[#00d346]"} size={20} />}
              type={"text"}
            />
          </div>

          <div className="flex flex-row items-center justify-start bg-white dark:bg-neutral-800 p-2 rounded-lg">
            <Input
              className={
                "bg-transparent border-none focus:border-none focus:outline-none"
              }
              placeholder={"Location"}
              startContent={<MapPin className={"text-[#00d346]"} size={20} />}
              type={"text"}
            />
          </div>
          <Button className="bg-[#00d346] text-white rounded-lg p-2">
            Find Jobs
          </Button>
        </div>
        <div className="flex flex-row items-center justify-start mt-10 md:mt-5">
          <p className="font-bold text-sm dark:text-gray-500 text-gray-500" data-aos={"fade-up"}>
            Popular Searches:
          </p>
          <p className="text-xs dark:text-gray-500 text-gray-500 ml-2" data-aos={"fade-down"}>
            Care Worker, Skill Worker, Carpenter, Nurse, Truck Driver, Developer{" "}
          </p>
        </div>
      </div>

      {/* Image section */}
      <div className="hidden md:flex w-full flex justify-center mb-20 p-5 items-center mt-4">
        <div className="relative md:mt-10 mt-5" data-aos={"fade-left"} >
          <Safari
              url="wwww.souhaittraveladvisors.com"
              className="size-full"
              videoSrc="/safari.mp4"
          />
        </div>
      </div>
    </div>
  );
};

export default JobHero;
