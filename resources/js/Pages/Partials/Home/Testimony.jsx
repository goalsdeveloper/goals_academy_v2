import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import quoteIcon from '/resources/img/quote-primary.svg';

function TestimonyCard ({data}) {
    return (
        <div className="md:m-1 xl:m-2 p-6 md:p-3 lg:p-4 3xl:p-6 bg-white rounded-lg border-4 md:border-2 lg:border-3 xl:border-4 3xl:border-6 border-gray-100">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {/* <img className="h-14 md:h-5 lg:h-7 xl:h-10 3xl:h-12 rounded-full" src={data.image} alt="User Icon" /> */}
                    <div>
                        <p className="text-18 md:text-8 lg:text-10 xl:text-14 3xl:text-16 font-medium">{data.name}</p>
                        <p className="md:text-6 lg:text-8 xl:text-12 3xl:text-14 text-primary">@{data.instagram}</p>
                    </div>
                </div>
                <img className="h-6 md:h-3 lg:h-4 xl:h-6" src={quoteIcon} alt="Quote Icon" />
            </div>
            <p className="h-24 md:h-8 lg:h-10 xl:h-16 my-4 md:my-2 lg:my-4 md:text-6 lg:text-8 xl:text-12 3xl:text-14">
                {data.text}
            </p>
            <p className="mt-4 lg:mt-6 xl:mt-8 md:text-6 lg:text-8 xl:text-12 3xl:text-14 text-primary font-bold">Fakultas {data.faculty}</p>
        </div>
    )
}

function TestimonyMainPartial ({data, className}) {
    return (
        <div className={"flex flex-col " + className}>
            <div className="flex flex-col animate-autoplayY">
                {data.map((item, index) => {
                    return <TestimonyCard key={index} data={item} />
                })}
            </div>
            <div className="flex flex-col animate-autoplayY">
                {data.map((item, index) => {
                    return <TestimonyCard key={index} data={item} />
                })}
            </div>
        </div>
    )
}

function TestimonyMain ({data}) {
    return (
        <>
            <div className="hidden md:block"></div>
            <div className="hidden md:grid grid-cols-3 h-80 lg:h-[28rem] xl:h-[40rem] md:w-11/12 translate-x-[15%] overflow-hidden">
                <TestimonyMainPartial data={data.slice(0,3)} />
                <TestimonyMainPartial data={data.slice(3,6)} className={"-mt-12"} />
                <TestimonyMainPartial data={data.slice(6,9)} className={"-mt-8"} />
            </div>
        </>
    )
}

function TestimonyMobile ({data}) {
    return (
        <>
            <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            className='swiper-mobile'
            autoplay={true}
            slidesPerView={1}
            spaceBetween={20}
            grabCursor={true}
            draggable={true}
            pagination={{
                el: '.testimony-pagination',
                clickable: true,
                type: 'bullets',
                renderBullet: (index, className) => {
                    return `<button class="${className}"></button>`
                }
            }}
            >
                {data.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <TestimonyCard data={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className='testimony-pagination flex flex-wrap justify-center md:hidden my-4'></div>
        </>
    )
}

export default function Testimony ({data}) {
    return (
        <section id="testimony" className="md:relative my-16 xl:my-24 3xl:my-32 md:bg-primary">
            <div className="container mx-auto md:relative md:flex justify-between items-center">
                <div className="md:absolute z-10 md:w-4/12 xl:w-5/12 md:before:absolute md:before:-z-10 md:before:w-screen md:before:h-full md:before:-translate-x-1/4 md:before:bg-gradient-to-r md:before:from-white md:before:to-transparent h-full flex justify-center md:justify-start items-center">
                    <div className="hidden md:block">
                        <p className="font-medium md:tracking-[0.2rem] lg:tracking-[0.3rem] xl:tracking-[0.4rem] md:mb-6 lg:mb-8">TESTIMONIAL</p>
                        <h2>Kata Mereka Tentang <span className="text-primary">Goals Academy</span></h2>
                    </div>
                    <h2 className="md:hidden w-8/12 text-center mb-8">Kata Mereka <span className="text-primary">Tentang Kami</span></h2>
                </div>
                <TestimonyMain data={data} />
                <TestimonyMobile data={data} />
            </div>
        </section>
    )
}
