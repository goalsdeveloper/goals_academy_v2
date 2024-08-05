import MainLayout from "@/Layouts/MainLayout";
import Hero from "./Partials/DibimbingSatuSemester/Hero";
import CTA from "./Partials/DibimbingSatuSemester/CTA";
import Sidebar from "./Partials/DibimbingSatuSemester/Sidebar";
import "@/script/dibimbingSatuSemester";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { FiCreditCard, FiUser } from "react-icons/fi";
import { PiGraduationCap } from "react-icons/pi";
import { RiComputerFill, RiQuestionLine, RiThumbUpFill } from "react-icons/ri";
import { TbTag } from "react-icons/tb";

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
            href: "tutor       ",
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

    useEffect(() => {
        document.addEventListener('scroll', () => {
            const headerHeight = document.querySelector('header').scrollHeight;
            const sections = document.querySelectorAll('section');
            sections.forEach((item, index) => {
                const id = item.id;
                const offsetTop = item.offsetTop;
                const scrollHeight = item.scrollHeight;
                const diff = scrollY - (offsetTop - headerHeight);
                if (diff >= 0 && diff <= scrollHeight) {
                    const temp = sidebarItems.slice().map((item2, index2) => {
                        if (scrollY < document.querySelector(`#${sidebarItems[0].href}`).offsetTop) {
                            if (index2 == 0) {
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
            <div className="container mx-auto flex justify-between py-[4vw] gap-[4vw]">
                <Sidebar items={sidebarItems} scrollToSection={scrollToSection} />
                <div className="w-10/12 -z-10">
                    <section id="benefit" className="h-[50vh]">benefit</section>
                    <section id="lini-waktu" className="h-[50vh]">lini waktu</section>
                    <section id="tools" className="h-[50vh]">tools</section>
                </div>
            </div>
        </MainLayout>
    )
}