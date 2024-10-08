import DashboardNavbarItem from "@/Components/DashboardNavbarItem";
import "@/script/mainHeader";
import { Head, Link } from "@inertiajs/react";
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
    const profileCompletenessRequirements = ['phone_number', 'university', 'faculty', 'major', 'rumpun']
    const profileCompletenessValue = profileCompletenessRequirements.map(i => auth.user.profile[i]);
    const profileCompleteness = profileCompletenessValue.filter(i => Boolean(i)).length / profileCompletenessRequirements.length * 100;

    return (
        <>
            <Head title={title} />
            <MainHeader auth={auth} title="Dashboard" />
            <main className="text-dark pb-[8vw] md:pb-[3vw] text-[2.5vw] md:text-[1.15vw] overflow-visible">
                {/* <Preliminary auth={auth} title={title} /> */}
                <DashboardContent title={title} profileCompleteness={profileCompleteness}>{children}</DashboardContent>
            </main>
        </>
    );
}

UserLayout.Title = UserDashboardTitle;
UserLayout.Header = UserDashboardHeader;

function DashboardContent({ title, children, isContainered = true, profileCompleteness=0 }) {
    return (
        <div className={`md:container mx-auto flex gap-[1.75vw]`}>
            <DashboardSidebar
                className={`sticky z-10 w-full md:w-3/12 h-fit ${
                    title == "Dashboard" ? "" : "hidden md:flex"
                }`}
                title={title}
                profileCompleteness={profileCompleteness}
            />
            <div className={`w-full md:space-y-[1vw]`}>{children}</div>
        </div>
    );
}

function DashboardSidebar({ title, className, profileCompleteness }) {
    return (
        <div
            className={className + ' flex flex-col gap-[.83vw]'}
        >
            <div className="flex flex-col border border-neutral-20 py-[1vw] rounded-[.8vw]">
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
                <DashboardNavbarItem
                    href={route('produk.ecourse.index')}
                    active={title == "Ecourse"}
                >
                    <LuGraduationCap className="text-[1.2vw]" />
                    <span>Ecourse</span>
                </DashboardNavbarItem>
                {/* <DashboardNavbarItem
                    href="/pengaturan"
                    active={title == "Pengaturan"}
                >
                    <i className="bi bi-gear"></i>
                    <span>Pengaturan</span>
                </DashboardNavbarItem> */}
            </div>
            {profileCompleteness < 100 && (
                <Link href="/pengaturan" className="flex flex-col border border-neutral-20 py-[1.25vw] px-[1.67vw] gap-[1vw] rounded-[.8vw]">
                    <span className="text-[.83vw] text-blue-500 font-sans">Lengkapi profil kamu ya</span>
                    <div className="flex items-center justify-between">
                        <div className="w-[80%] bg-neutral-40 h-[.4vw] rounded-full overflow-hidden">
                            <div className="h-full bg-dark rounded-full" style={{ width: profileCompleteness+"%" }}></div>
                        </div>
                        <span className="text-[.83vw]">{profileCompleteness}%</span>
                    </div>
                </Link>
            )}
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
