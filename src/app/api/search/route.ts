// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // 1. クエリパラメータを取得
  const params = request.nextUrl.searchParams
  const q = params.get("q")
  const page = params.get("page")
  // 2. TMDBにfetch
  const apiKey = process.env.TMDB_API_KEY
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${q}&page=${page}&language=ja-JP&api_key=${apiKey}`)
  const data = await response.json()
  // 3. NextResponse.json()で返す
  return NextResponse.json({ data })
}