import GoalsButton from "@/Components/GoalsButton";
import gradientBg5 from "/resources/img/vector/gradient-bg-5.svg";

export default function Konsultasi () {
    return (
        <section id="konsultasi" className="relative pb-[3.4vw] mb-[3.4vw]">
            <div className="relative shadow-normal rounded-[1.75vw] h-[15.625vw] overflow-hidden">
                <div className="flex items-center justify-between p-[4vw]">
                    <div className="w-2/3">
                        <h2 className="text-[1.875vw] text-black font-semibold leading-[3vw] mb-[1vw]">Masih Bingung <span className="text-primary">Program Apa Yang Cocok Buat Kamu?</span></h2>
                        <p className="text-[1.04vw]">Yuk, konsultasikan sekarang juga</p>
                    </div>
                    <div>
                        <GoalsButton href="https://wa.me/6282147638286" target="_blank" className="w-fit px-[2vw] font-sans text-[1.04vw] rounded-[.5vw]">Hubungi CS</GoalsButton>
                    </div>
                </div>
                <img src={gradientBg5} alt="background" className="absolute left-0 top-0 bottom-0 w-full h-full -z-10" />
            </div>
        </section>
    )
}