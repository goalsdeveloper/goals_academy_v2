import TeamCard from "@/Components/TeamCard";

export default function Team ({ data }) {
    return (
        <section id="team" className="my-16 xl:my-24 3xl:my-32">
            <div className="container mx-auto">
                <h2 className="text-center mb-16 md:mb-8 lg:mb-12 xl:mb-16 2xl:mb-20 3xl:mb-24">Tim Goals Academy</h2>
                <div className="grid md:grid-cols-3 gap-16 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 3xl:gap-10">
                    {data.map(({name, title, image, description, linkedin, instagram}, index) => {
                        return (
                            <TeamCard key={index} name={name} title={title} image={image} description={description} linkedin={linkedin} instagram={instagram} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

