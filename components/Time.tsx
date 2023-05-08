import { formatDate, formatDateFromNow, formatToISO } from "@/lib/time"
import { Tooltip, Text, TextProps } from "@mantine/core"
import { useEffect, useState } from "react"

export default function Time({
  date,
  mode = "accurate",
  ...props
}: {
  date: string
  mode?: "fromNow" | "accurate"
} & TextProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const content = isMounted ? (
    <>
      {mode === "accurate" && formatDate(date)}
      {mode === "fromNow" && formatDateFromNow(date)}
    </>
  ) : (
    formatToISO(date)
  )

  return (
    <Tooltip label={isMounted ? formatDate(date) : formatToISO(date)}>
      <Text component="span" color="dimmed" size="sm" {...props}>
        {content}
      </Text>
    </Tooltip>
  )
}
