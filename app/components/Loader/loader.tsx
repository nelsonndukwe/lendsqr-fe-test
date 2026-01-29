import { icons } from '@/lib/assets'
import Image from 'next/image'
import styles from "./loader.module.scss"

const Loader = () => {
  return (
    <div className={styles.wrapper}>
        <Image src={icons.favicon} alt="loader" width={20} height={20} />
    </div>
  )
}

export default Loader