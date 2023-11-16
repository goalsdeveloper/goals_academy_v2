import PengaturanLayout from "@/Layouts/PengaturanLayout";
import { useForm } from "@inertiajs/react";
import "@/script/momentCustomLocale";

export default function Index ({ auth }) {
    const { data, setData, post } = useForm({
        username: auth.user.username,
        name: auth.user.name,
        phone_number: "",
        university: "",
        faculty: "",
        major: "",
        referral: "",
    });

    const submit = (e) => {
        e.preventDefault()
        console.log(data)
    }

    return (
        <PengaturanLayout auth={auth} title="Ubah Profil">
            <form onSubmit={submit} className="md:min-h-[22vw] flex flex-col gap-[6vw] md:gap-[2vw]">
                <Input
                    value={data.username}
                    onChange={(e) =>
                        setData("username", e.target.value)
                    }
                    type="text"
                    id="username"
                    label="Username"
                />
                <Input
                    value={data.name}
                    onChange={(e) =>
                        setData("name", e.target.value)
                    }
                    type="text"
                    id="name"
                    label="Nama Lengkap"
                />
                <Input
                    value={data.phone_number}
                    onChange={(e) =>
                        setData("phone_number", e.target.value)
                    }
                    type="text"
                    id="phone_number"
                    label="Nomor Telepon"
                />
                <Input
                    value={data.university}
                    onChange={(e) =>
                        setData("university", e.target.value)
                    }
                    type="text"
                    id="university"
                    label="Universitas"
                />
                <Input
                    value={data.faculty}
                    onChange={(e) =>
                        setData("faculty", e.target.value)
                    }
                    type="text"
                    id="faculty"
                    label="Fakultas"
                />
                <Input
                    value={data.major}
                    onChange={(e) =>
                        setData("major", e.target.value)
                    }
                    type="text"
                    id="major"
                    label="Jurusan"
                />
                <Input
                    value={data.referral}
                    onChange={(e) =>
                        setData("referral", e.target.value)
                    }
                    type="text"
                    id="referral"
                    label="Kode Referral"
                />
                <button
                    type="submit"
                    className="w-4/12 md:w-2/12 mx-auto md:ms-auto md:me-0 border-1 xl:border-2 border-light-grey text-light-grey hover:text-white hover:bg-secondary hover:border-secondary font-poppins font-medium rounded-full md:rounded-[.5vw] p-[2vw] md:p-[.75vw]"
                >
                    Simpan
                </button>
            </form>
        </PengaturanLayout>
    )
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
