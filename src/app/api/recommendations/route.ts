// app/api/search/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY
  const [popular, upcopming, recommended] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/popular?language=ja-JP&api_key=${apiKey}`),
    fetch(`https://api.themoviedb.org/3/movie/upcoming?language=ja-JP&region=JP&api_key=${apiKey}`),
    fetch(`https://api.themoviedb.org/3/discover/movie?language=ja-JP&api_key=${apiKey}`),
  ])
  const [popularData, upcopmingData, recommendedData] = await Promise.all([
    popular.json(),
    upcopming.json(),
    recommended.json(),
  ])
  // 3. NextResponse.json()で返す
  return NextResponse.json({ popularData, upcopmingData, recommendedData })
}