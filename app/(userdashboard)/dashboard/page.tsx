
import React from "react";

import {getCurrentUser, signOut} from "@/lib/actions/auth.actions";
import { User } from "@heroui/user";
import Image from "next/image";
import SignOut from "@/components/SignOut";
import ActivityCard from "@/components/ActivityCard";
import {AuroraText} from "@/components/magicui/aurora-text";
import Loader from "@/components/Loader";
import SettingsDrawer from "@/components/SettingsDrawer";

const Dashboard = async() => {

    const userDetails = await getCurrentUser();
  return (
    <div className={" mt-5 px-4"}>
        <div className={"fixed relative flex w-ful items-center border-2 shadow-xl rounded-2xl p-1 justify-between"}>
            <div className={"hidden lg:flex w-full"}>
                <Image src={"/logo2.png"} alt={"Souhait"} width={50} height={50} className={"rounded-xl"} />
            </div>
            <div className={"flex w-full md:w-2/4 lg:w-1/2  gap-5 items-center justify-end "}>
                <User
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    description={userDetails?.email}
                    name={userDetails?.name}
                />
                <SignOut/>
                <SettingsDrawer/>
            </div>
        </div>
        <div className={"flex items-center mt-10"}>
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
                Hi, <AuroraText>Welcome </AuroraText>
            </h1>
            <Image src={"/loader.gif"} alt={"loader"} width={150} height={150} className={""} />
        </div>
        <ActivityCard/>
        <div className={" w-full h-full mt-4 flex bg-gray-200 dark:bg-neutral-900 shadow-2xl rounded-2xl"}>
         hi
        </div>

    </div>
  );
};

export default Dashboard;
