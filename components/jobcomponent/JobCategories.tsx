import React from 'react'

const JobCategories = () => {
    return (
        <div className={"mt-10"}>
            <div>
                <h1 className="text-2xl font-semibold text-gray-500 text-center">Popular Job Categories</h1>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-5 text-center">
                    Discover a wide range of job categories.
                </p>
            </div>

            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl shadow-xl">
                    {["Software Engineer", "Data Scientist", "Product Manager", "Designer"].map((category, index) => (
                        <div key={index} className="flex flex-col items-center justify-center  dark:bg-neutral-900 border-1 p-5 hover:shadow-xl  rounded-lg">
                            <h2 className="text-lg font-semibold text-gray-500">{category}</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">100+ Jobs</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default JobCategories
