import image from "/resources/img/skripsi-mastery/img-2.png";

export default function Quotes () {
    return (
        <section id="quotes" className="md:pt-[4.27vw] md:pb-[7.34vw]">
            <div className="w-[84.375%] mx-auto md:space-y-[7.3vw]">
                <div className="w-[37vw] mx-auto text-center md:space-y-[2.9vw]">
                    <h2 className="md:text-[2.5vw]">Lingkunganmu Menentukan Siapa Dirimu Sekarang</h2>
                    <p className="md:text-[1.25vw]">Goals Academy Siapin Komunitas yang Siap Mendukung Kesehatan Mentalmu Selama Proses Bimbingan Berlangsung</p>
                </div>
                <div>
                    <img src={image} alt="Skripsi Mastery Poster" className="md:w-full md:rounded-[2.08vw] object-cover" />
                </div>
            </div>
        </section>
    )
}