import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import toast from "react-hot-toast";
import { FiChevronLeft } from "react-icons/fi";

export default function UbahPassword({ auth }) {
    const { data, setData, put } = useForm({
        old_password: "",
        new_password: "",
        validation_password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("tutor.password.update.store"), {
            onSuccess: () => {
                toast.success("Password berhasil diubah");
            },
        });
    };

    return (
        <DashboardLayout title="Setting" role="tutor" auth={auth}>
            <div className="w-full md:border border-neutral-20 rounded-[.8vw] px-[4vw] py-[1.6vw] space-y-[3.7vw]">
                <Link
                    href={route("tutor.setting.index")}
                    className="flex items-center gap-[1.5vw] text-black"
                >
                    <FiChevronLeft className="md:hidden text-[4vw]" />
                    <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                        Ubah Password
                    </h1>
                </Link>

                <form
                    onSubmit={submit}
                    className="md:min-h-[22vw] flex flex-col gap-[1.8vw] md:gap-[1.2vw]"
                >
                    <GoalsTextInput
                        required
                        value={data.old_password}
                        onChange={(e) =>
                            setData("old_password", e.target.value)
                        }
                        placeholder="Masukkan Password Lama"
                        type="password"
                        id="old_password"
                        label="Password Lama"
                    />
                    <GoalsTextInput
                        required
                        value={data.new_password}
                        onChange={(e) =>
                            setData("new_password", e.target.value)
                        }
                        placeholder="Masukkan Password Baru"
                        type="password"
                        id="new_password"
                        label="Password Baru"
                    />
                    <GoalsTextInput
                        required
                        value={data.validation_password}
                        onChange={(e) =>
                            setData("validation_password", e.target.value)
                        }
                        placeholder="Masukkan Ulang Password Baru"
                        type="password"
                        id="validation_password"
                        label="Ulangi Password Baru"
                    />
                    <GoalsButton type="submit" className="mt-2">Simpan</GoalsButton>
                </form>
            </div>
        </DashboardLayout>
    );
}
