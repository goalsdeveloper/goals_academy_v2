import React from "react";
import { Link, router, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    GoalsSelectMultipleInput,
    GoalsSelectMultipleInputItem,
} from "@/Components/elements/GoalsSelectMultipleInput";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import GoalsButton from "@/Components/elements/GoalsButton";
import { useMediaQuery } from "react-responsive";
import { PiPencilSimpleLight } from "react-icons/pi";
import GoalsImageUploader from "@/Components/elements/GoalsImageUploader";
import toast from "react-hot-toast";
import { Autocomplete } from "@mui/material";
import { universities, majorFamilies } from "@/Hooks/data";

export default function Profile({ auth, profile, skills }) {
    const [showForm, setShowForm] = useState({
        soft_skills: false,
        hard_skills: false,
    });

    const {
        data: formData,
        setData: setFormData,
        put,
    } = useForm({
        id: profile.id,
        name: profile.name,
        username: profile.username,
        phone_number: profile.profile.phone_number,
        email: profile.email,
        university: profile.profile.university,
        faculty: profile.profile.faculty,
        major: profile.profile.major,
        linkedin_url: profile.profile.linkedin_url,
        skills: profile.skills.map((i) => i.id),
        soft_skills: profile.skills.filter((i) => i.category == "soft_skill"),
        hard_skills: profile.skills.filter((i) => i.category == "hard_skill"),
    });

    const [university, setUniversity] = React.useState(formData.university);
    const [rumpun, setRumpun] = React.useState(formData.rumpun);

    const { data: temp, setData: setTemp } = useForm({
        skills: profile.skills.map((i) => i.id),
        soft_skills: profile.skills.filter((i) => i.category == "soft_skill"),
        hard_skills: profile.skills.filter((i) => i.category == "hard_skill"),
    });

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    if (!isMobile) return router.visit(route("tutor.setting.index"));

    return (
        <DashboardLayout title="Ubah Profile" role="tutor" auth={auth}>
            <div className="w-full md:border border-neutral-20 rounded-[.8vw] px-[4vw] py-[1.6vw] space-y-[3.7vw]">
                <Link
                    href={route("tutor.setting.index")}
                    className="flex items-center gap-[1.5vw] text-black"
                >
                    <FiChevronLeft className="md:hidden text-[4vw]" />
                    <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                        Ubah Profil
                    </h1>
                </Link>

                <div className="mx-auto w-fit">
                    <ProfileImage auth={auth} />
                </div>

                <GoalsTextInput
                    required
                    disabled
                    label="Username"
                    placeholder="Username"
                    data={formData.username ?? ""}
                    setData={(i) => setFormData("username", i)}
                    labelClassName="font-medium"
                />
                <GoalsTextInput
                    required
                    label="Name"
                    placeholder="Name"
                    data={formData.name ?? ""}
                    setData={(i) => setFormData("name", i)}
                    labelClassName="font-medium"
                />
                <GoalsTextInput
                    required
                    label="Phone Number"
                    placeholder="08XXXXXXXXXX"
                    data={formData.phone_number ?? ""}
                    setData={(i) => setFormData("phone_number", i)}
                    labelClassName="font-medium"
                />
                <GoalsTextInput
                    disabled
                    label="Email"
                    placeholder="Email"
                    data={formData.email ?? ""}
                    setData={(i) => setFormData("email", i)}
                    labelClassName="font-medium"
                />
                <label
                    htmlFor="university"
                    className="w-full grid items-center gap-[.4vw]"
                >
                    University
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
                        onBlur={() => setUniversity(formData.university)}
                        onChange={(e, value) => {
                            setFormData({
                                ...formData,
                                university: value
                            });
                        }}
                    />
                </label>
                {/* <GoalsTextInput
                    required
                    label="University"
                    placeholder="University"
                    data={formData.university ?? ""}
                    setData={(i) => setFormData("university", i)}
                    labelClassName="font-medium"
                /> */}
                <GoalsTextInput
                    required
                    label="Faculty"
                    placeholder="Faculty"
                    data={formData.faculty ?? ""}
                    setData={(i) => setFormData("faculty", i)}
                    labelClassName="font-medium"
                />
                <GoalsTextInput
                    required
                    label="Major"
                    placeholder="Major"
                    data={formData.major ?? ""}
                    setData={(i) => setFormData("major", i)}
                    labelClassName="font-medium"
                />
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
                        onBlur={() => setRumpun(formData.rumpun)}
                        onChange={(e, value) => {
                            setFormData({
                                ...formData,
                                rumpun: value
                            });
                        }}
                    />
                </label>
                <GoalsTextInput
                    label="Linkedin"
                    placeholder="Linkedin"
                    data={formData.linkedin_url ?? ""}
                    setData={(i) => setFormData("linkedin_url", i)}
                    labelClassName="font-medium"
                />

                <GoalsSelectMultipleInput
                    required
                    show={showForm.soft_skills}
                    setShow={(i) => {
                        if (
                            !(
                                formData.soft_skills.every(
                                    (i) =>
                                        temp.soft_skills.filter(
                                            (j) => j.id == i.id
                                        ).length
                                ) &&
                                temp.soft_skills.every(
                                    (i) =>
                                        formData.soft_skills.filter(
                                            (j) => j.id == i.id
                                        ).length
                                )
                            )
                        ) {
                            // reset temp by formData
                            setTemp("soft_skills", formData.soft_skills);
                        }
                        setShowForm({
                            ...showForm,
                            soft_skills: i,
                        });
                    }}
                    label="Soft Skills"
                    className="text-[.8vw]"
                    labelClassName="font-medium"
                    placeholderClassName="font-normal"
                    submitButtonClassName="text-[.8vw] w-[5vw]"
                    onSubmit={() => {
                        if (
                            !(
                                formData.soft_skills.length == 0 &&
                                temp.soft_skills.length == 0
                            ) &&
                            !(
                                formData.soft_skills.every(
                                    (i) =>
                                        temp.soft_skills.filter(
                                            (j) => j.id == i.id
                                        ).length
                                ) &&
                                temp.soft_skills.every(
                                    (i) =>
                                        formData.soft_skills.filter(
                                            (j) => j.id == i.id
                                        ).length
                                )
                            )
                        ) {
                            setFormData({
                                ...formData,
                                soft_skills: temp.soft_skills,
                                skills: temp.soft_skills
                                    .map((i) => i.id)
                                    .concat(
                                        formData.hard_skills.map((i) => i.id)
                                    ),
                            });
                        }
                    }}
                >
                    {skills.map(
                        (item, index) =>
                            item.category == "soft_skill" && (
                                <GoalsSelectMultipleInputItem
                                    key={index}
                                    checked={
                                        temp.soft_skills.filter(
                                            (i) => i.id == item.id
                                        ).length
                                    }
                                    onClick={() => {
                                        if (
                                            temp.soft_skills.filter(
                                                (i) => i.id == item.id
                                            ).length
                                        ) {
                                            setTemp(
                                                "soft_skills",
                                                temp.soft_skills.filter(
                                                    (i) => i.id != item.id
                                                )
                                            );
                                        } else {
                                            const tempChoice =
                                                temp.soft_skills.slice();
                                            tempChoice.push(item);
                                            setTemp("soft_skills", tempChoice);
                                        }
                                    }}
                                    // className="text-[.8vw]"
                                >
                                    {item.name}
                                </GoalsSelectMultipleInputItem>
                            )
                    )}
                </GoalsSelectMultipleInput>
                <GoalsSelectMultipleInput
                    show={showForm.hard_skills}
                    setShow={(i) => {
                        if (
                            !(
                                formData.hard_skills.every(
                                    (i) =>
                                        temp.hard_skills.filter(
                                            (j) => j.id == i.id
                                        ).length
                                ) &&
                                temp.hard_skills.every(
                                    (i) =>
                                        formData.hard_skills.filter(
                                            (j) => j.id == i.id
                                        ).length
                                )
                            )
                        ) {
                            // reset temp by formData
                            setTemp("hard_skills", formData.hard_skills);
                        }
                        setShowForm({
                            ...showForm,
                            hard_skills: i,
                        });
                    }}
                    label="Hard Skills"
                    className="text-[.8vw]"
                    labelClassName="font-medium"
                    placeholderClassName="font-normal"
                    submitButtonClassName="text-[.8vw] w-[5vw]"
                    onSubmit={() => {
                        if (
                            !(
                                formData.hard_skills.length == 0 &&
                                temp.hard_skills.length == 0
                            ) &&
                            !(
                                formData.hard_skills.every(
                                    (i) =>
                                        temp.hard_skills.filter(
                                            (j) => j.id == i.id
                                        ).length
                                ) &&
                                temp.hard_skills.every(
                                    (i) =>
                                        formData.hard_skills.filter(
                                            (j) => j.id == i.id
                                        ).length
                                )
                            )
                        ) {
                            setFormData({
                                ...formData,
                                hard_skills: temp.hard_skills,
                                skills: temp.hard_skills
                                    .map((i) => i.id)
                                    .concat(
                                        formData.soft_skills.map((i) => i.id)
                                    ),
                            });
                        }
                    }}
                >
                    {skills.map(
                        (item, index) =>
                            item.category == "hard_skill" && (
                                <GoalsSelectMultipleInputItem
                                    key={index}
                                    checked={
                                        temp.hard_skills.filter(
                                            (i) => i.id == item.id
                                        ).length
                                    }
                                    onClick={() => {
                                        if (
                                            temp.hard_skills.filter(
                                                (i) => i.id == item.id
                                            ).length
                                        ) {
                                            setTemp(
                                                "hard_skills",
                                                temp.hard_skills.filter(
                                                    (i) => i.id != item.id
                                                )
                                            );
                                        } else {
                                            const tempChoice =
                                                temp.hard_skills.slice();
                                            tempChoice.push(item);
                                            setTemp("hard_skills", tempChoice);
                                        }
                                    }}
                                    // className="text-[.8vw]"
                                >
                                    {item.name}
                                </GoalsSelectMultipleInputItem>
                            )
                    )}
                </GoalsSelectMultipleInput>
                <GoalsButton
                    variant="success"
                    className="w-full"
                    onClick={() => {
                        put(
                            route("tutor.setting.update", {
                                id: profile.id,
                            }),
                            {
                                onSuccess: () =>
                                    toast.success("Profile Updated!"),
                            }
                        );
                    }}
                >
                    Simpan
                </GoalsButton>
            </div>
        </DashboardLayout>
    );
}

const ProfileImage = ({ auth }) => {
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [profileImage, setProfileImage] = useState(
        auth.user.profile.profile_image
            ? `/storage/${auth.user.profile.profile_image}`
            : "https://mura.cfbf.com/sites/cfbv2/cache/file/B44C718C-17B1-475D-BBDFFD8C4906BAB4.png"
    );

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const submitHandler = (image) => {
        setIsLoading(true);
        router.post(
            "/profile_image",
            { image: image },
            {
                onFinish: () => {
                    setIsLoading(false);
                    toast.success("Profile Picture Updated!");
                },
            }
        );
    };

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

            <GoalsImageUploader
                show={showImageUploader}
                setShow={setShowImageUploader}
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                onSubmit={submitHandler}
            />
        </div>
    );
};
