"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    path: string;
    icon: ReactNode;
    title: string;
    subTitle: string;
}

export const SideBarMenuItem = ({path, icon, title, subTitle}: Props) => {
    const currentPath = usePathname();
    
    return (
        <Link href={path}
            className={`w-full px-2 inline-flex space-x-2 items-center py-3 hover:bg-orange-300 transition ease-linear duration-150
                ${currentPath === path ? "border-l-4 border-orange-300" : ""}
            `}>
            <div>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold leading-5 text-black">{title}</span>
                <span className="text-sm text-black/50 hidden md:block">{subTitle}</span>
            </div>
        </Link>
    )
}