import React, { Dispatch, SetStateAction } from 'react'
import { Dropdown } from '../Dropdown/dropdown'
import { organizations } from '@/lib/data'
import { GoChevronDown } from 'react-icons/go'
import Image from 'next/image'
import Link from 'next/link'
import { icons } from '@/lib/assets'
import styles from "./sidebar-sheet.module.scss"
import { useRouter } from 'next/navigation'

interface Props {
    openMobile: boolean | undefined;
    collapsed: boolean | undefined;
    selectedOrg: string;
    closeMobileSidebar: () => void;
    routes: {
        customer: string;
        routes: {
            title: string;
            href: string;
            Icon: string;
            active: boolean;
        }[];
    }[]
    setSelectedOrg: Dispatch<SetStateAction<string>>
    handleLogout: () => void
}

const SidebarSheet = ({
    openMobile,
    collapsed,
    selectedOrg,
    closeMobileSidebar,
    routes,
    setSelectedOrg,
    handleLogout
}: Props) => {
    const router = useRouter();

    return (
        <div
            className={`${styles.mobileSidebar} ${openMobile ? styles.open : styles.closed
                } scroll`}
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
                        trigger={<div onClick={closeMobileSidebar} className={styles.organization}>
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


                    <Link
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
                            <p className={styles.heading}>
                                {route.customer}
                            </p>



                            <ul>
                                {route.routes.map((r) => (
                                    <Link
                                        key={r.title}
                                        href={r.href}
                                        onClick={closeMobileSidebar}
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

    )
}

export default SidebarSheet