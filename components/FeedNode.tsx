import { Badge, Card, Flex, Space, Text, Title } from "@mantine/core"
import { CharacterEntity, FeedEntity, NoteEntity } from "crossbell.js"
import { useCharacter } from "@crossbell/indexer"
import { extractCharacterName } from "@crossbell/util-metadata"

import { Avatar } from "./Avatar"
import { MarkdownRenderer } from "./MarkdownRenderer"
import Time from "./Time"
import Link from "next/link"

export type FeedNodeProps = {
  note: NoteEntity
  character?: FeedEntity | null
}

export function FeedNote({ note, character: initialCharacter }: FeedNodeProps) {
  const { characterId } = note
  const { data: character } = useCharacter(
    characterId ?? initialCharacter?.characterId,
    {
      initialData: initialCharacter,
    },
  )

  const characterName = extractCharacterName(character)

  const tags = note.metadata?.content?.tags?.map((tag) => (
    <Badge
      radius="xs"
      key={tag}
      component={Link}
      href={`/tag/${tag}`}
      className="cursor-pointer"
    >
      #{tag}
    </Badge>
  ))

  return (
    <Card radius="lg" className="h-fit" withBorder>
      <div>
        {note.metadata?.content?.title && (
          <Title order={3} className="my-2">
            {note.metadata.content.title}
          </Title>
        )}
      </div>

      <Flex align="center" gap="xs">
        <Avatar
          character={character as CharacterEntity}
          characterId={characterId}
        />

        {characterName && <Text>{characterName}</Text>}
      </Flex>

      <MarkdownRenderer displayMode="normal" collapsible>
        {note.metadata?.content?.content ?? ""}
      </MarkdownRenderer>

      <div>
        <Time date={note.createdAt!} mode="fromNow" />
      </div>

      {!!tags?.length && <Space h={10} />}

      <Flex gap="xs">{tags}</Flex>
    </Card>
  )
}
