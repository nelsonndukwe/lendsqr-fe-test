import styles from "./skeleton.module.scss"
const TableSkeleton = ({ rows = 5 }) => {
    return (
      <>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i} className={styles.skeletonRow}>
            <td><div className={styles.skeleton} /></td>
            <td><div className={styles.skeleton} /></td>
            <td><div className={styles.skeleton} /></td>
            <td><div className={styles.skeleton} /></td>
            <td><div className={styles.skeleton} /></td>
            <td><div className={styles.skeletonBadge} /></td>
            <td><div className={styles.skeletonAction} /></td>
          </tr>
        ))}
      </>
    );
  };

  export default TableSkeleton
  