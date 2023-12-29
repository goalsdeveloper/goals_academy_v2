import { useState } from "react";
import ButtonPill from "@/Components/ButtonPill";

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
                    if (data.promo != "") {
                        setTemp({ ...temp, promo: data.promo, discount: 0 });
                    }
                    setShow(false);
                }}
            ></div>
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed left-0 flex flex-col gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] h-[50vh] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh]`}
            >
                <div>
                    <div className="flex justify-between items-center mb-[3vw] md:mb-[1vw]">
                        <h5 className="text-secondary font-poppins font-bold text-[4.5vw] md:text-[1.2vw]">
                            Pilih Promo
                        </h5>
                        <i
                            role="button"
                            className="fa-solid fa-times text-[5vw] md:text-[1.5vw]"
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
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
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
                    className="relative"
                >
                    <input
                        className="w-full flex justify-between items-center px-[3vw] md:px-[1vw] shadow-centered-spread rounded-sm border-2 focus:outline-0 text-dark h-[9vw] md:h-[2.5vw]"
                        value={temp.promo}
                        onChange={(e) => {
                            setTemp("promo", e.target.value);
                        }}
                        placeholder="Masukkan kode promo disini"
                    />
                    <div
                        className={`absolute h-full top-0 right-0 flex items-center px-[3vw] md:px-[1vw] ${
                            isProcess ? "" : "hidden"
                        }`}
                    >
                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                    </div>
                </form>
                <div className="flex justify-center md:justify-end mt-[.75vw]">
                    <ButtonPill
                        className="w-6/12 md:w-3/12"
                        isActive={temp.promo != ""}
                        onClick={() => {
                            if (temp.promo != "") {
                                promoHandler(
                                    temp.promo,
                                    () => setShow(false),
                                    setIsProcess
                                );
                            }
                        }}
                    >
                        Pakai
                    </ButtonPill>
                </div>
            </div>
        </>
    );
}
