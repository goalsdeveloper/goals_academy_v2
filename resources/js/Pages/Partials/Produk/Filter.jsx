import image1 from "/resources/img/produk/bimbingan.svg";
import image2 from "/resources/img/produk/ebook.svg";
import image3 from "/resources/img/produk/webinar.svg";

export default function Filter ({ show, showHandler }) {
    return (
        <section id="filter" className="pb-4 md:pb-0">
            <div className="container mx-auto md:pt-2 lg:pt-4 xl:pt-8 3xl:pt-4">
                <div className="grid grid-cols-3 gap-[2vw] md:gap-5 3xl:gap-8">
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
        <button className={`relative md:flex flex-row items-end rounded-md md:rounded-xl text-center md:text-start text-white bg-cover bg-no-repeat md:h-[9vw] lg:h-[10vw] xl:h-[11vw] 3xl:h-[10vw] ${className} ${active ? 'opacity-100' : 'opacity-50'}`} onClick={onClick}>
            <p className="md:w-1/2 font-poppins drop-shadow-xl font-bold text-[3vw] md:text-14 xl:text-20 2xl:text-24 3xl:text-28 p-4 md:p-2 lg:p-3 xl:p-4 3xl:p-6">{name}</p>
            <div className="hidden md:block absolute right-2 z-10">
                <img className="h-[45vw] xs:h-[40vw] md:h-[10vw] lg:h-[11vw] xl:h-[13vw] 3xl:h-[11vw]" src={img} alt={name} />
            </div>
        </button>
    )
}
