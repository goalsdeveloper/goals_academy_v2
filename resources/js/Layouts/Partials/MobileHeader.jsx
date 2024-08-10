import TECollapseItem from "@/Components/TECollapseItem";
import { Link } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { TECollapse } from "tw-elements-react";
import logo from "/resources/img/icon/goals-1.svg";
import { LuGraduationCap } from "react-icons/lu";
import {
    FiAirplay,
    FiBriefcase,
    FiChevronDown,
    FiGrid,
    FiHome,
    FiMonitor,
    FiSettings,
} from "react-icons/fi";
import user from "/resources/img/icon/user.png";
import { LiaDropbox } from "react-icons/lia";
import {
    PiChatCenteredTextBold,
    PiClockCounterClockwiseBold,
    PiNotepad,
    PiSquaresFourLight,
} from "react-icons/pi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";
import GoalsButton from "@/Components/elements/GoalsButton";
import { Notification, NotificationItem } from "./MainHeader";

const MobileHeader = ({ auth, notificationData, getOldNotification }) => {
    const [authDropdown, setAuthDropdown] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    let profileImage = "";
    if (auth.user !== null) {
        profileImage = auth.user.profile.profile_image
            ? `/storage/${auth.user.profile.profile_image}`
            : user;
    }

    const role = auth.user?.user_role ?? "user";
    const roleCheck = role != "user" ? "non-user" : "user";

    const links = auth.user && {
        user: [
            { href: "/user", icon: <LuGraduationCap />, text: "Bimbingan" },
            { href: "/webinar", icon: <FiMonitor />, text: "Webinar" },
            {
                href: "/riwayat_transaksi",
                icon: <PiClockCounterClockwiseBold />,
                text: "Riwayat Transaksi",
            },
            {
                href: "/obrolan",
                icon: <PiChatCenteredTextBold />,
                text: "Obrolan",
            },
            {
                href: "/pengaturan",
                icon: (
                    <i className="bi bi-gear md:text-12 lg:text-20 3xl:text-24"></i>
                ),
                text: "Edit Profile",
            },
            {
                href: "/pengaturan/ubah_password",
                icon: (
                    <i className="bi bi-gear md:text-12 lg:text-20 3xl:text-24"></i>
                ),
                text: "Ubah Password",
            },
            {
                href: "/logout",
                method: "post",
                icon: (
                    <i className="text-red-400 bi bi-box-arrow-in-left md:text-12 lg:text-20 3xl:text-24"></i>
                ),
                text: <span className="text-red-400">Logout</span>,
            },
        ],
        "non-user": [
            {
                href: role != "user" && route(`${role}.index`),
                icon: <FiGrid />,
                text: "Dashboard",
            },
            {
                href: role != "user" && route(`${role}.setting.index`),
                icon: <FiSettings />,
                text: "Pengaturan",
            },
            {
                href: "/logout",
                method: "post",
                icon: (
                    <i className="text-red-400 bi bi-box-arrow-in-left md:text-12 lg:text-20 3xl:text-24"></i>
                ),
                text: <span className="text-red-400">Logout</span>,
            },
        ],
    };

    return (
        <>
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-[5.5vw] w-7/12 md:w-2/12">
                    <NavigationBurgerButton
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                    <Link href="/">
                        <img
                            className="w-full md:h-[2vw] mb-1 md:mb-2"
                            src={logo}
                            alt="Goals Academy"
                        />
                    </Link>
                </div>
                {auth.user && (
                    <div className="flex gap-[2vw]">
                        <Notification
                            auth={auth}
                            data={notificationData}
                            loadMore={getOldNotification}
                        />
                        <div
                            className={`relative font-poppins flex justify-center cursor-pointer`}
                            // onMouseEnter={() => setAuthDropdown(true)}
                            // onMouseLeave={() => setAuthDropdown(false)}
                            onClick={() => setAuthDropdown(!authDropdown)}
                        >
                            <div className="overflow-hidden rounded-full w-[8vw] h-[8vw] md:w-[2vw] md:h-[2vw]">
                                <img
                                    className="w-full h-full"
                                    src={profileImage}
                                    alt="User Profile"
                                />
                            </div>
                            <TECollapse
                                show={authDropdown}
                                className="absolute right-0 z-10 translate-y-2 shadow-none"
                            >
                                <TECollapseItem className="border-2 w-fit py-[1vw] text-start bg-white  rounded-xl">
                                    {links[roleCheck].map(
                                        (
                                            {
                                                href,
                                                icon,
                                                text,
                                                method = "get",
                                            },
                                            index
                                        ) => (
                                            <Link
                                                key={index}
                                                method={method}
                                                className={`flex gap-2 py-[3.7vw] px-[7.4vw] items-center font-poppins hover:text-primary  ${
                                                    text == "Riwayat Transaksi"
                                                        ? "w-max"
                                                        : "w-full"
                                                }`}
                                                href={href}
                                            >
                                                {icon}
                                                {text}
                                            </Link>
                                        )
                                    )}
                                </TECollapseItem>
                            </TECollapse>
                        </div>
                    </div>
                )}
            </div>

            <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} auth={auth} />
        </>
    );
};

export default MobileHeader;

const NavigationBurgerButton = ({ isOpen, setIsOpen }) => {
    return (
        <button
            aria-label="navigation-button"
            className="relative py-1 space-y-1 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span
                className={`block w-5 h-0.5 rounded-full bg-neutral-800 transform transition-transform duration-200 ${
                    isOpen ? "rotate-45 translate-y-1.5" : "rotate-0 top-0"
                }`}
            ></span>
            <span
                className={`block w-5 h-0.5 rounded-full bg-neutral-800 transform transition-all duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100 top-2"
                }`}
            ></span>
            <span
                className={`block w-5 h-0.5 rounded-full bg-neutral-800 transform transition-transform duration-200 ${
                    isOpen ? "-rotate-45 -translate-y-1.5" : "rotate-0 top-4"
                }`}
            ></span>
        </button>
    );
};

const MobileSidebar = ({ isOpen, setIsOpen, auth }) => {
    const [openSublinks, setOpenSublinks] = useState({});

    const toggleSublinks = (index) => {
        setOpenSublinks((prevOpenSublinks) => ({
            ...prevOpenSublinks,
            [index]: !prevOpenSublinks[index],
        }));
    };

    const links = [
        { href: "/", icon: <FiHome />, text: "Home" },
        {
            text: "Produk",
            icon: <LiaDropbox className="text-[4.5vw] -ml-[.6vw]" />,
            sublinks: [
                {
                    href: "/produk",
                    icon: <LuGraduationCap className="text-[4vw] -ml-[.8vw]" />,
                    text: "Bimbingan",
                },
                { href: "/produk", icon: <FiMonitor />, text: "Webinar" },
                { href: "/produk", icon: <FiAirplay />, text: "E-Course" },
            ],
        },
        // {
        //     href: "/artikel",
        //     icon: <PiNotepad className="text-[4vw] -ml-[.2vw]" />,
        //     text: "Artikel",
        // },
        {
            href: "/karir",
            icon: <FiBriefcase className="text-[3.5vw]" />,
            text: "Karir",
        },
        {
            icon: <PiSquaresFourLight className="text-[4vw] -ml-[.3vw]" />,
            text: "Profil",
            sublinks: [
                {
                    href: "/profil_perusahaan",
                    icon: <HiOutlineBuildingOffice className="text-[4vw]" />,
                    text: "Perusahaan",
                },
                {
                    href: "/profil_tutor",
                    icon: <BsPerson className="text-[4vw]" />,
                    text: "Tutor",
                },
            ],
        },
    ];

    return (
        <>
            <div
                className={`${
                    !isOpen && "hidden"
                } absolute top-0 w-screen h-screen`}
                onClick={() => setIsOpen(false)}
            ></div>
            <div
                className={`overflow-y-scroll absolute w-[74vw] flex flex-col justify-between z-[500] top-0 left-0 bg-white duration-300 h-[calc(100dvh)] border-2 text-neutral-80 text-[3.2vw] ${
                    isOpen
                        ? "translate-x-[0%]"
                        : "opacity-0 -translate-x-[100%]"
                }`}
            >
                <div>
                    <div className="flex items-center gap-[5.5vw] w-full h-[20vw] px-[7.4vw] border-b border-neutral-20">
                        <Link href="/">
                            <img
                                className="md:h-[2vw] mb-1 md:mb-2 w-10/12"
                                src={logo}
                                alt="Goals Academy"
                            />
                        </Link>
                        <NavigationBurgerButton
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        {links.map(({ href, text, sublinks, icon }, index) => (
                            <div
                                key={index}
                                className="w-full py-[1vw] text-start bg-white border-b border-neutral-20 h-fit"
                            >
                                {sublinks ? (
                                    <button
                                        className="flex gap-2 py-[3.7vw] px-[7.4vw] justify-between items-center hover:text-primary w-full "
                                        onClick={() => toggleSublinks(index)}
                                    >
                                        <span className="flex gap-2">
                                            {icon}
                                            {text}
                                        </span>
                                        {sublinks && <FiChevronDown />}
                                    </button>
                                ) : (
                                    <Link
                                        className="flex gap-2 py-[3.7vw] px-[7.4vw] items-center hover:text-primary w-full"
                                        href={href}
                                    >
                                        {icon}
                                        {text}
                                    </Link>
                                )}

                                {openSublinks[index] && sublinks && (
                                    <div className="ml-[5vw]">
                                        {sublinks.map(
                                            ({ href, icon, text }) => (
                                                <Link
                                                    key={href}
                                                    className="flex gap-2 py-[3.7vw] px-[7.4vw] items-center hover:text-primary w-full"
                                                    href={href}
                                                >
                                                    {icon}
                                                    {text}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {!auth.user && (
                    <div className="flex flex-col px-[7.4vw] mt-auto w-full gap-[2vw] py-[3.7vw]">
                        <Link href="/login">
                            <GoalsButton variant="bordered" className="w-full">
                                Masuk
                            </GoalsButton>
                        </Link>
                        <Link href="/register">
                            <GoalsButton className="w-full">Daftar</GoalsButton>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};
