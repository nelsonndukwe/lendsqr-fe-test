
import { IoFilter } from "react-icons/io5";
import styles from "./table.module.scss";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type CellValue = string | number | ReactNode;

const Header = ({ label, onClick }: { label: string, onClick: () => void }) => (
    <div className={styles.header}>
        <p>{label}</p>
        <IoFilter size={16} onClick={onClick} />
    </div>
);

export const header = (openFilter: boolean,
    setOpenFilter: Dispatch<SetStateAction<boolean>>): {
        accessorKey: string;
        header: () => React.JSX.Element;
    }[] => {
    const tHead = [
        {
            accessorKey: "organization",
            header: () => <Header label="Organization"


                onClick={() =>
                    setOpenFilter((prev)=> !prev)
                } />,

        },
        {
            accessorKey: "lastName",
            header: () => <Header label="username"
                onClick={() =>
                    setOpenFilter((prev)=> !prev)
                } />,
        },
        {
            accessorKey: "email",
            header: () => <Header label="email"
                onClick={() =>
                    setOpenFilter((prev)=> !prev)
                } />,
        },
        {
            accessorKey: "phone",
            header: () => <Header label="Phone"
                onClick={() =>
                    setOpenFilter((prev)=> !prev)
                } />,
        },
        {
            accessorKey: "status",
            header: () => <Header label="Date joined"
                onClick={() =>
                    setOpenFilter((prev)=> !prev)
                } />,
        },
        {
            accessorKey: "progress",
            header: () => <Header label="Status"
                onClick={() =>
                    setOpenFilter((prev)=> !prev)
                } />,
        },
    ];

    return tHead;
};

