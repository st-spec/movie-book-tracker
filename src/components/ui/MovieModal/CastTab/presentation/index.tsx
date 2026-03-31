"use client"

import Image from "next/image"
import styles from "./index.module.css"
import ScrollableRow from "@/components/ui/ScrollableRow/controller"

type CastMember = { id: number; name: string; character: string; profile_path: string | null }
type CrewMember = { id: number; name: string; job: string; profile_path: string | null; credit_id: string }

type RowProps = {
  label: string
  people: (CrewMember | CastMember)[]
  sub?: (p: any) => string
}

const Row = ({ label, people, sub }: RowProps) => {
  if (people.length === 0) return null

  return (
    <div>
      <p className={styles.label}>{label}</p>
      <ScrollableRow contentClassName={styles.rowContent} size="sm">
        {people.map((p) => (
          <div key={"credit_id" in p ? p.credit_id : p.id} className={styles.personWrapper}>
            <div className={styles.imageWrapper}>
              {p.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${p.profile_path}`}
                  alt={p.name}
                  fill
                  className={styles.image}
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                  No Image
                </div>
              )}
            </div>
            <p className={styles.name}>{p.name}</p>
            {sub && <p className={styles.character}>{sub(p)}</p>}
          </div>
        ))}
      </ScrollableRow>
    </div>
  )
}

type Props = {
  directors: CrewMember[]
  writers: CrewMember[]
  cast: CastMember[]
}

const CastTabPresentation = ({ directors, writers, cast }: Props) => {
  return (
    <div className={styles.castWrapper}>
      <Row label="監督" people={directors} />
      <Row label="脚本" people={writers} />
      <Row label="キャスト" people={cast} sub={(p) => p.character} />
    </div>
  )
}

export default CastTabPresentation
