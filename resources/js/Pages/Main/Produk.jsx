import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Filter from "../Partials/Produk/Filter";
import Bimbingan from "../Partials/Produk/Bimbingan";
import Ebook from "../Partials/Produk/Ebook";
import Webinar from "../Partials/Produk/Webinar";
import Consultation from "../Partials/Produk/Consultation";

import program1 from "/resources/img/program/dibimbing-online-30.png";
import program2 from "/resources/img/program/dibimbing-online-45.png";
import program3 from "/resources/img/program/dibimbing-offline-60.png";
import program4 from "/resources/img/program/dibimbing-offline-90.png";
import program5 from "/resources/img/program/dibimbing-tuntas.png";
import program6 from "/resources/img/program/dibimbing-olah-data.png";

import ebook1 from "/resources/img/ebook/1.png";
import ebook2 from "/resources/img/ebook/2.png";
import ebook3 from "/resources/img/ebook/3.png";

import webinar1 from "/resources/img/webinar/1.png";
import webinar2 from "/resources/img/webinar/2.png";
import webinar3 from "/resources/img/webinar/3.png";
import SearchBar from "../Partials/Produk/SearchBar";

export default function Produk({ auth }) {
    const dataBimbingan = [
        {
            id: 1,
            title: "Dibimbing Online 30 Menit",
            slug: "dibimbing-online-30-menit",
            img: program1,
            excerpt:
                "Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 30 menit, sesuai dengan permasalahan pada skripsimu.",
            description:
                "Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 30 menit, sesuai dengan permasalahan pada skripsimu.",
            features: {
                times: 1,
                duration: 30,
                category: "Online",
            },
            price: 47000,
            hasDiscount: false,
            link: "https://lynk.id/goalsacademy/baE8kEv",
        },
        {
            id: 2,
            title: "Dibimbing Online 45 Menit",
            slug: "dibimbing-online-45-menit",
            img: program2,
            excerpt:
                "Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.",
            description:
                "Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.",
            features: {
                times: 1,
                duration: 45,
                category: "Online",
            },
            price: 69000,
            hasDiscount: false,
            link: "https://lynk.id/goalsacademy/aW2pNBO",
        },
        {
            id: 3,
            title: "Dibimbing Offline 60 Menit",
            slug: "dibimbing-offline-60-menit",
            img: program3,
            excerpt:
                "Bimbingan personal 1-on-1 secara tatap muka selama 60 Menit, khusus area Kota Malang.",
            description:
                "Bimbingan personal 1-on-1 secara tatap muka selama 60 Menit, khusus area Kota Malang.",
            features: {
                times: 1,
                duration: 60,
                category: "Offline",
            },
            price: 129000,
            hasDiscount: false,
            link: "https://lynk.id/goalsacademy/k74ZZ3v",
        },
        {
            id: 4,
            title: "Dibimbing Offline 90 Menit",
            slug: "dibimbing-offline-90-menit",
            img: program4,
            excerpt:
                "Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.",
            description:
                "Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.",
            features: {
                times: 1,
                duration: 90,
                category: "Offline",
            },
            price: 189000,
            hasDiscount: false,
            link: "https://lynk.id/goalsacademy/E4g55Dn",
        },
        {
            id: 5,
            title: "Dibimbing Tuntas",
            slug: "dibimbing-tuntas",
            img: program5,
            excerpt:
                "Temukan solusi skripsi optimal melalui bimbingan personal 1-on-1 dalam 7 kali pertemuan dan berfokus pada permasalahan skripsimu sampai selesai.",
            description:
                "Temukan solusi skripsi optimal melalui bimbingan personal 1-on-1 dalam 7 kali pertemuan dan berfokus pada permasalahan skripsimu sampai selesai.",
            features: {
                times: 7,
                duration: 60,
                category: "Online",
            },
            price: 649000,
            hasDiscount: false,
            link: "https://lynk.id/goalsacademy/7q7r96V",
        },
        {
            id: 6,
            title: "Dibimbing Olah Data",
            slug: "dibimbing-olah-data",
            img: program6,
            excerpt:
                "Kembangkan kemampuan mengolah data skripsi melalui bimbingan personal 1-on-1 yang intensif.",
            description:
                "Kembangkan kemampuan mengolah data skripsi melalui bimbingan personal 1-on-1 yang intensif.",
            features: {
                times: 1,
                duration: 60,
                category: "Online",
            },
            price: 115000,
            hasDiscount: false,
            link: "https://lynk.id/goalsacademy/DqqGx5x",
        },
    ];

    const dataEbook = [
        // {
        //     title: "How To Survive Your Thesis? Start with Theme",
        //     price: 40000,
        //     image: ebook1,
        //     link: "https://lynk.id/goalsacademy/XBmqq6J",
        // },
        // {
        //     title: "Proposal Biar Diterima",
        //     price: 40000,
        //     image: ebook2,
        //     link: "https://lynk.id/goalsacademy/XBmqq6J",
        // },
        // {
        //     title: "Kajian Pustaka",
        //     price: 40000,
        //     image: ebook3,
        //     link: "https://lynk.id/goalsacademy/XBmqq6J",
        // },
    ];

    const dataWebinar = [
        {
            title: "Mencari Ide Awal Skripsi",
            price: 34000,
            image: webinar1,
            date: "2023-10-18 19:00:00",
            link: "https://lynk.id/goalsacademy/oZyPAav",
        },
        {
            title: "Teknik Cepat Mencari Referensi & Parafrase",
            price: 34000,
            image: webinar2,
            date: "2023-10-24 19:00:00",
            link: "https://lynk.id/goalsacademy/a2j9vM8",
        },
        {
            title: "Strategi Sukses Presentasi",
            price: 34000,
            image: webinar3,
            date: "2023-10-26 19:00:00",
            link: "https://lynk.id/goalsacademy/lmzQOyX",
        },
        {
            title: "Bundling Webinar Series",
            price: 94000,
            image: webinar3,
            date: "2023-10-26 19:00:00",
            link: "https://lynk.id/goalsacademy/nGV0BrP",
        },
    ];

    const [show, setShow] = useState(Array(3).fill(false));
    const [data1, setData1] = useState(dataBimbingan.slice());
    const [data2, setData2] = useState(dataEbook.slice());
    const [data3, setData3] = useState(dataWebinar.slice());

    const status = ((show[0] == show[1]) == show[2]) == false;

    const showHandler = (id) => {
        const temp = Array(3).fill(false);
        temp[id] = !show[id];
        setShow(temp);
    };

    const searchHandler = (keyword) => {
        const temp1 = dataBimbingan
            .slice()
            .filter((item) => item.title.toLowerCase().includes(keyword));
        const temp2 = dataEbook
            .slice()
            .filter((item) => item.title.toLowerCase().includes(keyword));
        const temp3 = dataWebinar
            .slice()
            .filter((item) => item.title.toLowerCase().includes(keyword));
        setData1(temp1);
        setData2(temp2);
        setData3(temp3);
    };

    return (
        <MainLayout auth={auth} title="Produk">
            <SearchBar searchHandler={searchHandler} className="md:hidden" />
            <Filter show={show} showHandler={showHandler} />
            <SearchBar
                searchHandler={searchHandler}
                className="hidden md:block"
            />
            <Bimbingan data={data1} active={show[0]} status={status} />
            <Ebook data={data2} active={show[1]} status={status} />
            <Webinar data={data3} active={show[2]} status={status} />
            <Consultation />
        </MainLayout>
    );
}
