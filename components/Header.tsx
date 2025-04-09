import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/users.actions";

const Header = ({
  accountId,
  userId,
}: {
  accountId?: string;
  userId?: string;
}) => {
  return (
    <header className={"header"}>
      <Search />
      <div className={"header-wrapper"}>
        <FileUploader accountId={accountId} ownerId={userId} />
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <Button className={"sign-out-button"} type={"submit"}>
            <Image
              alt={"sign-out"}
              className={"w-6"}
              height={24}
              src={"/assets/icons/logout.svg"}
              width={24}
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
