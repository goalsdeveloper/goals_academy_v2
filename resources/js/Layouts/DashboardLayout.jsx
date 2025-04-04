import GoalsButton from "@/Components/GoalsButton";
import TECollapseItem from "@/Components/TECollapseItem";
import "@/script/momentCustomLocale";
import { Head, Link, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiSolidDiscount } from "react-icons/bi";
import { FaChevronDown, FaRegBell, FaRegCalendar } from "react-icons/fa6";
import { FiBriefcase, FiGrid, FiShoppingCart, FiUser } from "react-icons/fi";
import { GrLocation, GrTag } from "react-icons/gr";
import { ImExit } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { MdHistory, MdOutlineEventNote } from "react-icons/md";
import { RiBarChart2Line } from "react-icons/ri";
import { TbLayoutGridAdd, TbPackages } from "react-icons/tb";
import { TfiDropbox } from "react-icons/tfi";
import { useMediaQuery } from "react-responsive";
import { TECollapse } from "tw-elements-react";
import logo from "/resources/img/icon/goals-6.svg";
import axios from "axios";

export default function DashboardLayout({
    auth,
    title,
    subtitle,
    role,
    children,
}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("/dashboard_layout_data")
            .then((response) => setData(response.data));
    }, []);

    let navConfig;
    switch (role) {
        case "admin":
            navConfig = [
                {
                    name: "Overview",
                    href: "/admin/overview",
                    icon: <FiGrid className="text-[4vw] md:text-[1vw]" />,
                    isActive: title == "Overview",
                },
                {
                    name: "Statistic",
                    href: "/admin/statistic",
                    icon: (
                        <RiBarChart2Line className="text-[4vw] md:text-[1vw]" />
                    ),
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
                            icon: (
                                <GrTag className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "Category",
                        },
                        {
                            name: "Add-On",
                            href: "/admin/bimbingan/addon",
                            icon: (
                                <TbLayoutGridAdd className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "Add-On",
                        },
                        {
                            name: "Place",
                            href: "/admin/bimbingan/place",
                            icon: (
                                <GrLocation className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "Place",
                        },
                        {
                            name: "Topic",
                            href: "/admin/bimbingan/topic",
                            icon: (
                                <MdOutlineEventNote className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "Topic",
                        },
                        {
                            name: "Product",
                            href: "/admin/bimbingan/product",
                            icon: (
                                <TfiDropbox className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "Product",
                        },
                        {
                            name: "Order",
                            href: "/admin/bimbingan/order",
                            icon: (
                                <FiShoppingCart className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "Order",
                        },
                        {
                            name: "Kode Promo",
                            href: route("admin.bimbingan.promo-code.index"),
                            icon: (
                                <FiShoppingCart className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" &&
                                subtitle == "Kode Promo",
                        },
                    ],
                    collapsed: true,
                },
                {
                    name: "Jasa Riset",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Product",
                            href: "/admin/jasa_riset/product",
                            icon: (
                                <TfiDropbox className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Jasa Riset" && subtitle == "Product",
                        },
                        {
                            name: "Order",
                            href: "/admin/jasa_riset/order",
                            icon: (
                                <FiShoppingCart className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Jasa Riset" && subtitle == "Order",
                        },
                    ],
                    collapsed: true,
                },
                {
                    name: "Produk Digital",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Category",
                            href: "/admin/produk-digital/category",
                            icon: (
                                <GrTag className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Produk Digital" &&
                                subtitle == "Category",
                        },
                        {
                            name: "Product",
                            href: "/admin/produk-digital/product",
                            icon: (
                                <TfiDropbox className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Produk Digital" &&
                                subtitle == "Produk",
                        },
                        {
                            name: "Order",
                            href: "/admin/produk-digital/order",
                            icon: (
                                <FiShoppingCart className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Produk Digital" &&
                                subtitle == "Order",
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
                            name: "Category",
                            href: "/admin/webinar/category",
                            icon: (
                                <GrTag className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Webinar" && subtitle == "Category",
                        },
                        {
                            name: "Product",
                            href: "/admin/webinar/product",
                            icon: (
                                <TfiDropbox className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Webinar" && subtitle == "Produk",
                        },
                        {
                            name: "Order",
                            href: "/admin/webinar/order",
                            icon: (
                                <FiShoppingCart className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive: title == "Webinar" && subtitle == "Order",
                        },
                    ],
                    collapsed: true,
                },
                {
                    name: "Skripsi Mastery",
                    href: "",
                    icon: "",
                    isActive: false,
                    branches: [
                        {
                            name: "Category",
                            href: "/admin/skripsi-mastery/category",
                            icon: (
                                <GrTag className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Skripsi Mastery" && subtitle == "Category",
                        },
                        {
                            name: "Product",
                            href: "/admin/skripsi-mastery/product",
                            icon: (
                                <TfiDropbox className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Skripsi Mastery" &&
                                subtitle == "Product",
                        },
                        {
                            name: "Order",
                            href: "/admin/skripsi-mastery/order",
                            icon: (
                                <FiShoppingCart className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Skripsi Mastery" &&
                                subtitle == "Order",
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
                            icon: (
                                <FiUser className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Manajemen User" && subtitle == "User",
                        },
                        {
                            name: "Tutor",
                            href: "/admin/manajemen_user/tutor",
                            icon: (
                                <FiUser className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Manajemen User" &&
                                subtitle == "Tutor",
                        },
                        {
                            name: "Moderator",
                            href: "/admin/manajemen_user/moderator",
                            icon: (
                                <FiUser className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Manajemen User" &&
                                subtitle == "Moderator",
                        },
                        {
                            name: "Revenue Type",
                            href: "/admin/manajemen_user/revenue_type",
                            icon: (
                                <FiGrid className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Manajemen User" &&
                                subtitle == "Revenue Type",
                        },
                    ],
                    collapsed: false,
                },

                // {
                //     name: "Marketing",
                //     href: "",
                //     icon: "",
                //     isActive: false,
                //     branches: [
                //         {
                //             name: "Affiliate",
                //             href: "/admin/marketing/affiliate",
                //             icon: <TbLayoutGridAdd className="text-[4vw] md:text-[1vw]" />,
                //             isActive:
                //                 title == "Marketing" && subtitle == "Affiliate",
                //         },
                //         {
                //             name: "Vouchers",
                //             href: "/admin/marketing/vouchers",
                //             icon: <BiSolidDiscount className="text-[4vw] md:text-[1vw]" />,
                //             isActive:
                //                 title == "Marketing" && subtitle == "Vouchers",
                //         },
                //     ],
                //     collapsed: false,
                // },
                // {
                //     name: "Career",
                //     href: "",
                //     icon: "",
                //     isActive: false,
                //     branches: [
                //         {
                //             name: "Job",
                //             href: "/admin/career/job",
                //             icon: <FiBriefcase className="text-[4vw] md:text-[1vw]" />,
                //             isActive: title == "Career" && subtitle == "Job",
                //         },
                //         {
                //             name: "Participant",
                //             href: "/admin/career/participant",
                //             icon: <FiUser className="text-[4vw] md:text-[1vw]" />,
                //             isActive:
                //                 title == "Career" && subtitle == "Participant",
                //         },
                //     ],
                //     collapsed: false,
                // },
            ];
            break;
        case "moderator":
            navConfig = [
                {
                    name: "Overview",
                    href: "/moderator/overview",
                    icon: <FiGrid className="text-[4vw] md:text-[1vw]" />,
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
                            icon: (
                                <FiShoppingCart className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" &&
                                subtitle == "Recent Order",
                            info: data?.moderator?.bimbingan.order,
                        },
                        {
                            name: "Progress",
                            href: "/moderator/bimbingan/progress",
                            icon: (
                                <MdHistory className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "Progress",
                            info: data?.moderator?.bimbingan.progress,
                        },
                        {
                            name: "History",
                            href: "/moderator/bimbingan/history",
                            icon: (
                                <MdOutlineEventNote className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "History",
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
                            icon: (
                                <FiUser className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Tutor" && subtitle == "Tutor List",
                        },
                        {
                            name: "Schedule",
                            href: "/moderator/tutor/schedule",
                            icon: (
                                <FaRegCalendar className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Tutor" && subtitle == "Schedule",
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
                    icon: <FiGrid className="text-[4vw] md:text-[1vw]" />,
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
                            icon: (
                                <MdHistory className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "Progress",
                            info: data?.tutor?.bimbingan.progress,
                        },
                        {
                            name: "History",
                            href: "/tutor/bimbingan/history",
                            icon: (
                                <MdOutlineEventNote className="text-[4vw] md:text-[1vw]" />
                            ),
                            isActive:
                                title == "Bimbingan" && subtitle == "History",
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
    const [navShow, setNavShow] = useState(false);

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const navToggleHandler = (index) => {
        setNavState((prevNavState) => ({
            ...prevNavState,
            [index]: !prevNavState[index],
        }));
    };

    useEffect(() => {
        if (subtitle) {
            const x = navConfig.findIndex((i) => i.name == title);
            navToggleHandler(x);
        }
    }, []);

    const { data: notificationData, setData: setNotificationData } = useForm({
        new: [],
        old: [],
        page: 1,
        hasMore: true,
    });

    const getFirstNotification = () => {
        axios.get(route("api.notification.get")).then((res) => {
            const data = res.data;
            setNotificationData((n) => ({
                ...n,
                new: data.new_notifications,
                old: data.old_notifications.data,
                hasMore:
                    data.old_notifications.current_page <
                    data.old_notifications.last_page,
            }));
            setTimeout(() => getNewNotification(), 10000);
        });
    };

    const getNewNotification = () => {
        const mergedNewNotif = (old, fromFetch) => {
            const mergedArray = fromFetch.reduce((accumulator, item2) => {
                if (!accumulator.some((item1) => item1.id === item2.id)) {
                    accumulator.unshift(item2);
                }
                return accumulator;
            }, old);
            return mergedArray;
        };
        axios.get(route("api.notification.get")).then((res) => {
            const data = res.data;
            setNotificationData((n) => ({
                ...n,
                new: mergedNewNotif(n.new, data.new_notifications),
            }));
            setTimeout(() => getNewNotification(), 10000);
        });
    };

    const getOldNotification = (page) => {
        const updatedNotif = (old, fromFetch) => {
            const mergedArray = fromFetch.reduce((accumulator, item2) => {
                if (!accumulator.some((item1) => item1.id === item2.id)) {
                    accumulator.push(item2);
                }
                return accumulator;
            }, old);
            return mergedArray;
        };

        const payload = {
            params: {
                page: page,
            },
        };
        var notificationUpdate = {};
        axios
            .get(route("api.notification.getMoreNotif"), payload)
            .then((res) => {
                const current_page = res.data.notifications.current_page;
                const last_page = res.data.notifications.last_page;
                notificationUpdate = {
                    ...notificationData,
                    old: updatedNotif(
                        notificationData.oldTransaction,
                        res.data.notifications.data
                    ),
                    page: current_page,
                    hasMoreTransaction: current_page < last_page,
                };
                setNotificationData(notificationUpdate);
            });
    };

    useEffect(() => {
        getFirstNotification();
    }, []);

    return (
        <main className="relative flex font-sans bg-gray-50 text-dark">
            <Head title={title} />
            <aside
                className={`${
                    navShow ? "" : "-translate-x-full md:translate-x-0"
                } z-[200] md:z-50 absolute md:relative w-[60vw] md:w-[18vw] h-screen bg-dark-indigo text-white font-sans text-[3.32vw] md:text-[.83vw] overflow-auto scrollbar-hidden cursor-pointer duration-300`}
            >
                <div className="flex justify-between md:justify-center items-center px-[5vw] md:px-0 md:pt-[2.5vw] md:pb-[1.75vw]">
                    <Link href="/">
                        <img
                            className="w-[36vw] h-[20vw] md:h-full md:w-[9vw]"
                            src={logo}
                            alt="Goals Academy"
                        />
                    </Link>
                    {isMobile && (
                        <NavigationBurgerButton
                            isOpen={navShow}
                            setIsOpen={setNavShow}
                        />
                    )}
                </div>
                <nav className="flex flex-col gap-[5vw] md:gap-[1.25vw] py-[1.25vw] ps-[5vw] pe-[6.3vw] md:ps-[1.67vw] md:pe-[2.1vw]">
                    {navConfig.map((item, index) => {
                        const {
                            name,
                            href,
                            icon,
                            isActive,
                            branches,
                            collapsed,
                        } = item;
                        return (
                            <div key={index}>
                                {branches ? (
                                    <>
                                        <GoalsButton
                                            className="justify-between md:justify-between rounded-[.5vw] ps-[4vw] md:ps-[1vw] pe-[2vw] md:pe-[.5vw] md:py-[.5vw]"
                                            activeClassName={
                                                isActive &&
                                                "bg-white text-dark-indigo"
                                            }
                                            onClick={() =>
                                                navToggleHandler(index)
                                            }
                                        >
                                            {icon}{" "}
                                            <span className="text-[2.8vw] md:text-[.7vw]">
                                                {name.toUpperCase()}
                                            </span>
                                            {collapsed && (
                                                <FaChevronDown
                                                    className={`inline-block duration-300 ${
                                                        navState[index] &&
                                                        "-rotate-180"
                                                    }`}
                                                />
                                            )}
                                        </GoalsButton>
                                        {collapsed ? (
                                            <TECollapse show={navState[index]}>
                                                <TECollapseItem
                                                    className="gap-[.75vw]"
                                                    breakClassName="hidden"
                                                >
                                                    {branches.map(
                                                        (subItem, index) => {
                                                            return (
                                                                <NavItem
                                                                    key={index}
                                                                    {...subItem}
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </TECollapseItem>
                                            </TECollapse>
                                        ) : (
                                            <div className="grid gap-[.75vw] mt-[.85vw]">
                                                {branches.map(
                                                    (subItem, index) => {
                                                        return (
                                                            <NavItem
                                                                key={index}
                                                                {...subItem}
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <NavItem {...item} />
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
            <div className="relative w-full h-screen overflow-hidden bg-[#F8F8FC]">
                <header className="absolute z-[100] md:z-50 top-0 w-full h-[20vw] md:h-[5.8vw] flex justify-between items-center bg-dark-indigo md:bg-gray-50 px-[4.2vw] md:pt-[2.5vw] md:pb-[1.75vw] md:border-b-1">
                    {isMobile ? (
                        <>
                            <div
                                className={`${
                                    !navShow && "hidden"
                                } absolute top-0 w-screen h-screen z-20`}
                                onClick={() => setNavShow(false)}
                            ></div>
                            <div className="flex gap-[4vw] md:gap-[1vw]">
                                <NavigationBurgerButton
                                    isOpen={navShow}
                                    setIsOpen={setNavShow}
                                />
                                <Link href="/">
                                    <img
                                        className="w-[36vw] md:w-[9vw]"
                                        src={logo}
                                        alt="Goals Academy"
                                    />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <h1 className="font-poppins font-normal md:font-semibold text-[4.8vw] md:text-[1.2vw] text-white md:text-dark">
                            {title}
                        </h1>
                    )}
                    <div
                        id="tools"
                        className="flex items-center gap-[2vw] md:gap-[.5vw] text-[6vw] md:text-[1.5vw] text-white md:text-gray-400"
                    >
                        <Notification
                            auth={auth}
                            data={notificationData}
                            loadMore={getOldNotification}
                        />
                        <Link
                            href={route(`${auth.user.user_role}.setting.index`)}
                        >
                            <IoSettingsOutline />
                        </Link>
                        <Link as="button" href="/logout" method="POST">
                            <ImExit />
                        </Link>
                    </div>
                </header>
                <div className="w-full h-screen pt-[20vw] md:pt-[7.5vw] md:pb-[2vw] md:px-[4.2vw] overflow-y-auto scrollbar-hidden">
                    {children}
                </div>
            </div>
        </main>
    );
}

function NavItem({ name, href, icon, isActive, info }) {
    return (
        <GoalsButton
            className="rounded-[2vw] md:rounded-[.5vw] p-[4vw] md:p-[1vw] justify-between items-center"
            activeClassName={isActive && "bg-white text-dark-indigo"}
            isLink={true}
            href={href}
        >
            <div className="flex gap-[3vw] md:gap-[.75vw] !justify-start">
                {icon} {name}
            </div>
            <span
                className={`rounded-full w-[1.5vw] h-[1.5vw] ${
                    info
                        ? "bg-secondary text-white"
                        : "bg-transparent text-transparent"
                } flex items-center justify-center`}
            >
                {info}
            </span>
        </GoalsButton>
    );
}

export const NavigationBurgerButton = ({ isOpen, setIsOpen }) => {
    return (
        <button
            aria-label="navigation-button"
            className="relative py-1 space-y-1 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span
                className={`block w-5 h-0.5 rounded-full bg-white transform transition-transform duration-200 ${
                    isOpen ? "rotate-45 translate-y-1.5" : "rotate-0 top-0"
                }`}
            ></span>
            <span
                className={`block w-5 h-0.5 rounded-full bg-white transform transition-all duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100 top-2"
                }`}
            ></span>
            <span
                className={`block w-5 h-0.5 rounded-full bg-white transform transition-transform duration-200 ${
                    isOpen ? "-rotate-45 -translate-y-1.5" : "rotate-0 top-4"
                }`}
            ></span>
        </button>
    );
};

function Notification({ data, loadMore }) {
    const [show, setShow] = useState(false);

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <div
            className={`font-poppins flex md:justify-end cursor-pointer text-dark`}
            onMouseEnter={() => !isMobile && setShow(true)}
            onMouseLeave={() => !isMobile && setShow(false)}
        >
            <div className="relative">
                <FaRegBell
                    className="fa-regular fa-bell text-[6vw] md:text-[1.5vw] text-white md:text-gray-400"
                    onClick={() => isMobile && setShow(!show)}
                />
                <div
                    className={`${
                        data.new.filter((i) => i.read_at == null).length > 0
                            ? ""
                            : "hidden"
                    } absolute border-1 border-white rounded-full top-0 right-0 w-[2.5vw] h-[2.5vw] md:w-[.6vw] md:h-[.6vw] bg-red-500`}
                ></div>
            </div>
            {isMobile ? (
                <div
                    className={`${
                        show ? "" : "translate-x-[101%]"
                    } absolute w-screen left-0 bottom-0 translate-y-full transition-all duration-500`}
                >
                    <div className="h-[89vh] bg-white shadow-centered md:rounded-[.75vw] overflow-auto scrollbar-hidden pb-[1vw]">
                        <div className="flex justify-between items-center py-[6vw] md:py-[1.5vw] px-[3vw] md:px-[1.5vw] border-b-1">
                            <span className="font-poppins text-[5vw] md:text-[1.25vw]">
                                Notifikasi
                            </span>
                            <button>
                                <Link
                                    href={route("api.notification.readAll")}
                                    className="font-normal text-[3.6vw] md:text-[.9vw] hover:text-secondary"
                                >
                                    Tandai sudah dibaca
                                </Link>
                            </button>
                        </div>
                        <div>
                            {Number(data.new.length) +
                            Number(data.old.length) ? (
                                <>
                                    {data.new.length > 0 && (
                                        <>
                                            <div className="px-[6vw] py-[2vw] md:px-[1.5vw] md:py-[.5vw] text-center text-[4vw] md:text-[1vw]">
                                                Baru
                                            </div>
                                            {data.new.map((item, index) => {
                                                return (
                                                    <NotificationItem
                                                        key={index}
                                                        item={item}
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                    {data.old.length > 0 && (
                                        <>
                                            <div className="px-[6vw] py-[2vw] md:px-[1.5vw] md:py-[.5vw] text-center text-[4vw] md:text-[1vw]">
                                                Terdahulu
                                            </div>
                                            {data.old.map((item, index) => {
                                                return (
                                                    <NotificationItem
                                                        key={index}
                                                        item={item}
                                                    />
                                                );
                                            })}
                                            {data.hasMore && (
                                                <GoalsButton
                                                    activeClassName="bg-white hover:text-secondary text-[4vw] md:text-[1vw]"
                                                    onClick={() =>
                                                        loadMore(data.page + 1)
                                                    }
                                                >
                                                    Load More
                                                </GoalsButton>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="flex justify-center items-center h-[30vh] text-[3.32vw] md:text-[.83vw]">
                                    Oops.. belum ada transaksi
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <TECollapse
                    show={show}
                    className="absolute h-[100vh] md:h-[80vh] z-10 shadow-none p-1 translate-y-[4vw] md:translate-y-[1vw]"
                >
                    {/* profile navbar */}
                    <TECollapseItem className="md:w-[27vw] h-[80vh] bg-transparent">
                        <div className="h-fit max-h-[80vh] bg-white shadow-centered overflow-auto scrollbar-hidden">
                            <div className="flex justify-between items-center py-[1.5vw] px-[3vw] md:px-[1.5vw] border-b-1">
                                <span className="font-poppins text-[4vw] md:text-[1.25vw]">
                                    Notifikasi
                                </span>
                                <button>
                                    <Link
                                        href={route("api.notification.readAll")}
                                        className="font-normal text-[4vw] md:text-[.9vw] hover:text-secondary"
                                    >
                                        Tandai sudah dibaca
                                    </Link>
                                </button>
                            </div>
                            <div>
                                {Number(data.new.length) +
                                Number(data.old.length) ? (
                                    <>
                                        {data.new.length > 0 && (
                                            <>
                                                <div className="px-[1.5vw] py-[.5vw] text-center text-[4vw] md:text-[1vw]">
                                                    Baru
                                                </div>
                                                {data.new.map((item, index) => {
                                                    return (
                                                        <NotificationItem
                                                            key={index}
                                                            item={item}
                                                        />
                                                    );
                                                })}
                                            </>
                                        )}
                                        {data.old.length > 0 && (
                                            <>
                                                <div className="px-[1.5vw] py-[.5vw] text-center text-[4vw] md:text-[1vw]">
                                                    Terdahulu
                                                </div>
                                                {data.old.map((item, index) => {
                                                    return (
                                                        <NotificationItem
                                                            key={index}
                                                            item={item}
                                                        />
                                                    );
                                                })}
                                                {data.hasMore && (
                                                    <GoalsButton
                                                        activeClassName="bg-white hover:text-secondary text-[4vw] md:text-[1vw]"
                                                        onClick={() =>
                                                            loadMore(
                                                                data.page + 1
                                                            )
                                                        }
                                                    >
                                                        Load More
                                                    </GoalsButton>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex justify-center items-center h-[30vh] text-[3.32vw] md:text-[.83vw]">
                                        Oops.. belum ada transaksi
                                    </div>
                                )}
                            </div>
                        </div>
                    </TECollapseItem>
                </TECollapse>
            )}
        </div>
    );
}

function NotificationItem({ item }) {
    if (item.data.category == "Transaksi") {
        return (
            <Link
                href={route("api.notification.read", { id: item.id })}
                className={`${
                    item.read_at ? "hover:bg-soft" : "bg-soft"
                } relative w-full flex justify-between items-center border-y-1 rounded-[.25vw] p-[4vw] md:p-[1vw]`}
            >
                <div className="flex flex-col w-11/12 gap-[2vw] md:gap-[.5vw]">
                    {/* <span className="bg-secondary text-white text-center rounded-[1vw] md:rounded-[.3vw] w-5/12 md:w-4/12 py-[.5vw] md:py-[.1vw] text-[3vw] md:text-[.75vw]">
                        {item.data.category}
                    </span> */}
                    <div className="flex items-center gap-[2vw] md:gap-[.5vw]">
                        <img
                            src={`/img/purchase/${item.data.payment_method.toLowerCase()}.png`}
                            className="w-[8vw] h-[8vw] md:w-[3vw] md:h-[3vw]"
                            alt={item.data.payment_method}
                        />
                        <div>
                            <span className="text-light-grey text-[2.5vw] md:text-[.75vw] font-normal py-[.5vw] md:py-[.1vw]">
                                {moment(item.created_at).fromNow()}
                            </span>
                            <h4 className="text-secondary font-normal font-sans text-[3.5vw] md:text-[1vw] md:mb-[.5vw]">
                                {item.data.title}
                            </h4>
                            <table className="text-[2.5vw] md:text-[.75vw]">
                                <tbody>
                                    <tr>
                                        <td>Bayar Sebelum</td>
                                        <td className="ps-[2vw] pe-[.5vw]">
                                            :
                                        </td>
                                        <td>
                                            {moment(
                                                item.data.expiry_time
                                            ).format("DD MMMM YYYY, HH:mm")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Kode Pesanan</td>
                                        <td className="ps-[2vw] pe-[.5vw]">
                                            :
                                        </td>
                                        <td>{item.data.order_id}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        item.read_at ? "hidden" : ""
                    } bg-secondary rounded-full w-[3vw] h-[3vw] md:w-[.9vw] md:h-[.9vw]`}
                ></div>
            </Link>
        );
    } else {
        return (
            <Link
                href={route("api.notification.read", { id: item.id })}
                className={`${
                    item.read_at ? "hover:bg-soft" : "bg-soft"
                } relative w-full flex justify-between items-center border-y-1 rounded-[.25vw] p-[4vw] md:p-[1vw]`}
            >
                <div className="flex flex-col w-11/12 gap-[2vw] md:gap-[.5vw]">
                    {/* <span className="bg-secondary text-white text-center rounded-[1vw] md:rounded-[.3vw] w-5/12 md:w-4/12 py-[.5vw] md:py-[.1vw] text-[3vw] md:text-[.75vw]">
                        {item.data.category}
                    </span> */}
                    <div>
                        <span className="text-light-grey text-[3vw] md:text-[.75vw] font-normal py-[.5vw] md:py-[.1vw]">
                            {moment(item.created_at).fromNow()}
                        </span>
                        <h4 className="text-secondary font-normal font-sans text-[3vw] md:text-[1vw] md:mb-[.5vw]">
                            {item.data.title}
                        </h4>
                        <div className="text-[2vw] md:text-[.75vw]">
                            {item.data.description}
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        item.read_at ? "hidden" : ""
                    } bg-secondary rounded-full w-[3vw] h-[3vw] md:w-[.9vw] md:h-[.9vw]`}
                ></div>
            </Link>
        );
    }
}
