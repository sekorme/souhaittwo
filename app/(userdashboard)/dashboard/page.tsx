
import React from "react";

import {getCurrentUser, signOut} from "@/lib/actions/auth.actions";
import { User } from "@heroui/user";
import Image from "next/image";
import SignOut from "@/components/SignOut";
import ActivityCard from "@/components/ActivityCard";
import {AuroraText} from "@/components/magicui/aurora-text";
import Loader from "@/components/Loader";
import SettingsDrawer from "@/components/SettingsDrawer";
import {Avatar, AvatarIcon} from "@heroui/avatar";
import Notification from "@/components/Notification";
import BuyTokenCard from "@/components/BuyTokenCard";
import {TokenBalance} from "@/components/TokenBalance";
import { ResponsiveContainer } from "recharts";
import { PieChart } from "recharts";
import { LineChart,Pie, Cell } from "recharts";
import { Line } from "recharts";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { Tooltip } from "recharts";

import { Card, CardHeader, CardBody } from "@heroui/card";
import PieChartComponent from "@/components/PieChartComponent";
import VisaChartComponent from "@/components/VisaChartComponent";
import NewLineComponent from "@/components/NewLineComponent";
import NewCellCom from "@/components/NewCellCom";
import LineChartComponent from "@/components/NewLineComponent";





const recentCustomers = [
    "Taylor Reed",
    "Sophia Martinez",
    "David Kim",
    "Priya Singh",
    "Michael Chen",
];

const interviewPerformance = [
    { name: "John Doe", date: "Sep 20" },
    { name: "Emily Chang", date: "Sep 18" },
    { name: "Aiden Brooks", date: "Sep 15" },
    { name: "Sarah Johnson", date: "Sep 14" },
];








const Dashboard = async() => {

    const userDetails = await getCurrentUser();
  return (
      <div className={" mt-5 px-4 mb-20"}>
          <div className={"fixed relative flex w-ful items-center border-2 shadow-xl rounded-2xl p-3 justify-between"}>
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
                  <div className={"flex items-center w-full justify-end gap-6"} data-aos={"fade-right"}>
                      <TokenBalance userId={userDetails?.id!}/>
                      <Notification/>
                      <SignOut/>
                      <SettingsDrawer/>
                  </div>
              </div>
          </div>
          <div className={"flex items-center mt-10"}>
              <h1 className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-7xl" data-aos={"fade-down"}>
                  Hi, <AuroraText>Welcome </AuroraText> <span>{userDetails?.name.split(" ")[0]}</span>
              </h1>

          </div>

          <ActivityCard/>
          <div
              className={" w-full h-full p-4 mt-4 gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 bg-gray-200 dark:bg-neutral-900 shadow-2xl rounded-2xl"}>
              <BuyTokenCard tokens={100} price={100} userId={userDetails?.id!} email={userDetails?.email!}/>
              <BuyTokenCard tokens={100} price={100} userId={userDetails?.id!} email={userDetails?.email!}/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 gap-4 mb-10">
              <Card><CardBody className="p-4"><p className="text-gray-400">Visa Applications</p><h3
                  className="text-xl font-bold">12,450</h3></CardBody></Card>
              <Card><CardBody className="p-4"><p className="text-gray-400">Job Interviews</p><h3
                  className="text-xl font-bold">3,210</h3></CardBody></Card>
              <Card><CardBody className="p-4"><p className="text-gray-400">Customers</p><h3
                  className="text-xl font-bold">1,800</h3></CardBody></Card>
              <Card>
                  <CardBody className="p-4">
                      <p className="text-gray-400">Approval Rate</p>
                    <LineChartComponent/>
                      <p className="text-sm mt-2">Visa 65%</p>
                  </CardBody>
              </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                  <CardBody className="p-4">
                      <VisaChartComponent/>
                  </CardBody>
              </Card>

              {/* Interview Performance */}
              <Card>
                  <CardBody className="p-4 space-y-2">
                      <p className="text-gray-400 font-medium">Interview Performance</p>
                      {interviewPerformance.map((item, i) => (
                          <div key={i} className="flex justify-between">
                              <p>{item.name}</p>
                              <p className="text-gray-400 text-sm">{item.date}</p>
                          </div>
                      ))}
                  </CardBody>
              </Card>
          </div>

          {/* Recent Customers and Interviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3 mb-10">
              <Card>
                  <CardBody className="p-4 space-y-2">
                      <p className="text-gray-400 font-medium">Recent Customers</p>
                      {recentCustomers.map((name, i) => (
                          <div key={i} className="flex items-center gap-3">
                              <Avatar>{name[0]}</Avatar>
                              <p>{name}</p>
                          </div>
                      ))}
                  </CardBody>
              </Card>

              <Card>
                  <CardBody className="p-4">
                      <p className="text-gray-400 font-medium">Pending Interviews</p>
                      <PieChartComponent/>
                      <ul className="space-y-1 mt-2">
                          {interviewPerformance.map((item, i) => (
                              <li key={i} className="flex justify-between text-sm">
                                  <span>{item.name}</span>
                                  <span className="text-gray-400">{item.date}</span>
                              </li>
                          ))}
                      </ul>
                  </CardBody>
              </Card>
          </div>

      </div>
  );
};

export default Dashboard;
