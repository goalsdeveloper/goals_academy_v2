import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Product ({ auth }) {
    return (
        <DashboardLayout title="Webinar" subtitle="Product" role="admin" auth={auth}>
            <div>Product</div>
        </DashboardLayout>
    )
}
