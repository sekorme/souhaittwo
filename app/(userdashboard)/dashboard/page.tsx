
import React from "react";

import {getCurrentUser, signOut} from "@/lib/actions/auth.actions";
import { User } from "@heroui/user";
import Image from "next/image";
import SignOut from "@/components/SignOut";
import ActivityCard from "@/components/ActivityCard";
import {AuroraText} from "@/components/magicui/aurora-text";
import Loader from "@/components/Loader";
import SettingsDrawer from "@/components/SettingsDrawer";
import {Avatar} from "@heroui/react";
import Notification from "@/components/Notification";

const Dashboard = async() => {

    const userDetails = await getCurrentUser();
  return (
    <div className={" mt-5 px-4"}>
        <div className={"fixed relative flex w-ful items-center border-2 shadow-xl rounded-2xl p-3 justify-between"}>
            <div className={"hidden md:flex w-full"}>
                <Image src={"/logo2.png"} alt={"Souhait"} width={50} height={50} className={"rounded-xl"} />
            </div>






            <div className={"flex w-full md:w-2/4 lg:w-1/2   items-center justify-between"}>
               <div className={"hidden md:flex "} data-aos={"fade-left"}>
                   <User
                       avatarProps={{
                           src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                       }}
                       description={userDetails?.email}
                       name={userDetails?.name}

                   />
               </div>
                <div className={"sm:hidden "} data-aos={"fade-right"}>
                    <Image src={"https://i.pravatar.cc/150?u=a04258114e29026702d"} alt={"User image"} width={40} height={40} className={"rounded-full"} />
                </div>
                <div className={"flex items-center w-full justify-end gap-4"} data-aos={"fade-right"}>

                <Notification/>
                <SignOut/>
                <SettingsDrawer/>
                </div>
            </div>
        </div>
        <div className={"flex items-center mt-10"} >
            <h1 className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-7xl" data-aos={"fade-down"}>
                Hi, <AuroraText>Welcome </AuroraText> <span>{userDetails?.name.split(" ")[0]}</span>
            </h1>

        </div>
        <ActivityCard/>
        <div className={" w-full h-full mt-4 flex bg-gray-200 dark:bg-neutral-900 shadow-2xl rounded-2xl"}>
         hi
        </div>

    </div>
  );
};

export default Dashboard;
