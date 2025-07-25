import GoalsButton from "@/Components/elements/GoalsButton";
import background from "/resources/img/vector/gradient-bg-8.svg";

export default function PriceList ({ products }) {
    const data = [
        // {
        //     subtitle: "",
        //     desc: "",
        //     tagline: {
        //         text: "",
        //         color: "",
        //         bg: ""
        //     },
        //     buttonVariant: "primary-inverse",
        //     borderColor: "neutral-30",
        //     bgColor: "white"
        // },
        {
            subtitle: "",
            desc: "Perbulan cuma Rp66.300",
            tagline: {
                text: "Cocok buat kamu yang skripsi dari 0",
                color: "primary",
                bg: "skin"
            },
            buttonVariant: "primary-inverse",
            borderColor: "neutral-30",
            bgColor: "white"
        },
        {
            subtitle: "Dapatkan Bonus Sertifikat Tambahan, khusus untuk akses 6 bulan untuk mempercantik CV",
            desc: "Perbulan cuma Rp61.500",
            tagline: {
                text: "Best Deal + Rekomendasi Founders",
                color: "white",
                bg: "primary"
            },
            buttonVariant: "primary",
            borderColor: "primary",
            bgColor: "transparent"
        },
    ]

    return (
        <section id="pricelist" className="relative pt-[9.59vw] pb-[14.8vw] md:pt-[5.2vw] md:pb-[7.34vw]">
            <div className="hidden md:block absolute -top-[20vw] right-0 -z-10">
                <img src={background} alt="Background Image" className="md:w-[50vw]" />
            </div>
            <div className="w-[88.35vw] md:w-[73.96%] mx-auto space-y-[11.65vw] md:space-y-[8.23vw]">
                <h2 className="text-[5.825vw] md:text-[2.5vw] text-center">Kalau di Spill Semua, Nanti Websitenya Bakal Panjang<br/>Berikutnya Adalah Giliranmu</h2>
                <div className={`w-[80.58vw] md:w-auto mx-auto grid grid-cols-1 md:flex md:justify-center gap-[3.88vw] md:gap-[1.04vw]`}>
                    {products.map((item, index) => (
                        <Card key={index} {...data[index]} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function Card ({ name, slug, product_image, price, promo_price, facilities, subtitle, desc, tagline, buttonVariant, borderColor, bgColor }) {
    const currency = Intl.NumberFormat("id-ID")

    return (
        <div className={`border-1 border-${borderColor} bg-${bgColor} h-fit md:h-[45vw] md:w-[24vw] rounded-[2.9vw] md:rounded-[.83vw] overflow-hidden`}>
            <div className={`md:h-[8%] flex justify-center items-center bg-${tagline?.bg} text-${tagline?.color} text-center font-medium text-[3.4vw] md:text-[1.04vw] py-[2vw] md:py-0`}>{tagline?.text}</div>
            <div className="py-[4vw] md:py-[1vw]">
                <img className="h-[50vw] md:h-[15vw] mx-auto" src={`/storage/${product_image}`} alt={`${name} Image`} />
            </div>
            <div className="md:h-[50%] pb-[6vw] px-[8.79vw] md:py-0 md:px-[2.34vw] flex justify-center">
                <div className="w-full flex flex-col gap-[6.28vw] md:gap-[2.08vw]">

                    <div className="space-y-[2.72vw] md:space-y-[1.875vw]">
                        <div>
                            <h3 className="font-semibold text-[5.825vw] md:text-[1.875vw]">{name.split('Skripsi Mastery ')}</h3>
                            <p className="text-neutral-50 md:text-[.83vw]">{subtitle}</p>
                        </div>
                        <div>
                            <p className="font-poppins md:text-[.83vw] text-neutral-80">{desc}</p>
                            <p className="text-primary font-poppins font-bold text-[8.16vw] md:text-[2.5vw]"><sup className="font-semibold text-[2.72vw] md:text-[.83vw] -top-[5vw] md:-top-[1.5vw]">RP</sup>{currency.format(Number(price)-Number(promo_price))}</p>
                        </div>
                    </div>
                    <div>
                        <GoalsButton isLink href={`/produk/${slug}`} className="w-full text-[3.4vw] md:text-[1.04vw]" variant={buttonVariant}>Daftar Sekarang</GoalsButton>
                    </div>
                    <div className="h-[25vw] md:h-auto overflow-auto">
                        <div className="text-neutral-80 text-[2.9vw] md:text-[.83vw]">
                            {facilities.map((item, index) => (
                                <div key={index} className="flex gap-[2vw] md:gap-[.7vw]">
                                    •
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
