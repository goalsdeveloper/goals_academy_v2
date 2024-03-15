import { useState } from "react";
import GoalsButton from "@/Components/elements/GoalsButton";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { FaRegCalendar } from "react-icons/fa6";

export default function Overview ({ auth }) {
    const labels = ['29', '30', '31', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', ];

    const [dataset1, setDataset1] = useState(labels.map(i => faker.datatype.number({ min: 0, max: 10000000 })))
    const [dataset2, setDataset2] = useState(labels.map(i => faker.datatype.number({ min: 0, max: 10000000 })))

    ChartJS.register(
        Title,
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
        Legend,
    );

    const options = {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
            position: 'left'
          },
          legend: {
            align: 'end',
            reverse: true,
            boxWidth: 20,
            boxHeight: 20,
          }
        },
        aspectRatio: 3.58,
        responsive: true,
        borderRadius: 1000,
        barThickness: 6,
        scales: {
          x: {
            stacked: true,
            ticks: {
                color: "#A6A6A6",
                maxRotation: 0,
            },
            grid: {
                display: false,
            },
          },
          y: {
            stacked: true,
            ticks: {
                display: false,
            },
          },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Clicks',
                data: dataset1,
                backgroundColor: '#5A6ACF',
            },
            {
                label: 'Views',
                data: dataset2,
                backgroundColor: '#FF8854',
            },
        ],
    };

    return (
        <DashboardLayout title="Overview" role="admin" auth={auth}>
            <div className="flex justify-end mb-[2vw]">
                <GoalsButton variant="default" className="relative md:px-[1.25vw] md:py-[.625vw] flex items-center gap-[.5vw] md:text-[.73vw]">
                    <FaRegCalendar className="text-[1vw]" /> Select Date
                </GoalsButton>
            </div>
            <div className="flex flex-col gap-[.73vw]">
                <div className="flex justify-between">
                    {/* h-[15.53vw] */}
                    <Card className="w-[50vw] h-[15.53vw]">
                        <Bar options={options} data={data} />
                    </Card>
                    <div className="w-[25.1vw] grid grid-cols-2 gap-[.94vw]">
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Card className="w-[52.4vw] h-[20.16vw]"></Card>
                    <Card className="w-[23vw]"></Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

function Card ({ className, ...props }) {
    return (
        <div {...props} className={`bg-white shadow-bottom-right rounded-[.625vw] py-[1.25vw] px-[1.67vw] ${className}`}></div>
    )
}
