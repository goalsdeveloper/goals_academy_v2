import PengaturanLayout, { ImageUploader } from "@/Layouts/PengaturanLayout";
import { Link, useForm } from "@inertiajs/react";
import "@/script/momentCustomLocale";
import GoalsButton from "@/Components/elements/GoalsButton";
import { useState } from "react";
import userIcon from "/resources/img/icon/user.png";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { useMediaQuery } from "react-responsive";
import { FiChevronLeft } from "react-icons/fi";
import { PiPencilSimpleLight } from "react-icons/pi";

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

    console.log(data);
    const submit = (e) => {
        e.preventDefault();
        post("/pengaturan");
    };

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <PengaturanLayout auth={auth} title="Ubah Profil">
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
                                data={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                placeholder="Masukkan Username Anda"
                                type="text"
                                id="username"
                                label="Username"
                            />
                            <GoalsTextInput
                                data={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Masukkan Nama Lengkap Anda"
                                type="text"
                                id="name"
                                label="Nama Lengkap"
                            />
                            <GoalsTextInput
                                data={data.phone_number}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                placeholder="Masukkan Nomor Telepon Anda"
                                type="number"
                                id="phone_number"
                                label="Nomor Telepon"
                            />
                            <GoalsTextInput
                                data={data.university}
                                onChange={(e) =>
                                    setData("university", e.target.value)
                                }
                                placeholder="Masukkan Universitas Anda"
                                type="text"
                                id="university"
                                label="Universitas"
                            />
                            <GoalsTextInput
                                data={data.faculty}
                                onChange={(e) =>
                                    setData("faculty", e.target.value)
                                }
                                placeholder="Masukkan Fakultas Anda"
                                type="text"
                                id="faculty"
                                label="Fakultas"
                            />
                            <GoalsTextInput
                                data={data.major}
                                onChange={(e) =>
                                    setData("major", e.target.value)
                                }
                                placeholder="Masukkan Jurusan Anda"
                                type="text"
                                id="major"
                                label="Jurusan"
                            />
                        </div>
                        <GoalsTextInput
                            data={data.referral}
                            onChange={(e) =>
                                setData("referral", e.target.value)
                            }
                            placeholder="Masukkan Kode Referral Anda"
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
        </PengaturanLayout>
    );
}

function Input({ type, id, label, value, onChange }) {
    return (
        <div className="relative flex">
            <input
                value={value}
                onChange={onChange}
                id={id}
                type={type}
                className="w-full border-1 xl:border-2 border-dark placeholder-shown:border-light-grey font-poppins rounded-[1vw] md:rounded-[.5vw] pt-[3vw] pb-[1.5vw] px-[3vw] md:pt-[1vw] md:pb-[.5vw] md:px-[1.75vw] focus:outline-none focus:border-dark peer"
                placeholder=" "
            />
            <label
                htmlFor={id}
                className="absolute px-[1vw] md:px-[.5vw] bg-white text-secondary peer-focus:text-secondary peer-placeholder-shown:text-light-grey ms-[2.5vw] md:ms-[1.5vw] -mt-[1.5vw] md:-mt-[.75vw]"
            >
                {label}
            </label>
        </div>
    );
}

export const ProfileImage = ({ auth }) => {
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [profileImage, setProfileImage] = useState(
        auth.user.profile.profile_image
            ? `/storage/${auth.user.profile.profile_image}`
            : userIcon
    );

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <div className="relative flex flex-shrink-0 flex-col justify-center items-center gap-[1vw] px-[1.6vw] self-center mb-[6vw] h-fit">
            <img
                className="bg-white w-[22vw] h-[22vw] md:w-[5vw] md:h-[5vw] rounded-full shadow-centered-spread"
                src={profileImage ? profileImage : userIcon}
                alt="User"
            />
            <div className="hidden md:flex flex-col text-center gap-[1vw]">
                <p className="font-medium">{auth.user.username}</p>
                <GoalsButton
                    variant="bordered"
                    // className="text-[.95vw] font-medium hover:text-secondary"
                    onClick={() => setShowImageUploader(true)}
                >
                    Ubah Foto
                </GoalsButton>
            </div>

            {isMobile && (
                <button
                    className="rounded-full bg-primary text-white p-[1vw] text-[5vw] font-thin absolute bottom-0 right-[2vw] hover:scale-105 hover:shadow hover:bg-secondary"
                    onClick={() => setShowImageUploader(true)}
                >
                    <PiPencilSimpleLight />
                </button>
            )}

            <ImageUploader
                show={showImageUploader}
                setShow={setShowImageUploader}
                profileImage={profileImage}
                setProfileImage={setProfileImage}
            />
        </div>
    );
};
