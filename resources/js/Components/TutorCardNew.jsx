export default function TutorCardNew({ name, image, skills }) {
    // console.log(skills)
    return (
        <div className=" text-black border rounded-xl shadow-md px-2 py-4 h-[52vw] md:h-[21vw]">
            <div className="h-[23vw] md:h-[11vw]">
                <img
                    className="w-full h-full border rounded-xl object-cover bg-center"
                    src={"storage/" + image}
                    alt={name}
                />
            </div>
            <div className="px-0">
                <div className="flex gap-2 md:gap-1 lg:gap-2 2xl:gap-3 my-2">
                    <h5 className="text-black">{name}</h5>
                </div>
            </div>
            <div className="flex flex-wrap gap-1 h-[12vw] md:h-[5vw] overflow-auto scrollbar-hidden">
                {skills.map((e, index) => {
                    return (
                        <div className="border-black border-1 py-1 px-2 rounded-full h-min" key={index}>
                            {e.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
