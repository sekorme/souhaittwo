"use client";
import React from "react";

import { signOut } from "@/lib/actions/auth.actions";

const Dashboard = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className={"md:mt-20 mt-5"}>
      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>SignOut</button>
    </div>
  );
};

export default Dashboard;
