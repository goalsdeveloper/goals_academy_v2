import { useState } from "react";
import { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import logo from "/resources/img/icon/goals-6.svg";
import GoalsButton from "@/Components/GoalsButton";
import TECollapseItem from "@/Components/TECollapseItem";
import { TECollapse } from "tw-elements-react";
import { FaChevronDown, FaRegBell,FaRegCalendar } from "react-icons/fa6";
import { FiGrid, FiShoppingCart, FiUser, FiBriefcase } from "react-icons/fi";
import { TbLayoutGridAdd } from "react-icons/tb";
import { TfiDropbox } from "react-icons/tfi";
import { BiSolidDiscount } from "react-icons/bi";
import { RiBarChart2Line } from "react-icons/ri";
import { GrTag, GrLocation } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { MdOutlineEventNote, MdHistory } from "react-icons/md";

export default function DashboardLayout ({ auth, title, subtitle, role, children }) {
    let navConfig;

    switch (role) {
        case "admin":
            navConfig = [
                {
                    name: "Overview",
                    href: "/admin/overview",
                    icon: <FiGrid className="text-[1vw]" />,
                    isActive: title == "Overview",
                },
                {
                    name: "Statistic",
                    href: "/admin/statistic",
                    icon: <RiBarChart2Line className="text-[1vw]" />,
                    isActive: title == "Statistic",
                },
                {
                    name: "Bimbingan",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Category",
                            href: "/admin/bimbingan/category",
                            icon: <GrTag className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "Category",
                        },
                        {
                            name: "Add-On",
                            href: "/admin/bimbingan/addon",
                            icon: <TbLayoutGridAdd className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "Add-On",
                        },
                        {
                            name: "Place",
                            href: "/admin/bimbingan/place",
                            icon: <GrLocation className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "Place",
                        },
                        {
                            name: "Topic",
                            href: "/admin/bimbingan/topic",
                            icon: <MdOutlineEventNote className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "Topic",
                        },
                        {
                            name: "Product",
                            href: "/admin/bimbingan/product",
                            icon: <TfiDropbox className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "Product",
                        },
                        {
                            name: "Order",
                            href: "/admin/bimbingan/order",
                            icon: <FiShoppingCart className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "Order",
                        },
                    ],
                    collapsed: true,
                },
                {
                    name: "Webinar",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Product",
                            href: "/admin/webinar/product",
                            icon: <TfiDropbox className="text-[1vw]" />,
                            isActive: title == "Webinar" && subtitle == "Product",
                        },
                        {
                            name: "Order",
                            href: "/admin/webinar/order",
                            icon: <FiShoppingCart className="text-[1vw]" />,
                            isActive: title == "Webinar" && subtitle == "Order",
                        },
                    ],
                    collapsed: true,
                },
                {
                    name: "E-course",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Category",
                            href: "/admin/ecourse/category",
                            icon: <GrTag className="text-[1vw]" />,
                            isActive: title == "E-course" && subtitle == "Category",
                        },
                        {
                            name: "Product",
                            href: "/admin/ecourse/product",
                            icon: <TfiDropbox className="text-[1vw]" />,
                            isActive: title == "E-course" && subtitle == "Product",
                        },
                        {
                            name: "Order",
                            href: "/admin/ecourse/order",
                            icon: <FiShoppingCart className="text-[1vw]" />,
                            isActive: title == "E-course" && subtitle == "Order",
                        },
                    ],
                    collapsed: true,
                },
                {
                    name: "Manajemen User",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "User",
                            href: "/admin/manajemen_user/user",
                            icon: <FiUser className="text-[1vw]" />,
                            isActive: title == "Manajemen User" && subtitle == "User",
                        },
                        {
                            name: "Tutor",
                            href: "/admin/manajemen_user/tutor",
                            icon: <FiUser className="text-[1vw]" />,
                            isActive: title == "Manajemen User" && subtitle == "Tutor",
                        },
                        {
                            name: "Moderator",
                            href: "/admin/manajemen_user/moderator",
                            icon: <FiUser className="text-[1vw]" />,
                            isActive: title == "Manajemen User" && subtitle == "Moderator",
                        },
                    ],
                    collapsed: false,
                },
                {
                    name: "E-book",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Category",
                            href: "/admin/ebook/category",
                            icon: <GrTag className="text-[1vw]" />,
                            isActive: title == "E-book" && subtitle == "Category",
                        },
                        {
                            name: "Product",
                            href: "/admin/ebook/product",
                            icon: <TfiDropbox className="text-[1vw]" />,
                            isActive: title == "E-book" && subtitle == "Product",
                        },
                        {
                            name: "Order",
                            href: "/admin/ebook/order",
                            icon: <FiShoppingCart className="text-[1vw]" />,
                            isActive: title == "E-book" && subtitle == "Order",
                        },
                    ],
                    collapsed: true,
                },
                {
                    name: "Marketing",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Affiliate",
                            href: "/admin/marketing/affiliate",
                            icon: <TbLayoutGridAdd className="text-[1vw]" />,
                            isActive: title == "Marketing" && subtitle == "Affiliate",
                        },
                        {
                            name: "Vouchers",
                            href: "/admin/marketing/vouchers",
                            icon: <BiSolidDiscount className="text-[1vw]" />,
                            isActive: title == "Marketing" && subtitle == "Vouchers",
                        },
                    ],
                    collapsed: false,
                },
                {
                    name: "Career",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Job",
                            href: "/admin/career/job",
                            icon: <FiBriefcase className="text-[1vw]" />,
                            isActive: title == "Career" && subtitle == "Job",
                        },
                        {
                            name: "Participant",
                            href: "/admin/career/participant",
                            icon: <FiUser className="text-[1vw]" />,
                            isActive: title == "Career" && subtitle == "Participant",
                        },
                    ],
                    collapsed: false,
                },
            ];
            break;
        case "moderator":
            navConfig = [
                {
                    name: "Overview",
                    href: "/moderator/overview",
                    icon: <FiGrid className="text-[1vw]" />,
                    isActive: title == "Overview",
                },
                {
                    name: "Bimbingan",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Recent Order",
                            href: "/moderator/bimbingan/order",
                            icon: <FiShoppingCart className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "Recent Order",
                        },
                        {
                            name: "Progress",
                            href: "/moderator/bimbingan/progress",
                            icon: <MdHistory className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "Progress",
                        },
                        {
                            name: "History",
                            href: "/moderator/bimbingan/history",
                            icon: <MdOutlineEventNote className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "History",
                        },
                    ],
                    collapsed: true,
                },
                {
                    name: "Tutor",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Tutor List",
                            href: "/moderator/tutor/tutor_list",
                            icon: <FiUser className="text-[1vw]" />,
                            isActive: title == "Tutor" && subtitle == "Tutor List",
                        },
                        {
                            name: "Schedule",
                            href: "/moderator/tutor/schedule",
                            icon: <FaRegCalendar className="text-[1vw]" />,
                            isActive: title == "Tutor" && subtitle == "Schedule",
                        },
                    ],
                    collapsed: true,
                },
            ];
            break;
        case "tutor":
            navConfig = [
                {
                    name: "Overview",
                    href: "/tutor/overview",
                    icon: <FiGrid className="text-[1vw]" />,
                    isActive: title == "Overview",
                },
                {
                    name: "Bimbingan",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Progress",
                            href: "/tutor/bimbingan/progress",
                            icon: <MdHistory className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "Progress",
                        },
                        {
                            name: "History",
                            href: "/tutor/bimbingan/history",
                            icon: <MdOutlineEventNote className="text-[1vw]" />,
                            isActive: title == "Bimbingan" && subtitle == "History",
                        },
                    ],
                    collapsed: true,
                },
            ];
            break;

        default:
            break;
    }

    const [navState, setNavState] = useState({});

    const navToggleHandler = (index) => {
        setNavState((prevNavState) => ({
            ...prevNavState,
            [index]: !prevNavState[index]
        }));
    };

    useEffect(() => {
        if (subtitle) {
            const x = navConfig.findIndex(i => i.name == title);
            navToggleHandler(x);
        }
    }, []);

    return (
        <main className="relative flex bg-gray-50 text-dark font-sans">
            <Head title={title} />
            <aside className="w-[18vw] h-screen bg-dark-indigo text-white font-sans text-[.83vw] overflow-auto scrollbar-hidden cursor-pointer">
                <div className="flex justify-center items-center pt-[2.5vw] pb-[1.75vw]">
                    <Link href="/">
                        <img
                            className="w-[9vw]"
                            src={logo}
                            alt="Goals Academy"
                        />
                    </Link>
                </div>
                <nav className="flex flex-col gap-[1.25vw] py-[1.25vw] ps-[1.67vw] pe-[2.1vw]">
                    {navConfig.map(({ name, href, icon, isActive, branches, collapsed }, index) => {
                        return (
                            <div key={index}>
                                {branches ? (
                                    <>
                                        <GoalsButton
                                            className="justify-center md:justify-between rounded-[.5vw] ps-[1vw] pe-[.5vw] md:py-[.5vw]"
                                            activeClassName={isActive && "bg-white text-dark-indigo"}
                                            onClick={() => navToggleHandler(index)}
                                        >
                                            {icon} <span className="text-[.7vw]">{name.toUpperCase()}</span>
                                            {collapsed && <FaChevronDown className={`hidden md:inline-block duration-300 ${navState[index] && '-rotate-180'}`} />}
                                        </GoalsButton>
                                        {collapsed ? (
                                            <TECollapse show={navState[index]}>
                                                <TECollapseItem className="gap-[.75vw]" breakClassName="hidden">
                                                    {branches.map(({ name, href, icon, isActive }, index) => {
                                                        return (
                                                            <NavItem key={index} name={name} href={href} icon={icon} isActive={isActive} />
                                                        )
                                                    })}
                                                </TECollapseItem>
                                            </TECollapse>
                                        ) : (
                                            <div className="grid gap-[.75vw] mt-[.85vw]">
                                                {branches.map(({ name, href, icon, isActive }, index) => {
                                                    return (
                                                        <NavItem key={index} name={name} href={href} icon={icon} isActive={isActive} />
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <NavItem name={name} href={href} icon={icon} isActive={isActive} />
                                )}
                            </div>
                        )
                    })}
                </nav>
            </aside>
            <div className="relative w-full h-screen overflow-hidden bg-[#F8F8FC]">
                <header className="absolute z-50 top-0 w-full h-[5.8vw] flex justify-between items-center bg-gray-50 px-[4.2vw] pt-[2.5vw] pb-[1.75vw] border-b-1">
                    <h1 className="font-poppins font-semibold text-[1.2vw]">{title}</h1>
                    <div id="tools" className="flex gap-[.5vw] text-[1.5vw] text-gray-400">
                        <FaRegBell />
                        <IoSettingsOutline />
                        <ImExit />
                    </div>
                </header>
                <div className="w-full h-screen pt-[7.5vw] pb-[2vw] px-[4.2vw] overflow-y-auto scrollbar-hidden">
                    {children}
                </div>
            </div>
        </main>
    )
}

function NavItem ({ name, href, icon, isActive }) {
    return (
        <GoalsButton
            className="rounded-[.5vw] p-[1vw] gap-[.75vw] md:justify-start"
            activeClassName={isActive && "bg-white text-dark-indigo"}
            isLink={true}
            href={href}
        >{icon} {name}</GoalsButton>
    )
}
