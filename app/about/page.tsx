import { title } from "@/components/primitives";
import {getCurrentUser} from "@/lib/actions/users.actions";
import {redirect} from "next/navigation";

export default async function AboutPage() {
    const currentUser = await getCurrentUser();
    if (currentUser) return redirect("/dashboard");
  return (
    <div>
      <h1 className={title()}>About</h1>
    </div>
  );
}
