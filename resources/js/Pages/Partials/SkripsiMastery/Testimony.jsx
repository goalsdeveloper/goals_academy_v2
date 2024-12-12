import "swiper/css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, FreeMode } from "swiper/modules";

import testimony1 from "/resources/img/testimony/wendi.jpg";
import testimony2 from "/resources/img/testimony/roziqin.jpg";
import testimony3 from "/resources/img/testimony/ravly.jpg";
import testimony4 from "/resources/img/testimony/zaqya.jpg";
import testimony5 from "/resources/img/testimony/haris.jpg";
import testimony6 from "/resources/img/testimony/ferry.jpg";
import testimony7 from "/resources/img/testimony/herinda.jpg";
import testimony8 from "/resources/img/testimony/khafidh.jpg";
import testimony9 from "/resources/img/testimony/ludi.jpg";

export default function Testimony () {
    const data = [
        {
            name: "Wendi",
            instagram: "wendingotes",
            faculty: "Hukum",
            image: testimony1,
            text: "Alhamdulillah setelah ikut bimbingan di goals academy dapat inspirasi tentang topik apa yang mau saya bahas untuk dijadikan judul skripsi.",
        },
        {
            name: "Roziqin",
            instagram: "roziqinakhmad14",
            faculty: "Sains dan Teknologi",
            image: testimony2,
            text: "Setelah ikut bimbingan di goals academy yang sebelumnya belum kepikiran mau mulai skripsi dari mana, sekarang jadi termotivasi dan paham mau mulai skripsian dari mana.",
        },
        {
            name: "Ravly",
            instagram: "ravlyfx",
            faculty: "Hukum",
            image: testimony3,
            text: "Penyampaian waktu bimbingan mudah dicerna, progress skripsiku jadi lebih cepat.",
        },
        {
            name: "Zaqya",
            instagram: "hildazaqya",
            faculty: "Sains dan Teknologi",
            image: testimony4,
            text: "Bimbingan sama dospem disuruh ganti judul dan bahkan sering ganti judul, setelah bimbingan di goals academy jadi paham judul skripsi yang menarik dan sesuai dengan penelitianku.",
        },
        {
            name: "Haris",
            instagram: "ekadianriyadi_",
            faculty: "Teknik",
            image: testimony5,
            text: "Sebelum bimbingan di goals academy bingung dan ngga paham sama sekali terkait penggunaan SPSS, setelah daftar bimbingan dan tutornya simple banget aku jadi paham terkait SPSS dan aku bisa mulai bimbingan lagi dengan dospem.",
        },
        {
            name: "Ferry",
            instagram: "adityaaferry_",
            faculty: "Hukum",
            image: testimony6,
            text: "Diluar ekspektasi proposal skripsi aku dapat nilai A walaupun ada beberapa catatan revisi yang harus diperbaiki.",
        },
        {
            name: "Herinda",
            instagram: "fitriherindaw",
            faculty: "Ilmu Komputer",
            image: testimony7,
            text: "Goals Academy baik banget! Aku dikasih rekomendasi buat nyari sumber dan materi-materi buat skripsiku. Makasih kakak-kakak!",
        },
        {
            name: "Khafidh",
            instagram: "kapet__",
            faculty: "Hukum",
            image: testimony8,
            text: "Gara-gara liat kontennya goals academy, yang awalnya aku males banget, sekarang jadi dapet motivasi buat ngelanjutin skripsiku. Alhasil sekarang tinggal 1 step lagi buat lulus kuliah. Wisuda!",
        },
        {
            name: "Ludi",
            instagram: "luthfiariyandi",
            faculty: "Ilmu Komputer",
            image: testimony9,
            text: "Sempet bimbingan dospem 3x dan stuck di Bab 3, bingung mau revisi mulai dari mana dan takut ngerombak ulang. Setelah daftar bimbingan skripsi di goals academy kunci permasalahan skripsiku terjawab.",
        },
    ];
    const [show, setShow] = useState(false)

    return (
        <section id="testimony" className="relative overflow-hidden">
            <div className="w-full mx-auto md:relative md:flex justify-between items-center">
                <div className="w-full md:absolute z-10 md:before:absolute md:before:-z-10 md:before:w-screen md:before:h-full md:before:bg-dark md:before:bg-opacity-75 h-full flex justify-center items-center">
                    <div className="hidden md:block text-center *:text-white md:space-y-[2vw]">
                        <h3 className="md:w-[60vw] leading-normal md:text-[2.5vw]">Goals Academy Telah Mengkurasi Modul Pembelajaran dan Menghadirkan Dalam Format Video Learning yang Bisa Langsung Dipraktikan Hampir Semua Jurusan</h3>
                        <p className="md:text-[1.25vw]">Tentu Ada Jadwal Rutin Buat Belajar Bareng dan Monitoring Progress Skripsimu</p>
                    </div>
                </div>
                <div className="w-screen">
                    <TestimonyDesktop data={data} show={show} />
                </div>
                <TestimonyMobile data={data} />
            </div>
        </section>
    )
}

function TestimonyCard ({data}) {
    return (
        <div className="md:m-1 xl:m-2 p-4 xs:p-6 md:p-[.83vw] bg-white rounded-lg border-4 md:border-2 lg:border-3 xl:border-4 3xl:border-6 border-gray-100">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 3xl:gap-3">
                    <img className="h-10 xs:h-14 md:h-[2vw] rounded-full" src={data.image} alt="User Icon" />
                    <div>
                        <p className="text-16 xs:text-18 md:text-8 lg:text-10 xl:text-14 3xl:text-20 font-medium">{data.name}</p>
                        <p className="md:text-[.83vw] text-primary">@{data.instagram}</p>
                    </div>
                </div>
                <i className="bi bi-quote text-36 xs:text-48 md:text-[2.5vw] text-primary -scale-x-1"></i>
            </div>
            <p className="h-[20vw] xs:h-24 md:h-[4vw] my-4 md:my-2 lg:my-4 md:text-[.83vw]">
                {data.text}
            </p>
            <p className="mt-4 lg:mt-6 xl:mt-8 md:text-[.83vw] text-primary font-bold">Fakultas {data.faculty}</p>
        </div>
    )
}

function TestimonyDesktopPartial ({data, className}) {
    return (
        <div className={"flex flex-col " + className}>
            <div className="flex flex-col animate-autoplayY">
                {data.map((item, index) => {
                    return <TestimonyCard key={index} data={item} />
                })}
            </div>
            <div className="flex flex-col animate-autoplayY">
                {data.map((item, index) => {
                    return <TestimonyCard key={index} data={item} />
                })}
            </div>
            <div className="flex flex-col animate-autoplayY">
                {data.map((item, index) => {
                    return <TestimonyCard key={index} data={item} />
                })}
            </div>
        </div>
    )
}

function TestimonyDesktop ({data, show}) {
    return (
        <>
            <div className="hidden md:block"></div>
            <div className="hidden md:block h-80 md:h-[48.44vw] md:w-[120%] overflow-hidden">
                <div className={!show ? "grid grid-cols-5" : "hidden"}>
                    <TestimonyDesktopPartial data={data.slice(0,3)} />
                    <TestimonyDesktopPartial data={data.slice(3,6)} className={"-mt-12"} />
                    <TestimonyDesktopPartial data={data.slice(6,9)} className={"-mt-24"} />
                    <TestimonyDesktopPartial data={data.slice(0,3)} className={"-mt-36"} />
                    <TestimonyDesktopPartial data={data.slice(3,6)} className={"-mt-12"} />
                </div>
            </div>
        </>
    )
}


function TestimonyMobile ({data}) {
    return (
        <>
            <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            className="swiper-mobile"
            autoplay={true}
            slidesPerView={1}
            spaceBetween={20}
            grabCursor={true}
            draggable={true}
            loop={true}
            pagination={{
                el: ".testimony-pagination",
                clickable: true,
                type: "bullets",
                renderBullet: (index, className) => {
                    return `<button class="${className}"></button>`
                }
            }}
            >
                {data.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <TestimonyCard data={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className="testimony-pagination flex flex-wrap justify-center md:hidden my-4"></div>
        </>
    )
}
