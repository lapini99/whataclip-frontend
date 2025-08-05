"use client";

import Image from "next/image"
import { FaHome } from "react-icons/fa";
import { RiVideoUploadFill, RiFolderVideoFill } from "react-icons/ri";
import { SideBarMenuItem } from "./SidebarMenuItem"
import { useEffect } from "react";
import { getUser } from "@/api/userRequests/userApi";
import { BsPaperclip } from "react-icons/bs";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/features/userSlice";

const menuItems = [
    {
        path: "/dashboard/main",
        icon: <FaHome size={25} />,
        title: "Home",
        subTitle: ""
    },
    {
        path: "/dashboard/storage",
        icon: <RiFolderVideoFill size={25} />,
        title: "Storage",
        subTitle: ""
    },
    {
        path: "/dashboard/upload",
        icon: <RiVideoUploadFill size={25} />,
        title: "Upload",
        subTitle: ""
    },
]

export const Sidebar = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.user);

    useEffect(() => {
        getUser("lapini").then(response => {
            // Map User interface to Redux state structure
            dispatch(setUser({
                name: response.data.username,
                email: response.data.mail,
                avatar: response.data.avatar,
                role: response.data.role,
                families: response.data.current_families
            }));
        }).catch(error => {
            console.error("Error fetching user:", error);
        });
    }, [dispatch]);

    return (
        <div id="menu"
            className="bg-white min-h-screen z-10 text-orange-500 w-64 fixed left-0 overflow-y-scroll">
            <div id="logo" className="my-4 px-6">
                <h1 className="flex items-center text-lg md:text-2xl font-bold text-black">
                    {/* <IoLogoReact className="mr-2"/> */}
                    <span>whata</span>
                <span className="text-orange-500">clip</span><BsPaperclip className=" text-orange-500" size={20} /></h1>
            </div>
            <div id="profile" className="px-6 py-4">
                <Link href={`/dashboard/profile/`} className="inline-flex space-x-2 items-center">
                    <span>
                        <Image className="rounded-full w-8 h-8" src={userData.avatar || "https://via.placeholder.com/50"} 
                                alt="user-avatar" 
                                width={50}
                                height={50}
                                />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        @{userData.name || "Loading..."}
                    </span>
                </Link>
            </div>
            <div id="nav" className="w-full px-6">
                {
                    menuItems.map( item => (
                        <SideBarMenuItem
                            key={item.path}
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    )
}