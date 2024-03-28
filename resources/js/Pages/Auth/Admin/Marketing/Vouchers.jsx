import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Vouchers ({ auth }) {
    return (
        <DashboardLayout title="Marketing" subtitle="Vouchers" role="admin" auth={auth}>
            <div>Vouchers</div>
        </DashboardLayout>
    )
}
