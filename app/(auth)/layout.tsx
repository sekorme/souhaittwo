import React from "react";
import Image from "next/image";

import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {


    return (
        <div className={`flex min-h-screen`}>
            <section
                className={
                    " p-10 hidden w-1/2  items-center justify-center lg:flex xl:w-2/5  rounded-t-r-full"
                }
            >
                <div
                    className={
                        "flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12"
                    }
                >

                    <div className={"space-y-5 "}>
                        <h1 className="text-[34px] leading-[42px] font-bold text-[#00d346]">Souhait Travel Advisors</h1>
                        <p className={"text-[16px] leading-[24px] font-light"}>At Souhait, we  help our clients save money by eliminating unnecessary middlemen. Instead of paying excessive fees to agents, our clients receive direct guidance on visa applications and travel processes at a fraction of the cost. Plus we provide expert advice on job opportunities abroad.
                        </p>
                    </div>
                    <Image
                        src={"/pnglogo.png"}
                        alt={"Files"}
                        loading={"lazy"}
                        width={342}
                        height={342}
                        className={"transition-all rounded-2xl hover:rotate-2 hover:scale-105"}
                    />
                </div>
            </section>

            <section className="flex flex-1 w-full flex-col   items-center justify-center ">
                <div className={"mb-5 lg:hidden"}>
                    <Image
                        src={"/pnglogo.png"}
                        alt={"logo"}
                        width={224}
                        height={82}
                        className={"h-auto w-[200px] lg:w-[250px]"}
                    />
                </div>
                {children}
            </section>
        </div>
    );
};
export default Layout;
