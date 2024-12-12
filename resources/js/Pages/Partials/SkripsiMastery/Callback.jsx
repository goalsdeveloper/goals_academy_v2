import GoalsButton from "@/Components/elements/GoalsButton";
import background from "/resources/img/skripsi-mastery/bg-footer.svg";

export default function Callback () {
    return (
        <section id="callback" className="relative md:py-[10vw]">
            <div className="w-full absolute top-0 -z-10">
                <img src={background} alt="Background Image" />
            </div>
            <div className="w-[84.375%] mx-auto *:text-white md:space-y-[3.38vw]">
                <div className="h-full w-[65%] md:space-y-[4.17vw]">
                    <div className="md:space-y-[1.67vw]">
                        <h2 className="leading-normal md:text-[2.5vw]">“Selesai nggaknya skripsi dan seperti apa kamu 5 tahun kedepan, tergantung apa yang kamu lakukan hari ini”</h2>
                        <p className="font-poppins md:text-[1.25vw]">Yordhan Ghalis Dewangga - CEO Goals Academy</p>
                    </div>
                    <div>
                        <GoalsButton className="!bg-primary !border-primary md:w-[20.83vw]">Take Action Sekarang!</GoalsButton>
                    </div>
                </div>
            </div>
        </section>
    )
}