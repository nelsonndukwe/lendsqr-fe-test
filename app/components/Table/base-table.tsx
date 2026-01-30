"use client";
import { User } from "@/types";
import { header } from "./columns";
import styles from "./table.module.scss";
import Status from "./status";
import { useState } from "react";
import { Dropdown } from "../Dropdown/dropdown";
import { icons } from "@/lib/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "../Loader/loader";



const MyTable = ({ users, loading }: { users: User[], loading: boolean }) => {
    const [selected, setSelected] = useState("")
    const router = useRouter()
    return (
        <div className={`${styles.tableCard} scroll`}>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        {header().map((item) => (
                            <th key={item.accessorKey}>{item.header()}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>

                    {loading ?
                        <div className={styles.loader}>
                            <Loader />
                        </div>

                        : users && users.length !== 0 ?
                            users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.organization}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.dateJoined}</td>
                                        <td>
                                            <Status variant={user.status} />
                                        </td>
                                        <td className={styles.actions}>

                                            <Dropdown<string>
                                                options={[
                                                    { value: "view-user", label: "View Details ", icon: icons.viewUser, href: `/dashboard/${user.id}/users/${user.username}` },
                                                    { value: "blacklist-user", label: "Blacklist user", icon: icons.blackListUser, href: `/dashboard/${user.id}/blacklist` },
                                                    { value: "whitelist-user", label: "whitelist user", icon: icons.whiteListUser, href: `/dashboard/${user.id}/whitelist` }

                                                ]}
                                                value={selected}
                                                onChange={setSelected}
                                                trigger={<p className={styles.triggerElement}>:</p>}

                                                renderOption={(option) => (
                                                    <div onClick={() => {
                                                        if (option.href) router.push(option.href)

                                                        return
                                                    }} className={styles.render}>
                                                        <Image src={option.icon as string} alt="icon" width={14} height={14} />
                                                        <span>{option.label}</span>
                                                    </div>
                                                )}
                                            />
                                        </td>
                                    </tr>

                                )
                            }) :
                            <div className="">You have no users</div>

                    }


                </tbody>
            </table>
        </div>
    );
};

export default MyTable;
