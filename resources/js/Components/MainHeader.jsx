import { Link } from '@inertiajs/react';
import logo from '/resources/img/logo.svg';

export default function MainHeader () {
    return (
        <header className="fixed w-screen top-0 right-0 bg-white lg:text-base z-50">
            <nav className="container flex flex-wrap justify-between items-center mx-auto h-16 md:h-20 xl:h-32 3xl:h-48 duration-300">
                <div className='w-auto'>
                    <Link>
                        <img className='h-6 md:h-5 xl:h-8 3xl:h-10 md:mb-3' src={logo} alt="Goals Academy" />
                    </Link>
                </div>
                <div className='hidden md:grid grid-cols-5 md:gap-6 xl:gap-9 3xl:gap-12 font-medium text-center'>
                    <Link className='font-poppins'>Program</Link>
                    <Link className='font-poppins'>Artikel</Link>
                    <Link className='font-poppins'>Diskusi</Link>
                    <Link className='font-poppins'>Karir</Link>
                    <Link className='font-poppins'>Profil</Link>
                </div>
                <div className='w-auto hidden md:flex flex-wrap justify-end gap-2 3xl:gap-4 font-medium'>
                    <Link className='text-secondary before:duration-300 before:-z-10 hover:text-white hover:sweep-right border-2 border-secondary hover:border-primary md:rounded-xl xl:rounded-2xl 3xl:rounded-3xl md:px-4 md:py-1 xl:px-6 xl:py-2 3xl:px-8 3xl:py-3'>Login</Link>
                    <Link className='text-white border-2 border-secondary bg-secondary hover:bg-primary hover:border-primary md:rounded-xl xl:rounded-2xl 3xl:rounded-3xl md:px-4 md:py-1 xl:px-6 xl:py-2 3xl:px-8 3xl:py-3'>Daftar</Link>
                </div>
                <div className='md:hidden'>
                    <button><i className='fa-solid fa-bars text-24'></i></button>
                </div>
            </nav>
        </header>
    )
}
