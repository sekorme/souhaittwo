import React from "react";

import JobHero from "@/components/jobcomponent/JobHero";
import JobCategories from "@/components/jobcomponent/JobCategories";
import HowItWorks from "@/components/jobcomponent/HowItWorks";
import HeaderComp from "@/components/jobcomponent/HeaderComp";
import SubscriptionPlans from "@/components/jobcomponent/Subscribe";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { isSubscribed } from "@/lib/actions/checkSubscription";
import {checkAndNotifySubscription} from "@/lib/actions/CheckNotificationSubscription";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Jobs = async () => {
  const user = await getCurrentUser();
  const hasAccess = await isSubscribed(user?.id!);
  await checkAndNotifySubscription(user?.id!);

  return hasAccess ? (
    <div className={"mb-20 mt-10"}>
      <h1 className={"text-4xl text-center"}>Paid Services activated</h1>
        <Link href={"/jobs/search"} className={"flex justify-center mt-5"}>

        <Button>Search for jobs</Button>
        </Link>
    </div>
  ) : (
    <div className={"mb-20"}>
      <HeaderComp />
      <JobHero />
      <JobCategories />
      <HowItWorks />
      {user && <SubscriptionPlans email={user.email} userId={user.id} />}
    </div>
  );
};

export default Jobs;
