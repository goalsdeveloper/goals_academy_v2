import DashboardNavbarItem from "@/Components/DashboardNavbarItem";
import "@/script/mainHeader";
import { Head } from "@inertiajs/react";
import { FiMonitor } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import {
    PiChatCenteredTextBold,
    PiClockCounterClockwiseBold,
} from "react-icons/pi";
import MainHeader from "./Partials/MainHeader";
import "/resources/css/main.css";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function UserLayout({ auth, title, children }) {
    return (
        <>
            <Head title={title} />
            <MainHeader auth={auth} title="Dashboard" />
            <main className="text-dark pb-[8vw] md:pb-[3vw] text-[2.5vw] md:text-[1.15vw] overflow-visible">
                {/* <Preliminary auth={auth} title={title} /> */}
                <DashboardContent title={title}>{children}</DashboardContent>
            </main>
        </>
    );
}

UserLayout.Title = UserDashboardTitle;
UserLayout.Header = UserDashboardHeader;

function DashboardContent({ title, children, isContainered = true }) {
    return (
        <div className={`md:container mx-auto flex gap-[1.75vw]`}>
            <DashboardSidebar
                className={`sticky z-10 w-full md:w-3/12 h-fit ${
                    title == "Dashboard" ? "" : "hidden md:flex"
                }`}
                title={title}
            />
            <div className={`w-full md:space-y-[1vw]`}>{children}</div>
        </div>
    );
}

function DashboardSidebar({ title, className }) {
    return (
        <div
            className={`flex flex-col ${className} border border-neutral-20 py-[1vw] rounded-[.8vw]`}
        >
            {/* <DashboardNavbarItem
                className={`${
                    title == "Dashboard" ? "hidden md:inline-block" : ""
                }`}
                href="/pembelajaran_saya"
                active={title == "Dashboard" || title == "Pembelajaran Saya"}
            >
                <i className="fa-regular fa-file-lines"></i>
                <span>Pembelajaran Saya</span>
            </DashboardNavbarItem> */}
            <DashboardNavbarItem
                href="/bimbingan"
                active={title == "Bimbingan"}
            >
                <LuGraduationCap className="text-[1.2vw]" />
                <span>Bimbingan</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem href="/webinar" active={title == "Webinar"}>
                <div className="relative">
                    <FiMonitor />
                </div>
                <span>Webinar</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem
                href="/riwayat_transaksi"
                active={title == "Riwayat Transaksi"}
            >
                <PiClockCounterClockwiseBold className="text-[1.2vw]" />
                <span>Riwayat Transaksi</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem href="/obrolan" active={title == "Obrolan"}>
                <PiChatCenteredTextBold className="text-[1.2vw]" />
                <span>
                    Obrolan{" "}
                    <span className="bg-secondary text-white font-normal text-[.8vw] rounded-[.7vw] py-[.1vw] px-[.5vw]">
                        Soon
                    </span>
                </span>
            </DashboardNavbarItem>
            {/* <DashboardNavbarItem
                href="/pengaturan"
                active={title == "Pengaturan"}
            >
                <i className="bi bi-gear"></i>
                <span>Pengaturan</span>
            </DashboardNavbarItem> */}
        </div>
    );
}

function UserDashboardTitle({ title }) {
    return (
        <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-normal">
            {title}
        </h1>
    );
}

function UserDashboardHeader({ children }) {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <div
            className={`${
                isMobile && "px-[7.4vw] w-full py-[1.2vw]"
            } flex md:block justify-between items-center space-y-[1.2vw]`}
        >
            {children}
        </div>
    );
}
