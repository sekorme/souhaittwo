import React from 'react'

const JobHero = () => {
    return (
        <div className="w-full  bg-white-gradient dark:bg-dark-gradient grid grid-cols-1 md:grid-cols-2  justify-center items-center">
            <div className="w-full flex flex-col justify-center mt-10 p-5 items-center">
                <h1 className="md:text-4xl text-xl font-semibold sm:text-centr capitalize">There are <span className={"text-[#00d346]"}>482,049</span> jobs waiting for you!</h1>
                <p className="text-lg text-center mt-2">Explore thousands of job opportunities with just one search.</p>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
                <input type="text" placeholder="Search for jobs..." className="border border-gray-300 rounded-lg p-2 w-1/2" />
                <button className="bg-blue-500 text-white rounded-lg p-2 ml-2">Search</button>
            </div>
        </div>
    )
}
export default JobHero
