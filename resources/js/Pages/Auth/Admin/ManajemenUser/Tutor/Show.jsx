import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { GoalsSelectMultipleInput, GoalsSelectMultipleInputItem } from "@/Components/elements/GoalsSelectMultipleInput";
import GoalsImageUploader from "@/Components/elements/GoalsImageUploader";
import Breadcrumb from "../../components/Breadcrumb";
import FormSection from "../../components/layouts/FormSection";
import { GoalsSelectInput, GoalsSelectInputItem } from "@/Components/elements/GoalsSelectInput";

export default function Show ({ auth, data }) {  
    const {data: formData, setData: setFormData, post} = useForm({
        name: data.name,
        username: data.username,
        phone_number: data.profile.phone_number,
        email: data.email,
        university: data.profile.university,
        faculty: data.profile.faculty,
        major: data.profile.major,
        linkedin: data.profile.linkedin_url,
        soft_skills: data.skills.filter((item) => item.category == 'soft_skill'),
        hard_skills: data.skills.filter((item) => item.category == 'hard_skill'),
        revenue_type: "",
    });

    const {data: temp, setData: setTemp} = useForm({
        name: "",
        username: "",
        phone_number: "",
        email: "",
        university: "",
        major: "",
        linkedin: "",
        soft_skills: data.skills.filter((item) => item.category == 'soft_skill'),
        hard_skills: data.skills.filter((item) => item.category == 'hard_skill'),
    });

    const [showForm, setShowForm] = useState({
        soft_skills: false,
        hard_skills: false,
        revenue_type: false,
    })

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Product"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <Breadcrumb level={2} />

                <div className="flex gap-[1.2vw]">
                    <FormSection>
                        <div className="flex gap-[1.2vw]">
                            <ProfileImage auth={data} />
                            <div className="w-full space-y-[1.2vw]">
                                <GoalsTextInput
                                    disabled
                                    required
                                    label="Username"
                                    placeholder="Username"
                                    data={formData.username}
                                    setData={(i) => setFormData('username', i)}
                                    labelClassName="font-medium"
                                />
                                <GoalsTextInput
                                    disabled
                                    required
                                    label="Name"
                                    placeholder="Name"
                                    data={formData.name}
                                    setData={(i) => setFormData('name', i)}
                                    labelClassName="font-medium"
                                />
                            </div>
                        </div>
                        <GoalsTextInput
                            disabled
                            required
                            label="Phone Number"
                            placeholder="Phone Number"
                            data={formData.phone_number}
                            setData={(i) => setFormData('phone_number', i)}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            disabled
                            label="Email"
                            placeholder="Email"
                            data={formData.email}
                            setData={(i) => setFormData('email', i)}
                            labelClassName="font-medium"
                        />
                    </FormSection>
                    <FormSection>
                        <GoalsTextInput
                            disabled
                            required
                            label="University"
                            placeholder="University"
                            data={formData.university}
                            setData={(i) => setFormData('university', i)}
                            labelClassName="font-medium"
                        />
                        <div className="grid grid-cols-2 gap-[1.2vw]">
                            <GoalsTextInput
                                required
                                disabled
                                label="Faculty"
                                placeholder="Faculty"
                                data={formData.faculty ?? ""}
                                setData={(i) => setFormData("faculty", i)}
                                labelClassName="font-medium"
                            />
                            <GoalsTextInput
                                required
                                disabled
                                label="Major"
                                placeholder="Major"
                                data={formData.major ?? ""}
                                setData={(i) => setFormData("major", i)}
                                labelClassName="font-medium"
                            />
                        </div>
                        <GoalsTextInput
                            disabled
                            label="Linkedin"
                            placeholder="Linkedin"
                            data={formData.linkedin}
                            setData={(i) => setFormData('linkedin', i)}
                            labelClassName="font-medium"
                        />
                        <GoalsTextInput
                            required
                            disabled
                            label="Revenue Type"
                            placeholder="Revenue Type"
                            data={formData.revenue_type?.name}
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
                                        setTemp("soft_skills", formData.soft_skills);
                                    }
                                    setShowForm({...showForm, soft_skills: i})
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
                                        setFormData("soft_skills", temp.soft_skills);
                                    }
                                }}
                            >
                                {data.skills.map((item, index) =>
                                    (item.category == 'soft_skill') &&
                                    <GoalsSelectMultipleInputItem
                                        key={index}
                                        checked={
                                            temp.soft_skills.filter(
                                                (i) => i.id == item.id
                                            ).length
                                        }
                                        onClick={() => false}
                                        // className="text-[.8vw]"
                                    >
                                        {item.name}
                                    </GoalsSelectMultipleInputItem>
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
                                    setShowForm({...showForm, hard_skills: i})
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
                                        setFormData("hard_skills", temp.hard_skills);
                                    }
                                }}
                            >
                                {data.skills.map((item, index) =>
                                    (item.category == 'hard_skill') &&
                                    <GoalsSelectMultipleInputItem
                                        key={index}
                                        checked={
                                            temp.hard_skills.filter(
                                                (i) => i.id == item.id
                                            ).length
                                        }
                                        onClick={() => false}
                                        // className="text-[.8vw]"
                                    >
                                        {item.name}
                                    </GoalsSelectMultipleInputItem>
                                )}
                            </GoalsSelectMultipleInput>
                        </div>
                    </FormSection>
                </div>
            </div>
        </DashboardLayout>
    );
};

const ProfileImage = ({ auth }) => {
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [profileImage, setProfileImage] = useState(
        auth.profile.profile_image
            ? `/storage/${auth.profile.profile_image}`
            : 'https://mura.cfbf.com/sites/cfbv2/cache/file/B44C718C-17B1-475D-BBDFFD8C4906BAB4.png'
    );

    return (
        <div className="relative flex flex-shrink-0 flex-col gap-[.5vw] self-center h-fit">
            <p className="font-medium">Picture</p>
            <div className="flex items-center bg-dark-indigo md:w-[11vw] md:h-[9vw] rounded-[.5vw] cursor-pointer overflow-hidden">
                <img
                    className="w-full"
                    src={profileImage ? profileImage : 'https://mura.cfbf.com/sites/cfbv2/cache/file/B44C718C-17B1-475D-BBDFFD8C4906BAB4.png'}
                    alt="User"
                    onClick={() => true}
                />
            </div>
            <GoalsImageUploader
                show={showImageUploader}
                setShow={setShowImageUploader}
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                onSubmit={(i) => console.log(i)}
            />
        </div>
    );
};
