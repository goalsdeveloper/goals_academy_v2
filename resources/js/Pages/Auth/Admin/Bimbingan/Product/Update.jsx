import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import Breadcrumb from "../../components/Breadcrumb";
import FormSection from "../../components/layouts/FormSection";
import { useState } from "react";
import FacilityModal from "./Components/FacilityModal";
import SliderButton from "./Components/SliderButton";
import { SelectInput, SelectInputItem } from "./Components/SelectInput";
import {
    SelectMultiTag,
    SelectMultiTagItem,
} from "./Components/SelectMultiTag";
import { router } from "@inertiajs/react";

const Update = ({ auth, categories, topics, addons, products }) => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        name: products.name,
        product_image: "",
        slug: products.slug,
        category_id: categories.find((item) => item.id == products.category_id),
        description: products.description,
        price: products.price,
        promo: products.promo_price ?? "",
        total_meet: products.total_meet,
        active_period: products.active_period,
        meeting_duration: products.duration,
        add_on: products.add_ons ?? [],
        topic: products.topics ?? [],
        facilities: products.facilities ?? [],
        is_visible: products.is_visible == 1 ? true : false,
        form_config: products.form_config ?? {},
    });

    console.log(products, data)

    function handleSubmit() {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("product_image", data.product_image.file);
        formData.append("slug", data.slug);
        formData.append("category_id", Number(data.category_id.id));
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("promo", Number(data.promo));
        formData.append("total_meet", data.total_meet);
        formData.append("active_period", data.active_period);
        formData.append("meeting_duration", data.meeting_duration);
        formData.append("add_on", Number(data.add_on.id));
        formData.append("topic", Number(data.topic.id));
        formData.append("facilities", data.facilities);
        formData.append("is_visible", data.is_visible ? 1 : 0);
        formData.append("is_facilities", 0);
        formData.append("excerpt", data.description);

        // router.post(route("admin.bimbingan.product.update"), formData, {
        //     onSuccess: () => {
        //         toast.success("Product berhasil ditambahkan");
        //     },
        //     onError: (error) => {
        //         toast.error(error.message);
        //     },
        // });
    }

    const formConfigList = [
        { key: "city", label: "Kota" },
        { key: "document", label: "Dokumen / Berkas" },
        { key: "place", label: "Lokasi" },
        { key: "schedule", label: "Jadwal" },
        { key: "topic", label: "Topik" },
    ];

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Product"
            role="admin"
            auth={auth}
        >
            <FacilityModal
                show={show}
                setShow={setShow}
                data={data}
                setData={setData}
            />

            <form
                className="space-y-[1.6vw]"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="flex justify-between">
                    <Breadcrumb isSlug />

                    <div className="space-x-[.8vw]">
                        <GoalsButton
                            onClick={() =>
                                router.visit(
                                    route("admin.bimbingan.product.index")
                                )
                            }
                            size="sm"
                            variant="success-bordered"
                        >
                            Batal
                        </GoalsButton>
                        <GoalsButton
                            size="sm"
                            variant="success"
                            onClick={() => {}}
                            type="submit"
                        >
                            Perbarui
                        </GoalsButton>
                    </div>
                </div>

                <div className="flex gap-[1.2vw]">
                    <div className="flex flex-col w-full gap-[.8vw]">
                        <FormSection
                            title="Details"
                            titleAction={
                                <SliderButton
                                    label="Visibilitas"
                                    onClick={() =>
                                        setData({
                                            ...data,
                                            is_visible: !data.is_visible,
                                        })
                                    }
                                    isOn={data.is_visible}
                                />
                            }
                        >
                            {/* <GoalsUploadFile
                                data={data.product_image}
                                setData={() =>
                                    setData({
                                        product_image: data.product_image,
                                        ...rest,
                                    })
                                }
                            /> */}
                            <input
                                type="file"
                                value={data.product_image.url}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        product_image: {
                                            url: e.target.value,
                                            file: e.target.files[0],
                                        },
                                    })
                                }
                            />

                            <div className="flex gap-[1.2vw]">
                                <div className="h-40 aspect-square border-2 rounded-"></div>
                                <div className="w-full space-y-[1.2vw]">
                                    <GoalsTextInput
                                        label="Nama"
                                        data={data.name}
                                        setData={(e) =>
                                            setData({ ...data, name: e })
                                        }
                                        required
                                    />
                                    <GoalsTextInput
                                        label="Slug"
                                        data={data.slug}
                                        setData={(e) =>
                                            setData({ ...data, slug: e })
                                        }
                                    />
                                </div>
                            </div>

                            <SelectInput
                                value={data.category_id.name}
                                label="Kategori"
                                required
                            >
                                {categories.map((option, i) => (
                                    <SelectInputItem
                                        key={i}
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                category_id: option,
                                            })
                                        }
                                    >
                                        {option.name}
                                    </SelectInputItem>
                                ))}
                            </SelectInput>

                            <div className="space-y-[.5vw]">
                                <label htmlFor="deskripsi">
                                    Deskripsi
                                    <sup className="text-danger text-[1vw] top-0">
                                        *
                                    </sup>
                                </label>
                                <textarea
                                    id="deskripsi"
                                    placeholder="Deskripsi singkat tentang program ini"
                                    value={data.description}
                                    required
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            description: e.target.value,
                                        })
                                    }
                                    className=" w-full h-[7.8vw] border border-neutral-50 text-[.83vw] rounded-[.4vw] px-[1.2vw] md:py-[1vw] resize-none "
                                ></textarea>
                            </div>
                        </FormSection>

                        <FormSection title="Harga">
                            <div className="flex gap-[1.2vw]">
                                <GoalsTextInput
                                    label="Harga"
                                    required
                                    grow
                                    data={data.price}
                                    setData={(e) =>
                                        setData({ ...data, price: e })
                                    }
                                />
                                <GoalsTextInput
                                    label="Promo (Optional)"
                                    grow
                                    data={data.promo}
                                    setData={(e) =>
                                        setData({ ...data, promo: e })
                                    }
                                />
                            </div>
                        </FormSection>
                    </div>

                    <div className="flex flex-col w-full gap-[.8vw]">
                        <FormSection title="Informasi">
                            <div className="flex gap-[1.2vw]">
                                <GoalsTextInput
                                    label="Total Pertemuan"
                                    required
                                    data={data.total_meet}
                                    setData={(e) =>
                                        setData({ ...data, total_meet: e })
                                    }
                                />
                                <GoalsTextInput
                                    label="Masa Aktif"
                                    required
                                    data={data.active_period}
                                    setData={(e) =>
                                        setData({ ...data, active_period: e })
                                    }
                                />
                                <GoalsTextInput
                                    label="Durasi Pertemuan"
                                    required
                                    data={data.meeting_duration}
                                    setData={(e) =>
                                        setData({
                                            ...data,
                                            meeting_duration: e,
                                        })
                                    }
                                />
                            </div>

                            {/* <SelectInput
                                value={data.add_on.name}
                                label="Add-on"
                                required
                            >
                                {addons.map((option, i) => (
                                    <SelectInputItem
                                        key={i}
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                add_on: option,
                                            })
                                        }
                                    >
                                        {option.name}
                                    </SelectInputItem>
                                ))}
                            </SelectInput> */}

                            <SelectMultiTag
                                value={data.add_on}
                                label="Add on"
                                handleClearTag={() =>
                                    setData({ ...data, add_on: [] })
                                }
                            >
                                {addons.map((option, i) => {
                                    return (
                                        <SelectMultiTagItem
                                            key={i}
                                            onClick={() => {
                                                if (
                                                    !data.add_on.some(
                                                        (item) =>
                                                            item === option
                                                    )
                                                ) {
                                                    setData({
                                                        ...data,
                                                        add_on: [
                                                            ...data.add_on,
                                                            option,
                                                        ],
                                                    });
                                                }
                                            }}
                                        >
                                            {option.name}
                                        </SelectMultiTagItem>
                                    );
                                })}
                            </SelectMultiTag>

                            <SelectMultiTag
                                value={data.topic}
                                label="Topic"
                                handleClearTag={() =>
                                    setData({ ...data, add_on: [] })
                                }
                                required
                            >
                                {topics.map((option, i) => (
                                    // <SelectInputItem
                                    //     key={i}
                                    //     onClick={() =>
                                    //         setData({
                                    //             ...data,
                                    //             topic: option,
                                    //         })
                                    //     }
                                    // >
                                    //     {option.topic}
                                    // </SelectInputItem>
                                    <SelectMultiTagItem
                                        key={i}
                                        onClick={() => {
                                            if (
                                                !data.topic.some(
                                                    (item) => item === option
                                                )
                                            ) {
                                                setData({
                                                    ...data,
                                                    topic: [
                                                        ...data.topic,
                                                        option,
                                                    ],
                                                });
                                            }
                                        }}
                                    >
                                        {option.topic}
                                    </SelectMultiTagItem>
                                ))}
                            </SelectMultiTag>
                        </FormSection>

                        <FormSection
                            title="Fasilitas Program"
                            titleAction={
                                <GoalsButton
                                    size="sm"
                                    onClick={() => setShow(!show)}
                                >
                                    Tambah
                                </GoalsButton>
                            }
                        >
                            <div className="flex flex-wrap gap-[1.6vw]">
                                {data.facilities.length == 0 ? (
                                    <p className="text-[.83vw] w-full text-center">
                                        Belum diatur
                                    </p>
                                ) : (
                                    data.facilities.map((item) => (
                                        <div
                                            key={item.icon}
                                            className="flex gap-[.6vw] items-center"
                                        >
                                            <i
                                                className={`${item.icon} text-secondary`}
                                            ></i>
                                            <p>{item.text}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </FormSection>
                        <FormSection title="Opsi Formulir User">
                            <table className="">
                                <thead>
                                    <tr className="bg-[#F8F8FC]">
                                        <th className="w-full  py-[.5vw] px-[1.2vw] text-start font-semibold">
                                            Nama
                                        </th>
                                        <th className=" py-[.5vw] px-[1.2vw] font-semibold">
                                            Visibilitas
                                        </th>
                                        <th className=" py-[.5vw] px-[1.2vw] font-semibold">
                                            Wajib
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formConfigList.map((item, i) => (
                                        <tr
                                            className="border-b border-neutral-20"
                                            key={i}
                                        >
                                            <td className="py-[.5vw] px-[1.2vw]">
                                                {item.label}
                                            </td>
                                            <td className="text-center">
                                                <input
                                                    type="checkbox"
                                                    name={item.key + "-visible"}
                                                    checked={data.form_config.hasOwnProperty(
                                                        item.key
                                                    )}
                                                    onChange={() => {
                                                        if (
                                                            data.form_config.hasOwnProperty(
                                                                item.key
                                                            )
                                                        ) {
                                                            const updatedFormConfig =
                                                                {
                                                                    ...data.form_config,
                                                                };
                                                            delete updatedFormConfig[
                                                                item.key
                                                            ];
                                                            setData({
                                                                ...data,
                                                                form_config:
                                                                    updatedFormConfig,
                                                            });
                                                        } else {
                                                            setData({
                                                                ...data,
                                                                form_config: {
                                                                    ...data.form_config,
                                                                    [item.key]: 0,
                                                                },
                                                            });
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td className="text-center">
                                                <input
                                                    type="checkbox"
                                                    name={
                                                        item.key + "-required"
                                                    }
                                                    checked={
                                                        data.form_config[
                                                            item.key
                                                        ] == 1
                                                    }
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            form_config: {
                                                                ...data.form_config,
                                                                [item.key]: e
                                                                    .target
                                                                    .checked
                                                                    ? 1
                                                                    : 0,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </FormSection>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    );
};

export default Update;
