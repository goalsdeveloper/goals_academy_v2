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

export default function Index({ auth, dataOrder }) {
    // console.log(dataOrder);
    const data = [
        {
            id: 1,
            status: "Berhasil",
            payment_time_limit: "24 Agustus 2023",
            products: {
                name: "Paket Program 1",
            },
        },
        {
            id: 2,
            status: "Menunggu",
            payment_time_limit: "24 Agustus 2023",
            products: {
                name: "Paket Program 2",
            },
        },
        {
            id: 3,
            status: "Menunggu",
            payment_time_limit: "24 Agustus 2023",
            products: {
                name: "Paket Program 3",
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
    return (
        <ProductItemCardLayout imageUrl={riwayatImg}>
            <ProductItemCardHeader className="justify-between">
                <div className="flex gap-[.5vw] items-center">
                    <p className="text-[.8vw] font-medium text-neutral-50">
                        #DBO123456789
                    </p>

                    <GoalsBadge
                        title={data.status}
                        className="bg-success-10 text-success-60"
                    />
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
                    <p className="text-neutral-60">Metode Pembayaran : Gopay</p>
                </div>

                <div className="space-x-[.5vw]">
                    <GoalsButton
                        variant={
                            data.status == "Berhasil" ? "bordered" : "primary"
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
    );
}
