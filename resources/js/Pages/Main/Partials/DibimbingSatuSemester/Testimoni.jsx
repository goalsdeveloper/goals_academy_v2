import testimoni1 from "/resources/img/testimony/wendi.jpg";
import testimoni2 from "/resources/img/testimony/ravly.jpg";
import testimoni3 from "/resources/img/testimony/zaqya.jpg";
import testimoni4 from "/resources/img/testimony/haris.jpg";
import testimoni5 from "/resources/img/testimony/ferry.jpg";
import testimoni6 from "/resources/img/testimony/khafidh.jpg";

export default function Testimoni () {
    const items = [
        {
            name: "Rizky",
            instagram: "instagram",
            faculty: "Hukum",
            image: testimoni1,
            text: "Ngerjain skripsi gak lagi bikin stres karena ada Goals Academy. Tutornya keren-keren, selalu siap bantu dan ngasih solusi buat masalah skripsi gue.",
        },
        {
            name: "Doni",
            instagram: "instagram",
            faculty: "Ilmu Komunikasi",
            image: testimoni2,
            text: "Mentornya gokil banget! Setiap sesi bimbingan bawa insight baru yang bikin skripsi gue jadi lebih berisi. Worth it banget!",
        },
        {
            name: "Sinta",
            instagram: "instagram",
            faculty: "Akuntansi",
            image: testimoni3,
            text: "Goals Academy bikin skripsi jadi gak terlalu ngeri. Semua materi dijelasin dengan simpel dan gampang dipahami. Sesi bimbingannya juga seru!",
        },
        {
            name: "Lia",
            instagram: "instagram",
            faculty: "Administrasi Publik",
            image: testimoni4,
            text: "Bimbingan dari Goals Academy bikin gue lebih pede menghadapi sidang. Pertanyaannya udah gue antisipasi semua, thanks to the Q&A sessions!",
        },
        {
            name: "Maria",
            instagram: "instagram",
            faculty: "Ilmu Komunikasi",
            image: testimoni5,
            text: "Bimbingan dari Goals Academy tuh ngebantu banget! Skripsi jadi selesai tepat waktu dan hasilnya mantap. Recommended banget deh buat kalian yang lagi berjuang skripsi!",
        },
        {
            name: "Haris",
            instagram: "instagram",
            faculty: "Hukum",
            image: testimoni6,
            text: "Sebelum bimbingan di goals academy bingung dan ngga paham sama sekali terkait penggunaan SPSS, setelah daftar bimbingan dan tutornya simple banget aku jadi paham terkait SPSS.",
        },
    ];

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