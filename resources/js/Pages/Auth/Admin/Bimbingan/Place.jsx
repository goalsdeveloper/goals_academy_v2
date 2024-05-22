import { Link, useForm, router } from "@inertiajs/react";
import React, { useMemo, useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import SubHeading from "../components/SubHeading";
import GoalsButton from "@/Components/GoalsButton";
import Dialog from "./Place/Dialog";
import toast, { Toaster } from "react-hot-toast";
import GoalsCupertinoButton from "@/Components/elements/GoalsCupertinoButton";
import { useEffect } from "react";
import { getPaginationPages } from "@/script/utils";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";

export default function Place({ auth, places, cities }) {
    // places = places.data;

    // const [pages, setPages] = useState([]);
    const [placeKeyword, setPlaceKeyword] = useState(
        new URLSearchParams(window.location.search).get("searchPlace")
    );
    const [cityKeyword, setCityKeyword] = useState(
        new URLSearchParams(window.location.search).get("searchCity")
    );

    const onPlaceSearchCallback = (search) => {
        router.visit(
            route("admin.bimbingan.place.index", {
                searchPlace: search,
                searchCity: cityKeyword,
            }),
            {
                only: ["places", "cities"],
            }
        );
    };

    const onCitySearchCallback = (search) => {
        router.visit(
            route("admin.bimbingan.place.index", {
                searchPlace: placeKeyword,
                searchCity: search,
            }),
            {
                only: ["places", "cities"],
            }
        );
    };

    const [showDialog, setShowDialog] = useState({
        create: false,
        edit: false,
        delete: false,
        show: false,
    });

    const {
        data: formData,
        setData: setFormData,
        post,
        put,
    } = useForm({
        id: "",
        city: "",
        city_id: 0,
        place: "",
        target: "",
    });

    const callback = (method) => {
        router.visit(route("admin.bimbingan.place.index"), {
            only: ["places", "cities"],
            preserveScroll: true,
            onSuccess: () => {
                if (method == "create") {
                    toast.success("Create Success!");
                } else if (method == "edit") {
                    toast.success("Edit Success!");
                } else {
                    toast.success("Delete Success!");
                }
            },
        });
    };

    const columnsCity = useMemo(
        () => [
            {
                accessorKey: "city",
                header: "Kota",
            },
            {
                accessorKey: "id",
                header: "Action",
                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <button
                                onClick={() => {
                                    setShowDialog({
                                        ...showDialog,
                                        edit: true,
                                    });
                                    setFormData({
                                        id: cell.row.original.id,
                                        city: cell.row.original.city,
                                        place: "",
                                        target: "city",
                                    });
                                }}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                        </li>
                        <li>
                            <GoalsCupertinoButton
                                className="text-[1vw] gap-[.4vw] cursor-pointer"
                                label=""
                                size="lg"
                                isEnabled={cell.row.original.is_visible}
                                disabled={cell.row.original.is_visible}
                                onClick={() => {
                                    router.put(
                                        route(
                                            "admin.bimbingan.city.updateVisible",
                                            { city: cell.row.original.id }
                                        ),
                                        {
                                            is_visible:
                                                !cell.row.original.is_visible,
                                        },
                                        {
                                            onSuccess: () => callback("edit"),
                                        }
                                    );
                                }}
                            />
                        </li>
                    </ul>
                ),
            },
        ],
        []
    );

    const columnsLocation = useMemo(
        () => [
            {
                accessorKey: "place",
                header: "Lokasi",
            },
            {
                accessorKey: "city.city",
                header: "Kota",
            },
            {
                accessorKey: "id",
                header: "Action",
                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <button
                                onClick={() => {
                                    setShowDialog({
                                        ...showDialog,
                                        edit: true,
                                    });
                                    setFormData({
                                        id: cell.row.original.id,
                                        city: cell.row.original.city.city,
                                        city_id: cell.row.original.city.id,
                                        place: cell.row.original.place,
                                        target: "location",
                                    });
                                }}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                        </li>
                        <li>
                            <GoalsCupertinoButton
                                className="text-[1vw] gap-[.4vw] cursor-pointer"
                                label=""
                                size="lg"
                                isEnabled={cell.row.original.is_visible}
                                disabled={cell.row.original.is_visible}
                                onClick={() => {
                                    router.put(
                                        route(
                                            "admin.bimbingan.place.updateVisible",
                                            { place: cell.row.original.id }
                                        ),
                                        {
                                            is_visible:
                                                !cell.row.original.is_visible,
                                        },
                                        {
                                            onSuccess: () => callback("edit"),
                                        }
                                    );
                                }}
                            />
                        </li>
                    </ul>
                ),
            },
        ],
        []
    );

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Place"
            role="admin"
            auth={auth}
        >
            <Toaster />
            <div className="grid grid-cols-2 gap-[2vw]">
                <div className="space-y-[1.6vw]">
                    <SubHeading title="Place - City">
                        <GoalsButton
                            className="py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
                            onClick={() => {
                                setShowDialog({ create: true });
                                setFormData({
                                    id: "",
                                    city: "",
                                    place: "",
                                    target: "city",
                                });
                            }}
                        >
                            <FiPlus /> Add City
                        </GoalsButton>
                    </SubHeading>
                    <GoalsDashboardTable
                        className="md:p-[2vw]"
                        isHeadVisible
                        isSortable
                        columns={columnsCity}
                        data={cities}
                        keyword={cityKeyword}
                        setKeyword={setCityKeyword}
                        onSearch={(i) => {
                            onCitySearchCallback(i);
                        }}
                    />
                </div>
                <div className="space-y-[1.6vw]">
                    <SubHeading title="Place - Location">
                        <GoalsButton
                            className="py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
                            onClick={() => {
                                setShowDialog({ create: true });
                                setFormData({
                                    id: "",
                                    city: "",
                                    place: "",
                                    city_id: 0,
                                    target: "location",
                                });
                            }}
                        >
                            <FiPlus /> Add Location
                        </GoalsButton>
                    </SubHeading>
                    <GoalsDashboardTable
                        className="md:p-[2vw]"
                        isHeadVisible
                        isSortable
                        columns={columnsLocation}
                        data={places}
                        keyword={placeKeyword}
                        setKeyword={setPlaceKeyword}
                        onSearch={(i) => {
                            onPlaceSearchCallback(i);
                        }}
                    />
                </div>
            </div>
            <Dialog
                {...{
                    showDialog,
                    setShowDialog,
                    formData,
                    setFormData,
                    post,
                    put,
                    callback,
                    cities,
                }}
            />
        </DashboardLayout>
    );
}
