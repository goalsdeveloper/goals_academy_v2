import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, FreeMode } from 'swiper/modules';
import ButtonSwiper from '@/Components/ButtonSwiper';

export default function CareerList ({ data }) {
    return (
        <section id="career_list" className="my-8 xl:my-12 3xl:my-16 overflow-hidden">
            <div className="container mx-auto">
                <div className="flex justify-between mb-6 xs:mb-8">
                    <div className="w-6/12">
                        <h2 className="text-24 md:text-16 lg:text-24 xl:text-32 3xl:text-48">Lowongan <span className="text-primary">Tersedia.</span></h2>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <ButtonSwiper name="career-prev" direction="left" />
                        <ButtonSwiper name="career-next" direction="right" />
                    </div>
                </div>
                <Swiper
                modules={[Navigation, Pagination, A11y, FreeMode]}
                className='swiper-custom'
                wrapperClass="swiper-wrapper -ms-2"
                slidesPerView={"auto"}
                grabCursor={true}
                freeMode={true}
                navigation={{ nextEl: ".career-next", prevEl: ".career-prev" }}
                >
                    {data.map(({title, image, requirements, link}, index) => {
                        return (
                            <SwiperSlide key={index} style={{ width: "fit-content" }} className="p-4 md:p-2 lg:p-3 xl:p-4">
                                <CareerCard title={title} image={image} requirements={requirements} link={link} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    )
}

function CareerCard ({title, image, requirements, link}) {
    return (
        <div className="w-64 xs:w-72 sm:w-80 md:w-40 lg:w-60 xl:w-72 3xl:w-96 shadow-lg md:shadow-bottom-right lg:shadow-lg rounded-3xl md:rounded-lg xl:rounded-3xl overflow-hidden">
            <div className='w-full h-48 xs:h-56 md:h-32 lg:h-40 xl:h-52 3xl:h-72 overflow-hidden'>
                <img className='w-full' src={image} alt={title} />
            </div>
            <div className="p-4 xs:p-6 md:p-2 lg:p-4 xl:p-6 3xl:p-8">
                <h4 className="text-center">{title}</h4>
                <div className="my-8 md:my-2 lg:my-4 xl:my-8 h-56 md:h-28 lg:h-52 xl:h-56 3xl:h-72">
                    <p className="md:mb-2 lg:mb-4">Kualifikasi :</p>
                    <ul className="list-disc grid md:gap-0 lg:gap-1 ms-4">
                        {requirements.map((item, index) => {return <li key={index}>{item}</li>})}
                    </ul>
                </div>
                <a href={link} target="_blank" className="inline-block font-medium text-center py-2 md:py-1 xl:py-2 text-white bg-secondary hover:bg-primary w-full rounded-full">Lamar Sekarang</a>
            </div>
        </div>
    )
}
