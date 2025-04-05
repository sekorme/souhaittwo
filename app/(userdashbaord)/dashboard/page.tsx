
import React from "react";

import {getCurrentUser, signOut} from "@/lib/actions/auth.actions";
import { User } from "@heroui/user";
import Image from "next/image";
import SignOut from "@/components/SignOut";
import ActivityCard from "@/components/ActivityCard";

const Dashboard = async() => {

    const userDetails = await getCurrentUser();
  return (
    <div className={" mt-5 px-4"}>
        <div className={"fixed relative flex w-ful items-center justify-between"}>
            <div className={"hidden lg:flex w-full"}>
                <Image src={"/logo2.png"} alt={"Souhait"} width={50} height={50} className={"rounded-xl"} />
            </div>
            <div className={"flex w-full md:w-2/4 lg:w-1/2  gap-2 items-center justify-between "}>
                <User
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    description={userDetails?.email}
                    name={userDetails?.name}
                />
                <SignOut/>
            </div>
        </div>
        <ActivityCard/>
      <div className={" w-full h-full mt-4 flex bg-gray-200 dark:bg-neutral-900 shadow-2xl rounded-2xl"}>

      </div>

    </div>
  );
};

export default Dashboard;
