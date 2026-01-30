"use client"

import { useState } from "react";
import { CustomerTabs } from "./tabs"
import { DetailsSection } from "./detail-section";
import { formatGeneralDetails } from "@/helpers";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types";


const tabs = [
    { id: "general", label: "General Details" },
    { id: "documents", label: "Documents" },
    { id: "bank", label: "Bank Details" },
    { id: "loans", label: "Loans" },
    { id: "savings", label: "Savings" },
    { id: "system", label: "App and System" },
];

const UserDetailsPage = () => {
    const [activeTab, setActiveTab] = useState("general");
    const [user] = useLocalStorage<User>("user", undefined)


    return (<div><div className=""></div>



        <CustomerTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
        />

        {activeTab === "general" && (
            <DetailsSection sections={formatGeneralDetails(user as User)} />
        )}


    </div>)
}
export default UserDetailsPage