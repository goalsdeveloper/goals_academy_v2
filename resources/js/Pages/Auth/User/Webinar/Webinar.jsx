import figure from "/resources/img/figure/8.svg";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { EmptyProductLayout } from "../Bimbingan/Bimbingan";
import WebinarBgCard from "/resources/img/produk/webinar-card-bg.png";
import {
    ProductItemCardContent,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import GoalsButton from "@/Components/elements/GoalsButton";
import { FiChevronRight } from "react-icons/fi";
import ProductListFilter from "../ProductListFilter";
import { useState } from "react";
import { ProductFilter } from "../constants";

const Webinar = ({ auth, orderWebinar }) => {
    const [data, setData] = useState(orderWebinar);

    return (
        <UserLayout auth={auth} title="Webinar">
            <div className="flex md:block justify-between items-center space-y-[1.2vw]">
                <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-normal">
                    {/* {title == "Dashboard" ? "Pembelajaran Saya" : title} */}
                    Webinar
                </h1>
                <ProductListFilter
                    setData={setData}
                    data={data}
                    filterList={ProductFilter}
                />
            </div>
            {data.length == 0 ? (
                <EmptyProductLayout
                    description="Event belum tersedia"
                    buttonTxt="Kembali Ke Beranda"
                    redirectUrl="/produk"
                />
            ) : (
                <div className="md:min-h-[22vw] flex flex-col gap-[2vw] md:gap-[1vw]">
                    {data.map((item, index) => {
                        return (
                            <ProductItemCardLayout
                                isLink
                                href={`webinar/${item.products.slug}`}
                                key={index}
                                imageUrl={item.products.product_image}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="space-y-[1.8vw] w-full">
                                        <ProductItemCardContent>
                                            <div className="text-[2.7vw] md:text-[1vw] space-y-[.2vw]">
                                                <h2 className="text-[3.2vw] md:text-[1vw] font-medium mb-[.4vw]">
                                                    {item.products.name}
                                                </h2>
                                                <p className="text-neutral-40">
                                                    {new Date(
                                                        item.products.date
                                                    ).toDateString()}
                                                </p>
                                                <p className="text-neutral-40">
                                                    {item.products.time
                                                        ? item.products.time +
                                                          " WIB"
                                                        : "Waktu Belum Ditentukan"}
                                                </p>
                                            </div>
                                            <Link
                                                href="/webinar/1"
                                                className="hidden md:block"
                                            >
                                                <GoalsButton>
                                                    Lihat Detail
                                                </GoalsButton>
                                            </Link>
                                        </ProductItemCardContent>
                                    </div>
                                    <FiChevronRight className="md:hidden text-[4.5vw] text-secondary" />
                                </div>
                            </ProductItemCardLayout>
                        );
                    })}
                </div>
            )}
        </UserLayout>
    );
};

export default Webinar;
