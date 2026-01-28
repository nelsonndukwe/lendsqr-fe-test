"use client";

import { useDashboardState } from "@/hooks/use-dashboard";
import { getRoutes, organizations } from "@/lib/data";
import Image from "next/image";
import styles from "./sidebar.module.scss";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { icons } from "@/lib/assets";
import { ChangeEvent, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const Sidebar = () => {
    const [selectedOrg, setSelectedOrg] = useState("");
    const router = useRouter();
    const {
        isMobile,
        open,
        openMobile,
        toggleSidebar,
        toggleMobileSidebar,
        closeMobileSidebar,
    } = useDashboardState();

    const [storedValue, setValue, removeItem, clearStorage, getKey] =
        useLocalStorage("user", null);
    const pathName = usePathname();
    const { orgId } = useParams();
    const state = isMobile ? true : open;

    const routes = getRoutes(orgId, pathName);

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        const target = event.target as HTMLSelectElement;

        setSelectedOrg(target.value);
    }

    function handleLogout() {
        clearStorage();

        router.push("/");
    }
    return (
        <div
            className={`${styles.sidebar} ${
                state ? styles.open : ""
            } scroll dark`}
        >
            <div className={styles.sidebarWrapper}>
                <div
                    onClick={toggleSidebar}
                    className={`${styles.sidebarHeader} ${
                        state ? styles.closed : ""
                    }`}
                >
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

                    <Link href={""} className={styles.homeLink}>
                        <Image
                            src={icons.dashboard}
                            alt="icon"
                            width={16}
                            height={16}
                            loading="eager"
                        />
                        <p>Dashboard</p>
                    </Link>
                </div>

                <div className={`${styles.menuSection} scroll`}>
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

                <div
                    className={`${styles.sidebarFooter} ${
                        state ? styles.closed : ""
                    }`}
                >
                    <div onClick={handleLogout}>
                        <Image
                            src={icons.logout}
                            alt="icon"
                            width={16}
                            height={16}
                        />
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
