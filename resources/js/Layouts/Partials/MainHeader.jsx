import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { TECollapse } from 'tw-elements-react';
import logo from '/resources/img/logo.svg';
import ButtonHoverSlide from '@/Components/ButtonHoverSlide';
import user from '/resources/img/user.png';

export default function MainHeader ({ title }) {
    const [authDropdown, setAuthDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const auth = 0;

    return (
        <header className="fixed w-screen top-0 right-0 bg-white text-dark lg:text-base z-50">
            <div className='hidden xl:h-24 3xl:h-36'></div>
            <nav className="container flex flex-wrap justify-between items-center mx-auto h-16 md:h-20 xl:h-32 3xl:h-48 duration-500">
                <div className="w-auto px-4">
                    <Link href="/">
                        <img className="h-6 md:h-5 xl:h-8 3xl:h-10 md:mb-2" src={logo} alt="Goals Academy" />
                    </Link>
                </div>
                <div className="hidden md:grid grid-cols-5 md:gap-6 xl:gap-9 3xl:gap-12 font-medium text-center">
                    <Link href="/produk" className={`font-poppins hover:text-primary flex justify-center ${title == 'Produk' ? 'font' : ''}`}>Produk</Link>
                    <Link href="/artikel" className={`font-poppins hover:text-primary flex justify-center ${title == 'Artikel' ? 'font' : ''}`}>Artikel</Link>
                    <Link href="/diskusi" className={`font-poppins hover:text-primary flex justify-center ${title == 'Diskusi' ? 'font' : ''}`}>Diskusi</Link>
                    <Link href="/karir" className={`font-poppins hover:text-primary flex justify-center ${title == 'Karir' ? 'font' : ''}`}>Karir</Link>
                    <button
                    className={`font-poppins flex justify-center ${title == 'Profil Perusahaan' || title == 'Profil Tutor' ? 'font' : ''}`}
                    onMouseEnter={() => setProfileDropdown(true)}
                    onMouseLeave={() => setProfileDropdown(false)}
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    >
                        <span className="hover:text-primary">Profil</span>
                        <TECollapse show={profileDropdown} className="absolute z-10 mt-4 shadow-none p-1">
                            <TECollapseItem>
                                <Link className="font-poppins hover:text-primary" href="/profil_perusahaan">Profil Perusahaan</Link>
                                <Link className="font-poppins hover:text-primary" href="/profil_tutor">Profil Tutor</Link>
                            </TECollapseItem>
                        </TECollapse>
                    </button>
                </div>
                { !auth ? (
                    <div className="w-auto hidden md:flex flex-wrap justify-end gap-2 3xl:gap-4 font-medium">
                        <Link href="/login">
                            <ButtonHoverSlide className="text-secondary before:-z-10 hover:text-white border-1 xl:border-2 border-secondary hover:border-primary md:rounded-lg xl:rounded-xl 3xl:rounded-2xl md:px-4 md:py-1 xl:px-6 xl:py-2 3xl:px-8 3xl:py-3 before:w-[200%] before:-ms-[200%] before:duration-300 hover:before:-ms-[50%] before:bg-sweep-primary">Login</ButtonHoverSlide>
                        </Link>
                        <Link href="/register" className="text-white border-1 xl:border-2 border-secondary bg-secondary hover:bg-primary hover:border-primary md:rounded-lg xl:rounded-xl 3xl:rounded-2xl md:px-4 md:py-1 xl:px-6 xl:py-2 3xl:px-8 3xl:py-3">
                            Daftar
                        </Link>
                    </div>
                ) : (
                    <div className="w-auto hidden md:flex flex-wrap justify-end items-center md:gap-3 xl:gap-4 3xl:gap-6 font-medium">
                        <Link href="/login"><i className="fa-solid fa-cart-shopping text-primary md:text-16 lg:text-20 xl:text-24 3xl:text-32"></i></Link>
                        <Link href="/login" className="relative">
                            <i className="fa-regular fa-bell text-primary md:text-16 lg:text-20 xl:text-24 3xl:text-32"></i>
                            <div className="absolute border-1 border-white rounded-full top-0 right-0 w-2 h-2 3xl:w-3 3xl:h-3 bg-red-500"></div>
                        </Link>
                        <button
                        className={`font-poppins flex justify-center ${title == 'Profil Perusahaan' || title == 'Profil Tutor' ? 'font' : ''}`}
                        onMouseEnter={() => setAuthDropdown(true)}
                        onMouseLeave={() => setAuthDropdown(false)}
                        onClick={() => setAuthDropdown(!authDropdown)}
                        >
                            <div className="overflow-hidden rounded-full md:h-4 lg:h-5 xl:h-7 3xl:h-9">
                                <img className="w-full h-full" src={user} alt="User Profile" />
                            </div>
                            <TECollapse show={authDropdown} className="absolute z-10 mt-4 shadow-none p-2">
                                <TECollapseItem>
                                    <Link className="flex gap-2 items-center font-poppins hover:text-primary" href="/profil_perusahaan">
                                        <i className="fa-regular fa-circle-user md:text-12 lg:text-20 3xl:text-24"></i>
                                        Profil
                                    </Link>
                                    <Link className="flex gap-2 items-center font-poppins hover:text-primary" href="/profil_tutor">
                                        <i className="bi bi-gear md:text-12 lg:text-20 3xl:text-24"></i>
                                        Pengaturan
                                    </Link>
                                </TECollapseItem>
                            </TECollapse>
                        </button>
                    </div>
                )}
                <div className="md:hidden">
                    <button><i className="fa-solid fa-bars text-24"></i></button>
                </div>
            </nav>
        </header>
    )
}

function TECollapseItem ({ children }) {
    return (
        <>
            <br />
            <div className="grid md:gap-2 lg:gap-3 xl:gap-4 3xl:gap-6 text-start md:py-3 md:px-4 lg:py-4 lg:px-6 3xl:py-6 3xl:px-8 bg-white shadow-centered rounded-xl">
                {children}
            </div>
        </>
    )
}
