import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Place ({ auth }) {
    return (
        <DashboardLayout title="Bimbingan" subtitle="Place" role="admin" auth={auth}>
            <div>Place</div>
        </DashboardLayout>
    )
}
