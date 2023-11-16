import "/resources/css/main.css";
import { Head } from "@inertiajs/react";
import DashboardNavbarItem from "@/Components/DashboardNavbarItem";
import MainHeader from "./Partials/MainHeader";
import wave7 from "/resources/img/vector/wave-7.svg";
import userIcon from "/resources/img/icon/user.png";
import "@/script/mainHeader";

export default function UserLayout ({ auth, title, children }) {
    return (
        <>
            <Head title={title} />
            <MainHeader auth={auth} title="Dashboard" />
            <main className="text-dark pt-20 xs:pt-20 md:pt-20 xl:pt-32 3xl:pt-48 pb-[8vw] md:pb-[3vw] text-[3vw] md:text-[1.15vw] overflow-visible">
                <Preliminary auth={auth} title={title} />
                <DashboardContent auth={auth} title={title}>
                    {children}
                </DashboardContent>
            </main>
        </>
    )
}

function Preliminary ({ auth, title }) {
    return (
        <div className={`md:hidden container mx-auto shadow-centered-spread rounded-[1vw] overflow-hidden mt-[3vw] mb-[6vw] md:mb-[3vw] ${title == 'Pengaturan' ? '' : 'hidden'}`}>
            <div className="relative">
                <div className="flex flex-col md:flex-row text-center md:text-left items-center gap-[3vw] md:gap-[1.5vw] p-[6vw] pb-[12vw] md:p-[3vw]">
                    <img className="w-[22vw] h-[22vw] md:w-[6vw] md:h-[6vw]" src={userIcon} alt="User" />
                    <div>
                        <h2 className="font-sans font-medium text-[4vw] md:text-[2.25vw] mb-[.5vw]">Selamat Datang <span className="text-secondary">{auth.user.name}</span></h2>
                        <p>Hello {auth.user.name}! Selamat datang di website Goals Academy!</p>
                    </div>
                <img src={wave7} className="absolute w-full left-0 right-0 bottom-0 select-none" />
                </div>
            </div>
        </div>
    )
}

function DashboardContent ({ auth, title, children }) {
    return (
        <div className="container mx-auto flex gap-[3vw] md:mt-[3vw]">
            <DashboardNavbar auth={auth} className={`sticky top-24 xs:top-28 md:top-24 xl:top-28 3xl:top-40 z-10 w-full md:w-3/12 h-fit ${title == 'Pengaturan' ? '' : 'hidden md:flex'}`} title={title} />
            <div className={`w-full md:w-9/12 h-fit md:p-[2.5vw] md:shadow-centered-spread md:rounded-md ${title == 'Pengaturan' ? 'hidden md:block' : ''}`}>
                <div className="text-center mb-[6vw] md:mb-[2vw]">
                    <h1 className="md:font-medium text-secondary text-[4vw] md:text-[2vw] leading-[12vw] md:leading-[4vw]">{title == 'Pengaturan' ? 'Ubah Profil' : title}</h1>
                    <hr className="border-1 border-secondary" />
                </div>
                {children}
            </div>
        </div>
    )
}

function DashboardNavbar ({ auth, title, className }) {
    return (
        <div className={`flex flex-col gap-[5.5vw] md:gap-[1.5vw] ${className}`}>
            <div className="hidden md:flex items-center gap-[1vw]">
                <img className="w-[22vw] h-[22vw] md:w-[5vw] md:h-[5vw] rounded-full shadow-centered-spread" src={userIcon} alt="User" />
                <div>
                    <p className="font-medium">{auth.user.username}</p>
                    <button className="text-[.95vw] font-medium hover:text-secondary"><i className="bi bi-pen"></i> Ubah Foto</button>
                </div>
            </div>
            <DashboardNavbarItem className={`${title == 'Pengaturan' ? 'hidden md:inline-block' : ''}`} href="/pengaturan/ubah_profil" active={title == 'Pengaturan' || title == 'Ubah Profil'}>
                <i className="bi bi-pen"></i>
                <span>Profil</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem className="md:hidden" href="/pengaturan/ubah_profil" active={false}>
                <i className="bi bi-pen"></i>
                <span>Profil</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem href="/pengaturan/ubah_password" active={title == 'Ubah Password'}>
                <i className="bi bi-key"></i>
                <span>Ubah Password</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem href="/logout" method="post" active={title == 'Keluar'}>
                <i className="bi bi-box-arrow-right"></i>
                <span>Keluar</span>
            </DashboardNavbarItem>
        </div>
    )
}
