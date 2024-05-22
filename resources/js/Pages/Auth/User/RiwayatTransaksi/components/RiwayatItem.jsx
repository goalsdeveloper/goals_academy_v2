import GoalsButton from "@/Components/elements/GoalsButton";
import CountdownTimer from "@/Components/fragments/CountdownTimer";
import {
    ProductItemCardContent,
    ProductItemCardHeader,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import moment from "moment";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import DetailTransaksi from "../layouts/DetailTransaksi";
import TransactionStatusBadge from "./TransactionStatusBadge";
import { useMediaQuery } from "react-responsive";

function RiwayatItem({ data }) {
    const [isVisible, setIsVisible] = useState(false);

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const { expiry_time } = JSON.parse(
        Number(data.order_history[0]?.payload) || 0
    );
    const target = moment(expiry_time);

    return (
        <>
            <DetailTransaksi
                data={data}
                show={isVisible}
                setShow={setIsVisible}
            />

            <ProductItemCardLayout
                imageUrl={data.products.product_image}
                onClick={() => isMobile && setIsVisible(true)}
                className="cursor-pointer md:cursor-default"
            >
                <div className="flex justify-between items-center">
                    <div className="space-y-[1.8vw] w-full">
                        <ProductItemCardHeader className="md:justify-between gap-[3.7vw]">
                            <div className="flex gap-[.5vw] items-center">
                                <p className="hidden md:block text-[.8vw] font-medium text-neutral-50 ">
                                    #{data.order_code}
                                </p>

                                <TransactionStatusBadge data={data} />
                            </div>
                            {data.status != "Berhasil" ||
                                ("Success" && (
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
                                ))}
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
                                        data.status == "Berhasil" || "Success"
                                            ? "bordered"
                                            : "primary"
                                    }
                                >
                                    Lihat Detail
                                </GoalsButton>
                                {data.status == "Berhasil" ||
                                    (data.status == "Success" && (
                                        <GoalsButton
                                            isLink
                                            href={
                                                "/produk/" + data.products.slug
                                            }
                                        >
                                            Beli Lagi
                                        </GoalsButton>
                                    ))}
                                {data.status == "Pending" ? (
                                    <GoalsButton
                                        isLink
                                        href={"/purchase/" + data.order_code}
                                    >
                                        Bayar
                                    </GoalsButton>
                                ) : (
                                    ""
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
