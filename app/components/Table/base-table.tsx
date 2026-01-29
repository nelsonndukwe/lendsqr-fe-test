"use client";
import { User } from "@/types";
import { header } from "./columns";
import styles from "./table.module.scss";
import Status from "./status";



const MyTable = ({ users, loading }: { users: User[], loading: boolean }) => {
    return (
        <div className={styles.tableCard}>
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
                        <div className="">Loading</div>

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
                                        <td className={styles.actions}>⋮</td>
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
