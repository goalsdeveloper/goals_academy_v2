import React from "react";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import { FiX } from "react-icons/fi";

const DetailTransaksi = ({ data, show, setShow }) => {
    const currency = Intl.NumberFormat("id-ID");

    const statusClassMap = {
        Berhasil: "text-success-50",
        Pending: "text-warning-50",
        Gagal: "text-red-400",
    };

    return (
        <GoalsPopup show={show} setShow={setShow}>
            <div className="flex justify-between">
                <p className="text-[1.2vw] font-semibold">Detail Pesanan</p>
                <button onClick={() => setShow(!show)}>
                    <FiX className="text-[1.8vw]" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-[1.25vw]">
                <div className="space-y-[.2vw]">
                    <h3 className="h6 font-normal text-neutral-50">
                        Kode Pesanan
                    </h3>
                    <p className="text-[1vw] text-neutral-80 font-medium">
                        #{data.order_code}
                    </p>
                </div>
                <div className="space-y-[.2vw]">
                    <h3 className="h6 font-normal text-neutral-50">
                        Status Pesanan
                    </h3>
                    <p
                        className={`text-[1vw] font-medium ${
                            statusClassMap[data.status]
                        }`}
                    >
                        {data.status}
                    </p>
                </div>
                <div className="space-y-[.2vw]">
                    <h3 className="h6 font-normal text-neutral-50">
                        Waktu Pembayaran
                    </h3>
                    <p className="text-[1vw] text-neutral-80 font-medium">
                        {data.waktu_pembayaran || "-"}
                    </p>
                </div>
                <div className="space-y-[.2vw]">
                    <h3 className="h6 font-normal text-neutral-50">
                        Metode Pembayaran
                    </h3>
                    <p className="text-[1vw] text-neutral-80 font-medium">
                        {data.payment_method.name}
                    </p>
                </div>
                <div className="space-y-[.2vw]">
                    <h3 className="h6 font-normal text-neutral-50">
                        Jenis Produk
                    </h3>
                    <p className="text-[1vw] text-neutral-80 font-medium">
                        {data.products.name}
                    </p>
                </div>
                <div className="space-y-[.2vw]">
                    <h3 className="h6 font-normal text-neutral-50">
                        Harga Produk
                    </h3>
                    <p className="text-[1vw] text-neutral-80 font-medium">
                        Rp. {currency.format(data.unit_price)}
                    </p>
                </div>
                <div className="space-y-[.2vw]">
                    <h3 className="h6 font-normal text-neutral-50">
                        Add On Produk
                    </h3>
                    {data.form_result.add_on.map((item, index) => {
                        <p className="text-[1vw] text-neutral-80 font-medium">
                            {item}
                        </p>;
                    }) || "-"}
                </div>
                <div className="space-y-[.2vw]">
                    <h3 className="h6 font-normal text-neutral-50">
                        Harga Add On
                    </h3>
                    <p className="text-[1vw] text-neutral-80 font-medium">-</p>
                </div>
            </div>
        </GoalsPopup>
    );
};

export default DetailTransaksi;
