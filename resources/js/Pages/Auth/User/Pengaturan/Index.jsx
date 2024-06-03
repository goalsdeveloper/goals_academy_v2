import PengaturanLayout from "@/Layouts/PengaturanLayout";
import { Link, useForm } from "@inertiajs/react";
import "@/script/momentCustomLocale";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import GoalsButton from "@/Components/elements/GoalsButton";
import { useState } from "react";
import userIcon from "/resources/img/icon/user.png";
import { useMediaQuery } from "react-responsive";
import { FiChevronLeft } from "react-icons/fi";
import { ProfileImage } from "./UbahProfil";

export default function Index({ auth, userData, profileData }) {
    const { data, setData, post } = useForm({
        username: userData.username,
        name: userData.name,
        phone_number: profileData.phone_number,
        university: profileData.university,
        faculty: profileData.faculty,
        major: profileData.major,
        referral: "",
    });

    const [profileImage, setProfileImage] = useState(
        auth.user.profile.profile_image
            ? `/storage/${auth.user.profile.profile_image}`
            : userIcon
    );

    const submit = (e) => {
        e.preventDefault();
        post("/pengaturan");
    };

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <PengaturanLayout auth={auth} title="Ubah Profil">
            {isMobile ? (
                <div className="space-y-[30vw]">
                    <div className="h-[44vw]">
                        <div className="absolute left-0 w-full">
                            <img
                                src="/img/profile/bg-pengaturan.svg"
                                alt="bg-pengaturan"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute w-fit flex flex-col items-center mx-auto -bottom-[25vw] left-0 right-0 z-10 space-y-[3vw]">
                                <img
                                    className="bg-white border-[.8vw] w-[30vw] h-[30vw] md:w-[5vw] md:h-[5vw] rounded-full shadow-centered-spread"
                                    src={profileImage ? profileImage : userIcon}
                                    alt="User"
                                />
                                <div className="text-center space-y-[1vw] text-[3.2vw]">
                                    <p className="font-medium">
                                        {auth.user.username}
                                    </p>
                                    <p className="text-neutral-40">{auth.user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-neutral-20 font-medium space-y-[1.8vw]">
                        <Link
                            href="pengaturan/ubah_profil"
                            className="flex gap-[7vw] border py-[3.7vw] px-[7.4vw] rounded-[3.7vw]"
                        >
                            <i className="bi bi-pen"></i>
                            <span>Profil</span>
                        </Link>
                        <Link
                            href="pengaturan/ubah_password"
                            className="flex gap-[7vw] border py-[3.7vw] px-[7.4vw] rounded-[3.7vw]"
                        >
                            <i className="bi bi-key"></i>
                            <span>Ubah Password</span>
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            className="flex gap-[7vw] border py-[3.7vw] px-[7.4vw] rounded-[3.7vw] text-danger"
                        >
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Keluar</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="w-full md:border border-neutral-20 rounded-[.8vw] md:p-[1.6vw]">
                    {isMobile ? (
                        <Link
                            href="/pengaturan"
                            className="flex items-center gap-[1.5vw] text-black"
                        >
                            <FiChevronLeft className="md:hidden text-[4vw]" />
                            <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                                Edit Profil
                            </h1>
                        </Link>
                    ) : (
                        <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw] text-center">
                            Edit Profil
                        </h1>
                    )}

                    <div className="flex flex-col md:flex-row md:justify-between md:gap-[1.6vw] ">
                        <ProfileImage auth={auth} />
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-[1.8vw] md:gap-[1.2vw] py-[1.6vw] w-full"
                        >
                            <div className="grid md:grid-cols-2 gap-[1.8vw] md:gap-[1.2vw]">
                                <GoalsTextInput
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                    type="text"
                                    id="username"
                                    label="Username"
                                />
                                <GoalsTextInput
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    type="text"
                                    id="name"
                                    label="Nama Lengkap"
                                />
                                <GoalsTextInput
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                    type="text"
                                    id="phone_number"
                                    label="Nomor Telepon"
                                />
                                <GoalsTextInput
                                    value={data.university}
                                    onChange={(e) =>
                                        setData("university", e.target.value)
                                    }
                                    type="text"
                                    id="university"
                                    label="Universitas"
                                />
                                <GoalsTextInput
                                    value={data.faculty}
                                    onChange={(e) =>
                                        setData("faculty", e.target.value)
                                    }
                                    type="text"
                                    id="faculty"
                                    label="Fakultas"
                                />
                                <GoalsTextInput
                                    value={data.major}
                                    onChange={(e) =>
                                        setData("major", e.target.value)
                                    }
                                    type="text"
                                    id="major"
                                    label="Jurusan"
                                />
                            </div>
                            <GoalsTextInput
                                value={data.referral}
                                onChange={(e) =>
                                    setData("referral", e.target.value)
                                }
                                type="text"
                                id="referral"
                                label="Kode Referral"
                            />

                            <GoalsButton
                                type="submit"
                                className="md:self-end mt-[1.8vw] md:mt-0"
                            >
                                Simpan
                            </GoalsButton>
                        </form>
                    </div>
                </div>
            )}
        </PengaturanLayout>
        // <PengaturanLayout auth={auth} title="Ubah Profil">
        //
        // </PengaturanLayout>
    );
}
