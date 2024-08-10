import { useMediaQuery } from "react-responsive";
import GoalsButton from "@/Components/GoalsButton";

export default function Harga ({ registrationLink }) {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    
    return (
        <section id="harga" className="container mx-auto md:w-auto mb-[9vw] md:mb-[3.4vw]">
            <h2 className="w-8/12 mx-auto md:w-auto text-[5vw] md:text-[2.5vw] text-black md:leading-[4vw] mb-[2.5vw] text-center md:text-start"><span className="text-primary">Harga</span> Dibimbing Satu Semester</h2>
            <div className="flex justify-between items-center border-b border-neutral-20 pb-[4vw] md:pb-[1vw]">
                <p className="font-poppins font-semibold text-[3.256vw] md:text-[1.25vw]">Dengan benefit dan value <br />sebanyak itu senilai</p>
                <p className="font-poppins font-bold text-[3.72vw] md:text-[1.875vw]">2000K</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center py-[6vw] md:py-[2vw]">
                <p className="font-poppins font-semibold text-[3.256vw] md:text-[1.25vw] mb-[6vw] md:mb-0">Khusus pendaftaran di bulan September,  <br />kamu bisa dapetin cuma dengan harga</p>
                <p className="font-poppins font-bold text-[5.56vw] md:text-[1.875vw] md:text-red-700 relative before:content-['2000K'] before:absolute before:-top-[3vw] md:before:-top-[1vw] before:text-center md:before:text-right before:w-full before:font-semibold before:line-through before:decoration-red-700 before:text-dark before:text-[2.79vw] md:before:text-[1vw]">199K</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center text-white py-[3vw] md:p-[1vw] bg-red-400 rounded-[3.72vw] md:rounded-[.75vw] gap-[2vw] md:gap-0">
                <p className="w-10/12 md:w-auto text-center font-poppins md:font-medium text-[3.256vw] md:text-[1.25vw]">Pendaftaran Hari ini diskon 50% cuma seharga</p>
                <p className="font-poppins font-medium md:font-bold text-[8.37vw] md:text-[1.875vw]">99K</p>
            </div>
            {!isMobile && <GoalsButton href={registrationLink} className="w-fit px-[2vw] font-sans text-[1.04vw] rounded-[.5vw] mt-[2.14vw]">Daftar Sekarang</GoalsButton>}
        </section>
    )
}