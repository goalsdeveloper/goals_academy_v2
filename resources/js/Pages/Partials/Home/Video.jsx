import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import ButtonSwiper from '@/Components/ButtonSwiper';

export default function Video () {
    return (
        <section id="video" className="my-16 xl:my-24 3xl:my-32">
            <div className="container mx-auto">
                <div className="flex justify-center md:justify-between mb-8 xl:mb-12">
                    <div className="w-9/12 md:w-6/12">
                        <h2 className='md:hidden text-center md:text-start text-white'>Tontonan Seru dan Solutif.</h2>
                        <h2 className='hidden md:inline-block'>Tontonan <span className="text-primary">Seru dan Solutif.</span></h2>
                        <p className="hidden md:inline-block mt-2 xl:mt-4 3xl:mt-6">Tonton video dibawah dan dapatkan informasi tentang skripsi secara gratis.</p>
                    </div>
                    <div className="hidden md:grid grid-cols-2 gap-2">
                        <ButtonSwiper name="video-prev" direction="left" />
                        <ButtonSwiper name="video-next" direction="right" />
                    </div>
                </div>
                <Swiper
                modules={[Navigation, Pagination, A11y]}
                className='swiper-tablet'
                slidesPerView={"auto"}
                spaceBetween={16}
                grabCursor={true}
                draggable={true}
                navigation={{ nextEl: ".video-next", prevEl: ".video-prev" }}
                >
                    <SwiperSlide style={{ width: "fit-content" }}>
                        <div className='w-96 h-64 md:w-64 md:h-40 lg:w-96 lg:h-64 xl:w-[28rem] xl:h-80 3xl:w-[36rem] 3xl:h-96'>
                            <iframe className='w-full h-full rounded-xl xl:rounded-2xl' src="https://www.youtube.com/embed/t9VWICGOD90?si=wZ7DNbv3HBZamFLW" title="YouTube video player" allowFullScreen></iframe>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "fit-content" }}>
                        <div className='w-96 h-64 md:w-64 md:h-40 lg:w-96 lg:h-64 xl:w-[28rem] xl:h-80 3xl:w-[36rem] 3xl:h-96'>
                            <iframe className='w-full h-full rounded-xl xl:rounded-2xl' src="https://www.youtube.com/embed/jlfMHjylvGA?si=4DZ39ij50BlYCwE9" title="YouTube video player" allowFullScreen></iframe>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "fit-content" }}>
                        <div className='w-96 h-64 md:w-64 md:h-40 lg:w-96 lg:h-64 xl:w-[28rem] xl:h-80 3xl:w-[36rem] 3xl:h-96'>
                            <iframe className='w-full h-full rounded-xl xl:rounded-2xl' src="https://www.youtube.com/embed/gIsoLyQX7W8?si=aZzpZfyubDOEwOvF" title="YouTube video player" allowFullScreen></iframe>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <Swiper
                modules={[Navigation, Pagination, A11y]}
                className='swiper-mobile'
                slidesPerView={1}
                spaceBetween={20}
                grabCursor={true}
                draggable={true}
                navigation={{ nextEl: ".video-next", prevEl: ".video-prev" }}
                pagination={{
                    el: '.video-pagination',
                    clickable: true,
                    type: 'bullets',
                    renderBullet: (index, className) => {
                        return `<button class="${className}"></button>`
                    }
                }}
                >
                    <SwiperSlide>
                        <div className='h-48 xs:h-60 sm:h-80'>
                            <iframe className='w-full h-full rounded-xl xl:rounded-2xl' src="https://www.youtube.com/embed/t9VWICGOD90?si=wZ7DNbv3HBZamFLW" title="YouTube video player" allowFullScreen></iframe>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='h-48 xs:h-60 sm:h-80'>
                            <iframe className='w-full h-full rounded-xl xl:rounded-2xl' src="https://www.youtube.com/embed/jlfMHjylvGA?si=4DZ39ij50BlYCwE9" title="YouTube video player" allowFullScreen></iframe>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='h-48 xs:h-60 sm:h-80'>
                            <iframe className='w-full h-full rounded-xl xl:rounded-2xl' src="https://www.youtube.com/embed/gIsoLyQX7W8?si=aZzpZfyubDOEwOvF" title="YouTube video player" allowFullScreen></iframe>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className='video-pagination flex flex-wrap justify-center md:hidden my-4'></div>
            </div>
        </section>
    )
}
