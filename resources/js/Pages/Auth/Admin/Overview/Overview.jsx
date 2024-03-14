import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Overview ({ auth }) {
    return (
        <DashboardLayout title="Overview" role="admin" auth={auth}></DashboardLayout>
    )
}
