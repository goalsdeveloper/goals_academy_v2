import DashboardLayout from "@/Layouts/DashboardLayout";

export default function User ({ auth }) {
    return (
        <DashboardLayout title="Manajemen User" subtitle="User" role="admin" auth={auth}>
            <div>User</div>
        </DashboardLayout>
    )
}
