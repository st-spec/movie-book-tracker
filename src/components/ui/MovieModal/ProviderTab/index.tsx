import Image from "next/image"
import styles from "./index.module.css"

type Provider = { provider_id: number; provider_name: string; logo_path: string }
type Props = { jpProviders?: { flatrate?: Provider[]; rent?: Provider[]; buy?: Provider[] } }

const Section = ({ label, data }: { label: string; data?: Provider[] }) =>
  !data?.length ? null : (
    <div className={styles.sectionWrapper}>
      <p className={styles.label}>{label}</p>
      <div className={styles.providersWrapper}>
        {data.map(p => (
          <div className={styles.provider} key={p.provider_id} style={{ textAlign: "center" }}>
            <Image src={`https://image.tmdb.org/t/p/w200${p.logo_path}`} alt="" width={48} height={48} style={{ borderRadius: 8 }} />
            <p className={styles.providerName}>{p.provider_name}</p>
          </div>
        ))}
      </div>
    </div>
  )

const ProviderTab = ({ jpProviders }: Props) => {
  if (!jpProviders) return(
    <div className={styles.contentsWrapper}>
      <p className={styles.message}>日本での配信情報はありません</p>
    </div>
  )

  return (
    <div className={styles.contentsWrapper}>
      <Section label="サブスク" data={jpProviders.flatrate} />
      <Section label="レンタル" data={jpProviders.rent} />
      <Section label="購入" data={jpProviders.buy} />
    </div>
  )
}
export default ProviderTab