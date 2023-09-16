import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { TECollapse } from 'tw-elements-react';
import logo from '/resources/img/logo.svg';
import ButtonHoverSlide from '@/Components/ButtonHoverSlide';

export default function MainHeader ({title}) {
    const [productDropdown, setProductDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);

    return (
        <header className="fixed w-screen top-0 right-0 bg-white lg:text-base z-50">
            <div className='hidden xl:h-24 3xl:h-36'></div>
            <nav className="container flex flex-wrap justify-between items-center mx-auto h-16 md:h-20 xl:h-32 3xl:h-48 duration-500">
                <div className="w-auto px-4">
                    <Link href="/">
                        <img className="h-6 md:h-5 xl:h-8 3xl:h-10 md:mb-2" src={logo} alt="Goals Academy" />
                    </Link>
                </div>
                <div className="hidden md:grid grid-cols-5 md:gap-6 xl:gap-9 3xl:gap-12 font-medium text-center">
                    <button
                    className={`font-poppins hover:text-primary flex justify-center ${title == 'Bimbingan' || title == 'E-Book' || title == 'Webinar' ? 'font' : ''}`}
                    onMouseEnter={() => setProductDropdown(true)}
                    onMouseLeave={() => setProductDropdown(false)}
                    onClick={() => setProductDropdown(!productDropdown)}
                    >
                        Produk
                        <TECollapse show={productDropdown} className="absolute z-10 mt-4 shadow-none p-1">
                            <br />
                            <div className="grid gap-4 text-start py-4 px-6 bg-white shadow-centered rounded-xl">
                                <Link className="font-poppins hover:text-primary" href="/bimbingan">Bimbingan</Link>
                                <Link className="font-poppins hover:text-primary" href="/ebook">E-Book</Link>
                                <Link className="font-poppins hover:text-primary" href="/webinar">Webinar</Link>
                            </div>
                        </TECollapse>
                    </button>
                    <Link href="/artikel" className={`font-poppins hover:text-primary flex justify-center ${title == 'Artikel' ? 'font' : ''}`}>Artikel</Link>
                    <Link href="/diskusi" className={`font-poppins hover:text-primary flex justify-center ${title == 'Diskusi' ? 'font' : ''}`}>Diskusi</Link>
                    <Link href="/karir" className={`font-poppins hover:text-primary flex justify-center ${title == 'Karir' ? 'font' : ''}`}>Karir</Link>
                    <button
                    className={`font-poppins hover:text-primary flex justify-center ${title == 'Profil Perusahaan' || title == 'Profil Tutor' ? 'font' : ''}`}
                    onMouseEnter={() => setProfileDropdown(true)}
                    onMouseLeave={() => setProfileDropdown(false)}
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    >
                        Profil
                        <TECollapse show={profileDropdown} className="absolute z-10 mt-4 shadow-none p-1">
                            <br />
                            <div className="grid gap-4 text-start py-4 px-6 bg-white shadow-centered rounded-xl">
                                <Link className="font-poppins hover:text-primary" href="/profil_perusahaan">Profil Perusahaan</Link>
                                <Link className="font-poppins hover:text-primary" href="/profil_tutor">Profil Tutor</Link>
                            </div>
                        </TECollapse>
                    </button>
                </div>
                <div className="w-auto hidden md:flex flex-wrap justify-end gap-2 3xl:gap-4 font-medium">
                    <Link href="/login">
                        <ButtonHoverSlide className="text-secondary before:-z-10 hover:text-white border-1 xl:border-2 border-secondary hover:border-primary md:rounded-lg xl:rounded-xl 3xl:rounded-2xl md:px-4 md:py-1 xl:px-6 xl:py-2 3xl:px-8 3xl:py-3 before:w-[200%] before:-ms-[200%] before:duration-300 hover:before:-ms-[50%] before:bg-sweep-primary">Login</ButtonHoverSlide>
                    </Link>
                    <Link href="/register" className="text-white border-1 xl:border-2 border-secondary bg-secondary hover:bg-primary hover:border-primary md:rounded-lg xl:rounded-xl 3xl:rounded-2xl md:px-4 md:py-1 xl:px-6 xl:py-2 3xl:px-8 3xl:py-3">
                        Daftar
                    </Link>
                </div>
                <div className="md:hidden">
                    <button><i className="fa-solid fa-bars text-24"></i></button>
                </div>
            </nav>
        </header>
    )
}
