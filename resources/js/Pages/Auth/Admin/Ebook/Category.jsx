import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Category ({ auth }) {
    return (
        <DashboardLayout title="E-book" subtitle="Category" role="admin" auth={auth}>
            <div>Category</div>
        </DashboardLayout>
    )
}
