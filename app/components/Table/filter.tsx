import React from "react";
import styles from "./table.module.scss";

export type FilterValues = {
  organization: string;
  username: string;
  email: string;
  date: string;
  phone: string;
  status: string;
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
    <div className={styles.container}>
      {/* Organization */}
      <label>
        Organization
        <select
          value={values.organization}
          onChange={e => onChange("organization", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Org A">Org A</option>
          <option value="Org B">Org B</option>
        </select>
      </label>

      {/* Username */}
      <label>
        Username
        <input
          type="text"
          placeholder="User"
          value={values.username}
          onChange={e => onChange("username", e.target.value)}
        />
      </label>

      {/* Email */}
      <label>
        Email
        <input
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={e => onChange("email", e.target.value)}
        />
      </label>

      {/* Date */}
      <label>
        Date
        <input
          type="date"
          value={values.date}
          onChange={e => onChange("date", e.target.value)}
        />
      </label>

      {/* Phone */}
      <label>
        Phone Number
        <input
          type="tel"
          placeholder="Phone Number"
          value={values.phone}
          onChange={e => onChange("phone", e.target.value)}
        />
      </label>

      {/* Status */}
      <label>
        Status
        <select
          value={values.status}
          onChange={e => onChange("status", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </label>

      {/* Actions */}
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
