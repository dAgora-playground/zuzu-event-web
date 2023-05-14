import { useMemo } from "react"
import { useFollowingFeedsOfCharacter } from "@crossbell/indexer"
import { DEFAULT_CHARACTER_ID } from "./constant"

export const useFeedsByServer = (serverName?: string) => {
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

      if (serverName) {
        return notes.filter((note) =>
          note?.metadata?.content?.sources?.[1].includes(serverName),
        )
      }
      return notes
    }

    return []
  }, [feeds?.pages, serverName])

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
