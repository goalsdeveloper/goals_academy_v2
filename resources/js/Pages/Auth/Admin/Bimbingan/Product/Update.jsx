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
import { router, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { toSlug } from "@/script/utils";
import sampleImage from "/resources/img/program/sample image.png";

const Update = ({ auth, categories, topics, addons, products }) => {
    const [show, setShow] = useState(false);
    const { data, setData, post, transform } = useForm({
        name: products.name,
        product_image: products.product_image,
        slug: products.slug,
        category_id: categories.find((item) => item.id == products.category_id),
        description: products.description,
        excerpt: products.excerpt,
        price: products.price,
        promo_price: products.promo_price ?? "",
        total_meet: products.total_meet,
        active_period: products.active_period,
        duration: products.duration,
        add_on: products.add_ons ?? [],
        topics: products.topics ?? [],
        facilities:
            typeof products.facilities == "string"
                ? JSON.parse(products.facilities)
                : products.facilities,
        is_visible: products.is_visible == 1 ? true : false,
        form_config:
            typeof products.form_config == "object"
                ? products.form_config
                : JSON.parse(products.form_config) ?? {},
        contact_type: products.contact_type,
    });

    function handleSubmit() {
        transform((data) => ({
            _method: "put",
            name: data.name,
            product_image: data.product_image.file ?? undefined,
            slug: data.slug,
            category_id: Number(data.category_id.id),
            description: data.description,
            price: Number(data.price),
            promo_price: Number(data.promo_price),
            total_meet: data.total_meet,
            active_period: data.active_period,
            duration: data.duration,
            addons: JSON.stringify(data.add_on.map((item) => item.id)),
            topics: JSON.stringify(data.topics.map((item) => item.id)),
            facilities: JSON.stringify(data.facilities),
            is_visible: data.is_visible ? 1 : 0,
            is_facilities: 0,
            excerpt: data.description.substring(0, 128),
            form_config: JSON.stringify(data.form_config),
            contact_type: data.contact_type,
        }));

        post(route("admin.bimbingan.product.update", products), {
            onSuccess: () => {
                toast.success("Product berhasil ditambahkan");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
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
                            disabled={
                                !data.name ||
                                !data.category_id ||
                                !data.description ||
                                !data.price ||
                                !data.total_meet ||
                                !data.active_period ||
                                !data.contact_type ||
                                !data.duration
                            }
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
                            <input
                                type="file"
                                onChange={(e) =>{
                                    setData({
                                        ...data,
                                        product_image: {
                                            url: e.target.value,
                                            file: e.target.files[0],
                                        },
                                    })
                                }}
                            />

                            <div className="flex gap-[1.2vw]">
                                <div className="flex items-center justify-center w-[29vw] h-[11vw] aspect-square shadow-md rounded-[.5vw] overflow-hidden">
                                    {typeof(data.product_image) == "string" 
                                        ? <img src={data.product_image ? `/storage/${data.product_image}` : sampleImage} className={`w-full h-full object-cover ${data.product_image ? "" : "grayscale"}`} alt={data.product_image} />
                                        : <img src={URL.createObjectURL(data.product_image.file)} className={`w-full h-full object-cover ${data.product_image ? "" : "grayscale"}`} alt={data.product_image.url} />
                                    }
                                </div>
                                <div className="w-full space-y-[1.2vw]">
                                    <GoalsTextInput
                                        label="Nama"
                                        data={data.name}
                                        setData={(e) =>
                                            setData({
                                                ...data,
                                                name: e,
                                                slug: toSlug(e),
                                            })
                                        }
                                        required
                                    />
                                    <GoalsTextInput
                                        label="Slug"
                                        data={data.slug}
                                        disabled
                                        // setData={(e) =>
                                        //     setData({ ...data, slug: e })
                                        // }
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

                            <SelectInput
                                value={data.contact_type}
                                filledClassName="capitalize"
                                label="Tipe kontak"
                                required
                            >
                                {["online", "offline", "hybrid", "other"].map(
                                    (option, i) => (
                                        <SelectInputItem
                                            key={i}
                                            className="capitalize"
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    contact_type: option,
                                                })
                                            }
                                        >
                                            {option}
                                        </SelectInputItem>
                                    )
                                )}
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
                                    onChange={(e) =>{
                                        console.log(e.target.value)
                                        setData({
                                            ...data,
                                            description: e.target.value,
                                        })
                                    }}
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
                                    data={data.promo_price}
                                    setData={(e) =>
                                        setData({ ...data, promo_price: e })
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
                                    data={data.duration}
                                    setData={(e) =>
                                        setData({
                                            ...data,
                                            duration: e,
                                        })
                                    }
                                />
                            </div>

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
                                                        (item) => item == option
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
                                value={data.topics}
                                label="Topic"
                                handleClearTag={() =>
                                    setData({ ...data, topics: [] })
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
                                                !data.topics.some(
                                                    (item) => item == option
                                                )
                                            ) {
                                                setData({
                                                    ...data,
                                                    topics: [
                                                        ...data.topics,
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
                            <div className="flex flex-wrap gap-x-[.5vw] gap-y-[1vw]">
                                {data.facilities.length == 0 ? (
                                    <p className="text-[.83vw] w-full text-center">
                                        Belum diatur
                                    </p>
                                ) : (
                                    data.facilities.map((item) => (
                                        <div
                                            key={item.icon}
                                            className="flex gap-[.6vw] items-center group hover:bg-neutral-20 cursor-pointer border border-secondary rounded-full py-[.25vw] px-[.5vw]"
                                        >
                                            <i
                                                className={`${item.icon} text-secondary text-center w-[1vw]`}
                                            ></i>
                                            <p>{item.text}</p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setData({
                                                        ...data,
                                                        facilities: data.facilities.filter(i => i != item),
                                                        // facilities:
                                                        //     data.facilities.filter(
                                                        //         (i) => {
                                                        //             i.icon ==
                                                        //                 item.icon &&
                                                        //                 i.text ==
                                                        //                     item.text;
                                                        //         }
                                                        //     ),
                                                    })
                                               }}
                                            >
                                                <i className="transition-all opacity-0 fa-solid fa-xmark group-hover:opacity-100"></i>
                                            </button>
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
