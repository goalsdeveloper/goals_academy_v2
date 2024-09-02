import GoalsButton from "@/Components/elements/GoalsButton";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Program({data}) {
    const [selectedCat, setSelectedCat] = useState('Rekomendasi');

    const categories = Array(...new Set(data.map(i => i.category.name)));

    return (
        <section className="w-[80vw] mx-auto py-8 space-y-[2.5vw]">
            <h2 className="text-[3.7vw] md:text-[1.8vw] text-center">
                Pilih Program Goals untuk {/* <br /> */}
                <span className="text-primary-40">Solusi Skripsimu</span>
            </h2>

            <div className="flex flex-col md:flex-row mx-auto gap-[2.1vw]">
                <div className="md:w-[20%] flex md:flex-col overflow-x-auto gap-[2.7vw] md:gap-0 pb-[1.6vw] scrollbar-hidden">
                    <button
                        className={`${
                            selectedCat == "Rekomendasi" && "text-secondary border-b-[.2vw] md:border-b-0 border-secondary"
                        } md:h-[2.7vw] md:border-l-2 text-start text-nowrap text-[3.7vw] md:px-[1.2vw] md:text-[1vw]`}
                        onClick={() => setSelectedCat("Rekomendasi")}
                    >
                        Rekomendasi
                    </button>
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className={`${
                                selectedCat == cat && "text-secondary border-b-[.2vw] md:border-b-0 border-secondary"
                            } md:h-[2.7vw] md:border-l-2 text-start text-nowrap text-[3.7vw] md:px-[1.2vw] md:text-[1vw]`}
                            onClick={() => setSelectedCat(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-[2vw]">
                    {data.filter(i => i.category.name == selectedCat).map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

const program_categories = [
    "Rekomendasi",
    "Sekali Pertemuan",
    "Paket Bimbingan",
    "Paket Prioritas",
    "Desk Review",
];

const Card = ({ name, facilities, price, promo_price, slug, label }) => {
    const currency = Intl.NumberFormat("id-ID");
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <div className="overflow-hidden relative border rounded-[3.7vw] md:rounded-[.8vw] p-[3.7vw] md:p-[1.2vw] md:w-[22vw] md:h-[20vw] space-y-[3.6vw] md:space-y-[1.6vw]">
            <div className={`${label ? "" : "hidden"} absolute top-0 right-0 text-[2.3vw] md:text-[.8vw] bg-green-400 text-white px-[5.6vw] md:px-[1.2vw] py-[.4vw] rounded-es-[4vw] md:rounded-se-[.8vw] md:rounded-es-[.8vw]`}>
                {label}
            </div>

            <div className="space-y-[.4vw] mt-[2vw]">
                <h3 className="text-[3.2vw] md:text-[1vw] font-bold line-clamp-1">
                    {name}
                </h3>
                <p className="text-[3.2vw] md:text-[1vw] font-medium">
                    Rp {currency.format(Number(price) - Number(promo_price))}
                </p>
            </div>

            <hr />

            <ul className="space-y-[.4vw] text-[3.2vw] md:text-[1vw] h-[13.5vw] md:h-[4.5vw] overflow-y-scroll scrollbar-hidden">
                {facilities.map(({ text, icon }, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <i className={`${icon} text-secondary`}></i>
                        <p>{text}</p>
                    </li>
                ))}
            </ul>

            {/* <button className="text-[3.2vw] md:text-[1vw] p-[1vw] md:px-[2vw] md:py-[.8vw] w-full bg-secondary text-white md:rounded-[.4vw] rounded-[1.2vw] py-[2.7vw]">
                Daftar Sekarang
            </button> */}
            <GoalsButton className="w-full" href={`/produk/${slug}`}>
                {isMobile ? "Daftar" : "Daftar Sekarang"}
            </GoalsButton>
        </div>
    )
}