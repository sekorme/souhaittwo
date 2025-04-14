"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  avatar?: string;
  email: string;
}

const Sidebar = ({ email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          alt="logo"
          className="hidden h-auto lg:block"
          height={50}
          src="/pnglogo.png"
          width={160}
        />

        <Image
          alt="logo"
          className="lg:hidden"
          height={52}
          src="/pnglogo.png"
          width={52}
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} className="lg:w-full" href={url}>
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "shad-active",
                )}
              >
                <Image
                  alt={name}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active",
                  )}
                  height={24}
                  src={icon}
                  width={24}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        alt="logo"
        className="w-full"
        height={418}
        src="/assets/images/files-2.png"
        width={506}
      />
    </aside>
  );
};

export default Sidebar;
