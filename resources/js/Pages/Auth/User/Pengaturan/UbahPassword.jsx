import PengaturanLayout from "@/Layouts/PengaturanLayout";
import { useForm } from "@inertiajs/react";
import "@/script/momentCustomLocale";

export default function Index({ auth }) {
    const { data, setData, post } = useForm({
        old_password: "",
        new_password: "",
        validation_password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/pengaturan/ubah_password");
    };

    return (
        <PengaturanLayout auth={auth} title="Ubah Password">
            <form
                onSubmit={submit}
                className="md:min-h-[22vw] flex flex-col gap-[6vw] md:gap-[2vw]"
            >
                <Input
                    value={data.old_password}
                    onChange={(e) => setData("old_password", e.target.value)}
                    type="old_password"
                    id="old_password"
                    label="Password Lama"
                />
                <Input
                    value={data.new_password}
                    onChange={(e) => setData("new_password", e.target.value)}
                    type="password"
                    id="new_password"
                    label="Password Baru"
                />
                <Input
                    value={data.validation_password}
                    onChange={(e) =>
                        setData("validation_password", e.target.value)
                    }
                    type="password"
                    id="validation_password"
                    label="Ulangi Password Baru"
                />
                <button
                    type="submit"
                    className="w-4/12 md:w-2/12 mx-auto md:ms-auto md:me-0 border-1 xl:border-2 border-light-grey text-light-grey hover:text-white hover:bg-secondary hover:border-secondary font-poppins font-medium rounded-full md:rounded-[.5vw] p-[2vw] md:p-[.75vw]"
                >
                    Simpan
                </button>
            </form>
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
