import GoalsButton from "@/Components/elements/GoalsButton";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Category ({ auth }) {
    return (
        <DashboardLayout title="Bimbingan" subtitle="Category" role="admin" auth={auth}>
            <div>Category</div>
        </DashboardLayout>
    )
}
