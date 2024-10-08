import { Head } from "@inertiajs/react";
import CornerWaveVector from "@/Components/CornerWaveVector";
import iconMobile from "/resources/img/icon/goals-4.svg";
import iconDesktop from "/resources/img/icon/goals-3.svg";
import ButtonPill from "@/Components/ButtonPill";

export default function SyaratDanKetentuan ({user}) {
    return (
        <>
            <Head title="Verifikasi Email" />
            <div className="relative bg-secondary text-dark py-[8vw] md:py-[4vw] min-h-screen">
                <CornerWaveVector className="fixed h-screen" position="" cornerClassName="w-8/12 md:w-5/12" />
                <div className="container mx-auto flex flex-col text-center text-[3.3vw] md:text-[1.25vw] md:px-[6.6vw] gap-[6vw] md:gap-[2vw] relative z-10">
                    <a href="/">
                        <img className="hidden md:inline-block w-[8.9vw] mx-auto" src={iconDesktop} alt="" />
                        <img className="md:hidden h-[7.2vw] mx-auto" src={iconMobile} alt="" />
                    </a>
                    <div className="bg-white rounded-[2vw] md:rounded-[1vw] p-[7vw] md:p-[3.5vw] flex flex-col gap-[5vw] md:gap-[1.5vw]">
                        <h1 className="font-poppins font-semibold text-secondary text-[4.4vw] md:text-[2.5vw] leading-[4.2vw] md:leading-tight">Email verifikasi telah dikirim!</h1>
                        <div>
                            <p>Email verifikasi telah dikirim ke:</p>
                            <p className="font-semibold text-[3.6vw] md:text-[1.5vw]">{user.email}</p>
                        </div>
                        <p>
                            Silakan ikuti langkah yang tersedia pada email yang telah dikirimkan tersebut. Jika kamu tidak menemukannya, kamu mungkin bisa mencarinya di folder spam pada email-mu.
                        </p>
                        <p>Masih tidak dapat menemukannya? Silakan tekan tombol dibawah ini.</p>
                        <ButtonPill href={route('verification.resend')} isLink className="w-full md:w-[20%] mx-auto rounded-[.5vw] font-normal" activeStyle="text-secondary border-2 border-secondary hover:bg-secondary hover:text-white">Kirim Ulang</ButtonPill>
                    </div>
                </div>
            </div>
        </>
    )
}
