import MainLayout from "@/Layouts/MainLayout";
import Hero from '../Partials/ProfilPerusahaan/Hero';
import Preliminary from '../Partials/ProfilPerusahaan/Preliminary';
import Team from "../Partials/ProfilPerusahaan/Team";

import tim1 from '/resources/img/tim_yordhan.svg';
import tim2 from '/resources/img/tim_rian.svg';
import tim3 from '/resources/img/tim_timo.svg';

export default function ProfilPerusahaan () {
    const data_team = [
        {
            name: 'Yordhan Ghalis Dewangga',
            title: 'Chief Executive Officer',
            image: tim1,
            description: 'Mas Yordhan adalah seorang pria yang tujuan hidupnya untuk menjadi kaya raya. Dengan membangun Goals Academy, dia mengawali langkahnya dan bergelut dengan dunia pendidikan yang penduh dengan tantangan langsung dari masyarakat.',
            linkedin: '',
            instagram: '',
        },
        {
            name: 'Zaini Febrian Akbar',
            title: 'Chief Operating Officer',
            image: tim2,
            description: 'Mas Yordhan adalah seorang pria yang tujuan hidupnya untuk menjadi kaya raya. Dengan membangun Goals Academy, dia mengawali langkahnya dan bergelut dengan dunia pendidikan yang penduh dengan tantangan langsung dari masyarakat.',
            linkedin: '',
            instagram: '',
        },
        {
            name: 'Gilbert Timothy Geraldo',
            title: 'Commissioner',
            image: tim3,
            description: 'Mas Yordhan adalah seorang pria yang tujuan hidupnya untuk menjadi kaya raya. Dengan membangun Goals Academy, dia mengawali langkahnya dan bergelut dengan dunia pendidikan yang penduh dengan tantangan langsung dari masyarakat.',
            linkedin: '',
            instagram: '',
        },
    ]

    return (
        <MainLayout title="Profil Perusahaan">
            <Hero />
            <Preliminary />
            <Team data={data_team} />
        </MainLayout>
    )
}
