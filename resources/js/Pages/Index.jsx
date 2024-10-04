import MainLayout from "@/Layouts/MainLayout";
// import Hero from "./Partials/Home-old/Hero";
// import Preliminary from "./Partials/Home-old/Preliminary";
// import Program from "./Partials/Home-old/Program";
// import Video from "./Partials/Home-old/Video";
// import Testimony from "./Partials/Home-old/Testimony";
// import FAQ from "./Partials/Home-old/FAQ";
// import Consultation from "./Partials/Home-old/Consultation";

import Hero from "./Partials/Home/Hero";
import Preliminary from "./Partials/Home/Preliminary";
import Program from "./Partials/Home/Program";
import Clients from "./Partials/Home/Clients";
import Testimony from "./Partials/Home/Testimony";
import FAQ from "./Partials/Home/FAQ";
import Consultation from "./Partials/Home/Consultation";

import CornerWaveVector from "@/Components/CornerWaveVector";

import program1 from "/resources/img/program/dibimbing-online-30.png";
import program2 from "/resources/img/program/dibimbing-tuntas.png";
import program3 from "/resources/img/program/dibimbing-olah-data.png";

import testimony1 from "/resources/img/testimony/wendi.jpg";
import testimony2 from "/resources/img/testimony/roziqin.jpg";
import testimony3 from "/resources/img/testimony/ravly.jpg";
import testimony4 from "/resources/img/testimony/zaqya.jpg";
import testimony5 from "/resources/img/testimony/haris.jpg";
import testimony6 from "/resources/img/testimony/ferry.jpg";
import testimony7 from "/resources/img/testimony/herinda.jpg";
import testimony8 from "/resources/img/testimony/khafidh.jpg";
import testimony9 from "/resources/img/testimony/ludi.jpg";
import WelcomeDialog from "./Partials/Home/WelcomeDialog";
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Index({ auth, products: data_program}) {
    const welcomeMessage = usePage().props.message == "WELCOME_MESSAGE"
    const [showDialog, setShowDialog] = useState(welcomeMessage);

    // const data_program = [
    //     {
    //         id: 1,
    //         title: "Dibimbing Sekali",
    //         slug: "dibimbing-sekali",
    //         img: program1,
    //         excerpt:
    //             "Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 60 menit, sesuai dengan permasalahan pada skripsimu.",
    //         description:
    //             "Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 60 menit, sesuai dengan permasalahan pada skripsimu.",
    //         features: {
    //             times: 1,
    //             duration: 60,
    //             category: "Online",
    //         },
    //         price: 95000,
    //         hasDiscount: false,
    //         link: "https://lynk.id/goalsacademy/n6GjmgN",
    //     },
    //     {
    //         id: 2,
    //         title: "Dibimbing Tuntas",
    //         slug: "dibimbing-tuntas",
    //         img: program2,
    //         excerpt:
    //             "Temukan solusi skripsi optimal melalui bimbingan personal 1-on-1 dalam 7 kali pertemuan dan berfokus pada permasalahan skripsimu sampai selesai.",
    //         description:
    //             "Temukan solusi skripsi optimal melalui bimbingan personal 1-on-1 dalam 7 kali pertemuan dan berfokus pada permasalahan skripsimu sampai selesai.",
    //         features: {
    //             times: 8,
    //             duration: 60,
    //             category: "Online",
    //         },
    //         price: 988000,
    //         hasDiscount: false,
    //         link: "https://lynk.id/goalsacademy/vMQZXjR",
    //     },
    //     {
    //         id: 3,
    //         title: "Dibimbing Olah Data",
    //         slug: "dibimbing-olah-data",
    //         img: program3,
    //         excerpt:
    //             "Kembangkan kemampuan mengolah data skripsi melalui bimbingan personal 1-on-1 yang intensif.",
    //         description:
    //             "Kembangkan kemampuan mengolah data skripsi melalui bimbingan personal 1-on-1 yang intensif.",
    //         features: {
    //             times: 1,
    //             duration: 60,
    //             category: "Online",
    //         },
    //         price: 155000,
    //         hasDiscount: false,
    //         link: "https://lynk.id/goalsacademy/xmQ79ke",
    //     },
    // ];

    const data_testimony = [
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

    const data_faq = [
        {
            question: "Kak ini programnya online atau offline ya kak?",
            answer: "Kami menyediakan 2 program yaitu offline dan online. Untuk saat ini bimbingan secara offline ini diadakan bagi mahasiswa yang bertempatan di Malang dan ingin melakukan bimbingan skripsi secara tatap muka dengan Tutor Goals Academy. Kami juga menyediakan program online bagi mahasiswa yang ingin melakukan bimbingan skripsi secara jarak jauh dengan Tutor Goals Academy.",
        },
        {
            question: "Sebulan ada berapa kali bimbingan ya kak?",
            answer: "Bimbingan di Goals Academy selalu terbuka setiap harinya. Namun untuk program Dibimbing Tuntas terdapat jadwal yang mengharuskan kalian untuk mengikuti kurikulum sesuai dengan progres skripsi kalian.",
        },
        {
            question: "Bimbingannya via apa ya kak?",
            answer: "Bimbingan di Goals Academy bisa secara offline ataupun online. Bimbingan online dilakukan secara jarak jauh melalui aplikasi Virtual Meeting sedangkan bimbingan offline bisa dilakukan dengan tatap muka secara langsung di kota tertentu.",
        },
        {
            question: "Pembayarannya bisa dengan via apa ya kak?",
            answer: "Kami menyediakan pembayaran melalui BCA, BNI, BRI, GoPay, OVO, ShopeePay, Dana, dll.",
        },
        {
            question: "Jurusan yang tersedia ada apa aja ya kak?",
            answer: "Sekarang, Goals Academy sudah tersedia bimbingan skripsi untuk Semua Jurusan.",
        },
    ];

    return (
        <MainLayout auth={auth} title="Home" className="overflow-x-hidden">
            {showDialog && (
                <WelcomeDialog
                    setShowDialog={setShowDialog}
                    showDialog={showDialog}
                    auth={auth}
                />
            )}
            <Hero />
            <Clients />
            <Preliminary />
            <Program data={data_program} />
            <div className="relative py-3 overflow-hidden bg-secondary md:bg-transparent md:overflow-visible xs:py-6 md:py-0">
                <CornerWaveVector
                    className="md:hidden"
                    cornerClassName="w-10/12"
                />
                {/* <Video /> */}
                <Testimony data={data_testimony} />
            </div>
            <FAQ data={data_faq} />
            <Consultation />
        </MainLayout>
    );
}
