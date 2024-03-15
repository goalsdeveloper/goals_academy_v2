import React from "react";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import { FiChevronLeft, FiX } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import { Link } from "@inertiajs/react";

const DetailTransaksi = ({ data, show, setShow }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <>
            {isMobile && show ? (
                <div className="pt-[20.5vw] md:hidden bg-white w-full h-screen fixed left-0 z-[40] top-0">
                    <div className="container mx-auto space-y-[5.5vw]">
                        <Link
                            href="/riwayat_transaksi"
                            className="flex items-center gap-[1.5vw] text-black"
                            onClick={() => setShow()}
                        >
                            <FiChevronLeft className="md:hidden text-[4vw]" />
                            <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                                Detail Transaksi
                            </h1>
                        </Link>
                        <div className="grid grid-cols-2 gap-[1.8vw] md:gap-[1.25vw]">
                            <TransactionDetailContent data={data} />
                        </div>
                    </div>
                </div>
            ) : (
                <GoalsPopup show={show} setShow={setShow}>
                    <div className="flex justify-between">
                        <p className="text-[1.2vw] font-semibold">
                            Detail Pesanan
                        </p>
                        <button onClick={() => setShow(!show)}>
                            <FiX className="text-[1.8vw]" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-[1.8vw] md:gap-[1.25vw]">
                        <TransactionDetailContent data={data} />
                    </div>
                </GoalsPopup>
            )}
        </>
    );
};

const TransactionDetailContent = ({ data }) => {
    const currency = Intl.NumberFormat("id-ID");

    const statusClassMap = {
        Berhasil: "text-success-50",
        Pending: "text-warning-50",
        Gagal: "text-red-400",
    };

    return (
        <>
            <div className="space-y-[.2vw]">
                <h3 className="text-[2.8vw] md:text-[0.8vw]  font-normal text-neutral-50">
                    Kode Pesanan
                </h3>
                <p className="text-[3.7vw] md:text-[1vw] text-neutral-80 font-medium">
                    #{data.order_code}
                </p>
            </div>
            <div className="space-y-[.2vw]">
                <h3 className="text-[2.8vw] md:text-[0.8vw]  font-normal text-neutral-50">
                    Status Pesanan
                </h3>
                <p
                    className={`text-[3.7vw] md:text-[1vw] font-medium ${
                        statusClassMap[data.status]
                    }`}
                >
                    {data.status}
                </p>
            </div>
            <div className="space-y-[.2vw]">
                <h3 className="text-[2.8vw] md:text-[0.8vw]  font-normal text-neutral-50">
                    Waktu Pembayaran
                </h3>
                <p className="text-[3.7vw] md:text-[1vw] text-neutral-80 font-medium">
                    {data.waktu_pembayaran || "-"}
                </p>
            </div>
            <div className="space-y-[.2vw]">
                <h3 className="text-[2.8vw] md:text-[0.8vw]  font-normal text-neutral-50">
                    Metode Pembayaran
                </h3>
                <p className="text-[3.7vw] md:text-[1vw] text-neutral-80 font-medium">
                    {data.payment_method.name}
                </p>
            </div>
            <div className="space-y-[.2vw]">
                <h3 className="text-[2.8vw] md:text-[0.8vw]  font-normal text-neutral-50">
                    Jenis Produk
                </h3>
                <p className="text-[3.7vw] md:text-[1vw] text-neutral-80 font-medium">
                    {data.products.name}
                </p>
            </div>
            <div className="space-y-[.2vw]">
                <h3 className="text-[2.8vw] md:text-[0.8vw]  font-normal text-neutral-50">
                    Harga Produk
                </h3>
                <p className="text-[3.7vw] md:text-[1vw] text-neutral-80 font-medium">
                    Rp. {currency.format(data.unit_price)}
                </p>
            </div>
            <div className="space-y-[.2vw]">
                <h3 className="text-[2.8vw] md:text-[0.8vw]  font-normal text-neutral-50">
                    Add On Produk
                </h3>
                {data.form_result.add_on.map((item, index) => {
                    <p className="text-[3.7vw] md:text-[1vw] text-neutral-80 font-medium">
                        {item}
                    </p>;
                }) || "-"}
            </div>
            <div className="space-y-[.2vw]">
                <h3 className="text-[2.8vw] md:text-[0.8vw]  font-normal text-neutral-50">
                    Harga Add On
                </h3>
                <p className="text-[3.7vw] md:text-[1vw] text-neutral-80 font-medium">
                    -
                </p>
            </div>
        </>
    );
};

export default DetailTransaksi;