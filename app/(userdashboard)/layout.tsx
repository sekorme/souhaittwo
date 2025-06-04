import React from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.actions";
import LayoutTrans from "@/components/LayoutTrans";
import {useFCMToken} from "@/components/useFCMToken";
import {RegisterSW} from "@/components/RegisterSW";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");

  return <div className={""}>
    <RegisterSW/>
    <LayoutTrans>
    {children}
    </LayoutTrans>
  </div>;
};

export default Layout;
