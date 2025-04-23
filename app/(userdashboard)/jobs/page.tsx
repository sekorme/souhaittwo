import React from 'react'
import JobHero from "@/components/jobcomponent/JobHero";
import JobCategories from "@/components/jobcomponent/JobCategories";

const Jobs = () => {
    const isPaid = false

    {
        if (isPaid) {
            return (
                <div className={"mb-20"}>
                    <JobHero/>
                    <JobCategories/>
                </div>
            )
        }
        return (
            <div className={"mb-20 mt-10"}>
  <h1 className={"text-4xl text-center text-bold"}> Not Paid</h1>
            </div>
        )

    }

}
export default  Jobs
