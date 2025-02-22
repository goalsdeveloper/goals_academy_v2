import MainLayout from "@/Layouts/MainLayout";
import Hero from "../Partials/ProfilTutorOld/Hero";
import TutorList from "../Partials/ProfilTutorOld/TutorList";
import Consultation from "../Partials/ProfilTutorOld/Consultation";

import tutor1 from "/resources/img/tutor/1.png";
import tutor2 from "/resources/img/tutor/2.png";
import tutor3 from "/resources/img/tutor/3.png";
import tutor4 from "/resources/img/tutor/4.png";
import tutor5 from "/resources/img/tutor/5.png";
import tutor6 from "/resources/img/tutor/6.png";
import TutorListOld from "../Partials/ProfilTutorOld/TutorList";

export default function ProfilTutorOld({ auth }) {
    const data_tutor = [
        {
            name: "Widyana Rahma Cahyani",
            headline: "Akuntansi & Ekonomi",
            image: tutor1,
            description:
                "Setiap rintangan dalam menyusun skripsi akan mengasah keberanian dan ketahanan mentalmu. Jadi, semangat bertumbuh ya!",
            linkedin: "",
            instagram: "",
        },
        {
            name: "Alyza Lailyah Putri",
            headline: "Normatif, Empiris, Kuantitatif, Kualitatif",
            image: tutor2,
            description: "Semangat aja kurang, bimbingan dong. Uhuyyy",
            linkedin: "",
            instagram: "",
        },
        {
            name: "Elizabeth",
            headline: "Teknologi Pangan, Kimia, Kesehatan",
            image: tutor3,
            description:
                "Nothing but the best is good enough, so don't forget to always give your best ya! Because pain of regret hurts more than the pain of your hardwork.",
            linkedin: "",
            instagram: "",
        },
        {
            name: "Irene Mega",
            headline: "Ilmu Sosial Humaniora",
            image: tutor4,
            description:
                "Tenang, nanti pasti sampai. (analogi orang dalam perjalanan)",
            linkedin: "",
            instagram: "",
        },
        {
            name: "Adella Novianti",
            headline: "Kesehatan Lingkungan/Masyarakat",
            image: tutor5,
            description: "The best view comes after the hardest climb.",
            linkedin: "",
            instagram: "",
        },
        {
            name: "Muhammad Hifni Sahila Rizqy",
            headline: "Linguistik, Sastra, Bahasa, Kualitatif",
            image: tutor6,
            description: "Wherever you are be a good one.",
            linkedin: "",
            instagram: "",
        },
    ];

    return (
        <MainLayout auth={auth} title="Profil Tutor">
            <Hero />
            <TutorListOld data={data_tutor} />
            <Consultation />
        </MainLayout>
    );
}
