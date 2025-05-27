'use client'
import React from 'react'
import Image from 'next/image'
import {useRouter} from "next/navigation";

const NotFound = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The page you are looking for does not exist.</p>
           <Image src="/notf.gif" alt="404" width={500} height={500}/>
            <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Go Back
            </button>
        </div>
    )
}
export default NotFound
