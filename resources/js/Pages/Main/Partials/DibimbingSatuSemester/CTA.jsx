import GoalsButton from "@/Components/GoalsButton";
import calendarIcon from "/resources/img/icon/calendar-1.png";
import circle1 from "/resources/img/vector/circle-1.svg";
import circle2 from "/resources/img/vector/circle-2.svg";

export default function CTA() {
    return (
        <section id="cta" className="relative bg-secondary">
            <img src={circle1} alt="" className="absolute top-0 left-0 h-full" />
            <img src={circle2} alt="" className="absolute top-0 left-[38vw] h-full" />
            <div className="container mx-auto relative py-[3vw] flex justify-between items-center">
                <div className="flex flex-col gap-[2vw]">
                    <span className="w-fit p-[.5vw] px-[1.5vw] bg-red-500 text-white rounded-[.5vw] text-[1.25vw] font-semibold">Bimbingan Sudah Dimulai!</span>
                    <h2 className="text-white">DIBIMBING SATU SEMESTER</h2>
                    <p className="text-[1.25vw] flex items-center gap-[.5vw] !text-white">
                        <img className="w-[2vw]" src={calendarIcon} alt="📆" /> Bimbingan Dimulai : 2 September 2024
                    </p>
                    <GoalsButton className="w-fit px-[1.25vw] font-sans !font-bold text-[1.04vw] rounded-[.25vw]" activeClassName="bg-white text-secondary hover:bg-soft">DAFTAR SEKARANG</GoalsButton>
                </div>
                <div className="text-white">
                    <p className="font-poppins text-[1.25vw] mb-[1vw] pe-[1vw]">Ada Pertanyaan?</p>
                    <GoalsButton className="font-sans !font-bold text-[1.04vw] rounded-[.5vw]" activeClassName="bg-none hover:bg-white hover:text-secondary border-white border-2">Hubungi CS</GoalsButton>
                </div>
            </div>
        </section>
    );
}
