import Navbar from "@/app/components/Navbar.tsx/nabar";
import styles from "./scss/layout.module.scss";
import Sidebar from "@/app/components/Sidebar/sidebar";
import MobileToggle from "@/app/components/Toggle/mobile-toggle";
export default function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />

            <div className={styles.layoutWrapper}>
                <Sidebar />

                <MobileToggle />

                <div className={styles.childrenWrapper}>{children}</div>
            </div>
        </>
    );
}
