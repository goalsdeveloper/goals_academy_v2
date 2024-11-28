import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import welcomeImage from "/resources/img/home/welcome-image.svg";
import { toSlug } from "@/script/utils";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

export default function WelcomeDialog({ showDialog, setShowDialog, auth }) {
    return (
        <div>
            {createPortal(
                <>
                    <div
                        className={`${
                            showDialog ? "" : "hidden"
                        } fixed top-0 bottom-0 left-0 right-0 w-full h-screen overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-[100]`}
                        onClick={() => setShowDialog(false)}
                    />
                    <div
                        className={`${
                            showDialog
                                ? "bottom-0 md:scale-100"
                                : "md:top-full -bottom-full md:scale-0"
                        } fixed inset-x-0 top-10 bottom-0 md:inset-0 mx-auto flex flex-col gap-[2vw] transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-[100]
                         !w-[80%] md:!w-[38.75vw] h-fit !rounded-[1vw] md:!mr-5 md:!mt-auto md:!mb-5`}
                    >
                        <div className="flex w-full justify-end">
                            <IoClose
                                className=" cursor-pointer text-neutral-40"
                                onClick={() => {
                                    setShowDialog(false);
                                }}
                            />
                        </div>
                        <img
                            src={welcomeImage}
                            alt=""
                            className=" self-center"
                        />
                        <h3 className=" text-center">
                            Hai{" "}
                            <span className="capitalize">
                                {auth.user?.name}
                            </span>
                            , selamat datang di
                            <span className="text-primary"> Goals Academy</span>
                            !
                        </h3>
                        <p className=" text-center">
                            Selamat datang di tempat yang tepat! 🎉 Dapatkan
                            pengajaran dari tutor yang solutif dan friendly
                            kapan pun dan dimana pun kalian berada. Yuk, cek
                            program bimbingannya, pilih yang pas buat kamu, dan
                            mulai bimbingan sekarang! 💡📚
                        </p>

                        <GoalsButton
                            className="self-center md:max-w-[12.6vw]"
                            isLink
                            href={route("produk.index")}
                        >
                            Mulai Bimbingan
                        </GoalsButton>
                    </div>
                </>,
                document.body
            )}
        </div>
    );
}
