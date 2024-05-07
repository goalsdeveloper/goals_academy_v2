import DashboardLayout from "@/Layouts/DashboardLayout";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import {
    GoalsSelectMultipleInput,
    GoalsSelectMultipleInputItem,
} from "@/Components/elements/GoalsSelectMultipleInput";
import GoalsImageUploader from "@/Components/elements/GoalsImageUploader";

export default function Setting({ auth, user, skills }) {
    console.log(user);

    const {
        data: formData,
        setData: setFormData,
        put,
    } = useForm({
        // _method: "patch",
        id: "",
        name: "",
        username: "",
        phone_number: "",
        email: "",
        university: "",
        major: "",
        linkedin: "",
        soft_skills: [],
        hard_skills: [],
    });

    const { data: temp, setData: setTemp } = useForm({
        name: "",
        username: "",
        phone_number: "",
        email: "",
        university: "",
        major: "",
        linkedin: "",
        soft_skills: [],
        hard_skills: [],
    });

    const [showForm, setShowForm] = useState({
        soft_skills: false,
        hard_skills: false,
    });
   const handleClick = () => {
       const combinedSkills = [...temp.soft_skills, ...temp.hard_skills];
       const skillIds = combinedSkills.map((skill) => skill.id);

       console.log({ ...formData, "skills": skillIds });
       console.log(skillIds);
       put(
           route("admin.manajemen_user.tutor.update", {
               id: user.id,
           }),
           { ...formData, skills: skillIds }
       );
   };


    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Product"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <div className="flex justify-between">

                    <div className="space-x-[.8vw]">
                        <GoalsButton
                            className="md:py-[0vw] md:px-[0vw] md:h-[2.8vw] md:w-[6.5vw] md:text-[.75vw] md:rounded-[.5vw]"
                            variant="success-bordered"
                        >
                            Batal
                        </GoalsButton>
                        <GoalsButton
                            className="md:py-[0vw] md:px-[0vw] md:h-[2.8vw] md:w-[6.5vw] md:text-[.75vw] md:rounded-[.5vw]"
                            variant="success"
                            onClick={handleClick}
                        >
                            Simpan
                        </GoalsButton>
                    </div>
                </div>

                <div className="flex gap-[1.2vw]">
                    <div>
                        <div className="flex gap-[1.2vw]">
                            <ProfileImage auth={auth} />
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
                    </div>
                    <div>
                        <GoalsTextInput
                            required
                            label="University"
                            placeholder="University"
                            data={formData.university ?? ""}
                            setData={(i) => setFormData("university", i)}
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
                        <GoalsTextInput
                            label="Linkedin"
                            placeholder="Linkedin"
                            data={formData.linkedin ?? ""}
                            setData={(i) => setFormData("linkedin", i)}
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
                                        setFormData(
                                            "soft_skills",
                                            temp.soft_skills
                                        );
                                    }
                                }}
                            >
                                {user.skills.map(
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
                                        setFormData(
                                            "hard_skills",
                                            temp.hard_skills
                                        );
                                    }
                                }}
                            >
                                {user.skills.map(
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

const ProfileImage = ({ auth }) => {
    const [showImageUploader, setShowImageUploader] = useState(false);
    const [profileImage, setProfileImage] = useState(
        auth.user.profile.profile_image
            ? `/storage/${auth.user.profile.profile_image}`
            : "https://mura.cfbf.com/sites/cfbv2/cache/file/B44C718C-17B1-475D-BBDFFD8C4906BAB4.png"
    );

    return (
        <div className="relative flex flex-shrink-0 flex-col gap-[.5vw] self-center h-fit">
            <p className="font-medium">Picture</p>
            <div className="flex items-center bg-red-500 md:w-[11vw] md:h-[9vw] rounded-[.5vw] cursor-pointer overflow-hidden">
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
                onSubmit={(i) => console.log(i)}
            />
        </div>
    );
};
