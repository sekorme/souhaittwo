import React from 'react'
import Image from "next/image"
const Agent = () => {
    return (
        <div className={"flex sm:flex-row flex-col gap-10 items-center justify-between w-full"}>
            <div className={"flex-center flex-col gap-2 p-7 h-[400px] blue-gradient-dark rounded-lg border-2 border-primary-200/50 flex-1 sm:basis-1/2 w-full"}>
                   <div className={"z-10 flex items-center justify-center blue-gradient rounded-full size-[120px] relative"}>
                        <Image src={"/ai.gif"} alt={"ai assistant"} width={100} height={100} className={"object-cover"}/>
                   </div>
            </div>

        </div>
    )
}
export default Agent
