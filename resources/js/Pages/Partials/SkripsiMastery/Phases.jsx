import GoalsButton from "@/Components/elements/GoalsButton";
import background from "/resources/img/vector/gradient-bg-7.svg";

export default function Phases () {
    const data = [
        "Mindset dan Aktivasi Critical Thinking Dalam Kepenulisan",
        "Menemukan Topik Terbaik untuk Skripsimu",
        "Menyusun Proposal Skripsi dan Halaman Skripsi",
        "Metodologi Penelitian",
        "Pengumpulan Data Berdasarkan Teori Indikator",
        "Selesai Bab 4 dan Bab 5 Tanpa Drama",
        "Menghadapi Sidang Akhir dengan Penuh Kesiapan"
    ]

    return (
        <section id="phases" className="relative md:pt-[6.2vw] md:pb-[3.85vw] overflow-hidden">
            <div className="absolute -top-[10vw] right-0 -z-10">
                <img src={background} alt="Background Image" className="w-[65vw]" />
            </div>
            <div className="w-[84.375%] mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="md:w-[49.11vw] md:text-[2.5vw]">Bagaimana Program Skripsi Mastery ini Bisa Membantu Masa Depanmu?</h2>
                    <p className="md:w-[33.18vw] md:text-[1.25vw]">Kami udah siapin roadmap fast track buat kamu nyusun skripsi di tahun 2025 biar ga perlu nambah semester lagi</p>
                </div>
                <div className="flex justify-center md:mt-[8.34vw] md:mb-[4.69vw]">
                    <div className="md:w-[30.21vw]">
                        {data.map((item, index) => index ? (
                            <div key={index}>
                                <hr className="border-dark my-[2.08vw]" />
                                <div className="flex justify-between items-center">
                                    <p className="font-poppins font-bold text-secondary md:text-[2.5vw]">Phase<span className="md:text-[3.75vw]">{index+1}</span></p>
                                    <p className="md:w-[15vw]">{item}</p>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="flex justify-between items-center">
                                <p className="font-poppins font-bold text-secondary md:text-[2.5vw]">Phase<span className="md:text-[3.75vw]">{index+1}</span></p>
                                <p className="md:w-[15vw]">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <GoalsButton variant="bordered">BONUS Time Management dan Tools Bantu Skripsimu</GoalsButton>
                </div>
            </div>
        </section>
    )
}