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

export default function Form ({ title }) {
    const [active, setActive] = useState(title);

    return (
        <div
            id="form"
            className="relative xl:flex flex-wrap min-h-screen xl:h-screen bg-secondary text-[3vw] md:text-[2vw] xl:text-[1vw] pb-20 xs:pb-24 xl:p-0 overflow-hidden"
        >
            <Head title={active == "register" ? "Register" : "Login"} />
            <Header title={title} />
            <CornerWaveVector className="xl:hidden z-0" cornerClassName="w-8/12" />
            <FormLeft />
            <FormRight active={active} setActive={setActive} />
        </div>
    );
}

function FormLeft() {
    return (
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
    )
}

function FormRight({ active, setActive }) {
    const [loginMessage, setLoginMessage] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);

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
        errors: registerErrors,
        setError: setRegisterError
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

    const loginHandler = (e) => {
        e.preventDefault();
        setLoginLoading(true)
        fetch("/api/login-validation", {
            method: "post",
            headers: {
                accept: "application.json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then((response) => response.json())
            .then((response) => {
                if ("success" in response) {
                    loginSubmit(route("auth.login"))
                } else {
                    setLoginLoading(false)
                    setLoginMessage(response.message)
                }
            })
    };

    const registerHandler = (e) => {
        e.preventDefault();
        setRegisterLoading(true)
        fetch("/api/register-validation", {
            method: "post",
            headers: {
                accept: "application.json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        })
            .then((response) => response.json())
            .then((response) => {
                if ("success" in response) {
                    registerSubmit(route("auth.register"))
                } else {
                    setRegisterLoading(false)
                    Object.keys(response).forEach((item) => {
                        setRegisterError(item, response[item][0])
                    })
                }
            })
    };

    return (
        <div
            id="form-right"
            className="container mx-auto xl:w-[30%] h-fit xl:h-screen rounded-lg xl:rounded-none bg-white flex flex-col p-[5vw] md:p-[4vw] xl:p-[4vw] py-[12vw] md:py-[8vw] xl:py-[10vh] relative"
        >
            <div className="grid gap-[8vw] md:gap-[4vw] xl:gap-[2vw] w-full">
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
                <RegisterForm active={active} registerData={registerData} setRegisterData={setRegisterData} registerErrors={registerErrors} setRegisterError={setRegisterError} registerLoading={registerLoading} onSubmit={registerHandler} />
                <LoginForm active={active} loginData={loginData} setLoginData={setLoginData} loginMessage={loginMessage} loginLoading={loginLoading} onSubmit={loginHandler} />
                <div className="absolute w-full h-full top-0 left-0 z-0 select-none">
                    <div className="absolute w-12 xl:w-[3.6vw] h-4 xl:h-[1.2vw] bg-secondary rounded-[.2vw] top-[2.5vw] left-[2.5vw] md:top-[1.5vw] md:left-[1.5vw] xl:top-[1vw] xl:left-[1vw]"></div>
                    <div className="absolute w-12 xl:w-[3.6vw] h-4 xl:h-[1.2vw] bg-secondary rounded-[.2vw] top-[2.5vw] right-[2.5vw] md:top-[1.5vw] md:right-[1.2vw] xl:top-[1vw] xl:right-[.8vw]"></div>
                    <div className="absolute w-12 xl:w-[3.6vw] h-4 xl:h-[1.2vw] bg-secondary rounded-[.2vw] bottom-[2.5vw] left-[2.5vw] md:bottom-[1.5vw] md:left-[1.5vw] xl:bottom-[1vw] xl:left-[1vw]"></div>
                    <div className="absolute w-12 xl:w-[3.6vw] h-4 xl:h-[1.2vw] bg-secondary rounded-[.2vw] bottom-[2.5vw] right-[2.5vw] md:bottom-[1.5vw] md:right-[1.2vw] xl:bottom-[1vw] xl:right-[.8vw]"></div>
                    <img
                        className="absolute w-12 xl:w-[3.6vw] top-[6vw] right-[5.5vw] md:top-[3vw] md:right-[2.8vw] xl:top-[2.4vw] xl:right-[2.2vw]"
                        src={rectangle}
                        alt="vector"
                    />
                    <img
                        className="absolute w-12 xl:w-[3.6vw] bottom-[6vw] left-[5.5vw] md:bottom-[3vw] md:left-[2.8vw] xl:bottom-[2.4vw] xl:left-[2.2vw]"
                        src={rectangle}
                        alt="vector"
                    />
                    <img
                        className="absolute w-12 xl:w-[3.6vw] bottom-[6vw] right-[6vw] md:bottom-[3vw] md:right-[3vw] xl:bottom-[2.4vw] xl:right-[2.4vw]"
                        src={rectangle}
                        alt="vector"
                    />
                </div>
            </div>
        </div>
    )
}

function RegisterForm({ active, registerData, setRegisterData, registerErrors, setRegisterError, registerLoading, onSubmit }) {
    return (
        <div
            className={`${
                active == "register" ? "grid" : "hidden"
            } gap-3 xl:gap-4 z-10`}
        >
            <form
                onSubmit={onSubmit}
                className="w-full grid gap-[6vw] md:gap-[4vw] xl:gap-[1.5vw]"
            >
                <Input
                    value={registerData.username}
                    onChange={(e) => {
                        setRegisterData("username", e.target.value)
                        setRegisterError("username", "")
                    }}
                    type="text"
                    id="username"
                    label="Username"
                    error={registerErrors.username}
                />
                <Input
                    value={registerData.email}
                    onChange={(e) => {
                        setRegisterData("email", e.target.value)
                        setRegisterError("email", "")
                    }}
                    type="email"
                    id="email"
                    label="Email"
                    error={registerErrors.email}
                />
                <Input
                    value={registerData.password}
                    onChange={(e) => {
                        setRegisterData("password", e.target.value)
                        setRegisterError("password", "")
                    }}
                    type="password"
                    id="password"
                    label="Password"
                    error={registerErrors.password}
                />
                <Input
                    value={registerData.confirmation_password}
                    onChange={(e) => {
                        setRegisterData("confirmation_password", e.target.value)
                        setRegisterError("confirmation_password", "")
                    }}
                    type="password"
                    id="confirmation_password"
                    label="Ulangi Password"
                    error={registerErrors.confirmation_password}
                />
                <div className="flex justify-center items-center gap-[2vw] md:gap-[1vw] xl:gap-[.5vw]">
                    <input type="checkbox" className="w-[5vw] md:w-[2vw] xl:w-[3vw]" checked={registerData.agreement} onChange={() => setRegisterData("agreement", !registerData.agreement)} />
                    <p className="text-[3vw] md:text-[1.8vw] xl:text-[.95vw]">Saya setuju dengan <a target="_blank" href="/syarat_dan_ketentuan" className="text-secondary font-medium">Syarat dan Ketentuan</a> yang berlaku di Goals Academy</p>
                </div>
                <SubmitButton
                    className="w-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw]"
                    disabled={registerLoading || Object.keys(registerData).map(i => registerData[i]).includes("") || !registerData.agreement || !(registerData.password == registerData.confirmation_password)}
                    isLoading={registerLoading}
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
    )
}

function LoginForm({ active, loginData, setLoginData, loginMessage, loginLoading, onSubmit }) {
    return (
        <div
            className={`${
                active == "login" ? "grid" : "hidden"
            } gap-3 xl:gap-4 z-10`}
        >
            <form
                onSubmit={onSubmit}
                className="w-full grid gap-[6vw] md:gap-[4vw] xl:gap-[1.5vw]"
            >
                {
                    loginMessage != "" ? (
                        <div className={`${loginMessage != "" ? "" : "hidden"} w-full flex justify-between items-center border-1 xl:border-2 font-poppins rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw] pt-2 pb-1 px-3 md:pt-[1.75vw] md:pb-[1vw] md:px-[2vw] xl:pt-[.75vw] xl:pb-[.5vw] xl:px-[1vw] bg-red-500 border-red-500 text-white`}>
                            Email atau password Anda salah
                            <i onClick={() => setLoginMessage("")} className="fa-solid fa-times cursor-pointer"></i>
                        </div>
                    ) : (<></>)
                }
                <Input
                    value={loginData.email}
                    onChange={(e) =>
                        setLoginData("email", e.target.value)
                    }
                    type="email"
                    id="login_email"
                    label="Email"
                />
                <div className="relative pb-[1.5vw]">
                    <Input
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData("password", e.target.value)
                        }
                        type="password"
                        id="login_password"
                        label="Password"
                    />
                    <Link href="/lupa_password" className="absolute text-[3vw] md:text-[1.75vw] xl:text-[.95vw] xl:mt-[.5vw] right-0 text-blue-500">
                        Lupa password?
                    </Link>
                </div>
                <SubmitButton
                    className="w-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw]"
                    disabled={Object.keys(loginData).map(i => loginData[i]).includes("") || loginLoading}
                    isLoading={loginLoading}
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
    )
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
        <header className="xl:hidden w-screen text-dark lg:text-base relative z-50">
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
                className={`xl:hidden w-full absolute h-screen z-50 top-0 bottom-0 right-0 bg-white font-bold text-white py-6 xs:py-8 duration-500 ${
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
                    <div className="grid gap-[8vw] md:gap-[4vw]">
                        <Link
                            href="/produk"
                            className={`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-secondary p-4 ${
                                title == "Produk" ? "font" : ""
                            }`}
                        >
                            Produk
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw] md:text-[4vw]"></i>
                        </Link>
                        <Link
                            href="/artikel"
                            className={`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-secondary p-4 ${
                                title == "Artikel" ? "font" : ""
                            }`}
                        >
                            Artikel
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw] md:text-[4vw]"></i>
                        </Link>
                        <Link
                            href="/diskusi"
                            className={`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-secondary p-4 ${
                                title == "Diskusi" ? "font" : ""
                            }`}
                        >
                            Diskusi
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw] md:text-[4vw]"></i>
                        </Link>
                        <Link
                            href="/karir"
                            className={`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-secondary p-4 ${
                                title == "Karir" ? "font" : ""
                            }`}
                        >
                            Karir
                            <CornerWaveVector cornerClassName="w-4/12" />
                            <i className="fa-solid fa-arrow-up rotate-45 text-[6vw] md:text-[4vw]"></i>
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
                                    className={`fa-solid fa-chevron-down text-[6vw] md:text-[4vw] duration-300 ${
                                        profileDropdownMobile
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                ></i>
                            </span>
                            <TECollapse
                                show={profileDropdownMobile}
                                className="shadow-none text-secondary w-[104%] -translate-x-[2%] px-[2%] pb-[2%]"
                            >
                                <TECollapseItem className="gap-[8vw] md:gap-[4vw]">
                                    <Link
                                        href="/profil_perusahaan"
                                        className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-skin p-4 overflow-hidden ${
                                            title == "Produk" ? "font" : ""
                                        }`}
                                    >
                                        Profil Perusahaan
                                        <CornerWaveVector2 cornerClassName="w-4/12" />
                                        <i className="fa-solid fa-arrow-up rotate-45 text-[6vw] md:text-[4vw]"></i>
                                    </Link>
                                    <Link
                                        href="/profil_tutor"
                                        className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-skin p-4 overflow-hidden ${
                                            title == "Produk" ? "font" : ""
                                        }`}
                                    >
                                        Profil Tutor
                                        <CornerWaveVector2 cornerClassName="w-4/12" />
                                        <i className="fa-solid fa-arrow-up rotate-45 text-[6vw] md:text-[4vw]"></i>
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
