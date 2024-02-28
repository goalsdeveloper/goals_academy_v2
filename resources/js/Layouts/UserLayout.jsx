import "/resources/css/main.css";
import { Head, Link } from "@inertiajs/react";
import { CircularProgressbar } from "react-circular-progressbar";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import DashboardNavbarItem from "@/Components/DashboardNavbarItem";
import MainHeader from "./Partials/MainHeader";
import wave5 from "/resources/img/vector/wave-5.svg";
import wave6 from "/resources/img/vector/wave-6.svg";
import wave7 from "/resources/img/vector/wave-7.svg";
import wave8 from "/resources/img/vector/wave-8.svg";
import userIcon from "/resources/img/icon/user.png";
import { LuGraduationCap } from "react-icons/lu";
import { FiMonitor } from "react-icons/fi";
import { PiChatCenteredTextBold, PiClockCounterClockwiseBold } from "react-icons/pi";
import "@/script/mainHeader";

export default function UserLayout({ auth, title, children }) {
    // console.log();
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

function DashboardContent({ title, children }) {
    return (
        <div className="container mx-auto flex gap-[1.75vw]">
            <DashboardNavbar
                className={`sticky top-24 xs:top-28 md:top-24 xl:top-28 3xl:top-40 z-10 w-full md:w-3/12 h-fit ${
                    title == "Dashboard" ? "" : "hidden md:flex"
                }`}
                title={title}
            />
            <div className={`w-full`}>
                <h1 className="md:font-medium text-black text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                    {title == "Dashboard" ? "Pembelajaran Saya" : title}
                </h1>
                {children}
            </div>
        </div>
    );
}

function DashboardNavbar({ title, className }) {
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
            <DashboardNavbarItem
                href="/webinar"
                active={title == "Webinar"}
            >
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
                <PiChatCenteredTextBold className="text-[1.2vw]"/>
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
