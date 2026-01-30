"use client"

import { useEffect, useMemo, useState } from "react";
import { CustomerTabs } from "./tabs"
import { DetailsSection } from "./detail-section";
import { formatGeneralDetails } from "@/helpers";
import { User } from "@/types";
import { getUsers } from "@/app/actions/sign-in";
import { useParams } from "next/navigation";
import Loader from "../Loader/loader";
import loaderStyles from "../Loader/loader.module.scss"
import { tabs } from "@/lib/data";
import { HiArrowLongLeft } from "react-icons/hi2";
import styles from "./tabs.module.scss"
import Link from "next/link";

const UserDetailsPage = () => {
    const [activeTab, setActiveTab] = useState("general");
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState<"success" | "error" | "idle">();
    const params = useParams()
    const userId = params.userId;
    const orgId = params.orgId

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getUsers();
                setData(data);

                setLoading(false);
                setResponse("success");
            } catch (error) {
                setResponse("error");
            }
        };

        fetchData();
    }, []);

    const selectedUser = useMemo(() => {
        if (!userId) return undefined;
        return data.find((user) => user.username === userId);
    }, [data, userId]);

    return (<div className={styles.tabsContainer}>
        <div className={styles.heading}>
            <Link href={`/dashboard/${orgId}/users`} className={styles.arrow}>
                <HiArrowLongLeft size={30} />
                <span >Back to Users</span>
            </Link>


            <div className={styles.secondaryHeader}>

                <p >User Details</p>


                <div className={styles.buttonWrapper}>
                    <button className={styles.blacklist}>Blacklist User</button>
                    <button className={styles.activate}>Activate User</button>
                </div>

            </div>
        </div>


        {loading ? (
            <div className={loaderStyles.loader}>
                <Loader /> </div>
        ) : (
            <>
                <CustomerTabs
                    user={selectedUser}
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {activeTab === "general" && selectedUser && (
                    <DetailsSection
                        sections={formatGeneralDetails(selectedUser as User)}
                    />
                )}
            </>
        )}


    </div>)
}
export default UserDetailsPage