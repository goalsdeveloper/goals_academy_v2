import '/resources/css/main.css';
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Hero from "./Partials/Home/Hero";
import Introduction from './Partials/Home/Introduction';
import Program from './Partials/Home/Program';
import Video from './Partials/Home/Video';
import Testimony from './Partials/Home/Testimony';
import FAQ from './Partials/Home/FAQ';
import Consultation from './Partials/Home/Consultation';

import program1 from '/resources/img/program-dibimbing-sekali.png';
import program2 from '/resources/img/program-dibimbing-tuntas.png';
import program3 from '/resources/img/program-dibimbing-olah-data.png';
import program4 from '/resources/img/program-e-book-skripsi.png';
import userIcon from '/resources/img/user.png';

export default function Index () {
    const data_program = [
        {
            id: 1,
            name: 'Dibimbing Sekali',
            slug: 'dibimbing-sekali',
            img: program1,
            excerpt: 'Capai kesuksesan skripsimu melalui bimbingan personal secara 1-on-1, sesuai dengan permasalahan pada skripsimu.',
            description: 'Capai kesuksesan skripsimu melalui bimbingan personal secara 1-on-1, sesuai dengan permasalahan pada skripsimu.',
            features: {
                times: 1,
                minDuration: 30,
                maxDuration: 60,
                category: 'Online/Offline',
                total: null,
                media: null,
                information: null
            },
            price: '47.000',
            hasDiscount: true,
        },
        {
            id: 2,
            name: 'Dibimbing Tuntas',
            slug: 'dibimbing-tuntas',
            img: program2,
            excerpt: 'Temukan solusi skripsi optimal melalui bimbingan personal 1-on-1 dalam 9 kali pertemuan.',
            description: 'Temukan solusi skripsi optimal melalui bimbingan personal 1-on-1 dalam 9 kali pertemuan.',
            features: {
                times: 9,
                minDuration: 40,
                maxDuration: 60,
                category: 'Online/Offline',
                total: null,
                media: null,
                information: null
            },
            price: '649.000',
            hasDiscount: true,
        },
        {
            id: 3,
            name: 'Dibimbing Olah Data',
            slug: 'dibimbing-olah-data',
            img: program3,
            excerpt: 'Kembangkan kemampuan mengolah data skripsi melalui bimbingan personal 1-on-1 yang intensif.',
            description: 'Kembangkan kemampuan mengolah data skripsi melalui bimbingan personal 1-on-1 yang intensif.',
            features: {
                times: 1,
                minDuration: 40,
                maxDuration: 60,
                category: 'Online/Offline',
                total: null,
                media: null,
                information: null
            },
            price: '115.000',
            hasDiscount: false,
        },
        {
            id: 4,
            name: 'E-Book Skripsi',
            slug: 'e-book-skripsi',
            img: program4,
            excerpt: 'Panduan berharga dengan kiat-kiat jitu untuk sukses dalam penyusunan skripsi.',
            description: 'Panduan berharga dengan kiat-kiat jitu untuk sukses dalam penyusunan skripsi.',
            features: {
                times: null,
                minDuration: null,
                maxDuration: null,
                category: null,
                total: '1-4 E-Book',
                media: 'Semua Device',
                information: 'Bebas Unduh'
            },
            price: '9.000',
            hasDiscount: false,
        },
    ]

    const data_testimony = [
        {
            name: "John Doe",
            instagram: "john_doe",
            faculty: "1",
            image: userIcon,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia consequuntur saepe nostrum facere odit fugiat dicta exercitationem rerum esse!",
        },
        {
            name: "John Doe",
            instagram: "john_doe",
            faculty: "2",
            image: userIcon,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia consequuntur saepe nostrum facere odit fugiat dicta exercitationem rerum esse!",
        },
        {
            name: "John Doe",
            instagram: "john_doe",
            faculty: "3",
            image: userIcon,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia consequuntur saepe nostrum facere odit fugiat dicta exercitationem rerum esse!",
        },
        {
            name: "John Doe",
            instagram: "john_doe",
            faculty: "4",
            image: userIcon,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia consequuntur saepe nostrum facere odit fugiat dicta exercitationem rerum esse!",
        },
        {
            name: "John Doe",
            instagram: "john_doe",
            faculty: "5",
            image: userIcon,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia consequuntur saepe nostrum facere odit fugiat dicta exercitationem rerum esse!",
        },
        {
            name: "John Doe",
            instagram: "john_doe",
            faculty: "6",
            image: userIcon,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia consequuntur saepe nostrum facere odit fugiat dicta exercitationem rerum esse!",
        },
        {
            name: "John Doe",
            instagram: "john_doe",
            faculty: "7",
            image: userIcon,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia consequuntur saepe nostrum facere odit fugiat dicta exercitationem rerum esse!",
        },
        {
            name: "John Doe",
            instagram: "john_doe",
            faculty: "8",
            image: userIcon,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia consequuntur saepe nostrum facere odit fugiat dicta exercitationem rerum esse!",
        },
        {
            name: "John Doe",
            instagram: "john_doe",
            faculty: "9",
            image: userIcon,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia consequuntur saepe nostrum facere odit fugiat dicta exercitationem rerum esse!",
        },
    ]

    const data_faq = [
        {
            question: "Kak ini programnya online atau offline ya kak?",
            answer: "Kami menyediakan 2 program yaitu offline dan online. Untuk saat ini bimbingan secara offline ini diadakan bagi mahasiswa yang bertempatan di Malang dan ingin melakukan bimbingan skripsi secara tatap muka dengan Tutor Goals Academy. Kami juga menyediakan program online bagi mahasiswa yang ingin melakukan bimbingan skripsi secara jarak jauh dengan Tutor Goals Academy."
        },
        {
            question: "Sebulan ada berapa kali bimbingan ya kak?",
            answer: "Bimbingan di Goals Academy selalu terbuka setiap harinya. Namun untuk program Dibimbing Tuntas terdapat jadwal yang mengharuskan kalian untuk mengikuti kurikulum sesuai dengan progres skripsi kalian."
        },
        {
            question: "Bimbingannya via apa ya kak?",
            answer: "Bimbingan di Goals Academy bisa secara offline ataupun online. Bimbingan online dilakukan secara jarak jauh melalui aplikasi Virtual Meeting sedangkan bimbingan offline bisa dilakukan dengan tatap muka secara langsung di kota tertentu."
        },
        {
            question: "Pembayarannya bisa dengan via apa ya kak?",
            answer: "Kami menyediakan pembayaran melalui BCA, BNI, BRI, GoPay, OVO, ShopeePay, Dana, dll."
        },
        {
            question: "Jurusan yang tersedia ada apa aja ya kak?",
            answer: "Sekarang, Goals Academy sudah tersedia bimbingan skripsi untuk Semua Jurusan."
        },
    ]

    return (
        <MainLayout>
            <Head title="Home" />
            <Hero />
            <Introduction />
            <Program data={data_program} />
            <div className='bg-gradient-1 md:bg-unset overflow-hidden md:overflow-visible'>
                <Video />
                <Testimony data={data_testimony} />
            </div>
            <FAQ data={data_faq} />
            <Consultation />
        </MainLayout>
    )
}
