import gradientBg5 from "/resources/img/vector/gradient-bg-5.svg";

export default function Tools ({ items }) {
    return (
        <section id="tools" className="container mx-auto md:w-auto md:pb-[3.4vw] mb-[9vw] md:mb-[3.4vw]">
            <div className="relative shadow-normal rounded-[7.9vw] md:rounded-[1.75vw] md:h-[19.25vw] overflow-hidden">
                <div className="p-[10.23vw] md:p-[4vw] space-y-[6vw] md:space-y-[2vw]">
                    <h2 className="text-[5vw] md:text-[1.875vw] text-black md:font-semibold md:leading-[3.5vw] text-center"><span className="text-primary">Tools</span> yang Bakal Digunakan</h2>
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-[8vw] md:gap-[3vw]">
                        {items.map((item, index) => (
                            <Tool key={index} {...item} />
                        ))} 
                    </div>
                </div>
                <img src={gradientBg5} alt="background" className="absolute left-0 top-0 bottom-0 w-full h-full -z-10" />
            </div>
        </section>
    )
}

function Tool ({ img, text }) {
    return (
        <div className="space-y-[3vw] md:space-y-[1.25vw]">
            <div className="flex justify-center w-[13.95vw] h-[10.69vw] md:w-[5.21vw] md:h-[3.9vw]">
                <img src={img} className="h-full object-contain" />
            </div>
            <p className="font-poppins font-semibold md:font-medium text-[3.256vw] md:text-[1.04vw] text-center">{text}</p>
        </div>
    )
}