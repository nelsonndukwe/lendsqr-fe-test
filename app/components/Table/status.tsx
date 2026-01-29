"use client";
import styles from "./table.module.scss";

type StatusVariant = "Active" | "Inactive" | "Pending" | "Blacklisted";

interface StatusProps {
    variant: StatusVariant;
}

const styleMap: Record<StatusVariant, keyof typeof styles> = {
    Active: "active",
    Inactive: "inactive",
    Pending: "pending",
    Blacklisted: "blacklisted",
};

const Status = ({ variant }: StatusProps) => {
    return (
        <div className={`${styles.status} ${styles[styleMap[variant]]}`}>
            <p >{variant}</p>
        </div>
    );
};

export default Status;
