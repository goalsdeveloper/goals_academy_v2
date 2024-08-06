import MainLayout from "@/Layouts/MainLayout";
import Hero from "./Partials/DibimbingSatuSemester/Hero";
import CTA from "./Partials/DibimbingSatuSemester/CTA";
import Sidebar from "./Partials/DibimbingSatuSemester/Sidebar";
import Benefit from "./Partials/DibimbingSatuSemester/Benefit";
import LiniWaktu from "./Partials/DibimbingSatuSemester/LiniWaktu";
import Tools from "./Partials/DibimbingSatuSemester/Tools";
import Tutor from "./Partials/DibimbingSatuSemester/Tutor";
import Testimoni from "./Partials/DibimbingSatuSemester/Testimoni";
import Harga from "./Partials/DibimbingSatuSemester/Harga";
import Pembayaran from "./Partials/DibimbingSatuSemester/Pembayaran";
import FAQ from "./Partials/DibimbingSatuSemester/FAQ";
import Konsultasi from "./Partials/DibimbingSatuSemester/Konsultasi";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiCreditCard, FiUser } from "react-icons/fi";
import { PiGraduationCap, PiPresentationBold } from "react-icons/pi";
import { RiComputerFill, RiPercentLine, RiQuestionLine, RiThumbUpFill } from "react-icons/ri";
import { TbTag } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLibraryBooks } from "react-icons/md";
import tutor1 from "/resources/img/tutor2/1.png";

export default function DibimbingSatuSemester ({ auth }) {
    const [sidebarItems, setSidebarItems] = useState([
        {
            title: "Benefit",
            icon: <RiThumbUpFill />,
            href: "benefit",
            isActive: true,
        },
        {
            title: "Lini Waktu",
            icon: <FaRegCalendar />,
            href: "lini-waktu",
            isActive: false,
        },
        {
            title: "Tools",
            icon: <RiComputerFill />,
            href: "tools",
            isActive: false,
        },
        {
            title: "Tutor",
            icon: <PiGraduationCap />,
            href: "tutor",
            isActive: false,
        },
        {
            title: "Testimoni",
            icon: <FiUser />,
            href: "testimoni",
            isActive: false,
        },
        {
            title: "Harga",
            icon: <TbTag className="-scale-x-100" />,
            href: "harga",
            isActive: false,
        },
        {
            title: "Pembayaran",
            icon: <FiCreditCard />,
            href: "pembayaran",
            isActive: false,
        },
        {
            title: "FAQ",
            icon: <RiQuestionLine />,
            href: "faq",
            isActive: false,
        },
    ])

    const benefitItems1 = [
        {
            title: "Tutor Profesional",
            text: "Dipandu oleh mentor berpengalaman dibidangnya.",
            icon: <FaChalkboardTeacher className="text-[1.75vw] text-primary" />,
            className: "bg-[#EAEAEA]",
        },
        {
            title: "Harga Terjangkau",
            text: "Harga yang sangat-sangat terjangkau dibanding tempat lain.",
            icon: <RiPercentLine className="text-[1.75vw] text-primary" />,
            className: "bg-[#EAEAEA]",
        },
        {
            title: "Bimbingan Intensif",
            text: "28 pertemuan sepanjang  satu semester.",
            icon: <PiPresentationBold className="text-[1.75vw] text-primary" />,
            className: "bg-[#FFEDE5]",
        },
        {
            title: "Komunitas Eksklusif",
            text: "Join ke komunitas aktif 24/7 dengan support Tutor Goals Academy.",
            icon: <HiOutlineUserGroup className="text-[1.75vw] text-primary" />,
            className: "bg-[#FFEDE5]",
        },
        {
            title: "Materi Komprehensif",
            text: "Materi bimbingan mencakup seluruh aspek yang dibutuhkan untuk skripsi.",
            icon: <MdOutlineLibraryBooks className="text-[1.75vw] text-primary" />,
            className: "bg-[#EAEAEA]",
        },
    ]

    const benefitItems2 = [
        {text: "10x Sharing Session Skripsi"},
        {text: "Free Record Webinar Umum"},
        {text: "17x Pertemuan Webinar Umum"},
        {text: "Free Chat Online 24/7"},
        {text: "Free 1x Sharing Skripsi Kuantitatif"},
        {text: "Call Bareng Tutor Sewaktu-Waktu"},
        {text: "Free Produk Digital Q&A Sidang Skripsi"},
        {text: "Community Sesama Pejuang Skripsi"},
        {text: "Free Record Sharing Session Skripsi"},
        {text: "Berkesempatan Mendapat Desk Review dan Produk Digital Gratis"},
    ]

    const tutorItems = [
        {
            name: "Yordhan Ghalis Dewangga",
            title: "Chief Executive Officer",
            img: tutor1,
            linkedin: "https://linkedin.com/in/",
            instagram: "https://instagram.com",
            text: "Menciptakan akses pendidikan yang bermutu merupakan fondasi penting dalam mendorong kemajuan riset dan teknologi."
        },
        {
            name: "Tutor 1",
            title: "Tutor Pembantu 1",
            img: null,
            linkedin: "https://linkedin.com/in/",
            instagram: "https://instagram.com",
            text: "Menciptakan akses pendidikan yang bermutu merupakan fondasi penting dalam mendorong kemajuan riset dan teknologi."
        },
        {
            name: "Tutor 2",
            title: "Tutor Pembantu 2",
            img: null,
            linkedin: "https://linkedin.com/in/",
            instagram: "https://instagram.com",
            text: "Menciptakan akses pendidikan yang bermutu merupakan fondasi penting dalam mendorong kemajuan riset dan teknologi."
        },
    ]

    useEffect(() => {
        document.addEventListener('scroll', () => {
            const headerHeight = document.querySelector('header').scrollHeight;
            const sections = document.querySelectorAll('section');
            sections.forEach((item, index) => {
                const id = item.id;
                const offsetTop = item.offsetTop;
                const scrollHeight = item.scrollHeight;
                const diff = scrollY - (offsetTop - 1.5 * headerHeight);
                if (diff >= 0 && diff <= scrollHeight) {
                    const temp = sidebarItems.slice().map((item2, index2) => {
                        if (scrollY < document.querySelector(`#${sidebarItems[0].href}`).offsetTop) {
                            if (index2 == 0) {
                                return {...item2, isActive: true};
                            } else {
                                return {...item2, isActive: false};
                            }
                        } else if (scrollY > document.querySelector(`#${sidebarItems[sidebarItems.length - 1].href}`).offsetTop) {
                            if (index2 == sidebarItems.length - 1) {
                                return {...item2, isActive: true};
                            } else {
                                return {...item2, isActive: false};
                            }
                        } else if (item2.href == id) {
                            return {...item2, isActive: true};
                        } else {
                            return {...item2, isActive: false};
                        }
                    });
                    setSidebarItems(temp);
                }
            })
        });
    }, []);

    const scrollToSection = (id) => {
        const headerHeight = document.querySelector('header').scrollHeight;
        const e = document.querySelector(id);
        scrollTo(0, e.offsetTop - headerHeight);
    }
 
    return (
        <MainLayout auth={auth} title="Dibimbing Satu Semester">
            <Hero />
            <CTA />
            <div className="container mx-auto flex justify-between py-[4vw]">
                <Sidebar items={sidebarItems} scrollToSection={scrollToSection} />
                <div className="w-[55.05vw]">
                    <Benefit items1={benefitItems1} items2={benefitItems2} />
                    <LiniWaktu />
                    <Tools />
                    <Tutor items={tutorItems} />
                    <Testimoni />
                    <Harga />
                    <Pembayaran />
                    <FAQ />
                    <Konsultasi />
                </div>
            </div>
        </MainLayout>
    )
}