import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, FreeMode } from 'swiper/modules';
import ButtonSwiper from '@/Components/ButtonSwiper';
import BimbinganCard from '@/Components/BimbinganCard';
import ButtonPill from '@/Components/ButtonPill';

export default function Program ({data}) {
    return (
        <section id="program" className="my-16 xs:my-20 md:my-16 lg:my-20 xl:my-24 3xl:my-32 overflow-hidden">
            <div className="container mx-auto hidden md:block">
                <div className="flex justify-between mb-6 xs:mb-8">
                    <div className="md:w-6/12">
                        <h2>Pilih Program Goals untuk <span className="text-primary">Solusi Skripsimu.</span></h2>
                    </div>
                </div>
                <div className="grid grid-cols-3 justify-center md:gap-8 xl:gap-16 pb-2">
                    {data.map((item, index) => {
                        const model = ((index+1) % 3 == 2 ? 'justify-center' : (index+1) % 3 == 0 ? 'justify-end' : '')
                        return (
                            <div key={index} className={`flex ${model}`}>
                                <BimbinganCard item={item} className="w-72 md:w-[21vw] 3xl:w-[20vw]" />
                            </div>
                        )
                    })}
                </div>
                <div className="text-center mt-8 md:mt-4 lg:mt-8 3xl:mt-12">
                    <ButtonPill href="/produk" className="px-4">
                        Lihat Produk Lainnya &nbsp;
                        <i className="bi bi-arrow-right-circle xl:text-16"></i>
                    </ButtonPill>
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
                    <h2>Pilih Program <span className="text-primary">Tersedia.</span></h2>
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
            <div className="text-center mt-8 md:mt-4 lg:mt-8 3xl:mt-12">
                <ButtonPill href="/produk" className="px-4">
                    Lihat Produk Lainnya &nbsp;
                    <i className="bi bi-arrow-right-circle xl:text-16"></i>
                </ButtonPill>
            </div>
        </div>
    )
}
