
import styles from "./tabs.module.scss"


export type DetailItem = {
    label: string;
    value: React.ReactNode;
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
            {sections.map(section => (
                <div key={section.title} className={styles.detailsSection}>
                    <h3 className={styles.sectionTitle}>{section.title}</h3>

                    <div className={styles.detailsGrid}>
                        {section.items.map(item => (
                            <div key={item.label} className={styles.detailItem}>
                                <span className="label">{item.label}</span>
                                <span className="value">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
