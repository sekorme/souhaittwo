"use client"

import { cn } from "@/lib/utils"

interface SafariProps extends React.SVGProps<SVGSVGElement> {
    url?: string
    width?: number
    height?: number
    className?: string
}

export default function SafariTwo({
                                      url = "https://souhait.com",
                                      width = 1203,
                                      height = 753,
                                      className,
                                      ...props
                                  }: SafariProps) {
    return (
        <div
            className={cn("w-full max-w-full", className)}
            style={{
                aspectRatio: `${width} / ${height}`,
            }}
        >
            <svg
                viewBox={`0 0 ${width} ${height}`}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <rect width={width} height={height} rx={40} fill="#fff" />

                {/* Top bar */}
                <rect x={0} y={0} width={width} height={80} rx={40} fill="#F9FAFB" />
                <circle cx={60} cy={40} r={8} fill="#EF4444" />
                <circle cx={90} cy={40} r={8} fill="#F59E0B" />
                <circle cx={120} cy={40} r={8} fill="#22C55E" />

                {/* Address bar */}
                <rect
                    x={150}
                    y={22}
                    rx={18}
                    ry={18}
                    width={width - 300}
                    height={36}
                    fill="#E5E7EB"
                />
                <text
                    x={width / 2}
                    y={47}
                    textAnchor="middle"
                    fill="#6B7280"
                    fontSize="16"
                    fontFamily="Arial, sans-serif"
                >
                    {url.replace(/^https?:\/\//, "")}
                </text>

                {/* Content placeholder */}
                <rect
                    x={60}
                    y={120}
                    width={width - 120}
                    height={height - 160}
                    rx={20}
                    fill="#F3F4F6"
                />
                <text
                    x={width / 2}
                    y={height / 2}
                    textAnchor="middle"
                    fill="#9CA3AF"
                    fontSize="24"
                    fontFamily="Arial, sans-serif"
                >
                    Safari Preview
                </text>
            </svg>
        </div>
    )
}
