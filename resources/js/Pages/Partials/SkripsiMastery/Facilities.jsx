import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";

export default function Facilities () {
    const data = [
        {
            title: "Perpustakaan Digital",
            text: "Alhamdulillah setelah ikut bimbingan di goals academy dapat inspirasi tentang topik apa yang mau saya bahas untuk dijadikan judul skripsi."
        },
        {
            title: "Daily Call Bareng Tutor Pilihan",
            text: "Alhamdulillah setelah ikut bimbingan di goals academy dapat inspirasi tentang topik apa yang mau saya bahas untuk dijadikan judul skripsi."
        },
        {
            title: "Monthly Call Bersama Founders",
            text: "Alhamdulillah setelah ikut bimbingan di goals academy dapat inspirasi tentang topik apa yang mau saya bahas untuk dijadikan judul skripsi."
        },
        {
            title: "Konsultasi by chat Sepuasnya",
            text: "Alhamdulillah setelah ikut bimbingan di goals academy dapat inspirasi tentang topik apa yang mau saya bahas untuk dijadikan judul skripsi."
        },
        {
            title: "Informasi Magang & Berita Up to Date",
            text: "Alhamdulillah setelah ikut bimbingan di goals academy dapat inspirasi tentang topik apa yang mau saya bahas untuk dijadikan judul skripsi."
        },
        {
            title: "Free Akses Cek Plagiasi Turnitin",
            text: "Alhamdulillah setelah ikut bimbingan di goals academy dapat inspirasi tentang topik apa yang mau saya bahas untuk dijadikan judul skripsi."
        },
        {
            title: "Pojok Review",
            text: "Alhamdulillah setelah ikut bimbingan di goals academy dapat inspirasi tentang topik apa yang mau saya bahas untuk dijadikan judul skripsi."
        },

    ]

    return (
        <section id="quotes" className="md:pt-[7.34vw] md:pb-[7.76vw]">
            <div className="w-[84.375%] mx-auto md:space-y-[7.92vw]">
                <div className="w-[60.63vw] mx-auto text-center md:space-y-[2.4vw]">
                    <h2 className="md:text-[2.5vw]">Tidak Hanya Video Learning Fast Track Skripsian dan Komunitas yang Kita Hadirkan</h2>
                    <p className="md:text-[1.25vw]">Tentu Ada Jadwal Rutin Buat Belajar Bareng dan Monitoring Progress Skripsimu</p>
                </div>
                <div>
                    <Swiper
                        modules={[Navigation, Pagination, A11y, FreeMode]}
                        className="swiper-custom"
                        slidesPerView={"auto"}
                        spaceBetween={"2%"}
                        grabCursor
                        draggable
                        freeMode
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index} style={{ width: "fit-content" }}>
                                <Card {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

function Card ({ title, text }) {
    return (
        <div className="bg-[#FFEDE5] md:w-[25vw] md:px-[2.08vw] md:pt-[2.5vw] md:pb-[1.67vw] md:space-y-[2.08vw] rounded-[.83vw]">
            <h3 className="font-semibold md:text-[1.875vw] md:w-[92.5%]">{title.split(" ").length == 2 ? <>{title.split(" ")[0]}<br />{title.split(" ")[1]}</> : title}</h3>
            <p className="md:text-[1.04vw]">{text}</p>
        </div>
    )
}