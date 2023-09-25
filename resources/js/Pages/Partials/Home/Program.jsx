import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, FreeMode } from 'swiper/modules';
import ButtonSwiper from '@/Components/ButtonSwiper';
import BimbinganCard from '@/Components/BimbinganCard';

export default function Program ({data}) {
    return (
        <section id="program" className="my-16 xl:my-24 3xl:my-32 overflow-hidden">
            <div className="container mx-auto">
                <div className="flex justify-between mb-8">
                    <div className="md:w-6/12">
                        <h2 className='hidden md:inline-block'>Pilih Program Goals untuk <span className="text-primary">Solusi Skripsimu.</span></h2>
                        <h2 className='md:hidden'>Pilih Program <span className="text-primary">Tersedia.</span></h2>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <ButtonSwiper name="program-prev" direction="left" />
                        <ButtonSwiper name="program-next" direction="right" />
                    </div>
                </div>
                <Swiper
                modules={[Navigation, Pagination, A11y, FreeMode]}
                className='swiper-custom'
                wrapperClass="-ms-2"
                slidesPerView={"auto"}
                grabCursor={true}
                freeMode={true}
                navigation={{ nextEl: ".program-next", prevEl: ".program-prev" }}
                >
                    {data.map(program => {return (
                        <SwiperSlide key={program.id} style={{ width: "fit-content" }} className="p-4 md:p-2 lg:p-3 xl:p-4">
                            <BimbinganCard item={program} className="w-72 md:w-40 lg:w-52 xl:w-72 3xl:w-[22rem]" />
                        </SwiperSlide>
                    )})}
                </Swiper>
            </div>
        </section>
    )
}
