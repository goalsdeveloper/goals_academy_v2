import DetailLayout from "@/Layouts/DetailLayout";
import moment from "moment";
import "@/script/momentCustomLocale";
import CornerWaveVector2 from "@/Components/CornerWaveVector2";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import ButtonPill from "@/Components/ButtonPill";

export default function DetailPesanan ({ auth }) {
    const data = {
        date: '2023-11-12',
        time: '18:00',
        city: 'Malang',
        place: 'Nakoa',
        tutor: 'Yordhan',
        document: {name: 'abcd.pdf', size: 123456},
        note: 'asdfdasgadsf asdgfadsfads asdf adsfkhasdk assfj dsa sadf jdasfja adsf',
        tutor_document: {name: 'efgh.pdf', size: 234567},
        tutor_note: '',
        review: '',
        rate: 0,
        ongoing: true,
    }

    const {data: reviewData, setData: setReviewData, post} = useForm({
        review: data.review,
        rate: data.rate,
    })

    const {data: tempReviewData, setData: setTempReviewData} = useForm({
        review: data.review,
        rate: data.rate,
    })

    const [showReviewForm, setShowReviewForm] = useState(false)

    return (
        <DetailLayout auth={auth} title="Detail Pembelajaran">
            <div className="w-full h-fit relative p-[6vw] md:p-[3vw] shadow-centered-spread rounded-[1vw] md:rounded-xl">
                <CornerWaveVector2 className="md:hidden" cornerClassName="w-4/12" />
                <div>
                    <h1 className="font-medium text-center md:text-left text-secondary text-[4vw] md:text-[2vw] mb-[2vw] md:mb-[1vw]">Ringkasan Pelaksanaan</h1>
                    <hr className="border-1 border-secondary" />
                </div>
                <table className="w-full font-poppins border-collapse my-1">
                    <tbody>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Jadwal Pelaksanaan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{moment(data.date).format('dddd, DD MMMM YYYY')}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Waktu Pelaksanaan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.time} WIB</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Kota Pelaksanaan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.city}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Lokasi Pelaksanaan</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.place}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Nama Tutor</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.tutor == '' ? '-' : data.tutor}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full h-fit relative p-[6vw] md:p-[3vw] shadow-centered-spread rounded-[1kkvw] md:rounded-xl">
                <CornerWaveVector2 className="md:hidden" cornerClassName="w-4/12" />
                <div>
                    <h1 className="font-medium text-center md:text-left text-secondary text-[4vw] md:text-[2vw] mb-[2vw] md:mb-[1vw]">Informasi Pembelajaran</h1>
                    <hr className="border-1 border-secondary" />
                </div>
                <table className="w-full font-poppins border-collapse my-1">
                    <tbody>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Lampiran Dokumen</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.document.name}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Ukuran Dokumen</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{Math.ceil(data.document.size/1024)}Kb</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Catatan untuk Tutor</td>
                            <td className="font-bold text-right w-1/2 py-[4vw] md:py-[2vw]">{data.note == '' ? '-' : data.note}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Lampiran Dokumen Hasil</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{data.tutor_document == '' ? '-' : (<a role="button">{data.tutor_document.name}&nbsp;&nbsp;<i className="fa-solid fa-download text-secondary"></i></a>)}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Catatan dari Tutor</td>
                            <td className="font-bold text-right w-1/2 py-[4vw] md:py-[2vw]">{data.tutor_note == '' ? '-' : data.tutor_note}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={`${data.ongoing ? 'hidden' : ''} w-full h-fit relative p-[6vw] md:p-[3vw] shadow-centered-spread rounded-[1kkvw] md:rounded-xl`}>
                <CornerWaveVector2 className="md:hidden" cornerClassName="w-4/12" />
                <div>
                    <h1 className="font-medium text-center md:text-left text-secondary text-[4vw] md:text-[2vw] mb-[2vw] md:mb-[1vw]">Ulasan Hasil Pembelajaran</h1>
                    <hr className="border-1 border-secondary" />
                </div>
                <table className="w-full font-poppins border-collapse my-1">
                    <tbody>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Ulasan Pembelajaran</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{reviewData.review == '' ? '-' : reviewData.review}</td>
                        </tr>
                        <tr className="border-1 md:border-2 border-transparent border-b-dark">
                            <td className="py-[4vw] md:py-[2vw]">Rating Pembelajaran</td>
                            <td className="font-bold text-right py-[4vw] md:py-[2vw]">{reviewData.rate == 0 ? '-' : (
                                <span><i className="fa-solid fa-star text-secondary"></i> {reviewData.rate}/5</span>
                            )}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={`${data.ongoing ? 'hidden' : ''} flex flex-col gap-[3vw] md:gap-[1.5vw]`}>
                <ButtonPill activeStyle="text-secondary border-2 border-secondary hover:text-white hover:bg-secondary" onClick={() => setShowReviewForm(true)}>Beri Ulasan</ButtonPill>
                <ButtonPill isActive={reviewData.review != '' & reviewData.rate != 0}>Selesaikan Pembelajaran</ButtonPill>
            </div>
            <ReviewForm show={showReviewForm} setShow={setShowReviewForm} data={reviewData} setData={setReviewData} temp={tempReviewData} setTemp={setTempReviewData} post={post} />
        </DetailLayout>
    )
}

function ReviewForm({ show, setShow, data, setData, temp, setTemp, post }) {
    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => setShow(false)}
            ></div>
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed left-0 flex flex-col gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] h-[50vh] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh]`}
            >
                <div>
                    <div className="flex justify-between items-center mb-[3vw] md:mb-[1vw]">
                        <h5 className="text-secondary font-poppins font-bold text-[4.5vw] md:text-[1.2vw]">
                            Ulasan Hasil Pembelajaran
                        </h5>
                        <i
                            role="button"
                            className={
                                "fa-solid fa-times text-[5vw] md:text-[1.5vw]"
                            }
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <div>
                    <label htmlFor="review" className="inline-block md:text-[.95vw] mb-[2vw] md:mb-[1vw]">Ulasan Pembelajaran</label>
                    <textarea
                        id="review"
                        className="w-full shadow-centered-spread rounded-md md:rounded-sm focus:outline-none p-[3vw] md:p-[1vw]"
                        rows="5"
                        draggable={false}
                        placeholder="Isi ulasan disini..."
                        onChange={(e) => setTemp("review", e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="review" className="inline-block md:text-[.95vw] mb-[2vw] md:mb-[1vw]">Ulasan Nilai</label>
                    <div className="w-9/12 mx-auto grid grid-cols-5">
                        <i className={`fa-solid fa-star text-[8vw] md:text-[2.5vw] cursor-pointer ${temp.rate > 0 ? 'text-secondary' : 'text-light-grey'}`}
                            onClick={() => setTemp("rate", 1)}
                        ></i>
                        <i className={`fa-solid fa-star text-[8vw] md:text-[2.5vw] cursor-pointer ${temp.rate > 1 ? 'text-secondary' : 'text-light-grey'}`}
                            onClick={() => setTemp("rate", 2)}
                        ></i>
                        <i className={`fa-solid fa-star text-[8vw] md:text-[2.5vw] cursor-pointer ${temp.rate > 2 ? 'text-secondary' : 'text-light-grey'}`}
                            onClick={() => setTemp("rate", 3)}
                        ></i>
                        <i className={`fa-solid fa-star text-[8vw] md:text-[2.5vw] cursor-pointer ${temp.rate > 3 ? 'text-secondary' : 'text-light-grey'}`}
                            onClick={() => setTemp("rate", 4)}
                        ></i>
                        <i className={`fa-solid fa-star text-[8vw] md:text-[2.5vw] cursor-pointer ${temp.rate > 4 ? 'text-secondary' : 'text-light-grey'}`}
                            onClick={() => setTemp("rate", 5)}
                        ></i>
                    </div>
                </div>
                <div className="flex justify-center md:justify-end mt-[1vw]">
                    <ButtonPill
                        className="w-6/12 md:w-3/12"
                        isActive={temp.review != "" & temp.rate != 0}
                        onClick={(e) => {
                            if (temp.review != "" & temp.rate != 0) {
                                setData({review: temp.review, rate: temp.rate});
                                // post('/send-review')
                                setShow(false);
                            }
                        }}
                    >
                        Simpan
                    </ButtonPill>
                </div>
            </div>
        </>
    );
}
