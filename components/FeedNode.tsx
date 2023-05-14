import { Badge, Card, Flex, Space, Text, Title } from "@mantine/core"
import { CharacterEntity, FeedEntity, NoteEntity } from "crossbell.js"
import { useCharacter } from "@crossbell/indexer"
import { extractCharacterName } from "@crossbell/util-metadata"
import Link from "next/link"

import { Avatar } from "./Avatar"
import { MarkdownRenderer } from "./MarkdownRenderer"
import Time from "./Time"
import ServerBadge from "./ServerBadge"

export type FeedNodeProps = {
  note: NoteEntity
  character?: FeedEntity | null
}

const extractServerProps = (
  note: NoteEntity,
): { type: "discord" | "telegram"; name: string } | undefined => {
  const serverSource = note.metadata?.content?.sources?.[1] ?? ""

  if (!serverSource) {
    return
  }

  if (serverSource.toLowerCase().startsWith("discord")) {
    return {
      name: serverSource.slice("discord server: ".length),
      type: "discord",
    }
  }

  return {
    name: serverSource.slice("Telegram: ".length),
    type: "telegram",
  }
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

  const tags = note.metadata?.content?.tags
    ?.filter((t) => !!t)
    .map((tag) => (
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

  const serverProps = extractServerProps(note)

  return (
    <Card radius="lg" className="h-fit" withBorder>
      <div>
        {note.metadata?.content?.title && (
          <Title order={3} className="my-2">
            {note.metadata.content.title}
          </Title>
        )}
      </div>

      <Link
        href={`/character/${character?.characterId ?? characterId}`}
        className="flex items-center gap-2"
      >
        <Avatar
          character={character as CharacterEntity}
          characterId={characterId}
        />
        {characterName && <Text>{characterName}</Text>}
      </Link>

      <MarkdownRenderer displayMode="normal" collapsible>
        {note.metadata?.content?.content ?? ""}
      </MarkdownRenderer>

      <div className="flex gap-2">
        <Time date={note.createdAt!} mode="fromNow" />

        {serverProps && (
          <Link href={`/server/${serverProps.name}`}>
            <ServerBadge type={serverProps.type}>
              {serverProps.name}
            </ServerBadge>
          </Link>
        )}
      </div>

      {!!tags?.length && <Space h={10} />}

      <Flex gap="xs">{tags}</Flex>
    </Card>
  )
}
