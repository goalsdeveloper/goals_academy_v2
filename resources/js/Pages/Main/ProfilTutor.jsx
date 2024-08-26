import MainLayout from "@/Layouts/MainLayout";
import Hero from "../Partials/ProfilTutor/Hero";
import TutorList from "../Partials/ProfilTutor/TutorList";
import Consultation from "../Partials/ProfilTutor/Consultation";

import tutor1 from "/resources/img/tutor/1.png";
import tutor2 from "/resources/img/tutor/2.png";
import tutor3 from "/resources/img/tutor/3.png";
import tutor4 from "/resources/img/tutor/4.png";
import tutor5 from "/resources/img/tutor/5.png";
import tutor6 from "/resources/img/tutor/6.png";
import bgGradient from "/resources/img/vector/gradient-bg-1.svg";
import bgGradient2 from "/resources/img/vector/gradient-bg-2.svg";
import TutorListOld from "../Partials/ProfilTutor/TutorList";

export default function ProfilTutor({ auth, tutors, skill }) {
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
            <div className="relative overflow-x-hidden">
                <div className="absolute w-[29vw] md:[25vw] h-[29vw] md:h-[25vw] rounded-full top-[20vw] md:top-[4vw] right-[-20vw] md:right-[-20vw] border-dashed border-[4px] md:border-[10px] -z-10 border-secondary"></div>
                <img src={bgGradient} className="absolute right-[-15vw] md:right-0 top-[25vw] md:top-0 -z-50 w-[55vw] md:w-auto h-[55vw] md:h-auto" alt="" />
                <img src={bgGradient2} className="absolute left-[-20vw] md:left-[-10vw] top-[2vw] md:top-[1.2vw] -z-50 w-[55vw] md:w-auto h-[55vw] md:h-auto" alt="" />
                <Hero />
                <TutorList data={tutors} skillSearch={skill} />
            </div>
            <Consultation />
        </MainLayout>
    );
}
