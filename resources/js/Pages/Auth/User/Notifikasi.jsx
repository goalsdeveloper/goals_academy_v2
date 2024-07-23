import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import figure from "/resources/img/figure/8.svg";
import "@/script/momentCustomLocale";

export default function Index({ auth, notifications }) {
    const data = notifications;

    return (
        <UserLayout auth={auth} title="Notifikasi">
            {data.length == 0 ? (
                <div className="min-h-[60vh] md:min-h-[22vw] flex flex-col justify-center items-center gap-[6vw] md:gap-[2vw]">
                    <img
                        src={figure}
                        alt=""
                        className="h-[30vw] w-[30vw] md:h-[14vw] md:w-[14vw]"
                    />
                    <p className="text-[3vw] md:text-[1.5vw] md:text-secondary">
                        Anda Belum Memiliki Notifikasi
                    </p>
                </div>
            ) : (
                <div className="md:min-h-[22vw] flex flex-col gap-[6vw] md:gap-[2vw]">
                    {data.map((item, index) => {
                        return <NotifikasiItem key={index} item={item} />;
                    })}
                </div>
            )}
        </UserLayout>
    );
}

function NotifikasiItem({ item }) {
    if (item.data.category == "Transaksi") {
        return (
            <Link
                href=""
                className="relative w-full flex justify-between items-center shadow-centered-spread rounded-[1vw] p-[4vw] md:p-[2vw] hover:bg-soft"
            >
                <div className="flex flex-col w-11/12 gap-[2vw] md:gap-[.5vw]">
                    <span className="bg-secondary text-white text-center rounded-[1vw] md:rounded-[.3vw] w-4/12 md:w-2/12 py-[.5vw] md:py-[.1vw] text-[2.75vw] md:text-[.95vw]">
                        {item.data.category}
                    </span>
                    <div className="flex items-center gap-[2vw] md:gap-[.5vw]">
                        <img
                            src={`/img/purchase/${item.data.payment_method.toLowerCase()}.png`}
                            className="w-[10vw] h-[10vw] md:w-[4.5vw] md:h-[4.5vw]"
                            alt={item.data.payment_method}
                        />
                        <div>
                            <h4 className="text-secondary font-normal font-sans text-[3.5vw] md:text-[1.7vw]">
                                {item.data.title}
                            </h4>
                            <table className="text-[2.5vw] md:text-[.95vw]">
                                <tbody>
                                    <tr>
                                        <td>Bayar Sebelum</td>
                                        <td className="ps-[2vw] pe-[.5vw]">
                                            :
                                        </td>
                                        <td>
                                            {moment(
                                                item.data.expiry_time
                                            ).format("DD MMMM YYYY, HH:mm")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Kode Pesanan</td>
                                        <td className="ps-[2vw] pe-[.5vw]">
                                            :
                                        </td>
                                        <td>{item.data.order_id}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        item.data.read_at ? "hidden" : ""
                    } bg-secondary rounded-full w-[3.5vw] h-[3.5vw] md:w-[1.3vw] md:h-[1.3vw] md:me-[1vw]`}
                ></div>
            </Link>
        );
    } else {
        return (
            <Link
                href=""
                className="relative w-full flex justify-between items-center shadow-centered-spread rounded-[1vw] p-[4vw] md:p-[2vw] hover:bg-soft"
            >
                <div className="flex flex-col w-11/12 gap-[2vw] md:gap-[.5vw]">
                    <span className="bg-secondary text-white text-center rounded-[1vw] md:rounded-[.3vw] w-4/12 md:w-2/12 py-[.5vw] md:py-[.1vw] text-[2.75vw] md:text-[.95vw]">
                        {item.data.category}
                    </span>
                    <div>
                        <h4 className="text-secondary font-normal font-sans text-[3.5vw] md:text-[1.7vw]">
                            {item.data.title}
                        </h4>
                        <div className="text-[2.5vw] md:text-[.95vw]">
                            {item.data.description}
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        item.read_at ? "hidden" : ""
                    } bg-secondary rounded-full w-[3.5vw] h-[3.5vw] md:w-[1.3vw] md:h-[1.3vw] md:me-[1vw]`}
                ></div>
            </Link>
        );
    }
}
