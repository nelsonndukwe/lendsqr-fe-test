import Navbar from "@/app/components/Navbar.tsx/nabar";
import styles from "./scss/layout.module.scss";
import Sidebar from "@/app/components/Sidebar/sidebar";
import ToggleSideBar from "@/app/components/Toggle/toggle-button";
import { DashboardProvider } from "@/app/context/providers/dashboard.provider";
export default function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <DashboardProvider>

                <div className={styles.layoutWrapper}>
                    <Sidebar />


                    <ToggleSideBar />
                    <div className={styles.childrenWrapper}>{children}</div>
                </div>
            </DashboardProvider>
        </>
    );
}
