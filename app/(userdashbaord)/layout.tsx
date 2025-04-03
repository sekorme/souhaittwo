import React from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.actions";
import LayoutTrans from "@/components/LayoutTrans";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");

  return <div className={""}>
    <LayoutTrans>
    {children}
    </LayoutTrans>
  </div>;
};

export default Layout;
