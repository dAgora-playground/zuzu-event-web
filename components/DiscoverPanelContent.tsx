import { useTrending } from "@/lib/trending"
import React from "react"
import { FeedNote } from "./FeedNode"
import { Flex } from "@mantine/core"

const DiscoverPanelContent = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useTrending()

  const flattedData = React.useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  )

  return (
    <Flex direction="column" gap="xs">
      {flattedData.map(
        (note) =>
          !!note && (
            <FeedNote note={note} key={`${note.characterId}-${note.noteId}`} />
          ),
      )}
    </Flex>
  )
}

export default DiscoverPanelContent
