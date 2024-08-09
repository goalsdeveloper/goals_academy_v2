export default function Pembayaran ({ items }) {
    return (
        <section id="pembayaran" className="container mx-auto md:w-auto mb-[9vw] md:mb-[3.4vw]">
            <h2 className="text-[5vw] md:text-[2.5vw] text-black text-center md:text-start leading-[4vw] mb-[5vw] md:mb-[2.5vw]">Cara <span className="text-primary">Daftar</span></h2>
            <div className="relative">
                <hr className="absolute left-[2.8vw] md:left-[1.4vw] top-0 border-primary-20 border-[.5vw] md:border-[.2vw] border-dashed rotate-180 h-[50vw] md:h-[26.5vw] -z-10" />
                <div className="space-y-[5.4vw] md:space-y-[2.7vw]">
                    {items.map((item, index) => (
                        <Item key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function Item ({ icon, text }) {
    return (
        <div className="flex items-center gap-[2.5vw] md:gap-[1.875vw]">
            <div className="w-fit bg-secondary rounded-full p-[1.2vw] md:p-[.6vw] text-white text-[4vw] md:text-[2vw]">
                {icon}
            </div>
            <p className="font-poppins font-semibold text-[3.256vw] md:text-[1.25vw]">{text}</p>
        </div>
    )
}