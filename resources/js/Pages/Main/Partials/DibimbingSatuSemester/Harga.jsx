import GoalsButton from "@/Components/GoalsButton";

export default function Harga () {
    return (
        <section id="harga" className="mb-[3.4vw]">
            <h2 className="text-[2.5vw] text-black leading-[4vw] mb-[2.5vw]"><span className="text-primary">Harga</span> Dibimbing Satu Semester</h2>
            <div className="flex justify-between items-center border-b border-neutral-20 pb-[1vw]">
                <p className="font-poppins font-semibold text-[1.25vw]">Dengan benefit dan value <br />sebanyak itu senilai</p>
                <p className="font-poppins font-bold text-[1.875vw]">2000K</p>
            </div>
            <div className="flex justify-between items-center py-[2vw]">
                <p className="font-poppins font-semibold text-[1.25vw]">Khusus pendaftaran di bulan September,  <br />kamu bisa dapetin cuma dengan harga</p>
                <p className="font-poppins font-bold text-[1.875vw] text-red-700 relative before:content-['2000K'] before:absolute before:-top-[1vw] before:right-0 before:font-semibold before:line-through before:decoration-red-700 before:text-dark before:text-[1vw]">199K</p>
            </div>
            <div className="flex justify-between items-center text-white p-[1vw] bg-red-400 rounded-[.75vw]">
                <p className="font-poppins font-medium text-[1.25vw]">Pendaftaran Hari ini diskon 50% cuma seharga</p>
                <p className="font-poppins font-bold text-[1.875vw]">99K</p>
            </div>
            <GoalsButton className="w-fit px-[2vw] font-sans text-[1.04vw] rounded-[.5vw] mt-[2.14vw]">Daftar Sekarang</GoalsButton>
        </section>
    )
}