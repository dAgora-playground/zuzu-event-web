import { PropsWithChildren } from "react"
import { IconBrandDiscordFilled, IconBrandTelegram } from "@tabler/icons-react"
import { Text } from "@mantine/core"

export type ServerBadgeProps = PropsWithChildren<{
  type?: "telegram" | "discord"
}>

const ServerBadge = ({ type, children }: ServerBadgeProps) => {
  const Icon = type === "discord" ? IconBrandDiscordFilled : IconBrandTelegram

  return (
    <div className="flex items-center gap-1 flex-wrap break-words">
      <Icon size="20" />
      <Text size="sm" lh={1}>{children}</Text>
    </div>
  )
}

export default ServerBadge
