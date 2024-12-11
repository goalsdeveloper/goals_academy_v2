export default function SearchBar ({ searchHandler, className, data, setData }) {
    const search = e => {
        e.preventDefault()
        searchHandler(data.keyword.toLowerCase())
    }

    return (
        <section id="filter" className={`my-[2vw] md:my-[.5vw] w-full sticky top-[20vw] md:top-[6vw] z-10 bg-white ${className}`}>
            <div className="container mx-auto py-[4vw] md:my-0 md:pt-[1.5vw] md:pb-[1vw]">
                <form onSubmit={search} className="flex gap-2">
                    <input value={data.keyword} onChange={e => setData('keyword', e.target.value)} type="text" className="w-full border-1 border-light-grey rounded-lg p-3 md:p-2 xl:p-3 3xl:p-4 focus:ring-0 focus:border-light-grey" placeholder="Cari disini ..." />
                    <button className="border-1 border-light-grey rounded-lg px-4 md:px-2 xl:px-3 3xl:px-5">
                        <i className="bi bi-search text-grey md:text-12 xl:text-20 3xl:text-24"></i>
                    </button>
                </form>
            </div>
        </section>
    )
}
