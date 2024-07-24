import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Job ({ auth }) {
    return (
        <DashboardLayout title="Career" subtitle="Job" role="admin" auth={auth}>
            <div>Job</div>
        </DashboardLayout>
    )
}
