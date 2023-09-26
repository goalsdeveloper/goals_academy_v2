import MainLayout from "@/Layouts/MainLayout";
import Hero from "../Partials/Karir/Hero";
import RegistrationSteps from "../Partials/Karir/RegistrationSteps";
import CareerList from "../Partials/Karir/CareerList";

import karir1 from "/resources/img/karir/tutor-skripsi.png";
import karir2 from "/resources/img/karir/brand-ambassador.png";
import karir3 from "/resources/img/karir/tutor-olah-data.png";
import karir4 from "/resources/img/karir/academic-internship.png";

export default function Karir({ auth }) {
    const data_karir = [
        {
            title: "Tutor Skripsi",
            image: karir1,
            requirements: [
                "Pendidikan Minimal S1 Semua Jurusan",
                "IPK Minimum 3.5 untuk Jurusan Soshum/3.25 untuk Jurusan Saintek",
                "Mempunyai Komunikasi yang Baik",
                "Berpengalaman dalam Penulisan dan Penelitian Karya Tulis",
            ],
            link: "https://www.google.com/",
        },
        {
            title: "Brand Ambassador",
            image: karir2,
            requirements: [
                "Aktif Sosial Media",
                "Usia Minimal 18 Tahun",
                "Minimal 5K Followers di Media Sosial",
                "Memiliki Kemauan untuk Mencari Jaringan Pemasaran Affiliasi",
            ],
            link: "https://www.google.com/",
        },
        {
            title: "Tutor Olah Data",
            image: karir3,
            requirements: [
                "Memahami Tools Olah Data Penelitian",
                "Pendidikan Minimal S1 Semua Jurusan",
                "IPK Minimum 3.25",
                "Memiliki Kemampuan Komunikasi yang Baik",
            ],
            link: "https://www.google.com/",
        },
        {
            title: "Academic Internship",
            image: karir4,
            requirements: [
                "Minimal S1 Jurusan Pendidikan",
                "IPK Minimum 3.5",
                "Fresh graduate welcome",
                "Berpengalaman dalam Penulisan dan Penelitian Karya Tulis",
                "Memahami Penyusunan Skripsi Jurusan Pendidikan",
                "Bersedia untuk work from office",
            ],
            link: "https://www.google.com/",
        },
    ];

    return (
        <MainLayout auth={auth} title="Karir">
            <Hero />
            <RegistrationSteps />
            <CareerList data={data_karir} />
        </MainLayout>
    );
}
