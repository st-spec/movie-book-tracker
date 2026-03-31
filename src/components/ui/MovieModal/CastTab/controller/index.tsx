"use client"

import CastTabPresentation from "../presentation"

type CastMember = { id: number; name: string; character: string; profile_path: string | null }
type CrewMember = { id: number; name: string; job: string; profile_path: string | null; credit_id: string }

type Props = {
  creditsData?: {
    cast: CastMember[]
    crew: CrewMember[]
  }
}

export const CastTabController = ({ creditsData }: Props) => {
  const directors = creditsData?.crew.filter(c => c.job === "Director") ?? []
  const writers = creditsData?.crew.filter(c => c.job === "Screenplay") ?? []
  const cast = creditsData?.cast.slice(0, 20) ?? []

  return (
    <CastTabPresentation
      directors={directors}
      writers={writers}
      cast={cast}
    />
  )
}

export default CastTabController
