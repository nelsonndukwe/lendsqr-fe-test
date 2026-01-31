
"use client"
import { useDashboardState } from '@/hooks/use-dashboard';
import { LuColumns2 } from 'react-icons/lu'
import styles from "../../(dashboard)/dashboard/[orgId]/scss/layout.module.scss"

const MobileToggle = () => {
    const {
        isMobile,
        open,
        openMobile,
        toggleSidebar,
        toggleMobileSidebar,
        closeMobileSidebar,
    } = useDashboardState();

    console.log({openMobile})


    return (
        <button
            onClick={() => toggleSidebar()}
            className={styles.floatingButton}
        >
            <LuColumns2 size={24} />
        </button>
    )
}

export default MobileToggle




