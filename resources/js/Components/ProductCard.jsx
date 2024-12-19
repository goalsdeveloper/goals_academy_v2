import ButtonPill from "./ButtonPill";

export default function ProductCard({ item, className }) {
    // const features = item.features[0];
    const currency = Intl.NumberFormat("id-ID");
    return (
        <div
            className={`relative shadow-centered rounded-3xl md:rounded-lg xl:rounded-3xl overflow-hidden ${className}`}
        >
            <div className="w-full h-[52vw] md:h-[16vw] 3xl:h-[15vw] overflow-hidden">
                <img
                    className="w-full"
                    src={`/storage/${item.product_image}`}
                    alt={"image-"+item.name}
                />
            </div>
            <div className="flex flex-col justify-between p-[6vw] pb-[16vw] md:p-[1.5vw] md:pb-[4vw]">
                <div className="flex flex-wrap justify-between h-[10vw] md:h-[2.5vw]">
                    <h5 className="w-7/12 text-[3.32vw] md:text-[1vw] line-clamp-2">{item.name}</h5>
                    <div className="w-5/12 text-end font-bold">
                        <h5 className="text-primary text-[3.32vw] md:text-[1vw] 3xl:py-0.5">
                            IDR {currency.format(parseFloat(item.price) - parseFloat(item.promo_price || 0))}
                        </h5>
                        {Boolean(Number(item.promo_price)) ? (
                            <p className="inline text-[3.32vw] md:text-[.83vw] text-light-grey line-through">
                                IDR {currency.format(item.price)}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <p className="my-[3vw] md:my-[1vw] md:h-[6.25vw] md:overflow-hidden">
                    {item.excerpt}{item.description.length > 128 ? "..." : ""}
                </p>
                {item?.facilities?.length ? (
                    <div className="flex flex-col gap-[2vw] md:gap-[.5vw] mb-[6vw] md:mb-[2vw]">
                        <p>Fasilitas :</p>
                        <div className="flex flex-col gap-[2vw] md:gap-[.5vw] h-[18vw] md:h-[4.8vw] overflow-y-auto">
                            {item?.facilities?.map(({icon, text}, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <i className={`${icon} text-secondary`}></i>
                                    <p>{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : <></>}
                <ButtonPill href={`/produk/${item.slug}`} className={"absolute bottom-0 w-[87%] -translate-x-[.7%] -translate-y-[6vw] md:-translate-y-[1.5vw]"} isLink>
                    Daftar Sekarang
                </ButtonPill>
            </div>
        </div>
    );
}
