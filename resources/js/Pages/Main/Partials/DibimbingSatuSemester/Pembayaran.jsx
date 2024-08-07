export default function Pembayaran ({ items }) {
    return (
        <section id="pembayaran" className="mb-[3.4vw]">
            <h2 className="text-[2.5vw] text-black leading-[4vw] mb-[2.5vw]">Cara <span className="text-primary">Daftar</span></h2>
            <div className="relative">
                <hr className="absolute left-[1.4vw] top-0 border-primary-20 border-[.2vw] border-dashed rotate-180 h-[26.5vw] -z-10" />
                <div className="space-y-[2.7vw]">
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
        <div className="flex items-center gap-[1.875vw]">
            <div className="w-fit bg-secondary rounded-full p-[.6vw] text-white text-[2vw]">
                {icon}
            </div>
            <p className="font-poppins font-semibold text-[1.25vw]">{text}</p>
        </div>
    )
}