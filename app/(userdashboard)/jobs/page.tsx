import React from 'react'
import JobHero from "@/components/jobcomponent/JobHero";
import JobCategories from "@/components/jobcomponent/JobCategories";
import HowItWorks from "@/components/jobcomponent/HowItWorks";

const Jobs = () => {
    const isPaid = false


        if (isPaid) {

            return (
                <div className={"mb-20 mt-10"}>
                    <h1 className={"text-4xl text-center"}>Paid Services activated</h1>
                </div>
            )

        }


    return (

        <div className={"mb-20"}>
            <JobHero/>
            <JobCategories/>
            <HowItWorks/>
        </div>
    )


    }


export default  Jobs
