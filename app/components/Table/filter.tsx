import React from "react";
import styles from "./table.module.scss";
import { organizations, status } from "@/lib/data";
import { HiCalendarDays } from "react-icons/hi2";

export type FilterValues = {
    organization?: string;
    username?: string;
    email?: string;
    date?: string;
    phone?: string;
    status?: string;
};

type Props = {
    values: FilterValues;
    onChange: (key: keyof FilterValues, value: string) => void;
    onReset: () => void;
    onSubmit: () => void;
};

export const TableFilter = ({
    values,
    onChange,
    onReset,
    onSubmit,
}: Props) => {

    return (
        <div className={`${styles.container} scroll`}>
            <label>
                Organization
                <select
                    value={values.organization}
                    onChange={e => onChange("organization", e.target.value)}
                >
                    <option value="">Select</option>

                    {organizations.map((data) => (
                        <option key={data.value} value={data.value}>{data.label}</option>

                    ))}

                </select>
            </label>

            <label>
                Username
                <input
                    type="text"
                    placeholder="User"
                    value={values.username}
                    onChange={e => onChange("username", e.target.value)}
                />
            </label>

            <label>
                Email
                <input
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={e => onChange("email", e.target.value)}
                />
            </label>

            <label>
                Date
                <div className={styles.date}>
                <input
                    type="date"
                    value={values.date}
                    onChange={e => onChange("date", e.target.value)}
                />

                <HiCalendarDays className={styles.icon} size={16} />

                </div>
                
            </label>

            <label>
                Phone Number
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={values.phone}
                    onChange={e => onChange("phone", e.target.value)}
                />
            </label>

            <label>
                Status
                <select
                    value={values.status}
                    onChange={e => onChange("status", e.target.value)}
                >
                    <option value="">Select</option>

                    {status.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>

                    ))}

                </select>
            </label>

            <div className={styles.actions}>
                <button type="button" onClick={onReset} className={styles.reset}>
                    Reset
                </button>
                <button type="button" onClick={onSubmit} className={styles.submit}>
                    Filter
                </button>
            </div>
        </div>
    );
};
