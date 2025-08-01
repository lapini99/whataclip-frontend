"use client";

import Image from "next/image"
import { FaHome } from "react-icons/fa";
import { RiVideoUploadFill, RiFolderVideoFill } from "react-icons/ri";
import { SideBarMenuItem } from "./SidebarMenuItem"
import { useEffect, useState } from "react";
import { getUser } from "@/api/userRequests/userApi";
import type { User } from "@/interfaces/user";

const menuItems = [
    {
        path: "/dashboard/main",
        icon: <FaHome size={25} />,
        title: "Home",
        subTitle: "Home Page"
    },
    {
        path: "/dashboard/storage",
        icon: <RiFolderVideoFill size={25} />,
        title: "Storage",
        subTitle: "Contador Client Side"
    },
    {
        path: "/dashboard/upload",
        icon: <RiVideoUploadFill size={25} />,
        title: "Upload",
        subTitle: ""
    },
]

export const Sidebar = () => {
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        getUser("lapini").then(response => {
            setUserData(response.data);
        }).catch(error => {
            console.error("Error fetching user:", error);
        });
    }, []);

    return (
        <div id="menu"
            className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 fixed left-0 overflow-y-scroll">
            <div id="logo" className="my-4 px-6">
                <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
                    {/* <IoLogoReact className="mr-2"/> */}
                    <span>Dash</span>
                <span className="text-blue-500">8</span>.</h1>
                <p className="text-slate-500 text-sm">Manage your actions and activities</p>
            </div>
            <div id="profile" className="px-6 py-4">
                <a href="#" className="inline-flex space-x-2 items-center">
                    <span>
                        <Image className="rounded-full w-8 h-8" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c" 
                                alt="user-avatar" 
                                width={50}
                                height={50}
                                />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        {userData ? userData?.username : "Loading..."}
                    </span>
                </a>
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
                
                
                <a href="#" className="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg text-slate-300 font-bold leading-5">Counter</span>
                        <span className="text-sm text-slate-500 hidden md:block">Estado local</span>
                    </div>
                </a>
            </div>
        </div>
    )
}