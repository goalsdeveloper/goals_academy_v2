import GoalsButton from "@/Components/elements/GoalsButton";
import {
    ProductItemCardContent,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { EmptyProductLayout } from "../Bimbingan/Bimbingan";
import ProductListFilter from "../ProductListFilter";
import { ProductFilter } from "../constants";
import { detailWebinar } from "./data";
import { useMediaQuery } from "react-responsive";

const Webinar = ({ auth, orderWebinar }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <UserLayout auth={auth} title="Webinar">
            <UserLayout.Header>
                <UserLayout.Title title="Webinar" />

                {/* <ProductListFilter
                    setData={setData}
                    data={data}
                    filterList={ProductFilter}
                /> */}
            </UserLayout.Header>

            {orderWebinar.length == 0 ? (
                <EmptyProductLayout
                    description="Event belum tersedia"
                    buttonTxt="Kembali Ke Beranda"
                    redirectUrl="/produk"
                />
            ) : (
                <div className="md:min-h-[22vw] flex flex-col gap-[2vw] md:gap-[1vw]">
                    {orderWebinar.map((item, index) => {
                        return (
                            <ProductItemCardLayout
                                isLink
                                href={`webinar/${item.order_code}`}
                                key={index}
                                imageUrl={item.products.product_image}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="space-y-[1.8vw] w-full">
                                        <ProductItemCardContent>
                                            <div className="text-[2.7vw] md:text-[1vw] space-y-[.2vw]">
                                                <h2 className="text-[3.2vw] md:text-[1vw] font-medium mb-[.4vw]">
                                                    {item.products.name}
                                                </h2>
                                                <p className="text-neutral-40">
                                                    {item.products
                                                        .webinar_properties
                                                        ?.date !== undefined
                                                        ? new Date(
                                                              item.products.webinar_properties.date
                                                          ).toDateString()
                                                        : new Date(
                                                              item.products.webinar_properties.start_date
                                                          ).toDateString() +
                                                          " - " +
                                                          new Date(
                                                              item.products.webinar_properties.end_date
                                                          ).toDateString()}
                                                </p>
                                                <p className="text-neutral-40">
                                                    {item.products
                                                        .webinar_properties
                                                        ?.time
                                                        ? item.products
                                                              .webinar_properties
                                                              .time + " WIB"
                                                        : "Waktu Belum Ditentukan"}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/webinar/${item.order_code}`}
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
