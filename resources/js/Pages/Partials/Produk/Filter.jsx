import image1 from "/resources/img/produk/bimbingan.svg";
import image2 from "/resources/img/produk/ebook.svg";
import image3 from "/resources/img/produk/webinar.svg";

export default function Filter ({ show, showHandler }) {
    return (
        <section id="filter" className="mb-16 xs:mb-20 md:mb-0">
            <div className="container mx-auto pt-4 xs:pt-8 md:pb-0 md:pt-2 lg:pt-4 xl:pt-8 3xl:pt-4">
                <div className="grid md:grid-cols-3 gap-16 xs:gap-20 md:gap-5 3xl:gap-8">
                    <ProdukCard name="Bimbingan Skripsi" img={image1} active={show[0]} className="bg-bimbingan" onClick={() => showHandler(0)} />
                    <ProdukCard name="E-Book" img={image2} active={show[1]} className="bg-ebook" onClick={() => showHandler(1)} />
                    <ProdukCard name="Webinar Skripsi" img={image3} active={show[2]} className="bg-webinar" onClick={() => showHandler(2)} />
                </div>
            </div>
        </section>
    )
}

function ProdukCard ({ name, img, active, onClick, className }) {
    return (
        <button className={`relative flex flex-row items-end rounded-2xl md:rounded-xl text-start text-white bg-cover bg-no-repeat before:-z-10 h-[36vw] xs:h-[32vw] md:h-[9vw] lg:h-[10vw] xl:h-[11vw] 3xl:h-[10vw] ${className} ${active ? 'opacity-100' : 'opacity-50'}`} onClick={onClick}>
            <p className="w-1/2 font-poppins font-bold drop-shadow-xl text-20 xs:text-24 sm:text-28 md:text-14 xl:text-20 2xl:text-24 3xl:text-28 p-4 xs:p-6 md:p-2 lg:p-3 xl:p-4 3xl:p-6">{name}</p>
            <div className="absolute right-2 z-10">
                <img className="h-[45vw] xs:h-[40vw] md:h-[10vw] lg:h-[11vw] xl:h-[13vw] 3xl:h-[11vw]" src={img} alt={name} />
            </div>
        </button>
    )
}
