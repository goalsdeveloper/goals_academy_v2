import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Topic ({ auth }) {
    return (
        <DashboardLayout title="Bimbingan" subtitle="Topic" role="admin" auth={auth}>
            <div>Topic</div>
        </DashboardLayout>
    )
}
