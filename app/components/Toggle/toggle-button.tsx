"use client"

import { LuColumns2 } from "react-icons/lu";
import styles from "../../(dashboard)/dashboard/[orgId]/scss/layout.module.scss"
import { useContext } from "react";
import { DashboardContext } from "@/app/context/dashboard.context";

const ToggleSideBar = () => {

    const dashboardContext = useContext(DashboardContext);

    if (!dashboardContext) {
        throw new Error("useDashboard must be used inside DashboardProvider");
    }


    return (

        <>

           


            <button
                onClick={() => dashboardContext.toggleMobileSidebar()}
                className={styles.togglebar}
            >
                <LuColumns2 size={25} />
            </button>
        </>

    )
}

export default ToggleSideBar