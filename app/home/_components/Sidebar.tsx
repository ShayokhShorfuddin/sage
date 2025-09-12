"use client";

import {
  ChartNoAxesColumnIcon,
  ChevronLeft,
  ChevronRight,
  History,
  Home as HomeIcon,
  MessageCircleMoreIcon,
  Settings2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Icon from "@/public/images/icon.png";
import { LogoutUserAction } from "../../actions/user";

type SidebarProps = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

// Array of navigation links for easier mapping
const navLinks: Array<{ name: string; href: string; icon: React.ReactNode }> = [
  {
    name: "Home",
    href: "/home",
    icon: <HomeIcon className="size-5 stroke-neutral-400" />,
  },
  {
    name: "Start interview",
    href: "/home/interview",
    icon: <MessageCircleMoreIcon className="size-5 stroke-neutral-400" />,
  },
  {
    name: "History",
    href: "/home/history",
    icon: <History className="size-5 stroke-neutral-400" />,
  },
  {
    name: "Analytics",
    href: "/home/analytics",
    icon: <ChartNoAxesColumnIcon className="size-5 stroke-neutral-400" />,
  },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathName = usePathname();

  // Get user session and first name
  const { data: session } = useSession();
  const userName = session?.user?.name || "Guest";
  const firstName = userName.split(" ")[0];

  return (
    <aside className="h-screen sticky top-0 self-start">
      <nav className="flex flex-col justify-between h-full bg-neutral-900 border-r border-neutral-800 px-2 py-2">
        {/* Top logo and retract button */}
        <div>
          <div className="flex justify-between items-center">
            <Image
              src={Icon}
              alt="Icon"
              className={expanded ? "block w-10" : "hidden"}
            />

            <button
              className="p-2 hover:cursor-pointer hover:bg-neutral-800 rounded-lg transition-colors duration-200"
              type="button"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronLeft className="size-5 stroke-neutral-500" />
              ) : (
                <ChevronRight className="size-5 stroke-neutral-500" />
              )}
            </button>
          </div>

          {/* Navigation links */}
          <ul className="flex-1 flex flex-col gap-y-1 mt-2">
            {navLinks.map((data) => (
              <SidebarLink
                key={data.name}
                expanded={expanded}
                pathName={pathName}
                data={data}
              />
            ))}
          </ul>
        </div>

        {/* Bottom profile */}
        <div className="flex gap-x-3 mt-auto">
          <div className="size-9 bg-neutral-800 rounded-full flex items-center justify-center">
            <p className="text-md font-semibold text-neutral-400">S</p>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ${expanded ? "block" : "hidden"}`}
          >
            <p className="text-neutral-400 text-sm font-semibold">
              {firstName}
            </p>

            <button
              type="button"
              onClick={LogoutUserAction}
              className="text-red-500 text-xs hover:cursor-pointer bg-neutral-800 py-0.5 px-2 rounded-md"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

function SidebarLink({
  data,
  pathName,
  expanded,
}: {
  data: SidebarProps;
  pathName: string;
  expanded: boolean;
}) {
  const { name, href, icon } = data;

  return (
    <Link
      className={`relative flex items-center p-2 gap-x-2 cursor-pointer text-nowrap rounded-lg w-full ${pathName === data.href ? "bg-neutral-800" : ""} hover:bg-neutral-800`}
      href={href}
    >
      {icon}

      <span
        className={`text-neutral-400 text-sm text-nowrap font-medium ${expanded ? "block" : "hidden"}`}
      >
        {name}
      </span>
    </Link>
  );
}
