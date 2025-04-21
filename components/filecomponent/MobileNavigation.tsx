"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/filecomponent/FileUploader";
import { signOut } from "@/lib/actions/auth.actions"; // ← use Firebase logout

interface Props {
    avatar: string;
    fullName: string;
    email: string;
    $id: string;
    accountId: string;
}

const MobileNavigation = ({
                              email,
                              avatar,
                              fullName,
                              $id: ownerId,
                              accountId,
                          }: Props) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="mobile-header">
            <Image
                src="/pnglogo.png"
                alt="logo"
                width={52}
                height={52}
                className="h-auto"
            />

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button>
                        <Image
                            src="/assets/icons/menu.svg"
                            alt="menu"
                            width={30}
                            height={30}
                        />
                    </button>
                </SheetTrigger>

                <SheetContent className="shad-sheet h-screen px-3">
                    <SheetTitle>
                        <div className="header-user">
                            <Image
                                src={avatar}
                                alt="avatar"
                                width={44}
                                height={44}
                                className="header-user-avatar"
                            />
                            <div className="sm:hidden lg:block">
                                <p className="subtitle-2 capitalize">{fullName}</p>
                                <p className="caption">{email}</p>
                            </div>
                        </div>
                        <Separator className="mb-4 bg-light-200/20" />
                    </SheetTitle>

                    <nav className="mobile-nav">
                        <ul className="mobile-nav-list">
                            {navItems.map(({ url, name, icon }) => (
                                <Link key={name} href={url} className="lg:w-full">
                                    <li
                                        className={cn(
                                            "mobile-nav-item",
                                            pathname === url && "shad-active"
                                        )}
                                    >
                                        <Image
                                            src={icon}
                                            alt={name}
                                            width={24}
                                            height={24}
                                            className={cn(
                                                "nav-icon",
                                                pathname === url && "nav-icon-active"
                                            )}
                                        />
                                        <p>{name}</p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </nav>

                    <Separator className="my-5 bg-light-200/20" />

                    <div className="flex flex-col justify-between gap-5">
                        <FileUploader ownerId={ownerId} accountId={accountId} />
                        <Button
                            type="button"
                            className="mobile-sign-out-button"
                            onClick={async () => {
                                await signOut();
                                location.reload(); // Optional: reload to reflect logout
                            }}
                        >
                            <Image
                                src="/assets/icons/logout.svg"
                                alt="sign-out"
                                width={24}
                                height={24}
                            />
                            <p>Logout</p>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
};

export default MobileNavigation;
