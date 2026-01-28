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

    const routes = getRoutes(orgId, pathName);
    console.log({ routes });

    return (
        <div
            className={`${styles.dashboard} ${
                state ? styles.open : ""
            } scroll dark`}
        >
            <div className={styles.sidebarWrapper}>
                <div onClick={toggleSidebar} className={`${styles.sidebarHeader} ${state ? styles.closed : ""}`}>
                        <div className={styles.organization}>
                            <Image
                                src={icons.organizations}
                                alt="icon"
                                width={16}
                                height={16}
                                loading="eager"
                            />
                            <p>Switch organization</p>
                        </div>
             

                    <Link href={""} className={!state ? styles.homeLink : styles.closed}>
                        <div>
                            <Image
                                src={icons.dashboard}
                                alt="icon"
                                width={16}
                                height={16}
                                loading="eager"
                            />
                            <p>Dashboard</p>
                        </div>
                    </Link>
                </div>

                <div className={styles.menuSection}>
                    {routes.map((route) => (
                        <div key={route.customer} className={styles.menuGroup}>
                            {state === false && (
                                <p className={styles.heading}>
                                    {route.customer}
                                </p>
                            )}

                            <ul>
                                {route.routes.map((r) => (
                                    <Link
                                        key={r.title}
                                        href={r.href}
                                        className={`${
                                            r.active ? styles.active : ""
                                        } ${
                                            state ? styles.closed : styles.open
                                        }`}
                                    >
                                        <div className={styles.menuItem}>
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
        </div>
    );
};

export default Sidebar;
