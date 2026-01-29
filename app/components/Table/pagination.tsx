import { getPaginationRange } from '@/helpers'
import styles from "./table.module.scss"
type PaginationProps = {
    totalItems: number
    pageSize: number
    currentPage: number
    onPageChange: (page: number) => void
}

const Pagination = ({
    totalItems,
    pageSize,
    currentPage,
    onPageChange,
}: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / pageSize)
    const pages = getPaginationRange(currentPage, totalPages)

    return (
        <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
                <span>Showing</span>
                <select className={styles.paginationSelect}>
                    <option>{pageSize}</option>
                </select>
                <span>out of {totalItems}</span>
            </div>

            <div className={styles.paginationControls}>
                <button
                    className={styles.paginationBtn}
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    ‹
                </button>

                {pages.map((page, index) =>
                    page === "..." ? (
                        <span key={index} className={styles.paginationEllipsis}>…</span>
                    ) : (
                        <button
                            key={page}
                            className={`${styles.paginationPage} ${page === currentPage ? styles.active : ""
                                }`}
                            onClick={() => onPageChange(Number(page))}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className={styles.paginationBtn}
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    ›
                </button>
            </div>
        </div>
    )
}


export default Pagination