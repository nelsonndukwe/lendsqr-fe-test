
import { ReactNode } from "react";
import styles from "./tabs.module.scss"


export type DetailItem = {
    label: string;
    value: ReactNode;
};

export type DetailSection = {
    title: string;
    items: DetailItem[];
};


type DetailsSectionProps = {
    sections: DetailSection[];
};

export function DetailsSection({ sections }: DetailsSectionProps) {
    return (
        <div className={styles.detailsWrapper}>
            {sections.map((section, index) => (
                <div key={section.title} className={styles.detailsSection}>
                    <p className={styles.c}>{section.title}</p>

                    <div className={styles.detailsGrid}>
                        {section.items.map((item, index) => (
                            <div key={item.label} className={styles.detailItem}>
                                <span className={styles.label}>{item.label}</span>
                                <span className={styles.value}>{item.value}</span>
                                {/* {section.title === "Guarantors" && index !== section.items.length - 1 && <hr />} */}

                            </div>
                        ))}

                    </div>
                    {index !== sections.length - 1 && <hr />}
                </div>
            ))}
        </div>
    );
}
