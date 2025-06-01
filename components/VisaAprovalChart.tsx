"use client"

import { TrendingUp } from "lucide-react"
import {
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
    Label,
} from "recharts"
import {

    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Card} from "@heroui/react"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { BorderBeam } from "@/components/magicui/border-beam"
import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { db } from "@/firebase/client"
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
} from "firebase/firestore"
import dayjs from "dayjs"

const chartConfig = {
    ratings: {
        label: "rating",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig



export async function getLatestInterviewIdByUserId(userId: string): Promise<string | null> {
    try {
        const interviewsRef = collection(db, "interviews")
        const q = query(
            interviewsRef,
            where("userId", "==", userId),
            orderBy("createdAt", "desc"),
            limit(1)
        )
        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
            const doc = snapshot.docs[0]
            return doc.id
        }

        return null
    } catch (error) {
        console.error("Error fetching latest interview:", error)
        return null
    }
}



export default function VisaApprovalChart() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const interviewId = searchParams.get("id")

    const [score, setScore] = useState<number | null>(null)
    const [time, setTime] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getCurrentUser()
                console.log(user)

                if (!user) {
                    router.push("/auth/login")
                    return
                }

                // If no interviewId in query, fetch latest
                let resolvedInterviewId = interviewId
                if (!resolvedInterviewId) {
                    resolvedInterviewId = await getLatestInterviewIdByUserId(user.id)
                    if (!resolvedInterviewId) {
                        router.push("/dashboard")
                        return
                    }
                }

                const feedbackRef = collection(db, "feedback")
                const q = query(
                    feedbackRef,
                    where("interviewId", "==", resolvedInterviewId),
                    where("userId", "==", user.id),
                    limit(1)
                )

                const snapshot = await getDocs(q)

                if (!snapshot.empty) {
                    const doc = snapshot.docs[0]
                    const data = doc.data()

                    setScore(data?.totalScore || 0)
                    setTime(
                        data?.createdAt
                            ? dayjs(data.createdAt.toDate?.() || data.createdAt).format("MMM D, YYYY h:mm A")
                            : "N/A"
                    )
                } else {
                    setScore(0)
                    setTime("N/A")
                }
            } catch (err) {
                console.error("Error loading chart data", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [interviewId, router])


    const chartData = [
        {
            browser: "safari",
            rating: score || 0,
            fill: "green",
        },
    ]

    if (loading) return <p className="text-center">Loading chart...</p>

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Visa Approval - Chances</CardTitle>
                <CardDescription>{time}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={250}
                        innerRadius={80}
                        outerRadius={110}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="rating" background cornerRadius={10} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {chartData[0].rating.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Rating
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    This data is based on your last performance{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    May change depending on your performance in the next interview
                </div>
            </CardFooter>

            <BorderBeam
                duration={6}
                size={400}
                className="from-transparent via-amber-500 to-transparent"
            />
            <BorderBeam
                duration={6}
                delay={3}
                size={400}
                className="from-transparent via-blue-500 to-transparent"
            />
        </Card>
    )
}
