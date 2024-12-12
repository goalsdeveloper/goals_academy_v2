import { Head } from "@inertiajs/react";
import TopBackground from "../Partials/SkripsiMastery/topBackground";
import Header from "../Partials/SkripsiMastery/Header";
import Hero from "../Partials/SkripsiMastery/Hero";
import Phases from "../Partials/SkripsiMastery/Phases";
import Triangle from "../Partials/SkripsiMastery/Triangle";
import Quotes from "../Partials/SkripsiMastery/Quotes";
import Facilities from "../Partials/SkripsiMastery/Facilities";
import Testimony from "../Partials/SkripsiMastery/Testimony";
import Clients from "../Partials/SkripsiMastery/Clients";
import PriceList from "../Partials/SkripsiMastery/PriceList";
import CertificateDisplay from "../Partials/SkripsiMastery/CertificateDisplay";
import Callback from "../Partials/SkripsiMastery/Callback";
import Footer from "../Partials/SkripsiMastery/Footer";

export default function SkripsiMastery () {
    return (
        <>
            <Head title="Skripsi Mastery - Goals Academy" />
            <TopBackground />
            <Header />
            <Hero />
            <Phases />
            <Triangle />
            <Quotes />
            <Facilities />
            <Testimony />
            <Clients />
            <PriceList />
            <CertificateDisplay />
            <Callback />
            <Footer />
        </>
    )
}