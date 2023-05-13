import { useMemo } from "react"
import { useFollowingFeedsOfCharacter } from "@crossbell/indexer"
import { DEFAULT_CHARACTER_ID } from "./constant"

export const useFeedsByCharacter = (characterId?: string) => {
  const {
    data: feeds,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFollowingFeedsOfCharacter(DEFAULT_CHARACTER_ID)

  const data = useMemo(() => {
    if (feeds?.pages?.length) {
      const notes = feeds.pages?.flatMap((page) =>
        page.list.flatMap((feed) => feed.note),
      )

      if (characterId) {
        return notes.filter((note) =>
          note?.characterId === Number(characterId),
        )
      }
      return notes
    }

    return []
  }, [feeds?.pages, characterId])

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
