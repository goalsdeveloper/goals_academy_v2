import MainLayout from "@/Layouts/MainLayout";
import Preliminary from "../Partials/ProfilPerusahaan/Preliminary";
import Hero from "/resources/img/profil_perusahaan/Hero.svg";

import tim1 from "/resources/img/tim/rian.png";
import tim2 from "/resources/img/tim/timo.png";
import tim3 from "/resources/img/tim/oka.png";

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
                        <p className="text-[3.3vw] md:text-[1.2vw]">
                            Mengenal cerita dan orang-orang di balik Goals
                            Academy
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-[80.9vw] md:w-[67.6vw]  mx-auto text-center mt-14">
                <p className="text-[3.3vw] md:text-[1.2vw] text-[#4F4F4F]">
                    Goals Academy merupakan Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore
                </p>
            </div>
            <div className="md:flex mt-20 mx-auto">
                <h2 className=" text-[4.6vw] md:text-[2.5vw] w-[74.4vw] md:w-[25.8]">
                    Transformasi Pendidikan untuk{" "}
                    <span className="text-primary">Pemimpin Masa Depan</span>
                </h2>
                <div className="w-[85vw] md:w-[55.2vw] bg-[#FF8854]">
                    <p>Visi</p>
                    <p>
                        Berkomitmen dalam mentransformasi tenaga pendidik
                        profesional dan pelajar sebagai pemimpin di masa depan
                        dengan mengedepankan kemajuan dan efektifitas di bidang
                        riset, pendidikan dan keilmuan berbasis inovasi dan
                        teknologi.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}
