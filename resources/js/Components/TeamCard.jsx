export default function TeamCard ({ name, title, image, description, linkedin, instagram }) {
    return (
        <div className="grid gap-4 md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 3xl:gap-6">
            <div className="flex items-center justify-center md:rounded-md xl:rounded-xl overflow-hidden md:h-[15vw]">
                <img className="w-full" src={image} alt={name} />
            </div>
            <div>
                <div className="flex gap-2 md:gap-1 lg:gap-2 2xl:gap-3">
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
