import ButtonPill from "@/Components/ButtonPill";


export default function Ebook ({ data, active, status }) {
    return (
        <section id="ebook" className={`${active || status ? '' : 'hidden'} my-8 xl:my-12 3xl:my-16`}>
            <div className="container mx-auto">
                <h2 className="mb-4 sm:mb-6 xl:mb-10 3xl:mb-14">E-Book</h2>
                <div className="grid grid-cols-3 md:gap-8 xl:gap-16">
                    {data.map((item, index) => {
                        return (
                            <EbookCard key={index} item={item} className="w-72 md:w-[21vw] 3xl:w-[20vw]" />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

function EbookCard ({ item, className }) {
    const currency = Intl.NumberFormat('id-ID')

    return (
        <div className={`shadow-centered rounded-3xl md:rounded-lg xl:rounded-3xl overflow-hidden ${className}`}>
            <div className="w-full h-60 md:h-[27vw] overflow-hidden">
                <img className="w-full" src={item.image} alt={item.title} />
            </div>
            <div className="md:p-3 lg:p-4 2xl:p-6 3xl:p-8">
                <p className="font-medium md:text-10 lg:text-14 xl:text-16 2xl:text-20 3xl:text-24 md:h-7 lg:h-8 2xl:h-12 3xl:h-16">{item.title}</p>
                <p className="font-bold font-poppins text-primary md:text-14 lg:text-18 xl:text-24 2xl:text-28 3xl:text-32 md:my-3 lg:my-4 xl:my-6">IDR {currency.format(item.price)}</p>
                <ButtonPill href={item.link} className="w-full">Beli Sekarang</ButtonPill>
            </div>
        </div>
    )
}
