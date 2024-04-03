import { Link } from "@inertiajs/react";
import React, { useMemo, useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import GoalsButton from "@/Components/GoalsButton";
import SubHeading from "../components/Subheading";

export default function Place ({ auth }) {
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
                            <Link href="/admin/bimbingan/category/edit">
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                method="DELETE"
                                href={`/admin/bimbingan/category/${cell.getValue()}`}
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
                            <Link href="/admin/bimbingan/category/edit">
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                method="DELETE"
                                href={`/admin/bimbingan/category/${cell.getValue()}`}
                            >
                                <FiTrash2 className="text-[1.2vw] text-danger-40" />
                            </Link>
                        </li>
                    </ul>
                ),
            },
        ], []
    )

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

    return (
        <DashboardLayout title="Bimbingan" subtitle="Place" role="admin" auth={auth}>
            <div className="grid grid-cols-2 gap-[2vw]">
                <div className="space-y-[1.6vw]">
                    <SubHeading title="Place - City">
                        <GoalsButton className="text-[.7vw] rounded-[.4vw] px-[1.2vw] md:py-[.6vw]">
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
                        <GoalsButton className="text-[.7vw] rounded-[.4vw] px-[1.2vw] md:py-[.6vw]">
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
        </DashboardLayout>
    )
}
