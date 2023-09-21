import { useForm } from "@inertiajs/react";

export default function SearchBar ({ searchHandler }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        keyword: ''
    })

    const search = e => {
        e.preventDefault()
        searchHandler(data.keyword.toLowerCase())
        reset('keyword')
    }

    return (
        <section id="filter" className="my-8 xl:my-12 3xl:my-16 w-full sticky top-24 md:top-16 xl:top-24 3xl:top-64 z-50 bg-white">
            <div className="container mx-auto pt-1 md:pb-3 lg:pb-3 xl:pb-4">
                <form onSubmit={search} className="flex gap-2">
                    <input value={data.keyword} onChange={e => setData('keyword', e.target.value)} type="text" className="w-full border-1 border-light-grey rounded-lg md:p-2 xl:p-3 3xl:p-4 focus:outline-none" placeholder="Cari disini ..." />
                    <button className="border-1 border-light-grey rounded-lg md:px-2 xl:px-3 3xl:px-5">
                        <i className="bi bi-search text-grey md:text-12 xl:text-20 3xl:text-24"></i>
                    </button>
                </form>
            </div>
        </section>
    )
}
