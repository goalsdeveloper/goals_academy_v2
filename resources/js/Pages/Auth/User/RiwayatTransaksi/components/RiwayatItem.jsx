import React from "react";
import {
    ProductItemCardHeader,
    ProductItemCardLayout,
    ProductItemCardContent,
} from "@/Components/fragments/ProductItemCard";
import { useState } from "react";
import moment from "moment";
import riwayatImg from "/resources/img/produk/riwayat-pesanan-bg.png";
import GoalsButton from "@/Components/elements/GoalsButton";
import { FiChevronRight } from "react-icons/fi";
import CountdownTimer from "@/Components/fragments/CountdownTimer";
import DetailTransaksi from "../layouts/DetailTransaksi";
import TransactionStatusBadge from "./TransactionStatusBadge";

function RiwayatItem({ data }) {
    const [isVisible, setIsVisible] = useState(false);

    const { expiry_time } = JSON.parse(data.order_history[0]?.payload || 0);
    const target = moment(expiry_time);

    return (
        <>
            <DetailTransaksi
                data={data}
                show={isVisible}
                setShow={setIsVisible}
            />

            <ProductItemCardLayout
                imageUrl={riwayatImg}
                onClick={() => setIsVisible(true)}
                className="cursor-pointer md:cursor-default"
            >
                <div className="flex justify-between items-center">
                    <div className="space-y-[1.8vw] w-full">
                        <ProductItemCardHeader className="md:justify-between gap-[3.7vw]">
                            <div className="flex gap-[.5vw] items-center">
                                <p className="hidden md:block text-[.8vw] font-medium text-neutral-50">
                                    #{data.order_code}
                                </p>

                                <TransactionStatusBadge data={data} />
                            </div>
                            {data.status != "Berhasil" && (
                                <div className="flex gap-[.5vw] items-center">
                                    <p className="hidden md:block text-[.8vw] font-medium text-neutral-50">
                                        Bisa dibayar sebelum :
                                    </p>
                                    <CountdownTimer
                                        targetDateTime={target.format(
                                            "YYYY-MM-DD HH:mm:ss"
                                        )}
                                    />
                                </div>
                            )}
                        </ProductItemCardHeader>
                        <ProductItemCardContent>
                            <div className="text-[2.7vw] md:text-[1vw] space-y-[.2vw]">
                                <h2 className="text-[3.2vw] md:text-[1vw] line-clamp-1 font-medium mb-[.4vw]">
                                    {data.products.name}
                                </h2>
                                <p className="text-neutral-60">
                                    Dibayar : Selasa, 24 Agustus 2023
                                </p>
                                <p className="text-neutral-60">
                                    Metode Pembayaran -{" "}
                                    {data.payment_method.name}
                                </p>
                            </div>

                            <div className="hidden md:block space-x-[.5vw]">
                                <GoalsButton
                                    onClick={() => setIsVisible(!isVisible)}
                                    variant={
                                        data.status == "Berhasil"
                                            ? "bordered"
                                            : "primary"
                                    }
                                >
                                    Lihat Detail
                                </GoalsButton>

                                {data.status == "Berhasil" && (
                                    <GoalsButton>Beli Lagi</GoalsButton>
                                )}
                            </div>
                        </ProductItemCardContent>
                    </div>

                    <FiChevronRight className="md:hidden text-[4.5vw] text-secondary" />
                </div>
            </ProductItemCardLayout>
        </>
    );
}

export default RiwayatItem;
