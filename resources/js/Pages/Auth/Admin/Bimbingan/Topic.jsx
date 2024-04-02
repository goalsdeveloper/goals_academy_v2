import DashboardLayout from "@/Layouts/DashboardLayout";
import { useMemo } from "react";
import { Link } from "@inertiajs/react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import GoalsDashboardTable from "@/Components/elements/GoalsDashboardTable";
import { SubHeading } from "./Product";

export default function Topic({ auth }) {
    const columns = useMemo(
        () => [
            {
                accessorKey: "topic",
                header: "Topic",
                size: 200,
            },
            {
                accessorKey: "slug",
                header: "Slug",
                size: 200,
            },
            {
                accessorKey: "action",
                header: "Action",
                size: 50,

                Cell: ({ cell }) => (
                    <ul className="flex gap-[.8vw] w-fit">
                        <li>
                            <Link href="/admin/bimbingan/product/edit">
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                method="DELETE"
                                href={`/admin/bimbingan/product/${cell.getValue()}`}
                            >
                                <FiTrash2 className="text-[1.2vw] text-danger-40" />
                            </Link>
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
            subtitle="Topic"
            role="admin"
            auth={auth}
        >
            <div className="space-y-[1.6vw]">
                <SubHeading title="Topik">
                    <Link
                        isLink
                        href="/admin/bimbingan/product/add"
                        className="flex items-center gap-[.5vw] bg-secondary hover:bg-primary text-white py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]"
                    >
                        <FiPlus className="text-[1vw]" />
                        Add Topic
                    </Link>
                </SubHeading>

                <GoalsDashboardTable
                    isHeadVisible
                    isPaginated
                    isSortable
                    columns={columns}
                    data={data}
                />
            </div>
        </DashboardLayout>
    );
}

const data = [
    { id: 1, topic: "Topic 1", slug: "topic-1" },
    { id: 2, topic: "Topic 2", slug: "topic-2" },
];
