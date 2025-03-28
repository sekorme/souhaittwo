import { redirect } from "next/navigation";

import { title } from "@/components/primitives";
import { isAuthenticated } from "@/lib/actions/auth.actions";

export default async function AboutPage() {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/dashboard");

  return (
    <div>
      <h1 className={title()}>About</h1>
    </div>
  );
}
