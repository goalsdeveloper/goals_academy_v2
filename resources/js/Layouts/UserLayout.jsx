import "/resources/css/main.css";
import { Head, Link } from "@inertiajs/react";
import { CircularProgressbar } from 'react-circular-progressbar';
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import DashboardNavbarItem from "@/Components/DashboardNavbarItem";
import MainHeader from "./Partials/MainHeader";
import wave5 from "/resources/img/vector/wave-5.svg";
import wave6 from "/resources/img/vector/wave-6.svg";
import wave7 from "/resources/img/vector/wave-7.svg";
import wave8 from "/resources/img/vector/wave-8.svg";
import userIcon from "/resources/img/icon/user.png";
import "@/script/mainHeader";

export default function UserLayout ({ auth, title, children }) {
    return (
        <>
            <Head title={title} />
            <MainHeader auth={auth} title="Dashboard" />
            <main className="text-dark pt-20 xs:pt-20 md:pt-20 xl:pt-32 3xl:pt-48 pb-[8vw] md:pb-[3vw] text-[2.5vw] md:text-[1.15vw] overflow-visible">
                <Preliminary auth={auth} title={title} />
                <DashboardContent title={title}>
                    {children}
                </DashboardContent>
            </main>
        </>
    )
}

function Preliminary ({ auth, title }) {
    const percentage = 68
    return (
        <div className={`container mx-auto shadow-centered-spread rounded-[1vw] overflow-hidden mt-[3vw] mb-[6vw] md:mb-[3vw] ${title == 'Dashboard' ? '' : 'hidden md:block'}`}>
            <div className="relative">
                <div className="flex flex-col md:flex-row text-center md:text-left items-center gap-[3vw] md:gap-[1.5vw] p-[6vw] pb-[12vw] md:p-[3vw]">
                    <img className="w-[22vw] h-[22vw] md:w-[6vw] md:h-[6vw]" src={userIcon} alt="User" />
                    <div>
                        <h2 className="font-sans font-medium text-[4vw] md:text-[2.25vw] mb-[.5vw]">Selamat Datang <span className="text-secondary">{auth.user.name}</span></h2>
                        <p>Hello {auth.user.name}! Selamat datang di website Goals Academy!</p>
                    </div>
                <img src={wave5} className="hidden md:block absolute w-full left-0 right-0 bottom-0 select-none" />
                <img src={wave7} className="md:hidden absolute w-full left-0 right-0 bottom-0 select-none" />
                </div>
            </div>
            <div className="relative bg-secondary text-white">
                <img src={wave6} className="hidden md:block absolute w-full left-0 right-0 top-0 select-none" />
                <img src={wave8} className="md:hidden absolute w-full left-0 right-0 top-0 select-none" />
                <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-normal items-center gap-[4vw] md:gap-[1.5vw] p-[6vw] pt-[12vw] md:p-[3vw]">
                    <div className="w-[22vw] h-[22vw] md:w-[6vw] md:h-[6vw] overflow-visible">
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={{
                                root: {
                                    justifyContent: 'center',
                                    overflow: 'visible',
                                },
                                path: {
                                    stroke: '#ffffff',
                                    strokeWidth: 12,
                                },
                                trail: {
                                    stroke: 'color-mix(in lch, black 40%, #848484)',
                                    strokeWidth: 12,
                                },
                                text: {
                                    fill: '#ffffff',
                                    dominantBaseline: 'middle',
                                    textAnchor: 'middle',
                                    textAlign: 'center',
                                    fontSize: '1.5vw',
                                    fontFamily: 'Poppins',
                                }
                                }}
                            className="hidden md:block"
                        />
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={{
                                root: {
                                    justifyContent: 'center',
                                    overflow: 'visible',
                                },
                                path: {
                                    stroke: '#ffffff',
                                    strokeWidth: 14,
                                },
                                trail: {
                                    stroke: 'color-mix(in lch, black 40%, #848484)',
                                    strokeWidth: 14,
                                },
                                text: {
                                    fill: '#ffffff',
                                    dominantBaseline: 'middle',
                                    textAnchor: 'middle',
                                    textAlign: 'center',
                                    fontSize: '6vw',
                                    fontFamily: 'Poppins',
                                }
                                }}
                            className="md:hidden"
                        />
                    </div>
                    <div className="w-7/12 md:w-8/12 pe-[2vw] md:pe-0">
                        <h2 className="font-sans font-normal md:font-medium text-white text-[4vw] md:text-[2.25vw] mb-[.5vw]">Kelengkapan Profil Anda</h2>
                        <p>Mari lengkapi profil Anda agar Anda dapat segera melakukan transaksi. Profil yang lengkap memudahkan  kami memproses pesanan dengan cepat dan aman.</p>
                    </div>
                    <Link href="/pengaturan" className="w-5/12 h-[6vw] md:w-[20%] md:h-[3vw] cursor-pointer">
                        <ButtonHoverSlide className="h-full before:p-0.5 md:before:p-0.5 lg:before:p-1 xl:before:p-1.5 3xl:before:p-2 before:content-arrow-right-secondary-16 xs:before:content-arrow-right-secondary-16 md:before:content-arrow-right-secondary-20 xl:before:content-arrow-right-secondary-24 after:content-completeness after:text-white border-1 xl:border-2 border-white rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-white"></ButtonHoverSlide>
                    </Link>
                </div>
            </div>
        </div>
    )
}

function DashboardContent ({ title, children }) {
    return (
        <div className="container mx-auto flex gap-[1.75vw]">
            <DashboardNavbar className={`sticky top-24 xs:top-28 md:top-24 xl:top-28 3xl:top-40 z-10 w-full md:w-3/12 h-fit ${title == 'Dashboard' ? '' : 'hidden md:flex'}`} title={title} />
            <div className={`w-full md:w-9/12 h-fit md:p-[2.5vw] md:shadow-centered-spread md:rounded-xl ${title == 'Dashboard' ? 'hidden md:block' : ''}`}>
                <div className="text-center mb-[6vw] md:mb-[2vw]">
                    <h1 className="md:font-medium text-secondary text-[4vw] md:text-[2vw] leading-[12vw] md:leading-[4vw]">{title == 'Dashboard' ? 'Pembelajaran Saya' : title}</h1>
                    <hr className="border-1 border-secondary" />
                </div>
                {children}
            </div>
        </div>
    )
}

function DashboardNavbar ({ title, className }) {
    return (
        <div className={`flex flex-col gap-[5.5vw] md:gap-[1.25vw] ${className}`}>
            <DashboardNavbarItem className={`${title == 'Dashboard' ? 'hidden md:inline-block' : ''}`} href="/pembelajaran_saya" active={title == 'Dashboard' || title == 'Pembelajaran Saya'}>
                <i className="fa-regular fa-file-lines"></i>
                <span>Pembelajaran Saya</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem className="md:hidden" href="/pembelajaran_saya" active={false}>
                <i className="fa-regular fa-file-lines"></i>
                <span>Pembelajaran Saya</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem href="/riwayat_transaksi" active={title == 'Riwayat Transaksi'}>
                <i className="fa-solid fa-clock-rotate-left"></i>
                <span>Riwayat Transaksi</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem href="/notifikasi" active={title == 'Notifikasi'}>
                <div className="relative">
                    <i className="fa-regular fa-bell"></i>
                    <div className="absolute border-1 border-white rounded-full top-[.2vw] right-0 w-[.4vw] h-[.4vw] 3xl:w-3 3xl:h-3 bg-red-500"></div>
                </div>
                <span>Notifikasi</span>
            </DashboardNavbarItem>
            <DashboardNavbarItem href="/obrolan" active={title == 'Obrolan'}>
                <i className="bi bi-chat-square-text"></i>
                <span>Obrolan <span className="bg-secondary text-white font-normal text-[.8vw] rounded-[.7vw] py-[.1vw] px-[.5vw]">Soon</span></span>
            </DashboardNavbarItem>
            <DashboardNavbarItem href="/pengaturan" active={title == 'Pengaturan'}>
                <i className="bi bi-gear"></i>
                <span>Pengaturan</span>
            </DashboardNavbarItem>
        </div>
    )
}
