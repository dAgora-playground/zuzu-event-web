import { useFollowingFeedsOfCharacter } from "@crossbell/indexer"
import { DEFAULT_CHARACTER_ID } from "./constant"
import { useMemo } from "react"

export const useFeedsByTag = (tag?: string) => {
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

      if (tag) {
        return notes.filter((note) =>
          note?.metadata?.content?.tags?.includes(tag),
        )
      }
      return notes
    }

    return []
  }, [feeds?.pages, tag])

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
