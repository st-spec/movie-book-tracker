import Image from "next/image"

type Provider = { provider_id: number; provider_name: string; logo_path: string }
type Props = { jpProviders?: { flatrate?: Provider[]; rent?: Provider[]; buy?: Provider[] } }

const Section = ({ label, data }: { label: string; data?: Provider[] }) =>
  !data?.length ? null : (
    <div>
      <p>{label}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {data.map(p => (
          <div key={p.provider_id} style={{ textAlign: "center" }}>
            <Image src={`https://image.tmdb.org/t/p/w200${p.logo_path}`} alt="" width={48} height={48} style={{ borderRadius: 8 }} />
            <p style={{ fontSize: 10 }}>{p.provider_name}</p>
          </div>
        ))}
      </div>
    </div>
  )

const ProviderTab = ({ jpProviders }: Props) => {
  if (!jpProviders) return <p>日本での配信情報はありません</p>

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Section label="サブスク" data={jpProviders.flatrate} />
      <Section label="レンタル" data={jpProviders.rent} />
      <Section label="購入" data={jpProviders.buy} />
    </div>
  )
}
export default ProviderTab