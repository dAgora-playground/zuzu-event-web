import { Card, CardSection, Flex, Grid, Title } from "@mantine/core"
import { LoadMore } from "@crossbell/ui"
import { useFeedsByTag } from "@/lib/useFeedsByTag"
import { FeedNote } from "./FeedNode"

const DiscoverPanelContent = ({
  data: feeds,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ReturnType<typeof useFeedsByTag>) => {
  return (
    <Grid grow>
      <Grid.Col span={7}>
        <Flex direction="column" gap="xs">
          {feeds.map(
            (note) =>
              !!note && (
                <FeedNote
                  // @ts-expect-error Address typing
                  note={note}
                  key={`${note.characterId}-${note.noteId}`}
                />
              ),
          )}

          <LoadMore
            onLoadMore={() => fetchNextPage()}
            hasMore={Boolean(hasNextPage)}
            isLoading={isFetchingNextPage}
          />
        </Flex>
      </Grid.Col>

      <Grid.Col span={1}>
        <Card radius="lg" className="h-fit" withBorder>
          <Card.Section p="lg">
            <Title size="1.4rem">Treading Tags</Title>
          </Card.Section>

          <Flex direction="column">
            <div># ---</div>
            <div># ---</div>
            <div># ---</div>
            <div># ---</div>
          </Flex>
        </Card>
      </Grid.Col>
    </Grid>
  )
}

export default DiscoverPanelContent
