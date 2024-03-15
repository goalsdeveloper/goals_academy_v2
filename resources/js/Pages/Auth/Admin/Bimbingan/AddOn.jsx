import DashboardLayout from "@/Layouts/DashboardLayout";

export default function AddOn ({ auth }) {
    return (
        <DashboardLayout title="Bimbingan" subtitle="Add-On" role="admin" auth={auth}>
            <div>Add-On</div>
        </DashboardLayout>
    )
}
