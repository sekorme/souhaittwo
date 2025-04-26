import React from 'react'
import {FolderCode} from "lucide-react";
import { HiMiniRocketLaunch, HiBanknotes } from "react-icons/hi2"
import { PiProjectorScreenChartFill } from "react-icons/pi";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaSuitcaseMedical , FaPeopleGroup} from "react-icons/fa6";
import { FaPaintBrush } from "react-icons/fa";
import { BsMegaphoneFill } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";



const JobCategories = () => {
    const data = [
        {
            icon: <HiMiniRocketLaunch size={40}/>,
            title: "Engineering",
            description: "100+ Jobs"
        },
        {
            icon: <HiBanknotes size={40}/>,
            title: "Finance",
            description: "100+ Jobs"
        },
        {
            icon: <PiProjectorScreenChartFill size={40}/>,
            title: "Project Management",
            description: "100+ Jobs"
        },
        {
            icon: <RiCustomerService2Line size={40}/>,
            title: "Customer Service",
            description: "100+ Jobs"
        },
        {
            icon: <FaSuitcaseMedical size={40}/>,
            title: "Health & Care",
            description: "100+ Jobs"
        },
        {
            icon: <FaPeopleGroup size={40}/>,
            title: "Human Resources",
            description: "100+ Jobs"
        },
        {
            icon: <FaPaintBrush size={40}/>,
            title: "Design",
            description: "100+ Jobs"
        },
        {
            icon: <BsMegaphoneFill size={40}/>,
            title: "Marketing & PR",
            description: "100+ Jobs"
        },
        {
            icon: <FaLaptopCode size={40}/>,
            title: "IT & Software",
            description: "100+ Jobs"
        },
    ]
    return (
        <div className={"mt-10"}>
            <div>
                <h1 className="text-2xl font-semibold text-gray-500 text-center" data-aos={"fade-down"}>Popular Job Categories</h1>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-5 text-center" data-aos={"fade-up"}>
                    Discover a wide range of job categories.
                </p>
            </div>

            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 mt-10 rounded-xl ">
                    {data.map((category, index) => (
                        <div
                            key={index}
                            className="group flex items-center space-x-10  dark:bg-neutral-900 border-1 p-2 hover:shadow-xl rounded-lg"
                            data-aos={"fade-right"}
                        >
                            <div className="text-[#049117] bg-neutral-200 dark:bg-neutral-800 group-hover:text-white p-5 rounded-xl group-hover:bg-[#049117]  transition-colors duration-300">
                                {category.icon}
                            </div>
                            <div className={"text-start"}>
                                <h2 className="text-lg font-semibold text-gray-500">{category.title}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default JobCategories
