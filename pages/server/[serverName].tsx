import { Card, Flex, SimpleGrid, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { IconArrowLeft } from "@tabler/icons-react"
import { FeedNote } from "@/components/FeedNode"
import { useFeedsByServer } from "@/lib/useFeedsByServer"

const Server = () => {
  const router = useRouter()
  const serverName = router.query.serverName
  const { data: feeds } = useFeedsByServer(serverName as string)

  return (
    <Card
      padding="lg"
      radius="lg"
      className="max-h-[calc(100vh-1rem*2)]"
      withBorder
    >
      <Card.Section p="lg" className="pb-0">
        <IconArrowLeft
          className="h-8 w-8 text-gray-500 cursor-pointer"
          onClick={() => router.back()}
        />
      </Card.Section>

      <Card.Section p="lg">
        <Flex gap="0.2rem" align="center">
          <Flex direction="column">
            <Title weight={500} size="2rem" className="text-gray-900">
              {serverName}
            </Title>
          </Flex>
        </Flex>
      </Card.Section>

      <div className="overflow-scroll h-[79vh] no-scrollbar">
        <SimpleGrid cols={3}>
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
        </SimpleGrid>
      </div>
    </Card>
  )
}

export default Server
