import ButtonHoverSlide from "@/Components/ButtonHoverSlide";

export default function Consultation () {
    return (
        <section id="consultation" className="my-16 xl:my-24 3xl:my-32">
            <div className="container mx-auto">
                <div className="flex flex-wrap flex-col md:flex-row items-center bg-soft md:bg-transparent shadow-centered-spread md:shadow-centered rounded-xl xl:rounded-2xl p-8 md:p-14 lg:p-18 xl:p-24 3xl:p-32">
                    <div className="w-full md:w-7/12 text-center md:text-start">
                        <h3 className="mb-6 md:mb-2 lg:mb-3 xl:mb-4 leading-normal">Masih Bingung Program Apa yang <br /><span className="text-primary">Sesuai dengan Kebutuhanmu?</span></h3>
                        <p className="hidden md:inline-block md:text-8 lg:text-10 xl:text-12 3xl:text-16">Mari konsultasikan program yang cocok dan sesuai kebutuhanmu sekarang juga.</p>
                    </div>
                    <div className="w-full md:w-5/12 flex justify-center md:justify-end">
                        <a href="https://wa.me/6285637564245" className="w-6/12 h-10 md:h-8 lg:h-10 xl:h-12 3xl:h-16" target="_blank">
                            <ButtonHoverSlide className="h-full before:p-1 md:before:p-1.5 lg:before:p-1 xl:before:p-1.5 before:content-arrow-right-20 xs:before:content-arrow-right-32 md:before:content-arrow-right-20 lg:before:content-arrow-right-32 xl:before:content-arrow-right-32 after:content-consultation after:text-primary after:font-medium border-1 xl:border-2 border-primary rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-primary bg-white"></ButtonHoverSlide>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
