import React from 'react'
import JobHero from "@/components/jobcomponent/JobHero";
import JobCategories from "@/components/jobcomponent/JobCategories";

const Jobs = () => {
    return (
        <div className={"mb-20"}>
            <JobHero/>
            <JobCategories/>
        </div>
    )
}
export default  Jobs
