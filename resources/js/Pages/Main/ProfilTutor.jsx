import MainLayout from "@/Layouts/MainLayout";
import Hero from '../Partials/ProfilTutor/Hero';
import Team from "../Partials/ProfilTutor/Team";
import Consultation from "../Partials/ProfilTutor/Consultation";

import tim1 from '/resources/img/tim/rian.png';
import tim2 from '/resources/img/tim/timo.png';
import tim3 from '/resources/img/tim/oka.png';

export default function ProfilTutor () {
    const data_team = [
        {
            name: 'Zaini Febrian Akbar',
            title: 'Chief Operating Officer',
            image: tim1,
            description: 'Mas Yordhan adalah seorang pria yang tujuan hidupnya untuk menjadi kaya raya. Dengan membangun Goals Academy, dia mengawali langkahnya dan bergelut dengan dunia pendidikan yang penduh dengan tantangan langsung dari masyarakat.',
            linkedin: 'zaini-febrian-326781229',
            instagram: 'heathxcliff',
        },
        {
            name: 'Gilbert Timothy Geraldo',
            title: 'Commissioner',
            image: tim2,
            description: 'Mas Yordhan adalah seorang pria yang tujuan hidupnya untuk menjadi kaya raya. Dengan membangun Goals Academy, dia mengawali langkahnya dan bergelut dengan dunia pendidikan yang penduh dengan tantangan langsung dari masyarakat.',
            linkedin: 'gilbert-tg',
            instagram: 'gilberttimothyg',
        },
        {
            name: 'Yordhan Ghalis Dewangga',
            title: 'Chief Executive Officer',
            image: tim3,
            description: 'Mas Yordhan adalah seorang pria yang tujuan hidupnya untuk menjadi kaya raya. Dengan membangun Goals Academy, dia mengawali langkahnya dan bergelut dengan dunia pendidikan yang penduh dengan tantangan langsung dari masyarakat.',
            linkedin: 'yordhan-ghalis-dewangga-s-h-4b6144129',
            instagram: 'yordhanmahasa89',
        },
    ]

    return (
        <MainLayout title="Profil Tutor">
            <Hero />
            <Team data={data_team} />
            <Consultation />
        </MainLayout>
    )
}
