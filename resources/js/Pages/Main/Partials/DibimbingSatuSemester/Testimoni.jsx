export default function Testimoni ({ items }) {
    return (
        <section id="testimoni" className="mb-[3.4vw]">
            <h2 className="text-[2.5vw] text-black leading-[4vw] mb-[2.5vw]"><span className="text-primary">Mereka Yang Pernah Bimbingan</span><br />Bilang Begini</h2>
            <div className="grid grid-cols-2 gap-[1vw]">
                {items.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </div>
        </section>
    )
}

function Card ({ name, image, faculty, instagram, text }) {
    return (
        <div className="p-[4vw] md:p-[1.5vw] bg-white rounded-lg border-4 md:border-[.25vw] border-gray-100">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-[.5vw]">
                    <img className="h-[12vw] md:h-[3vw] rounded-full" src={image} alt="User Icon" />
                    <div>
                        <p className="text-[5vw] md:text-[1.25vw] font-medium">{name}</p>
                        <p className="md:text-[1vw] text-primary">@{instagram}</p>
                    </div>
                </div>
                <i className="bi bi-quote text-[10vw] md:text-[2.5vw] text-primary -scale-x-1"></i>
            </div>
            <p className="h-[20vw] md:h-[5vw] my-[4vw] md:my-[1vw] text-[4vw] md:text-[1vw]">
                {text}
            </p>
            <p className="mt-[8vw] lg:mt-[2vw] text-[4vw] md:text-[1vw] text-primary font-bold">Mahasiswa {faculty}</p>
        </div>
    )
}