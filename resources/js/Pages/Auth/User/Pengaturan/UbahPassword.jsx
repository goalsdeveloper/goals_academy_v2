import PengaturanLayout from "@/Layouts/PengaturanLayout";
import { Link, useForm } from "@inertiajs/react";
import "@/script/momentCustomLocale";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import GoalsButton from "@/Components/elements/GoalsButton";
import { useMediaQuery } from "react-responsive";
import { FiChevronLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Index({ auth }) {
    const { data, setData, post } = useForm({
        old_password: "",
        new_password: "",
        validation_password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/pengaturan/ubah_password", {
            onSuccess: () => {
                toast.success("Password berhasil diubah");
            },
        });
    };

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <PengaturanLayout auth={auth} title="Ubah Password">
            <div className="w-full md:border border-neutral-20 rounded-[.8vw] p-[1.6vw] space-y-[3.7vw]">
                {isMobile ? (
                    <Link
                        href="/pengaturan"
                        className="flex items-center gap-[1.5vw] text-black"
                    >
                        <FiChevronLeft className="md:hidden text-[4vw]" />
                        <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                            Ubah Password
                        </h1>
                    </Link>
                ) : (
                    <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw] text-center">
                        Ubah Password
                    </h1>
                )}

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
                    <GoalsButton
                        type="submit"
                        className="md:self-end mt-[1.8vw] md:mt-0"
                    >
                        Simpan
                    </GoalsButton>
                </form>
            </div>
        </PengaturanLayout>
    );
}