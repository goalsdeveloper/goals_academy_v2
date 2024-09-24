import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import FormSection from "../../components/layouts/FormSection";
import { SelectInput, SelectInputItem } from "./Components/SelectInput";
import SliderButton from "./Components/SliderButton";
import {
    SelectMultiTag,
    SelectMultiTagItem,
} from "./Components/SelectMultiTag";
import toast from "react-hot-toast";
import { toSlug } from "@/script/utils";
import sampleImage from "/resources/img/program/sample image.png";

const View = ({ products }) => {
    const [show, setShow] = useState(false);
    const { data, setData } = useForm({
        name: products.name,
        product_image: products.product_image,
        slug: products.slug,
        category_id: "",
        description: products.description,
        excerpt: products.excerpt,
        price: products.price,
        promo_price: products.promo_price ?? "",
        active_period: products.active_period,
        facilities: 
            typeof products.facilities == "string"
                ? JSON.parse(products.facilities)
                : products.facilities,
        is_visible: products.is_visible == 1 ? true : false,
        form_config: 
            typeof products.form_config == "object"
                ? products.form_config
                : products.form_config && JSON.parse(products.form_config),
    });

    function handleSubmit() {
        const currency = Intl.NumberFormat("id-ID");

        router.post(
            route("admin.ecourse.package.store"),
            {
                name: data.name,
                product_image: data.product_image.file,
                slug: data.slug,
                category_id: Number(data.category_id.id),
                description: data.description,
                price: Number(data.price),
                promo_price: Number(data.promo_price),
                active_period: data.active_period,
                facilities: JSON.stringify(data.facilities),
                is_visible: data.is_visible ? 1 : 0,
                is_facilities: 0,
                excerpt: data.description.substring(0, 128),
                form_config: JSON.stringify(data.form_config),
            },
            {
                onSuccess: () => {
                    toast.success("Product berhasil ditambahkan");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    }

    const formConfigList = [
        { key: "city", label: "Kota" },
        { key: "document", label: "Dokumen / Berkas" },
        { key: "place", label: "Lokasi" },
        { key: "schedule", label: "Jadwal" },
        { key: "topic", label: "Topik" },
    ];

    return (
        <form className="w-full space-y-[1.6vw]" >
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
                        bordered
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
                        {/* <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    product_image: {
                                        url: e.target.value,
                                        file: e.target.files[0],
                                    },
                                })
                            }
                        /> */}

                        <div className="flex gap-[1.2vw]">
                            {/* <div className="w-[29vw]">
                                <div className="flex items-center justify-center w-full h-[11vw] aspect-square shadow-md rounded-[.5vw] overflow-hidden">
                                    {typeof(data.product_image) == "string"
                                        ? <img src={data.product_image ? `/storage/${data.product_image}` : sampleImage} className={`w-full h-full object-cover ${data.product_image ? "" : "grayscale"}`} alt={data.product_image} />
                                        : <img src={URL.createObjectURL(data.product_image.file)} className={`w-full h-full object-cover ${data.product_image ? "" : "grayscale"}`} alt={data.product_image.url} />
                                    }
                                </div>
                                <div className="">
                                    <small
                                        htmlFor="picture"
                                        className="text-red-500 text-[.83vw]"
                                    >
                                        *Ukuran foto (402 x 295 px)
                                    </small>
                                </div>
                            </div> */}
                            <div className="w-full space-y-[1.2vw]">
                                <GoalsTextInput
                                    disabled
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
                                    disabled
                                    label="Slug"
                                    data={data.slug}
                                />
                            </div>
                        </div>

                        <div className="space-y-[.5vw]">
                            <label htmlFor="deskripsi">
                                Deskripsi
                                <sup className="text-danger text-[1vw] top-0">
                                    *
                                </sup>
                            </label>
                            <textarea
                                disabled
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
                                className="disabled:bg-gray-100 disabled:border-gray-300 w-full h-[7.8vw] border border-neutral-50 text-[.83vw] rounded-[.4vw] px-[1.2vw] md:py-[1vw] resize-none"
                            ></textarea>
                        </div>
                    </FormSection>

                    <FormSection title="Harga" bordered>
                        <div className="flex gap-[1.2vw]">
                            <GoalsTextInput
                                disabled
                                label="Harga"
                                required
                                grow
                                data={data.price}
                                setData={(e) =>
                                    setData({ ...data, price: e })
                                }
                            />
                            <GoalsTextInput
                                disabled
                                label="Diskon Gimmick (Opsional)"
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
                    <FormSection title="Informasi" bordered>
                        <GoalsTextInput
                            disabled
                            label="Durasi Paket"
                            required
                            data={data.active_period}
                            setData={(e) =>
                                setData({ ...data, active_period: e })
                            }
                        />
                    </FormSection>

                    <FormSection
                        title="Fasilitas Program"
                        // titleAction={
                        //     <GoalsButton
                        //         size="sm"
                        //         onClick={() => setShow(!show)}
                        //     >
                        //         Tambah
                        //     </GoalsButton>
                        // }
                        bordered
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
                                            onClick={() =>
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
                                            }
                                        >
                                            <i className="transition-all opacity-0 fa-solid fa-xmark group-hover:opacity-100"></i>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </FormSection>
                    {/* <FormSection title="Opsi Formulir User" bordered>
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
                    </FormSection> */}
                </div>
            </div>
        </form>
    );
};

export default View;