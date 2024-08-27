import { useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import moment from "moment";
import logo from "/resources/img/icon/goals-1.svg";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import user from "/resources/img/icon/user.png";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "./MobileHeader";
import "@/script/momentCustomLocale";
import GoalsButton from "@/Components/GoalsButton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

export default function MainHeader({ auth, title, className }) {
    let profileImage = "";
    if (auth.user !== null) {
        profileImage = auth.user.profile.profile_image
            ? `/storage/${auth.user.profile.profile_image}`
            : user;
    }

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    // Notification Variable & Fetching Function
    const { data: notificationData, setData: setNotificationData } = useForm({
        newTransaction: [],
        oldTransaction: [],
        promo: [],
        program: [],
        pageTransaction: 1,
        pagePromo: 1,
        pageProgram: 1,
        hasMoreTransaction: true,
        hasMorePromo: true,
        hasMoreProgram: true,
    });

    const getFirstNotification = () => {
        axios
            .get(route("api.notification.userNotification"))
            .then((res) => {
                const data = res.data;
                setNotificationData((n) => ({
                    ...n,
                    newTransaction: data.new_transaction_notifications,
                    oldTransaction: data.transaction_notifications.data,
                    program: data.program_notifications.data,
                    promo: data.promo_notifications.data,
                    hasMoreTransaction:
                        data.transaction_notifications.current_page <
                        data.transaction_notifications.last_page,
                    hasMoreProgram:
                        data.program_notifications.current_page <
                        data.program_notifications.last_page,
                    hasMorePromo:
                        data.promo_notifications.current_page <
                        data.promo_notifications.last_page,
                }));
                setTimeout(() => getNewNotification(), 10000);
            })
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
        axios
            .get(route("api.notification.userNotification"), {
                params: { new: true },
            })
            .then((res) => {
                const data = res.data;
                setNotificationData((n) => ({
                    ...n,
                    newTransaction: mergedNewNotif(
                        n.newTransaction,
                        data.transaction_notifications
                    ),
                    program: mergedNewNotif(
                        n.program,
                        data.program_notifications
                    ),
                    promo: mergedNewNotif(n.promo, data.promo_notifications),
                }));
                setTimeout(() => getNewNotification(), 10000)
            })
    };

    const getOldNotification = (category, page, setIsLoading) => {
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
                type: category,
                page: page,
            },
        };
        var notificationUpdate = {};

        setIsLoading(true);

        axios
            .get(route("api.notification.getMoreNotif"), payload)
            .then((res) => {
                const current_page = res.data.notifications.current_page;
                const last_page = res.data.notifications.last_page;
                switch (category) {
                    case "Transaksi":
                        notificationUpdate = {
                            ...notificationData,
                            oldTransaction: updatedNotif(
                                notificationData.oldTransaction,
                                res.data.notifications.data
                            ),
                            pageTransaction: current_page,
                            hasMoreTransaction: current_page < last_page,
                        };
                        break;
                    case "Pembelajaran":
                        notificationUpdate = {
                            ...notificationData,
                            program: updatedNotif(
                                notificationData.program,
                                res.data.notifications.data
                            ),
                            pageProgram: current_page,
                            hasMoreProgram: current_page < last_page,
                        };
                        break;
                    case "Promo":
                        notificationUpdate = {
                            ...notificationData,
                            promo: updatedNotif(
                                notificationData.promo,
                                res.data.notifications.data
                            ),
                            pagePromo: current_page,
                            hasMorePromo: current_page < last_page,
                        };
                        break;
                    default:
                        break;
                }
                setNotificationData(notificationUpdate);
                setIsLoading(false);
            });
    };

    // Jalankan getNewNotification
    useEffect(() => {
        if (auth.user?.user_role == "user") {
            getFirstNotification();
        }
    }, []);

    return (
        <header
            className={`${
                isMobile ? "shadow" : ""
            } overflow-y-visible overflow-x-clip sticky w-full top-0 right-0 bg-white text-dark lg:text-base z-50 ${className}`}
        >
            {/* This is element to generate some tailwind css to make responsive header. Don't erase it */}
            <div className="md:h-[7.5vw] hidden"></div>
            <nav className="container flex flex-wrap items-center justify-between mx-auto duration-500 h-[20vw] md:h-[10vw]">
                {isMobile ? (
                    <MobileHeader
                        {...{
                            auth,
                            title,
                            profileImage,
                            notificationData,
                            getOldNotification,
                        }}
                    />
                ) : (
                    <div className="w-6/12 md:w-2/12">
                        <Link href="/">
                            <img
                                className="w-full md:h-[2vw] mb-1 md:mb-2"
                                src={logo}
                                alt="Goals Academy"
                            />
                        </Link>
                    </div>
                )}
                <NavbarExpand
                    {...{
                        auth,
                        title,
                        profileImage,
                        notificationData,
                        getOldNotification,
                    }}
                />
            </nav>
        </header>
    );
}

function NavbarExpand({
    auth,
    title,
    profileImage,
    notificationData,
    getOldNotification,
}) {
    const [authDropdown, setAuthDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    return (
        <>
            <div className="hidden md:grid grid-cols-4 md:gap-[3vw] font-medium text-center text-[4vw] md:text-[1vw] select-none">
                <Link
                    href="/produk"
                    className={`font-poppins hover:text-primary flex justify-center ${
                        title == "Produk" ? "font" : ""
                    }`}
                >
                    Produk
                </Link>
                <Link
                    href="/ecourse"
                    className={`font-poppins hover:text-primary flex justify-center ${
                        title == "E-Course" ? "font" : ""
                    }`}
                >
                    E-Course
                </Link>
                {/* <Link
                    href="/artikel"
                    className={`font-poppins hover:text-primary flex justify-center ${
                        title == "Artikel" ? "font" : ""
                    }`}
                >
                    Artikel
                </Link>
                <Link
                    href="/diskusi"
                    className={`font-poppins hover:text-primary flex justify-center ${
                        title == "Diskusi" ? "font" : ""
                    }`}
                >
                    Diskusi
                </Link> */}
                <Link
                    href="/karir"
                    className={`font-poppins hover:text-primary flex justify-center ${
                        title == "Karir" ? "font" : ""
                    }`}
                >
                    Karir
                </Link>
                <div
                    className={`font-poppins flex justify-center cursor-pointer ${
                        title == "Profil Perusahaan" || title == "Profil Tutor"
                            ? "font"
                            : ""
                    }`}
                    onMouseEnter={() => setProfileDropdown(true)}
                    onMouseLeave={() => setProfileDropdown(false)}
                    // onClick={() => setProfileDropdown(!profileDropdown)}
                >
                    <span className="hover:text-primary">Profil</span>
                    <TECollapse
                        show={profileDropdown}
                        className="absolute z-10 p-1 translate-y-2 shadow-none"
                    >
                        <TECollapseItem className="py-[2vw] px-[3vw] md:py-[1vw] md:px-[1.5vw] gap-[2vw] md:gap-[1vw] text-start bg-white shadow-centered rounded-xl">
                            <Link
                                className="font-poppins hover:text-primary"
                                href="/profil_perusahaan"
                            >
                                Profil Perusahaan
                            </Link>
                            <Link
                                className="font-poppins hover:text-primary"
                                href="/profil_tutor"
                            >
                                Profil Tutor
                            </Link>
                        </TECollapseItem>
                    </TECollapse>
                </div>
            </div>
            {!auth.user ? (
                <div className="w-auto hidden md:flex flex-wrap justify-end gap-2 3xl:gap-4 font-medium text-[4vw] md:text-[1vw]">
                    <Link href="/login">
                        <ButtonHoverSlide className="text-secondary before:-z-10 hover:text-white border-1 xl:border-2 border-secondary hover:border-primary md:rounded-lg xl:rounded-xl 3xl:rounded-2xl md:px-4 md:py-1 xl:px-6 xl:py-2 3xl:px-8 3xl:py-3 before:w-[200%] before:-ms-[200%] before:duration-300 hover:before:-ms-[50%] before:bg-sweep-primary">
                            Masuk
                        </ButtonHoverSlide>
                    </Link>
                    <Link
                        href="/register"
                        className="text-white border-1 xl:border-2 border-secondary bg-secondary hover:bg-primary hover:border-primary md:rounded-lg xl:rounded-xl 3xl:rounded-2xl md:px-4 md:py-1 xl:px-6 xl:py-2 3xl:px-8 3xl:py-3"
                    >
                        Daftar
                    </Link>
                </div>
            ) : (
                <div className="w-auto hidden md:flex flex-wrap justify-end items-center gap-[3vw] md:gap-[1vw] font-medium text-[4vw] md:text-[1vw]">
                    <Notification
                        auth={auth}
                        data={notificationData}
                        loadMore={getOldNotification}
                    />
                    <div
                        className={`font-poppins flex justify-center cursor-pointer`}
                        onMouseEnter={() => setAuthDropdown(true)}
                        onMouseLeave={() => setAuthDropdown(false)}
                        // onClick={() => setAuthDropdown(!authDropdown)}
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
                            className="absolute z-10 p-1 translate-y-4 shadow-none"
                        >
                            {/* profile navbar */}
                            <TECollapseItem className="py-[2vw] px-[3vw] md:py-[1vw] md:px-[1.5vw] gap-[2vw] md:gap-[1vw] text-start bg-white shadow-centered rounded-xl">
                                <Link
                                    className="flex items-center gap-2 font-poppins hover:text-primary"
                                    href={"/" + auth.user.user_role}
                                    method="GET"
                                >
                                    <i className="fa-regular fa-circle-user md:text-12 lg:text-20 3xl:text-24"></i>
                                    Dashboard
                                </Link>
                                <Link
                                    className="flex items-center gap-2 font-poppins hover:text-primary"
                                    href={
                                        auth.user.user_role == "user"
                                            ? "/pengaturan"
                                            : route(
                                                  `${auth.user.user_role}.setting.index`
                                              )
                                    }
                                    method="GET"
                                >
                                    <i className="bi bi-gear md:text-12 lg:text-20 3xl:text-24"></i>
                                    Pengaturan
                                </Link>
                                <Link
                                    as="button"
                                    className="flex items-center gap-2 text-red-500 font-poppins"
                                    href="/logout"
                                    method="post"
                                >
                                    <i className="bi bi-box-arrow-in-left md:text-12 lg:text-20 3xl:text-24"></i>
                                    Keluar
                                </Link>
                            </TECollapseItem>
                        </TECollapse>
                    </div>
                </div>
            )}
        </>
    );
}

function Notification({ auth, data, loadMore }) {
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [activeDisplay, setActiveDisplay] = useState(0);

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const loadMoreTransaction = () => {
        loadMore("Transaksi", data.pageTransaction + 1, setIsLoading);
    };

    const loadMorePromo = () => {
        loadMore("Promo", data.pagePromo + 1, setIsLoading);
    };

    const loadMoreProgram = () => {
        loadMore("Pembelajaran", data.pageProgram + 1, setIsLoading);
    };

    return (
        <div
            className={`font-poppins flex md:justify-center cursor-pointer`}
            onMouseEnter={() => !isMobile && setShow(true)}
            onMouseLeave={() => !isMobile && setShow(false)}
        >
            <div
                className={`${
                    auth.user.user_role == "user" ? "" : "hidden"
                } relative`}
            >
                <i
                    className="fa-regular fa-bell text-[8vw] md:text-[2vw]"
                    onClick={() => isMobile && setShow(!show)}
                ></i>
                <div
                    className={`${
                        data.newTransaction
                            .concat(data.promo)
                            .concat(data.program)
                            .filter((i) => i.read_at == null).length > 0
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
                    <div className="h-screen pb-[20vw] bg-white shadow-centered md:rounded-[.75vw] overflow-auto scrollbar-hidden">
                        <div className="flex justify-between items-center py-[6vw] md:py-[1.5vw] px-[3vw] md:px-[1.5vw]">
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
                        <div className="flex gap-[4vw] md:gap-[1vw] border-b-1 px-[3vw] md:px-[1.5vw] text-[3.6vw] md:text-[.9vw] font-normal">
                            <button
                                className={`${
                                    activeDisplay == 0
                                        ? "border-dark"
                                        : "border-transparent text-light-grey"
                                } pb-[2vw] md:pb-[.5vw] border-b-2 flex items-center gap-[2vw]`}
                                onClick={() => setActiveDisplay(0)}
                            >
                                Transaksi
                                <div
                                    className={`${
                                        data.newTransaction.filter(
                                            (i) => i.read_at == null
                                        ).length > 0
                                            ? ""
                                            : "hidden"
                                    } bg-secondary w-[2vw] h-[2vw] rounded-full`}
                                ></div>
                            </button>
                            <button
                                className={`${
                                    activeDisplay == 1
                                        ? "border-dark"
                                        : "border-transparent text-light-grey"
                                } pb-[2vw] md:pb-[.5vw] border-b-2 flex items-center gap-[2vw]`}
                                onClick={() => setActiveDisplay(1)}
                            >
                                Promo
                                <div
                                    className={`${
                                        data.promo.filter(
                                            (i) => i.read_at == null
                                        ).length > 0
                                            ? ""
                                            : "hidden"
                                    } bg-secondary w-[2vw] h-[2vw] rounded-full`}
                                ></div>
                            </button>
                            <button
                                className={`${
                                    activeDisplay == 2
                                        ? "border-dark"
                                        : "border-transparent text-light-grey"
                                } pb-[2vw] md:pb-[.5vw] border-b-2 flex items-center gap-[2vw]`}
                                onClick={() => setActiveDisplay(2)}
                            >
                                Program
                                <div
                                    className={`${
                                        data.program.filter(
                                            (i) => i.read_at == null
                                        ).length > 0
                                            ? ""
                                            : "hidden"
                                    } bg-secondary w-[2vw] h-[2vw] rounded-full`}
                                ></div>
                            </button>
                        </div>
                        {/* Transaksi */}
                        <div className={activeDisplay != 0 && "hidden"}>
                            {Number(data.newTransaction.length) +
                                Number(data.oldTransaction.length) >
                            0 ? (
                                <>
                                    {data.newTransaction.length > 0 && (
                                        <>
                                            <div className="px-[6vw] py-[2vw] md:px-[1.5vw] md:py-[.5vw] text-center">
                                                Baru
                                            </div>
                                            {data.newTransaction.map(
                                                (item, index) => {
                                                    return (
                                                        <NotificationItem
                                                            key={index}
                                                            item={item}
                                                        />
                                                    );
                                                }
                                            )}
                                        </>
                                    )}
                                    {data.oldTransaction.length > 0 && (
                                        <>
                                            <div className="px-[6vw] py-[2vw] md:px-[1.5vw] md:py-[.5vw] text-center">
                                                Terdahulu
                                            </div>
                                            {data.oldTransaction.map(
                                                (item, index) => {
                                                    return (
                                                        <NotificationItem
                                                            key={index}
                                                            item={item}
                                                        />
                                                    );
                                                }
                                            )}
                                            {data.hasMoreTransaction ==
                                                true && (
                                                <GoalsButton
                                                    activeClassName="bg-white hover:text-secondary"
                                                    onClick={() =>
                                                        isLoading
                                                            ? false
                                                            : loadMoreTransaction()
                                                    }
                                                >
                                                    {isLoading ? (
                                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                                    ) : (
                                                        "Load More"
                                                    )}
                                                </GoalsButton>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="flex justify-center items-center h-[30vh]">
                                    Oops.. belum ada transaksi
                                </div>
                            )}
                        </div>
                        {/* Promo */}
                        <div className={activeDisplay != 1 && "hidden"}>
                            {data.promo.length ? (
                                <>
                                    {data.promo.map((item, index) => {
                                        return (
                                            <NotificationItem
                                                key={index}
                                                item={item}
                                            />
                                        );
                                    })}
                                    {data.hasMorePromo && (
                                        <GoalsButton
                                            activeClassName="bg-white hover:text-secondary"
                                            onClick={() =>
                                                isLoading
                                                    ? false
                                                    : loadMorePromo()
                                            }
                                        >
                                            {isLoading ? (
                                                <AiOutlineLoading3Quarters className="animate-spin" />
                                            ) : (
                                                "Load More"
                                            )}
                                        </GoalsButton>
                                    )}
                                </>
                            ) : (
                                <div className="flex justify-center items-center h-[30vh]">
                                    Oops.. belum ada transaksi
                                </div>
                            )}
                        </div>
                        {/* Program */}
                        <div className={activeDisplay != 2 && "hidden"}>
                            {data.program.length ? (
                                <>
                                    {data.program.map((item, index) => {
                                        return (
                                            <NotificationItem
                                                key={index}
                                                item={item}
                                            />
                                        );
                                    })}
                                    {data.hasMoreProgram && (
                                        <GoalsButton
                                            activeClassName="bg-white hover:text-secondary"
                                            onClick={() =>
                                                isLoading
                                                    ? false
                                                    : loadMoreProgram()
                                            }
                                        >
                                            {isLoading ? (
                                                <AiOutlineLoading3Quarters className="animate-spin" />
                                            ) : (
                                                "Load More"
                                            )}
                                        </GoalsButton>
                                    )}
                                </>
                            ) : (
                                <div className="flex justify-center items-center h-[30vh]">
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
                            <div className="flex justify-between items-center py-[1.5vw] px-[3vw] md:px-[1.5vw]">
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
                            <div className="flex gap-[1vw] border-b-1 px-[3vw] md:px-[1.5vw] text-[.9vw] font-normal">
                                <button
                                    className={`${
                                        activeDisplay == 0
                                            ? "border-dark"
                                            : "border-transparent text-light-grey"
                                    } pb-[.5vw] border-b-2 flex items-center gap-[.5vw]`}
                                    onClick={() => setActiveDisplay(0)}
                                >
                                    Transaksi
                                    <div
                                        className={`${
                                            data.newTransaction.filter(
                                                (i) => i.read_at == null
                                            ).length > 0
                                                ? ""
                                                : "hidden"
                                        } bg-secondary w-[.5vw] h-[.5vw] rounded-full`}
                                    ></div>
                                </button>
                                <button
                                    className={`${
                                        activeDisplay == 1
                                            ? "border-dark"
                                            : "border-transparent text-light-grey"
                                    } pb-[.5vw] border-b-2 flex items-center gap-[.5vw]`}
                                    onClick={() => setActiveDisplay(1)}
                                >
                                    Promo
                                    <div
                                        className={`${
                                            data.promo.filter(
                                                (i) => i.read_at == null
                                            ).length > 0
                                                ? ""
                                                : "hidden"
                                        } bg-secondary w-[.5vw] h-[.5vw] rounded-full`}
                                    ></div>
                                </button>
                                <button
                                    className={`${
                                        activeDisplay == 2
                                            ? "border-dark"
                                            : "border-transparent text-light-grey"
                                    } pb-[.5vw] border-b-2 flex items-center gap-[.5vw]`}
                                    onClick={() => setActiveDisplay(2)}
                                >
                                    Program
                                    <div
                                        className={`${
                                            data.program.filter(
                                                (i) => i.read_at == null
                                            ).length > 0
                                                ? ""
                                                : "hidden"
                                        } bg-secondary w-[.5vw] h-[.5vw] rounded-full`}
                                    ></div>
                                </button>
                            </div>
                            {/* Transaksi */}
                            <div className={activeDisplay != 0 && "hidden"}>
                                {Number(data.newTransaction.length) +
                                    Number(data.oldTransaction.length) >
                                0 ? (
                                    <>
                                        {data.newTransaction.length > 0 && (
                                            <>
                                                <div className="px-[1.5vw] py-[.5vw] text-center">
                                                    Baru
                                                </div>
                                                {data.newTransaction.map(
                                                    (item, index) => {
                                                        return (
                                                            <NotificationItem
                                                                key={index}
                                                                item={item}
                                                            />
                                                        );
                                                    }
                                                )}
                                            </>
                                        )}
                                        {data.oldTransaction.length > 0 && (
                                            <>
                                                <div className="px-[1.5vw] py-[.5vw] text-center">
                                                    Terdahulu
                                                </div>
                                                {data.oldTransaction.map(
                                                    (item, index) => {
                                                        return (
                                                            <NotificationItem
                                                                key={index}
                                                                item={item}
                                                            />
                                                        );
                                                    }
                                                )}
                                                {data.hasMoreTransaction && (
                                                    <GoalsButton
                                                        activeClassName="bg-white hover:text-secondary"
                                                        onClick={() =>
                                                            isLoading
                                                                ? false
                                                                : loadMoreTransaction()
                                                        }
                                                    >
                                                        {isLoading ? (
                                                            <AiOutlineLoading3Quarters className="animate-spin" />
                                                        ) : (
                                                            "Load More"
                                                        )}
                                                    </GoalsButton>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex justify-center items-center h-[30vh]">
                                        Oops.. belum ada transaksi
                                    </div>
                                )}
                            </div>
                            {/* Promo */}
                            <div className={activeDisplay != 1 && "hidden"}>
                                {data.promo.length ? (
                                    <>
                                        {data.promo.map((item, index) => {
                                            return (
                                                <NotificationItem
                                                    key={index}
                                                    item={item}
                                                />
                                            );
                                        })}
                                        {data.hasMorePromo == true && (
                                            <GoalsButton
                                                activeClassName="bg-white hover:text-secondary"
                                                onClick={() =>
                                                    isLoading
                                                        ? false
                                                        : loadMorePromo()
                                                }
                                            >
                                                {isLoading ? (
                                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                                ) : (
                                                    "Load More"
                                                )}
                                            </GoalsButton>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex justify-center items-center h-[30vh]">
                                        Oops.. belum ada transaksi
                                    </div>
                                )}
                            </div>
                            {/* Program */}
                            <div className={activeDisplay != 2 && "hidden"}>
                                {data.program.length ? (
                                    <>
                                        {data.program.map((item, index) => {
                                            return (
                                                <NotificationItem
                                                    key={index}
                                                    item={item}
                                                />
                                            );
                                        })}
                                        {data.hasMoreProgram == true && (
                                            <GoalsButton
                                                activeClassName="bg-white hover:text-secondary"
                                                onClick={() =>
                                                    isLoading
                                                        ? false
                                                        : loadMoreProgram()
                                                }
                                            >
                                                {isLoading ? (
                                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                                ) : (
                                                    "Load More"
                                                )}
                                            </GoalsButton>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex justify-center items-center h-[30vh]">
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
                method="GET"
                onClick={() => {
                    axios
                        .get(route("api.notification.read", { id: item.id }))
                        .then((res) => {
                            if(res.status == 200) {
                                window.location = res.data.link
                            } else {
                                window.reload()
                            }
                        });
                }}
                as="button"
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
                        <div className="text-left">
                            <span className="text-light-grey !text-[3vw] md:!text-[.75vw] font-normal py-[.5vw] md:py-[.1vw]">
                                {moment(item.created_at).fromNow()}
                            </span>
                            <h4 className="text-secondary font-normal font-sans !text-[3.5vw] md:!text-[1vw] md:mb-[.5vw]">
                                {item.data.title}
                            </h4>
                            <table className="!text-[3vw] md:!text-[.75vw]">
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
                onClick={(e) => {
                    axios
                        .get(route("api.notification.read", { id: item.id }))
                        .then((res) => {
                            if (item.data.link != undefined) {
                                window.location = item.data.link;
                                return;
                            }
                            location.reload();
                        });
                }}
                className={`${
                    item.read_at ? "hover:bg-soft" : "bg-soft"
                } relative w-full flex justify-between items-center border-y-1 rounded-[.25vw] p-[4vw] md:p-[1vw]`}
            >
                <div className="flex flex-col w-11/12 gap-[2vw] md:gap-[.5vw]">
                    {/* <span className="bg-secondary text-white text-center rounded-[1vw] md:rounded-[.3vw] w-5/12 md:w-4/12 py-[.5vw] md:py-[.1vw] text-[3vw] md:text-[.75vw]">
                        {item.data.category}
                    </span> */}
                    <div>
                        <span className="text-light-grey !text-[3vw] md:!text-[.75vw] font-normal py-[.5vw] md:py-[.1vw]">
                            {moment(item.created_at).fromNow()}
                        </span>
                        <h4 className="text-secondary font-normal font-sans !text-[3vw] md:!text-[1vw] md:mb-[.5vw]">
                            {item.data.title}
                        </h4>
                        <div className="!text-[3vw] md:!text-[.75vw]">
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

export { Notification, NotificationItem };
