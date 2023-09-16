export default function Team ({ data }) {
    return (
        <section id="team" className="my-16 xl:my-24 3xl:my-32">
            <div className="container mx-auto">
                <h2 className="text-center md:mb-8 lg:mb-12 xl:mb-16 2xl:mb-20 3xl:mb-24">Tutor Goals Academy</h2>
                <div className="grid grid-cols-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8 3xl:gap-10">
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

function TeamCard ({ name, title, image, description, linkedin, instagram }) {
    return (
        <div className="grid md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 3xl:gap-6">
            <div className="flex items-center justify-center md:rounded-md xl:rounded-xl overflow-hidden md:h-[15vw]">
                <img className="w-full" src={image} alt={name} />
            </div>
            <div>
                <div className="flex md:gap-1 lg:gap-2 2xl:gap-3">
                    <h5 className="text-dark">{name}</h5>
                    <a href={`https://www.linkedin.com/in/${linkedin}`}><i className="bi bi-linkedin md:text-8 lg:text-12 xl:text-16 2xl:text-20 3xl:text-24"></i></a>
                    <a href={`https://www.instagram.com/${instagram}`}><i className="bi bi-instagram md:text-8 lg:text-12 xl:text-16 2xl:text-20 3xl:text-24"></i></a>
                </div>
                <p>{title}</p>
            </div>
            <div>
                <p>{description}</p>
            </div>
        </div>
    )
}
