import '/resources/css/main.css';
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Hero from "./Partials/LandingPage/Hero";
import Intro from "./Partials/LandingPage/Intro";
import Program from './Partials/LandingPage/Program';

export default function Index () {
    return (
        <MainLayout>
            <Head title="Home" />
            <Hero />
            <Intro />
            <Program />
        </MainLayout>
    )
}
