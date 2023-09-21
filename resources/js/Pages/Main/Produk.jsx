import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Filter from "../Partials/Produk/Filter";
import Bimbingan from "../Partials/Produk/Bimbingan";
import Ebook from "../Partials/Produk/Ebook";
import Webinar from "../Partials/Produk/Webinar";
import Consultation from "../Partials/Produk/Consultation";

import program1 from '/resources/img/program-dibimbing-sekali.png';
import program2 from '/resources/img/program-dibimbing-tuntas.png';
import program3 from '/resources/img/program-dibimbing-olah-data.png';
import program4 from '/resources/img/program-e-book-skripsi.png';

import ebook1 from "/resources/img/ebook-1.png";
import ebook2 from "/resources/img/ebook-2.png";
import ebook3 from "/resources/img/ebook-3.png";

import webinar1 from "/resources/img/webinar-1.png";
import webinar2 from "/resources/img/webinar-2.png";
import webinar3 from "/resources/img/webinar-3.png";
import SearchBar from "../Partials/Produk/SearchBar";

export default function Produk () {
    const dataBimbingan = [
        {
            id: 1,
            title: 'Dibimbing Sekali',
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
            price: 47000,
            hasDiscount: true,
            link: '',
        },
        {
            id: 2,
            title: 'Dibimbing Tuntas',
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
            price: 649000,
            hasDiscount: true,
            link: '',
        },
        {
            id: 3,
            title: 'Dibimbing Olah Data',
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
            price: 115000,
            hasDiscount: false,
            link: '',
        },
        {
            id: 4,
            title: 'E-Book Skripsi',
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
            price: 9000,
            hasDiscount: false,
            link: '',
        },
    ]

    const dataEbook = [
        {
            title: "How To Survive Your Thesis? Start with Theme",
            price: 40000,
            image: ebook1,
            link: '',
        },
        {
            title: "Proposal Biar Diterima",
            price: 40000,
            image: ebook2,
            link: '',
        },
        {
            title: "Kajian Pustaka",
            price: 40000,
            image: ebook3,
            link: '',
        },
    ]

    const dataWebinar = [
        {
            title: 'Langkah Jitu Tentukan Judul Skripsi',
            price: 40000,
            image: webinar1,
            link: '',
        },
        {
            title: 'Ragam Kepribadian Dosen Pembimbing',
            price: 40000,
            image: webinar2,
            link: '',
        },
        {
            title: 'Teknik Menyusun Skripsi Paling Cepat dan Efektif',
            price: 40000,
            image: webinar3,
            link: '',
        },
    ]

    const [show, setShow] = useState(Array(3).fill(false))
    const [data1, setData1] = useState(dataBimbingan.slice())
    const [data2, setData2] = useState(dataEbook.slice())
    const [data3, setData3] = useState(dataWebinar.slice())

    const status = show[0] == show[1] == show[2] == false

    const showHandler = (id) => {
        const temp = Array(3).fill(false)
        temp[id] = !show[id]
        setShow(temp)
    }

    const searchHandler = (keyword) => {
        const temp1 = dataBimbingan.slice().filter(item => item.title.toLowerCase().includes(keyword))
        const temp2 = dataEbook.slice().filter(item => item.title.toLowerCase().includes(keyword))
        const temp3 = dataWebinar.slice().filter(item => item.title.toLowerCase().includes(keyword))
        setData1(temp1)
        setData2(temp2)
        setData3(temp3)
    }

    return (
        <MainLayout title="Produk">
            <Filter show={show} showHandler={showHandler} />
            <SearchBar searchHandler={searchHandler} />
            <Bimbingan data={data1} active={show[0]} status={status} />
            <Ebook data={data2} active={show[1]} status={status} />
            <Webinar data={data3} active={show[2]} status={status} />
            <Consultation />
        </MainLayout>
    )
}
