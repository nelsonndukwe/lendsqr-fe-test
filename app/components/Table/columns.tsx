
import { IoFilter } from "react-icons/io5";
import styles from "./table.module.scss";
import { ReactNode } from "react";

export type CellValue = string | number | ReactNode;

const Header = ({ label }: { label: string }) => (
    <div className={styles.header}>
        <p>{label}</p>
        <IoFilter size={16} />
    </div>
);

export const header = (): {
    accessorKey: string;
    header: () => React.JSX.Element;
}[] => {
    const tHead = [
        {
            accessorKey: "organization",
            header: () => <Header label="Organization" />,
            
        },
        {
            accessorKey: "lastName",
            header: () => <Header label="username" />,
        },
        {
            accessorKey: "email",
            header: () => <Header label="email" />,
        },
        {
            accessorKey: "phone",
            header: () => <Header label="Phone" />,
        },
        {
            accessorKey: "status",
            header: () => <Header label="Date joined" />,
        },
        {
            accessorKey: "progress",
            header: () => <Header label="Status" />,
        },
    ];

    return tHead;
};

