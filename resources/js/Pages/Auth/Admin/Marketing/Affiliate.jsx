import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Affiliate ({ auth }) {
    return (
        <DashboardLayout title="Marketing" subtitle="Affiliate" role="admin" auth={auth}>
            <div>Affiliate</div>
        </DashboardLayout>
    )
}
