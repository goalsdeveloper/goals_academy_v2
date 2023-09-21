export default function RegistrationSteps () {
    return (
        <section id="registration_steps" className="my-8 xl:my-12 3xl:my-16 bg-soft">
            <div className="container mx-auto py-16 md:py-12 xl:py-20 3xl:py-28">
                <h3 className="text-dark text-center mb-8 md:mb-4 xl:mb-8 3xl:mb-12 text-24 md:text-14 lg:text-18 xl:text-24 3xl:text-32">Langkah Pendaftaran</h3>
                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-2">
                    <div className="w-6/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                        <i className="bi bi-person-workspace text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>Isi Formulir dan Lengkapi Berkas</p>
                    </div>
                    <div className="w-6/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                        <i className="bi bi-file-earmark-image text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>Screening CV dan Portofolio</p>
                    </div>
                    <div className="w-6/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                        <i className="bi bi-mic text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>Interview</p>
                    </div>
                    <div className="w-6/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                        <i className="bi bi-pen text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>Tanda Tangan Kontrak</p>
                    </div>
                    <div className="w-6/12 md:w-2/12 flex items-center gap-4 md:gap-2 xl:gap-4">
                        <i className="bi bi-window-dock text-56 md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>On-boarding</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
