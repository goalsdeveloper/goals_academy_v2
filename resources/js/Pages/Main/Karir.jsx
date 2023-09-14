import '/resources/css/main.css';
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Hero from '../Partials/Karir/Hero';
import RegistrationSteps from '../Partials/Karir/RegistrationSteps';
import CareerList from '../Partials/Karir/CareerList';

export default function Karir () {
    return (
        <MainLayout>
            <Head title='Karir' />
            <Hero />
            <RegistrationSteps />
            <CareerList />
        </MainLayout>
    )
}
