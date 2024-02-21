import GoalsTextInput from "@/Components/Form/GoalsTextInput";
import ButtonPill from "@/Components/GoalsButton";
import { useForm } from "@inertiajs/react";
import { FiX } from "react-icons/fi";

const LengkapiProfilForm = ({ show, setShow }) => {
    const { data, setData, post } = useForm({
        nomor_telepon: "",
        universitas: "",
        fakultas: "",
        jurusan: "",
    });

    return (
        <div>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => setShow(false)}
            ></div>
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed left-0 flex flex-col gap-[2vw] w-full md:w-[30vw] h-[50vh] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh]`}
            >
                <div className="flex justify-between">
                    <p className="text-[1.2vw] font-semibold">Data Diri</p>
                    <button onClick={() => setShow(!show)}>
                        <FiX className="text-[1.8vw]" />
                    </button>
                </div>
                <form
                    className="space-y-[2vw]"
                    onSubmit={(e) => {
                        e.preventDefault();
                        post("/produk");
                    }}
                >
                    <div className="space-y-[.8vw]">
                        <GoalsTextInput
                            type="number"
                            label="Nomor Telepon"
                            placeholder="Masukkan nomor telepon disini"
                            value={data.nomor_telepon}
                            onChange={(e) =>
                                setData("nomor_telepon", e.target.value)
                            }
                        />
                        <GoalsTextInput
                            type="text"
                            label="Universitas"
                            placeholder="Masukkan universitas disini"
                            value={data.universitas}
                            onChange={(e) =>
                                setData("universitas", e.target.value)
                            }
                        />
                        <GoalsTextInput
                            type="text"
                            label="Fakultas"
                            placeholder="Masukkan fakultas disini"
                            value={data.fakultas}
                            onChange={(e) =>
                                setData("fakultas", e.target.value)
                            }
                        />
                        <GoalsTextInput
                            type="text"
                            label="Jurusan"
                            placeholder="Masukkan jurusan disini"
                            value={data.jurusan}
                            onChange={(e) => setData("jurusan", e.target.value)}
                        />
                    </div>

                    <button className="w-full rounded-md h-[2.8vw] flex items-center justify-center bg-primary-40 hover:bg-primary text-white" type="submit">
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LengkapiProfilForm;
