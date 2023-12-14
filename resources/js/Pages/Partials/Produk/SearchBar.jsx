import { useForm } from "@inertiajs/react";

export default function SearchBar ({ searchHandler, className, data, setData }) {
    const search = e => {
        e.preventDefault()
        searchHandler(data.keyword.toLowerCase())
    }

    return (
        <section id="filter" className={`my-8 xl:my-12 3xl:my-16 w-full sticky top-20 xs:top-24 md:top-20 xl:top-24 3xl:top-36 z-10 bg-white ${className}`}>
            <div className="container mx-auto pt-1 pb-4 md:pb-3 lg:pb-3 xl:pb-4 3xl:pb-5">
                <form onSubmit={search} className="flex gap-2">
                    <input value={data.keyword} onChange={e => setData('keyword', e.target.value)} type="text" className="w-full border-1 border-light-grey rounded-lg p-3 md:p-2 xl:p-3 3xl:p-4 focus:outline-none" placeholder="Cari disini ..." />
                    <button className="border-1 border-light-grey rounded-lg px-4 md:px-2 xl:px-3 3xl:px-5">
                        <i className="bi bi-search text-grey md:text-12 xl:text-20 3xl:text-24"></i>
                    </button>
                </form>
            </div>
        </section>
    )
}
