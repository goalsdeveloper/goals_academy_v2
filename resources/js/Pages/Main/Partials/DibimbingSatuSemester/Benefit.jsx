import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination, Navigation, FreeMode } from "swiper/modules";
import { useMediaQuery } from "react-responsive";
import GoalsButton from "@/Components/GoalsButton";
import { BiSolidCheckCircle } from "react-icons/bi";

export default function Benefit ({ items1, items2, registrationLink }) {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="benefit" className="md:w-auto mb-[9vw] md:mb-[3.4vw] relative">
            {isMobile ? (
                <div className="mb-[9vw] md:mb-[3.4vw] overflow-hidden">
                    <h2 className="container mx-auto md:w-auto text-[5vw] md:text-[2.5vw] text-black md:leading-[3.5vw] text-center mb-[8.37vw]">Benefit dan Keunggulan <span className="text-primary">Dibimbing Satu Semester</span></h2>
                    <div className="container mx-auto">
                        <Swiper
                            modules={[Navigation, Pagination, A11y, FreeMode]}
                            className="swiper-mobile"
                            wrapperClass="py-[2vw]"
                            slidesPerView="auto"
                            spaceBetween={20}
                            draggable
                            freeMode
                        >
                            {items1.map((item, index) => (
                                <SwiperSlide key={index} style={{ width: "fit-content" }} >
                                    <Card {...item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:gap-[2.24vw] mb-[9vw] md:mb-[3.4vw]">
                    <div>
                        <h2 className="text-[5vw] md:text-[2.5vw] text-black md:leading-[3.5vw]">Benefit dan Keunggulan <span className="text-primary">Dibimbing Satu Semester</span></h2>
                    </div>
                    {items1.map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </div>
            )}
            <div className="container mx-auto md:w-auto">
                <h2 className="md:w-10/12 text-[5vw] md:text-[2.5vw] text-black md:leading-[3.5vw] text-center md:text-start">Apa Aja yang Kamu Dapetin dari <span className="text-primary">Dibimbing Satu Semester?</span></h2>
                <div className="grid md:grid-cols-2 gap-y-[3vw] md:gap-y-[2.4vw] my-[7vw] md:my-[3.07vw]">
                    {items2.map((item, index) => (
                        <Item key={index} {...item} />
                    ))}
                </div>
                {!isMobile && <GoalsButton href={registrationLink} className="w-fit px-[2vw] font-sans text-[2vw] md:text-[1.04vw] rounded-[.5vw]">Daftar Sekarang</GoalsButton>}
            </div>
        </section>
    )
}

function Card ({ title, text, icon, className }) {
    return (
        <div className={`${className} w-[69.77vw] md:w-auto shadow-normal rounded-[4.65vw] md:rounded-[2.08vw] p-[8.14vw] md:p-[2.5vw] space-y-[2.33vw] md:space-y-[1vw]`}>
            <div className="w-fit bg-white rounded-full p-[2vw] md:p-[1vw]">
                {icon}
            </div>
            <h4 className="font-semibold text-[3.25vw] md:text-[1.25vw]">{title}</h4>
            <p className="text-[2.8vw] md:text-[1.04vw]">{text}</p>
        </div>
    )
}

function Item ({ text }) {
    return (
        <div className="flex items-center gap-[2.5vw] md:gap-[1vw]">
            <BiSolidCheckCircle className="text-[5.6vw] md:text-[2.25vw] text-primary" /> 
            <p className="w-10/12 font-poppins font-semibold text-[3.256vw] md:text-[1.25vw]">{text}</p>
        </div>
    )
}