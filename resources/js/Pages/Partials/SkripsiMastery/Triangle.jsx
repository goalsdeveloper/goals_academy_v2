import { useMediaQuery } from "react-responsive";
import image from "/resources/img/skripsi-mastery/triangle.svg";

export default function Triangle () {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="triangle" className="pt-[12.86vw] pb-[16vw] md:pt-[3.85vw] md:pb-0">
            <div className="w-[88.35%] md:w-[84.375%] mx-auto space-y-[10.92vw] md:space-y-[7.7vw]">
                <h2 className="text-center text-[5.825vw] md:text-[2.5vw]">Riset mengatakan, 3 hal ini bikin skripsimu gak selesai</h2>
                <div className="md:space-y-[1vw]">
                    <div className="flex justify-between">
                        <div className="w-[40.29vw] md:w-[17.24vw] text-center space-y-[1.94vw] md:space-y-[1.25vw]">
                            <h3 className="text-[5.825vw] md:text-[2.5vw]">Prokrastinasi</h3>
                            <p className="text-[2.9vw] md:text-[1.25vw]">Manajemen Waktumu yang Berantakan</p>
                        </div>
                        {!isMobile && (
                            <div>
                                <img src={image} alt="Triangle Image" className="w-full md:w-[41.67vw] md:h-[41.67vw]" />
                            </div>
                        )}
                        <div className="w-[40.29vw] md:w-[17.24vw] text-center space-y-[1.94vw] md:space-y-[1.25vw]">
                            <h3 className="text-[5.825vw] md:text-[2.5vw]">Eksternal</h3>
                            <p className="text-[2.9vw] md:text-[1.25vw]">Dosen Pembimbing, Akses Data, Ga Ada Support System</p>
                        </div>
                    </div>
                    {isMobile && (
                        <div>
                            <img src={image} alt="Triangle Image" className="w-full md:w-[41.67vw] md:h-[41.67vw]" />
                        </div>
                    )}
                    <div className="flex justify-center">
                        <div className="w-[42.48vw] md:w-[19vw] text-center space-y-[1.94vw] md:space-y-[1.25vw]">
                            <h3 className="text-[5.825vw] md:text-[2.5vw]">Dirimu Sendiri</h3>
                            <p className="text-[2.9vw] md:text-[1.25vw]">Rasa Malas Membunuhmu, Gausah Banyak Alasan</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}