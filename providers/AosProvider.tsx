// app/layout.tsx or app/providers.tsx (make sure it's a client component)
'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AosProviders({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        AOS.init({
            duration: 1000, // animation duration in ms
            once: true, // whether animation should happen only once
        })
    }, [])

    return <>{children}</>
}
