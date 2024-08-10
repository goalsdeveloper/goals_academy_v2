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
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FaRegCalendar, FaWpforms } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiCreditCard, FiUser } from "react-icons/fi";
import { PiGraduationCap, PiPresentationBold } from "react-icons/pi";
import { RiComputerFill, RiPercentLine, RiQuestionLine, RiThumbUpFill } from "react-icons/ri";
import { TbHandClick, TbReceipt, TbTag } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLibraryBooks, MdOutlineMarkEmailUnread } from "react-icons/md";
import tool1 from "/resources/img/tools/discord.png";
import tool2 from "/resources/img/tools/google-drive.png";
import tool3 from "/resources/img/tools/google-docs.png";
import tool4 from "/resources/img/tools/spss.png";
import tool5 from "/resources/img/tools/google-sheets.png";
import tool6 from "/resources/img/tools/canva.png";
import tutor1 from "/resources/img/tutor2/1.png";
import tutor2 from "/resources/img/tutor2/2.png";
import tutor3 from "/resources/img/tutor2/3.png";
import testimoni1 from "/resources/img/testimony/wendi.jpg";
import testimoni2 from "/resources/img/testimony/ravly.jpg";
import testimoni3 from "/resources/img/testimony/zaqya.jpg";
import testimoni4 from "/resources/img/testimony/herinda.jpg";
import testimoni5 from "/resources/img/testimony/ferry.jpg";
import testimoni6 from "/resources/img/testimony/haris.jpg";
import GoalsButton from "@/Components/GoalsButton";

export default function DibimbingSatuSemester ({ auth }) {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const registrationLink = "https://lynk.id/goalsacademy/VdDQKd0";

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
    ]);

    const benefitItems1 = [
        {
            title: "Tutor Profesional",
            text: "Dipandu oleh mentor berpengalaman dibidangnya.",
            icon: <FaChalkboardTeacher className="text-[3.75vw] md:text-[1.75vw] text-primary" />,
            className: "bg-[#EAEAEA]",
        },
        {
            title: "Harga Terjangkau",
            text: "Harga yang sangat-sangat terjangkau dibanding tempat lain.",
            icon: <RiPercentLine className="text-[3.75vw] md:text-[1.75vw] text-primary" />,
            className: "bg-[#EAEAEA]",
        },
        {
            title: "Bimbingan Intensif",
            text: "28 pertemuan sepanjang  satu semester.",
            icon: <PiPresentationBold className="text-[3.75vw] md:text-[1.75vw] text-primary" />,
            className: "bg-[#FFEDE5]",
        },
        {
            title: "Komunitas Eksklusif",
            text: "Join ke komunitas aktif 24/7 dengan support Tutor Goals Academy.",
            icon: <HiOutlineUserGroup className="text-[3.75vw] md:text-[1.75vw] text-primary" />,
            className: "bg-[#FFEDE5]",
        },
        {
            title: "Materi Komprehensif",
            text: "Materi bimbingan mencakup seluruh aspek yang dibutuhkan untuk skripsi.",
            icon: <MdOutlineLibraryBooks className="text-[3.75vw] md:text-[1.75vw] text-primary" />,
            className: "bg-[#EAEAEA]",
        },
    ];

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
    ];

    const toolsItems = [
        {
            img: tool1,
            text: "Discord",
        },
        {
            img: tool2,
            text: "GDrive",
        },
        {
            img: tool3,
            text: "GDocs",
        },
        {
            img: tool4,
            text: "SPSS",
        },
        {
            img: tool5,
            text: "GSheets",
        },
        {
            img: tool6,
            text: "Canva",
        },
    ];

    const tutorItems = [
        {
            name: "Yordhan Ghalis Dewangga",
            title: "Founder Goals Academy",
            img: tutor1,
            linkedin: "https://www.linkedin.com/in/yordhan-mahasa-4b6144129/",
            instagram: "https://www.instagram.com/yordhangd/",
            text: "Pendiri platform Goals Academy sekaligus menjadi Tutor Pertama yang bisa menyelesaikan segala permasalahan skripsi di berbagai jurusan."
        },
        {
            name: "Maulidya Indah Mega Saputri",
            title: "Lulusan Terbaik & Tercepat UGM",
            img: tutor2,
            linkedin: "https://www.linkedin.com/in/egalidyaa/",
            instagram: "https://www.instagram.com/egalidyaa/",
            text: "Mahasiswa UGM yang berhasil lulus dengan predikat lulusan terbaik karena telah menyelesaikan skripsi dalam waktu 1,5 bulan saja."
        },
        {
            name: "Shobastian Muchtar",
            title: "Tutor Favorit di Goals Academy",
            img: tutor3,
            linkedin: "https://www.linkedin.com/in/shobastian-muchtar-6571381b9",
            instagram: "https://www.instagram.com/shobastiann/",
            text: "Tutor Favorit di Goals Academy yang memiliki tingkat kepuasan bimbingan 4.9/5 dan terkenal sebagai Tutor solutif untuk berbagai permasalahan skripsi."
        },
    ];

    const testimoniItems = [
        {
            name: "Rizky",
            instagram: "instagram",
            faculty: "Hukum",
            image: testimoni1,
            text: "Ngerjain skripsi gak lagi bikin stres karena ada Goals Academy. Tutornya keren-keren, selalu siap bantu dan ngasih solusi buat masalah skripsi gue.",
        },
        {
            name: "Doni",
            instagram: "instagram",
            faculty: "Ilmu Komunikasi",
            image: testimoni2,
            text: "Mentornya gokil banget! Setiap sesi bimbingan bawa insight baru yang bikin skripsi gue jadi lebih berisi. Worth it banget!",
        },
        {
            name: "Sinta",
            instagram: "instagram",
            faculty: "Akuntansi",
            image: testimoni3,
            text: "Goals Academy bikin skripsi jadi gak terlalu ngeri. Semua materi dijelasin dengan simpel dan gampang dipahami. Sesi bimbingannya juga seru!",
        },
        {
            name: "Lia",
            instagram: "instagram",
            faculty: "Administrasi Publik",
            image: testimoni4,
            text: "Bimbingan dari Goals Academy bikin gue lebih pede menghadapi sidang. Pertanyaannya udah gue antisipasi semua, thanks to the Q&A sessions!",
        },
        {
            name: "Maria",
            instagram: "instagram",
            faculty: "Ilmu Komunikasi",
            image: testimoni5,
            text: "Bimbingan dari Goals Academy tuh ngebantu banget! Skripsi jadi selesai tepat waktu dan hasilnya mantap. Recommended banget deh buat kalian yang lagi berjuang skripsi!",
        },
        {
            name: "Haris",
            instagram: "instagram",
            faculty: "Hukum",
            image: testimoni6,
            text: "Sebelum bimbingan di goals academy bingung dan ngga paham sama sekali terkait penggunaan SPSS, setelah daftar bimbingan dan tutornya simple banget aku jadi paham terkait SPSS.",
        },
    ];

    const pembayaranItems = [
        {
            icon: <TbHandClick />,
            text: "Klik Tombol \"Daftar Sekarang\""
        },
        {
            icon: <FaWpforms />,
            text: "Isi formulir untuk melengkapi pendaftaranmu"
        },
        {
            icon: <FiCreditCard />,
            text: "Pilih metode pembayaran yang tersedia"
        },
        {
            icon: <TbReceipt />,
            text: "Selesaikan pembayaranmu"
        },
        {
            icon: <MdOutlineMarkEmailUnread />,
            text: "Kemudian kamu akan menerima link melalui email yang kamu daftarkan"
        },
    ];

    const FAQItems = [
        {
            question: "Kak ini dibimbing private enggak?",
            answer: "Engga kak, program ini adalah program bimbingan berkelompok secara intens. Jadi kakaknya bakal dibimbing bareng-bareng secara intens agar semua peserta bisa paham skripsi dan diharapkan bisa menyelesaikan skripsinya dalam 1 semester menggunakan roadmap yang dibuat oleh Tim Goals Academy."
        },
        {
            question: "Kak ini jumlah pertemuannya ada berapa?",
            answer: "Total pertemuan yang ada di program ini ada 28X Pertemuan ya kak."
        },
        {
            question: "Kak dengan aku ikut program ini apa bakalan bisa auto lulus tepat waktu?",
            answer: "Kalo kamu ngikutin cara penyusunan skripsi yang dijelaskan oleh Tutor dengan konsisten, aku pastikan kamu bakal punya kesempatan buat lulus tepat waktu kok"
        },
        {
            question: "Kak ini bakal bahas skripsi aja?",
            answer: "Tujuan dari program ini engga cuma kasih tau tips strategi nyusun skripsi, tapi pengen ngebentuk kamu jadi lulusan terbaik dari segi akademik dan memiliki value yang terbentuk positif"
        },
        {
            question: "Ini bisa bahas penelitian kuantatif atau kualitatif atau jurusan A B C D E F G gaa kak?",
            answer: "Bisa banget kak, untuk program ini tersedia untuk semua jurusan ya, jadi pembahasannya nanti bersifat general dan kakaknya juga ga perlu khawatir karena nanti ada sesi tanya jawab atau sharing session yang fleksibel banget. Jadi kakak bisa nyesuaikan dengan jurusan atau permasalahan di skripsi kakak."
        },
        {
            question: "Kak ada diskon engga?",
            answer: "Ada dong! Tapi diskonnya khusus buat member komunitas dan mereka yang pernah bimbingan di Goals Academy ya kak. Apa kakaknya pernah bimbingan atau jadi member komunitas nih?"
        },
    ];

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
    };
 
    return (
        <MainLayout auth={auth} title="Dibimbing Satu Semester" footerClassName="pb-[20vw] md:pb-0">
            <Hero />
            <CTA {...{registrationLink}} />
            <div className="md:container mx-auto flex justify-between pt-[8vw] md:py-[4vw]">
                {!isMobile && <Sidebar items={sidebarItems} {...{registrationLink, scrollToSection}} />}
                <div className="w-full md:w-[55.05vw] mx-auto md:mx-0 flex flex-col md:block">
                    <Benefit items1={benefitItems1} items2={benefitItems2} {...{registrationLink}} />
                    <LiniWaktu />
                    <Tools items={toolsItems} />
                    <Tutor items={tutorItems} />
                    <Testimoni items={testimoniItems} />
                    <Harga {...{registrationLink}} />
                    <Pembayaran items={pembayaranItems} />
                    <FAQ items={FAQItems} />
                    <Konsultasi />
                </div>
            </div>
            {isMobile && 
                <div className="fixed bottom-0 w-full h-[20vw] p-[4vw] bg-white z-10">
                    <GoalsButton href={registrationLink} className="px-[2vw] h-full font-sans text-[3.256vw] md:text-[1.04vw] rounded-[2vw] md:rounded-[.5vw]">Daftar Sekarang</GoalsButton>
                </div>
            }
        </MainLayout>
    )
}