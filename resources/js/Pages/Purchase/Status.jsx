import { useEffect, useState } from "react";
import moment from 'moment/moment';
import MainLayout from "@/Layouts/MainLayout";
import ExpandedButton from "@/Components/ExpandedButton";
import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import { Link } from "@inertiajs/react";
import { useRef } from "react";

export default function Status({ auth, data }) {
    const [showTutorial, setShowTutorial] = useState(false)
    const [countdown, setCountdown] = useState(moment().hours(0).minutes(0).seconds(0));
    const currency = Intl.NumberFormat('id-ID')
    const target = moment('2023-10-25 24:00:00');
    const [purchaseStatus, setPurchaseStatus] = useState('pending')

    let countdownInterval = useRef()

    const startCountdown = () => {
        countdownInterval.current = setInterval(() => {
            const difference = target.diff(moment());
            if (difference <= 1) {
                clearInterval(countdownInterval.current)
                setCountdown(moment().hours(0).minutes(0).seconds(0));
                alert('Waktu Pembayaran Telah Habis!')
            } else {
                const remaining = moment();

                remaining.hours(Math.floor(difference  / (1000*60*60)));
                remaining.minutes(Math.floor(difference % (1000*60*60) / (1000*60)));
                remaining.seconds(Math.floor(difference % (1000*60*60) % (1000*60) / (1000)));

                console.log(remaining.format('HH:mm:ss'))
                setCountdown(remaining);
            }
        }, 1000);
    }

    useEffect(() => {
        startCountdown()
        return () => {
            clearInterval(countdownInterval.current)
        }
    }, [])

    moment.updateLocale('id', {
        weekdays : [
            "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"
        ]
    });
    const date = moment(data.created_at).locale('id').format('dddd, YYYY-MM-DD')

    return (
        <MainLayout auth={auth} title="Purchase">
            <section
                id="purchase-form"
                className="mb-16 xs:mb-20 md:mb-16 lg:mb-20 xl:mb-24 3xl:mb-32"
            >
                <div className="container mx-auto pt-4 flex flex-col gap-12 items-center">
                    <div className="w-1/2 relative shadow-centered-spread rounded-2xl p-6 flex flex-col items-center gap-4 h-fit overflow-hidden">
                        <div className="flex w-[200%] duration-1000 translate-x-1/4 overflow-hidden">
                            <h5 className="w-1/2 text-center text-green-500 font-bold">Status : Pembayaran Berhasil</h5>
                            <h5 className="w-1/2 text-center text-secondary font-bold">Status : Menunggu Pembayaran</h5>
                        </div>
                        <hr className="w-full duration-1000 border-green-500" />
                        <div className="w-full h-[22vw]">
                            <div className={"w-full h-full flex justify-center items-center gap-4 duration-1000"}>
                                <svg className="h-[16vw] fill-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/></svg>
                            </div>
                            {/* <div className={`w-full flex flex-col items-center gap-4 duration-1000`}>
                                <div className="w-full h-[14vw] flex justify-center items-center">
                                    {1 ? (
                                        <div className="text-center">
                                            <h5 className="font-medium">Nomor VA Mandiri :</h5>
                                            <h2
                                            className="leading-loose cursor-pointer"
                                            onClick={() => {
                                                navigator.clipboard.writeText('8902801272925499')
                                                alert('Text copied!')
                                            }}
                                            >
                                                8902801272925499
                                            </h2>
                                            <p
                                            className="font-medium hover:text-primary cursor-pointer"
                                            onClick={() => {
                                                navigator.clipboard.writeText('8902801272925499')
                                                alert('Text copied!')
                                            }}>
                                                <i className="bi bi-copy"></i> Salin
                                            </p>
                                        </div>
                                    ) : (
                                        <img src="https://www.researchgate.net/profile/Hafiza-Abas/publication/288303807/figure/fig1/AS:311239419940864@1451216668048/An-example-of-QR-code.png" className="h-full" alt="" />
                                    )}
                                </div>
                                <hr className="w-full border-light-grey" />
                                <table className="w-full text-center font-poppins">
                                    <tbody>
                                        <tr className="font-bold text-[3vw]">
                                            <td className="w-3/12">{countdown.format('HH')}</td>
                                            <td>:</td>
                                            <td className="w-3/12">{countdown.format('mm')}</td>
                                            <td>:</td>
                                            <td className="w-3/12">{countdown.format('ss')}</td>
                                        </tr>
                                        <tr className="text-[1vw]">
                                            <td>Jam</td>
                                            <td></td>
                                            <td>Menit</td>
                                            <td></td>
                                            <td>Detik</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> */}
                        </div>
                        <hr className="w-full border-dark" />
                    </div>
                    <div className="w-1/2 relative shadow-centered-spread rounded-2xl p-6 flex flex-col items-center gap-6 h-fit">
                        <hr className="w-full border-light-grey" />
                        <table className="w-full font-poppins border-separate border-spacing-y-4 -my-4">
                            <tbody>
                                <tr>
                                    <td>Metode Pembayaran</td>
                                    <td className="flex justify-end items-center gap-2 font-semibold">Gopay <img className="w-[10%]" src={`/img/purchase/${'gopay'}.png`} alt="" /></td>
                                </tr>
                                <tr>
                                    <td>ID Transaksi</td>
                                    <td className="flex justify-end items-center gap-2 font-semibold">{data.order_code}</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Transaksi</td>
                                    <td className="flex justify-end items-center gap-2 font-semibold">
                                        {date}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total Pembelian</td>
                                    <td className="flex justify-end items-center gap-2 font-semibold">IDR {currency.format(data.unit_price)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr className="w-full border-light-grey" />
                        <div className="w-full block">
                            <ExpandedButton borderClassName="border-1 border-dark" textClassName="font-medium text-dark" icon={`fa-solid fa-chevron-down duration-500 ${showTutorial ? '-rotate-180' : ''}`} onClick={() => setShowTutorial(!showTutorial)}>
                                Lihat Langkah Pembayaran
                            </ExpandedButton>
                            <TECollapse show={showTutorial} className="relative w-[110%] -ms-[5%] px-[4%] shadow-none -translate-y-2">
                                <TECollapseItem className="grid gap-4 px-1">
                                    <div className="border-1 border-dark rounded-md p-3">
                                        <p className="font-bold">1. Transaksi melalui Desktop</p>
                                        <p>Berikut langkah pembayaran menggunakan GoPay melalui Desktop:</p>
                                        <ul>
                                            <li>Buka aplikasi Gojek pada smarhphone Anda</li>
                                            <li>Klik "Pay" dan "Scan" QR Code</li>
                                            <li>Periksa detail pembayaran lalu klik "Confirm & Pay"</li>
                                            <li>Masukkan "PIN" GoPay Anda</li>
                                            <li>Pembayaran selesai</li>
                                        </ul>
                                    </div>
                                    <div className="border-1 border-dark rounded-md p-3">
                                        <p className="font-bold">2. Transaksi melalui Mobile</p>
                                        <p>Berikut langkah pembayaran menggunakan GoPay melalui Mobile:</p>
                                        <ul>
                                            <li>Buka aplikasi Gojek pada smarhphone Anda</li>
                                            <li>Klik "Pay" dan "Scan" QR Code</li>
                                            <li>Periksa detail pembayaran lalu klik "Confirm & Pay"</li>
                                            <li>Masukkan "PIN" GoPay Anda</li>
                                            <li>Pembayaran selesai</li>
                                        </ul>
                                    </div>
                                </TECollapseItem>
                            </TECollapse>
                        </div>
                        <div className="z-10 w-full overflow-hidden grid grid-cols-2 border-1 xl:border-2 border-primary font-poppins rounded-full">
                            <Link href="/produk" className="p-1.5 md:p-2 xl:p-2 3xl:p-3 font-medium text-center bg-white text-primary">Belanja Lagi</Link>
                            <Link href="#" className="p-1.5 md:p-2 xl:p-2 3xl:p-3 font-medium text-center bg-primary text-white">Cek Status Transaksi</Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
