import image1 from "/resources/img/produk-bimbingan.svg";
import image2 from "/resources/img/produk-ebook.svg";
import image3 from "/resources/img/produk-webinar.svg";

export default function Filter ({ show, showHandler }) {
    return (
        <section id="filter" className="my-8 xl:my-12 3xl:my-16">
            <div className="container mx-auto md:pt-12 xl:pt-24">
                <div className="grid grid-cols-3 gap-5 3xl:gap-8">
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
        <button className={`relative flex flex-row items-end rounded-xl text-start text-white bg-cover bg-no-repeat before:-z-10 ${className} ${active ? 'opacity-100' : 'opacity-50'}`} onClick={onClick}>
            <p className="w-1/2 font-poppins font-bold drop-shadow-xl md:text-14 xl:text-20 2xl:text-24 3xl:text-28 md:p-2 xl:p-4 3xl:p-6 md:mt-8 xl:mt-16">{name}</p>
            <div className="absolute right-2 z-10">
                <img className="md:h-24 xl:h-44 2xl:h-48 3xl:h-56" src={img} alt={name} />
            </div>
        </button>
    )
}
