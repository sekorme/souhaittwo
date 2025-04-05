import React from 'react'
import Image from "next/image";

const Loader = () => {
    return (
        <div>
            <Image src={"/loader.gif"} alt={"loader"} width={500} height={500} className={"w-full h-full"} unoptimized={true}/>
        </div>
    )
}
export default Loader
