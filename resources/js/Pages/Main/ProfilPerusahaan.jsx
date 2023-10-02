import MainLayout from "@/Layouts/MainLayout";
import Hero from "../Partials/ProfilPerusahaan/Hero";
import Preliminary from "../Partials/ProfilPerusahaan/Preliminary";
import Team from "../Partials/ProfilPerusahaan/Team";

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
        // {
        //     name: 'Yordhan Ghalis Dewangga',
        //     title: 'Chief Executive Officer',
        //     image: tim3,
        //     description: 'Mas Yordhan adalah seorang pria yang tujuan hidupnya untuk menjadi kaya raya. Dengan membangun Goals Academy, dia mengawali langkahnya dan bergelut dengan dunia pendidikan yang penduh dengan tantangan langsung dari masyarakat.',
        //     linkedin: 'yordhan-ghalis-dewangga-s-h-4b6144129',
        //     instagram: 'yordhanmahasa89',
        // },
    ];

    return (
        <MainLayout auth={auth} title="Profil Perusahaan">
            <Hero />
            <Preliminary />
            <Team data={data_team} />
        </MainLayout>
    );
}
