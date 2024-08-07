import gradientBg5 from "/resources/img/vector/gradient-bg-5.svg";

export default function Tools ({ items }) {
    return (
        <section id="tools" className="relative pb-[3.4vw] mb-[3.4vw]">
            <div className="relative shadow-normal rounded-[1.75vw] h-[19.25vw] overflow-hidden">
                <div className="p-[4vw] space-y-[2vw]">
                    <h2 className="text-[1.875vw] text-black font-semibold leading-[3.5vw] text-center"><span className="text-primary">Tools</span> yang Bakal Digunakan</h2>
                    <div className="flex items-center justify-center gap-[3vw]">
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
        <div className="space-y-[1.25vw]">
            <div className="flex justify-center w-[5.21vw] h-[3.9vw]">
                <img src={img} className="h-full object-contain" />
            </div>
            <p className="font-poppins font-medium text-[1.04vw] text-center">{text}</p>
        </div>
    )
}