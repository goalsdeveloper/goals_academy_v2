import { useState } from "react";
import { TECollapse } from "tw-elements-react";
import figure3 from "/resources/img/figure-3.svg";

const data = [
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

function FAQItem ({id, show, toggleShow, question, answer}) {
    const condition = show[id]

    function FAQIcon () {
        if (condition) {
            return <i className="fa-solid fa-minus flex justify-center items-center text-white bg-secondary rounded-full md:text-6 lg:text-10 xl:text-12 w-5 h-5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5"></i>
        } else {
            return <i className="fa-solid fa-plus flex justify-center items-center text-white bg-secondary rounded-full md:text-6 lg:text-10 xl:text-12 w-5 h-5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5"></i>
        }
    }

    return (
        <>
            <button
            type="button"
            className="w-full flex gap-4 md:gap-2 xl:gap-4 py-6 md:py-3 lg:py-4"
            onClick={() => toggleShow(id)}
            >
                <div>
                    <FAQIcon />
                </div>
                <div className="text-start">
                    <p className="font-medium">{question}</p>
                    <TECollapse show={condition} className="shadow-none">
                        <br />
                        <div>{answer}</div>
                    </TECollapse>
                </div>
            </button>
        </>
    )
}

function FAQContent ({data}) {
    const [show, setShow] = useState(Array(data.length).fill(false))

    const toggleShow = (id) => {
        const temp = Array(data.length).fill(false)
        temp[id] = !show[id]
        setShow(temp)
    }

    return (
        <div className="w-full">
            {data.map(({question, answer}, index) => {
                if (index != data.length - 1) {
                    return (
                        <div key={index}>
                            <FAQItem id={index} show={show} toggleShow={toggleShow} question={question} answer={answer} />
                            <hr className="border-dark" />
                        </div>
                    )
                } else {
                    return (
                        <FAQItem key={index} id={index} show={show} toggleShow={toggleShow} question={question} answer={answer} />
                    )
                }
            })}
        </div>
    )
}

export default function FAQ () {
    return (
        <section id="faq" className="my-16 xl:my-24 3xl:my-32">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-5/12 hidden md:block">
                    <img src={figure3} alt="Figure 3" />
                </div>
                <div className="w-full md:w-6/12 md:mt-[2%] lg:mt-[4%]">
                    <p className="font-medium md:tracking-[0.2rem] lg:tracking-[0.3rem] xl:tracking-[0.4rem] mb-4 md:mb-2 lg:mb-3 xl:mb-4 text-center md:text-start">PALING SERING DITANYAKAN</p>
                    <h2 className="mb-8 md:mb-4 xl:mb-8 3xl:mb-12 text-center md:text-start">Ada <span className="text-primary">Pertanyaan?</span></h2>
                    <FAQContent data={data} />
                </div>
            </div>
        </section>
    )
}
