import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Filter from "../Partials/Produk/Filter";
import SearchBar from "../Partials/Produk/SearchBar";
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
import webinar4 from "/resources/img/webinar/4.png";
import { data } from "autoprefixer";

export default function Produk({
    auth,
    dataDibimbing,
    ebookData,
    webinarData,
}) {
    const dataBimbingan = dataDibimbing;

    const dataEbook = ebookData;
    // const dataEbook = [
    //     {
    //         title: "How To Survive Your Thesis? Start with Theme",
    //         price: "-",
    //         image: ebook1,
    //         link: "https://lynk.id/goalsacademy/XBmqq6J",
    //     },
    //     {
    //         title: "Proposal Biar Diterima",
    //         price: 40000,
    //         image: ebook2,
    //         link: "https://lynk.id/goalsacademy/XBmqq6J",
    //     },
    //     {
    //         title: "Kajian Pustaka",
    //         price: 40000,
    //         image: ebook3,
    //         link: "https://lynk.id/goalsacademy/XBmqq6J",
    //     },
    // ];

    const dataWebinar = [
        {
            title: "Tips Membuat Judul Skripsi Mudah ACC",
            price: 34000,
            image: webinar2,
            date: "2023-10-24 19:00:00",
            link: "https://lynk.id/goalsacademy/oZyPAav",
        },
        {
            title: "Teknik Lolos Paraphrase Penulisan Proposal Skripsi",
            price: 34000,
            image: webinar1,
            date: "2023-10-25 19:00:00",
            link: "https://lynk.id/goalsacademy/a2j9vM8",
        },
        {
            title: "Tips & Trick Presentasi Sidang Skripsi yang Disukai Dosen",
            price: 34000,
            image: webinar3,
            date: "2023-10-26 19:00:00",
            link: "https://lynk.id/goalsacademy/lmzQOyX",
        },
        {
            title: "Bundling Webinar Series Goals Academy",
            price: 94000,
            image: webinar4,
            date: "2023-10-24 19:00:00",
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
        setData3([]);
        setTimeout(() => {
            setData3(temp3);
        }, 0);
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
            {/* <Webinar data={data3} active={show[2]} status={status} /> */}
            <Consultation />
        </MainLayout>
    );
}
