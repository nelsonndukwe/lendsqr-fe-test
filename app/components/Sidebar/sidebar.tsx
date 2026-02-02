"use client";

import { getRoutes, organizations } from "@/lib/data";
import Image from "next/image";
import styles from "./sidebar.module.scss";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { icons } from "@/lib/assets";
import { useContext, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Dropdown } from "../Dropdown/dropdown";
import { GoChevronDown } from "react-icons/go";
import SidebarSheet from "../SidebarSheet/sidebar-sheet";
import { DashboardContext } from "@/app/context/dashboard.context";


const Sidebar = () => {
    const [selectedOrg, setSelectedOrg] = useState("");
    const router = useRouter();
    const dashboardContext = useContext(DashboardContext);

    const user =
        useLocalStorage("user", null);
    const pathName = usePathname();
    const { orgId } = useParams();

    const routes = getRoutes(orgId, pathName);

    function handleLogout() {
        user[3]();

        router.push("/");
    }
    if (!dashboardContext) {
        throw new Error("useDashboard must be used inside DashboardProvider");
    }

    const isDesktopCollapsed = !dashboardContext.isMobile && dashboardContext.open;
    const collapsed = isDesktopCollapsed;
    const isMobileSidebarOpen = dashboardContext.isMobile && dashboardContext.openMobile



    return (

        <>
            {isMobileSidebarOpen && (
                <div
                    className={styles.backdrop}
                    onClick={dashboardContext.closeMobileSidebar}
                />
            )}

            <SidebarSheet openMobile={isMobileSidebarOpen}
                collapsed={collapsed}
                selectedOrg={selectedOrg}
                closeMobileSidebar={dashboardContext.closeMobileSidebar}
                routes={routes}
                setSelectedOrg={setSelectedOrg}
                handleLogout={handleLogout}

            />


            <div
                className={`
      ${styles.sidebar}
      ${collapsed ? styles.closed : ""}
      scroll dark
    `}
            >




                <div className={styles.sidebarWrapper}>
                    <div
                        className={`${styles.sidebarHeader} ${collapsed ? styles.closed : ""
                            }`}
                    >



                        <Dropdown
                            options={organizations}
                            placeholder="Switch organization"
                            value={selectedOrg}
                            onChange={setSelectedOrg}
                            trigger={<div onClick={dashboardContext.closeMobileSidebar} className={styles.organization}>
                                <Image
                                    src={icons.organizations}
                                    alt="icon"
                                    width={16}
                                    height={16}
                                    loading="eager"
                                />
                                <p>{selectedOrg === "" ? "Switch organization" : selectedOrg}</p> <div>
                                    <GoChevronDown className={styles.icon} />
                                </div>
                            </div>}

                            renderOption={(Option) => (
                                <div onClick={() => {
                                    if (Option.href) router.push(Option.href)

                                    return
                                }} className={styles.render}>
                                    <span>{Option.label}</span>
                                </div>
                            )}

                        />


                        <Link onClick={dashboardContext.toggleSidebar}
                            href={""} className={styles.homeLink}>
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
                                {!collapsed && (
                                    <p className={styles.heading}>
                                        {route.customer}
                                    </p>
                                )}


                                <ul>
                                    {route.routes.map((r) => (
                                        <Link
                                            key={r.title}
                                            href={r.href}
                                            onClick={dashboardContext.closeMobileSidebar} // close overlay on mobile
                                            className={`
                                         ${r.active ? styles.active : ""}
                                         ${collapsed ? styles.closed : styles.open}
                                       `}
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
                        className={`${styles.sidebarFooter} ${collapsed ? styles.closed : ""
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
        </>



    );
};

export default Sidebar;
