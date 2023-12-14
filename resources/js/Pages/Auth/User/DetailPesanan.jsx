import DetailLayout from "@/Layouts/DetailLayout";
import moment from "moment";
import "@/script/momentCustomLocale";
import CornerWaveVector2 from "@/Components/CornerWaveVector2";

export default function DetailPesanan({ auth, dataDetail }) {
    console.log(dataDetail);

    const payloadObject = JSON.parse(dataDetail.order_history[0].payload);
    const expiryTime = payloadObject.expiry_time;

    const data = dataDetail;

    return (
        <DetailLayout auth={auth} title="Detail Pesanan">
            <div className="w-full h-fit relative p-[6vw] md:p-[3vw] shadow-centered-spread rounded-[1kkvw] md:rounded-xl">
                <CornerWaveVector2
                    className="md:hidden"
                    cornerClassName="w-4/12"
                />
                <div>
                    <h1 className="font-medium text-center md:text-left text-secondary text-[4vw] md:text-[2vw] mb-[2vw] md:mb-[1vw]">
                        Ringkasan Pesanan
                    </h1>
                    <hr className="border-1 border-secondary" />
                </div>
                <table className="w-full font-poppins border-collapse my-1">
                    <tbody>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Kode Pesanan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">
                                {data.order_code}
                            </td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Status Pesanan</td>
                            {data.status == "Pending" ? (
                                <td className="font-bold italic text-right py-[4vw] md:py-[2vw] text-secondary">
                                    Menunggu Pembayaran
                                </td>
                            ) : data.status == "Success" ? (
                                <td className="font-bold italic text-right py-[4vw] md:py-[2vw] text-green-500">
                                    Pembayaran Berhasil
                                </td>
                            ) : (
                                <td className="font-bold italic text-right py-[4vw] md:py-[2vw] text-red-500">
                                    Pembayaran Tidak Berhasil
                                </td>
                            )}
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Metode Pembayaran</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">
                                {data.payment_method.name}
                            </td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Waktu Pembayaran</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">
                                {moment(expiryTime).format(
                                    "dddd, DD MMMM YYYY HH:mm"
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full h-fit relative p-[6vw] md:p-[3vw] shadow-centered-spread rounded-[1kkvw] md:rounded-xl">
                <CornerWaveVector2
                    className="md:hidden"
                    cornerClassName="w-4/12"
                />
                <div>
                    <h1 className="font-medium text-center md:text-left text-secondary text-[4vw] md:text-[2vw] mb-[2vw] md:mb-[1vw]">
                        Ringkasan Pembelajaran
                    </h1>
                    <hr className="border-1 border-secondary" />
                </div>
                <table className="w-full font-poppins border-collapse my-1">
                    <tbody>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Jadwal Pelaksanaan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">
                                {moment(data.course.date).format(
                                    "dddd, DD MMMM YYYY"
                                )}
                            </td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            {dataDetail.products.features[0].category ==
                            "online" ? (
                                <td>Metode Pelaksanaan</td>
                            ) : (
                                <td>Kota Pelaksanaan</td>
                            )}
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">
                                {data.course.city ? data.course.city : "Online"}
                            </td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Lokasi Pelaksanaan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">
                                {data.course.location}
                            </td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Lampiran Dokumen</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">
                                {data.course.file_uploads.length > 0
                                    ? data.course.file_uploads[0].filename
                                    : "-"}
                            </td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Ukuran Dokumen</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">
                                {data.course.file_uploads.length > 0
                                    ? Math.ceil(
                                          data.course.file_uploads[0].size /
                                              1024
                                      ) + "Kb"
                                    : "-"}
                            </td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td>Catatan untuk Tutor</td>
                            <td className="font-bold text-right w-1/2 py-[4vw] md:py-[2vw]">
                                {data.course.note ? data.course.note : "Kosong"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DetailLayout>
    );
}
