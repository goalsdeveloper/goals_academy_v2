import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";
import TeamCard from "@/Components/TeamCard";

import icon from "/resources/img/icon/goals-5.svg";
import CEO from "/resources/img/tim/ceo.png";
import CornerWaveVector from "@/Components/CornerWaveVector";

export default function Team ({ data }) {
    return (
        <section id="team" className="my-16 xl:my-24 3xl:my-32 overflow-hidden">
            <div className="container mx-auto">
                <h2 className="md:text-center text-24 xs:text-30 md:text-16 lg:text-24 xl:text-32 3xl:text-48 leading-tight mb-4 md:mb-0">Tim <br className="md:hidden" /><span className="text-primary">Goals Academy</span></h2>
            </div>
            <div className="hidden md:block relative bg-secondary my-8 md:my-8 lg:my-12 xl:my-16 2xl:my-20 3xl:my-24">
                <CornerWaveVector cornerClassName="w-5/12" />
                <div className="container mx-auto flex flex-wrap items-center py-16 text-white">
                    <div className="w-7/12">
                        <h1 className="font-thin text-white">“Creating quality human resources over quantity”</h1>
                    </div>
                    <div className="w-5/12 flex flex-col gap-4 relative">
                        <img className="absolute md:w-14 lg:w-16 xl:w-20 3xl:w-28 top-[5%] right-[5%]" src={icon} alt="" />
                        <div className="flex items-end justify-center md:rounded-t-md xl:rounded-t-xl overflow-hidden md:h-[23vw] bg-white bg-opacity-30">
                            <img className="w-8/12" src={CEO} alt="Chief Executive Officer" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-white">Yordhan Ghalis Dewangga</h4>
                                <p>Chief Executive Officer</p>
                            </div>
                            <div className="flex gap-2 3xl:gap-4">
                                <a target="_blank" href={`https://www.linkedin.com/in/yordhan-ghalis-dewangga-s-h-4b6144129`}><i className="bi bi-linkedin md:text-16 lg:text-20 xl:text-28 2xl:text-32 3xl:text-36"></i></a>
                                <a target="_blank" href={`https://www.instagram.com/yordhanmahasa89`}><i className="bi bi-instagram md:text-16 lg:text-20 xl:text-28 2xl:text-32 3xl:text-36"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="hidden md:grid md:grid-cols-3 gap-16 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 3xl:gap-10">
                    {data.map(({name, title, image, description, linkedin, instagram}, index) => {
                        if (name != data[0].name) {
                            return (
                                <TeamCard key={index} name={name} title={title} image={image} description={description} linkedin={linkedin} instagram={instagram} />
                            )
                        }
                    })}
                </div>
                <Swiper
                modules={[Navigation, Pagination, A11y, FreeMode]}
                className="swiper-mobile"
                wrapperClass="swiper-wrapper -ms-2"
                slidesPerView={1}
                grabCursor={true}
                freeMode={true}
                >
                    {data.map(({name, title, image, description, linkedin, instagram}, index) => {
                        return (
                            <SwiperSlide key={index} style={{ width: "fit-content" }} className="p-4 md:p-2 lg:p-3 xl:p-4">
                                <TeamCard key={index} name={name} title={title} image={image} description={description} linkedin={linkedin} instagram={instagram} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    )
}

