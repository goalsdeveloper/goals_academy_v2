import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import figure from "/resources/img/user/empty-program.png";
import CornerWaveVector from "@/Components/CornerWaveVector";
import "@/script/momentCustomLocale";

export default function Index ({ auth }) {
    const data = [
        // {
        //     id: 1,
        //     products_id: 1,
        //     category_id: 1,
        //     order_id: 'GA1234578',
        //     name: 'Bimbingan Online 45 Menit',
        //     date: '2023-12-01',
        //     time: '18:30',
        //     duration: 45,
        //     ongoing: true,
        // },
        // {
        //     id: 2,
        //     products_id: 1,
        //     category_id: 1,
        //     order_id: 'GA87654321',
        //     name: 'Bimbingan Offline 60 Menit',
        //     date: '2023-11-28',
        //     time: '19:00',
        //     duration: 60,
        //     ongoing: false,
        // },
        // {
        //     id: 1,
        //     products_id: 7,
        //     category_id: 2,
        //     order_id: 'GA1238064',
        //     name: 'Ebook 1',
        //     date: '2023-12-01',
        // },
        // {
        //     id: 2,
        //     products_id: 1,
        //     category_id: 1,
        //     order_id: 'GA7823164',
        //     name: 'Bimbingan Offline 60 Menit',
        //     date: '2023-11-28',
        //     time: '19:00',
        //     duration: 60,
        //     ongoing: false,
        // },
        // {
        //     id: 2,
        //     products_id: 10,
        //     category_id: 2,
        //     order_id: 'GA1918263',
        //     name: 'Ebook 2',
        //     date: '2023-12-01',
        // },
        // {
        //     id: 1,
        //     products_id: 8,
        //     category_id: 3,
        //     order_id: 'GA1237840',
        //     name: 'Webinar 1',
        //     date: '2023-12-12',
        //     time: '19:00',
        //     duration: 60,
        // },
    ]

    return (
        <UserLayout auth={auth} title="Notifikasi">
            {data.length == 0 ? (
                <div className="md:min-h-[21vw] flex flex-col justify-center items-center gap-[3vw] md:gap-[2vw]">
                    <img src={figure} alt="" className="h-[25vw] w-[25vw] md:h-[10vw] md:w-[10vw]" />
                    <p className="text-[3vw] md:text-[1.5vw] md:text-secondary">Anda Belum Memiliki Notifikasi</p>
                </div>
            ) : (
                <div className="md:min-h-[21vw] flex flex-col gap-[2vw]">
                    <div className="flex flex-col gap-[6vw] md:gap-[1vw]">

                    </div>
                </div>
            )}
        </UserLayout>
    )
}
