export default function RegistrationSteps () {
    return (
        <section id="registration_steps" className="my-8 xl:my-12 3xl:my-16 bg-soft">
            <div className="container mx-auto md:py-12 xl:py-20 3xl:py-28">
                <h3 className="text-dark text-center md:mb-4 xl:mb-8 3xl:mb-12">Langkah Pendaftaran</h3>
                <div className="w-full flex justify-center gap-2">
                    <div className="w-2/12 flex items-center md:gap-2 xl:gap-4">
                        <i className="bi bi-person-workspace md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>Isi Formulir dan Lengkapi Berkas</p>
                    </div>
                    <div className="w-2/12 flex items-center md:gap-2 xl:gap-4">
                        <i className="bi bi-file-earmark-image md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>Screening CV dan Portofolio</p>
                    </div>
                    <div className="w-2/12 flex items-center md:gap-2 xl:gap-4">
                        <i className="bi bi-mic md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>Interview</p>
                    </div>
                    <div className="w-2/12 flex items-center md:gap-2 xl:gap-4">
                        <i className="bi bi-pen md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>Tanda Tangan Kontrak</p>
                    </div>
                    <div className="w-2/12 flex items-center md:gap-2 xl:gap-4">
                        <i className="bi bi-window-dock md:text-20 xl:text-32 3xl:text-36"></i>
                        <p>On-boarding</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
