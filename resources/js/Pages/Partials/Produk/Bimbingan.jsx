import BimbinganCard from "@/Components/BimbinganCard";

export default function Bimbingan ({ data, active, status }) {
    return (
        <section id="bimbingan" className={`${active || status ? '' : 'hidden'} my-8 xl:my-12 3xl:my-16`}>
            <div className="container mx-auto">
                <h2 className="mb-4 sm:mb-6 xl:mb-10 3xl:mb-14">Bimbingan Skripsi</h2>
                <div className="grid grid-cols-3 md:gap-8 xl:gap-16">
                    {data.map((item, index) => {
                        return (
                            <BimbinganCard key={index} item={item} className="w-72 md:w-[21vw] 3xl:w-[20vw]" />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
