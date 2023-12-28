import { Head } from "@inertiajs/react";
import CornerWaveVector from "@/Components/CornerWaveVector";
import iconMobile from "/resources/img/icon/goals-4.svg";
import iconDesktop from "/resources/img/icon/goals-3.svg";

export default function SyaratDanKetentuan () {
    return (
        <>
            <Head title="Syarat dan Ketentuan" />
            <div className="relative bg-secondary text-dark py-[8vw] md:py-[4vw] min-h-screen">
                <CornerWaveVector className="fixed h-screen" position="" cornerClassName="w-8/12 md:w-5/12" />
                <div className="container mx-auto flex flex-col text-[3.3vw] md:text-[1.25vw] md:px-[6.6vw] gap-[6vw] md:gap-[2vw]">
                    <img className="hidden md:inline-block w-[8.9vw] mx-auto" src={iconDesktop} alt="" />
                    <img className="md:hidden h-[7.2vw] mx-auto" src={iconMobile} alt="" />
                    <div className="bg-white rounded-[2vw] md:rounded-[1vw] p-[7vw] md:p-[3.5vw] flex flex-col gap-[5vw] md:gap-[1.5vw]">
                        <h1 className="font-sans font-bold text-center text-[4.4vw] md:text-[2.5vw] leading-[4.2vw] md:leading-tight">Syarat & Ketentuan Layanan<br /><span className="text-secondary">Goals Academy</span></h1>
                        <p>
                            Kami berterima kasih atas kepercayaan Anda terhadap fitur Layanan Goals Academy. Mohon luangkan waktu Anda untuk membaca keseluruhan Syarat dan Ketentuan Layanan Goals Academy ini.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
