import { useState } from "react";
import ButtonPill from "@/Components/ButtonPill";
import { FiX } from "react-icons/fi";
import GoalsTextInput from "@/Components/Form/GoalsTextInput";
import GoalsButton from "@/Components/GoalsButton";

export default function PromoForm({
    show,
    setShow,
    data,
    setData,
    temp,
    setTemp,
    promoHandler,
}) {
    const [isProcess, setIsProcess] = useState(false);
    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => {
                    if (!isProcess) {
                        if (data.promo != "") {
                            setTemp({ ...temp, promo: data.promo, discount: 0 });
                        }
                        setShow(false);
                    }
                }}
            ></div>
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed left-0 flex flex-col gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] h-[55vh] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[.5vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh]`}
            >
                <div>
                    <div className="flex justify-between items-center mb-[3vw] md:mb-[1vw]">
                        <h5 className="font-poppins font-semibold text-[4.5vw] md:text-[1.2vw]">
                            Pilih Promo
                        </h5>
                        <FiX
                            className="text-[6vw] md:text-[1.8vw] cursor-pointer"
                            onClick={() => {
                                if (data.promo != "") {
                                    setTemp({
                                        ...temp,
                                        promo: data.promo,
                                        discount: 0,
                                    });
                                }
                                setShow(false);
                            }}
                        />
                    </div>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (temp.promo != "") {
                            promoHandler(
                                temp.promo,
                                () => setShow(false),
                                setIsProcess
                            );
                        }
                    }}
                    className="relative flex flex-wrap md:flex-nowrap gap-[.5vw] w-full"
                >
                    <div className="w-full md:w-full">
                        <GoalsTextInput
                            type="text"
                            className="md:text-[.9vw]"
                            placeholder="Masukkan kode promo"
                            value={temp.promo}
                            cancelButton={temp.promo != ""}
                            data={temp.promo}
                            setData={i => setTemp("promo", i)}
                            onChange={(e) => {
                                setTemp("promo", e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" disabled={temp.promo == ""} className={`block w-full h-full md:w-4/12 ${temp.promo != "" ? "" : "md:hidden"}`}>
                        <GoalsButton
                            className="rounded-[.5vw] md:py-[.92vw] md:text-[.9vw]"
                            isActive={temp.promo != ""}
                            isLoading={isProcess}
                        >
                            Terapkan
                        </GoalsButton>
                    </button>
                </form>
            </div>
        </>
    );
}
