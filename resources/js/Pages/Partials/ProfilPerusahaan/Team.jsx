import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";
import TeamCard from "@/Components/TeamCard";

import icon from "/resources/img/icon/goals-5.svg";
import CEO from "/resources/img/tim/ceo.png";
import TTD from "/resources/img/tim/ttd-ceo.png";
import CornerWaveVector from "@/Components/CornerWaveVector";

export default function Team ({ data }) {
    return (
        <section id="team" className="my-16 xs:my-20 md:my-16 lg:my-20 xl:my-24 3xl:my-32 overflow-hidden">
            <div className="container mx-auto">
                <h2 className="md:text-center text-24 xs:text-30 md:text-16 lg:text-24 xl:text-32 3xl:text-48 leading-tight mb-4 md:mb-0">Tim <br className="md:hidden" /><span className="text-primary">Goals Academy</span></h2>
            </div>
            <div className="relative bg-secondary my-8 md:my-8 lg:my-12 xl:my-16 2xl:my-20 3xl:my-24">
                <CornerWaveVector cornerClassName="w-5/12" />
                <div className="container-lg justify-between mx-auto flex flex-col-reverse md:flex-row flex-wrap py-16 text-white">
                    <div className="md:w-6/12 lg:w-6/12 h-full flex flex-col justify-between">
                        <h3 className="font-sans font-thin text-white text-justify">Menciptakan akses pendidikan yang bermutu merupakan fondasi penting dalam mendorong kemajuan riset dan teknologi. Untuk mencapai hal ini, kita harus melakukan transformasi yang mendalam terhadap mindset para pelajar dan tenaga pendidik. Dengan mengarahkan mereka menuju pola berfikir yang saintifik dan inovatif, kita membuka pintu bagi kemungkinan-kemungkinan baru dalam pendidikan.</h3>
                        <div className="flex flex-col items-start pt-8 3xl:pt-16">
                            <div className="flex flex-col lg:items-center bg-dark">

                            </div>
                            <h4 className="text-white">
                                <img className="w-1/2 pb-2 items-center" src={TTD} alt="TTD Yordhan" />
                                Yordhan Ghalis Dewangga
                            </h4>
                            <h5 className="font-sans font-normal text-white">Chief Executive Officer</h5>
                        </div>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-6/12 flex flex-col gap-4 relative md:ps-8 3xl:ps-12">
                        <img className="absolute w-16 md:w-16 lg:w-20 xl:w-24 3xl:w-32 top-[5%] right-[5%]" src={icon} alt="" />
                        <div className="flex items-end justify-center rounded-3xl md:rounded-2xl xl:rounded-3xl overflow-hidden md:h-full bg-white  bg-opacity-30 border-2 md:border-4 border-white border-opacity-10 pt-8 md:pt-0 mb-8 md:mb-0">
                            <img className="w-8/12 md:w-9/12 lg:w-8/12" src={CEO} alt="Chief Executive Officer" />
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

