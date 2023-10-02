import ButtonHoverSlide from "@/Components/ButtonHoverSlide";

export default function Consultation () {
    return (
        <section id="consultation" className="my-16 xs:my-20 md:my-16 lg:my-20 xl:my-24 3xl:my-32">
            <div className="md:container mx-auto">
                <div className="flex flex-col md:flex-row flex-wrap items-center shadow-centered-spread md:rounded-md lg:rounded-xl xl:rounded-2xl p-12 md:p-14 lg:p-18 xl:p-24 3xl:p-32 gap-2 md:gap-0">
                    <div className="w-full md:w-7/12 text-center md:text-start">
                        <h3 className="mb-2 lg:mb-3 xl:mb-4 leading-normal">Masih Bingung Program Apa yang <br /><span className="text-primary">Sesuai dengan Kebutuhanmu?</span></h3>
                        <p className="hidden md:inline-block text-6 xs:text-10 sm:text-12 md:text-8 lg:text-10 xl:text-12 3xl:text-16">Mari konsultasikan program yang cocok dan sesuai kebutuhanmu sekarang juga.</p>
                    </div>
                    <div className="w-5/12 md:w-5/12 flex justify-center md:justify-end">
                        <a href="https://wa.me/6285637564245" className="w-11/12 sm:w-10/12 md:w-5/12 h-6 xs:h-10 sm:h-12 md:h-6 lg:h-8 xl:h-10 2xl:h-12 3xl:h-14" target="_blank">
                            <ButtonHoverSlide className="h-full before:p-1 sm:before:p-2 md:before:p-0.5 lg:before:p-1.5 xl:before:p-1 2xl:before:p-1.5 3xl:before:p-2.5 before:content-arrow-right-16 xs:before:content-arrow-right-20 sm:before:content-arrow-right-32 md:before:content-arrow-right-16 lg:before:content-arrow-right-20 xl:before:content-arrow-right-32 after:content-consultation after:text-primary after:font-medium border-1 xl:border-2 border-primary rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-primary text-10 xs:text-14 sm:text-18 md:text-8 lg:text-12 xl:text-14 3xl:text-20 bg-white"></ButtonHoverSlide>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
