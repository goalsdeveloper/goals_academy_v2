import DetailLayout from "@/Layouts/DetailLayout";
import moment from "moment";
import "@/script/momentCustomLocale";
import CornerWaveVector2 from "@/Components/CornerWaveVector2";

export default function DetailPesanan ({ auth }) {
    const data = {
        order_id: 'GA20231107172317',
        transaction_status: 'pending',
        payment_method: 'BRI',
        expiry_time: '2023-11-08 17:23:18',
        date: '2023-11-12',
        city: 'Malang',
        place: 'Nakoa',
        document: {name: 'abcd.pdf', size: 123456},
        note: 'asdfdasgadsf asdgfadsfads asdf adsfkhasdk assfj dsa sadf jdasfja adsf'
    }

    return (
        <DetailLayout auth={auth} title="Detail Pesanan">
            <div className="w-full h-fit relative p-[6vw] md:p-[3vw] shadow-centered-spread rounded-[1kkvw] md:rounded-xl">
                <CornerWaveVector2 className="md:hidden" cornerClassName="w-4/12" />
                <div>
                    <h1 className="font-medium text-center md:text-left text-secondary text-[4vw] md:text-[2vw] mb-[2vw] md:mb-[1vw]">Ringkasan Pesanan</h1>
                    <hr className="border-1 border-secondary" />
                </div>
                <table className="w-full font-poppins border-collapse my-1">
                    <tbody>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Kode Pesanan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.order_id}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Status Pesanan</td>
                            {data.transaction_status == "pending" ? (
                                <td className="font-bold italic text-right py-[4vw] md:py-[2vw] text-secondary">
                                    Menunggu Pembayaran
                                </td>
                            ) : (
                                data.transaction_status == 'success' ? (
                                    <td className="font-bold italic text-right py-[4vw] md:py-[2vw] text-green-500">
                                        Pembayaran Berhasil
                                    </td>
                                ) : (
                                    <td className="font-bold italic text-right py-[4vw] md:py-[2vw] text-red-500">
                                        Pembayaran Tidak Berhasil
                                    </td>
                                )
                            )}
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Metode Pembayaran</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.payment_method}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Waktu Pembayaran</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{moment(data.expiry_time).format('dddd, DD MMMM YYYY')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full h-fit relative p-[6vw] md:p-[3vw] shadow-centered-spread rounded-[1kkvw] md:rounded-xl">
                <CornerWaveVector2 className="md:hidden" cornerClassName="w-4/12" />
                <div>
                    <h1 className="font-medium text-center md:text-left text-secondary text-[4vw] md:text-[2vw] mb-[2vw] md:mb-[1vw]">Ringkasan Pembelajaran</h1>
                    <hr className="border-1 border-secondary" />
                </div>
                <table className="w-full font-poppins border-collapse my-1">
                    <tbody>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Jadwal Pelaksanaan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{moment(data.date).format('dddd, DD MMMM YYYY')}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Kota Pelaksanaan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.city}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Lokasi Pelaksanaan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.place}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Lampiran Dokumen</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.document.name}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Ukuran Dokumen</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{Math.ceil(data.document.size/1024)}Kb</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Catatan untuk Tutor</td>
                            <td className="font-bold text-right w-1/2 py-[4vw] md:py-[2vw]">{data.note}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DetailLayout>
    )
}
