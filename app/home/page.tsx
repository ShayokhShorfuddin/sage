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
import { useState } from "react";
import Icon from "@/public/images/icon.png";
import { LogoutUserAction } from "../actions/user";
import Home from "./_components/Home";
import InterviewerSelection from "./_components/InterviewerSelection";

type SidebarProps = {
  text: string;
  icon: React.ReactNode;
};

const sidebarData: SidebarProps[] = [
  {
    text: "Home",
    icon: <HomeIcon className="size-5 stroke-neutral-400" />,
  },
  {
    text: "Start interview",
    icon: <MessageCircleMoreIcon className="size-5 stroke-neutral-400" />,
  },
  {
    text: "History",
    icon: <History className="size-5 stroke-neutral-400" />,
  },
  {
    text: "Analytics",
    icon: <ChartNoAxesColumnIcon className="size-5 stroke-neutral-400" />,
  },
  {
    text: "Settings",
    icon: <Settings2 className="size-5 stroke-neutral-400" />,
  },
];

const tabs = [<Home key={0} />, <InterviewerSelection key={1} />];

export default function Page() {
  const [expanded, setExpanded] = useState(true);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <main className="flex">
      {/* Sidebar */}
      <aside className="h-screen sticky top-0">
        <nav className="h-screen flex flex-col bg-neutral-900 border-r border-neutral-800 px-2 py-2">
          {/* Top logo and retract button */}
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
            {sidebarData.map((data, index) => (
              <SidebarButton
                key={data.text}
                {...{
                  data,
                  index,
                  activeTabIndex,
                  setActiveTabIndex,
                  expanded,
                }}
              />
            ))}
          </ul>

          {/* Bottom profile */}
          <div className="flex gap-x-3">
            <div className="size-9 bg-neutral-800 rounded-full flex items-center justify-center">
              <p className="text-md font-semibold text-neutral-400">S</p>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${expanded ? "block" : "hidden"}`}
            >
              <p className="text-neutral-400 text-sm font-semibold">Shayokh</p>

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

      {/* Right side content */}
      {tabs[activeTabIndex]}
    </main>
  );
}

function SidebarButton({
  data,
  index,
  activeTabIndex,
  setActiveTabIndex,
  expanded,
}: {
  data: SidebarProps;
  index: number;
  activeTabIndex: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  expanded: boolean;
}) {
  return (
    <li key={data.text}>
      <button
        type="button"
        className={`relative flex items-center p-2 gap-x-2 cursor-pointer rounded-lg w-full ${activeTabIndex === index ? "bg-neutral-800" : ""} hover:bg-neutral-800`}
        onClick={() => {
          if (activeTabIndex !== index) {
            setActiveTabIndex(index);
          }
        }}
      >
        {data.icon}
        <span
          className={`text-neutral-400 text-sm text-nowrap font-medium ${expanded ? "block" : "hidden"}`}
        >
          {data.text}
        </span>
      </button>
    </li>
  );
}
