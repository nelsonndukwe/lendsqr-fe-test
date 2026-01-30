"use client"

import { useState } from "react";
import { CustomerTabs } from "./tabs"
import { DetailsSection } from "./detail-section";
import { generalDetails } from "@/lib/data";


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
    return (<div><div className=""></div>



        <CustomerTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
        />

        {activeTab === "general" && (
            <DetailsSection sections={generalDetails} />
        )}


    </div>)
}
export default UserDetailsPage