import '/resources/css/main.css';
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Hero from "./Partials/LandingPage/Hero";
import Introduction from './Partials/LandingPage/Introduction';
import Program from './Partials/LandingPage/Program';
import Video from './Partials/LandingPage/Video';
import Testimony from './Partials/LandingPage/Testimony';
import FAQ from './Partials/LandingPage/FAQ';
import Consultation from './Partials/LandingPage/Consultation';

export default function Index () {
    return (
        <MainLayout>
            <Head title="Home" />
            <Hero />
            <Introduction />
            <Program />
            <div className='bg-gradient-1 md:bg-unset overflow-hidden md:overflow-visible'>
                <Video />
                <Testimony />
            </div>
            <FAQ />
            <Consultation />
        </MainLayout>
    )
}
