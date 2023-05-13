import { useInfiniteQuery } from "@tanstack/react-query"
import { NoteEntity } from "crossbell.js"

const SCOPE_KEY = ["trending"]
const DEFAULT_CHARACTER_ID = 38333
const baseUrl = `https://indexer.crossbell.io/v1/characters/${
  process.env.NEXT_PUBLIC_CHARCTER_ID || DEFAULT_CHARACTER_ID
}/feed/follow`

export type GetTrendingNotesResult = {
  items: TrendingRawResponse["list"]
  cursorId: number | undefined
}
async function getTrendingNotes({
  limit,
  cursorId,
  includeCharacterMetadata,
}: {
  limit: number
  cursorId?: number
  includeCharacterMetadata?: string
}): Promise<GetTrendingNotesResult> {
  const url = new URL(baseUrl)
  url.searchParams.append("limit", JSON.stringify(limit))

  if (Number.isFinite(cursorId)) {
    url.searchParams.append("cursor", JSON.stringify(cursorId))
  }
  if (includeCharacterMetadata) {
    url.searchParams.append(
      "includeCharacterMetadata",
      includeCharacterMetadata,
    )
  }

  const result: TrendingRawResponse = await fetch(url).then((res) => {
    return res.json()
  })

  const items = result.list
  const nextCursorId = items ? items[items.length - 1]?.id : undefined

  return { items, cursorId: nextCursorId }
}

export type TrendingRawResponse = {
  list?: (NoteEntity & { id: number })[]
}

export function useTrending() {
  return useInfiniteQuery<GetTrendingNotesResult>(
    [...SCOPE_KEY],
    ({ pageParam: cursorId }) => {
      return getTrendingNotes({ limit: 20, cursorId })
    },
    {
      getNextPageParam: (response) => response.cursorId,
      refetchOnWindowFocus: false, // to prevent random refresh
      refetchOnMount: false, // to prevent random refresh
    },
  )
}
