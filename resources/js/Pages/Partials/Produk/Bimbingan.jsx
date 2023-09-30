import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, FreeMode } from 'swiper/modules';
import ButtonSwiper from '@/Components/ButtonSwiper';
import BimbinganCard from '@/Components/BimbinganCard';

export default function Bimbingan ({ data, active, status }) {
    return (
        <section id="bimbingan" className={`${active || status ? '' : 'hidden'} my-8 xl:my-12 3xl:my-16 overflow-hidden`}>
            <div className="container mx-auto hidden md:block">
                <h2 className="mb-4 sm:mb-6 xl:mb-10 3xl:mb-14">Bimbingan Skripsi</h2>
                <div className="grid grid-cols-3 md:gap-8 xl:gap-16 pb-2">
                    {data.map((item, index) => {
                        return (
                            <BimbinganCard key={index} item={item} className="w-72 md:w-[21vw] 3xl:w-[20vw]" />
                        )
                    })}
                </div>
            </div>
            <BimbinganMobile data={data} />
        </section>
    )
}

function BimbinganMobile ({ data }) {
    return (
        <div className="container mx-auto md:hidden">
            <div className="flex justify-between mb-6 xs:mb-8">
                <div className="md:w-6/12">
                    <h2>Bimbingan Skripsi</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <ButtonSwiper name="bimbingan-prev" direction="left" />
                    <ButtonSwiper name="bimbingan-next" direction="right" />
                </div>
            </div>
            <Swiper
            modules={[Navigation, Pagination, A11y, FreeMode]}
            className='swiper-custom'
            wrapperClass="-ms-2"
            slidesPerView={"auto"}
            grabCursor={true}
            freeMode={true}
            navigation={{ nextEl: ".bimbingan-next", prevEl: ".bimbingan-prev" }}
            >
                {data.map((item, index) => {return (
                    <SwiperSlide key={index} style={{ width: "fit-content" }} className="p-4 md:p-2 lg:p-3 xl:p-4">
                        <BimbinganCard item={item} className="w-[70vw]" />
                    </SwiperSlide>
                )})}
            </Swiper>
        </div>
    )
}
