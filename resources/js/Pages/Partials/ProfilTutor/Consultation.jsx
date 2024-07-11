import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import imgConsultation from "/resources/img/tutor/consultation-img.png";
import bgConsultation from "/resources/img/tutor/bg-consultation.png";
import GoalsButton from "@/Components/GoalsButton";

export default function Consultation() {
    return (
        <section
            id="consultation"
            className="mb-[44vw] md:mb-[13vw] pt-[13vw] pb-20 bg-[url('/resources/img/tutor/bg-consultation-main.svg')] bg-cover "
        >
            <div className="relative container-lg mx-auto flex flex-col-reverse md:flex-row gap-3 items-center">
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
                <div
                    className={`flex flex-col justify-evenly md:justify-center rounded-md absolute text-white
                    p-5 md:p-10 bottom-[-35vw] md:bottom-[-8vw] w-[85vw] md:w-full h-[42vw] md:h-[13vw] shadow-md
                    bg-[url('/resources/img/tutor/bg-consultation.svg')] bg-[length:85vw_height:42vw] md:bg-[length:74vw_height:13vw] bg-center bg-no-repeat text-center md:text-left`}
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
