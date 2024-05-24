import { useState, useMemo } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import GoalsDataTable from "@/Components/elements/GoalsDataTable";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";
import { FiEye, FiCalendar } from "react-icons/fi";
import Show from "./TutorList/Show";
import Schedule from "./TutorList/ShowSchedule";
import logo from "/resources/img/icon/goals-5.svg";
import moment from "moment";
import { createPortal } from "react-dom";
import BottomPaginationTable from "@/Components/fragments/BottomTablePagination";
import { useEffect } from "react";
import { getPaginationPages } from "@/script/utils";

export default function TutorList({ auth, tutors, majors, skills }) {
    const { data, total, from, to, current_page, per_page, last_page, links } =
        tutors;

    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState(
        new URLSearchParams(window.location.search).get("search")
    );

    useEffect(() => {
        setPages(getPaginationPages({ links, current_page, last_page }));
    }, [current_page]);
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
        ongoing_course: 0,
    });
    const [dataSchedule, setDataSchedule] = useState([{}]);
    const [tutorId, setTutorId] = useState(0);
    const [dateRange, setDateRange] = useState({
        start_date: moment().format("YYYY-MM-DD"),
        end_date: moment().add(6, "days").format("YYYY-MM-DD"),
    });
    console.log(dateRange);

    const [showForm, setShowForm] = useState({
        major: false,
        skill: false,
    });

    const {
        data: filterData,
        setData: setFilterData,
        post,
    } = useForm({
        search: new URLSearchParams(window.location.search).get("search") ?? "",
        major: new URLSearchParams(window.location.search).get("major") ?? "",
        skill: new URLSearchParams(window.location.search).get("skill") ?? "",
    });
    // const [data, setData] = useState(tutors);
    const getDataSchedule = (tutor_id, start_date, end_date) => {
        setIsLoading(true);
        fetch(
            route("moderator.tutor.tutorSchedule", {
                tutor: tutor_id,
                start_date: start_date,
                end_date: end_date,
            })
        )
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res.schedules[0]);
                setDataSchedule(res.schedules);
                setIsLoading(false);
            });
    };
    const handleDateChange = (start_date, end_date) => {
        console.log(start_date, end_date);
        setDateRange({
            ...{ start_date, end_date },
        });
        getDataSchedule(tutorId, start_date, end_date);
    };

    const filterHandler = () => {
        router.visit(
            route("moderator.tutor.tutor_list.index", {
                search: filterData.search,
                major: filterData.major,
                skill: filterData.skill,
            }),
            {
                only: ["tutors"],
                onSuccess: () => setIsLoading(false),
            }
        );
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",
                size: 100,
            },
            {
                accessorKey: "profile.major",
                header: "Major",
                size: 100,
            },
            {
                accessorKey: "skills",
                header: "Skills",
                Cell: ({ cell }) => {
                    return (
                        <div className="flex flex-wrap gap-[.3vw]">
                            {cell.getValue().map((item, index) => (
                                <span
                                    key={index}
                                    className="rounded px-[.5vw] bg-gray-200"
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    );
                },
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
                                        getDataSchedule(
                                            cell.row.original.id,
                                            dateRange.start_date,
                                            dateRange.end_date
                                        );
                                        setTutorId(cell.row.original.id);
                                        setShowSchedule(!showSchedule);
                                    }}
                                >
                                    <FiCalendar className="text-[1.2vw] text-blue-500" />
                                </button>
                            </li>
                        </ul>
                    );
                },
            },
        ],
        []
    );

    const options = {
        enableTopToolbar: false,
        enableColumnActions: false,
    };

    return (
        <DashboardLayout
            title="Tutor"
            subtitle="Tutor List"
            role="moderator"
            auth={auth}
        >
            {isLoading && <LoadingUI />}
            <div>
                <p className="font-medium text-[1.2vw] mb-[1.2vw]">
                    Tutor List
                </p>
                <div className="bg-white rounded-[1vw] p-[2vw] space-y-[1.2vw]">
                    <div className="flex gap-[.75vw]">
                        <GoalsTextInput
                            type="text"
                            data={filterData.search}
                            setData={(i) => setFilterData("search", i)}
                            placeholder="Search"
                            className="w-[20vw]"
                            cancelButton
                        />
                        <GoalsSelectInput
                            data={filterData.major}
                            show={showForm.major}
                            setShow={(i) =>
                                setShowForm({ ...showForm, major: i })
                            }
                            placeholder="Major"
                            className="font-normal text-[.83vw] w-[10vw]"
                        >
                            {majors.map((item, index) => {
                                return (
                                    <GoalsSelectInputItem
                                        key={index}
                                        onClick={() => {
                                            setFilterData("major", item.major);
                                        }}
                                    >
                                        {item.major}
                                    </GoalsSelectInputItem>
                                );
                            })}
                        </GoalsSelectInput>
                        <GoalsSelectInput
                            data={filterData.skill}
                            show={showForm.skill}
                            setShow={(i) =>
                                setShowForm({ ...showForm, skill: i })
                            }
                            placeholder="Skill"
                            className="font-normal text-[.83vw] w-[10vw]"
                        >
                            {skills.map((item, index) => {
                                return (
                                    <GoalsSelectInputItem
                                        key={index}
                                        onClick={() =>
                                            setFilterData("skill", item.name)
                                        }
                                    >
                                        {item.name}
                                    </GoalsSelectInputItem>
                                );
                            })}
                        </GoalsSelectInput>
                        <GoalsButton
                            variant="info"
                            onClick={() => {
                                setIsLoading(true);
                                filterHandler();
                            }}
                        >
                            Submit
                        </GoalsButton>
                        <GoalsButton
                            variant="info"
                            onClick={() =>
                                setFilterData({
                                    ...filterData,
                                    search: "",
                                    major: "",
                                    skill: "",
                                })
                            }
                        >
                            Clear
                        </GoalsButton>
                    </div>
                    <GoalsDataTable {...{ data, columns, options }} />
                    <div>
                        <BottomPaginationTable
                            {...{
                                from,
                                to,
                                total,
                                pages,
                                per_page,
                                current_page,
                                keyword,
                            }}
                        />
                    </div>
                </div>
                <Show
                    show={showProfile}
                    setShow={setShowProfile}
                    data={dataProfile}
                />
                <Schedule
                    show={showSchedule}
                    setShow={setShowSchedule}
                    dataSchedule={dataSchedule}
                    dateRange={dateRange}
                    handleDateChange={handleDateChange}
                />
            </div>
        </DashboardLayout>
    );
}

function LoadingUI() {
    return (
        <div>
            {createPortal(
                <div className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-gray-50 bg-opacity-50 z-[1000]">
                    <img
                        src={logo}
                        alt="Goals Academy"
                        className="w-[6vw] h-[6vw] animate-bounce"
                    />
                </div>,
                document.body
            )}
        </div>
    );
}
