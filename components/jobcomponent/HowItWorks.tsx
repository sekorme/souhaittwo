import React from 'react'
import Image from 'next/image'
const HowItWorks = () => {
    return (
        <div className="w-full rounded-xl mt-10 ">
            <h1 className={"mb-10 text-center text-3xl font-bold"}>How it Works</h1>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 p-4"}>
                <div className={"  flex items-center justify-center"} data-aos={"fade-right"}>
                    <Image src={"/howitworks-2.webp"} alt={"Souhait"} width={400} height={300}
                           className={"w-[400px] h-[300px] rounded-xl"}/>
                </div>
                <div className={"flex items-center justify-center flex-col"}>
                    <div>
                        <h2 className={"text-3xl font-bold text-light-100"} data-aos={"fade-left"}>Create an
                            Account</h2>
                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O1. <span
                            className={"text-sm font-light text-gray-500"}>Visit the Souhait Travel Advisors Platform.</span>
                        </p>
                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O2. <span
                            className={"text-sm font-light text-gray-500"}>Sign up for a free account or login into your existing account.</span>
                        </p>
                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O3. <span
                            className={"text-sm  font-light text-gray-500"}>Complete your profile with basic detials like your fulll name, country, city and job type to access job search features.</span>
                        </p>
                    </div>

                </div>
            </div>

            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 p-4"}>

                <div className={"flex order-2 md:order-1 items-center justify-center flex-col"}>
                    <div className={""}>
                        <h2 className={"text-3xl font-bold text-light-100"} data-aos={"fade-left"}>Subscribe to a
                            Package</h2>
                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O1. <span
                            className={"text-sm font-light text-gray-500"}>Choose a package that best suits your needs.</span>
                        </p>
                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O2. <span
                            className={"text-sm font-light text-gray-500"}>Select and Subscribe to the package that fits your needs.</span>
                        </p>
                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O3. <span
                            className={"text-sm  font-light text-gray-500"}> Complete payment securely to access job search features.</span>
                        </p>

                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O4. <span
                            className={"text-sm  font-light text-gray-500"}>Access Joblistings, AI Mock Interview, Documents Review and CV drafting with our AI powered tools.</span>
                        </p>
                    </div>

                </div>

                <div className={" order-1 md:order-2 flex items-center justify-center"} data-aos={"fade-right"}>
                    <Image src={"/howitworks-1.webp"} alt={"Souhait"} width={300} height={300}
                           className={"w-[300px] h-[300px] rounded-xl"}/>
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 p-4"}>
                <div className={"  flex items-center justify-center"} data-aos={"fade-right"}>
                    <Image src={"/howitworks-3.webp"} alt={"Souhait"} width={400} height={300}
                           className={"w-[400px] h-[300px] rounded-xl"}/>
                </div>
                <div className={"flex items-center justify-center flex-col"}>
                    <div>
                        <h2 className={"text-3xl font-bold text-light-100"} data-aos={"fade-left"}>Search for Jobs</h2>
                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O1. <span
                            className={"text-sm font-light text-gray-500"}>Instantly access verified job listings after subscribing.</span>
                        </p>
                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O2. <span
                            className={"text-sm font-light text-gray-500"}>Use filters to refine your search by country, role, or job type.</span>
                        </p>
                        <p className={"text-[#00d346] text-xl font-bold mt-4"} data-aos={"fade-left"}>O3. <span
                            className={"text-sm  font-light text-gray-500"}>Track your applications and get updates via email or WhatsApp notifications.</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default HowItWorks
