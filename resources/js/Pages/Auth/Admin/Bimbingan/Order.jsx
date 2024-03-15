import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Order ({ auth }) {
    return (
        <DashboardLayout title="Bimbingan" subtitle="Order" role="admin" auth={auth}>
            <div>Order</div>
        </DashboardLayout>
    )
}
