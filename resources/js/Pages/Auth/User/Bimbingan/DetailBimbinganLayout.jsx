import GoalsButton from "@/Components/elements/GoalsButton";
import useScrollBlock from "@/Hooks/useScrollBlock";
import MainLayout from "@/Layouts/MainLayout";
import "@/script/momentCustomLocale";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { RxFileText } from "react-icons/rx";
import DetailBanyakPertemuan from "./DetailBanyakPertemuan";
import DetailSatuPertemuan from "./DetailSatuPertemuan";
import { detailData as dataBimbingan } from "./data";

export default function DetailPesanan({ auth, courseDetail }) {
    console.log(courseDetail[0]);
    // console.log(courseDetail[0].time);
    // const data = courseDetail[0];

    // const {
    //     data: reviewData,
    //     setData: setReviewData,
    //     post,
    // } = useForm({
    //     review: data.review,
    //     rate: data.rate,
    // });

    // const { data: tempReviewData, setData: setTempReviewData } = useForm({
    //     review: data.review,
    //     rate: data.rate,
    // });

    const data = {
        status: "Selesai",
    };

    const [showReviewForm, setShowReviewForm] = useState(false);

    return (
        <MainLayout auth={auth} title="Detail Pembelajaran">
            <div className="container mx-auto space-y-[2.5vw] text-secondary mb-[5.2vw]">
                <Link
                    href="/bimbingan"
                    className="flex text-[1vw] font-medium gap-[.5vw] items-center leading-none"
                >
                    <FiChevronLeft className="text-[1.2vw]" />
                    Kembali
                </Link>

                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="md:font-medium text-black text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                            Detail Pembelajaran
                        </h1>

                        <div className="space-x-[.5vw]">
                            <GoalsButton variant="bordered">
                                Beri Ulasan
                            </GoalsButton>

                            <GoalsButton>Selesaikan Pembelajaran</GoalsButton>
                        </div>
                    </div>
                </div>

                <DetailSatuPertemuan data={dataBimbingan[0].detail}/>
                <DetailBanyakPertemuan data={dataBimbingan}/>
            </div>
        </MainLayout>
    );
}
