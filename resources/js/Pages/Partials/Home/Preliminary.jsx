import figure2 from "/resources/img/figure/2.svg";

function SquareIcon ({iconClass}) {
    return (
        <div className="rounded-lg lg:rounded-xl shadow-bottom-right p-4 md:p-3 lg:p-4 xl:p-6">
            <i className={iconClass}></i>
        </div>
    )
}

export default function Preliminary () {
    return (
        <section id="introduction" className="my-14 xs:my-16 xl:my-24 3xl:my-32">
            <div className="container mx-auto flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-0">
                <div className="w-full sm:w-10/12 md:w-6/12">
                    <img src={figure2} alt="Figure 2" />
                </div>
                <div className="md:w-5/12 3xl:w-6/12 3xl:ps-16">
                    <h2>Jarak bukan Masalah untuk <span className="text-primary">Lulus Lebih Cepat.</span></h2>
                    <p className="mt-2 mb-4 sm:mb-6 xl:mt-4 xl:mb-10 3xl:mt-6 3xl:mb-14">Buat jadwal bimbingan dengan tutor secara online atau tatap muka dan berinteraksi secara langsung.</p>
                    <div className="grid w-full xl:w-11/12 3xl:w-11/12 gap-4">
                        <div className="flex items-center gap-4">
                            <SquareIcon iconClass="fa-solid fa-chalkboard-user text-20 md:text-12 lg:text-24 xl:text-28" />
                            <div>
                                <h5 className="mb-1">Tutor <span className="text-primary">Profesional dan Friendly</span></h5>
                                <p>Dibimbing oleh tutor yang berpengalaman dan seru</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <SquareIcon iconClass="fa-solid fa-business-time text-20 md:text-12 lg:text-24 xl:text-28" />
                            <div>
                                <h5 className="mb-1">Bebas <span className="text-primary">Request Jadwal</span></h5>
                                <p>Pilih jadwal bimbingan sesuai kebutuhanmu</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <SquareIcon iconClass="fa-solid fa-graduation-cap text-20 md:text-12 lg:text-24 xl:text-28" />
                            <div>
                                <h5 className="mb-1">Mentoring <span className="text-primary">24/7</span></h5>
                                <p>Bebas konsultasi dan tanya-tanya tentang skripsimu</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <SquareIcon iconClass="bi bi-rocket-takeoff-fill text-24 md:text-14 lg:text-28 xl:text-36" />
                            <div>
                                <h5 className="mb-1">Program <span className="text-primary">Lulus 3 Bulan</span></h5>
                                <p>Punya cara efektif dan efisien untuk mempercepat kelulusanmu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
