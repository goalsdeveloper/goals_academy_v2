import DashboardLayout from "@/Layouts/DashboardLayout";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import GoalsButton from "@/Components/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import {
    GoalsSelectMultipleInput,
    GoalsSelectMultipleInputItem,
} from "@/Components/elements/GoalsSelectMultipleInput";
import GoalsImageUploader from "@/Components/elements/GoalsImageUploader";
import logo from "/resources/img/icon/goals-5.svg";
import toast, { Toaster } from "react-hot-toast";

export default function Setting({ auth, user, skills }) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        data: formData,
        setData: setFormData,
        put,
    } = useForm({
        id: user.id,
        name: user.name,
        username: user.username,
        phone_number: user.profile.phone_number,
        email: user.email,
        university: user.profile.university,
        faculty: user.profile.faculty,
        major: user.profile.major,
        linkedin_url: user.profile.linkedin_url,
        skills: user.skills.map(i => i.id),
        soft_skills: user.skills.filter((i) => i.category == 'soft_skill'),
        hard_skills: user.skills.filter((i) => i.category == 'hard_skill'),
    });

    const { data: temp, setData: setTemp } = useForm({
        skills: user.skills.map(i => i.id),
        soft_skills: user.skills.filter((i) => i.category == 'soft_skill'),
        hard_skills: user.skills.filter((i) => i.category == 'hard_skill'),
    });

    const [showForm, setShowForm] = useState({
        soft_skills: false,
        hard_skills: false,
    });

    const handleClick = () => {
        put(
            route("moderator.setting.update", {
                id: user.id,
            }),
            {
                onFinish: () => toast.success("Profile Updated!")
            }
        );
    };

    return (
        <DashboardLayout
            title="Setting"
            role="moderator"
            auth={auth}
        >
            {isLoading && <LoadingUI />}
            <Toaster />
            <div className="space-y-[1.6vw]">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-[1.2vw]">Update Profile</p>
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

                <div className="flex gap-[1.2vw]">
                    <div className="bg-white w-full rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
                        <div className="flex gap-[1.2vw]">
                            <ProfileImage auth={auth} setIsLoading={setIsLoading} />
                            <div className="w-full space-y-[1.2vw]">
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
                    </div>
                    <div className="bg-white w-full rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
                        <GoalsTextInput
                            required
                            label="University"
                            placeholder="University"
                            data={formData.university ?? ""}
                            setData={(i) => setFormData("university", i)}
                            labelClassName="font-medium"
                        />
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
                                            skills: temp.soft_skills.map(i => i.id).concat(formData.hard_skills.map(i => i.id))
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
                                                            (i) =>
                                                                i.id == item.id
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
                                                        tempChoice.push(item);
                                                        setTemp(
                                                            "soft_skills",
                                                            tempChoice
                                                        );
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
                                            skills: temp.hard_skills.map(i => i.id).concat(formData.soft_skills.map(i => i.id)),
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
                                                            (i) =>
                                                                i.id == item.id
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
                                                        tempChoice.push(item);
                                                        setTemp(
                                                            "hard_skills",
                                                            tempChoice
                                                        );
                                                    }
                                                }}
                                                // className="text-[.8vw]"
                                            >
                                                {item.name}
                                            </GoalsSelectMultipleInputItem>
                                        )
                                )}
                            </GoalsSelectMultipleInput>
                        </div>
                    </div>
                </div>
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
        router.post("/profile_image", { image: image }, {
            onFinish: () => {
                setIsLoading(false);
                toast.success("Profile Picture Updated!");
            }
        });
    }

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
        <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-gray-50 bg-opacity-50 z-50">
            <img
                src={logo}
                alt="Goals Academy"
                className="w-[6vw] h-[6vw] animate-bounce"
            />
        </div>
    );
}
