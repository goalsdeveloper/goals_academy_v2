import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import figure from "/resources/img/figure/8.svg";
import CornerWaveVector from "@/Components/CornerWaveVector";
import "@/script/momentCustomLocale";
import { EmptyProductLayout } from "./Bimbingan/Bimbingan";
import riwayatImg from "/resources/img/produk/riwayat-pesanan-bg.png";
import {
    ProductItemCardContent,
    ProductItemCardHeader,
    ProductItemCardLayout,
} from "@/Components/ProductItemCard";
import GoalsBadge from "@/Components/elements/GoalsBadge";
import GoalsButton from "@/Components/elements/GoalsButton";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function Index({ auth, dataOrder }) {
    // console.log(dataOrder);
    const data = [
        {
            id: 1,
            status: "Berhasil",
            kode_pesanan: "DBO123456789",
            payment_time_limit: "24 Agustus 2023",
            waktu_pembayaran: "Selasa, 24 Agustus 2023",
            metode_pembayaran: "Bank Mandiri",
            products: {
                name: "Paket Program 1",
                harga: "Rp 175.000",
            },
        },
        {
            id: 2,
            status: "Menunggu",
            kode_pesanan: "DBO123456789",
            payment_time_limit: "24 Agustus 2023",
            waktu_pembayaran: "Selasa, 24 Agustus 2023",
            metode_pembayaran: "Bank Mandiri",
            products: {
                name: "Paket Program 2",
                harga: "Rp 175.000",
            },
        },
        {
            id: 3,
            status: "Menunggu",
            kode_pesanan: "DBO123456789",
            payment_time_limit: "24 Agustus 2023",
            waktu_pembayaran: "Selasa, 24 Agustus 2023",
            metode_pembayaran: "Bank Mandiri",
            products: {
                name: "Paket Program 3",
                harga: "Rp 175.000",
            },
        },
    ];
    // const data = dataOrder;

    return (
        <UserLayout auth={auth} title="Riwayat Transaksi">
            {data.length == 0 ? (
                <EmptyProductLayout
                    description="Anda belum memiliki transaksi"
                    buttonTxt="Pilih Paket Program"
                    redirectUrl="/produk"
                />
            ) : (
                <div className="md:min-h-[22vw] flex flex-col gap-[6vw] md:gap-[1vw]">
                    {data.map((item, index) => {
                        return <RiwayatItem key={index} data={item} />;
                    })}
                </div>
            )}
        </UserLayout>
    );
}

function RiwayatItem({ data }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            {isVisible && (
                <DetailTransaction
                    data={data}
                    show={isVisible}
                    setShow={setIsVisible}
                />
            )}
            <ProductItemCardLayout imageUrl={riwayatImg}>
                <ProductItemCardHeader className="justify-between">
                    <div className="flex gap-[.5vw] items-center">
                        <p className="text-[.8vw] font-medium text-neutral-50">
                            #DBO123456789
                        </p>

                        <TransactionStatusBadge data={data} />
                    </div>

                    {data.status != "Berhasil" && (
                        <p className="text-[.8vw] font-medium text-neutral-50">
                            Bisa dibayar sebelum :{" "}
                            <span className="text-black">
                                {data.payment_time_limit}
                            </span>
                        </p>
                    )}
                </ProductItemCardHeader>
                <ProductItemCardContent>
                    <div className="text-[1vw] space-y-[.2vw]">
                        <h2 className="h5 font-medium mb-[.4vw]">
                            {data.products.name}
                        </h2>
                        <p className="text-neutral-60">
                            Dibayar : Selasa, 24 Agustus 2023
                        </p>
                        <p className="text-neutral-60">
                            Metode Pembayaran : Gopay
                        </p>
                    </div>

                    <div className="space-x-[.5vw]">
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
            </ProductItemCardLayout>
        </>
    );
}

const TransactionStatusBadge = ({ data }) => {
    return (
        <GoalsBadge
            title={data.status}
            className={`${
                data.status == "Berhasil"
                    ? "bg-success-10 text-success-50"
                    : "bg-warning-10 text-warning-50"
            }`}
        />
    );
};

const DetailTransaction = ({ data, show, setShow }) => {
    console.log(data);

    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => {}}
            ></div>
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed left-0 flex flex-col gap-[2vw] w-full md:w-[30vw] h-[50vh] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh]`}
            >
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
                            {data.kode_pesanan}
                        </p>
                    </div>
                    <div className="space-y-[.2vw]">
                        <h3 className="h6 font-normal text-neutral-50">
                            Status Pesanan
                        </h3>
                        <p
                            className={`text-[1vw] ${
                                data.status == "Berhasil"
                                    ? "text-success-50"
                                    : "text-warning-50"
                            } font-medium`}
                        >
                            {data.status}
                        </p>
                    </div>
                    <div className="space-y-[.2vw]">
                        <h3 className="h6 font-normal text-neutral-50">
                            Waktu Pembayaran
                        </h3>
                        <p className="text-[1vw] text-neutral-80 font-medium">
                            {data.waktu_pembayaran}
                        </p>
                    </div>
                    <div className="space-y-[.2vw]">
                        <h3 className="h6 font-normal text-neutral-50">
                            Metode Pembayaran
                        </h3>
                        <p className="text-[1vw] text-neutral-80 font-medium">
                            {data.metode_pembayaran}
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
                            {data.products.harga}
                        </p>
                    </div>
                    <div className="space-y-[.2vw]">
                        <h3 className="h6 font-normal text-neutral-50">
                            Add On Produk
                        </h3>
                        <p className="text-[1vw] text-neutral-80 font-medium">
                            -
                        </p>
                    </div>
                    <div className="space-y-[.2vw]">
                        <h3 className="h6 font-normal text-neutral-50">
                            Harga Add On
                        </h3>
                        <p className="text-[1vw] text-neutral-80 font-medium">
                            -
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
