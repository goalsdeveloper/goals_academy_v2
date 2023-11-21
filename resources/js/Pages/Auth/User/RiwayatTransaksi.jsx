import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import figure from "/resources/img/figure/8.svg";
import CornerWaveVector from "@/Components/CornerWaveVector";
import "@/script/momentCustomLocale";

export default function Index ({ auth }) {
    const data = [
        {
            id: 1,
            order_id: 'GA12345678',
            purchase_method: 'Gopay',
            expiry_time: '2023-12-01 17:00:00',
            status: 'pending'
        },
        {
            id: 2,
            order_id: 'GA19182634',
            purchase_method: 'Mandiri',
            expiry_time: '2023-12-23 15:00:00',
            status: 'success'
        },
        {
            id: 3,
            order_id: 'GA01293494',
            purchase_method: 'BRI',
            expiry_time: '2023-11-05 12:00:00',
            status: 'failure'
        },
    ]

    return (
        <UserLayout auth={auth} title="Riwayat Transaksi">
            {data.length == 0 ? (
                <div className="min-h-[60vh] md:min-h-[22vw] flex flex-col justify-center items-center gap-[4vw] md:gap-[2vw]">
                    <img src={figure} alt="" className="h-[30vw] w-[30vw] md:h-[14vw] md:w-[14vw]" />
                    <p className="text-[3vw] md:text-[1.5vw] md:text-secondary">Anda Belum Memiliki Transaksi</p>
                    <Link
                        href="/produk"
                        className={`inline-block font-medium text-center py-[1.5vw] px-[2.5vw] md:py-[.5vw] md:px-[1vw] mt-[3vw] md:mt-0 border-[.2vw] border-secondary text-secondary hover:text-white rounded-full bg-white hover:bg-secondary cursor-pointer`}
                    >
                        Pilih Paket Program
                    </Link>
                </div>
            ) : (
                <div className="md:min-h-[22vw] flex flex-col gap-[6vw] md:gap-[1vw]">
                    {data.map((item, index) => {
                        return (
                            <Item key={index} data={item} />
                        )
                    })}
                </div>
            )}
        </UserLayout>
    )
}

function Item ({ data }) {
    return (
        <div className="relative w-full flex flex-col gap-[2vw] md:gap-[1vw] bg-secondary text-white rounded-[1vw] p-[6vw] md:p-[2vw]">
            <p className="font-poppins text-[3vw] md:text-[.95vw]">#{data.order_id}</p>
            <hr className="border-1 border-white" />
            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-[4vw] md:gap-0">
                <div className="w-full flex items-center md:w-8/12 gap-[2vw] md:gap-[1vw]">
                    <div className="w-[11vw] h-[11vw] md:w-[5vw] md:h-[5vw] flex justify-center items-center rounded-[1vw] md:rounded-[.75vw] bg-white">
                        <img src={`/img/purchase/${data.purchase_method.toLowerCase()}.png`} alt={data.purchase_method} className="w-9/12" />
                    </div>
                    <div>
                        <h4 className="text-white font-normal font-sans text-[3.5vw] md:text-[1.5vw]">Metode Pembayaran {data.purchase_method}</h4>
                        <table className="border-separate border-spacing-y-[.25vw] text-[2.5vw] md:text-[.8vw]">
                            <tbody>
                                <tr>
                                    <td>Bayar Sebelum</td>
                                    <td className="ps-[1vw] pe-[.5vw]">:</td>
                                    <td>{moment(data.expiry_time).format('DD MMMM YYYY, HH:mm')}</td>
                                </tr>
                                <tr>
                                    <td>Status Pembayaran</td>
                                    <td className="ps-[1vw] pe-[.5vw]">:</td>
                                    <td>
                                        {data.status == 'pending' ? (
                                            'Menunggu Pembayaran'
                                        ) : (
                                            data.status == 'success' ? (
                                                'Sudah Dibayar'
                                            ) : (
                                                'Pembayaran Gagal'
                                            )
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Link href={data.status == 'pending' ? `/purchase/${data.order_id}` : `/purchase/detail/${data.order_id}`} className="w-4/12 h-[6vw] md:w-[30%] md:h-[3vw] cursor-pointer">
                    <ButtonHoverSlide className={`h-full md:before:p-0.5 lg:before:p-1 xl:before:p-1.5 3xl:before:p-2 before:content-arrow-right-secondary-20 xs:before:content-arrow-right-secondary-32 md:before:content-arrow-right-secondary-20 xl:before:content-arrow-right-secondary-24 3xl:before:content-arrow-right-secondary-32 ${data.status == 'pending' ? 'after:content-pay' : 'after:content-detail'} after:text-white after:text-[2.5vw] md:after:text-[1vw] medium border-1 xl:border-2 border-white rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-white`}></ButtonHoverSlide>
                </Link>
            </div>
        </div>
    )
}
