import { useState, useRef, useEffect, ReactElement, cloneElement } from "react";
import styles from "./dropdown.module.scss";

export type DropdownOption<T = string> = {
    label: string;
    value: T;
    icon?: string;
    href?:string
};

type DropdownProps<T> = {
    options: DropdownOption<T>[];
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    trigger?: ReactElement<{ onClick?: () => void }>;
    onPress?: () => void;
    renderOption?: (option: DropdownOption<T>, selected: boolean) => React.ReactNode;
};

export function Dropdown<T>({
    options,
    value,
    onChange,
    placeholder = "Select",
    disabled = false,
    children,
    trigger,
    onPress,
    renderOption
}: DropdownProps<T>) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOpen = () => {
        if (!disabled) setOpen(prev => !prev);
    };

    const renderTrigger = () => {
        if (trigger) {
            return cloneElement(trigger, {
                onClick: () => {
                    toggleOpen();
                }
            });
        }

        return (
            <button
                className={`${styles.dropdown__trigger}`}
                onClick={toggleOpen}
                type="button"
            >
                {selected?.label || placeholder}
                <span className={`${styles.dropdown__arrow} ${open ? styles.active : ""}`}>
                    ▾
                </span>
            </button>
        );
    };

    return (
        <div ref={ref} className={`${styles.dropdown} ${disabled ? styles.disabled : ""}`}>
            {renderTrigger()}

            {open && (
                <ul className={styles.dropdown__menu}>
                    {options.map(option => {
                        const isSelected = option.value === value;
                        const handleClick = onPress
                            ? () => { onPress(); setOpen(false); }
                            : () => { onChange(option.value); setOpen(false); };

                        return (
                            <li
                                key={String(option.value)}
                                className={`${styles.dropdown__item} ${isSelected ? styles.active : ""}`}
                                onClick={handleClick}
                            >
                                {renderOption
                                    ? renderOption(option, isSelected)
                                    : children
                                        ? children
                                        : option.label}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
