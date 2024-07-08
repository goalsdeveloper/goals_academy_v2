import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";
import CornerWaveVector from "@/Components/CornerWaveVector";
import TutorCardNew from "@/Components/TutorCardNew";
import GoalsButton from "@/Components/GoalsButton";
import { router } from "@inertiajs/react";

export default function TutorList({ data }) {
    const handleSearch = (skill) => {
        router.visit(route('profilTutor', {skill: skill}), {
            only: ['tutors'],
            preserveScroll: true,
        })
    }

    return (
        <section id="tutor_list" className="">
            <div className="mx-[7vw] pb-[13vw] md:pb-[5vw]">
                {/* <div className="flex gap-3">
                    <GoalsButton isActive className={"py-4 px-6 rounded-lg"} onClick={() => handleSearch('')}>
                        Semua
                    </GoalsButton>
                    <GoalsButton className={"py-4 px-6 rounded-lg border bg-white !text-black hover:!text-white "} onClick={() => handleSearch('kualitatif')}>
                        Kualitatif
                    </GoalsButton>
                    <GoalsButton className={"py-4 px-6 rounded-lg border bg-white !text-black hover:!text-white"}>
                        Kuantitatif
                    </GoalsButton>
                    <GoalsButton className={"py-4 px-6 rounded-lg border bg-white !text-black hover:!text-white"}>
                        Ilmu Sosial
                    </GoalsButton>
                </div> */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 my-5">
                    {data.map(({ name, profile, skills }, index) => {
                        return (
                            <TutorCardNew
                                key={index}
                                name={name}
                                image={profile.profile_image}
                                skills={skills}
                            />
                        );
                    })}
                </div>
                <p className="text-center pt-12 pb-3">Menampilkan <strong>12</strong> dari <strong>28</strong></p>
                <GoalsButton className={"rounded-md w-1/2 md:w-1/4 mx-auto"}>
                    Tampilkan Lebih Banyak
                </GoalsButton>
            </div>
        </section>
    );
}
