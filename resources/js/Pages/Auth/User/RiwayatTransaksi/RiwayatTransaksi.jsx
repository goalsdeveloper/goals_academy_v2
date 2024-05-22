import UserLayout from "@/Layouts/UserLayout";
import "@/script/momentCustomLocale";
import { useState } from "react";
import { EmptyProductLayout } from "../Bimbingan/Bimbingan";
import ProductListFilter from "../ProductListFilter";
import { TransactionFilter } from "../constants";
import RiwayatItem from "./components/RiwayatItem";

export default function RiwayatTransaksi({ auth, dataOrder: data }) {
console.log(data)
    return (
        <UserLayout auth={auth} title="Riwayat Transaksi">
            <div className="flex md:block justify-between items-center space-y-[1.2vw]">
                <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-normal">
                    Riwayat Transaksi
                </h1>
            </div>

            {data.length == 0 ? (
                <EmptyProductLayout
                    description="Anda belum memiliki transaksi"
                    buttonTxt="Pilih Paket Program"
                    redirectUrl="/produk"
                />
            ) : (
                <div className="md:min-h-[22vw] flex flex-col gap-[2vw] md:gap-[1vw]">
                    {data.map((item, index) => {
                        return <RiwayatItem key={index} data={item} />;
                    })}
                </div>
            )}
        </UserLayout>
    );
}
