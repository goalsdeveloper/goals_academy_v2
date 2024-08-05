import MainLayout from "@/Layouts/MainLayout"
import Hero from "./Partials/DibimbingSatuSemester/Hero"
import CTA from "./Partials/DibimbingSatuSemester/CTA"

export default function DibimbingSatuSemester ({ auth }) {
    return (
        <MainLayout auth={auth} title="Dibimbing Satu Semester">
            <Hero />
            <CTA />
        </MainLayout>
    )
}