import React from 'react'
import {TechIconProps} from "@/types";
import {cn, getTechLogos} from "@/lib/utils";
import Image from "next/image";

const DisplayTechIcons = async ({techStack}:TechIconProps) => {
    const techIcons = await getTechLogos(techStack);
    return (
        <div className={"flex flex-row"}>{techIcons.slice(0,3).map(({tech, url}, index) =>(
            <div key={tech} className={cn("relative group bg-neutral-500 rounded-full p-2 flex-center", index >= 1 && '-ml-3')}>
              <span className={" absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md"}>{tech}</span>
                <Image src={url} alt={tech} width={100} height={100} className={"size-5"} />
            </div>
        ))}</div>
    )
}
export default DisplayTechIcons
