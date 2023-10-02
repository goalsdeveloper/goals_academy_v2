import ButtonPill from "./ButtonPill"

export default function BimbinganCard ({ item, className }) {
    const features = item.features
    const currency = Intl.NumberFormat('id-ID')

    function generateFeature (features, feature) {
        if (feature != null & feature == features.times) {
            return (
                <div key={feature} className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar text-primary"></i>
                    <p>{features.times}x Pertemuan</p>
                </div>
            )
        } else if (feature != null & feature == features.duration) {
            return (
                <div key={feature} className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-12 md:text-6 lg:text-10 xl:text-12 text-primary"></i>
                    <p>{features.duration} Menit</p>
                </div>
            )
        } else if (feature != null & feature == features.category) {
            return (
                <div key={feature} className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-primary"></i>
                    <p>{features.category}</p>
                </div>
            )
        }
    }

    return (
        <div className={`shadow-lg md:shadow-bottom-right lg:shadow-lg rounded-3xl md:rounded-lg xl:rounded-3xl overflow-hidden ${className}`}>
            <div className="w-full h-[52vw] md:h-[16vw] 3xl:h-[15vw] overflow-hidden">
                <img className="w-full" src={item.img} alt={item.title} />
            </div>
            <div className="flex flex-col justify-between p-4 xs:p-6 md:p-2 lg:p-3 xl:p-6">
                <div className="flex justify-between xs:h-12 md:h-8 lg:h-12 xl:h-16 2xl:h-16 3xl:h-20">
                    <h5 className="w-7/12">{item.title}</h5>
                    <div className="w-5/12 text-end">
                        <h5 className="text-primary font-bold 3xl:py-0.5">IDR {currency.format(item.price)}</h5>
                        {item.hasDiscount ? (
                            <p className="inline text-10 md:text-6 xl:text-10 3xl:text-12 text-red-600 bg-red-200">Diskon Tersedia</p>
                        ) : ''}
                    </div>
                </div>
                <p className="my-6 xs:my-8 md:my-0 h-[14vw] xs:h-20 md:h-12 lg:h-20 xl:h-24 3xl:h-36">{item.excerpt}</p>
                <div className="flex flex-col gap-2 md:gap-1 lg:gap-2 3xl:gap-3 mb-8 md:mb-4 xl:mb-8 3xl:mb-12">
                    <p>Layanan</p>
                    {Object.values(features).map(feature => generateFeature(features, feature))}
                </div>
                <ButtonPill href={item.link} className={'w-full'}>
                    Daftar Sekarang
                </ButtonPill>
            </div>
        </div>
    )
}
