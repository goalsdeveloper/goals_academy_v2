import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Category ({ auth }) {
    return (
        <DashboardLayout title="E-course" subtitle="Category" role="admin" auth={auth}>
            <div>Category</div>
        </DashboardLayout>
    )
}
