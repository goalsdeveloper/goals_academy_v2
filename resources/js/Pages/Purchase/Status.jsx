import { useEffect, useState } from "react";
import moment from "moment";
import MainLayout from "@/Layouts/MainLayout";
import ExpandedButton from "@/Components/ExpandedButton";
import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import { Link } from "@inertiajs/react";
import { useRef } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import "@/script/momentCustomLocale";
import GoalsButton from "@/Components/GoalsButton";

export default function Status({
    auth,
    data,
    orderHistory,
    paymentMethod,
    paymentName,
    bankName,
    status,
}) {
    const { toasts } = useToasterStore();
    const TOAST_LIMIT = 1;
    const vaNumber = orderHistory.va_numbers ? orderHistory.va_numbers[0].va_number : orderHistory.permata_va_number
    const [countdown, setCountdown] = useState(
        moment().hours(0).minutes(0).seconds(0)
    );
    const currency = Intl.NumberFormat("id-ID");
    const target = moment(orderHistory.expiry_time);
    const [purchaseStatus, setPurchaseStatus] = useState(status);
    const [redirectAt, setRedirectAt] = useState(12);

    function redirectToWhatsApp () {
        setRedirectAt((i) => {
            if (i > 0) {
                setTimeout(() => redirectToWhatsApp(), 1000)
            } else if (i == 0) {
                open(`https://api.whatsapp.com/send?phone=6282147638286&text=Halo%20min%2C%20saya%20sudah%20melakukan%20pembayaran%20produk%20${data.products.name.replaceAll(' ', '%20')}%20dengan%20order%20id%20${data.order_code}.`, '_blank')
            }
            return i-1
        })
    }

    let paymentSteps = {
        desktop: [
            'Buka aplikasi pembayaran pada smartphone Anda',
            'Klik tombol untuk scan QR Code',
            'Periksa detail pembayaran lalu tekan tombol bayar',
            'Masukkan PIN/password Anda',
            'Pembayaran selesai'
        ],
        mobile: [
            'Catat atau salin nomor Virtual Account yang Anda dapat',
            `Lakukan pembayaran melalui ATM ${paymentMethod.name}, Internet Banking, atau Mobile Banking`,
            'Masukkan PIN Anda',
            'Pilih \'Transfer ke Virtual Account\'',
            'Masukkan nomor Virtual Account yang Anda dapat',
            'Saat pembayaran berhasil, Anda akan langsung diarahkan ke halaman Status Pembayaran'
        ]
    }

    if (paymentMethod.name.toLowerCase() == "gopay") {
        paymentSteps = {
            desktop: [
                'Buka aplikasi Gojek dan klik “Bayar”',
                'Scan Kode QR dari layar HP Anda',
                'Klik “Konfirmasi & Bayar”',
                'Masukkan PIN Anda',
                'Pembayaran Anda Berhasil',
                'Saat pembayaran berhasil, periksa status pembayaran Anda di halaman Status Pembayaran'
            ],
            mobile: [
                'Unduh Kode QR yang diberikan',
                'Buka aplikasi GoPay',
                'Klik tombol “Bayar”',
                'Klik ikon gallery',
                'Pilih Kode QR yang telah diunduh',
                'Klik “Konfirmasi & Bayar”',
                'Masukkan PIN Anda',
                'Pembayaran Anda Berhasil',
                'Saat pembayaran berhasil, periksa status pembayaran Anda di halaman Status Pembayaran'
            ]
        }
    } else if (paymentMethod.name.toLowerCase() == 'qris') {
        paymentSteps = {
            desktop: [
                'Buka aplikasi pembayaran lalu klik “Bayar”',
                'Scan Kode QRIS dari layar HP Anda',
                'Klik “Konfirmasi & Bayar”',
                'Masukkan PIN Anda',
                'Pembayaran Anda Berhasil',
                'Saat pembayaran berhasil, periksa status pembayaran Anda di halaman Status Pembayaran'
            ],
            mobile: [
                'Unduh Kode QRIS yang diberikan',
                'Buka aplikasi pembayaran Anda',
                'Klik tombol “Bayar”',
                'Klik ikon gallery',
                'Pilih Kode QRIS yang telah diunduh',
                'Klik “Konfirmasi & Bayar”',
                'Masukkan PIN Anda',
                'Pembayaran Anda Berhasil',
                'Saat pembayaran berhasil, periksa status pembayaran Anda di halaman Status Pembayaran'
            ]
        }
    }

    const playCountdown = () => {
        setTimeout(() => {
            fetch(`/api/check-payment-status/${data.order_code}`)
                .then((response) => response.json())
                .then((response) => {
                    setPurchaseStatus(response.status.toLowerCase())
                    const difference = target.diff(moment());
                    if (response.status.toLowerCase() == "success") {
                        setCountdown(moment().hours(0).minutes(0).seconds(0));
                        redirectToWhatsApp()
                    } else if (difference <= 1) {
                        setCountdown(moment().hours(0).minutes(0).seconds(0));
                        location.href = "/";
                        toast.error("Waktu Pembayaran Telah Habis!");
                    } else {
                        const remaining = moment();
        
                        remaining.hours(Math.floor(difference / (1000 * 60 * 60)));
                        remaining.minutes(
                            Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                        );
                        remaining.seconds(
                            Math.floor(
                                ((difference % (1000 * 60 * 60)) % (1000 * 60)) / 1000
                            )
                        );
        
                        setCountdown(remaining);

                        playCountdown()
                    }
                }
            );
        }, 1000);
    };

    useEffect(() => {
        playCountdown();
    }, []);

    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .forEach((t, i) => {
                if (i >= TOAST_LIMIT) {
                    toast.remove(t.id); // Dismiss – Use toast.remove(t.id) for no exit animation
                }
            }) // Is toast index over limit?
    }, [toasts]);

    return (
        <MainLayout auth={auth} title="Purchase">
            <Toaster />
            <section
                id="purchase-form"
                className="mb-16 xs:mb-20 md:mb-16 lg:mb-20 xl:mb-24 3xl:mb-32"
            >
                <div className="md:container mx-auto pt-[16vw] md:pt-[1vw] flex flex-col gap-[4vw] md:gap-[3vw] items-center text-[3.5vw] md:text-[1vw]">
                    <div className="w-full md:w-1/2 relative md:shadow-centered-spread md:rounded-[1vw] md:p-[1.5vw] h-fit overflow-hidden">
                        <div className="container md:w-full mx-auto flex flex-col items-center gap-[4vw] md:gap-[1vw] overflow-hidden">
                            <div
                                className={`flex w-[200%] duration-1000 overflow-hidden ${
                                    purchaseStatus == "success"
                                        ? "translate-x-1/4"
                                        : "-translate-x-1/4"
                                }`}
                            >
                                <h5 className="w-1/2 text-center text-green-500 font-bold text-[4.5vw] md:text-[1.2vw]">
                                    Pembayaran Berhasil
                                </h5>
                                <h5 className="w-1/2 text-center text-secondary font-bold text-[4.5vw] md:text-[1.2vw]">
                                    Mari Selesaikan Pembayaranmu
                                </h5>
                            </div>
                            <hr
                                className={`w-full duration-1000 ${
                                    purchaseStatus == "success"
                                        ? "border-green-500"
                                        : "border-secondary"
                                }`}
                            />
                            <div
                                className={`w-[200%] flex h-[88vw] md:h-[22vw] duration-1000 ${
                                    purchaseStatus == "success"
                                        ? "translate-x-1/4"
                                        : "-translate-x-1/4"
                                }`}
                            >
                                <div
                                    className={`w-full h-full flex justify-center items-center gap-[4vw] md:gap-[1vw] duration-1000 ${
                                        purchaseStatus == "success"
                                            ? "scale-100"
                                            : "scale-0"
                                    }`}
                                >
                                    <div className="space-y-[8vw] md:space-y-[2vw]">
                                        <svg
                                            className="h-[60vw] md:h-[15vw] fill-green-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z" />
                                        </svg>
                                        <GoalsButton onClick={() => setRedirectAt(-1)} isLink={false} href={`https://api.whatsapp.com/send?phone=6282147638286&text=Halo%20min%2C%20saya%20sudah%20melakukan%20pembayaran%20produk%20${data.products.name.replaceAll(' ', '%20')}%20dengan%20order%20id%20${data.order_code}.`} target="_blank" className="rounded-[2vw] md:rounded-[.5vw]">Konfirmasi ke Admin{(redirectAt > 0) && (redirectAt <= 10) ? ` (${redirectAt})` : ''}</GoalsButton>
                                    </div>
                                </div>
                                <div
                                    className={`w-full flex flex-col items-center gap-[4vw] md:gap-[1vw] duration-1000 ${
                                        purchaseStatus == "success"
                                            ? "scale-0"
                                            : "scale-100"
                                    }`}
                                >
                                    <div className="w-full h-[56vw] md:h-[14vw] flex justify-center items-center">
                                        {paymentMethod.category !=
                                        "bank_transfer" ? (
                                            <img
                                                src={
                                                    orderHistory.actions[0].url
                                                }
                                                className="h-full"
                                                alt=""
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <h5 className="font-medium text-[4.5vw] md:text-[1.2vw]">
                                                    Nomor VA {bankName} :
                                                </h5>
                                                <h2
                                                    className="leading-loose cursor-pointer text-[6vw] md:text-[2.3vw]"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(vaNumber);
                                                        toast.success("Text copied!");
                                                    }}
                                                >
                                                    {vaNumber}
                                                </h2>
                                                <p
                                                    className="font-medium hover:text-primary cursor-pointer"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(vaNumber);
                                                        toast.success("Text copied!");
                                                    }}
                                                >
                                                    <i className="bi bi-copy"></i>{" "}
                                                    Salin
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <hr className="w-full border-light-grey" />
                                    <table className="w-10/12 md:w-full text-center font-poppins border-separate border-spacing-y-[2vw] md:border-spacing-0 my-[1vw] md:my-0">
                                        <tbody>
                                            <tr className="font-bold text-[8vw] md:text-[3vw]">
                                                <td className="w-3/12">
                                                    {countdown.format("HH")}
                                                </td>
                                                <td>:</td>
                                                <td className="w-3/12">
                                                    {countdown.format("mm")}
                                                </td>
                                                <td>:</td>
                                                <td className="w-3/12">
                                                    {countdown.format("ss")}
                                                </td>
                                            </tr>
                                            <tr className="text-[3vw] md:text-[1vw]">
                                                <td>Jam</td>
                                                <td></td>
                                                <td>Menit</td>
                                                <td></td>
                                                <td>Detik</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr className="w-full border-dark" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative md:shadow-centered-spread md:rounded-[1vw] md:p-[1.5vw] h-fit">
                        <div className="container md:w-full mx-auto flex flex-col items-center gap-[4vw] md:gap-[1.5vw]">
                            <hr className="hidden md:block w-full border-light-grey" />
                            <table className="w-full font-poppins border-separate border-spacing-y-[4vw] md:border-spacing-y-[1.2vw] -my-[1vw] text-[3.25vw] md:text-[1vw]">
                                <tbody>
                                    <tr>
                                        <td>Produk</td>
                                        <td className="flex justify-end items-center gap-[.8vw] font-semibold">
                                            {data.products.name}{" "}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Metode Pembayaran</td>
                                        <td className="flex justify-end items-center gap-[.8vw] font-semibold">
                                            {paymentMethod.name}{" "}
                                            <img
                                                className="w-[10%]"
                                                src={`/img/purchase/${paymentName}.png`}
                                                alt=""
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ID Transaksi</td>
                                        <td className="flex justify-end text-end items-center font-semibold">
                                            {data.order_code}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal Transaksi</td>
                                        <td className="flex justify-end text-end items-center font-semibold">
                                            <span className="hidden md:inline-block">
                                                {moment(data.created_at)
                                                    .locale("id")
                                                    .format(
                                                        "dddd, DD MMMM YYYY"
                                                    )}
                                            </span>
                                            <span className="md:hidden">
                                                {moment(data.created_at)
                                                    .locale("id")
                                                    .format("dddd,")}
                                                <br />
                                                {moment(data.created_at)
                                                    .locale("id")
                                                    .format("DD MMMM YYYY")}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Total Pembelian</td>
                                        <td className="flex justify-end text-end items-center font-semibold">
                                            IDR{" "}
                                            {currency.format(
                                                orderHistory.gross_amount
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr className="w-full border-light-grey" />
                            <PaymentSteps steps={paymentSteps} />
                            <div className="z-10 w-full overflow-hidden grid grid-cols-2 border-1 xl:border-2 border-primary font-poppins rounded-full">
                                <Link
                                    href="/produk"
                                    className="p-[2vw] md:p-[.6vw] font-medium text-center bg-white text-primary text-[3vw] md:text-[1vw]"
                                >
                                    Belanja Lagi
                                </Link>
                                <Link
                                    href="/"
                                    className="p-[2vw] md:p-[.6vw] font-medium text-center bg-primary text-white text-[3vw] md:text-[1vw]"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

function PaymentSteps ({ steps }) {
    const [show, setShow] = useState(false);
    return (
        <div className="w-full block my-[2vw] md:my-0">
            <ExpandedButton
                textClassName="font-medium text-dark"
                icon={`fa-solid fa-chevron-down duration-500 ${
                    show ? "-rotate-180" : ""
                }`}
                className="h-[9vw] md:h-[3vw] border-1 border-dark"
                onClick={() =>
                    setShow(!show)
                }
            >
                Lihat Langkah Pembayaran
            </ExpandedButton>
            <TECollapse
                show={show}
                className="relative w-[110%] -ms-[5%] px-[4%] shadow-none -translate-y-[4vw] md:-translate-y-[1vw]"
            >
                <TECollapseItem className="grid gap-[4vw] md:gap-[1.2vw] px-[.3vw]">
                    <div className="border-1 border-dark rounded-[1.5vw] md:rounded-[.6vw] p-[4vw] md:p-[1vw] flex flex-col gap-[1vw]">
                        <p className="font-bold">
                            1. Transaksi melalui Desktop
                        </p>
                        <ul className="list-disc ms-[6vw] md:ms-[2vw]">
                            {steps['desktop'].map((item, index) => {
                                return (
                                    <li key={index}>{item}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="border-1 border-dark rounded-[1.5vw] md:rounded-[.6vw] p-[4vw] md:p-[1vw] flex flex-col gap-[1vw]">
                        <p className="font-bold">
                            2. Transaksi melalui Mobile
                        </p>
                        <ul className="list-disc ms-[6vw] md:ms-[2vw]">
                            {steps['mobile'].map((item, index) => {
                                return (
                                    <li key={index}>{item}</li>
                                )
                            })}
                        </ul>
                    </div>
                </TECollapseItem>
            </TECollapse>
        </div>
    )
}
