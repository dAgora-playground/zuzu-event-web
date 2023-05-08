import { Badge, Card, Flex, Space, Text, Title } from "@mantine/core"
import { CharacterEntity, NoteEntity } from "crossbell.js"
import { useCharacter, useNote } from "@crossbell/indexer"
import { extractCharacterName } from "@crossbell/util-metadata"

import { Avatar } from "./Avatar"
import { MarkdownRenderer } from "./MarkdownRenderer"
import Time from "./Time"

export type FeedNodeProps = {
  note: NoteEntity
  character?: CharacterEntity | null
}

export function FeedNote({
  note: initialNote,
  character: initialCharacter,
}: FeedNodeProps) {
  const { data: fetchedNote } = useNote(
    initialNote.characterId,
    initialNote.noteId,
  )

  const note = fetchedNote ?? initialNote
  const { characterId } = note
  const { data: character, isLoading } = useCharacter(
    characterId ?? initialCharacter?.characterId,
    {
      initialData: initialCharacter,
    },
  )

  const characterName = extractCharacterName(character)

  const tags = note.metadata?.content?.tags?.map((tag) => (
    <Badge radius="xs" key={tag}>
      #{tag}
    </Badge>
  ))

  return (
    <Card radius="lg" withBorder>
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

      <MarkdownRenderer displayMode="normal">
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
