import { Link, useForm, router } from "@inertiajs/react";
import React, { useMemo, useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import SubHeading from "../components/Subheading";
import GoalsButton from "@/Components/GoalsButton";
import Dialog from "./Place/Dialog";
import toast, { Toaster } from "react-hot-toast";

export default function Place ({ auth }) {
    const [dataCity, setDataCity] = useState([
        {
            id: 1,
            city: 'Malang',
        },
        {
            id: 2,
            city: 'Surabaya',
        },
    ])

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
        location: "",
        target: "",
    });

    const callback = (method) => {
        router.visit(route('admin.bimbingan.topic.index'), {
            only: ['data'],
            onSuccess: () => {
                if (method == 'create') {
                    toast.success('Create Success!');
                } else if (method == 'edit') {
                    toast.success('Edit Success!');
                } else {
                    toast.success('Delete Success!');
                }
            }
        });
    }

    const [dataLocation, setDataLocation] = useState([
        {
            id: 1,
            location: 'Kafe 1',
            city: 'Malang',
        },
        {
            id: 2,
            location: 'Kafe 2',
            city: 'Malang',
        },
        {
            id: 3,
            location: 'Kafe 3',
            city: 'Malang',
        },
        {
            id: 3,
            location: 'Kafe 4',
            city: 'Surabaya',
        },
        {
            id: 4,
            location: 'Kafe 5',
            city: 'Surabaya',
        },
    ])

    const columnsCity = useMemo(
        () => [
            {
                accessorKey: 'city',
                header: 'Kota',
            },
            {
                accessorKey: 'id',
                header: 'Action',
                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <button
                                onClick={() => {
                                    setShowDialog({ ...showDialog, edit: true });
                                    setFormData({
                                        id: cell.row.original.id,
                                        city: cell.row.original.city,
                                        location: "",
                                        target: "city",
                                    });
                                }}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                        </li>
                        <li>
                            <Link
                                method="DELETE"
                                href={`/admin/bimbingan/place/${cell.getValue()}`}
                            >
                                <FiTrash2 className="text-[1.2vw] text-danger-40" />
                            </Link>
                        </li>
                    </ul>
                ),
            },
        ], []
    )

    const columnsLocation = useMemo(
        () => [
            {
                accessorKey: 'location',
                header: 'Lokasi',
            },
            {
                accessorKey: 'city',
                header: 'Kota',
            },
            {
                accessorKey: 'id',
                header: 'Action',
                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <button
                                onClick={() => {
                                    setShowDialog({ ...showDialog, edit: true });
                                    setFormData({
                                        id: cell.row.original.id,
                                        city: cell.row.original.city,
                                        location: cell.row.original.location,
                                        target: "location",
                                    });
                                }}
                            >
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </button>
                        </li>
                        <li>
                            <Link
                                method="DELETE"
                                href={`/admin/bimbingan/place/${cell.getValue()}`}
                            >
                                <FiTrash2 className="text-[1.2vw] text-danger-40" />
                            </Link>
                        </li>
                    </ul>
                ),
            },
        ], []
    )

    return (
        <DashboardLayout title="Bimbingan" subtitle="Place" role="admin" auth={auth}>
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
                                    location: "",
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
                        isPaginated
                        isSortable
                        columns={columnsCity}
                        data={dataCity}
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
                                    location: "",
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
                        isPaginated
                        isSortable
                        columns={columnsLocation}
                        data={dataLocation}
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
                    dataCity
                }}
            />
        </DashboardLayout>
    )
}
