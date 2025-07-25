import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import {
    GoalsSelectMultipleInput,
    GoalsSelectMultipleInputItem,
} from "@/Components/elements/GoalsSelectMultipleInput";
import GoalsImageUploader from "@/Components/elements/GoalsImageUploader";
import Breadcrumb from "../../components/Breadcrumb";
import FormSection from "../../components/layouts/FormSection";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import logo from "/resources/img/icon/goals-5.svg";
import toast, { Toaster } from "react-hot-toast";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";

export default function Update({ auth, data }) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        data: formData,
        setData: setFormData,
        put,
    } = useForm({
        // _method: "patch",
        id: data.tutor.id,
        name: data.tutor.name ? data.tutor.name : "",
        username: data.tutor.username ? data.tutor.username : "",
        phone_number: data.tutor.profile.phone_number
            ? data.tutor.profile.phone_number
            : "",
        email: data.tutor.email ? data.tutor.email : "",
        university: data.tutor.profile.university
            ? data.tutor.profile.university
            : "",
        faculty: data.tutor.profile.faculty ? data.tutor.profile.faculty : "",
        major: data.tutor.profile.major ? data.tutor.profile.major : "",
        linkedin_url: data.tutor.profile.linkedin_url
            ? data.tutor.profile.linkedin_url
            : "",
        skills: data.tutor.skills.map((i) => i.id),
        soft_skills: data.tutor.skills.filter(
            (i) => i.category == "soft_skill"
        ),
        hard_skills: data.tutor.skills.filter(
            (i) => i.category == "hard_skill"
        ),
        revenue_type_id: data.tutor.revenue_type?.id,
        revenue_type_type: data.tutor.revenue_type?.type,
    });

    const { data: temp, setData: setTemp } = useForm({
        name: "",
        username: "",
        phone_number: "",
        email: "",
        university: "",
        faculty: "",
        major: "",
        linkedin_url: "",
        revenue_type_id: "",
        skills: data.tutor.skills.map((i) => i.id),
        soft_skills: data.tutor.skills.filter(
            (i) => i.category == "soft_skill"
        ),
        hard_skills: data.tutor.skills.filter(
            (i) => i.category == "hard_skill"
        ),
    });

    const [showForm, setShowForm] = useState({
        soft_skills: false,
        hard_skills: false,
        revenue_type: false,
    });

    const handleClick = () => {
        put(
            route("admin.manajemen_user.tutor.update", {
                id: data.tutor.id,
            }),
            {
                onFinish: () => toast.success("Profile Updated!"),
            }
        );
    };

    return (
        <DashboardLayout
            title="Manajemen User"
            subtitle="Tutor"
            role="admin"
            auth={auth}
        >
            {isLoading && <LoadingUI />}
            <div className="space-y-[1.6vw]">
                <div className="flex justify-between">
                    <Breadcrumb level={3} except={1} />

                    <div className="flex items-center gap-[.8vw]">
                        <GoalsButton
                            className="md:py-[0vw] md:px-[0vw] md:h-[2.8vw] md:w-[6.5vw] md:text-[1vw] md:rounded-[.5vw]"
                            activeClassName="bg-transparent border-2 border-green-500 text-green-500 hover:border-green-600"
                            variant="success-bordered"
                            onClick={() => history.back()}
                        >
                            Batal
                        </GoalsButton>
                        <GoalsButton
                            className="md:!py-[0vw] md:!px-[0vw] md:h-[2.8vw] md:w-[6.5vw] md:text-[1vw] md:rounded-[.5vw]"
                            activeClassName="bg-green-500 border-2 border-green-500 text-white hover:bg-green-600 hover:border-green-600"
                            onClick={handleClick}
                            variant="success"
                            disabled={
                                !formData.username ||
                                !formData.name ||
                                !formData.phone_number ||
                                !formData.university ||
                                !formData.faculty ||
                                !formData.major ||
                                !formData.soft_skills
                            }
                        >
                            Simpan
                        </GoalsButton>
                    </div>
                </div>

                <div className="flex gap-[1.2vw]">
                    <FormSection>
                        <div className="flex gap-[1.2vw]">
                            <ProfileImage auth={data.tutor} />
                            <div className="w-full space-y-[1.2vw]">
                                <GoalsTextInput
                                    required
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
                            type="number"
                            label="Phone Number"
                            placeholder="Phone Number"
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
                    </FormSection>
                    <FormSection>
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
                        <GoalsSelectInput
                            required
                            show={showForm.revenue_type}
                            setShow={(i) =>
                                setShowForm({ ...showForm, revenue_type: i })
                            }
                            data={
                                formData.revenue_type_type
                                    ? formData.revenue_type_type + "%"
                                    : ""
                            }
                            label="Revenue Type"
                            placeholderClassName="font-normal"
                        >
                            {data.revenue_types.map((item, index) => (
                                <GoalsSelectInputItem
                                    key={index}
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            revenue_type_id: item.id,
                                            revenue_type_type: item.type,
                                        })
                                    }
                                >
                                    {item.type}%
                                </GoalsSelectInputItem>
                            ))}
                        </GoalsSelectInput>
                        <div className="grid grid-cols-2 gap-[1.2vw]">
                            <GoalsSelectMultipleInput
                                required
                                data={formData.soft_skills}
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
                                placeholderClassName="font-normal text-[.8vw]"
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
                                                    formData.hard_skills.map(
                                                        (i) => i.id
                                                    )
                                                ),
                                        });
                                    }
                                }}
                            >
                                {data.skill.map(
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
                                data={formData.hard_skills}
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
                                placeholderClassName="font-normal text-[.8vw]"
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
                                                    formData.soft_skills.map(
                                                        (i) => i.id
                                                    )
                                                ),
                                        });
                                    }
                                }}
                            >
                                {data.skill.map(
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
                    </FormSection>
                </div>
            </div>
        </DashboardLayout>
    );
}

const ProfileImage = ({ auth, setIsLoading }) => {
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [profileImage, setProfileImage] = useState(
        auth.profile.profile_image
            ? `/storage/${auth.profile.profile_image}`
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
            <div className="flex items-center bg-gray-500 md:w-[11vw] md:h-[9vw] rounded-[.5vw] cursor-pointer overflow-hidden">
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
