import "/resources/css/main.css";
import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import CornerWaveVector from "@/Components/CornerWaveVector";
import logo from "/resources/img/icon/goals-3.svg";
import figure7 from "/resources/img/figure/7.svg";
import rectangle from "/resources/img/vector/rectangle-1.svg";

export default function Form ({ title }) {
    const [active, setActive] = useState(title)
    const {data: loginData, setData: setLoginData, post: loginSubmit} = useForm({
        email: '',
        password: ''
    })
    const {data: registerData, setData: setRegisterData, post: registerSubmit} = useForm({
        username: '',
        email: '',
        password: '',
        confirmation_password: ''
    })

    const switchForm = (request) => {
        if (request == 'login') {
            setActive('login')
            history.replaceState({},'','/login')
        } else {
            setActive('register')
            history.replaceState({},'','/register')
        }
    }

    const login = (e) => {
        e.preventDefault()
        alert(loginData.email)
    }

    const register = (e) => {
        e.preventDefault()
        alert(registerData.email)
    }

    return (
        <div className="relative flex flex-wrap md:h-screen bg-secondary py-16 md:p-0">
            <Head title={active == 'register' ? 'Register' : 'Login'} />
            <CornerWaveVector
                className="md:hidden"
                cornerClassName="w-10/12"
            />
            <div className="w-8/12 relative hidden md:flex items-end justify-center select-none">
                <CornerWaveVector
                    rightCornerClassName="w-10/12"
                    leftCornerClassName="w-6/12"
                />
                <div className="w-full flex flex-col justify-center items-center gap-4 3xl:gap-6 z-10 text-white">
                    <img className="w-2/12" src={logo} alt="Goals Academy" />
                    <div className="text-center mb-[8vh]">
                        <h2 className="text-white">Selamat Datang</h2>
                        <p className="tracking-wider xl:text-16 3xl:text-24">di <span className="font-semibold">Platform Bimbingan Skripsi Pertama</span> di Indonesia</p>
                    </div>
                    <img className="w-5/12" src={figure7} alt="Figure 7" />
                </div>
            </div>
            <div className="container mx-auto md:w-4/12 rounded-lg md:rounded-none bg-white flex flex-col items-center p-16 pt-[12vh] relative">
                <div className="grid gap-8 w-full">
                    <div className="z-10 w-full overflow-hidden grid grid-cols-2 border-2 border-primary font-poppins xl:rounded-lg 3xl:rounded-xl">
                        <SwitchButton switchForm={switchForm} target={'login'} active={active} />
                        <SwitchButton switchForm={switchForm} target={'register'} active={active} />
                    </div>
                    <div className={`${active == 'register' ? 'grid' : 'hidden'} gap-4 z-10`}>
                        <form onSubmit={register} className="w-full grid gap-6 3xl:gap-8">
                            <Input
                                value={registerData.username}
                                onChange={e => setRegisterData('username', e.target.value)}
                                type="text"
                                id="username"
                                label="Username"
                            />
                            <Input
                                value={registerData.email}
                                onChange={e => setRegisterData('email', e.target.value)}
                                type="email"
                                id="email"
                                label="Email"
                            />
                            <Input
                                value={registerData.password}
                                onChange={e => setRegisterData('password', e.target.value)}
                                type="password"
                                id="password"
                                label="Password"
                            />
                            <Input
                                value={registerData.confirmation_password}
                                onChange={e => setRegisterData('confirmation_password', e.target.value)}
                                type="password"
                                id="confirmation_password"
                                label="Ulangi Password"
                            />
                            <SubmitButton>Daftar</SubmitButton>
                        </form>
                        <p className="text-center">atau</p>
                        <div className="w-full grid gap-4 3xl:gap-6 text-dark">
                            <Link className="w-full relative overflow-hidden border-2 border-primary hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-google before:bg-no-repeat before:w-2/12 before:h-full xl:rounded-lg 3xl:rounded-xl p-2 3xl:p-4">Daftar dengan Google</Link>
                            <Link className="w-full relative overflow-hidden border-2 border-primary hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-facebook before:bg-no-repeat before:w-2/12 before:h-full xl:rounded-lg 3xl:rounded-xl p-2 3xl:p-4">Daftar dengan Facebook</Link>
                        </div>
                    </div>
                    <div className={`${active == 'login' ? 'grid' : 'hidden'} gap-4 z-10`}>
                        <form onSubmit={login} className="w-full grid gap-6 3xl:gap-8">
                            <Input
                                value={loginData.email}
                                onChange={e => setLoginData('email', e.target.value)}
                                type="email"
                                id="login_email"
                                label="Email"
                            />
                            <div className="relative pb-2">
                                <Input
                                    value={loginData.password}
                                    onChange={e => setLoginData('password', e.target.value)}
                                    type="password"
                                    id="login_password"
                                    label="Password"
                                />
                                <Link className="absolute -bottom-4 right-0 text-blue-500 text-12 3xl:text-16">Lupa password?</Link>
                            </div>
                            <SubmitButton>Masuk</SubmitButton>
                        </form>
                        <p className="text-center">atau</p>
                        <div className="w-full grid gap-4 3xl:gap-6 text-dark">
                            <Link className="w-full relative overflow-hidden border-2 border-primary hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-google before:bg-no-repeat before:w-2/12 before:h-full xl:rounded-lg 3xl:rounded-xl p-2 3xl:p-4">Masuk dengan Google</Link>
                            <Link className="w-full relative overflow-hidden border-2 border-primary hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-facebook before:bg-no-repeat before:w-2/12 before:h-full xl:rounded-lg 3xl:rounded-xl p-2 3xl:p-4">Masuk dengan Facebook</Link>
                        </div>
                    </div>
                    <div className="absolute w-full h-full top-0 left-0 z-0 select-none">
                        <div className="absolute w-16 h-5 3xl:w-24 3xl:h-8 bg-secondary rounded-sm 3xl:rounded-lg top-6 left-6"></div>
                        <div className="absolute w-16 h-5 3xl:w-24 3xl:h-8 bg-secondary rounded-sm 3xl:rounded-lg top-6 right-3"></div>
                        <div className="absolute w-16 h-5 3xl:w-24 3xl:h-8 bg-secondary rounded-sm 3xl:rounded-lg bottom-6 left-6"></div>
                        <div className="absolute w-16 h-5 3xl:w-24 3xl:h-8 bg-secondary rounded-sm 3xl:rounded-lg bottom-4 right-5"></div>
                        <img className="absolute 3xl:w-24 top-11 right-12 3xl:top-14" src={rectangle} alt="vector" />
                        <img className="absolute 3xl:w-24 bottom-11 left-12 3xl:bottom-14" src={rectangle} alt="vector" />
                        <img className="absolute 3xl:w-24 bottom-12 right-8 3xl:bottom-20" src={rectangle} alt="vector" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function SwitchButton ({ switchForm, target, active }) {
    return (
        <button onClick={() => switchForm(target)} className={`p-2 3xl:p-4 font-medium ${active == target ? 'bg-primary text-white' : 'bg-white text-primary'}`}>{target == 'login' ? 'Masuk' : 'Daftar'}</button>
    )
}

function Input ({ type, id, label, value, onChange }) {
    return (
        <div className="relative flex">
            <input value={value} onChange={onChange} id={id} type={type} className="w-full border-2 border-primary placeholder-shown:border-light-grey font-poppins xl:rounded-lg 3xl:rounded-xl p-3 px-6 3xl:p-6 3xl:px-8 focus:outline-none focus:border-primary peer" placeholder=" " />
            <label htmlFor={id} className="absolute px-2 3xl:px-4 bg-white text-primary peer-focus:text-primary peer-placeholder-shown:text-light-grey ms-4 -mt-2">{label}</label>
        </div>
    )
}

function SubmitButton ({ children }) {
    return (
        <button type="submit" className="w-4/12 mx-auto border-2 border-primary text-primary hover:text-white hover:bg-primary font-poppins font-medium xl:rounded-lg 3xl:rounded-xl p-3">{children}</button>
    )
}
