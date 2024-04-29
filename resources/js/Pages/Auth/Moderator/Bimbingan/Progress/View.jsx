import DashboardLayout from "@/Layouts/DashboardLayout";
import Breadcrumb from "@/Pages/Auth/Admin/components/Breadcrumb";
import GoalsButton from "@/Components/elements/GoalsButton";
import React from "react";
import { router } from "@inertiajs/react";

export default function View({ auth, progress }) {
    console.log(progress);

    return (
        <DashboardLayout
            title="Bimbingan"
            subtitle="Progress"
            role="moderator"
            auth={auth}
        >
            {/* {isLoading && <LoadingUI />} */}
            <div className="space-y-[1.6vw]">
                <div className="flex justify-between items-center">
                    <Breadcrumb level={2} overrideLast="View"/>

                    <div className="space-x-[.8vw]">
                        <GoalsButton
                            variant="success-bordered"
                            size="sm"
                            onClick={() =>
                                router.replace(
                                    route("moderator.bimbingan.progress.index")
                                )
                            }
                        >
                            Batal
                        </GoalsButton>
                        <GoalsButton
                            variant="success"
                            size="sm"
                            onClick={() =>
                                post(
                                    "moderator.bimbingan.progress.updateOnline",
                                    {
                                        data: data,
                                    }
                                )
                            }
                        >
                            Simpan
                        </GoalsButton>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
