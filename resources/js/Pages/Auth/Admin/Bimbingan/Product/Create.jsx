import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { Breadcrumb } from "../Product";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";

const Create = ({ auth }) => {
    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Product"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <div className="flex justify-between">
                    <Breadcrumb />

                    <div className="space-x-[.8vw]">
                        <GoalsButton variant="success-bordered">
                            Batal
                        </GoalsButton>
                        <GoalsButton variant="success">Tambah</GoalsButton>
                    </div>
                </div>

                <div className="flex gap-[1.2vw]">
                    <div className="flex flex-col w-full gap-[.8vw]">
                        <FormSection
                            title="Details"
                            titleAction={<GoalsButton>Visibilitas</GoalsButton>}
                        >
                            <div className="flex gap-[1.2vw]">
                                <div className="h-40 aspect-square border-2 rounded-"></div>
                                <div className="w-full space-y-[1.2vw]">
                                    <GoalsTextInput label="Nama" required />
                                    <GoalsTextInput label="Slug" />
                                </div>
                            </div>

                            <GoalsTextInput label="Kategori" required />
                            <div className="space-y-[.5vw]">
                                <label htmlFor="deskripsi">
                                    Deskripsi{" "}
                                    <sup className="text-danger">*</sup>
                                </label>
                                <textarea
                                    id="deskripsi"
                                    placeholder="Deskripsi singkat tentang program ini"
                                    className="w-full h-[7.8vw] border border-neutral-50 rounded-[.4vw] px-[1.2vw] py-[1vw] resize-none"
                                ></textarea>
                            </div>
                        </FormSection>

                        <FormSection title="Harga">
                            <div className="flex gap-[1.2vw]">
                                <GoalsTextInput label="Harga" required grow />
                                <GoalsTextInput label="Promo (Optional)" grow />
                            </div>
                        </FormSection>
                    </div>

                    <div className="flex flex-col w-full gap-[.8vw]">
                        <FormSection title="Informasi">
                            <div className="flex gap-[1.2vw]">
                                <GoalsTextInput
                                    label="Total Pertemuan"
                                    required
                                />
                                <GoalsTextInput label="Masa Aktif" required />
                                <GoalsTextInput
                                    label="Durasi Pertemuan"
                                    required
                                />
                            </div>
                            <GoalsTextInput label="Add-on" />
                            <GoalsTextInput label="Topic" />
                        </FormSection>

                        <FormSection title="Fasilitas Program"></FormSection>
                        <FormSection title="Opsi Formulir User">
                            <table className="">
                                <tr className="bg-[#F8F8FC]">
                                    <th className="w-full  py-[.5vw] px-[1.2vw] text-start">
                                        Nama
                                    </th>
                                    <th className=" py-[.5vw] px-[1.2vw]">
                                        Visibilitas
                                    </th>
                                    <th className=" py-[.5vw] px-[1.2vw]">
                                        Wajib
                                    </th>
                                </tr>
                                {Array(4)
                                    .fill()
                                    .map((_, i) => (
                                        <tr className="border-b border-neutral-20">
                                            <td className=" py-[.5vw] px-[1.2vw]">
                                                Jadwal
                                            </td>
                                            <td className=" text-center">
                                                <input
                                                    type="checkbox"
                                                    name=""
                                                    id=""
                                                />
                                            </td>
                                            <td className=" text-center">
                                                <input
                                                    type="checkbox"
                                                    name=""
                                                    id=""
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </table>
                        </FormSection>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Create;

export const FormSection = ({ title, children = <></>, titleAction = <></> }) => {
    return (
        <div className="bg-white w-full rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
            <div className="flex items-center justify-between">
                <h2 className="text-[1vw] font-medium">{title}</h2>

                {titleAction}
            </div>

            <div className="space-y-[1.2vw]">{children}</div>
        </div>
    );
};
