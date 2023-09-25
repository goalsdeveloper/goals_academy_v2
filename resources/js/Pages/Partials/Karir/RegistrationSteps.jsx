import wave1 from "/resources/img/vector/wave-1.svg";
import wave2 from "/resources/img/vector/wave-2.svg";

export default function RegistrationSteps () {
    return (
        <section id="registration_steps" className="relative my-8 xl:my-12 3xl:my-16 bg-secondary md:bg-soft">
            <div className="md:hidden">
                <img className="absolute bottom-0 left-0 w-10/12" src={wave1} alt="Wave 1" />
                <img className="absolute bottom-0 left-0 w-10/12" src={wave2} alt="Wave 1" />
                <img className="absolute top-0 right-0 -scale-x-1 -scale-y-1 w-10/12" src={wave1} alt="Wave 1" />
                <img className="absolute top-0 right-0 -scale-x-1 -scale-y-1 w-10/12" src={wave2} alt="Wave 1" />
            </div>
            <div className="container mx-auto py-16 md:py-12 xl:py-20 3xl:py-28">
                <h3 className="text-white md:text-dark text-center mb-8 md:mb-4 xl:mb-8 3xl:mb-12 text-32 md:text-14 lg:text-18 xl:text-24 3xl:text-32">Langkah Pendaftaran</h3>
                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-2 text-secondary md:text-dark font-medium md:font-normal">
                    <div className="w-full rounded-lg shadow-centered-spread md:shadow-none bg-white md:bg-transparent flex justify-center py-8 md:py-0">
                        <div className="w-8/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-person-workspace text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                            <p className="text-20 md:text-8 lg:text-12 xl:text-14 3xl:text-20">Isi Formulir dan Lengkapi Berkas</p>
                        </div>
                    </div>
                    <div className="w-full rounded-lg shadow-centered-spread md:shadow-none bg-white md:bg-transparent flex justify-center py-8 md:py-0">
                        <div className="w-8/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-file-earmark-image text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                            <p className="text-20 md:text-8 lg:text-12 xl:text-14 3xl:text-20">Screening CV dan Portofolio</p>
                        </div>
                    </div>
                    <div className="w-full rounded-lg shadow-centered-spread md:shadow-none bg-white md:bg-transparent flex justify-center py-8 md:py-0">
                        <div className="w-8/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-mic text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                            <p className="text-20 md:text-8 lg:text-12 xl:text-14 3xl:text-20">Interview</p>
                        </div>
                    </div>
                    <div className="w-full rounded-lg shadow-centered-spread md:shadow-none bg-white md:bg-transparent flex justify-center py-8 md:py-0">
                        <div className="w-8/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-pen text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                            <p className="text-20 md:text-8 lg:text-12 xl:text-14 3xl:text-20">Tanda Tangan Kontrak</p>
                        </div>
                    </div>
                    <div className="w-full rounded-lg shadow-centered-spread md:shadow-none bg-white md:bg-transparent flex justify-center py-8 md:py-0">
                        <div className="w-8/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-window-dock text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                            <p className="text-20 md:text-8 lg:text-12 xl:text-14 3xl:text-20">On-boarding</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
