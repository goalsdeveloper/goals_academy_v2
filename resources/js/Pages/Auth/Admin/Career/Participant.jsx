import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Participant ({ auth }) {
    return (
        <DashboardLayout title="Career" subtitle="Participant" role="admin" auth={auth}>
            <div>Participant</div>
        </DashboardLayout>
    )
}
