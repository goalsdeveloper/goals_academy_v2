import GoalsButton from "@/Components/elements/GoalsButton";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

export default function Program({data}) {
    const categories = Array(...new Set(data.map(i => i.product_type.type)));

    const [selectedCat, setSelectedCat] = useState(categories[0]);

    const recommendationProductIds = [1, 2, 3, 4]

    return (
        <section className="w-[85vw] md:w-[80vw] mx-auto py-8 md:pt-[4vw] md:pb-[6.25vw] space-y-[5vw] md:space-y-[2.5vw]">
            <h2 className="text-[3.7vw] md:text-[1.8vw] text-center">
                Pilih Program Goals untuk {/* <br /> */}
                <span className="text-primary-40">Solusi Skripsimu</span>
            </h2>

            <div className="flex flex-col md:flex-row mx-auto gap-[2.1vw]">
                <div className="md:w-[20%] flex md:flex-col overflow-x-auto gap-[2.7vw] md:gap-0 pb-[1.6vw] scrollbar-hidden">
                    {/* <button
                        className={`${
                            selectedCat == "Rekomendasi" && "text-secondary border-b-[.2vw] md:border-b-0 border-secondary"
                        } md:h-[2.7vw] md:border-l-2 text-start text-nowrap text-[3.7vw] md:px-[1.2vw] md:text-[1vw] flex gap-x-[.5vw]`}
                        onClick={() => setSelectedCat("Rekomendasi")}
                    >
                        Rekomendasi <FiThumbsUp />
                    </button> */}
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
                    {selectedCat == "Rekomendasi" ? (
                        data.filter(i => recommendationProductIds.includes(i.id)).map((item, index) => (
                            <Card
                                key={index}
                                {...item}
                            />
                        ))
                    ) : (
                        data.filter(i => i.product_type.type == selectedCat).map((item, index) => (
                            <Card
                                key={index}
                                {...item}
                            />
                        ))
                    )}
                </div>
            </div>
            <div className="w-full md:flex md:justify-end">
                <GoalsButton isLink className="w-full md:w-auto" href="/produk">
                    Lihat Semua Program
                </GoalsButton>
            </div>
        </section>
    );
}

const Card = ({ id, name, facilities, price, promo_price, slug }) => {
    const currency = Intl.NumberFormat("id-ID");
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    let label = "";
    let labelClassName = "hidden";

    if (Number(promo_price) > 0) {
        label = "Promo"
        labelClassName = "bg-red-500 text-white"
    }

    if (id == 2 || id == 4) {
        label = "Rekomendasi"
        labelClassName = "bg-blue-500 text-white"
    } else if (id == 3) {
        label = "Paling Laris"
        labelClassName = "bg-green-500 text-white"
    }

    return (
        <div className="overflow-hidden relative border rounded-[3.7vw] md:rounded-[.8vw] p-[3.4vw] md:p-[1.2vw] md:w-[22vw] md:h-[20vw] space-y-[3.6vw] md:space-y-[1.6vw]">
            <div className={`w-[28.84vw] md:w-[8.34vw] text-center absolute top-0 right-0 text-[2.3vw] md:text-[1vw] px-[5.6vw] py-[.8vw] md:px-[1.2vw] md:py-[.4vw] rounded-es-[4vw] md:rounded-se-[.8vw] md:rounded-es-[.8vw] ${labelClassName}`}>
                {label}
            </div>

            <div className="space-y-[.4vw] mt-[2vw]">
                <h3 className="text-[3.2vw] md:text-[1vw] font-bold">
                    {name}
                </h3>
                <p className="text-[3.2vw] md:text-[1vw] font-medium space-x-[.5vw]">
                    {
                        Number(promo_price) > 0 ?
                            <span className="text-neutral-50 line-through decoration-black md:decoration-2 text-[2.7vw] md:text-[1vw]">
                                &nbsp;
                                {isMobile ? "" : " "}
                                Rp {currency.format(Number(price))}
                                {isMobile ? "" : " "}
                                &nbsp;
                            </span> : <></>
                    }
                    {isMobile ? <br /> : ""}
                    <span>Rp {currency.format(Number(price) - Number(promo_price))}</span>
                </p>
            </div>

            <hr />

            <ul className="space-y-[1vw] md:space-y-[.4vw] text-[2.7vw] md:text-[1vw] h-[13.5vw] md:h-[4.5vw] overflow-y-scroll pe-[.5vw]">
                {facilities.map(({ text, icon }, index) => (
                    <li key={index} className="flex items-center gap-[2vw] md:gap-[.75vw]">
                        <div className="w-[3vw] md:w-[1vw] flex justify-center">
                            <i className={`${icon} text-secondary`}></i>
                        </div>
                        <p>{text}</p>
                    </li>
                ))}
            </ul>

            <Link as="button" href={`/produk/${slug}`} className="relative text-[3.2vw] md:text-[1vw] p-[1vw] py-[2.7vw] md:px-[2vw] md:py-[.8vw] w-full bg-secondary hover:bg-primary text-white md:rounded-[.4vw] rounded-[1.2vw]">
                Daftar Sekarang
            </Link>
            {/* <GoalsButton className="w-full !text-[3.2vw] md:!text-[1vw] !p-[2vw] !py-[2.5vw] md:!p-[1vw] !font-normal md:!font-medium" href={`/produk/${slug}`}>
                Daftar Sekarang
            </GoalsButton> */}
        </div>
    )
}
