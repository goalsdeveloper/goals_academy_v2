import GoalsButton from "@/Components/elements/GoalsButton";
import background from "/resources/img/vector/gradient-bg-8.svg";

export default function PriceList () {
    const data = [
        {
            title: "Akses 1 Bulan",
            subtitle: "", 
            desc: "Lebih Hemat Hingga 450rb", 
            price: 95000, 
            slug: "skripsi-mastery-akses-1-bulan", 
            facilities: [
                "10 modul Fast Track Nyusun Skripsi",
                "Bebas Konsultasi via Chat Bersama Tutor",
                "Free Cek Plagiasi Turnitin",
                "Free Desk Review",
                "Daily Call Bersama Tutor",
                "Monthly Call Bersama The Founders",
                "Akses Informasi Maganng & Berita"
            ], 
            tagline: {
                text: "", 
                color: "", 
                bg: ""
            }, 
            buttonVariant: "primary-inverse", 
            borderColor: "neutral-30",
            bgColor: "white"
        },
        {
            title: "Akses 3 Bulan",
            subtitle: "", 
            desc: "Lebih Hemat Hingga 450rb", 
            price: 250000, 
            slug: "skripsi-mastery-akses-3-bulan", 
            facilities: [
                "10 modul Fast Track Nyusun Skripsi",
                "Bebas Konsultasi via Chat Bersama Tutor",
                "Free Cek Plagiasi Turnitin",
                "Free Desk Review",
                "Daily Call Bersama Tutor",
                "Monthly Call Bersama The Founders",
                "Akses Informasi Maganng & Berita"
            ], 
            tagline: {
                text: "Pilihan kebanyakan mahasiswa", 
                color: "primary", 
                bg: "skin"
            }, 
            buttonVariant: "primary-inverse", 
            borderColor: "neutral-30",
            bgColor: "white"
        },
        {
            title: "Akses 6 Bulan",
            subtitle: "Dapatkan Bonus Sertifikat Tambahan, khusus untuk akses 6 bulan untuk mempercantik CV", 
            desc: "Lebih Hemat Hingga 450rb", 
            price: 450000, 
            slug: "skripsi-mastery-akses-6-bulan", 
            facilities: [
                "10 modul Fast Track Nyusun Skripsi",
                "Bebas Konsultasi via Chat Bersama Tutor",
                "Free Cek Plagiasi Turnitin",
                "Free Desk Review",
                "Daily Call Bersama Tutor",
                "Monthly Call Bersama The Founders",
                "Akses Informasi Maganng & Berita"
            ], 
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
        <section id="pricelist" className="relative md:pt-[5.2vw] md:pb-[7.34vw]">
            <div className="absolute -top-[20vw] right-0 -z-10">
                <img src={background} alt="Background Image" className="md:w-[50vw]" />
            </div>
            <div className="w-[73.96%] mx-auto md:space-y-[8.23vw]">
                <h2 className="md:text-[2.5vw] text-center">Kalau di spill semua, nanti websitenya bakal panjang Berikutnya adalah giliranmu</h2>
                <div className="grid grid-cols-3 gap-[1.04vw]">
                    {data.map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function Card ({ title, subtitle, desc, price, slug, facilities, tagline, buttonVariant, borderColor, bgColor }) {
    const currency = Intl.NumberFormat("id-ID")

    return (
        <div className={`border-1 border-${borderColor} bg-${bgColor} md:h-[35.42vw] md:rounded-[.83vw] overflow-hidden`}>
            <div className={`h-[8%] flex justify-center items-center bg-${tagline.bg} text-${tagline.color} text-center font-medium md:text-[1.04vw]`}>{tagline.text}</div>
            <div className="h-[92%] md:px-[2.34vw] flex justify-center items-center">
                <div className="flex flex-col md:gap-[2.08vw]">
                    <div className="md:space-y-[1.875vw]">
                        <div>
                            <h3 className="font-semibold md:text-[1.875vw]">{title}</h3>
                            <p className="text-neutral-50 md:text-[.83vw]">{subtitle}</p>
                        </div>
                        <div>
                            <p className="font-poppins md:text-[.83vw]">{desc}</p>
                            <p className="text-primary font-poppins font-bold md:text-[2.5vw]"><sup className="font-semibold md:text-[.83vw] -top-[1.5vw]">RP</sup>{currency.format(price)}</p>
                        </div>
                    </div>
                    <div>
                        <GoalsButton isLink href={`/produk/${slug}`} className="w-full" variant={buttonVariant}>Daftar Sekarang</GoalsButton>
                    </div>
                    <div>
                        <ul className="list-disc list-inside text-neutral-80 md:text-[.83vw]">
                            {facilities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}