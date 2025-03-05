import { title } from "@/components/primitives";
import {redirect} from "next/navigation";
import {getCurrentUser} from "@/lib/actions/users.actions";

export default async function PricingPage() {
    const currentUser = await getCurrentUser();
    if (currentUser) return redirect("/dashboard");
  return (
    <div>
      <h1 className={title()}>Pricing</h1>
    </div>
  );
}
