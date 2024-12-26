import GoalsButton from "@/Components/elements/GoalsButton";
import background from "/resources/img/vector/gradient-bg-8.svg";

import img1 from "/resources/img/skripsi-mastery/skripsi-mastery-akses-1-bulan.svg";
import img2 from "/resources/img/skripsi-mastery/skripsi-mastery-akses-3-bulan.svg";
import img3 from "/resources/img/skripsi-mastery/skripsi-mastery-akses-6-bulan.svg";

export default function PriceList () {
    const data = [
        {
            title: "Akses 1 Bulan",
            subtitle: "", 
            desc: "", 
            price: 95000, 
            img: img1,
            slug: "skripsi-mastery-akses-1-bulan", 
            facilities: [
                "10 modul Fast Track Nyusun Skripsi",
                "Daily Call bersama Tutor",
                "Bebas Konsultasi via Chat Bersama Tutor",
                "Free Cek Turnitin",
                "Free Desk Review Skripsi",
                "Daily Call Bersama Tutor",
                "Monthly Call Bersama Founders buat pengembangan diri",
                "Akses perpustakaan digital (e-book)",
                "Informasi Magang & Berita",
                "Tes kepribadian",
                "Template Q&A Sidang Penelitian",
                "Template Outline Judul Penelitian",
                "Prompt AI untuk Penelitian",
                "Koleksi Judul untuk Penelitian",
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
            desc: "Lebih Hemat Hingga 35rb", 
            price: 250000, 
            img: img2,
            slug: "skripsi-mastery-akses-3-bulan", 
            facilities: [
                "10 modul Fast Track Nyusun Skripsi",
                "Daily Call bersama Tutor",
                "Bebas Konsultasi via Chat Bersama Tutor",
                "Free Cek Turnitin",
                "Free Desk Review Skripsi",
                "Daily Call Bersama Tutor",
                "Monthly Call Bersama Founders buat pengembangan diri",
                "Akses perpustakaan digital (e-book)",
                "Informasi Magang & Berita",
                "Tes kepribadian",
                "Template Q&A Sidang Penelitian",
                "Template Outline Judul Penelitian",
                "Prompt AI untuk Penelitian",
                "Koleksi Judul untuk Penelitian",
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
            desc: "Lebih Hemat Hingga 120rb", 
            price: 450000, 
            img: img3,
            slug: "skripsi-mastery-akses-6-bulan", 
            facilities: [
                "10 modul Fast Track Nyusun Skripsi",
                "Daily Call bersama Tutor",
                "Bebas Konsultasi via Chat Bersama Tutor",
                "Free Cek Turnitin",
                "Free Desk Review Skripsi",
                "Daily Call Bersama Tutor",
                "Monthly Call Bersama Founders buat pengembangan diri",
                "Akses perpustakaan digital (e-book)",
                "Informasi Magang & Berita",
                "Tes kepribadian",
                "Template Q&A Sidang Penelitian",
                "Template Outline Judul Penelitian",
                "Prompt AI untuk Penelitian",
                "Koleksi Judul untuk Penelitian",
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
        <section id="pricelist" className="relative pt-[9.59vw] pb-[14.8vw] md:pt-[5.2vw] md:pb-[7.34vw]">
            <div className="hidden md:block absolute -top-[20vw] right-0 -z-10">
                <img src={background} alt="Background Image" className="md:w-[50vw]" />
            </div>
            <div className="w-[88.35vw] md:w-[73.96%] mx-auto space-y-[11.65vw] md:space-y-[8.23vw]">
                <h2 className="text-[5.825vw] md:text-[2.5vw] text-center">Kalau di Spill Semua, Nanti Websitenya Bakal Panjang<br/>Berikutnya Adalah Giliranmu</h2>
                <div className="w-[80.58vw] md:w-auto mx-auto grid grid-cols-1 md:grid-cols-3 gap-[3.88vw] md:gap-[1.04vw]">
                    {data.map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function Card ({ title, subtitle, desc, price, img, slug, facilities, tagline, buttonVariant, borderColor, bgColor }) {
    const currency = Intl.NumberFormat("id-ID")

    return (
        <div className={`border-1 border-${borderColor} bg-${bgColor} h-fit md:h-[45vw] rounded-[2.9vw] md:rounded-[.83vw] overflow-hidden`}>
            <div className={`md:h-[8%] flex justify-center items-center bg-${tagline.bg} text-${tagline.color} text-center font-medium text-[3.4vw] md:text-[1.04vw] py-[2vw] md:py-0`}>{tagline.text}</div>
            <div className="py-[4vw] md:py-[1vw]">
                <img className="h-[50vw] md:h-[15vw] mx-auto" src={img} alt={`${title} Image`} />
            </div>
            <div className="md:h-[50%] pb-[6vw] px-[8.79vw] md:py-0 md:px-[2.34vw] flex justify-center">
                <div className="w-full flex flex-col gap-[6.28vw] md:gap-[2.08vw]">

                    <div className="space-y-[2.72vw] md:space-y-[1.875vw]">
                        <div>
                            <h3 className="font-semibold text-[5.825vw] md:text-[1.875vw]">{title}</h3>
                            <p className="text-neutral-50 md:text-[.83vw]">{subtitle}</p>
                        </div>
                        <div>
                            <p className="font-poppins md:text-[.83vw] text-neutral-80">{desc}</p>
                            <p className="text-primary font-poppins font-bold text-[8.16vw] md:text-[2.5vw]"><sup className="font-semibold text-[2.72vw] md:text-[.83vw] -top-[5vw] md:-top-[1.5vw]">RP</sup>{currency.format(price)}</p>
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
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                        {/* <ul className="list-disc text-neutral-80 text-[2.9vw] md:text-[.83vw]">
                            {facilities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
