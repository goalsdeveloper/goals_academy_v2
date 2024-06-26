import "/resources/css/main.css";
import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Input from "@/Components/OnBorderLabeledInput";
import SubmitButton from "@/Components/BorderedSubmitButton";
import TECollapseItem from "@/Components/TECollapseItem";
import CornerWaveVector from "@/Components/CornerWaveVector";
import CornerWaveVector2 from "@/Components/CornerWaveVector2";
import logo from "/resources/img/icon/goals-3.svg";
import figure7 from "/resources/img/figure/7.svg";
import rectangle from "/resources/img/vector/rectangle-1.svg";

import { TECollapse } from "tw-elements-react";
import icon from "/resources/img/icon/goals-4.svg";

export default function Form ({ title, message }) {
    const [active, setActive] = useState(title);
    console.log(message)
    const {
        data: loginData,
        setData: setLoginData,
        post: loginSubmit,
    } = useForm({
        email: "",
        password: "",
    });
    const {
        data: registerData,
        setData: setRegisterData,
        post: registerSubmit,
    } = useForm({
        username: "",
        email: "",
        password: "",
        confirmation_password: "",
        agreement: false,
    });

    const switchForm = (request) => {
        if (request == "login") {
            setActive("login");
            history.replaceState({}, "", "/login");
        } else {
            setActive("register");
            history.replaceState({}, "", "/register");
        }
    };

    const login = (e) => {
        e.preventDefault();
        // alert(loginData.email);
        loginSubmit(route("auth.login"));
    };

    const register = (e) => {
        e.preventDefault();
        // alert(registerData.email);
        registerSubmit(route("auth.register"));
    };

    return (
        <div
            id="form"
            className="relative xl:flex flex-wrap min-h-screen xl:h-screen bg-secondary text-[3vw] md:text-[2vw] xl:text-[1vw] pb-20 xs:pb-24 xl:p-0 overflow-hidden"
        >
            <Head title={active == "register" ? "Register" : "Login"} />
            <Header title={title} />
            <CornerWaveVector className="xl:hidden" cornerClassName="w-8/12" />
            <div
                id="form-left"
                className="w-[70%] relative hidden xl:flex items-end justify-center select-none"
            >
                <CornerWaveVector
                    rightCornerClassName="w-6/12"
                    leftCornerClassName="w-10/12"
                />
                <div className="w-full flex flex-col justify-center items-center gap-[6vw] md:gap-[4vw] xl:gap-[1.5vw] z-10 text-white">
                    <img className="w-[9vw]" src={logo} alt="Goals Academy" />
                    <div className="text-center mb-[8vh]">
                        <h2 className="text-white">Selamat Datang</h2>
                        <p className="tracking-wider xl:text-16 3xl:text-24">
                            di{" "}
                            <span className="font-semibold">
                                Platform Bimbingan Skripsi Pertama
                            </span>{" "}
                            di Indonesia
                        </p>
                    </div>
                    <img className="w-5/12" src={figure7} alt="Figure 7" />
                </div>
            </div>
            <div
                id="form-right"
                className="container mx-auto xl:w-[30%] h-fit xl:h-screen rounded-lg xl:rounded-none bg-white flex flex-col p-6 xl:p-16 py-20 xl:py-[10vh] relative"
            >
                <div className="grid gap-6 xl:gap-8 w-full">
                    <div className="z-10 w-full overflow-hidden grid grid-cols-2 border-1 xl:border-2 border-secondary font-poppins rounded-[1vw] md:rounded-[.5vw]">
                        <SwitchButton
                            switchForm={switchForm}
                            target={"login"}
                            active={active}
                        />
                        <SwitchButton
                            switchForm={switchForm}
                            target={"register"}
                            active={active}
                        />
                    </div>
                    <div
                        className={`${
                            active == "register" ? "grid" : "hidden"
                        } gap-3 xl:gap-4 z-10`}
                    >
                        <form
                            onSubmit={register}
                            className="w-full grid gap-[6vw] md:gap-[4vw] xl:gap-[1.5vw]"
                        >
                            <Input
                                value={registerData.username}
                                onChange={(e) =>
                                    setRegisterData("username", e.target.value)
                                }
                                type="text"
                                id="username"
                                label="Username"
                            />
                            <Input
                                value={registerData.email}
                                onChange={(e) =>
                                    setRegisterData("email", e.target.value)
                                }
                                type="email"
                                id="email"
                                label="Email"
                            />
                            <Input
                                value={registerData.password}
                                onChange={(e) =>
                                    setRegisterData("password", e.target.value)
                                }
                                type="password"
                                id="password"
                                label="Password"
                            />
                            <Input
                                value={registerData.confirmation_password}
                                onChange={(e) =>
                                    setRegisterData(
                                        "confirmation_password",
                                        e.target.value
                                    )
                                }
                                type="password"
                                id="confirmation_password"
                                label="Ulangi Password"
                            />
                            <div className="flex justify-center items-center gap-[2vw] md:gap-[1vw] xl:gap-[.5vw]">
                                <input type="checkbox" className="w-[5vw] md:w-[2vw] xl:w-[3vw]" checked={registerData.agreement} onChange={() => setRegisterData("agreement", !registerData.agreement)} />
                                <p className="text-[3vw] md:text-[1.8vw] xl:text-[.95vw]">Saya setuju dengan <a target="_blank" href="/syarat_dan_ketentuan" className="text-secondary font-medium">Syarat dan Ketentuan</a> yang berlaku di Goals Academy</p>
                            </div>
                            <SubmitButton
                                className="w-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw]"
                                disabled={Object.keys(registerData).map(i => registerData[i]).includes("") || !registerData.agreement || !(registerData.password == registerData.confirmation_password)}
                            >Daftar</SubmitButton>
                        </form>
                        <p className="text-center">atau</p>
                        <div className="w-full grid gap-[6vw] md:gap-[4vw] xl:gap-[1.5vw] text-dark">
                            <a
                                as="button"
                                className="w-full relative overflow-hidden border-1 xl:border-2 border-secondary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-google before:bg-no-repeat before:w-2/12 before:h-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw] p-[2vw] md:p-[1.5vw] xl:p-[.75vw]"
                                href="/auth/google"
                            >
                                Daftar dengan Google
                            </a>
                            <a
                                as="button"
                                className="w-full relative overflow-hidden border-1 xl:border-2 border-secondary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-facebook before:bg-no-repeat before:w-2/12 before:h-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw] p-[2vw] md:p-[1.5vw] xl:p-[.75vw]"
                                href="/auth/facebook"
                            >
                                Daftar dengan Facebook
                            </a>
                        </div>
                    </div>
                    <div
                        className={`${
                            active == "login" ? "grid" : "hidden"
                        } gap-3 xl:gap-4 z-10`}
                    >
                        <form
                            onSubmit={login}
                            className="w-full grid gap-[6vw] md:gap-[4vw] xl:gap-[1.5vw]"
                        >
                            <Input
                                value={loginData.email}
                                onChange={(e) =>
                                    setLoginData("email", e.target.value)
                                }
                                type="email"
                                id="login_email"
                                label="Email"
                            />
                            <div className="relative pb-2">
                                <Input
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setLoginData("password", e.target.value)
                                    }
                                    type="password"
                                    id="login_password"
                                    label="Password"
                                />
                                <Link href="/lupa_password" className="absolute text-[3vw] md:text-[1.75vw] xl:text-[.95vw] -bottom-[2.5vw] md:-bottom-[2vw] xl:-bottom-[1vw] right-0 text-blue-500">
                                    Lupa password?
                                </Link>
                            </div>
                            <SubmitButton
                                className="w-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw]"
                                disabled={Object.keys(loginData).map(i => loginData[i]).includes("")}
                            >Masuk</SubmitButton>
                        </form>
                        <p className="text-center">atau</p>
                        <div className="w-full grid gap-[6vw] md:gap-[4vw] xl:gap-[1.5vw] text-dark">
                            <a
                                as="button"
                                className="w-full relative overflow-hidden border-1 xl:border-2 border-secondary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-google before:bg-no-repeat before:w-2/12 before:h-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw] p-[2vw] md:p-[1.5vw] xl:p-[.75vw]"
                                href="/auth/google"
                            >
                                Masuk dengan Google
                            </a>
                            <a
                                as="button"
                                className="w-full relative overflow-hidden border-1 xl:border-2 border-secondary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-facebook before:bg-no-repeat before:w-2/12 before:h-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw] p-[2vw] md:p-[1.5vw] xl:p-[.75vw]"
                                href="/auth/facebook"
                            >
                                Masuk dengan Facebook
                            </a>
                        </div>
                    </div>
                    <div className="absolute w-full h-full top-0 left-0 z-0 select-none">
                        <div className="absolute w-12 xl:w-[3.6vw] h-4 xl:h-[1.2vw] bg-secondary rounded-[.2vw] top-6 left-6"></div>
                        <div className="absolute w-12 xl:w-[3.6vw] h-4 xl:h-[1.2vw] bg-secondary rounded-[.2vw] top-6 right-3"></div>
                        <div className="absolute w-12 xl:w-[3.6vw] h-4 xl:h-[1.2vw] bg-secondary rounded-[.2vw] bottom-6 left-6"></div>
                        <div className="absolute w-12 xl:w-[3.6vw] h-4 xl:h-[1.2vw] bg-secondary rounded-[.2vw] bottom-4 right-5"></div>
                        <img
                            className="absolute w-12 xl:w-[3.6vw] top-11 right-12 3xl:top-14"
                            src={rectangle}
                            alt="vector"
                        />
                        <img
                            className="absolute w-12 xl:w-[3.6vw] bottom-11 left-12 3xl:bottom-14"
                            src={rectangle}
                            alt="vector"
                        />
                        <img
                            className="absolute w-12 xl:w-[3.6vw] bottom-12 right-8 3xl:bottom-20"
                            src={rectangle}
                            alt="vector"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SwitchButton({ switchForm, target, active }) {
    return (
        <button
            onClick={() => switchForm(target)}
            className={`p-[2vw] md:p-[1.5vw] xl:p-[.75vw] font-medium ${
                active == target
                    ? "bg-secondary text-white"
                    : "bg-white text-secondary"
            }`}
        >
            {target == "login" ? "Masuk" : "Daftar"}
        </button>
    );
}

function Header({ title }) {
    const [mobileNavbar, setMobileNavbar] = useState(false);

    return (
        <header className="xl:hidden w-screen text-dark lg:text-base z-50">
            <div className="hidden xl:h-24 3xl:h-36"></div>{" "}
            {/* This is element to generate some tailwind css to make responsive header. Don't erase it */}
            <nav className="container flex flex-wrap justify-between items-center mx-auto h-20 xs:h-24 duration-500">
                <div className="w-6/12 md:w-5/12 lg:w-4/12 xl:w-auto">
                    <Link href="/">
                        <img
                            className="w-full 3xl:h-10 mb-1 xl:mb-2"
                            src={icon}
                            alt="Goals Academy"
                        />
                    </Link>
                </div>
                <div>
                    <button onClick={() => setMobileNavbar(true)}>
                        <i
                            className={`fa-solid fa-bars icon text-28 duration-300 text-white ${
                                mobileNavbar ? "opacity-0 rotate-180" : ""
                            }`}
                        ></i>
                    </button>
                </div>
                <NavbarMobile
                    title={title}
                    mobileNavbar={mobileNavbar}
                    setMobileNavbar={setMobileNavbar}
                />
            </nav>
        </header>
    );
}

function NavbarMobile({ title, mobileNavbar, setMobileNavbar }) {
    const [profileDropdownMobile, setProfileDropdownMobile] = useState(false);
    return (
        <>
            <div
                className={`xl:hidden w-full absolute z-50 top-0 bottom-0 right-0 bg-white font-bold text-white py-6 xs:py-8 duration-500 ${
                    mobileNavbar ? "" : "opacity-0 translate-x-[110%]"
                }`}
            >
                <div className="container mx-auto md:text-16 xl:text-14 3xl:text-20;">
                    <div className="flex justify-end mb-6 xs:mb-8">
                        <button onClick={() => setMobileNavbar(false)}>
                            <i
                                className={`fa-solid fa-xmark icon text-dark text-36`}
                            ></i>
                        </button>
                    </div>
                    <div className="grid gap-8">
                        <Link
                            href="/produk"
                            className={`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-secondary p-4 ${
                                title == "Produk" ? "font" : ""
                            }`}
                        >
                            Produk
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                        </Link>
                        <Link
                            href="/artikel"
                            className={`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-secondary p-4 ${
                                title == "Artikel" ? "font" : ""
                            }`}
                        >
                            Artikel
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                        </Link>
                        <Link
                            href="/diskusi"
                            className={`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-secondary p-4 ${
                                title == "Diskusi" ? "font" : ""
                            }`}
                        >
                            Diskusi
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                        </Link>
                        <Link
                            href="/karir"
                            className={`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-secondary p-4 ${
                                title == "Karir" ? "font" : ""
                            }`}
                        >
                            Karir
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"></i>
                        </Link>
                        <button
                            className={`w-full relative font-poppins flex flex-col justify-center`}
                        >
                            <span
                                className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-secondary p-4 w-full ${
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
                                className="shadow-none text-secondary w-full"
                            >
                                <TECollapseItem className="gap-8">
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
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`absolute z-30 top-0 left-0 h-screen w-screen bg-dark bg-opacity-50 xl:hidden ${
                    mobileNavbar ? "" : "hidden"
                }`}
                onClick={() => setMobileNavbar(false)}
            ></div>
        </>
    );
}
