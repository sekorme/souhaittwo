import {ReactNode} from "react";
import Link from "next/link";
import Image from "next/image";
import {TokenBalance} from "@/components/TokenBalance";
import {getCurrentUser} from "@/lib/actions/auth.actions";

const Layout = async({children}: { children: ReactNode }) => {
    const userDetails = await getCurrentUser();
    return (
        <div className={"root-layouttwo "}>
            <nav className={"flex items-center justify-between"}>
                <Link href={"/dashboard"}>
                    <Image src={"/logo2.PNG"} alt={"Souhait"} width={50} height={50} className={"rounded-xl"}/>
                </Link>
                <TokenBalance userId={userDetails?.id!}/>
            </nav>
            {children}
        </div>
    )
}
export default Layout