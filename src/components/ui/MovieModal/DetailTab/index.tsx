import styles from "./index.module.css"

type Props = { overview?: string }

const DetailTab = ({ overview }: Props) => (
  <div className={styles.detailWrapper}>
    <p className={styles.title}>あらすじ</p>
    <p className={styles.overview}>{overview || "あらすじ情報がありません"}</p>
  </div>
)
export default DetailTab