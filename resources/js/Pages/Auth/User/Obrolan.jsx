import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import figure from "/resources/img/figure/8.svg";
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
    ]

    return (
        <UserLayout auth={auth} title="Obrolan">
            {data.length == 0 ? (
                <div className="min-h-[60vh] md:min-h-[22vw] flex flex-col justify-center items-center gap-[6vw] md:gap-[2vw]">
                    {/* <img src={figure} alt="" className="h-[30vw] w-[30vw] md:h-[14vw] md:w-[14vw]" /> */}
                    <p className="text-[3vw] md:text-[1.5vw] md:text-secondary">Coming Soon</p>
                </div>
            ) : (
                <div className="md:min-h-[22vw] flex flex-col gap-[6vw] md:gap-[1vw]">
                </div>
            )}
        </UserLayout>
    )
}
