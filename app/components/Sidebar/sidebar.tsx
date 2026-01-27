"use client";

import { useDashboardState } from "@/hooks/use-dashboard";
import { getRoutes } from "@/lib/data";
import Image from "next/image";
import styles from "./sidebar.module.scss";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { icons } from "@/lib/assets";

const Sidebar = () => {
    const {
        isMobile,
        open,
        openMobile,
        toggleSidebar,
        toggleMobileSidebar,
        closeMobileSidebar,
    } = useDashboardState();
    const pathName = usePathname();
    const { orgId } = useParams();
    const state = isMobile ? openMobile : open;

    console.log({ orgId });
    const routes = getRoutes(orgId, pathName);
    return (
        <div
            className={`${styles.dashboard} ${
                state ? styles.open : ""
            } scroll dark`}
        >
            <div
                onClick={toggleSidebar}
               
            >
                <p
                    className={`${styles.primary} ${
                        state ? styles.open : styles.closed
                    }`}
                >
                    Untitled UI
                </p>

                <Link href={""} className={styles.homeLink}>
                    <div>
                        <Image
                            src={icons.dashboard}
                            alt="icon"
                            width={16}
                            height={16}
                        />
                        <p>Dashboard</p>
                    </div>
                </Link>

                {/* <p
                    className={`${styles.secondary} ${
                        state ? styles.open : styles.closed
                    }`}
                >
                    UI
                </p> */}
            </div>

            <div className={styles.menuSection}>
                {routes.map((route) => (
                    <div key={route.customer} className={styles.menuGroup}>
                        <p className={styles.heading}>{route.customer}</p>

                        <ul>
                            {route.routes.map((r) => (
                                <Link
                                    key={r.title}
                                    href={r.href}
                                    className={r.active ? styles.active : ""}
                                >
                                    <div>
                                        <Image
                                            src={r.Icon}
                                            alt="icon"
                                            width={16}
                                            height={16}
                                        />
                                        <p>{r.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className={styles.sidebarFooter}>
                <div>Footer</div>
            </div>
        </div>
    );
};

export default Sidebar;
