import React from 'react'
import JobHero from "@/components/jobcomponent/JobHero";
import JobCategories from "@/components/jobcomponent/JobCategories";
import HowItWorks from "@/components/jobcomponent/HowItWorks";
import HeaderComp from "@/components/jobcomponent/HeaderComp";
import SubscriptionPlans from "@/components/jobcomponent/Subscribe";

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
            <HeaderComp/>
            <JobHero/>
            <JobCategories/>
            <HowItWorks/>
            <SubscriptionPlans/>

        </div>
    )


    }


export default  Jobs
