import video from "/resources/img/skripsi-mastery/triangle.webm";

export default function Triangle () {
    return (
        <section id="triangle" className="pt-[12.86vw] pb-[16vw] md:pt-[3.85vw] md:pb-0">
            <div className="w-[88.35%] md:w-[84.375%] mx-auto space-y-[10.92vw] md:space-y-[7.7vw]">
                <h2 className="text-center text-[5.825vw] md:text-[2.5vw]">Riset Mengatakan, 3 Hal ini Bikin Skripsimu Gak Selesai</h2>
                <div className="md:space-y-[1vw]">
                    <div className="flex justify-between">
                        <div className="w-[40.29vw] md:w-[17.24vw] text-center space-y-[1.94vw] md:space-y-[1.25vw]">
                            <h3 className="text-[5.825vw] md:text-[2.5vw]">Prokrastinasi</h3>
                            <p className="text-[2.9vw] md:text-[1.25vw]">Manajemen Waktumu yang Berantakan</p>
                        </div>
                        <div className="w-[40.29vw] md:w-[17.24vw] text-center space-y-[1.94vw] md:space-y-[1.25vw]">
                            <h3 className="text-[5.825vw] md:text-[2.5vw]">Eksternal</h3>
                            <p className="text-[2.9vw] md:text-[1.25vw]">Dosen Pembimbing, Akses Data, Ga Ada Support System</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <video autoPlay loop muted playsInline controls={false} className="w-full md:w-auto md:h-[41.67vw]">
                            <source src={video} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
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
