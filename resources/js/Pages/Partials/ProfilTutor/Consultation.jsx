import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import imgConsultation from "/resources/img/tutor/consultation-img.png";
import bgConsultation from "/resources/img/tutor/bg-consultation.png";
import GoalsButton from "@/Components/GoalsButton";

export default function Consultation() {
    return (
        <section
            id="consultation"
            className="mb-[44vw] md:mb-[13vw] pt-[13vw] pb-20 bg-[url('/resources/img/tutor/bg-consultation-main.png')] bg-cover"
        >
            <div className="relative container-lg mx-auto flex flex-col-reverse md:flex-row gap-3 items-center">
                {/* <div className="w-full md:w-7/12 text-center md:text-start">
                        <h3 className="mb-2 lg:mb-3 xl:mb-4 leading-normal">Masih Bingung Program Apa yang <br /><span className="text-primary">Sesuai dengan Kebutuhanmu?</span></h3>
                        <p className="hidden md:inline-block text-6 xs:text-10 sm:text-12 md:text-8 lg:text-10 xl:text-12 3xl:text-16">Mari konsultasikan program yang cocok dan sesuai kebutuhanmu sekarang juga.</p>
                    </div> */}
                <div className="absolute md:relative md:flex md:flex-col md:gap-3 text-center w-full md:w-auto">
                    <div className="absolute md:static p-2 bg-white shadow-sm rounded-xl right-0 bottom-10 w-min md:w-auto ">
                        <h4 className="">98%</h4>
                        <p className="">Berprestasi</p>
                    </div>
                    <div className="absolute md:static p-2 bg-white shadow-sm rounded-xl left-0 bottom-16 w-min md:w-auto">
                        <h4 className="">100%</h4>
                        <p className="">Berpengalaman</p>
                    </div>
                </div>
                <img src={imgConsultation} className="w-full md:w-2/4" />
                <h3 className="px-3 text-center md:text-left">
                    Pengalaman bimbingan terbaik bersama tutor-tutor pilihan
                </h3>
                {/* <div className="w-5/12 md:w-5/12 flex justify-center md:justify-end">
                    <a
                        href="https://wa.me/6282147638286"
                        className="w-11/12 sm:w-10/12 md:w-5/12 h-6 xs:h-10 sm:h-12 md:h-6 lg:h-8 xl:h-10 2xl:h-12 3xl:h-14"
                        target="_blank"
                    >
                        <ButtonHoverSlide className="h-full before:p-1 sm:before:p-2 md:before:p-0.5 lg:before:p-1.5 xl:before:p-1 2xl:before:p-1.5 3xl:before:p-2.5 before:content-arrow-right-16 xs:before:content-arrow-right-20 sm:before:content-arrow-right-32 md:before:content-arrow-right-16 lg:before:content-arrow-right-20 xl:before:content-arrow-right-32 after:content-consultation after:text-primary after:font-medium border-1 xl:border-2 border-primary rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-primary text-10 xs:text-14 sm:text-18 md:text-8 lg:text-12 xl:text-14 3xl:text-20 bg-white"></ButtonHoverSlide>
                    </a>
                </div> */}
                <div
                    className={`flex flex-col justify-evenly md:justify-center rounded-md absolute text-white
                    p-5 md:p-10 bottom-[-12rem] md:bottom-[-8rem] w-full h-[25vh] md:h-[20vh] shadow-md
                    bg-[url('/resources/img/tutor/bg-consultation.png')] bg-cover bg-center bg-no-repeat text-center md:text-left`}
                >
                    <p>Masih punya pertanyaan?</p>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between item-center">
                        <h4 className="text-white">
                            Tanyakan via chat ke konsultan pendidikan
                        </h4>
                        <GoalsButton
                            className={
                                "rounded-full md:rounded-md px-4 bg-white !text-primary hover:bg-secondary hover:!text-white w-[50%] md:w-auto mx-auto md:me-0"
                            }
                        >
                            Chat Konsultan
                        </GoalsButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
