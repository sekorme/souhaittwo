import { redirect } from "next/navigation";

import { title } from "@/components/primitives";
import { isAuthenticated } from "@/lib/actions/auth.actions";

export default async function PricingPage() {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/dashboard");

  return (
    <div>
      <h1 className={title()}>Pricing</h1>
    </div>
  );
}
