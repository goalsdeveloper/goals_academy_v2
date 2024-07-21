import MainLayout from "@/Layouts/MainLayout";
import Preliminary from "../Partials/ProfilPerusahaan/Preliminary";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Hero from "/resources/img/profil_perusahaan/Hero.svg";
import Icon from "/resources/img/profil_perusahaan/Union.svg";
import Tim1 from "/resources/img/profil_perusahaan/yordan.svg";
import Tim2 from "/resources/img/profil_perusahaan/rian.svg";
import Tim3 from "/resources/img/profil_perusahaan/timo.svg";

import tim1 from "/resources/img/tim/rian.png";
import tim2 from "/resources/img/tim/timo.png";
import tim3 from "/resources/img/tim/oka.png";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import "swiper/css";

export default function ProfilPerusahaan({ auth }) {
    const data_team = [
        {
            name: "Zaini Febrian Akbar",
            title: "Chief Operating Officer",
            image: tim1,
            description:
                "Bergabung bersama Goals Academy sebagai tutor sejak awal. Dengan jiwa yang tenang, menciptakan sistem yang mengalir dan efektif dalam menjalankan perusahaan menjadi tanggungjawab dan komitmennya.",
            linkedin: "zaini-febrian-326781229",
            instagram: "heathxcliff",
        },
        {
            name: "Gilbert Timothy Geraldo",
            title: "Chief Creative Officer",
            image: tim2,
            description:
                "Mengawali karir di dunia kreatif, pria yang kerap disapa Timo ini membantu Goals Academy dalam menciptakan warna dan branding yang apik. Saat ini, bertanggung jawab dalam pengembangan website dan penciptaan visual.",
            linkedin: "gilbert-tg",
            instagram: "gilberttimothyg",
        },
        {
            name: "Dewa Oka Prabawa",
            title: "Chief Product Officer",
            image: tim3,
            description:
                "Komitmennya dalam dunia pendidikan tidak diragukan lagi. Kesamaan visi misi Goals Academy dengannya menjadi dorongan dan tanggungjawabnya dalam mengembangakan produk yang terbaik bagi dunia pendidikan.",
            linkedin: "dewa-oka-prabawa-b37a80213",
            instagram: "okaprabawa",
        },
    ];

    return (
        <MainLayout auth={auth} title="Profil Perusahaan">
            <div className="md:flex md:items-center">
                <div className="md:w-1/2 md:order-last">
                    <img src={Hero} alt="" className="w-full h-auto" />
                </div>
                <div className="pt-5 md:pt-0 md:w-1/2">
                    <div className="w-[80.9vw] md:w-[38.8vw] mx-auto gap-y-2 flex flex-col text-center md:text-start ">
                        <h2 className="w-full text-[4.6vw] md:text-[2.5vw]">
                            Membangun Pemimpin Masa Depan melalui
                            <span className="text-primary">
                                {" "}
                                Inovasi dan Teknologi
                            </span>
                        </h2>
                        <p className="text-sm md:text-lg">
                            Mengenal cerita dan orang-orang di balik Goals
                            Academy
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-[80.9vw] md:w-[67.6vw] mx-auto text-center mt-14">
                <p className="text-sm md:text-lg text-[#4F4F4F]">
                    Goals Academy merupakan Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore
                </p>
            </div>
            <div className="md:flex md:items-center md:gap-x-5 mt-20 px-8 md:px-20">
                <h2 className=" text-[4.6vw] md:text-[2.5vw] w-[74.4vw] md:w-2/5 mb-4 md:mb-0">
                    Transformasi Pendidikan untuk{" "}
                    <span className="text-primary">Pemimpin Masa Depan</span>
                </h2>
                <div className="w-[85vw] md:w-3/5 text-white bg-[#FF8854] shadow mx-auto px-8 md:px-12 py-10 rounded-2xl">
                    <p className="text-base md:text-xl font-medium mb-2">
                        Visi
                    </p>
                    <p className="text-sm md:text-base">
                        Berkomitmen dalam mentransformasi tenaga pendidik
                        profesional dan pelajar sebagai pemimpin di masa depan
                        dengan mengedepankan kemajuan dan efektifitas di bidang
                        riset, pendidikan dan keilmuan berbasis inovasi dan
                        teknologi.
                    </p>
                </div>
            </div>
            <div className="my-14 md:my-20 px-8 md:px-20">
                <h2 className=" text-[4.6vw] md:text-[2.5vw] text-center mb-4 md:mb-0">
                    Nilai - Nilai{" "}
                    <span className="text-primary">Goals Academy</span>
                </h2>
                {/* <div className="grid grid-cols-12 gap-x-10 mt-10"> */}
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    slidesPerView={3}
                    spaceBetween={20}
                    grabCursor={true}
                    draggable={true}
                    loop={true}
                    navigation={{
                        nextEl: ".next",
                        prevEl: ".prev",
                    }}
                    pagination={{
                        el: ".testimony-pagination",
                        clickable: true,
                        type: "bullets",
                        renderBullet: (index, className) => {
                            return `<button class="${className} !bg-primary"></button>`;
                        },
                    }}
                >
                    <SwiperSlide>
                        <div className="shadow-3 rounded-xl py-10 px-9">
                            <img src={Icon} alt="" className="mx-auto w-24" />
                            <h3 className="text-center mt-8">Value</h3>
                            <p className="text-center mt-3 text-sm md:text-base">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="shadow-3 rounded-xl py-10 px-9">
                            <img src={Icon} alt="" className="mx-auto w-24" />
                            <h3 className="text-center mt-8">Value</h3>
                            <p className="text-center mt-3 text-sm md:text-base">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="shadow-3 rounded-xl py-10 px-9">
                            <img src={Icon} alt="" className="mx-auto w-24" />
                            <h3 className="text-center mt-8">Value</h3>
                            <p className="text-center mt-3 text-sm md:text-base">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="shadow-3 rounded-xl py-10 px-9">
                            <img src={Icon} alt="" className="mx-auto w-24" />
                            <h3 className="text-center mt-8">Value</h3>
                            <p className="text-center mt-3 text-sm md:text-base">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="shadow-3 rounded-xl py-10 px-9">
                            <img src={Icon} alt="" className="mx-auto w-24" />
                            <h3 className="text-center mt-8">Value</h3>
                            <p className="text-center mt-3 text-sm md:text-base">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="shadow-3 rounded-xl py-10 px-9">
                            <img src={Icon} alt="" className="mx-auto w-24" />
                            <h3 className="text-center mt-8">Value</h3>
                            <p className="text-center mt-3 text-sm md:text-base">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="flex items-center justify-between">
                    <div className="testimony-pagination flex flex-wrap justify-left my-4"></div>
                    <div className="flex gap-x-5 text-primary">
                        <button className="prev ">
                            <FaChevronLeft size={25} />
                        </button>
                        <button className="next">
                            <FaChevronRight size={25} />
                        </button>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <div className="my-14 md:my-20 px-8 md:px-20">
                <h2 className=" text-[4.6vw] md:text-[2.5vw] text-center mb-5 md:mb-0">
                    Tim <span className="text-primary">Goals Academy</span>
                </h2>
                <p className="text-sm md:text-lg text-[#4F4F4F] text-center">
                    Berkenalan dengan orang-orang di balik Goals Academy
                </p>
                <div className="grid grid-cols-12 gap-x-10 mt-10">
                    <div className="col-span-4 shadow-3 rounded-xl py-5 px-5">
                        <img src={Tim1} alt="" className="mx-auto w-full" />
                        <div className="flex items-center justify-between mt-5">
                            <div>
                                <h5>Yordhan Ghalis Dewangga</h5>
                                <p className="text-base">
                                    Chief Executive Officer
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <a href="" className="border rounded-full p-2">
                                    <FaLinkedinIn size={22} />
                                </a>
                                <a href="" className="border rounded-full p-2">
                                    <FaInstagram size={22} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 shadow-3 rounded-xl py-5 px-5">
                        <img src={Tim2} alt="" className="mx-auto w-full" />
                        <div className="flex items-center justify-between mt-5">
                            <div>
                                <h5>Zaini Febrian Akbar</h5>
                                <p className="text-base">
                                    Chief Operating Officer
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <a href="" className="border rounded-full p-2">
                                    <FaLinkedinIn size={22} />
                                </a>
                                <a href="" className="border rounded-full p-2">
                                    <FaInstagram size={22} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 shadow-3 rounded-xl py-5 px-5">
                        <img src={Tim3} alt="" className="mx-auto w-full" />
                        <div className="flex items-center justify-between mt-5">
                            <div>
                                <h5>Gilbert Timothy Geraldo</h5>
                                <p className="text-base">
                                    Chief Digital Officer
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <a href="" className="border rounded-full p-2">
                                    <FaLinkedinIn size={22} />
                                </a>
                                <a href="" className="border rounded-full p-2">
                                    <FaInstagram size={22} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
