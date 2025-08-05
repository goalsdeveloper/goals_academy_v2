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
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";
import GoalsButton from "@/Components/GoalsButton";

export default function Form ({ title }) {
    const [activeForm, setActiveForm] = useState(title);
    const [showSyaratDanKetentuan, setShowSyaratDanKetentuan] = useState(false);

    return (
        <>
            <div
                id="form"
                className="relative xl:flex flex-wrap min-h-screen xl:h-screen bg-secondary text-[3vw] md:text-[2vw] xl:text-[1vw] pb-20 xs:pb-24 xl:p-0 overflow-hidden"
            >
                <Head title={activeForm == "register" ? "Register" : "Login"} />
                <Header title={title} />
                <CornerWaveVector className="xl:hidden z-0" cornerClassName="w-8/12" />
                <FormLeft />
                <FormRight {...{activeForm, setActiveForm, showSyaratDanKetentuan, setShowSyaratDanKetentuan}} />
            </div>
            <SyaratDanKetentuan show={showSyaratDanKetentuan} setShow={setShowSyaratDanKetentuan} />
        </>
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

function FormRight({ activeForm, setActiveForm, showSyaratDanKetentuan, setShowSyaratDanKetentuan }) {
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
            setActiveForm("login");
            history.replaceState({}, "", "/login");
        } else {
            setActiveForm("register");
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
            className="container mx-auto xl:w-[30%] h-fit xl:h-screen rounded-lg xl:rounded-none bg-white p-[8vw] md:p-[4vw] xl:p-[4vw] py-[16vw] md:py-[8vw] xl:py-[10vh] relative"
        >
            <div className="grid gap-[8vw] md:gap-[4vw] xl:gap-[2vw] w-full flex-col">
                <div className="z-10 w-full overflow-hidden grid grid-cols-2 border-1 xl:border-2 border-secondary font-poppins rounded-[1vw] md:rounded-[.5vw]">
                    <SwitchButton
                        switchForm={switchForm}
                        target={"login"}
                        active={activeForm}
                    />
                    <SwitchButton
                        switchForm={switchForm}
                        target={"register"}
                        active={activeForm}
                    />
                </div>
                <RegisterForm active={activeForm} {...{registerData, setRegisterData, registerErrors, setRegisterError, registerLoading, showSyaratDanKetentuan, setShowSyaratDanKetentuan}} onSubmit={registerHandler} />
                <LoginForm active={activeForm} {...{loginData, setLoginData, loginMessage, setLoginMessage, loginLoading}} onSubmit={loginHandler} />
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

function RegisterForm({ active, registerData, setRegisterData, registerErrors, setRegisterError, registerLoading, onSubmit, showSyaratDanKetentuan, setShowSyaratDanKetentuan }) {
    const [showPassword, setShowPassword] = useState({
        'password': false,
        'confirmation_password': false
    })

    return (
        <div
            className={`${
                active == "register" ? "grid" : "hidden"
            } gap-3 xl:gap-4 z-10 md:max-h-[65vh] md:overflow-auto scrollbar-hidden pt-[2vw] md:pt-[.5vw]`}
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
                <div className="relative">
                    <Input
                        value={registerData.password}
                        onChange={(e) => {
                            setRegisterData("password", e.target.value)
                            setRegisterError("password", "")
                        }}
                        type={showPassword.password ? "text" : "password"}
                        id="password"
                        label="Password"
                        error={registerErrors.password}
                    />
                    <div className="absolute top-0 right-0 h-full w-1/12 flex items-center cursor-pointer" onClick={() => setShowPassword({...showPassword, password: !showPassword.password})}>
                        {showPassword.password ? <FiEye className="text-gray-400" /> : <FiEyeOff className="text-gray-400" />}
                    </div>
                </div>
                <div className="relative">
                    <Input
                        value={registerData.confirmation_password}
                        onChange={(e) => {
                            setRegisterData("confirmation_password", e.target.value)
                            setRegisterError("confirmation_password", "")
                        }}
                        type={showPassword.confirmation_password ? "text" : "password"}
                        id="confirmation_password"
                        label="Ulangi Password"
                        error={registerErrors.confirmation_password}
                    />
                    <div className="absolute top-0 right-0 h-full w-1/12 flex items-center cursor-pointer" onClick={() => setShowPassword({...showPassword, confirmation_password: !showPassword.confirmation_password})}>
                        {showPassword.confirmation_password ? <FiEye className="text-gray-400" /> : <FiEyeOff className="text-gray-400" />}
                    </div>
                </div>
                <div className="flex justify-center items-center gap-[2vw] md:gap-[1vw] xl:gap-[.5vw] md:px-[1vw]">
                    <input type="checkbox" className="w-[5vw] h-[5vw] md:w-[1vw] md:h-[1vw]" checked={registerData.agreement} onChange={() => setRegisterData("agreement", !registerData.agreement)} />
                    <p className="text-[3vw] md:text-[1.8vw] xl:text-[.95vw]">Saya setuju dengan <a role="button" onClick={() => {setShowSyaratDanKetentuan(true)}} className="text-secondary font-medium">Syarat dan Ketentuan</a> yang berlaku di Goals Academy</p>
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
                {/* <a
                    as="button"
                    className="w-full relative overflow-hidden border-1 xl:border-2 border-secondary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-facebook before:bg-no-repeat before:w-2/12 before:h-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw] p-[2vw] md:p-[1.5vw] xl:p-[.75vw]"
                    href="/auth/facebook"
                >
                    Daftar dengan Facebook
                </a> */}
            </div>
        </div>
    )
}

function LoginForm({ active, loginData, setLoginData, loginMessage, setLoginMessage, loginLoading, onSubmit }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div
            className={`${
                active == "login" ? "grid" : "hidden"
            } gap-3 xl:gap-4 z-10 md:max-h-[65vh] md:overflow-auto scrollbar-hidden pt-[2vw] md:pt-[.5vw]`}
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
                    <div className="relative">
                        <Input
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData("password", e.target.value)
                            }
                            type={showPassword ? "text" : "password"}
                            id="login_password"
                            label="Password"
                        />
                        <div className="absolute top-0 right-0 h-full w-1/12 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FiEye className="text-gray-400" /> : <FiEyeOff className="text-gray-400" />}
                        </div>
                    </div>
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
                {/* <a
                    as="button"
                    className="w-full relative overflow-hidden border-1 xl:border-2 border-secondary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-facebook before:bg-no-repeat before:w-2/12 before:h-full rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw] p-[2vw] md:p-[1.5vw] xl:p-[.75vw]"
                    href="/auth/facebook"
                >
                    Masuk dengan Facebook
                </a> */}
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
                                        href="/profil-perusahaan"
                                        className={`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-skin p-4 overflow-hidden ${
                                            title == "Produk" ? "font" : ""
                                        }`}
                                    >
                                        Profil Perusahaan
                                        <CornerWaveVector2 cornerClassName="w-4/12" />
                                        <i className="fa-solid fa-arrow-up rotate-45 text-[6vw] md:text-[4vw]"></i>
                                    </Link>
                                    <Link
                                        href="/profil-tutor"
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

function SyaratDanKetentuan({ show, setShow }) {
    return (
        <div
            className={`${
                show ? "" : "hidden"
            } z-50 fixed w-full h-full top-0 overflow-auto bg-dark focus:bg-red-400 bg-opacity-50 transition-all duration-300`}
            onClick={() => {
                setShow(false);
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } inset-0 focus:bg-red-400 mx-auto flex gap-[2vw] w-[90vw] md:h-fit rounded-[4vw] md:rounded-[1vw] transition-all duration-500 bg-white shadow-md p-[8vw] md:p-[4vw] z-50 my-[4vh] md:my-[8vh]`}
            >
                <div className="flex flex-col text-[3.3vw] md:text-[1.5vw] xl:text-[1vw] gap-[6vw] md:gap-[2vw]">
                    <h1 className="font-sans font-bold text-center text-[4.4vw] md:text-[2.5vw] leading-[4.2vw] md:leading-tight">Syarat & Ketentuan Layanan<br /><span className="text-secondary">Goals Academy</span></h1>
                    <p>
                        Kami berterima kasih atas kepercayaan Anda terhadap fitur Layanan Goals Academy. Mohon luangkan waktu Anda untuk membaca keseluruhan Syarat dan Ketentuan Layanan Goals Academy ini.
                    </p>
                    <p>
                        Syarat dan Ketentuan Layanan Goals Academy ini merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Syarat dan Ketentuan Website Goals Academy dan Kebijakan Privasi. Syarat dan Ketentuan Layanan Goals Academy ini merupakan perjanjian kerja sama antara Anda sebagai pihak ketiga penyedia layanan dan PT. Sarana Edukasi Nusantara, yang mengatur Anda saat mengakses dan menggunakan situs web (www.goalsacademy.id dan situs web lain yang Kami kelola), fitur, teknologi, konten, dan produk yang Kami sediakan serta pemesanan, pembayaran atau penggunaan layanan yang tersedia pada Website. Dengan menggunakan Layanan Goals Academy, Anda akan dianggap telah membaca, memahami dan menyetujui Syarat dan Ketentuan Layanan Goals Academy ini. Oleh karenanya, jika Anda tidak menyetujui bagian apapun dari Syarat dan Ketentuan Layanan Goals Academy ini, mohon agar tidak melanjutkan penggunaan Layanan Goals Academy.
                    </p>
                    <ol className="list-[decimal] ms-[3.3vw] md:ms-[1.3vw] flex flex-col gap-[5vw] md:gap-[1.5vw]">
                        <li>
                            <span className="font-medium">Dibimbing Sekali</span>
                            <ol className="list-[lower-alpha] ms-[3.6vw] md:ms-[1.4vw]">
                                <li>
                                    Anda mengakui, menyatakan, dan menjamin secara berkelanjutan selama jangka waktu Syarat dan Ketentuan Layanan Goals Academy ini bahwa:
                                    <ul className="list-[disc] ms-[4vw] md:ms-[1.5vw]">
                                    <li>
                                        Anda memiliki kewenangan penuh untuk menyetujui Syarat dan Ketentuan Layanan Dibimbing Sekali by Goals Academy ini dan melaksanakan kewajiban-kewajiban Anda berdasarkan Syarat dan Ketentuan Layanan Dibimbing Sekali ini;
                                    </li>
                                    <li>
                                        Anda berusia setidaknya 18 (delapan belas) tahun atau usia yang diizinkan untuk memberikan Layanan Goals Academy berdasarkan hukum yang berlaku;
                                    </li>
                                    <li>
                                        Anda akan selalu mematuhi semua hukum yang berlaku, dan dengan segera akan memberitahukan Kami jika Anda melanggar hukum yang berlaku;
                                    </li>
                                    <li>
                                        Anda hanya akan menggunakan Layanan Goals Academy ia untuk tujuan yang sah menurut hukum yang berlaku dan hanya untuk tujuan yang wajar dan sebagaimana mestinya Website Goals Academy dan Layanan yang lain;
                                    </li>
                                    <li>
                                        Anda tidak memiliki catatan kriminal di wilayah atau yuridiksi lain mana pun;
                                    </li>
                                    <li>
                                        Anda tidak akan mengungkapkan kepada siapapun informasi rahasia apapun, termasuk Data Pribadi (termasuk Data Pribadi milik Pengguna yang Anda peroleh dalam pelaksanaan Layanan Goals Academy), informasi mengenai bisnis, urusan, pelanggan, klien, atau pemasok Ruangguru dan/atau afiliasinya; dan
                                    </li>
                                    <li>
                                        Anda tidak boleh terlibat dalam kegiatan penipuan, menyesatkan, atau tipu daya.
                                    </li>
                                    </ul>
                                </li>
                                <li>
                                    Penyediaan Layanan Goals Academy yang dilakukan oleh Anda kepada Pengguna membentuk suatu hubungan langsung antara Anda dengan Pengguna, dimana Goals Academy bukan merupakan pihak dalam hubungan tersebut. Ruangguru tidak bertanggung jawab untuk setiap tindakan, baik akibat kelalaian maupun kesengajaan Pengguna terhadap Anda. Selama diatur oleh hukum yang berlaku, Anda bertanggung jawab untuk setiap kewajiban dan tanggung jawab kepada Pengguna, dan/atau pihak ketiga lain yang muncul atas penyediaan Layanan Goals Academy.
                                </li>
                                <li>
                                    Walaupun Anda bertanggung jawab sendiri atas penyediaan Layanan Goals Academy, Goals Academy memiliki hak untuk menangani setiap keluhan yang diberikan oleh Pengguna melalui proses penanganan keluhan Goals Academy, atau setiap keluhan yang Anda miliki terhadap Pengguna. Anda memahami dan setuju untuk bekerja sama dengan Kami atas proses penanganan keluhan tersebut, dan untuk mengajukan keluhan yang mungkin Anda miliki melalui Website Goals Academy. Goals Academy juga mencadangkan hak nya, atas diskresinya sendiri, untuk meneruskan setiap keluhan kepada Anda secara langsung dan dapat memilih untuk memfasilitasi diskusi dengan Pengguna untuk penyelesaian masalah. Anda memahami dan setuju untuk tunduk dan patuh terhadap hukum yang berlaku dan ketentuan-ketentuan dalam Syarat dan Ketentuan Layanan Goals Academy ini pada saat penanganan keluhan dari Pengguna. Proses penanganan keluhan Goals Academy tidak akan mengesampingkan setiap hak atau pemulihan yang tidak bisa dikesampingkan atau dibatasi berdasarkan hukum yang berlaku.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <span className="font-medium">Dibimbing Tuntas</span>
                            <ol className="list-[lower-alpha] ms-[3.6vw] md:ms-[1.4vw]">
                                <li>
                                    Anda mengakui, menyatakan, dan menjamin secara berkelanjutan selama jangka waktu Syarat dan Ketentuan Layanan Goals Academy ini bahwa:
                                    <ul className="list-[disc] ms-[4vw] md:ms-[1.5vw]">
                                        <li>
                                            Anda memiliki kewenanan penuh untuk menyetujui Syarat dan Ketentuan Layanan Dibimbing Tuntas by Goals Academy ini dan melaksanakan kewajiban-kewajiban Anda berdasarkan Syarat dan Ketentuan Layanan Dibimbing Sekali ini;
                                        </li>
                                        <li>
                                            Anda berusia setidaknya 18 (delapan belas) tahun atau usia yang diizinkan untuk memberikan Layanan Goals Academy berdasarkan hukum yang berlaku;
                                        </li>
                                        <li>
                                            Anda akan selalu mematuhi semua hukum yang berlaku, dan dengan segera akan memberitahukan Kami jika Anda melanggar hukum yang berlaku;
                                        </li>
                                        <li>
                                            Anda hanya akan menggunakan Layanan Goals Academy ia untuk tujuan yang sah menurut hukum yang berlaku dan hanya untuk tujuan yang wajar dan sebagaimana mestinya Website Goals Academy dan Layanan yang lain;
                                        </li>
                                        <li>
                                            Anda tidak memiliki catatan kriminal di wilayah atau yuridiksi lain mana pun;
                                        </li>
                                        <li>
                                            Anda tidak akan mengungkapkan kepada siapapun informasi rahasia apapun, termasuk Data Pribadi (termasuk Data Pribadi milik Pengguna yang Anda peroleh dalam pelaksanaan Layanan Goals Academy), informasi mengenai bisnis, urusan, pelanggan, klien, atau pemasok Ruangguru dan/atau afiliasinya; dan
                                        </li>
                                        <li>
                                            Anda tidak boleh terlibat dalam kegiatan penipuan, menyesatkan, atau tipu daya.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Penyediaan Layanan Goals Academy yang dilakukan oleh Anda kepada Pengguna membentuk suatu hubungan langsung antara Anda dengan Pengguna, dimana Goals Academy bukan merupakan pihak dalam hubungan tersebut. Ruangguru tidak bertanggung jawab untuk setiap tindakan, baik akibat kelalaian maupun kesengajaan Pengguna terhadap Anda. Selama diatur oleh hukum yang berlaku, Anda bertanggung jawab untuk setiap kewajiban dan tanggung jawab kepada Pengguna, dan/atau pihak ketiga lain yang muncul atas penyediaan Layanan Goals Academy.
                                </li>
                                <li>
                                    Walaupun Anda bertanggung jawab sendiri atas penyediaan Layanan Goals Academy, Goals Academy memiliki hak untuk menangani setiap keluhan yang diberikan oleh Pengguna melalui proses penanganan keluhan Goals Academy, atau setiap keluhan yang Anda miliki terhadap Pengguna. Anda memahami dan setuju untuk bekerja sama dengan Kami atas proses penanganan keluhan tersebut, dan untuk mengajukan keluhan yang mungkin Anda miliki melalui Website Goals Academy. Goals Academy juga mencadangkan hak nya, atas diskresinya sendiri, untuk meneruskan setiap keluhan kepada Anda secara langsung dan dapat memilih untuk memfasilitasi diskusi dengan Pengguna untuk penyelesaian masalah. Anda memahami dan setuju untuk tunduk dan patuh terhadap hukum yang berlaku dan ketentuan-ketentuan dalam Syarat dan Ketentuan Layanan Goals Academy ini pada saat penanganan keluhan dari Pengguna. Proses penanganan keluhan Goals Academy tidak akan mengesampingkan setiap hak atau pemulihan yang tidak bisa dikesampingkan atau dibatasi berdasarkan hukum yang berlaku.
                                </li>
                            </ol>
                        </li>
                    </ol>
                    <p>Last updated: October, 2023</p>
                    <div>
                        <GoalsButton className="w-2/12 rounded-[.5vw] float-end" onClick={() => setShow(false)}>Close</GoalsButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
