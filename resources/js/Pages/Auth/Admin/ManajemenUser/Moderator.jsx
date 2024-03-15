import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Moderator ({ auth }) {
    return (
        <DashboardLayout title="Manajemen User" subtitle="Moderator" role="admin" auth={auth}>
            <div>Moderator</div>
        </DashboardLayout>
    )
}
