import GoalsButton from "@/Components/GoalsButton";
import { BiSolidCheckCircle } from "react-icons/bi";

export default function Benefit ({ items1, items2  }) {
    return (
        <section id="benefit" className="mb-[3.4vw]">
            <div className="grid grid-cols-2 gap-[2.24vw] mb-[3.4vw]">
                <div>
                    <h2 className="text-[2.5vw] text-black leading-[3.5vw]">Benefit dan Keunggulan <span className="text-primary">Dibimbing Satu Semester</span></h2>
                </div>
                {items1.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </div>
            <div>
                <h2 className="w-10/12 text-[2.5vw] text-black leading-[3.5vw]">Apa Aja yang Kamu Dapetin dari <span className="text-primary">Dibimbing Satu Semester?</span></h2>
                <div className="grid grid-cols-2 gap-y-[2.4vw] my-[3.07vw]">
                    {items2.map((item, index) => (
                        <Item key={index} {...item} />
                    ))}
                </div>
                <GoalsButton className="w-fit px-[2vw] font-sans text-[1.04vw] rounded-[.5vw]">Daftar Sekarang</GoalsButton>
            </div>
        </section>
    )
}

function Card ({ title, text, icon, className }) {
    return (
        <div className={`${className} shadow-normal rounded-[2.08vw] p-[2.5vw] space-y-[1vw]`}>
            <div className="w-fit bg-white rounded-full p-[1vw]">
                {icon}
            </div>
            <h4 className="font-semibold text-[1.25vw]">{title}</h4>
            <p className="text-[1.04vw]">{text}</p>
        </div>
    )
}

function Item ({ text }) {
    return (
        <div className="flex flex-wrap items-center gap-[1vw]">
            <BiSolidCheckCircle className="text-[2.25vw] text-primary" /> 
            <p className="w-10/12 font-poppins font-semibold text-[1.25vw]">{text}</p>
        </div>
    )
}