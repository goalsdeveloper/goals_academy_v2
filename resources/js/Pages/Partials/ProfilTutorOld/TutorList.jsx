import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, FreeMode } from 'swiper/modules';
import TutorCard from "@/Components/TutorCard";
import CornerWaveVector from '@/Components/CornerWaveVector';

export default function TutorListOld ({ data }) {
    return (
        <section id="tutor_list" className="my-16 xs:my-20 md:my-16 lg:my-20 xl:my-24 3xl:my-32 overflow-hidden relative bg-secondary md:rounded-t-[15%] py-16 md:py-12 xl:py-24">
            <CornerWaveVector cornerClassName="w-8/12 md:w-5/12" corner2ClassName="hidden md:block w-5/12" />
            <div className="container mx-auto text-white">
                <div className="text-center mb-8 md:mb-8 lg:mb-12 xl:mb-16 2xl:mb-20 3xl:mb-24">
                    <h2 className="text-white">Tutor Goals Academy</h2>
                    <p>Mari Kenalan Dulu Sama Tutor di Goals Academy</p>
                </div>
                <div className="hidden md:grid md:grid-cols-3 gap-16 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 3xl:gap-10">
                    {data.map(({name, headline, image, description, linkedin, instagram}, index) => {
                        return (
                            <TutorCard key={index} name={name} headline={headline} image={image} description={description} linkedin={linkedin} instagram={instagram} />
                        )
                    })}
                </div>
                <Swiper
                modules={[Navigation, Pagination, A11y, FreeMode]}
                className='swiper-mobile'
                wrapperClass="swiper-wrapper -ms-2"
                slidesPerView={1}
                grabCursor={true}
                freeMode={true}
                >
                    {data.map(({name, headline, image, description, linkedin, instagram}, index) => {
                        return (
                            <SwiperSlide key={index} style={{ width: "fit-content" }} className="p-4 md:p-2 lg:p-3 xl:p-4">
                                <TutorCard key={index} name={name} headline={headline} image={image} description={description} linkedin={linkedin} instagram={instagram} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    )
}
