import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import figure from "/resources/img/user/empty-program.png";

export default function Index ({ auth }) {
    return (
        <UserLayout auth={auth} title="Pembelajaran Saya">
            <div className="min-h-[21vw] flex flex-col justify-center items-center gap-[2vw]">
                <img src={figure} alt="" className="h-[10vw] w-[10vw]" />
                <p className="text-[1.5vw] text-secondary">Anda Belum Memiliki Program</p>
                <Link
                    href="/produk"
                    className={`inline-block font-medium text-center py-[.5vw] px-[1vw] border-[.2vw] border-secondary text-secondary hover:text-white rounded-full bg-white hover:bg-secondary cursor-pointer`}
                >
                    Pilih Paket Program
                </Link>
            </div>
        </UserLayout>
    )
}
