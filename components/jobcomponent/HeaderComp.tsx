import React from 'react'
import Image from "next/image";
import {User} from "@heroui/user";
import Notification from "@/components/Notification";
import SignOut from "@/components/SignOut";
import SettingsDrawer from "@/components/SettingsDrawer";
import {getCurrentUser} from "@/lib/actions/auth.actions"
import NotificationBell from "@/components/NotificationBell";
const HeaderComp = async() => {

    const userDetails = await getCurrentUser()
    return (

            <div
                className={"fixed relative flex w-ful items-center border-2 shadow-xl  p-3 justify-between"}>
                <div className={"hidden md:flex w-full"}>
                    <Image src={"/logo2.png"} alt={"Souhait"} width={50} height={50} className={"rounded-xl"}/>
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
                        <Image src={"https://i.pravatar.cc/150?u=a04258114e29026702d"} alt={"User image"} width={40}
                               height={40} className={"rounded-full"}/>
                    </div>
                    <div className={"flex items-center w-full justify-end gap-4"} data-aos={"fade-right"}>

                        <NotificationBell userId={userDetails?.id!}/>
                        <SignOut/>
                        <SettingsDrawer/>
                    </div>
                </div>
            </div>

    )
}
export default HeaderComp
