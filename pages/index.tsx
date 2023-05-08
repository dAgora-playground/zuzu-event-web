import DiscoverPanelContent from "@/components/DiscoverPanelContent"
import { Search } from "@/components/Search"
import { Card, Title, Tabs, clsx, Text } from "@mantine/core"
import { useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState<string | null>("discover")

  return (
    <Card padding="lg" radius="lg" mih="100vh" withBorder>
      <Card.Section p="lg" className="flex gap-4 items-center justify-between">
        <Title weight={500}>Home</Title>
        <Search className="max-w-lg" />
      </Card.Section>

      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List className="border-b-0 gap-3">
          <Tabs.Tab
            value="discover"
            className={clsx("px-1 py-2 mb-4 font-medium")}
          >
            <Text color={activeTab === "discover" ? "blue" : "black"} size="md">
              Discover
            </Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="discover" pt="xs">
          <DiscoverPanelContent />
        </Tabs.Panel>
      </Tabs>
    </Card>
  )
}
