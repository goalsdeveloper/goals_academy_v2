import { createPortal } from "react-dom";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";

const Show = ({
    show,
    setShow,
    data,
}) => {
    return (
        <div>
            {createPortal(
                <GoalsPopup
                    {...{ show, setShow }}
                    className="min-w-[40vw]"
                >
                    <div className="space-y-[1.67vw] w-full">
                        <h2 className="text-[1.25vw] text-center">
                            Tutor Profile
                        </h2>
                        <div className="grid grid-cols-2 w-full gap-[.8vw]">
                            <div className="flex flex-col gap-[.8vw]">
                                <GoalsTextInput
                                    disabled
                                    label="Id"
                                    labelClassName="font-medium text-[.83vw]"
                                    data={data.id}
                                    placeholder=""
                                />
                                <GoalsTextInput
                                    disabled
                                    label="Name"
                                    labelClassName="font-medium text-[.83vw]"
                                    data={data.name}
                                    placeholder=""
                                />
                                <GoalsTextInput
                                    disabled
                                    label="University"
                                    labelClassName="font-medium text-[.83vw]"
                                    data={data.university}
                                    placeholder=""
                                />
                            </div>
                            <div className="flex flex-col gap-[.8vw]">
                                <GoalsTextInput
                                    disabled
                                    label="Major"
                                    labelClassName="font-medium text-[.83vw]"
                                    data={data.major}
                                    placeholder=""
                                />
                                <div className="flex flex-col gap-[.4vw]">
                                    <p className="font-medium text-[.83vw]">Skills</p>
                                    <div className="w-full grid grid-cols-2 gap-[.5vw] text-[3.7vw] md:text-[.8vw] focus:ring-0 py-[.75vw] px-[3vw] md:px-[1vw] rounded-md text-dark h-[12vw] md:h-[8.3vw] border placeholder:text-light-grey bg-gray-100 border-gray-300">
                                        <div>
                                            <p className="mb-[.3vw]">Soft Skills:</p>
                                            <ul className="list-disc list-inside">
                                                {data.skills.map((item, index) => item.category == "soft_skill" && <li key={index}>{item.name}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="mb-[.3vw]">Hard Skills:</p>
                                            <ul className="list-disc list-inside">
                                                {data.skills.map((item, index) => item.category == "hard_skill" && <li key={index}>{item.name}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 w-full gap-[.8vw]">
                            <div className="space-y-[.5vw]">
                                <p className="text-[.83vw]">Bimbingan Berjalan</p>
                                <div className="grid grid-cols-2 text-center text-[.83vw]">
                                    <ul className="space-y-[1.5vw] py-[1vw] rounded-[.5vw] bg-yellow-50">
                                        <li>Bimbingan Online</li>
                                        <li>Bimbingan Offline</li>
                                        <li>Deks Review</li>
                                    </ul>
                                    <ul className="space-y-[1.5vw] py-[1vw] rounded-[.5vw]">
                                        <li>123</li>
                                        <li>223</li>
                                        <li>323</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-[.5vw]">
                                <p className="text-[.83vw]">Bimbingan Selesai</p>
                                <div className="grid grid-cols-2 text-center text-[.83vw]">
                                    <ul className="space-y-[1.5vw] py-[1vw] rounded-[.5vw] bg-green-50">
                                        <li>Bimbingan Online</li>
                                        <li>Bimbingan Offline</li>
                                        <li>Deks Review</li>
                                    </ul>
                                    <ul className="space-y-[1.5vw] py-[1vw] rounded-[.5vw]">
                                        <li>123</li>
                                        <li>223</li>
                                        <li>323</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </GoalsPopup>,
                document.body
            )}
        </div>
    );
};

export default Show;
