import React, {useEffect, useRef, useState} from 'react'
import { ChevronLeft, ChevronRight, PanelLeft,Plus , Copy, Upload} from 'lucide-react';
import { FaShieldAlt } from "react-icons/fa";

const Browser = () => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoSource = ["/safari.mp4"];
    const videoRef = useRef<any>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = videoSource[currentVideo]; // Update the video source
            videoRef.current.play(); // Ensure the video starts playing
        }
    }, [currentVideo]);

    const handleVideoEnd = () => {
        setCurrentVideo((prevIndex) => (prevIndex + 1) % videoSource.length);
    };
    return (
        <div className={"w-full rounded-xl bg-gray-300 dark:bg-neutral-600 p-1 mt-10 shadow-xl"}>
            <div className={"flex  items-center gap-3 justify-center overflow-hidden"}>
                <div className={"flex gap-1 "}>
                    <div className={"w-[10px] h-[10px] bg-[#00d346] rounded-full flex p-1 items-center justify-center"}></div>
                    <div className={"w-[10px] h-[10px] bg-[#00d346] rounded-full  "}></div>
                    <div className={"w-[10px] h-[10px] bg-[#00d346] rounded-full "}></div>
                </div>
                <div className={"flex items-center  gap-3 justify-between"}>
                   <div className={"flex"}>
                       <PanelLeft size={12}/>
                       <ChevronLeft size={12}/>
                       <ChevronRight size={12}/>
                   </div>
                    <div className={""}>

                        <FaShieldAlt size={12}/>
                    </div>
                </div>
                <div className={"w-full rounded-2xl bg-neutral-200 p-1 dark:bg-neutral-800"}><p className={"text-center text-xs"}>www.souhiattraveladvisors.com</p></div>

                <div className={"flex gap-1"}>
                    <Upload size={12}/>
                    <Plus size={12}/>
                    <Copy size={12}/>

                </div>

            </div>
            <div className={"relative w-full md:h-[400px]  h-[250px] bg-neutral-900 mt-2 rounded-xl"}>
                <video
                   src={"/safari.mp4"}
                    autoPlay
                    muted
                   loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full rounded-xl object-cover"

                >
                    <source src={videoSource[currentVideo]} type="video/mp4"/>
                </video>
            </div>
        </div>
    )
}
export default Browser
