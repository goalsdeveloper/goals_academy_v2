import '/resources/css/main.css';
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Hero from "./Partials/LandingPage/Hero";
import Intro from "./Partials/LandingPage/Intro";
import Program from './Partials/LandingPage/Program';
import Video from './Partials/LandingPage/Video';

export default function Index () {
    return (
        <MainLayout>
            <Head title="Home" />
            <Hero />
            <Intro />
            <Program />
            <div className='bg-gradient-1 md:bg-unset overflow-hidden md:overflow-visible'>
                <Video />
            </div>
        </MainLayout>
    )
}
