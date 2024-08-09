import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination, Navigation, FreeMode } from "swiper/modules";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
    
export default function Tutor ({ items }) {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="tutor" className="w-full overflow-hidden md:overflow-visible mx-auto md:w-auto mb-[9vw] md:mb-[3.4vw]">
            <h2 className="container mx-auto md:w-auto text-[5vw] md:text-[2.5vw] text-black  text-center md:text-start md:leading-[4vw] mb-[2.5vw]">Tutor yang Siap<br /><span className="text-primary">Membantu Kelulusanmu</span></h2>
            {isMobile ? (
                <div className="container mx-auto">
                    <Swiper
                        modules={[Navigation, Pagination, A11y, FreeMode]}
                        autoplay={true}
                        className="swiper-mobile"
                        wrapperClass="py-[2vw]"
                        slidesPerView="auto"
                        spaceBetween={20}
                        draggable
                        freeMode
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index} style={{ width: "fit-content" }} >
                                <Card {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className="w-[60vw] flex gap-[1.67vw]">
                    {items.map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </div>
            )}
        </section>
    )
}

function Card ({ name, title, img, linkedin, instagram, text }) {
    return (
        <div className="w-[54.19vw] md:w-[18.75vw] border rounded-[3.72vw] md:rounded-[1vw] bg-primary-10 py-[5.56vw] px-[3.95vw] md:py-[1.25vw] md:px-[1vw] space-y-[3vw] md:space-y-[1.25vw]">
            {img 
                ? <img src={img} className="w-full h-[34.42vw] md:h-[12.65vw] object-cover border rounded-[3.72vw] md:rounded-[1vw] overflow-hidden" /> 
                : <div className="w-full h-[34.42vw] md:h-[12.65vw] border rounded-[3.72vw] md:rounded-[1vw] bg-white"></div>
            }
            <div>
                <h4 className="text-[3.256vw] md:text-[1.04vw] mb-[.25vw]">{name}</h4>
                <p className="font-poppins text-[3.256vw] md:text-[1.04vw]">{title}</p>
            </div>
            <div className="flex gap-[1.5vw] md:gap-[.5vw]">
                <a href={linkedin} className="border border-neutral-20 rounded-full p-[1.5vw] md:p-[.5vw]"><FaLinkedinIn className="text-[3vw] md:text-[1.25vw]" /></a>
                <a href={instagram} className="border border-neutral-20 rounded-full p-[1.5vw] md:p-[.5vw]"><FaInstagram className="text-[3vw] md:text-[1.25vw]" /></a>
            </div>
            <p className="text-[3.256vw] md:text-[1.04vw]">{text}</p>
        </div>
    )
}