import UserLayout from "@/Layouts/UserLayout";
import "@/script/momentCustomLocale";
import { useState } from "react";
import { EmptyProductLayout } from "../Bimbingan/Bimbingan";
import ProductListFilter from "../ProductListFilter";
import { TransactionFilter } from "../constants";
import RiwayatItem from "./components/RiwayatItem";
import { useMediaQuery } from "react-responsive";

export default function RiwayatTransaksi({ auth, dataOrder: data }) {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <UserLayout auth={auth} title="Riwayat Transaksi">
            <UserLayout.Header>
                <UserLayout.Title title="Riwayat Transaksi" />
            </UserLayout.Header>
            
            {data.length == 0 ? (
                <EmptyProductLayout
                    description="Anda belum memiliki transaksi"
                    buttonTxt="Pilih Paket Program"
                    redirectUrl="/produk"
                />
            ) : (
                <div className="md:min-h-[22vw] flex flex-col md:gap-[1vw]">
                    {data.map((item, index) => {
                        return <RiwayatItem key={index} data={item} />;
                    })}
                </div>
            )}
        </UserLayout>
    );
}
