import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";
import TeamCard from "@/Components/TeamCard";

import CEO from "/resources/img/tim/yordhan.png";

export default function Team ({ data }) {
    return (
        <section id="team" className="my-16 xl:my-24 3xl:my-32 overflow-hidden">
            <h2 className="text-center">Tim Goals Academy</h2>
            <div className="bg-soft my-8 md:my-8 lg:my-12 xl:my-16 2xl:my-20 3xl:my-24">
                <div className="container mx-auto flex flex-wrap items-center py-16">
                    <div className="w-7/12">
                        <h1 className="font-thin">“Creating quality human resources over quantity”</h1>
                    </div>
                    <div className="w-5/12 flex flex-col gap-4">
                        <div className="flex items-center justify-center md:rounded-md xl:rounded-xl overflow-hidden md:h-[27vw]">
                            <img className="w-full" src={CEO} alt="Chief Executive Officer" />
                        </div>
                        <div>
                            <div className="flex md:gap-1 lg:gap-2 2xl:gap-3">
                                <h4 className="text-dark">Yordhan Ghalis Dewangga</h4>
                                <a target="_blank" href={`https://www.linkedin.com/in/yordhan-ghalis-dewangga-s-h-4b6144129`}><i className="bi bi-linkedin md:text-8 lg:text-12 xl:text-16 2xl:text-20 3xl:text-24"></i></a>
                                <a target="_blank" href={`https://www.instagram.com/yordhanmahasa89`}><i className="bi bi-instagram md:text-8 lg:text-12 xl:text-16 2xl:text-20 3xl:text-24"></i></a>
                            </div>
                            <p>Chief Executive Officer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="hidden md:grid md:grid-cols-3 gap-16 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 3xl:gap-10">
                    {data.map(({name, title, image, description, linkedin, instagram}, index) => {
                        return (
                            <TeamCard key={index} name={name} title={title} image={image} description={description} linkedin={linkedin} instagram={instagram} />
                        )
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

