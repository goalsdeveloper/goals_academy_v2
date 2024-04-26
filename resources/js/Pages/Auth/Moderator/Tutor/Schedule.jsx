import { useState, useMemo } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import SubHeading from "../../Admin/components/SubHeading";

export default function Schedule ({ auth, data }) {
    const [isLoading, setIsLoading] = useState(false);
    console.log(data);
    // const data = [
    //     {
    //         time: '08:00',
    //         '2024-04-01': ['Timo', 'Hafiz'],
    //         '2024-04-02': ['Hafiz'],
    //         '2024-04-03': ['Hafiz'],
    //         '2024-04-04': ['Hafiz'],
    //         '2024-04-05': ['Hafiz'],
    //         '2024-04-06': ['Hafiz'],
    //         '2024-04-07': ['Hafiz', 'Timo'],
    //         '2024-04-08': ['Hafiz'],
    //         '2024-04-09': ['Hafiz'],
    //         '2024-04-10': ['Hafiz'],
    //         '2024-04-11': ['Hafiz'],
    //         '2024-04-12': ['Hafiz'],
    //         '2024-04-13': ['Hafiz'],
    //         '2024-04-14': ['Hafiz'],
    //         '2024-04-15': ['Hafiz'],
    //         '2024-04-16': ['Hafiz'],
    //         '2024-04-17': ['Hafiz'],
    //         '2024-04-18': ['Hafiz'],
    //         '2024-04-19': ['Hafiz'],
    //         '2024-04-20': ['Hafiz'],
    //         '2024-04-21': ['Hafiz'],
    //         '2024-04-22': ['Hafiz'],
    //         '2024-04-23': ['Hafiz'],
    //         '2024-04-24': ['Hafiz'],
    //         '2024-04-25': ['Hafiz'],
    //         '2024-04-26': ['Hafiz'],
    //         '2024-04-27': ['Hafiz'],
    //         '2024-04-28': ['Hafiz'],
    //         '2024-04-29': ['Hafiz'],
    //         '2024-04-30': ['Hafiz'],
    //         '2024-04-31': ['Hafiz'],
    //     }
    // ]

    // const columns = useMemo(
    //     () => [
    //         {
    //             accessorKey: "topic",
    //             header: "Topik",
    //             size: 200,
    //         },
    //         {
    //             accessorKey: "slug",
    //             header: "Slug",
    //             size: 200,
    //         },
    //         {
    //             accessorKey: "id",
    //             header: "Action",
    //             size: 50,

    //             Cell: ({ cell }) => (
    //                 <ul className="flex gap-[.8vw] w-fit">
    //                     <li>
    //                         <button
    //                             onClick={() => {
    //                                 setShowDialog({ ...showDialog, edit: true });
    //                                 setFormData({
    //                                     ...formData,
    //                                     id: cell.row.original.id,
    //                                     topic: cell.row.original.topic,
    //                                     slug: cell.row.original.slug,
    //                                 });
    //                             }}
    //                         >
    //                             <FiEdit2 className="text-[1.2vw] text-secondary" />
    //                         </button>
    //                     </li>
    //                     <li>
    //                         <Link
    //                             method="DELETE"
    //                             href={`/admin/bimbingan/topic/${cell.getValue()}`}
    //                             onSuccess={callback}
    //                             as="button"
    //                         >
    //                             <FiTrash2 className="text-[1.2vw] text-danger-40" />
    //                         </Link>
    //                     </li>
    //                 </ul>
    //             ),
    //         },
    //     ],
    //     []
    // );

    return (
        <DashboardLayout title="Tutor" subtitle="Schedule" role="moderator" auth={auth}>
            {isLoading && <LoadingUI />}
            <SubHeading title="Schedule" className="mb-[1.2vw]" />
            <div className="bg-white rounded-[.625vw] px-[1.67vw] py-[1.25vw]">
                <div>asdf</div>
                <div>asdf</div>
                <div>asdf</div>
                <div>asdf</div>
            </div>
        </DashboardLayout>
    )
}

function Card ({ className, ...props }) {
    return (
        <div {...props} className={`bg-white shadow-bottom-right rounded-[.625vw] py-[1.25vw] px-[1.67vw] ${className}`}></div>
    )
}

function LoadingUI () {
    return (
        <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-gray-50 bg-opacity-50 z-50">
            <img src={logo} alt="Goals Academy" className="w-[6vw] h-[6vw] animate-bounce" />
        </div>
    )
}
