import MainLayout from "@/Layouts/MainLayout";
import Hero from "./Partials/DibimbingSatuSemester/Hero";
import CTA from "./Partials/DibimbingSatuSemester/CTA";
import Sidebar from "./Partials/DibimbingSatuSemester/Sidebar";
import "@/script/dibimbingSatuSemester";

export default function DibimbingSatuSemester ({ auth }) {
    return (
        <MainLayout auth={auth} title="Dibimbing Satu Semester">
            <Hero />
            <CTA />
            <div className="container mx-auto flex justify-between py-[4vw] gap-[4vw]">
                <Sidebar />
                <div className="w-10/12 bg-soft">
                    <section id="benefit" className="h-[30vh] md:pt-[7.5vw] md:-translate-y-[7.5vw]">benefit</section>
                    <section id="lini-waktu" className="h-[30vh] md:pt-[7.5vw] md:-translate-y-[7.5vw]">lini waktu</section>
                    <section id="tools" className="h-[30vh] md:pt-[7.5vw] md:-translate-y-[7.5vw]">tools</section>
                </div>
            </div>
        </MainLayout>
    )
}