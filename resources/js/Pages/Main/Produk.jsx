import { useState } from "react";
import { useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Filter from "../Partials/Produk/Filter";
import SearchBar from "../Partials/Produk/SearchBar";
import Bimbingan from "../Partials/Produk/Bimbingan";
import JasaRiset from "../Partials/Produk/JasaRiset";
import ProdukDigital from "../Partials/Produk/ProdukDigital";
import Webinar from "../Partials/Produk/Webinar";
import Consultation from "../Partials/Produk/Consultation";

import program1 from "/resources/img/program/dibimbing-online-30.png";
import program2 from "/resources/img/program/dibimbing-online-45.png";
import program3 from "/resources/img/program/dibimbing-offline-60.png";
import program4 from "/resources/img/program/dibimbing-offline-90.png";
import program5 from "/resources/img/program/dibimbing-tuntas.png";
import program6 from "/resources/img/program/dibimbing-olah-data.png";

import produkdigital1 from "/resources/img/produk-digital/1.png";
import produkdigital2 from "/resources/img/produk-digital/2.png";
import produkdigital3 from "/resources/img/produk-digital/3.png";

import webinar1 from "/resources/img/webinar/1.png";
import webinar2 from "/resources/img/webinar/2.png";
import webinar3 from "/resources/img/webinar/3.png";
import webinar4 from "/resources/img/webinar/4.png";
import { data } from "autoprefixer";

export default function Produk({
    auth,
    dataBimbingan,
    dataJasaRiset,
    // dataProdukDigital,
    // dataWebinar,
    categories,
}) {
    const categoriesBimbingan = ['Semua'].concat(
        categories
        .filter(i => i.product_type.type == 'Bimbingan')
        .map(i => i.name)
    )
    const categoriesJasaRiset = ['Semua'].concat(
        categories
        .filter(i => i.product_type.type == 'Jasa Riset')
        .map(i => i.name)
    )
    const dataProdukDigital = [
        // {
        //     name: "How To Survive Your Thesis? Start with Theme",
        //     price: "-",
        //     product_image: produkdigital1,
        //     link: "https://lynk.id/goalsacademy/XBmqq6J",
        // },
        // {
        //     name: "Proposal Biar Diterima",
        //     price: 40000,
        //     product_image: produkdigital2,
        //     link: "https://lynk.id/goalsacademy/XBmqq6J",
        // },
        // {
        //     name: "Kajian Pustaka",
        //     price: 40000,
        //     product_image: produkdigital3,
        //     link: "https://lynk.id/goalsacademy/XBmqq6J",
        // },
    ];

    const dataWebinar = [
        // {
        //     title: "Tips Membuat Judul Skripsi Mudah ACC",
        //     price: 34000,
        //     image: webinar2,
        //     date: "2023-10-24 19:00:00",
        //     link: "https://lynk.id/goalsacademy/oZyPAav",
        // },
        // {
        //     title: "Teknik Lolos Paraphrase Penulisan Proposal Skripsi",
        //     price: 34000,
        //     image: webinar1,
        //     date: "2023-10-25 19:00:00",
        //     link: "https://lynk.id/goalsacademy/a2j9vM8",
        // },
        // {
        //     title: "Tips & Trick Presentasi Sidang Skripsi yang Disukai Dosen",
        //     price: 34000,
        //     image: webinar3,
        //     date: "2023-10-26 19:00:00",
        //     link: "https://lynk.id/goalsacademy/lmzQOyX",
        // },
        // {
        //     title: "Bundling Webinar Series Goals Academy",
        //     price: 94000,
        //     image: webinar4,
        //     date: "2023-10-24 19:00:00",
        //     link: "https://lynk.id/goalsacademy/nGV0BrP",
        // },
    ];

    const [show, setShow] = useState(Array(3).fill(false));
    const { data: searchKeyword, setData: setSearchKeyword } = useForm({keyword: ''});
    const [data1, setData1] = useState(dataBimbingan.slice());
    const [data2, setData2] = useState(dataProdukDigital.slice());
    const [data3, setData3] = useState(dataWebinar.slice());
    const [data4, setData4] = useState(dataJasaRiset.slice());
    const [category1, setCategory1] = useState('Semua');

    const status = ((show[0] == show[1]) == show[2]) == false;

    const showHandler = (id) => {
        const temp = Array(3).fill(false);
        temp[id] = !show[id];
        setShow(temp);
    };

    const searchHandler = (keyword) => {
        let temp1
        if (category1 == 'Semua') {
            temp1 = dataBimbingan
                .slice()
                .filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
        } else {
            temp1 = dataBimbingan
                .slice()
                .filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()))
                .filter((item) => item.category.name == category1);
        }
        const temp2 = dataProdukDigital
            .slice()
            .filter((item) => item.name.toLowerCase().includes(keyword));
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

    const filterByCategory = (category, productType) => {
        if (productType == "bimbingan") {
            let temp1
            if (category == 'Semua') {
                temp1 = dataBimbingan
                .slice()
                .filter((item) => item.name.toLowerCase().includes(searchKeyword.keyword));
            } else {
                temp1 = dataBimbingan
                    .slice()
                    .filter((item) => item.name.toLowerCase().includes(searchKeyword.keyword))
                    .filter((item) => item.category.name == category)
            }
            setData1(temp1)
            setCategory1(category)
        }
    }

    return (
        <MainLayout auth={auth} title="Produk">
            <SearchBar searchHandler={searchHandler} className="md:hidden" data={searchKeyword} setData={setSearchKeyword} />
        <Filter show={show} showHandler={showHandler} />
            <SearchBar searchHandler={searchHandler} className="hidden md:block" data={searchKeyword} setData={setSearchKeyword} />
            <Bimbingan data={data1} active={show[0]} status={status} categories={categoriesBimbingan} category={category1} setCategory={setCategory1} filterHandler={filterByCategory} />
            <JasaRiset data={data4} active={show[0]} status={status} categories={categoriesBimbingan} category={category1} setCategory={setCategory1} filterHandler={filterByCategory} />
            <ProdukDigital data={data2} active={show[1]} status={status} />
            <Webinar data={data3} active={show[2]} status={status} />
            <Consultation />
        </MainLayout>
    );
}
