import CornerWaveVector from "@/Components/CornerWaveVector";

export default function RegistrationSteps () {
    return (
        <section id="registration_steps" className="relative mt-0 mb-16 md:my-16 lg:my-20 xl:my-24 3xl:my-32 bg-secondary">
            <CornerWaveVector
                cornerClassName="w-10/12 md:w-4/12"
            />
            <div className="container mx-auto py-12 xs:py-16 md:py-12 xl:py-16 3xl:py-24">
                <h3 className="text-white text-center mb-8 md:mb-4 xl:mb-8 3xl:mb-12 text-24 xs:text-32 md:text-14 lg:text-18 xl:text-24 3xl:text-32">Langkah Pendaftaran</h3>
                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 text-secondary font-medium md:font-normal">
                    <div className="w-full md:h-[10vw] xl:h-[12vw] rounded-md md:rounded-lg shadow-centered-spread md:shadow-none bg-white flex justify-center items-center md:text-center py-6 md:py-0">
                        <div className="w-8/12 flex md:flex-col items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-person-workspace text-36 md:text-28 lg:text-32 xl:text-48 3xl:text-56"></i>
                            <p className="md:h-[2vw] text-dark md:font-medium text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20 md:flex md:items-center">Isi Formulir dan Lengkapi Berkas</p>
                        </div>
                    </div>
                    <div className="w-full md:h-[10vw] xl:h-[12vw] rounded-md md:rounded-lg shadow-centered-spread md:shadow-none bg-white flex justify-center items-center md:text-center py-6 md:py-0">
                        <div className="w-8/12 flex md:flex-col items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-file-earmark-image text-36 md:text-28 lg:text-32 xl:text-48 3xl:text-56"></i>
                            <p className="md:h-[2vw] text-dark md:font-medium text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20 md:flex md:items-center">Screening CV dan Portofolio</p>
                        </div>
                    </div>
                    <div className="w-full md:h-[10vw] xl:h-[12vw] rounded-md md:rounded-lg shadow-centered-spread md:shadow-none bg-white flex justify-center items-center md:text-center py-6 md:py-0">
                        <div className="w-8/12 flex md:flex-col items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-mic text-36 md:text-28 lg:text-32 xl:text-48 3xl:text-56"></i>
                            <p className="md:h-[2vw] text-dark md:font-medium text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20 md:flex md:items-center">Interview</p>
                        </div>
                    </div>
                    <div className="w-full md:h-[10vw] xl:h-[12vw] rounded-md md:rounded-lg shadow-centered-spread md:shadow-none bg-white flex justify-center items-center md:text-center py-6 md:py-0">
                        <div className="w-8/12 flex md:flex-col items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-pen text-36 md:text-28 lg:text-32 xl:text-48 3xl:text-56"></i>
                            <p className="md:h-[2vw] text-dark md:font-medium text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20 md:flex md:items-center">Tanda Tangan Kontrak</p>
                        </div>
                    </div>
                    <div className="w-full md:h-[10vw] xl:h-[12vw] rounded-md md:rounded-lg shadow-centered-spread md:shadow-none bg-white flex justify-center items-center md:text-center py-6 md:py-0">
                        <div className="w-8/12 flex md:flex-col items-center gap-4 md:gap-2 xl:gap-4">
                            <i className="bi bi-window-dock text-36 md:text-28 lg:text-32 xl:text-48 3xl:text-56"></i>
                            <p className="md:h-[2vw] text-dark md:font-medium text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20 md:flex md:items-center">On-boarding</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
