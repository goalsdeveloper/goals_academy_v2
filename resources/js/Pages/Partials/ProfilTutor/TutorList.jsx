import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";
import CornerWaveVector from "@/Components/CornerWaveVector";
import TutorCardNew from "@/Components/TutorCardNew";
import GoalsButton from "@/Components/GoalsButton";
import { router } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";

export default function TutorList({ data, skillSearch }) {
    const [dataTutor, setDataTutor] = useState(data.data);
    const [nextPageUrl, setNextPageUrl] = useState(data.next_page_url);
    const [nextPage, setNextPage] = useState(++data.current_page);
    const [totalTutor, setTotalTutor] = useState(data.total);
    const handleSearch = (skill) => {
        router.visit(route("profilTutor", { skill: skill }), {
            only: ["tutors", "skill"],
            preserveScroll: true,
        });
    };

    const handleLoadMore = (skill, page) => {
        axios
            .get(route("profilTutor", { skill: skill, page: page }))
            .then((res) => {
                setDataTutor([...dataTutor, ...res.data.tutors.data]);
                setNextPage(++res.data.tutors.current_page);
                setNextPageUrl(res.data.tutors.next_page_url);
            });
    };

    return (
        <section id="tutor_list" className="">
            <div className="mx-[7vw] pb-[13vw] md:pb-[5vw]">
                <Swiper
                    modules={[Navigation, Pagination, A11y, FreeMode]}
                    slidesPerView={"auto"}
                    grabCursor={true}
                    freeMode={true}
                >
                    <SwiperSlide
                        style={{ width: "fit-content" }}
                        className="p-1 md:p-2 lg:p-3 xl:p-4"
                    >
                        <GoalsButton
                            className={`py-4 px-6 rounded-lg border  ${
                                skillSearch == ""
                                    ? "bg-secondary text-white"
                                    : "bg-white !text-black hover:!text-white"
                            }`}
                            onClick={() => handleSearch("")}
                        >
                            Semua
                        </GoalsButton>
                    </SwiperSlide>
                    <SwiperSlide
                        style={{ width: "fit-content" }}
                        className="p-1 md:p-2 lg:p-3 xl:p-4"
                    >
                        <GoalsButton
                            className={`py-4 px-6 rounded-lg border  ${
                                skillSearch == "kualitatif"
                                    ? "bg-secondary text-white"
                                    : "bg-white !text-black hover:!text-white"
                            }`}
                            onClick={() => handleSearch("kualitatif")}
                        >
                            Kualitatif
                        </GoalsButton>
                    </SwiperSlide>
                    <SwiperSlide
                        style={{ width: "fit-content" }}
                        className="p-1 md:p-2 lg:p-3 xl:p-4"
                    >
                        <GoalsButton
                            className={`py-4 px-6 rounded-lg border  ${
                                skillSearch == "kuantitatif"
                                    ? "bg-secondary text-white"
                                    : "bg-white !text-black hover:!text-white"
                            }`}
                            onClick={() => handleSearch("kuantitatif")}
                        >
                            Kuantitatif
                        </GoalsButton>
                    </SwiperSlide>
                    <SwiperSlide
                        style={{ width: "fit-content" }}
                        className="p-1 md:p-2 lg:p-3 xl:p-4"
                    >
                        <GoalsButton
                            className={`py-4 px-6 rounded-lg border  ${
                                skillSearch == "ilmu sosial"
                                    ? "bg-secondary text-white"
                                    : "bg-white !text-black hover:!text-white"
                            }`}
                            onClick={() => handleSearch("ilmu sosial")}
                        >
                            Ilmu Sosial
                        </GoalsButton>
                    </SwiperSlide>
                </Swiper>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 my-5">
                    {dataTutor.map(({ name, profile, skills }, index) => {
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
                <p className="text-center pt-12 pb-3">
                    Menampilkan <strong>{dataTutor.length}</strong> dari{" "}
                    <strong>{totalTutor}</strong>
                </p>
                {nextPageUrl ? (
                    <GoalsButton
                        className={"rounded-md w-1/2 md:w-1/4 mx-auto"}
                        onClick={() => handleLoadMore(skillSearch, nextPage)}
                    >
                        Tampilkan Lebih Banyak
                    </GoalsButton>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
}
