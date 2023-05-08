import React from "react"
import { Avatar as Avatar_, AvatarProps } from "@mantine/core"
import { CharacterEntity } from "crossbell.js"
import { PropsWithChildren } from "react"

import { useCharacterAvatar } from "@crossbell/ui"

export function Avatar({
  characterId,
  character: initialCharacter,
  alt = "Avatar",
  src,
  showHoverCard = false,
  ...props
}: PropsWithChildren<
  (
    | {
        characterId?: number | null
        character?: CharacterEntity | null
      }
    | {
        characterId?: never
        character: CharacterEntity
      }
  ) & {
    showHoverCard?: boolean
  } & AvatarProps
>) {
  const { src: avatarSrc, character } = useCharacterAvatar({
    character: initialCharacter,
    characterId,
    disabled: !!src,
  })

  return (
    <Avatar_
      className="bg-coolgray-100"
      src={src ?? avatarSrc}
      alt={alt}
      radius="xl"
      {...props}
    />
  )
}
