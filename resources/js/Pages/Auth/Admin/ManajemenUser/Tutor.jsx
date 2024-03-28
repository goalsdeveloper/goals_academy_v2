import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Tutor ({ auth }) {
    return (
        <DashboardLayout title="Manajemen User" subtitle="Tutor" role="admin" auth={auth}>
            <div>Tutor</div>
        </DashboardLayout>
    )
}
