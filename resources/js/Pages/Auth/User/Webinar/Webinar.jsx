import figure from "/resources/img/figure/8.svg";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { EmptyProductLayout } from "../Bimbingan/Bimbingan";
import WebinarBgCard from "/resources/img/produk/webinar-card-bg.png";
import {
    ProductItemCardContent,
    ProductItemCardLayout,
} from "@/Components/ProductItemCard";
import GoalsButton from "@/Components/elements/GoalsButton";

const Webinar = ({ auth }) => {
    const data = [
        {
            id: 1,
            webinar: {
                name: "Webinar 1",
                date: "2022-08-12",
                time: "08:00",
            },
        },
        {
            id: 2,
            webinar: {
                name: "Webinar 2",
                date: "2022-08-12",
                time: "08:00",
            },
        },
        {
            id: 3,
            webinar: {
                name: "Webinar 3",
                date: "2022-08-12",
                time: "08:00",
            },
        },
    ];
    return (
        <UserLayout auth={auth} title="Webinar">
            {data.length == 0 ? (
                <EmptyProductLayout
                    description="Event belum tersedia"
                    buttonTxt="Kembali Ke Beranda"
                    redirectUrl="/produk"
                />
            ) : (
                // <div className="min-h-[60vh] md:min-h-[22vw] flex flex-col justify-center items-center gap-[4vw] md:gap-[2vw]">
                //     <img
                //         src={figure}
                //         alt=""
                //         className="h-[30vw] w-[30vw] md:h-[14vw] md:w-[14vw]"
                //     />
                //     <p className="text-[3vw] md:text-[1.5vw] md:text-secondary">
                //         Anda Belum Memiliki Transaksi
                //     </p>
                //     <Link
                //         href="/produk"
                //         className={`inline-block font-medium text-center py-[1.5vw] px-[2.5vw] md:py-[.5vw] md:px-[1vw] mt-[3vw] md:mt-0 border-[.2vw] border-secondary text-secondary hover:text-white rounded-full bg-white hover:bg-secondary cursor-pointer`}
                //     >
                //         Pilih Paket Program
                //     </Link>
                // </div>
                <div className="md:min-h-[22vw] flex flex-col gap-[6vw] md:gap-[1vw]">
                    {data.map((item, index) => {
                        return (
                            <ProductItemCardLayout
                                key={index}
                                imageUrl={WebinarBgCard}
                            >
                                <ProductItemCardContent>
                                    <div className="text-[1vw] space-y-[.2vw]">
                                        <h2 className="h5 font-medium mb-[.4vw]">
                                            {item.webinar.name}
                                        </h2>
                                        <p className="text-neutral-60">
                                            {new Date(
                                                item.webinar.date
                                            ).toDateString()}
                                        </p>
                                        <p className="text-neutral-60">
                                            {item.webinar.time
                                                ? item.webinar.time + " WIB"
                                                : "Waktu Belum Ditentukan"}
                                        </p>
                                    </div>
                                    <Link href="/webinar/1">
                                        <GoalsButton>Lihat Detail</GoalsButton>
                                    </Link>
                                </ProductItemCardContent>
                            </ProductItemCardLayout>
                        );
                    })}
                </div>
            )}
        </UserLayout>
    );
};

export default Webinar;
