import { useState, useMemo } from "react";
import { Link, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDataTable from "@/Components/elements/GoalsDataTable";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { GoalsSelectInput, GoalsSelectInputItem } from "@/Components/elements/GoalsSelectInput";
import { FiEye, FiCalendar } from "react-icons/fi";
import Show from "./TutorList/Show";
import Schedule from "./TutorList/Schedule";
import logo from "/resources/img/icon/goals-5.svg";

export default function TutorList ({ auth }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [dataProfile, setDataProfile] = useState({
        id: "",
        name: "",
        university: "",
        major: "",
        skills: [],
        finished_course: 0,
        ongoing_course: 0
    });
    const [dataSchedule, setDataSchedule] = useState([]);

    const [showForm, setShowForm] = useState({
        major: false,
        skill: false,
    });
    
    const {data: filterData, setData: setFilterData, post} = useForm({
        search: '',
        major: '',
        skill: ''
    });


    const majorOptions = [
        {
            id: 1,
            major: 'Matematika'
        },
        {
            id: 2,
            major: 'Sistem Informasi'
        },
    ]

    const skillOptions = [
        {
            id: 1,
            skill: 'Machine Learning'
        },
        {
            id: 2,
            skill: 'Python'
        },
        {
            id: 3,
            skill: 'Javascript'
        },
    ]

    const [data, setData] = useState([
        {
            id: 1,
            name: "Akhmad Roziqin",
            university: "UIN Malang",
            major: 'Matematika',
            skills: [
                {
                    name: 'Javascript',
                    category: 'soft_skill',
                },
                {
                    name: 'Python',
                    category: 'hard_skill',
                },
                {
                    name: 'Machine Learning',
                    category: 'soft_skill',
                },
                {
                    name: 'Tensorflow',
                    category: 'hard_skill',
                },
            ],
            finished_course: 102,
            ongoing_course: 8
        },
        {
            id: 2,
            name: "Hafiz Rizqi",
            university: "Brawijaya",
            major: 'TIF',
            skills: [
                {
                    name: 'Figma',
                    category: 'hard_skill',
                },
                {
                    name: 'UI/UX',
                    category: 'soft_skill',
                },
            ],
            finished_course: 47,
            ongoing_course: 10
        },
    ])

    const columns = useMemo(
        () => [
            {
                accessorKey: "id", //simple recommended way to define a column
                header: "Id",
                size: 50,
            },
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",
                size: 100,
            },
            {
                accessorKey: "major",
                header: "Major",
                size: 100
            },
            {
                accessorKey: "skills",
                header: "Skills",
                Cell: ({ cell }) => {
                    return (
                        <div className="flex flex-wrap gap-[.3vw]">
                            {cell.getValue().map((item, index) => <span key={index} className="rounded px-[.5vw] bg-gray-200">{item.name}</span>)}
                        </div>
                    )
                }
            },
            {
                accessorKey: "finished_course",
                header: "Bimbingan Selesai",
                size: 50,
            },
            {
                accessorKey: "ongoing_course",
                header: "Bimbingan Berjalan",
                size: 50,
            },
            {
                accessorKey: "id",
                id: "action",
                header: "Action",
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <ul className="flex gap-[.8vw] w-fit">
                            <li>
                                <button
                                    onClick={() => {
                                        setDataProfile(cell.row.original);
                                        setShowProfile(!showProfile);
                                    }}
                                >
                                    <FiEye className="text-[1.2vw] text-gray-500" />
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        // setDataSchedule(cell.row.original);
                                        setShowSchedule(!showSchedule);
                                    }}
                                >
                                    <FiCalendar className="text-[1.2vw] text-blue-500" />
                                </button>
                            </li>
                        </ul>
                    )
                }
            },
        ], []
    )

    const options = {
        enableTopToolbar: false,
        enableColumnActions: false,
    }

    return (
        <DashboardLayout title="Tutor" subtitle="Tutor List" role="moderator" auth={auth}>
            {isLoading && <LoadingUI />}
            <div>
                <p className="font-medium text-[1.2vw] mb-[1.2vw]">Tutor List</p>
                <div className="bg-white rounded-[1vw] p-[2vw] space-y-[1.2vw]">
                    <div className="flex gap-[.75vw]">
                        <GoalsTextInput 
                            type="text"
                            data={filterData.search}
                            setData={(i) => setFilterData('search', i)}
                            placeholder="Search"
                            className="w-[20vw]"
                            cancelButton
                        />
                        <GoalsSelectInput
                            data={filterData.major}
                            show={showForm.major}
                            setShow={(i) => setShowForm({...showForm, major: i})}
                            placeholder="Major"
                            className="font-normal text-[.83vw] w-[10vw]"
                        >
                            {majorOptions.map((item, index) => {
                                return (
                                    <GoalsSelectInputItem 
                                        key={index}
                                        onClick={() => setFilterData('major', item.major)}
                                    >
                                        {item.major}
                                    </GoalsSelectInputItem>
                                )
                            })}
                        </GoalsSelectInput>
                        <GoalsSelectInput
                            data={filterData.skill}
                            show={showForm.skill}
                            setShow={(i) => setShowForm({...showForm, skill: i})}
                            placeholder="Skill"
                            className="font-normal text-[.83vw] w-[10vw]"
                        >
                            {skillOptions.map((item, index) => {
                                return (
                                    <GoalsSelectInputItem 
                                        key={index}
                                        onClick={() => setFilterData('skill', item.skill)}
                                    >
                                        {item.skill}
                                    </GoalsSelectInputItem>
                                )
                            })}
                        </GoalsSelectInput>
                        <GoalsButton 
                            variant="info"
                        >
                            Clear
                        </GoalsButton>
                    </div>
                    <GoalsDataTable {...{data, columns, options}} />
                </div>
                <Show show={showProfile} setShow={setShowProfile} data={dataProfile} />
                <Schedule show={showSchedule} setShow={setShowSchedule} data={dataSchedule} />
            </div>
        </DashboardLayout>
    )
}

function LoadingUI () {
    return (
        <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-gray-50 bg-opacity-50 z-50">
            <img src={logo} alt="Goals Academy" className="w-[6vw] h-[6vw] animate-bounce" />
        </div>
    )
}
