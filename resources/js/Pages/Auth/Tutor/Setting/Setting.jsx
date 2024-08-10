import GoalsButton from "@/Components/GoalsButton";
import GoalsImageUploader from "@/Components/elements/GoalsImageUploader";
import {
    GoalsSelectMultipleInput,
    GoalsSelectMultipleInputItem,
} from "@/Components/elements/GoalsSelectMultipleInput";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import logo from "/resources/img/icon/goals-5.svg";
import { Autocomplete } from "@mui/material";
import { universities, majorFamilies } from "@/data";

export default function Setting({ auth, user, skills }) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        data: formData,
        setData: setFormData,
        put,
    } = useForm({
        id: user.id,
        name: user.name ?? "",
        username: user.username ?? "",
        phone_number: user.profile.phone_number ?? "",
        email: user.email ?? "",
        university: user.profile.university ?? "",
        faculty: user.profile.faculty ?? "",
        major: user.profile.major ?? "",
        rumpun: user.profile.rumpun ?? "",
        linkedin_url: user.profile.linkedin_url ? user.profile.linkedin_url : "",
        skills: user.skills.map((i) => i.id),
        soft_skills: user.skills.filter((i) => i.category == "soft_skill"),
        hard_skills: user.skills.filter((i) => i.category == "hard_skill"),
    });

    console.log(formData)

    const [university, setUniversity] = React.useState(formData.university);
    const [rumpun, setRumpun] = React.useState(formData.rumpun);

    const { data: temp, setData: setTemp } = useForm({
        skills: user.skills.map((i) => i.id),
        soft_skills: user.skills.filter((i) => i.category == "soft_skill"),
        hard_skills: user.skills.filter((i) => i.category == "hard_skill"),
    });

    const [showForm, setShowForm] = useState({
        soft_skills: false,
        hard_skills: false,
    });

    const handleClick = () => {
        put(
            route("tutor.setting.update", {
                id: user.id,
            }),
            {
                onFinish: () => toast.success("Profile Updated!"),
            }
        );
    };

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <DashboardLayout title="Setting" role="tutor" auth={auth}>
            {isLoading && <LoadingUI />}
            <div className="space-y-[1.6vw]">
                {!isMobile && (
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-[1.2vw]">
                            Update Profile
                        </p>
                        <div className="flex items-center gap-[.75vw]">
                            <GoalsButton
                                className="md:py-[0vw] md:px-[0vw] md:h-[2.8vw] md:w-[6.5vw] md:text-[1vw] md:rounded-[.5vw]"
                                activeClassName="bg-transparent border-2 border-green-500 text-green-500 hover:border-green-600"
                                onClick={() => history.back()}
                            >
                                Batal
                            </GoalsButton>
                            <GoalsButton
                                className="md:py-[0vw] md:px-[0vw] md:h-[2.8vw] md:w-[6.5vw] md:text-[1vw] md:rounded-[.5vw]"
                                activeClassName="bg-green-500 border-2 border-green-500 text-white hover:bg-green-600 hover:border-green-600"
                                onClick={handleClick}
                            >
                                Simpan
                            </GoalsButton>
                        </div>
                    </div>
                )}

                {/* Mobile View Below */}

                {isMobile ? (
                    <div className="space-y-[30vw]">
                        <div className="h-[44vw]">
                            <div className="absolute left-0 w-full">
                                <img
                                    src="/img/profile/bg-pengaturan.svg"
                                    alt="bg-pengaturan"
                                    className="object-cover w-full s-full"
                                />
                                <div className="absolute w-fit flex flex-col items-center mx-auto -bottom-[25vw] left-0 right-0 z-10 space-y-[3vw]">
                                    <img
                                        className="bg-white border-[.8vw] w-[30vw] h-[30vw] md:w-[5vw] md:h-[5vw] rounded-full shadow-centered-spread"
                                        src={
                                            auth.user.profile.profile_image
                                                ? `/storage/${auth.user.profile.profile_image}`
                                                : "https://mura.cfbf.com/sites/cfbv2/cache/file/B44C718C-17B1-475D-BBDFFD8C4906BAB4.png"
                                        }
                                        alt="User"
                                    />

                                    <div className="text-center space-y-[1vw] text-[3.2vw]">
                                        <p className="font-medium">
                                            {auth.user.username}
                                        </p>
                                        <p className="text-neutral-40">
                                            {auth.user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-neutral-20 font-medium space-y-[1.8vw] px-[4vw]">
                            <Link
                                href={route("tutor.profile")}
                                className="flex gap-[7vw] border py-[3.7vw] px-[7.4vw] rounded-[3.7vw]"
                            >
                                <i className="bi bi-pen"></i>
                                <span>Ubah Profil</span>
                            </Link>
                            <Link
                                href={route("tutor.password.update")}
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
                    /* Desktop View Below  */
                    <div className="hidden md:flex gap-[1.2vw]">
                        <div className="bg-white w-full rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
                            <div className="flex gap-[1.2vw]">
                                <ProfileImage
                                    auth={auth}
                                    setIsLoading={setIsLoading}
                                />
                                <div className="w-full space-y-[1.2vw]">
                                    <GoalsTextInput
                                        required
                                        disabled
                                        label="Username"
                                        placeholder="Username"
                                        data={formData.username ?? ""}
                                        setData={(i) =>
                                            setFormData("username", i)
                                        }
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
                                </div>
                            </div>
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
                            <div className="flex justify-end">
                                <GoalsButton href="/tutor/ubah-password" isLink className="rounded-[.5vw] w-1/2" activeClassName="bg-blue-500 hover:bg-blue-600 text-white">
                                    Ubah Password
                                </GoalsButton>
                            </div>
                        </div>
                        <div className="bg-white w-full rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
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
                            <div className="grid grid-cols-2 gap-[1.2vw]">
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
                            </div>
                            <GoalsTextInput
                                label="Linkedin"
                                placeholder="Linkedin"
                                data={formData.linkedin_url ?? ""}
                                setData={(i) => setFormData("linkedin_url", i)}
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
                            <div className="grid grid-cols-2 gap-[1.2vw]">
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
                                            setTemp(
                                                "soft_skills",
                                                formData.soft_skills
                                            );
                                        }
                                        setShowForm({
                                            ...showForm,
                                            soft_skills: i,
                                        });
                                    }}
                                    data={formData.soft_skills}
                                    label="Soft Skills"
                                    className="!text-[.83vw]"
                                    labelClassName="font-medium"
                                    placeholderClassName="font-normal"
                                    submitButtonClassName="text-[.8vw] w-[5vw]"
                                    onSubmit={() => {
                                        if (
                                            !(
                                                formData.soft_skills.length ==
                                                    0 &&
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
                                                        formData.hard_skills.map(
                                                            (i) => i.id
                                                        )
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
                                                            (i) =>
                                                                i.id == item.id
                                                        ).length
                                                    }
                                                    onClick={() => {
                                                        if (
                                                            temp.soft_skills.filter(
                                                                (i) =>
                                                                    i.id ==
                                                                    item.id
                                                            ).length
                                                        ) {
                                                            setTemp(
                                                                "soft_skills",
                                                                temp.soft_skills.filter(
                                                                    (i) =>
                                                                        i.id !=
                                                                        item.id
                                                                )
                                                            );
                                                        } else {
                                                            const tempChoice =
                                                                temp.soft_skills.slice();
                                                            tempChoice.push(
                                                                item
                                                            );
                                                            setTemp(
                                                                "soft_skills",
                                                                tempChoice
                                                            );
                                                        }
                                                    }}
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
                                            setTemp(
                                                "hard_skills",
                                                formData.hard_skills
                                            );
                                        }
                                        setShowForm({
                                            ...showForm,
                                            hard_skills: i,
                                        });
                                    }}
                                    data={formData.hard_skills}
                                    label="Hard Skills"
                                    className="!text-[.83vw]"
                                    labelClassName="font-medium"
                                    placeholderClassName="font-normal"
                                    submitButtonClassName="text-[.8vw] w-[5vw]"
                                    onSubmit={() => {
                                        if (
                                            !(
                                                formData.hard_skills.length ==
                                                    0 &&
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
                                                        formData.soft_skills.map(
                                                            (i) => i.id
                                                        )
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
                                                            (i) =>
                                                                i.id == item.id
                                                        ).length
                                                    }
                                                    onClick={() => {
                                                        if (
                                                            temp.hard_skills.filter(
                                                                (i) =>
                                                                    i.id ==
                                                                    item.id
                                                            ).length
                                                        ) {
                                                            setTemp(
                                                                "hard_skills",
                                                                temp.hard_skills.filter(
                                                                    (i) =>
                                                                        i.id !=
                                                                        item.id
                                                                )
                                                            );
                                                        } else {
                                                            const tempChoice =
                                                                temp.hard_skills.slice();
                                                            tempChoice.push(
                                                                item
                                                            );
                                                            setTemp(
                                                                "hard_skills",
                                                                tempChoice
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {item.name}
                                                </GoalsSelectMultipleInputItem>
                                            )
                                    )}
                                </GoalsSelectMultipleInput>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}



const ProfileImage = ({ auth, setIsLoading }) => {
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [profileImage, setProfileImage] = useState(
        auth.user.profile.profile_image
            ? `/storage/${auth.user.profile.profile_image}`
            : "https://mura.cfbf.com/sites/cfbv2/cache/file/B44C718C-17B1-475D-BBDFFD8C4906BAB4.png"
    );

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
        <div className="relative flex flex-shrink-0 flex-col gap-[.5vw] self-center h-fit">
            <p className="font-medium">Picture</p>
            <div className="flex items-center bg-bg-gray-500 md:w-[11vw] md:h-[9vw] rounded-[.5vw] cursor-pointer overflow-hidden">
                <img
                    className="w-full"
                    src={
                        profileImage
                            ? profileImage
                            : "https://mura.cfbf.com/sites/cfbv2/cache/file/B44C718C-17B1-475D-BBDFFD8C4906BAB4.png"
                    }
                    alt="User"
                    onClick={() => setShowImageUploader(true)}
                />
            </div>
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

function LoadingUI() {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-50">
            <img
                src={logo}
                alt="Goals Academy"
                className="w-[6vw] h-[6vw] animate-bounce"
            />
        </div>
    );
}
