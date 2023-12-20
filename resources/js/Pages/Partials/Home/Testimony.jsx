import 'swiper/css';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, FreeMode } from 'swiper/modules';

export default function Testimony ({data}) {
    const [show, setShow] = useState(false)

    return (
        <section id="testimony" className="my-16 xs:my-20 md:my-16 lg:my-20 xl:my-24 3xl:my-32 md:bg-primary relative">
            <div className="container mx-auto md:relative md:flex justify-between items-center">
                <div className="md:absolute z-10 md:w-4/12 xl:w-5/12 md:before:absolute md:before:-z-10 md:before:w-screen md:before:h-full md:before:-translate-x-1/4 md:before:bg-gradient-to-r md:before:from-white md:before:to-transparent h-full flex justify-center md:justify-start items-center">
                    <div className="hidden md:block">
                        <p className="font-medium md:tracking-[0.2rem] lg:tracking-[0.3rem] xl:tracking-[0.4rem] md:mb-6 lg:mb-8">TESTIMONIAL</p>
                        <h2>Kata Mereka Tentang <span className="text-primary">Goals Academy</span></h2>
                    </div>
                    <h2 className="md:hidden w-8/12 text-center text-white mb-8">Kata Tentang Kami</h2>
                </div>
                <TestimonyMain data={data} show={show} />
                <TestimonyMobile data={data} />
            </div>
            {/* <TestimonyMainDraggable data={data} show={show} setShow={setShow} /> */}
        </section>
    )
}

function TestimonyCard ({data}) {
    return (
        <div className="md:m-1 xl:m-2 p-4 xs:p-6 md:p-3 lg:p-4 3xl:p-6 bg-white rounded-lg border-4 md:border-2 lg:border-3 xl:border-4 3xl:border-6 border-gray-100">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 3xl:gap-3">
                    <img className="h-10 xs:h-14 md:h-5 lg:h-7 xl:h-10 3xl:h-14 rounded-full" src={data.image} alt="User Icon" />
                    <div>
                        <p className="text-16 xs:text-18 md:text-8 lg:text-10 xl:text-14 3xl:text-20 font-medium">{data.name}</p>
                        <p className="md:text-6 lg:text-8 xl:text-12 3xl:text-16 text-primary">@{data.instagram}</p>
                    </div>
                </div>
                <i className="bi bi-quote text-36 xs:text-48 md:text-20 lg:text-24 xl:text-36 3xl:text-48 text-primary -scale-x-1"></i>
            </div>
            <p className="h-[20vw] xs:h-24 md:h-8 lg:h-10 xl:h-16 3xl:h-20 my-4 md:my-2 lg:my-4 md:text-6 lg:text-8 xl:text-12 3xl:text-14">
                {data.text}
            </p>
            <p className="mt-4 lg:mt-6 xl:mt-8 md:text-6 lg:text-8 xl:text-12 3xl:text-16 text-primary font-bold">Fakultas {data.faculty}</p>
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

function TestimonyMain ({data, show}) {
    return (
        <>
            <div className="hidden md:block"></div>
            <div className="hidden md:block h-80 lg:h-[28rem] xl:h-[40rem] 3xl:h-[52rem] md:w-11/12 translate-x-[15%] overflow-hidden">
                <div className={!show ? 'grid grid-cols-3' : 'hidden'}>
                    <TestimonyMainPartial data={data.slice(0,3)} />
                    <TestimonyMainPartial data={data.slice(3,6)} className={"-mt-12"} />
                    <TestimonyMainPartial data={data.slice(6,9)} className={"-mt-24"} />
                </div>
            </div>
        </>
    )
}

// function TestimonyMainDraggablePartial ({data, className}) {
//     return (
//         <Swiper
//         modules={[Navigation, Pagination, Autoplay, A11y, FreeMode]}
//         className='swiper-tablet'
//         wrapperClass={className}
//         slidesPerView={3}
//         grabCursor={true}
//         draggable={true}
//         freeMode={true}
//         loop={true}
//         direction='vertical'
//         breakpoints={{
//             0: {
//                 spaceBetween: 56
//             },
//             1024: {
//                 spaceBetween: 48
//             },
//             1440: {
//                 spaceBetween: 52
//             },
//             1920: {
//                 spaceBetween: 8
//             }
//         }}
//         >
//             {data.map((item, index) => {
//                 return (
//                     <SwiperSlide key={index} className="w-fit h-fit">
//                         <TestimonyCard data={item} />
//                     </SwiperSlide>
//                 )
//             })}
//             {data.map((item, index) => {
//                 return (
//                     <SwiperSlide key={index} className="w-fit h-fit">
//                         <TestimonyCard data={item} />
//                     </SwiperSlide>
//                 )
//             })}
//         </Swiper>
//     )
// }

// function TestimonyMainDraggable ({data, show, setShow}) {
//     return (
//         <div
//         className="absolute z-10 top-0 hidden md:block w-screen h-80 lg:h-[28rem] xl:h-[40rem] 3xl:h-[52rem]"
//         onMouseEnter={() => setShow(true)}
//         onMouseLeave={() => setShow(false)}
//         >
//             <div className={`w-full h-80 lg:h-[28rem] xl:h-[40rem] 3xl:h-[52rem] ${show ? 'bg-dark bg-opacity-50' : 'bg-transparent'}`}>
//                 <div className="container mx-auto relative flex justify-between items-center h-full">
//                     <div className="block"></div>
//                     <div className={`grid grid-cols-3 h-full md:w-11/12 translate-x-[14%] overflow-hidden ${show ? 'opacity-100' : 'opacity-0'}`}>
//                         <TestimonyMainDraggablePartial data={data.slice(0,3)} />
//                         <TestimonyMainDraggablePartial data={data.slice(3,6)} className={"-mt-12"} />
//                         <TestimonyMainDraggablePartial data={data.slice(6,9)} className={"-mt-24"} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

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
            loop={true}
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
