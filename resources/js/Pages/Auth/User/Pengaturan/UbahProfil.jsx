import PengaturanLayout, { ImageUploader } from "@/Layouts/PengaturanLayout";
import React from "react";
import { Link, useForm } from "@inertiajs/react";
import "@/script/momentCustomLocale";
import GoalsButton from "@/Components/elements/GoalsButton";
import { useState } from "react";
import userIcon from "/resources/img/icon/user.png";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { useMediaQuery } from "react-responsive";
import { FiChevronLeft } from "react-icons/fi";
import { PiPencilSimpleLight } from "react-icons/pi";
import toast from "react-hot-toast";
import { Autocomplete } from "@mui/material";
import { universities, majorFamilies } from "@/data";

export default function Index({ auth, userData, profileData }) {
    const { data, setData, post, processing } = useForm({
        username: userData.username,
        name: userData.name,
        phone_number: profileData.phone_number,
        university: profileData.university ? profileData.university : "",
        faculty: profileData.faculty,
        major: profileData.major,
        rumpun: profileData.rumpun ? profileData.rumpun : "",
        referral: "",
    });

    const [university, setUniversity] = React.useState(data.university);
    const [rumpun, setRumpun] = React.useState(data.rumpun);

    const submit = (e) => {
        e.preventDefault();
        post("/pengaturan", {
            onSuccess: () => {
                toast.success("Profil berhasil diubah");
            },
        });
    };

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

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
                                required
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
                                placeholder="Contoh: 0XXXXXXXXXXX, 62XXXXXXXXXXX"
                                type="tel"
                                id="phone_number"
                                label="Nomor Whatsapp"
                            />
                            <label
                                htmlFor="university"
                                className="w-full grid items-center gap-[.4vw]"
                            >
                                Universitas
                                <Autocomplete
                                    disableClearable
                                    id="university"
                                    options={universities}
                                    renderInput={(params) => {
                                        const { className, ...props } =
                                            params.inputProps;
                                        return (
                                            <div ref={params.InputProps.ref}>
                                                <input
                                                    className={
                                                        "w-full flex justify-between items-center text-[3.7vw] md:text-[.8vw] focus:ring-0 px-[3vw] md:px-[1vw] rounded-md text-dark h-[12vw] md:h-[3vw] border placeholder:text-light-grey"
                                                    }
                                                    type="text"
                                                    {...props}
                                                />
                                            </div>
                                        );
                                    }}
                                    getOptionLabel={(option) => option}
                                    inputValue={university}
                                    onInputChange={(event, newInputValue) => {
                                        if (event != null) {
                                            setUniversity(newInputValue);
                                        }
                                    }}
                                    onBlur={() => setUniversity(data.university)}
                                    onChange={(e, value) => {
                                        setData({
                                            ...data,
                                            university: value
                                        });
                                    }}
                                />
                            </label>
                            {/* <GoalsTextInput
                                data={data.university}
                                onChange={(e) =>
                                    setData("university", e.target.value)
                                }
                                placeholder="Masukkan Universitas Anda"
                                type="text"
                                id="university"
                                label="Universitas"
                            /> */}
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
                        <label
                            htmlFor="major_family"
                            className="w-full grid items-center gap-[.4vw]"
                        >
                            Rumpun Jurusan
                            <Autocomplete
                                disableClearable
                                id="major_family"
                                options={majorFamilies}
                                renderInput={(params) => {
                                    const { className, ...props } =
                                        params.inputProps;
                                    return (
                                        <div ref={params.InputProps.ref}>
                                            <input
                                                className={
                                                    "w-full flex justify-between items-center text-[3.7vw] md:text-[.8vw] focus:ring-0 px-[3vw] md:px-[1vw] rounded-md text-dark h-[12vw] md:h-[3vw] border placeholder:text-light-grey"
                                                }
                                                type="text"
                                                {...props}
                                            />
                                        </div>
                                    );
                                }}
                                getOptionLabel={(option) => option}
                                inputValue={rumpun}
                                onInputChange={(event, newInputValue) => {
                                    if (event != null) {
                                        setRumpun(newInputValue);
                                    }
                                }}
                                onBlur={() => setRumpun(data.rumpun)}
                                onChange={(e, value) => {
                                    setData({
                                        ...data,
                                        rumpun: value
                                    });
                                }}
                            />
                        </label>
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
                            disabled={processing}
                            type="submit"
                            className="md:self-end mt-[1.8vw] md:mt-0"
                        >
                            {processing ? <i className="fa-solid fa-circle-notch fa-spin text-inherit animate-spin"></i> : "Simpan"}
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
                className="w-full border-1 xl:border-2 border-dark placeholder-shown:border-light-grey font-poppins rounded-[1vw] md:rounded-[.5vw] pt-[3vw] pb-[1.5vw] px-[3vw] md:pt-[1vw] md:pb-[.5vw] md:px-[1.75vw] focus:border-dark peer"
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

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

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
