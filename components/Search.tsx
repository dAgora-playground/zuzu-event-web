import { TextInput, TextInputProps, useMantineTheme } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"

export function Search(props: TextInputProps) {
  const theme = useMantineTheme()

  return (
    <TextInput
      radius="xl"
      size="md"
      rightSection={
        <IconSearch size="1.1rem" stroke={1.5} color={theme.colors.gray[5]} />
      }
      placeholder="Search dAgora"
      rightSectionWidth={42}
      {...props}
    />
  )
}
