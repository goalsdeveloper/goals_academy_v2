import { useState } from "react";
import { Link } from "@inertiajs/react";
import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import moment from "moment";
import logo from "/resources/img/icon/goals-1.svg";
import logo2 from "/resources/img/icon/goals-2.svg";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import CornerWaveVector from "@/Components/CornerWaveVector";
import CornerWaveVector2 from "@/Components/CornerWaveVector2";
import user from "/resources/img/icon/user.png";
import { useEffect } from "react";

export default function MainHeader({ auth, title }) {
    // console.log(auth);
    const [mobileNavbar, setMobileNavbar] = useState(false);
    const [authDropdown, setAuthDropdown] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const notificationData = [
        {
            id: 1,
            category: "Transaksi",
            title: "Mari Selesaikan Pembayaranmu!",
            description: "",
            is_read: false,
            expiry_time: "2023-12-28 13:20",
            order_id: "GA12345678",
            payment_method: "Gopay",
        },
        {
            id: 2,
            category: "Pembelajaran",
            title: "Jadwal Pada Pelaksanaan Programmu!",
            description: "Jadwal pelaksanaan programmu telah keluar.",
            is_read: false,
        },
        {
            id: 3,
            category: "Pembelajaran",
            title: "Jadwal Pada Pelaksanaan Programmu!",
            description: "Tutormu telah ditentukan.",
            is_read: false,
        },
        {
            id: 4,
            category: "Diskon",
            title: "Diskon Merdeka!",
            description: "Dapatkan diskon s/d max. IDR 19.000 dengan melakukan pembayaran menggunakan OVO!",
            is_read: true,
        },
    ]

    useEffect(() => {
        setInterval(() => {
            fetch(`/api/profile_image/${auth.user.id}`)
                .then((response) => response.json())
                .then((data) => console.log(data))
        }, 5000)
    }, [])

    return (
        <header className="fixed w-full top-0 right-0 bg-white text-dark lg:text-base z-50">
            <div className="hidden xl:h-24 3xl:h-36"></div>{" "}
            {/* This is element to generate some tailwind css to make responsive header. Don't erase it */}
            <nav className="container flex flex-wrap justify-between items-center mx-auto h-20 xs:h-24 md:h-20 xl:h-32 3xl:h-48 duration-500">
                {!auth.user ? (
                    <div className="w-6/12 md:w-2/12">
                        <Link href="/">
                            <img
                                className="w-full md:h-5 xl:h-8 3xl:h-10 mb-1 md:mb-2"
                                src={logo}
                                alt="Goals Academy"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="md:hidden flex items-center gap-2">
                            <div className="w-[10vw] md:hidden">
                                <Link href="/">
                                    <img
                                        className="w-full md:h-5 xl:h-8 3xl:h-10 mb-1 md:mb-2"
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
                                    className="w-full md:h-5 xl:h-8 3xl:h-10 mb-1 md:mb-2"
                                    src={logo}
                                    alt="Goals Academy"
                                />
                            </Link>
                        </div>
                    </>
                )}
                <NavbarExpand auth={auth} title={title} notificationData={notificationData} />
                <div className="md:hidden">
                    {!auth.user ? (
                        <button onClick={() => setMobileNavbar(true)}>
                            <i
                                className={`fa-solid fa-bars text-28 duration-300 ${
                                    mobileNavbar ? "opacity-0 rotate-180" : ""
                                }`}
                            ></i>
                        </button>
                    ) : (
                        <div className="w-auto flex flex-wrap justify-end items-center gap-3 md:gap-3 xl:gap-4 3xl:gap-6 font-medium">
                            <div
                                className={`font-poppins flex justify-end cursor-pointer`}
                                onMouseEnter={() => setNotificationDropdown(true)}
                                onMouseLeave={() => setNotificationDropdown(false)}
                                onClick={() => setNotificationDropdown(!notificationDropdown)}
                            >
                                <div className="relative">
                                    <i className="fa-regular fa-bell text-28 md:text-16 lg:text-20 xl:text-24 3xl:text-32"></i>
                                    <div className="absolute border-1 border-white rounded-full top-0 right-0 w-2 h-2 3xl:w-3 3xl:h-3 bg-red-500"></div>
                                </div>
                                <TECollapse
                                    show={notificationDropdown}
                                    className="absolute z-10 shadow-none p-1 translate-y-4"
                                >
                                    {/* profile navbar */}
                                    <TECollapseItem className="w-[75vw] py-4 px-6 md:py-3 md:px-4 lg:py-4 lg:px-6 3xl:py-6 3xl:px-8 gap-4 md:gap-2 lg:gap-3 xl:gap-4 3xl:gap-6 text-start bg-white shadow-centered rounded-xl">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[3.5vw] md:text-[1.25vw]">Notifikasi</span>
                                            <Link href="/notifikasi" className="font-normal hover:text-secondary">Lihat Semua</Link>
                                        </div>
                                        {notificationData.map((item, index) => {
                                            return (
                                                <NotifikasiItem key={index} item={item} />
                                            )
                                        })}
                                    </TECollapseItem>
                                </TECollapse>
                            </div>
                            <div
                                className={`font-poppins flex justify-end cursor-pointer}`}
                                onMouseEnter={() => setAuthDropdown(true)}
                                onMouseLeave={() => setAuthDropdown(false)}
                                onClick={() => setAuthDropdown(!authDropdown)}
                            >
                                <div className="overflow-hidden rounded-full w-7 md:w-4 lg:w-5 xl:w-7 3xl:w-9 h-7 md:h-4 lg:h-5 xl:h-7 3xl:h-9">
                                    <img
                                        className="w-full h-full"
                                        src={user}
                                        alt="User Profile"
                                    />
                                </div>
                                <TECollapse
                                    show={authDropdown}
                                    className="absolute z-10 shadow-none p-1 translate-y-4"
                                >
                                    {/* profile navbar */}
                                    <TECollapseItem className="py-4 px-4 md:py-3 md:px-4 lg:py-4 lg:px-6 3xl:py-6 3xl:px-8 gap-[4vw] md:gap-2 lg:gap-3 xl:gap-4 3xl:gap-6 text-start bg-white shadow-centered rounded-xl">
                                        <Link
                                            className="flex gap-2 items-center font-poppins hover:text-primary"
                                            href="/user"
                                        >
                                            <i className="fa-regular fa-circle-user md:text-12 lg:text-20 3xl:text-24"></i>
                                            Profil
                                        </Link>
                                        <Link
                                            className="flex gap-2 items-center font-poppins hover:text-primary"
                                            href="/pengaturan"
                                        >
                                            <i className="bi bi-gear md:text-12 lg:text-20 3xl:text-24"></i>
                                            Pengaturan
                                        </Link>
                                        <Link
                                            as="button"
                                            className="flex gap-2 items-center font-poppins hover:text-primary"
                                            href="/logout"
                                            method="post"
                                        >
                                            <i className="bi bi-box-arrow-in-left md:text-12 lg:text-20 3xl:text-24"></i>
                                            Log Out
                                        </Link>
                                    </TECollapseItem>
                                </TECollapse>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            <NavbarMobile
                auth={auth}
                title={title}
                mobileNavbar={mobileNavbar}
                setMobileNavbar={setMobileNavbar}
            />
        </header>
    );
}

function NavbarExpand({ auth, title, notificationData }) {
    const [authDropdown, setAuthDropdown] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    return (
        <>
            <div className="hidden md:grid grid-cols-5 md:gap-6 xl:gap-9 3xl:gap-12 font-medium text-center text-12 xs:text-16 sm:text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20">
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
                    onClick={() => setProfileDropdown(!profileDropdown)}
                >
                    <span className="hover:text-primary">Profil</span>
                    <TECollapse
                        show={profileDropdown}
                        className="absolute z-10 shadow-none p-1 translate-y-2"
                    >
                        <TECollapseItem className="py-4 px-6 md:py-3 md:px-4 lg:py-4 lg:px-6 3xl:py-6 3xl:px-8 gap-8 md:gap-2 lg:gap-3 xl:gap-4 3xl:gap-6 text-start bg-white shadow-centered rounded-xl">
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
                <div className="w-auto hidden md:flex flex-wrap justify-end gap-2 3xl:gap-4 font-medium text-12 xs:text-16 sm:text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20">
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
                <div className="w-auto hidden md:flex flex-wrap justify-end items-center md:gap-3 xl:gap-4 3xl:gap-6 font-medium text-12 xs:text-16 sm:text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20">
                    <div
                        className={`font-poppins flex justify-center cursor-pointer`}
                        onMouseEnter={() => setNotificationDropdown(true)}
                        onMouseLeave={() => setNotificationDropdown(false)}
                        onClick={() => setNotificationDropdown(!notificationDropdown)}
                    >
                        <div href="#" className="relative">
                            <i className="fa-regular fa-bell md:text-16 lg:text-20 xl:text-24 3xl:text-32"></i>
                            <div className="absolute border-1 border-white rounded-full top-0 right-0 w-2 h-2 3xl:w-3 3xl:h-3 bg-red-500"></div>
                        </div>
                        <TECollapse
                            show={notificationDropdown}
                            className="absolute z-10 shadow-none p-1 translate-y-4"
                        >
                            {/* profile navbar */}
                            <TECollapseItem className="w-[30vw] py-4 px-6 md:py-3 md:px-4 lg:py-4 lg:px-6 3xl:py-6 3xl:px-8 gap-8 md:gap-2 lg:gap-3 xl:gap-4 3xl:gap-6 text-start bg-white shadow-centered rounded-xl">
                                <div className="flex justify-between items-center">
                                    <span className="text-[1.25vw]">Notifikasi</span>
                                    <Link href="/notifikasi" className="font-normal hover:text-secondary">Lihat Semua</Link>
                                </div>
                                {notificationData.map((item, index) => {
                                    return (
                                        <NotifikasiItem key={index} item={item} />
                                    )
                                })}
                            </TECollapseItem>
                        </TECollapse>
                    </div>
                    <div
                        className={`font-poppins flex justify-center cursor-pointer`}
                        onMouseEnter={() => setAuthDropdown(true)}
                        onMouseLeave={() => setAuthDropdown(false)}
                        onClick={() => setAuthDropdown(!authDropdown)}
                    >
                        <div className="overflow-hidden rounded-full md:h-4 lg:h-5 xl:h-7 3xl:h-9">
                            <img
                                className="w-full h-full"
                                src={user}
                                alt="User Profile"
                            />
                        </div>
                        <TECollapse
                            show={authDropdown}
                            className="absolute z-10 shadow-none p-1 translate-y-4"
                        >
                            {/* profile navbar */}
                            <TECollapseItem className="py-4 px-6 md:py-3 md:px-4 lg:py-4 lg:px-6 3xl:py-6 3xl:px-8 gap-8 md:gap-2 lg:gap-3 xl:gap-4 3xl:gap-6 text-start bg-white shadow-centered rounded-xl">
                                <Link
                                    className="flex gap-2 items-center font-poppins hover:text-primary"
                                    href="/user"
                                >
                                    <i className="fa-regular fa-circle-user md:text-12 lg:text-20 3xl:text-24"></i>
                                    Profil
                                </Link>
                                <Link
                                    className="flex gap-2 items-center font-poppins hover:text-primary"
                                    href="/pengaturan"
                                >
                                    <i className="bi bi-gear md:text-12 lg:text-20 3xl:text-24"></i>
                                    Pengaturan
                                </Link>
                                <Link
                                    as="button"
                                    className="flex gap-2 items-center font-poppins hover:text-primary"
                                    href="/logout"
                                    method="post"
                                >
                                    <i className="bi bi-box-arrow-in-left md:text-12 lg:text-20 3xl:text-24"></i>
                                    Log Out
                                </Link>
                            </TECollapseItem>
                        </TECollapse>
                    </div>
                </div>
            )}
        </>
    );
}

function NavbarMobile({ auth, title, mobileNavbar, setMobileNavbar }) {
    const [profileDropdownMobile, setProfileDropdownMobile] = useState(false);
    return (
        <div className="text-12 xs:text-16 sm:text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20">
            <div
                className={`md:hidden w-full absolute z-50 top-0 right-0 bg-white font-bold text-white min-h-screen py-6 xs:py-8 duration-500 ${
                    mobileNavbar ? "" : "opacity-0 translate-x-[110%]"
                }`}
            >
                <div className="container mx-auto">
                    <div className="w-full flex justify-end mb-6 xs:mb-8 text-dark">
                        <button onClick={() => setMobileNavbar(false)}>
                            <i
                                className={`fa-solid fa-xmark text-dark text-36`}
                            ></i>
                        </button>
                    </div>
                    <div className="grid gap-8">
                        <Link
                            href="/produk"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-4 ${
                                title == "Produk" ? "font" : ""
                            }`}
                        >
                            Produk
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                        </Link>
                        <Link
                            href="/artikel"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-4 ${
                                title == "Artikel" ? "font" : ""
                            }`}
                        >
                            Artikel
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                        </Link>
                        <Link
                            href="/diskusi"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-4 ${
                                title == "Diskusi" ? "font" : ""
                            }`}
                        >
                            Diskusi
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                        </Link>
                        <Link
                            href="/karir"
                            className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-4 ${
                                title == "Karir" ? "font" : ""
                            }`}
                        >
                            Karir
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                        </Link>
                        <div
                            className={`w-full relative font-poppins flex flex-col justify-center`}
                        >
                            <span
                                className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-4 w-full ${
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
                                    className={`fa-solid fa-chevron-down text-20 xs:text-24 duration-300 ${
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
                                <TECollapseItem className="gap-8 md:gap-2 lg:gap-3 xl:gap-4 3xl:gap-6">
                                    <Link
                                        href="/profil_perusahaan"
                                        className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-skin p-4 overflow-hidden ${
                                            title == "Produk" ? "font" : ""
                                        }`}
                                    >
                                        Profil Perusahaan
                                        <CornerWaveVector2 cornerClassName="w-4/12" />
                                        <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                                    </Link>
                                    <Link
                                        href="/profil_tutor"
                                        className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-skin p-4 overflow-hidden ${
                                            title == "Produk" ? "font" : ""
                                        }`}
                                    >
                                        Profil Tutor
                                        <CornerWaveVector2 cornerClassName="w-4/12" />
                                        <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                                    </Link>
                                </TECollapseItem>
                            </TECollapse>
                        </div>
                        {!auth.user ? (
                            <Link
                                href="/login"
                                className="relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-4"
                            >
                                Masuk/Daftar
                                <CornerWaveVector cornerClassName="w-4/12" />
                                <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                            </Link>
                        ) : (
                            <br />
                        )}
                    </div>
                </div>
            </div>
            <div
                className={`absolute z-30 top-0 left-0 h-screen w-screen bg-dark bg-opacity-50 md:hidden ${
                    mobileNavbar ? "" : "hidden"
                }`}
                onClick={() => setMobileNavbar(false)}
            ></div>
        </div>
    );
}

function NotifikasiItem ({ item }) {
    if (item.category == 'Transaksi') {
        return (
            <Link href="" className="relative w-full flex justify-between items-center shadow-centered-spread rounded-[.25vw] p-[4vw] md:p-[1vw] hover:bg-soft">
                <div className="flex flex-col w-11/12 gap-[2vw] md:gap-[.5vw]">
                    <span className="bg-secondary text-white text-center rounded-[1vw] md:rounded-[.3vw] w-5/12 md:w-4/12 py-[.5vw] md:py-[.1vw] text-[2.5vw] md:text-[.75vw]">
                        {item.category}
                    </span>
                    <div className="flex items-center gap-[2vw] md:gap-[.5vw]">
                        <img src={`/img/purchase/${item.payment_method.toLowerCase()}.png`} className="w-[8vw] h-[8vw] md:w-[3vw] md:h-[3vw]" alt={item.payment_method} />
                        <div>
                            <h4 className="text-secondary font-normal font-sans text-[2.5vw] md:text-[1vw]">
                                {item.title}
                            </h4>
                            <table className="text-[2vw] md:text-[.75vw]">
                                <tbody>
                                    <tr>
                                        <td>Bayar Sebelum</td>
                                        <td className="ps-[2vw] pe-[.5vw]">:</td>
                                        <td>{moment(item.expiry_time).format('DD MMMM YYYY, HH:mm')}</td>
                                    </tr>
                                    <tr>
                                        <td>Kode Pesanan</td>
                                        <td className="ps-[2vw] pe-[.5vw]">:</td>
                                        <td>{item.order_id}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={`${item.is_read ? 'hidden' : ''} bg-secondary rounded-full w-[3vw] h-[3vw] md:w-[.9vw] md:h-[.9vw]`}></div>
            </Link>
        )
    } else {
        return (
            <Link href="" className="relative w-full flex justify-between items-center shadow-centered-spread rounded-[.25vw] p-[4vw] md:p-[1vw] hover:bg-soft">
                <div className="flex flex-col w-11/12 gap-[2vw] md:gap-[.5vw]">
                    <span className="bg-secondary text-white text-center rounded-[1vw] md:rounded-[.3vw] w-5/12 md:w-4/12 py-[.5vw] md:py-[.1vw] text-[2.5vw] md:text-[.75vw]">
                        {item.category}
                    </span>
                    <div>
                        <h4 className="text-secondary font-normal font-sans text-[2.5vw] md:text-[1vw]">
                            {item.title}
                        </h4>
                        <div className="text-[2vw] md:text-[.75vw]">
                            {item.description}
                        </div>
                    </div>
                </div>
                <div className={`${item.is_read ? 'hidden' : ''} bg-secondary rounded-full w-[3vw] h-[3vw] md:w-[.9vw] md:h-[.9vw]`}></div>
            </Link>
        )
    }
}
