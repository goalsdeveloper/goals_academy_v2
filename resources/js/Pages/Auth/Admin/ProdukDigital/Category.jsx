import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Category ({ auth }) {
    return (
        <DashboardLayout title="Produk Digital" subtitle="Category" role="admin" auth={auth}>
            <div>Category</div>
        </DashboardLayout>
    )
}
