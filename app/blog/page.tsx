import { redirect } from "next/navigation";

import { title } from "@/components/primitives";
import { isAuthenticated } from "@/lib/actions/auth.actions";

export default async function BlogPage() {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/dashboard");

  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}
