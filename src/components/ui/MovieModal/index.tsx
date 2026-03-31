import clsx from "clsx"
import styles from "./index.module.css"
import { X } from "lucide-react"
import useSWR from "swr"
import Image from "next/image"
import GenreChip from "../GenreChip"
import { TMDBVideo } from "@/types/TMDBVideo"
import { useState } from "react"
import RecordTab from "./RecordTab"
import DetailTab from "./DetailTab"
import CastTab from "./CastTab"
import ProviderTab from "./ProviderTab"

type Props = {
  movieId: string
  onClose: () => void
}

const fetcher = (url: string) => fetch(url).then(res => res.json())
const TABS = ["記録", "詳細", "キャスト", "配信"] as const
type Tab = typeof TABS[number]

const MovieModal = ({movieId, onClose}: Props) => {
  const { data } = useSWR(`/api/movie/${movieId}`, fetcher)
  const { descriptionData, creditsData, providersData, videos, bestBackdrop } = data ?? {}
  const trailer = videos?.find((v: TMDBVideo) => v.type === "Trailer" && v.site === "YouTube")
  const jpProviders = providersData?.results?.JP
  const [activeTab, setActiveTab] = useState<Tab>("記録")

  return(
    <main className={styles.modalWrapper} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper} onClick={onClose}>
          <X className={clsx(styles.icon, styles.xButton)} size={26} />
        </div>
        <div className={styles.leftContentsWrapper}> 
          <div className={styles.visualWrapper}>
            {trailer ? (<iframe
              className={styles.movie}
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
            />) : (
              <Image
                src={`https://image.tmdb.org/t/p/w1280${bestBackdrop?.file_path}`}
                alt=""
                fill
                className={styles.image}
              />
            )}
          </div>
          <div className={styles.descriptionWrapper}>
            <div className={styles.genresWrapper}>
              {descriptionData?.genres?.map((genre: {id:number, name: string}) => (
                <GenreChip key={genre.id} genre={genre.name} />
              ))}
            </div>
            <h3 className={clsx(styles.title, "line-clamp-1")}>{descriptionData?.title}</h3>
            <dl className={styles.listWrapper}>
              <dt>公開日</dt>
              <dd>{descriptionData?.release_date}</dd>
              <dt>上映時間</dt>
              <dd>{descriptionData?.runtime}分</dd>
              <dt>TMDB評価</dt>
              <dd>★ {descriptionData?.vote_average?.toFixed(1)}</dd>
            </dl>
          </div>
        </div>
        <div className={styles.rightContentsWrapper}>
          {/* タブボタン */}
          <div className={styles.tabsWrapper}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(styles.tab, activeTab === tab && styles.activeTab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* タブコンテンツ */}
          <div className={styles.tabContent}>
            {activeTab === "記録" && <RecordTab movieId={movieId} title={descriptionData?.title} poster_path={descriptionData?.poster_path} />}
            {activeTab === "詳細" && <DetailTab overview={descriptionData?.overview} />}
            {activeTab === "キャスト" && <CastTab creditsData={creditsData} />}
            {activeTab === "配信" && <ProviderTab jpProviders={jpProviders} />}
          </div>
        </div>
      </div>
    </main>
  )

}

export default MovieModal