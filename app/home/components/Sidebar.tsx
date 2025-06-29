"use client";

import {
	ChartNoAxesColumnIcon,
	ChevronLeft,
	ChevronRight,
	History,
	Home,
	MessageCircleMoreIcon,
	Settings2,
} from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import Icon from "@/public/images/icon.png";

type SidebarProps = {
	text: string;
	icon: React.ReactNode;
	isActive: boolean;
	onClick: () => void;
};

const sidebarContext = createContext<{ expanded: boolean } | undefined>(
	undefined,
);

export default function Sidebar() {
	const router = useRouter();
	const [expanded, setExpanded] = useState(true);
	const [activeTab, setActiveTab] = useState<string | null>(null);

	const sidebarData: SidebarProps[] = [
		{
			text: "Home",
			icon: <Home className="size-5 stroke-neutral-400" />,
			isActive: activeTab === "Home",
			onClick: () => {
				setActiveTab("Home");
				router.push("/home");
			},
		},
		{
			text: "Start interview",
			icon: <MessageCircleMoreIcon className="size-5 stroke-neutral-400" />,
			isActive: activeTab === "Start interview",
			onClick: () => {
				setActiveTab("Start interview");
				router.push("/home/new");
			},
		},
		{
			text: "History",
			icon: <History className="size-5 stroke-neutral-400" />,
			isActive: activeTab === "History",
			onClick: () => {
				setActiveTab("History");
				router.push("/home/something");
			},
		},
		{
			text: "Analytics",
			icon: <ChartNoAxesColumnIcon className="size-5 stroke-neutral-400" />,
			isActive: activeTab === "Analytics",
			onClick: () => setActiveTab("Analytics"),
		},
		{
			text: "Settings",
			icon: <Settings2 className="size-5 stroke-neutral-400" />,
			isActive: activeTab === "Settings",
			onClick: () => setActiveTab("Settings"),
		},
	];

	return (
		<aside className="h-svh">
			<nav className="h-full flex flex-col bg-neutral-900 border-r border-neutral-800 px-2 py-2">
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

				<sidebarContext.Provider value={{ expanded }}>
					{/* Navigation links */}
					<ul className="flex-1 flex flex-col gap-y-1 mt-2">
						{sidebarData.map((item) => (
							<SidebarItem key={item.text} {...item} />
						))}
					</ul>
				</sidebarContext.Provider>

				{/* Bottom profile */}
				<div className="flex gap-x-3 my-2 hover:cursor-pointer">
					<div className="size-8 bg-neutral-800 rounded-full flex items-center justify-center">
						<p className="text-sm font-semibold text-neutral-400">S</p>
					</div>

					<div
						className={`overflow-hidden transition-all duration-500 ${expanded ? "block" : "hidden"}`}
					>
						<p className="text-neutral-400 text-sm font-semibold">Shayokh</p>
						<p className="text-neutral-500 text-xs">Free Plan</p>
					</div>
				</div>
			</nav>
		</aside>
	);
}

function SidebarItem({ icon, text, isActive, onClick }: SidebarProps) {
	const { expanded } = useContext(sidebarContext) as { expanded: boolean };

	return (
		<li>
			<button
				type="button"
				className={`relative flex items-center p-2 gap-x-2 cursor-pointer rounded-lg w-full ${isActive ? "bg-neutral-800" : ""} hover:bg-neutral-800`}
				onClick={onClick}
			>
				{icon}
				<span
					className={`text-neutral-200 text-sm text-nowrap font-medium ${expanded ? "block" : "hidden"}`}
				>
					{text}
				</span>
			</button>
		</li>
	);
}
