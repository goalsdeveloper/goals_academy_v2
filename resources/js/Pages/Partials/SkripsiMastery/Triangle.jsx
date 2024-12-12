import image from "/resources/img/skripsi-mastery/triangle.svg";

export default function Triangle () {
    return (
        <section id="triangle" className="md:pt-[3.85vw]">
            <div className="w-[84.375%] mx-auto md:space-y-[7.7vw]">
                <h2 className="text-center md:text-[2.5vw]">Riset mengatakan, 3 hal ini bikin skripsimu gak selesai</h2>
                <div className="md:space-y-[1vw]">
                    <div className="flex justify-between">
                        <div className="md:w-[17.24vw] text-center md:space-y-[1.25vw]">
                            <h3 className="md:text-[2.5vw]">Prokrastinasi</h3>
                            <p className="md:text-[1.25vw]">Manajemen Waktumu yang Berantakan</p>
                        </div>
                        <div>
                            <img src={image} alt="Triangle Image" className="md:w-[41.67vw] md:h-[41.67vw]" />
                        </div>
                        <div className="md:w-[17.24vw] text-center md:space-y-[1.25vw]">
                            <h3 className="md:text-[2.5vw]">Eksternal</h3>
                            <p className="md:text-[1.25vw]">Dosen Pembimbing, Akses Data, Ga Ada Support System</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="md:w-[19vw] text-center md:space-y-[1.25vw]">
                            <h3 className="md:text-[2.5vw]">Dirimu Sendiri</h3>
                            <p className="md:text-[1.25vw]">Rasa Malas Membunuhmu, Gausah Banyak Alasan</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}