import {ReactNode} from "react";
import Link from "next/link";
import Image from "next/image";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <div className={"root-layouttwo "}>
            <nav>
                <Link href={"/dashboard"}>
                    <Image src={"/logo2.PNG"} alt={"Souhait"} width={50} height={50} className={"rounded-xl"}/>
                </Link>
            </nav>
            {children}
        </div>
    )
}
export default Layout