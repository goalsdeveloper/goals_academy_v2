import "/resources/css/main.css";
import { Head } from "@inertiajs/react";
import MainHeader from "./Partials/MainHeader";
import wave5 from "/resources/img/vector/wave-5.svg";
import "@/script/mainHeader";
import CornerWaveVector2 from "@/Components/CornerWaveVector2";

export default function DetailLayout ({ auth, title, children }) {
    return (
        <>
            <Head title={title} />
            <MainHeader auth={auth} title="Dashboard" />
            <main className="text-dark pt-20 xs:pt-20 md:pt-20 xl:pt-32 3xl:pt-48 pb-[8vw] md:pb-[3vw] text-[2.75vw] md:text-[1.15vw] overflow-visible">
                <Preliminary title={title} />
                <DashboardContent title={title}>
                    {children}
                </DashboardContent>
            </main>
        </>
    )
}

function Preliminary ({ title }) {
    return (
        <div className="relative container mx-auto shadow-centered-spread rounded-[1vw] text-center overflow-hidden mt-[3vw] mb-[6vw] md:mb-[3vw] p-[6vw] md:p-[3.25vw]">
            <div>
                <h2 className="font-sans font-medium text-secondary text-[4.5vw] md:text-[2.25vw] mb-[.5vw]">{title}</h2>
                <p>Dibimbing Sekali Offline 60 Menit</p>
            </div>
            <img src={wave5} className="hidden md:block absolute w-full left-0 right-0 bottom-0 select-none" />
            <CornerWaveVector2 className="md:hidden" cornerClassName="w-4/12" />
        </div>
    )
}

function DashboardContent ({ children }) {
    return (
        <div className="container mx-auto flex flex-col gap-[6vw] md:gap-[3vw]">
            {children}
        </div>
    )
}
