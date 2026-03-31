// app/api/search/route.ts
import { TMDBImage } from "@/types/TMDBImage"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const apiKey = process.env.TMDB_API_KEY

  // 1段階目：詳細・クレジット・配信・動画を並列取得
  const [description, credits, providers, videosJa, videosEn] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=ja-JP&api_key=${apiKey}`),
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=ja-JP&api_key=${apiKey}`),
    fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`),
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=ja-JP&api_key=${apiKey}`),
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${apiKey}`),
  ])

  const [descriptionData, creditsData, providersData, videosJaData, videosEnData] = await Promise.all([
    description.json(),
    credits.json(),
    providers.json(),
    videosJa.json(),
    videosEn.json(),
  ])

  // 2段階目：言語に応じてロゴ取得
  const logoLang = descriptionData.original_language === "ja" ? "ja" : "en"
  const imagesRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?include_image_language=${logoLang}&api_key=${apiKey}`)
  const imagesData = await imagesRes.json()

  // 動画のフォールバック
  const videos = videosJaData.results?.length > 0 ? videosJaData.results : videosEnData.results

  // ロゴ・背景画像の選定
  const bestLogo = imagesData.logos?.filter((img: TMDBImage) => img.vote_count > 0).sort((a: TMDBImage, b: TMDBImage) => b.vote_average - a.vote_average)[0]
  const bestBackdrop = imagesData.backdrops?.filter((img: TMDBImage) => img.vote_count > 0).sort((a: TMDBImage, b: TMDBImage) => b.vote_average - a.vote_average)[0]

  return NextResponse.json({
    descriptionData,
    creditsData,
    providersData,
    videos,
    bestLogo,
    bestBackdrop,
  })
}