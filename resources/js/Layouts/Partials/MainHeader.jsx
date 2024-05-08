import { useState } from "react";
import { Link } from "@inertiajs/react";
import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import moment from "moment";
import logo from "/resources/img/icon/goals-1.svg";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import CornerWaveVector from "@/Components/CornerWaveVector";
import CornerWaveVector2 from "@/Components/CornerWaveVector2";
import user from "/resources/img/icon/user.png";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "./MobileHeader";

export default function MainHeader({ auth, title, className }) {
    // console.log(auth);
    const [mobileNavbar, setMobileNavbar] = useState(false);
    const [mobileAuthDropdown, setMobileAuthDropdown] = useState(false);
    const [mobileNotification, setMobileNotification] = useState(false);
    const notificationData = auth.notifications || [];
    let profileImage = "";
    if (auth.user !== null) {
        profileImage = auth.user.profile.profile_image
            ? `/storage/${auth.user.profile.profile_image}`
            : user;
    }

    // useEffect(() => {
    //     setInterval(() => {
    //         fetch(`/api/profile_image/${auth.user.id}`)
    //             .then((response) => response.json())
    //             .then((data) => console.log(data))
    //     }, 5000)
    // }, [])

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <header className={`overflow-y-visible overflow-x-clip sticky w-full top-0 right-0 bg-white text-dark lg:text-base z-50 ${className}`}>
            {/* This is element to generate some tailwind css to make responsive header. Don't erase it */}
            <nav className="container flex flex-wrap justify-between items-center mx-auto h-20 xs:h-24 md:h-20 xl:h-32 3xl:h-48 duration-500">
                {isMobile ? (
                    <MobileHeader
                        auth={auth}
                        title={title}
                        notificationData={notificationData}
                        profileImage={profileImage}
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

                {/* {!auth.user ? (
                ) : (
                    <>
                        <div className="md:hidden flex items-center gap-2">
                            <div className="w-[10vw] md:hidden">
                                <Link href="/">
                                    <img
                                        className="w-full md:h-[2vw] mb-1 md:mb-2"
                                        src={logo2}
                                        alt="Goals Academy"
                                    />
                                </Link>
                            </div>
                            <div onClick={() => setMobileNavbar(true)}>
                                {title}{" "}
                                <i
                                    className={`fa-solid fa-chevron-down ${
                                        mobileNavbar ? "-rotate-180" : ""
                                    } duration-300`}
                                ></i>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-2/12">
                            <Link href="/">
                                <img
                                    className="w-full md:h-[2vw] mb-1 md:mb-2"
                                    src={logo}
                                    alt="Goals Academy"
                                />
                            </Link>
                        </div>
                    </>
                )} */}
                <NavbarExpand
                    auth={auth}
                    title={title}
                    notificationData={notificationData}
                    profileImage={profileImage}
                />
                {/* <div className="md:hidden">
                    {!auth.user ? (
                        <button onClick={() => setMobileNavbar(true)}>
                            <i
                                className={`fa-solid fa-bars text-[7.5vw] duration-300 ${
                                    mobileNavbar ? "opacity-0 rotate-180" : ""
                                }`}
                            ></i>
                        </button>
                    ) : (
                        <div className="w-auto flex flex-wrap justify-end items-center gap-[3vw] md:gap-[1vw] font-medium">
                            <div
                                className={`font-poppins flex justify-end cursor-pointer`}
                                onClick={() =>
                                    setMobileNotification(!mobileNotification)
                                }
                            >
                                <div
                                    className={`${
                                        auth.user.user_role == "user"
                                            ? ""
                                            : "hidden"
                                    } relative`}
                                >
                                    <i className="fa-regular fa-bell text-[7.5vw] md:text-[2vw]"></i>
                                    <div
                                        className={`${
                                            notificationData.length > 0
                                                ? ""
                                                : "hidden"
                                        } absolute border-1 border-white rounded-full top-0 right-0 w-[2.5vw] h-[2.5vw] md:w-[.6vw] md:h-[.6vw] bg-red-500`}
                                    ></div>
                                </div>
                            </div>
                            <div
                                className={`font-poppins flex justify-end cursor-pointer}`}
                                onClick={() =>
                                    setMobileAuthDropdown(!mobileAuthDropdown)
                                }
                            >
                                <div className="overflow-hidden rounded-full w-[8vw] h-[8vw] md:w-[2vw] md:h-[2vw]">
                                    <img
                                        className="w-full h-full"
                                        src={profileImage}
                                        alt="User Profile"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div> */}
            </nav>
            {/* <NavbarMobile
                auth={auth}
                title={title}
                show={mobileNavbar}
                setShow={setMobileNavbar}
            /> */}
            {/* <NotifikasiMobile
                data={notificationData}
                show={mobileNotification}
                setShow={setMobileNotification}
            /> */}
            {/* <AuthDropdownMobile
                show={mobileAuthDropdown}
                setShow={setMobileAuthDropdown}
            /> */}
        </header>
    );
}

function NavbarExpand({ auth, title, notificationData, profileImage }) {
    const [authDropdown, setAuthDropdown] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    return (
        <>
            <div className="hidden md:grid grid-cols-5 md:gap-[3vw] font-medium text-center text-[4vw] md:text-[1vw] select-none">
                <Link
                    href="/produk"
                    className={`font-poppins hover:text-primary flex justify-center ${
                        title == "Produk" ? "font" : ""
                    }`}
                >
                    Produk
                </Link>
                <Link
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
                </Link>
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
                        className="absolute z-10 shadow-none p-1 translate-y-2"
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
                    <div
                        className={`font-poppins flex justify-center cursor-pointer`}
                        onMouseEnter={() => setNotificationDropdown(true)}
                        onMouseLeave={() => setNotificationDropdown(false)}
                        // onClick={() => setNotificationDropdown(!notificationDropdown) }
                    >
                        <div
                            className={`${
                                auth.user.user_role == "user" ? "" : "hidden"
                            } relative`}
                        >
                            <i className="fa-regular fa-bell md:text-[2vw]"></i>
                            <div
                                className={`${
                                    notificationData.length > 0 ? "" : "hidden"
                                } absolute border-1 border-white rounded-full top-0 right-0 w-[2.5vw] h-[2.5vw] md:w-[.6vw] md:h-[.6vw] bg-red-500`}
                            ></div>
                        </div>
                        <TECollapse
                            show={notificationDropdown}
                            className="absolute z-10 shadow-none p-1 translate-y-4"
                        >
                            {/* profile navbar */}
                            <TECollapseItem className="w-[30vw] py-[2vw] px-[3vw] md:py-[1vw] md:px-[1.5vw] gap-[2vw] md:gap-[1vw] text-start bg-white shadow-centered rounded-xl">
                                <div className="flex justify-between items-center">
                                    <span className="font-poppins text-[4vw] md:text-[1.25vw]">
                                        Notifikasi
                                    </span>
                                    <Link
                                        href="/notifikasi"
                                        className="font-normal text-[4vw] md:text-[1vw] hover:text-secondary"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>
                                {notificationData.length ? (
                                    notificationData.map((item, index) => {
                                        return (
                                            <NotifikasiItem
                                                key={index}
                                                item={item}
                                            />
                                        );
                                    })
                                ) : (
                                    <div className="flex justify-center items-center h-[30vh]">
                                        Oops.. belum ada notifikasi
                                    </div>
                                )}
                            </TECollapseItem>
                        </TECollapse>
                    </div>
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
                            className="absolute z-10 shadow-none p-1 translate-y-4"
                        >
                            {/* profile navbar */}
                            <TECollapseItem className="py-[2vw] px-[3vw] md:py-[1vw] md:px-[1.5vw] gap-[2vw] md:gap-[1vw] text-start bg-white shadow-centered rounded-xl">
                                <Link
                                    className="flex gap-2 items-center font-poppins hover:text-primary"
                                    href={"/"+auth.user.user_role}
                                    method="GET"
                                >
                                    <i className="fa-regular fa-circle-user md:text-12 lg:text-20 3xl:text-24"></i>
                                    Dashboard
                                </Link>
                                <Link
                                    className="flex gap-2 items-center font-poppins hover:text-primary"
                                    href={auth.user.user_role == "user" ? "/pengaturan" : route(`${auth.user.user_role}.setting.index`)}
                                    method="GET"
                                >
                                    <i className="bi bi-gear md:text-12 lg:text-20 3xl:text-24"></i>
                                    Pengaturan
                                </Link>
                                <Link
                                    as="button"
                                    className="flex gap-2 items-center font-poppins text-red-500"
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

function NavbarMobile({ auth, title, show, setShow }) {
    const [profileDropdownMobile, setProfileDropdownMobile] = useState(false);
    return (
        <div className="font-medium text-[4vw] md:text-[1vw]">
            <div
                className={`md:hidden w-full absolute z-[999] top-0 right-0 bg-white font-bold text-white min-h-screen py-[6vw] duration-500 ${
                    show ? "" : "opacity-0 translate-x-[110%]"
                }`}
            >
                <div className="container mx-auto">
                    <div className="w-full flex justify-end mb-[6vw] text-dark">
                        <button onClick={() => setShow(false)}>
                            <i
                                className={`fa-solid fa-xmark text-dark text-[8vw]`}
                            ></i>
                        </button>
                    </div>
                    <div className="grid gap-[8vw]">
                        <Link
                            href="/produk"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-[4.25vw] ${
                                title == "Produk" ? "font" : ""
                            }`}
                        >
                            Produk
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                        </Link>
                        <Link
                            href="/artikel"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-[4.25vw] ${
                                title == "Artikel" ? "font" : ""
                            }`}
                        >
                            Artikel
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                        </Link>
                        <Link
                            href="/diskusi"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-[4.25vw] ${
                                title == "Diskusi" ? "font" : ""
                            }`}
                        >
                            Diskusi
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                        </Link>
                        <Link
                            href="/karir"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-[4.25vw] ${
                                title == "Karir" ? "font" : ""
                            }`}
                        >
                            Karir
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                        </Link>
                        <div
                            className={`w-full relative font-poppins flex flex-col justify-center`}
                        >
                            <span
                                className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-[4.25vw] w-full ${
                                    title == "Profil Perusahaan" ||
                                    title == "Profil Tutor"
                                        ? "font"
                                        : ""
                                }`}
                                onClick={() =>
                                    setProfileDropdownMobile(
                                        !profileDropdownMobile
                                    )
                                }
                            >
                                Profil
                                <CornerWaveVector cornerClassName="w-4/12" />
                                <i
                                    className={`fa-solid fa-chevron-down text-[6vw] duration-300 ${
                                        profileDropdownMobile
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                ></i>
                            </span>
                            <TECollapse
                                show={profileDropdownMobile}
                                className="shadow-none text-secondary -translate-x-[5%] px-[5%] w-[110%]"
                            >
                                <TECollapseItem className="gap-[8vw] md:gap-[1vw]">
                                    <Link
                                        href="/profil_perusahaan"
                                        className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-skin p-[4.25vw] overflow-hidden ${
                                            title == "Produk" ? "font" : ""
                                        }`}
                                    >
                                        Profil Perusahaan
                                        <CornerWaveVector2 cornerClassName="w-4/12" />
                                        <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                                    </Link>
                                    <Link
                                        href="/profil_tutor"
                                        className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-skin p-[4.25vw] overflow-hidden ${
                                            title == "Produk" ? "font" : ""
                                        }`}
                                    >
                                        Profil Tutor
                                        <CornerWaveVector2 cornerClassName="w-4/12" />
                                        <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                                    </Link>
                                </TECollapseItem>
                            </TECollapse>
                        </div>
                        {!auth.user ? (
                            <Link
                                href="/login"
                                className="relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-[4.25vw]"
                            >
                                Masuk/Daftar
                                <CornerWaveVector cornerClassName="w-4/12" />
                                <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                            </Link>
                        ) : (
                            <br />
                        )}
                    </div>
                </div>
            </div>
            <div
                className={`absolute z-30 top-0 left-0 h-screen w-screen bg-dark bg-opacity-50 md:hidden ${
                    show ? "" : "hidden"
                }`}
                onClick={() => setShow(false)}
            ></div>
        </div>
    );
}

function AuthDropdownMobile({ show, setShow }) {
    return (
        <div className="font-medium text-[4vw] md:text-[1vw]">
            <div
                className={`md:hidden w-full absolute z-50 top-0 right-0 bg-white font-bold text-white min-h-screen py-[6vw] duration-500 ${
                    show ? "" : "opacity-0 translate-x-[110%]"
                }`}
            >
                <div className="container mx-auto">
                    <div className="w-full flex justify-end mb-[6vw] text-dark">
                        <button onClick={() => setShow(false)}>
                            <i
                                className={`fa-solid fa-xmark text-dark text-[8vw]`}
                            ></i>
                        </button>
                    </div>
                    <div className="grid gap-[8vw]">
                        <Link
                            href={"/"+auth.user.user_role}
                            method="GET"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-[4.25vw]`}
                        >
                            Dashboard
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                        </Link>
                        <Link
                            href={auth.user.user_role == "user" ? "/pengaturan" : route(`${auth.user.user_role}.setting.index`)}
                            method="GET"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-[4.25vw]`}
                        >
                            Pengaturan
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                        </Link>
                        <Link
                            method="post"
                            href="/logout"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-soft text-red-500 p-[4.25vw]`}
                        >
                            Keluar
                            <CornerWaveVector2 cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw]"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className={`absolute z-30 top-0 left-0 h-screen w-screen bg-dark bg-opacity-50 md:hidden ${
                    show ? "" : "hidden"
                }`}
                onClick={() => setShow(false)}
            ></div>
        </div>
    );
}

// function NotifikasiMobile({ data, show, setShow }) {
//     return (
//         <div className="font-medium text-[4vw] md:text-[1vw]">
//             <div
//                 className={`md:hidden w-full absolute z-50 top-0 right-0 bg-white font-bold min-h-screen py-[6vw] duration-500 ${
//                     show ? "" : "opacity-0 translate-x-[110%]"
//                 }`}
//             >
//                 <div className="container mx-auto">
//                     <div className="w-full flex justify-end mb-[6vw] text-dark">
//                         <button onClick={() => setShow(false)}>
//                             <i
//                                 className={`fa-solid fa-xmark text-dark text-[8vw]`}
//                             ></i>
//                         </button>
//                     </div>
//                     <div className="grid gap-[8vw]">
//                         <div className="flex justify-between items-center">
//                             <span className="font-poppins text-[4vw] md:text-[1.25vw]">
//                                 Notifikasi
//                             </span>
//                             <Link
//                                 href="/notifikasi"
//                                 className="font-normal text-[4vw] md:text-[1vw] hover:text-secondary"
//                             >
//                                 Lihat Semua
//                             </Link>
//                         </div>
//                         {data.length ? (
//                             data.map((item, index) => {
//                                 return (
//                                     <NotifikasiItem key={index} item={item} />
//                                 );
//                             })
//                         ) : (
//                             <div className="flex justify-center items-center h-[50vh] font-normal">
//                                 Oops.. belum ada notifikasi
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <div
//                 className={`absolute z-30 top-0 left-0 h-screen w-screen bg-dark bg-opacity-50 md:hidden ${
//                     show ? "" : "hidden"
//                 }`}
//                 onClick={() => setShow(false)}
//             ></div>
//         </div>
//     );
// }

function NotifikasiItem({ item }) {
    if (item.data.category == "Transaksi") {
        return (
            <Link
                href=""
                className="relative w-full flex justify-between items-center shadow-centered-spread rounded-[.25vw] p-[4vw] md:p-[1vw] hover:bg-soft"
            >
                <div className="flex flex-col w-11/12 gap-[2vw] md:gap-[.5vw]">
                    <span className="bg-secondary text-white text-center rounded-[1vw] md:rounded-[.3vw] w-5/12 md:w-4/12 py-[.5vw] md:py-[.1vw] text-[2.5vw] md:text-[.75vw]">
                        {item.data.category}
                    </span>
                    <div className="flex items-center gap-[2vw] md:gap-[.5vw]">
                        <img
                            src={`/img/purchase/${item.data.payment_method.toLowerCase()}.png`}
                            className="w-[8vw] h-[8vw] md:w-[3vw] md:h-[3vw]"
                            alt={item.data.payment_method}
                        />
                        <div>
                            <h4 className="text-secondary font-normal font-sans text-[2.5vw] md:text-[1vw] md:mb-[.5vw]">
                                {item.data.title}
                            </h4>
                            <table className="text-[2vw] md:text-[.75vw]">
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
                href=""
                className="relative w-full flex justify-between items-center shadow-centered-spread rounded-[.25vw] p-[4vw] md:p-[1vw] hover:bg-soft"
            >
                <div className="flex flex-col w-11/12 gap-[2vw] md:gap-[.5vw]">
                    <span className="bg-secondary text-white text-center rounded-[1vw] md:rounded-[.3vw] w-5/12 md:w-4/12 py-[.5vw] md:py-[.1vw] text-[2.5vw] md:text-[.75vw]">
                        {item.data.category}
                    </span>
                    <div>
                        <h4 className="text-secondary font-normal font-sans text-[2.5vw] md:text-[1vw] md:mb-[.5vw]">
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
